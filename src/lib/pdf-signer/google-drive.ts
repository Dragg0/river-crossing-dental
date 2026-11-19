/**
 * Google Drive access for the PDF signer, entirely in the browser.
 *
 * The app asks only for the `drive.file` scope: it can open the files the user
 * picks in the Google Picker and the files it saves, nothing else in Drive.
 * The access token lives in memory for this tab and is never sent to our
 * server.
 */

const GIS_SRC = "https://accounts.google.com/gsi/client";
const GAPI_SRC = "https://apis.google.com/js/api.js";
const SCOPE = "https://www.googleapis.com/auth/drive.file";
const DRIVE_API = "https://www.googleapis.com/drive/v3/files";
const DRIVE_UPLOAD = "https://www.googleapis.com/upload/drive/v3/files";

const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";
const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY ?? "";
// The Cloud project number. The Picker needs it so files picked there are
// opened for this app under the drive.file scope.
const appId = process.env.NEXT_PUBLIC_GOOGLE_APP_ID ?? "";

export const driveConfigured = Boolean(clientId && apiKey && appId);

export type DriveFile = {
  id: string;
  name: string;
  parents?: string[];
  webViewLink?: string;
};

/* ---------- Minimal typings for the two Google scripts ---------- */

type TokenResponse = {
  access_token?: string;
  expires_in?: number;
  error?: string;
  error_description?: string;
};

type TokenError = { type?: string; message?: string };

type TokenClient = {
  requestAccessToken: (overrides?: { prompt?: string }) => void;
};

type PickerDoc = { id: string; name: string; mimeType?: string };
type PickerResponse = { action: string; docs?: PickerDoc[] };

type GoogleGlobal = {
  accounts: {
    oauth2: {
      initTokenClient: (config: {
        client_id: string;
        scope: string;
        callback: (response: TokenResponse) => void;
        error_callback?: (error: TokenError) => void;
      }) => TokenClient;
    };
  };
  picker: {
    // The Picker API is a builder of opaque objects; keep it loose.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
};

declare global {
  interface Window {
    google?: GoogleGlobal;
    gapi?: { load: (lib: string, callback: () => void) => void };
  }
}

/* ---------- Script loading ---------- */

const scriptLoads = new Map<string, Promise<void>>();

function loadScript(src: string): Promise<void> {
  let pending = scriptLoads.get(src);
  if (!pending) {
    pending = new Promise<void>((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => {
        scriptLoads.delete(src);
        reject(new Error("Couldn't reach Google. Check your internet connection and try again."));
      };
      document.head.appendChild(script);
    });
    scriptLoads.set(src, pending);
  }
  return pending;
}

let tokenClient: TokenClient | null = null;
let pickerReady = false;
// The sign-in request waiting on Google's answer.
let pendingToken: { resolve: (response: TokenResponse) => void; reject: (error: TokenError) => void } | null = null;
let preparing: Promise<void> | null = null;

/**
 * Loads Google's sign-in and Picker scripts ahead of time. The sign-in popup
 * has to open straight from a click, with nothing awaited first, or the
 * browser blocks it, so this runs when the page loads.
 */
export function prepareDrive(): Promise<void> {
  if (!driveConfigured) return Promise.reject(new Error("Google Drive isn't set up for this site yet."));
  preparing ??= Promise.all([
    loadScript(GIS_SRC).then(() => {
      tokenClient = window.google!.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: SCOPE,
        callback: (response) => pendingToken?.resolve(response),
        error_callback: (error) => pendingToken?.reject(error),
      });
    }),
    loadScript(GAPI_SRC).then(
      () =>
        new Promise<void>((resolve) => {
          window.gapi!.load("picker", () => {
            pickerReady = true;
            resolve();
          });
        }),
    ),
  ]).then(
    () => undefined,
    (error) => {
      preparing = null;
      throw error;
    },
  );
  return preparing;
}

export function driveReady(): boolean {
  return tokenClient !== null && pickerReady;
}

/* ---------- Sign-in ---------- */

let token: { value: string; expiresAt: number } | null = null;

/**
 * Returns a Drive access token, asking Google for one if needed. Call it
 * directly from a click handler (no await before it) so the popup isn't
 * blocked.
 */
export function getAccessToken(): Promise<string> {
  if (token && Date.now() < token.expiresAt - 60_000) return Promise.resolve(token.value);
  const client = tokenClient;
  if (!client) return Promise.reject(new Error("Google Drive is still loading. Try again in a moment."));

  // A newer click replaces an older request whose popup was abandoned.
  pendingToken?.reject({ type: "superseded" });
  return new Promise<string>((resolve, reject) => {
    pendingToken = {
      resolve: (response) => {
        pendingToken = null;
        if (response.error || !response.access_token) {
          reject(new Error(response.error_description || "Google sign-in didn't finish."));
          return;
        }
        token = {
          value: response.access_token,
          expiresAt: Date.now() + (response.expires_in ?? 3600) * 1000,
        };
        resolve(response.access_token);
      },
      reject: (error) => {
        pendingToken = null;
        reject(
          new Error(
            error.type === "popup_closed" || error.type === "superseded"
              ? "The Google sign-in window was closed."
              : error.type === "popup_failed_to_open"
                ? "Your browser blocked the Google sign-in window. Allow popups for this site and try again."
                : "Google sign-in didn't finish.",
          ),
        );
      },
    };
    client.requestAccessToken({ prompt: "" });
  });
}

/* ---------- Picker ---------- */

/** Opens the Google Picker filtered to PDFs. Resolves null if cancelled. */
export function pickPdf(accessToken: string): Promise<DriveFile | null> {
  const picker = window.google?.picker;
  if (!picker || !pickerReady) return Promise.reject(new Error("Google Drive is still loading. Try again in a moment."));

  return new Promise((resolve) => {
    const myDrive = new picker.DocsView(picker.ViewId.DOCS)
      .setMimeTypes("application/pdf")
      .setIncludeFolders(true)
      .setMode(picker.DocsViewMode.LIST);
    const recent = new picker.DocsView(picker.ViewId.RECENTLY_PICKED).setMimeTypes("application/pdf");

    new picker.PickerBuilder()
      .addView(myDrive)
      .addView(recent)
      .setOAuthToken(accessToken)
      .setDeveloperKey(apiKey)
      .setAppId(appId)
      .setTitle("Choose a PDF to sign")
      .setCallback((data: PickerResponse) => {
        if (data.action === picker.Action.PICKED && data.docs?.[0]) {
          resolve({ id: data.docs[0].id, name: data.docs[0].name });
        } else if (data.action === picker.Action.CANCEL) {
          resolve(null);
        }
      })
      .build()
      .setVisible(true);
  });
}

/* ---------- Drive REST calls ---------- */

export class DriveError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

async function driveFetch(url: string, accessToken: string, init: RequestInit = {}): Promise<Response> {
  const headers = new Headers(init.headers);
  headers.set("Authorization", `Bearer ${accessToken}`);
  const response = await fetch(url, { ...init, headers });
  if (response.ok) return response;

  if (response.status === 401) token = null;
  let detail = "";
  try {
    const body = await response.json();
    detail = body?.error?.message ?? "";
  } catch {
    /* Not JSON. */
  }
  const message =
    response.status === 401
      ? "Your Google sign-in expired. Try again and sign in when asked."
      : response.status === 404
        ? "Drive couldn't find that file, or this app doesn't have access to it."
        : detail || `Google Drive returned an error (${response.status}).`;
  throw new DriveError(message, response.status);
}

const FILE_FIELDS = "id,name,parents,webViewLink";

export async function downloadPdf(fileId: string, accessToken: string): Promise<{ file: DriveFile; bytes: Uint8Array }> {
  const id = encodeURIComponent(fileId);
  const [metaResponse, dataResponse] = await Promise.all([
    driveFetch(`${DRIVE_API}/${id}?fields=${FILE_FIELDS}&supportsAllDrives=true`, accessToken),
    driveFetch(`${DRIVE_API}/${id}?alt=media&supportsAllDrives=true`, accessToken),
  ]);
  const file = (await metaResponse.json()) as DriveFile;
  const bytes = new Uint8Array(await dataResponse.arrayBuffer());
  return { file, bytes };
}

function pdfBlob(bytes: Uint8Array): Blob {
  // Copy into a plain ArrayBuffer-backed view; Blob rejects shared buffers.
  return new Blob([new Uint8Array(bytes)], { type: "application/pdf" });
}

async function createFile(bytes: Uint8Array, name: string, parents: string[] | undefined, accessToken: string): Promise<DriveFile> {
  const boundary = `rcd-${crypto.randomUUID()}`;
  const metadata: Record<string, unknown> = { name, mimeType: "application/pdf" };
  if (parents?.length) metadata.parents = parents;
  const body = new Blob([
    `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metadata)}\r\n`,
    `--${boundary}\r\nContent-Type: application/pdf\r\n\r\n`,
    pdfBlob(bytes),
    `\r\n--${boundary}--`,
  ]);
  const response = await driveFetch(
    `${DRIVE_UPLOAD}?uploadType=multipart&supportsAllDrives=true&fields=${FILE_FIELDS}`,
    accessToken,
    { method: "POST", headers: { "Content-Type": `multipart/related; boundary=${boundary}` }, body },
  );
  return (await response.json()) as DriveFile;
}

/**
 * Saves a new file next to the original. If the app isn't allowed to write
 * into that folder (drive.file can only see folders it was given), the copy
 * goes to the top of My Drive instead.
 */
export async function saveCopy(
  bytes: Uint8Array,
  name: string,
  parents: string[] | undefined,
  accessToken: string,
): Promise<{ file: DriveFile; inOriginalFolder: boolean }> {
  if (parents?.length) {
    try {
      return { file: await createFile(bytes, name, parents, accessToken), inOriginalFolder: true };
    } catch (error) {
      if (!(error instanceof DriveError) || (error.status !== 403 && error.status !== 404)) throw error;
    }
  }
  return { file: await createFile(bytes, name, undefined, accessToken), inOriginalFolder: !parents?.length };
}

/** Uploads a new version of an existing file. Drive keeps the old version in its history. */
export async function replaceFile(fileId: string, bytes: Uint8Array, accessToken: string): Promise<DriveFile> {
  const response = await driveFetch(
    `${DRIVE_UPLOAD}/${encodeURIComponent(fileId)}?uploadType=media&supportsAllDrives=true&fields=${FILE_FIELDS}`,
    accessToken,
    { method: "PATCH", headers: { "Content-Type": "application/pdf" }, body: pdfBlob(bytes) },
  );
  return (await response.json()) as DriveFile;
}

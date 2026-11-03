"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  CalendarDays,
  CloudUpload,
  Download,
  ExternalLink,
  FileUp,
  HardDrive,
  Loader2,
  Minus,
  PenLine,
  Plus,
  Replace,
  Signature,
  Trash2,
  Type,
} from "lucide-react";
import { clsx as cn } from "clsx";
import {
  driveConfigured,
  downloadPdf,
  getAccessToken,
  pickPdf,
  prepareDrive,
  replaceFile,
  saveCopy,
  type DriveFile,
} from "@/lib/pdf-signer/google-drive";
import {
  EncryptedPdfError,
  exportSignedPdf,
  openPdf,
  signedFileName,
  TEXT_FONT_FAMILY,
  TEXT_LINE_HEIGHT,
  type LoadedPdf,
  type Placement,
} from "@/lib/pdf-signer/pdf";
import { PageCanvas } from "./page-canvas";
import { SignaturePad, inkSignature, loadSavedSignature, storeSignature, subscribeSignature } from "./signature-pad";

type Tool = "signDate" | "signature" | "date" | "text";
type Status = { kind: "busy" | "error" | "success"; message: string; link?: string } | null;
type OpenFile = { name: string; bytes: Uint8Array; drive?: DriveFile };
type PageViewport = LoadedPdf["viewports"][number];

const INKS = [
  { label: "Black ink", value: "#111111" },
  { label: "Blue ink", value: "#1b3a9a" },
];
const SIGNATURE_WIDTH = 150;
const SIGNATURE_MAX_HEIGHT = 46;
const TEXT_SIZE = 11;
const MAX_PAGE_WIDTH = 920;

const TOOL_HINTS: Record<Tool, string> = {
  signDate: "Click where your signature goes. Today's date is added beside it.",
  signature: "Click where your signature goes.",
  date: "Click where the date goes.",
  text: "Click where the text goes.",
};

function todayString() {
  return new Date().toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" });
}

function newId() {
  return crypto.randomUUID();
}

let measureContext: CanvasRenderingContext2D | null = null;
function textWidth(text: string, size: number) {
  measureContext ??= document.createElement("canvas").getContext("2d")!;
  measureContext.font = `${size}px ${TEXT_FONT_FAMILY}`;
  return Math.max(size, ...text.split("\n").map((line) => measureContext!.measureText(line).width));
}

function boxOf(item: Placement) {
  if (item.kind === "signature") return { width: item.width, height: item.height };
  return { width: textWidth(item.text, item.size), height: item.text.split("\n").length * item.size * TEXT_LINE_HEIGHT };
}

/** Keeps an item fully on its page. */
function clampToPage<T extends Placement>(item: T, viewport: PageViewport): T {
  const { width, height } = boxOf(item);
  return {
    ...item,
    x: Math.min(Math.max(0, item.x), Math.max(0, viewport.width - width)),
    y: Math.min(Math.max(0, item.y), Math.max(0, viewport.height - height)),
  };
}

function errorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  return "Something went wrong. Please try again.";
}

function isTyping(target: EventTarget | null) {
  return target instanceof HTMLElement && (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));
}

export function PdfSigner() {
  const [file, setFile] = useState<OpenFile | null>(null);
  const [pdf, setPdf] = useState<LoadedPdf | null>(null);
  const [placements, setPlacements] = useState<Placement[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [tool, setTool] = useState<Tool | null>(null);
  const [ink, setInk] = useState(INKS[0].value);
  const [padFor, setPadFor] = useState<Tool | "change" | null>(null);
  const [status, setStatus] = useState<Status>(null);
  const [busy, setBusy] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [driveState, setDriveState] = useState<"off" | "loading" | "ready" | "error">(driveConfigured ? "loading" : "off");
  const [containerWidth, setContainerWidth] = useState(0);
  const [dragOver, setDragOver] = useState(false);

  const signature = useSyncExternalStore(subscribeSignature, loadSavedSignature, () => null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pdfRef = useRef<LoadedPdf | null>(null);

  const selected = placements.find((p) => p.id === selectedId) ?? null;
  const maxPageWidth = pdf ? Math.max(...pdf.viewports.map((v) => v.width)) : 1;
  const scale = containerWidth ? Math.min(containerWidth, MAX_PAGE_WIDTH) / maxPageWidth : 1;

  /* ---------- Setup ---------- */

  useEffect(() => {
    if (!driveConfigured) return;
    prepareDrive().then(
      () => setDriveState("ready"),
      () => setDriveState("error"),
    );
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new ResizeObserver(([entry]) => setContainerWidth(entry.contentRect.width));
    observer.observe(container);
    return () => observer.disconnect();
  }, [pdf]);

  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (padFor || isTyping(event.target)) return;
      if (event.key === "Escape") {
        setTool(null);
        setSelectedId(null);
      } else if ((event.key === "Delete" || event.key === "Backspace") && selectedId) {
        event.preventDefault();
        setPlacements((items) => items.filter((item) => item.id !== selectedId));
        setSelectedId(null);
        setDirty(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [padFor, selectedId]);

  useEffect(() => () => void pdfRef.current?.close(), []);

  /* ---------- Opening ---------- */

  function confirmDiscard() {
    return !dirty || window.confirm("You haven't saved your changes to this PDF. Open a different one anyway?");
  }

  async function loadBytes(bytes: Uint8Array, name: string, drive?: DriveFile) {
    setBusy(true);
    setStatus({ kind: "busy", message: `Opening ${name}…` });
    try {
      const loaded = await openPdf(bytes);
      void pdfRef.current?.close();
      pdfRef.current = loaded;
      setPdf(loaded);
      setFile({ name, bytes, drive });
      setPlacements([]);
      setSelectedId(null);
      setTool(null);
      setDirty(false);
      setStatus(null);
      window.scrollTo({ top: 0 });
    } catch (error) {
      const name = error instanceof Error ? error.name : "";
      setStatus({
        kind: "error",
        message:
          name === "PasswordException"
            ? "This PDF is password-protected. Open it in another app, save an unlocked copy, and try that."
            : "That file couldn't be opened as a PDF.",
      });
    } finally {
      setBusy(false);
    }
  }

  function openFromComputer() {
    if (!confirmDiscard()) return;
    fileInputRef.current?.click();
  }

  async function onLocalFile(picked: File | undefined) {
    if (!picked) return;
    if (picked.type && picked.type !== "application/pdf" && !picked.name.toLowerCase().endsWith(".pdf")) {
      setStatus({ kind: "error", message: `"${picked.name}" isn't a PDF.` });
      return;
    }
    await loadBytes(new Uint8Array(await picked.arrayBuffer()), picked.name);
  }

  function openFromDrive() {
    // Ask Google for access first, straight from the click, so the sign-in popup isn't blocked.
    const tokenRequest = getAccessToken();
    void (async () => {
      try {
        const token = await tokenRequest;
        if (!confirmDiscard()) return;
        const picked = await pickPdf(token);
        if (!picked) return;
        setBusy(true);
        setStatus({ kind: "busy", message: `Getting ${picked.name} from Google Drive…` });
        const { file: driveFile, bytes } = await downloadPdf(picked.id, token);
        await loadBytes(bytes, driveFile.name || picked.name, driveFile);
      } catch (error) {
        setStatus({ kind: "error", message: errorMessage(error) });
        setBusy(false);
      }
    })();
  }

  /* ---------- Placing ---------- */

  function armTool(next: Tool) {
    setSelectedId(null);
    if ((next === "signature" || next === "signDate") && !signature) {
      setPadFor(next);
      return;
    }
    setTool((current) => (current === next ? null : next));
  }

  function onSignatureSaved(dataUrl: string) {
    storeSignature(dataUrl);
    if (padFor && padFor !== "change") setTool(padFor);
    setPadFor(null);
  }

  function textPlacement(page: number, x: number, centerY: number, text: string): Placement {
    const height = TEXT_SIZE * TEXT_LINE_HEIGHT;
    return { id: newId(), kind: "text", page, x, y: centerY - height / 2, text, size: TEXT_SIZE, color: ink };
  }

  async function placeAt(page: number, x: number, y: number) {
    if (!pdf || !tool) return;
    const viewport = pdf.viewports[page];
    const using = tool;
    setTool(null);
    const added: Placement[] = [];

    if (using === "signature" || using === "signDate") {
      if (!signature) return;
      const inked = await inkSignature(signature, ink);
      const ratio = inked.height / inked.width;
      let width = SIGNATURE_WIDTH;
      let height = width * ratio;
      if (height > SIGNATURE_MAX_HEIGHT) {
        height = SIGNATURE_MAX_HEIGHT;
        width = height / ratio;
      }
      const sig = clampToPage(
        { id: newId(), kind: "signature", page, x: x - width / 2, y: y - height / 2, width, height, image: inked.image } as Placement,
        viewport,
      );
      added.push(sig);

      if (using === "signDate" && sig.kind === "signature") {
        const text = todayString();
        const dateWidth = textWidth(text, TEXT_SIZE);
        const dateHeight = TEXT_SIZE * TEXT_LINE_HEIGHT;
        // Beside the signature, sitting on the same line; underneath if there's no room.
        let date = textPlacement(page, sig.x + sig.width + 18, 0, text);
        date = { ...date, y: sig.y + sig.height - dateHeight - 2 };
        if (date.x + dateWidth > viewport.width) date = { ...date, x: sig.x, y: sig.y + sig.height + 4 };
        added.push(clampToPage(date, viewport));
      }
    } else {
      const text = using === "date" ? todayString() : "Text";
      added.push(clampToPage(textPlacement(page, x, y, text), viewport));
    }

    setPlacements((items) => [...items, ...added]);
    setSelectedId(using === "text" ? added[0].id : null);
    setDirty(true);
  }

  function onPageClick(event: React.MouseEvent<HTMLDivElement>, page: number) {
    if ((event.target as HTMLElement).closest("[data-signer-ui]")) return;
    if (!tool) {
      setSelectedId(null);
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    void placeAt(page, (event.clientX - rect.left) / scale, (event.clientY - rect.top) / scale);
  }

  function updateItem(id: string, change: (item: Placement) => Placement) {
    setPlacements((items) => items.map((item) => (item.id === id ? change(item) : item)));
    setDirty(true);
  }

  function removeItem(id: string) {
    setPlacements((items) => items.filter((item) => item.id !== id));
    setSelectedId(null);
    setDirty(true);
  }

  function startDrag(event: React.PointerEvent<HTMLElement>, item: Placement, mode: "move" | "resize") {
    if (event.button !== 0) return;
    event.stopPropagation();
    setSelectedId(item.id);
    setTool(null);
    if (!pdf) return;
    const viewport = pdf.viewports[item.page];
    const target = event.currentTarget;
    const startX = event.clientX;
    const startY = event.clientY;
    let moved = false;
    target.setPointerCapture(event.pointerId);

    const onMove = (e: PointerEvent) => {
      const dx = (e.clientX - startX) / scale;
      const dy = (e.clientY - startY) / scale;
      if (!moved && Math.hypot(dx, dy) * scale < 3) return;
      moved = true;
      setPlacements((items) =>
        items.map((current) => {
          if (current.id !== item.id) return current;
          if (mode === "move") return clampToPage({ ...item, x: item.x + dx, y: item.y + dy }, viewport);
          if (item.kind !== "signature") return current;
          const ratio = item.height / item.width;
          const maxWidth = Math.min(viewport.width - item.x, (viewport.height - item.y) / ratio);
          const width = Math.min(Math.max(30, item.width + dx), maxWidth);
          return { ...item, width, height: width * ratio };
        }),
      );
    };
    const onUp = () => {
      target.removeEventListener("pointermove", onMove);
      target.removeEventListener("pointerup", onUp);
      target.removeEventListener("pointercancel", onUp);
      if (moved) setDirty(true);
    };
    target.addEventListener("pointermove", onMove);
    target.addEventListener("pointerup", onUp);
    target.addEventListener("pointercancel", onUp);
  }

  async function changeInk(color: string) {
    setInk(color);
    if (!selected) return;
    if (selected.kind === "text") {
      updateItem(selected.id, (item) => ({ ...item, color }));
    } else {
      const { image } = await inkSignature(selected.image, color);
      updateItem(selected.id, (item) => ({ ...item, image }));
    }
  }

  /* ---------- Saving ---------- */

  function buildPdf() {
    return exportSignedPdf(file!.bytes, pdf!.viewports, placements);
  }

  function saveFailed(error: unknown) {
    setStatus({
      kind: "error",
      message: error instanceof EncryptedPdfError ? error.message : `Couldn't save: ${errorMessage(error)}`,
    });
  }

  async function download() {
    if (!file || !pdf) return;
    setBusy(true);
    setStatus({ kind: "busy", message: "Preparing your PDF…" });
    try {
      const bytes = await buildPdf();
      const url = URL.createObjectURL(new Blob([new Uint8Array(bytes)], { type: "application/pdf" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = signedFileName(file.name);
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 30_000);
      setDirty(false);
      setStatus({ kind: "success", message: `Downloaded "${signedFileName(file.name)}".` });
    } catch (error) {
      saveFailed(error);
    } finally {
      setBusy(false);
    }
  }

  function saveToDrive(mode: "copy" | "replace") {
    if (!file || !pdf) return;
    const original = file;
    if (
      mode === "replace" &&
      !window.confirm(
        `Replace "${original.name}" in Google Drive with the signed version?\n\n` +
          "Drive keeps the old version for 30 days (right-click the file › File information › Manage versions).",
      )
    ) {
      return;
    }
    const tokenRequest = getAccessToken();
    void (async () => {
      try {
        // Wait for sign-in before showing progress: if the popup is closed
        // without an answer, the page shouldn't be left stuck on "Saving…".
        const token = await tokenRequest;
        setBusy(true);
        setStatus({ kind: "busy", message: "Saving to Google Drive…" });
        const bytes = await buildPdf();
        if (mode === "replace" && original.drive) {
          const saved = await replaceFile(original.drive.id, bytes, token);
          setStatus({ kind: "success", message: `Updated "${saved.name}" in Google Drive.`, link: saved.webViewLink });
        } else {
          const name = signedFileName(original.name);
          const { file: saved, inOriginalFolder } = await saveCopy(bytes, name, original.drive?.parents, token);
          setStatus({
            kind: "success",
            message:
              original.drive && !inOriginalFolder
                ? `Saved "${saved.name}" to the top of My Drive (this tool isn't allowed to add files to the original's folder).`
                : original.drive
                  ? `Saved "${saved.name}" next to the original in Google Drive.`
                  : `Saved "${saved.name}" to My Drive.`,
            link: saved.webViewLink,
          });
        }
        setDirty(false);
      } catch (error) {
        saveFailed(error);
      } finally {
        setBusy(false);
      }
    })();
  }

  /* ---------- Rendering ---------- */

  const driveButtonDisabled = busy || driveState !== "ready";
  const driveTitle =
    driveState === "off"
      ? "Google Drive isn't connected to this site yet"
      : driveState === "error"
        ? "Couldn't reach Google. Reload the page to try again."
        : driveState === "loading"
          ? "Loading Google Drive…"
          : undefined;

  const statusBar = status && (
    <div
      className={cn(
        "flex items-start gap-2 rounded-lg px-4 py-3 text-sm",
        status.kind === "error" && "bg-red-50 text-red-800",
        status.kind === "success" && "bg-emerald-50 text-emerald-800",
        status.kind === "busy" && "bg-slate-50 text-slate-700",
      )}
    >
      {status.kind === "busy" && <Loader2 className="mt-0.5 h-4 w-4 flex-shrink-0 animate-spin" />}
      <span>
        {status.message}{" "}
        {status.link && (
          <a href={status.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-semibold underline">
            Open in Drive <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
      </span>
    </div>
  );

  const hiddenInput = (
    <input
      ref={fileInputRef}
      type="file"
      accept="application/pdf,.pdf"
      className="hidden"
      onChange={(event) => {
        void onLocalFile(event.target.files?.[0]);
        event.target.value = "";
      }}
    />
  );

  const pad = padFor && <SignaturePad onSave={onSignatureSaved} onClose={() => setPadFor(null)} />;

  if (!pdf || !file) {
    return (
      <section className="bg-brand-cream/60 px-4 py-14 sm:py-20">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl font-bold sm:text-4xl">Sign a PDF</h1>
          <p className="mt-3 text-lg text-slate-700">
            Open a PDF from Google Drive or this computer, add your signature and the date, then save it back.
          </p>

          <div
            className={cn(
              "mt-8 rounded-2xl border-2 border-dashed bg-white p-8 text-center transition-colors",
              dragOver ? "border-brand-navy bg-brand-steel-light/20" : "border-slate-300",
            )}
            onDragOver={(event) => {
              event.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(event) => {
              event.preventDefault();
              setDragOver(false);
              void onLocalFile(event.dataTransfer.files?.[0]);
            }}
          >
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={openFromDrive}
                disabled={driveButtonDisabled}
                title={driveTitle}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-navy px-5 py-3 font-semibold text-white shadow-sm hover:bg-brand-navy-dark disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                {driveState === "loading" ? <Loader2 className="h-5 w-5 animate-spin" /> : <HardDrive className="h-5 w-5" />}
                Open from Google Drive
              </button>
              <button
                type="button"
                onClick={openFromComputer}
                disabled={busy}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-800 hover:bg-slate-50 disabled:opacity-50 sm:w-auto"
              >
                <FileUp className="h-5 w-5" />
                Open from this computer
              </button>
            </div>
            <p className="mt-4 text-sm text-slate-500">or drop a PDF here</p>
          </div>

          {driveState === "off" && (
            <p className="mt-4 text-sm text-slate-600">
              Google Drive isn&apos;t connected yet. You can still open a PDF from this computer.
            </p>
          )}
          {driveState === "error" && (
            <p className="mt-4 text-sm text-red-700">Couldn&apos;t reach Google Drive. Reload the page to try again.</p>
          )}

          {status && <div className="mt-4" aria-live="polite">{statusBar}</div>}

          <p className="mt-8 text-sm text-slate-600">
            <strong className="font-semibold text-slate-800">Private by design:</strong>{" "}
            the PDF is opened and signed inside your
            browser. It isn&apos;t uploaded to this website. It only goes back to your own Google Drive when you save it there.
          </p>
        </div>
        {hiddenInput}
        {pad}
      </section>
    );
  }

  const toolButton = (id: Tool, label: string, Icon: typeof Signature, primary = false) => (
    <button
      type="button"
      onClick={() => armTool(id)}
      aria-pressed={tool === id}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-semibold transition-colors",
        tool === id
          ? "bg-brand-coral text-white"
          : primary
            ? "bg-brand-navy text-white hover:bg-brand-navy-dark"
            : "border border-slate-300 bg-white text-slate-800 hover:bg-slate-50",
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );

  return (
    <section className="bg-slate-100">
      <div className="sticky top-20 z-40 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-4 py-2">
          <p className="mr-auto min-w-0 max-w-full truncate text-sm font-semibold text-slate-800" title={file.name}>
            {file.name}
            {dirty && <span className="ml-2 font-normal text-slate-500">· unsaved</span>}
          </p>
          <button
            type="button"
            onClick={openFromDrive}
            disabled={driveButtonDisabled}
            title={driveTitle}
            className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-40"
          >
            <HardDrive className="h-4 w-4" /> Open
          </button>
          <button
            type="button"
            onClick={openFromComputer}
            disabled={busy}
            className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-40"
            title="Open a PDF from this computer"
          >
            <FileUp className="h-4 w-4" /> <span className="sr-only sm:not-sr-only">From computer</span>
          </button>
          <span className="hidden h-6 w-px bg-slate-200 sm:block" />
          <button
            type="button"
            onClick={download}
            disabled={busy}
            className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 disabled:opacity-40"
          >
            <Download className="h-4 w-4" /> Download
          </button>
          {driveConfigured && (
            <button
              type="button"
              onClick={() => saveToDrive("copy")}
              disabled={driveButtonDisabled}
              title={driveTitle ?? "Saves a new file with “- signed” in the name"}
              className="inline-flex items-center gap-1.5 rounded-md bg-brand-navy px-3 py-2 text-sm font-semibold text-white hover:bg-brand-navy-dark disabled:opacity-40"
            >
              <CloudUpload className="h-4 w-4" /> Save copy to Drive
            </button>
          )}
          {file.drive && (
            <button
              type="button"
              onClick={() => saveToDrive("replace")}
              disabled={driveButtonDisabled}
              title="Overwrite the original file in Drive"
              className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 disabled:opacity-40"
            >
              <Replace className="h-4 w-4" /> Replace original
            </button>
          )}
        </div>

        <div className="border-t border-slate-100">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-4 py-2">
            {toolButton("signDate", "Sign & date", Signature, true)}
            {toolButton("signature", "Signature", PenLine)}
            {toolButton("date", "Date", CalendarDays)}
            {toolButton("text", "Text", Type)}
            <div className="ml-1 flex items-center gap-1.5" role="group" aria-label="Ink color">
              {INKS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => void changeInk(option.value)}
                  aria-pressed={ink === option.value}
                  aria-label={option.label}
                  title={option.label}
                  className={cn(
                    "h-7 w-7 rounded-full border-2",
                    ink === option.value ? "border-brand-coral ring-2 ring-brand-coral/30" : "border-white ring-1 ring-slate-300",
                  )}
                  style={{ backgroundColor: option.value }}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setPadFor("change")}
              className="ml-auto text-sm font-semibold text-brand-navy underline-offset-2 hover:underline"
            >
              {signature ? "Redraw my signature" : "Draw my signature"}
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pt-4" aria-live="polite">
        {tool ? (
          <div className="flex items-center justify-between gap-3 rounded-lg bg-brand-coral/10 px-4 py-3 text-sm text-brand-coral-dark">
            <span className="font-semibold">{TOOL_HINTS[tool]}</span>
            <button type="button" onClick={() => setTool(null)} className="font-semibold underline">
              Cancel
            </button>
          </div>
        ) : (
          statusBar ?? (
            <p className="px-1 text-sm text-slate-600">
              Pick <strong>Sign &amp; date</strong>, then click the signature line. Drag anything to move it.
            </p>
          )
        )}
      </div>

      <div ref={containerRef} className="mx-auto flex max-w-[920px] flex-col items-center gap-6 px-4 py-6">
        {pdf.pages.map((page, index) => {
          const viewport = pdf.viewports[index];
          return (
            <div
              key={index}
              className="relative bg-white shadow-md"
              style={{
                width: viewport.width * scale,
                height: viewport.height * scale,
                cursor: tool ? "crosshair" : undefined,
              }}
              onClick={(event) => onPageClick(event, index)}
              aria-label={`Page ${index + 1} of ${pdf.pages.length}`}
              role="group"
            >
              <PageCanvas page={page} viewport={viewport} scale={scale} />
              {placements
                .filter((item) => item.page === index)
                .map((item) => (
                  <PlacedItem
                    key={item.id}
                    item={item}
                    scale={scale}
                    pageWidth={viewport.width * scale}
                    selected={item.id === selectedId}
                    onPointerDown={(event, mode) => startDrag(event, item, mode)}
                    onChange={(change) => updateItem(item.id, change)}
                    onRemove={() => removeItem(item.id)}
                  />
                ))}
            </div>
          );
        })}
      </div>
      {hiddenInput}
      {pad}
    </section>
  );
}

type PlacedItemProps = {
  item: Placement;
  scale: number;
  pageWidth: number;
  selected: boolean;
  onPointerDown: (event: React.PointerEvent<HTMLElement>, mode: "move" | "resize") => void;
  onChange: (change: (item: Placement) => Placement) => void;
  onRemove: () => void;
};

function PlacedItem({ item, scale, pageWidth, selected, onPointerDown, onChange, onRemove }: PlacedItemProps) {
  const { width, height } = boxOf(item);
  const left = item.x * scale;
  const top = item.y * scale;
  const toolbarBelow = top < 52;
  // Line the toolbar up with whichever edge of the item keeps it on the page.
  const toolbarSide = left > pageWidth / 2 ? { right: Math.max(0, pageWidth - left - width * scale) } : { left };

  return (
    <>
      <div
        data-signer-ui
        className={cn(
          "absolute cursor-move touch-none select-none",
          selected ? "outline outline-2 outline-offset-2 outline-brand-coral" : "hover:outline hover:outline-1 hover:outline-brand-steel",
        )}
        style={{ left, top, width: width * scale, height: height * scale }}
        onPointerDown={(event) => onPointerDown(event, "move")}
      >
        {item.kind === "signature" ? (
          // eslint-disable-next-line @next/next/no-img-element -- a local data URL, nothing for next/image to optimize
          <img src={item.image} alt="Your signature" draggable={false} className="pointer-events-none h-full w-full" />
        ) : (
          <div
            className="whitespace-pre"
            style={{
              fontFamily: TEXT_FONT_FAMILY,
              fontSize: item.size * scale,
              lineHeight: TEXT_LINE_HEIGHT,
              color: item.color,
            }}
          >
            {item.text}
          </div>
        )}
        {selected && item.kind === "signature" && (
          <span
            className="absolute -bottom-2 -right-2 h-4 w-4 cursor-nwse-resize rounded-full border-2 border-white bg-brand-coral shadow"
            onPointerDown={(event) => onPointerDown(event, "resize")}
            aria-hidden="true"
          />
        )}
      </div>

      {selected && (
        <div
          data-signer-ui
          className="absolute z-10 flex items-center gap-1 rounded-lg border border-slate-200 bg-white p-1 shadow-lg"
          style={{ ...toolbarSide, top: toolbarBelow ? top + height * scale + 10 : top - 46 }}
          onPointerDown={(event) => event.stopPropagation()}
        >
          {item.kind === "text" && (
            <>
              <input
                value={item.text}
                onChange={(event) => onChange((current) => ({ ...current, text: event.target.value }) as Placement)}
                className="w-32 rounded border border-slate-300 px-2 py-1 text-sm sm:w-40"
                aria-label="Text"
                autoFocus={item.text === "Text"}
                onFocus={(event) => {
                  if (item.text === "Text") event.target.select();
                }}
              />
              <button
                type="button"
                onClick={() => onChange((current) => ({ ...current, size: Math.max(6, (current as typeof item).size - 1) }) as Placement)}
                className="rounded p-1.5 text-slate-700 hover:bg-slate-100"
                aria-label="Smaller text"
              >
                <Minus className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => onChange((current) => ({ ...current, size: Math.min(48, (current as typeof item).size + 1) }) as Placement)}
                className="rounded p-1.5 text-slate-700 hover:bg-slate-100"
                aria-label="Larger text"
              >
                <Plus className="h-4 w-4" />
              </button>
            </>
          )}
          <button type="button" onClick={onRemove} className="rounded p-1.5 text-red-600 hover:bg-red-50" aria-label="Delete">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      )}
    </>
  );
}

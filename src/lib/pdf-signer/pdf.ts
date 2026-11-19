/**
 * PDF reading (PDF.js) and writing (pdf-lib) for the signer. Both run in the
 * browser only; the file never leaves the user's machine except to go back to
 * their own Google Drive.
 */
import type { PDFDocumentProxy, PDFPageProxy, PageViewport } from "pdfjs-dist";

/** Something placed on a page. Positions and sizes are in PDF points as the page is displayed (top-left origin, after the page's own rotation). */
export type Placement =
  | {
      id: string;
      kind: "signature";
      page: number;
      x: number;
      y: number;
      width: number;
      height: number;
      /** PNG data URL, already in the chosen ink color. */
      image: string;
    }
  | {
      id: string;
      kind: "text";
      page: number;
      x: number;
      y: number;
      text: string;
      size: number;
      color: string;
    };

/** On-screen text boxes use this line height (in ems) so they line up with the saved PDF. */
export const TEXT_LINE_HEIGHT = 1.2;
/** On-screen text uses Arial, which has the same letter widths as the PDF's Helvetica. */
export const TEXT_FONT_FAMILY = 'Arial, "Liberation Sans", Helvetica, sans-serif';
/**
 * Distance from the top of an on-screen text line to its baseline, in ems:
 * half the extra line height plus Arial's ascent, (1.2 - 1.117) / 2 + 0.905.
 */
const TEXT_BASELINE = (TEXT_LINE_HEIGHT - 1.117) / 2 + 0.905;

type Pdfjs = typeof import("pdfjs-dist");
let pdfjsLoad: Promise<{ pdfjs: Pdfjs; worker: InstanceType<Pdfjs["PDFWorker"]> }> | null = null;

/** Loads PDF.js and starts one background worker, shared by every file opened in this tab. */
function loadPdfjs() {
  pdfjsLoad ??= import("pdfjs-dist").then((pdfjs) => {
    const port = new Worker(new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url), { type: "module" });
    return { pdfjs, worker: pdfjs.PDFWorker.create({ port }) };
  });
  return pdfjsLoad;
}

export type LoadedPdf = {
  doc: PDFDocumentProxy;
  /** Frees the document's memory in the worker. */
  close: () => Promise<void>;
  pages: PDFPageProxy[];
  /** Each page's viewport at 100% zoom. */
  viewports: PageViewport[];
};

export async function openPdf(bytes: Uint8Array): Promise<LoadedPdf> {
  const { pdfjs, worker } = await loadPdfjs();
  const task = pdfjs.getDocument({
    worker,
    // PDF.js takes ownership of the buffer it's given, so hand it a copy.
    data: bytes.slice(),
    wasmUrl: "/pdfjs/wasm/",
    standardFontDataUrl: "/pdfjs/standard_fonts/",
    iccUrl: "/pdfjs/iccs/",
    enableXfa: false,
  });
  const doc = await task.promise;
  const pages = await Promise.all(Array.from({ length: doc.numPages }, (_, i) => doc.getPage(i + 1)));
  const viewports = pages.map((page) => page.getViewport({ scale: 1 }));
  return { doc, close: () => task.destroy(), pages, viewports };
}

function hexToRgb(hex: string) {
  const value = parseInt(hex.replace("#", ""), 16);
  return { r: ((value >> 16) & 255) / 255, g: ((value >> 8) & 255) / 255, b: (value & 255) / 255 };
}

export class EncryptedPdfError extends Error {}

/**
 * Draws every placement onto the original PDF and returns the new file.
 * Everything is drawn into the page content, so it can't be moved later.
 */
export async function exportSignedPdf(original: Uint8Array, viewports: PageViewport[], placements: Placement[]): Promise<Uint8Array> {
  const { PDFDocument, StandardFonts, degrees, rgb } = await import("pdf-lib");
  const pdf = await PDFDocument.load(original, { ignoreEncryption: true, updateMetadata: false });
  if (pdf.isEncrypted) {
    throw new EncryptedPdfError(
      "This PDF is locked (encrypted), so it can't be changed. Ask the sender for an unlocked copy, or print it to PDF first.",
    );
  }

  const pages = pdf.getPages();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const images = new Map<string, Awaited<ReturnType<typeof pdf.embedPng>>>();

  // Helvetica can only write Latin characters; swap anything else for "?".
  const encodable = (text: string) =>
    Array.from(text, (ch) => {
      try {
        font.encodeText(ch);
        return ch;
      } catch {
        return "?";
      }
    }).join("");

  for (const item of placements) {
    const page = pages[item.page];
    const viewport = viewports[item.page];
    if (!page || !viewport) continue;
    // Draw upright as the page is shown: undo the page's own rotation.
    const rotate = degrees(((viewport.rotation % 360) + 360) % 360);

    if (item.kind === "signature") {
      let image = images.get(item.image);
      if (!image) {
        image = await pdf.embedPng(item.image);
        images.set(item.image, image);
      }
      const [x, y] = viewport.convertToPdfPoint(item.x, item.y + item.height);
      page.drawImage(image, { x, y, width: item.width, height: item.height, rotate });
    } else {
      const { r, g, b } = hexToRgb(item.color);
      item.text.split("\n").forEach((line, index) => {
        const top = item.y + index * item.size * TEXT_LINE_HEIGHT;
        const [x, y] = viewport.convertToPdfPoint(item.x, top + item.size * TEXT_BASELINE);
        page.drawText(encodable(line), { x, y, size: item.size, font, color: rgb(r, g, b), rotate });
      });
    }
  }

  return pdf.save();
}

/** "Consent form.pdf" -> "Consent form - signed.pdf" */
export function signedFileName(name: string): string {
  const base = name.replace(/\.pdf$/i, "");
  return `${base} - signed.pdf`;
}

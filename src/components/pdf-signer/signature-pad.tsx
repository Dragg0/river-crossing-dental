"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

const STORAGE_KEY = "rcd-pdf-signature-v1";

// Kept in memory too, for when the browser blocks storage (private windows).
let memorySignature: string | null = null;
const listeners = new Set<() => void>();

/** The saved signature, in black on transparent, from this browser only. */
export function loadSavedSignature(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? memorySignature;
  } catch {
    return memorySignature;
  }
}

export function storeSignature(dataUrl: string | null) {
  memorySignature = dataUrl;
  try {
    if (dataUrl) localStorage.setItem(STORAGE_KEY, dataUrl);
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* Storage blocked: the in-memory copy lasts until the tab closes. */
  }
  listeners.forEach((listener) => listener());
}

/** For useSyncExternalStore. */
export function subscribeSignature(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Couldn't read the signature image."));
    img.src = src;
  });
}

/** Recolors a black signature to the chosen ink and reports its size. */
export async function inkSignature(dataUrl: string, color: string): Promise<{ image: string; width: number; height: number }> {
  const img = await loadImage(dataUrl);
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0);
  ctx.globalCompositeOperation = "source-in";
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  return { image: canvas.toDataURL("image/png"), width: img.naturalWidth, height: img.naturalHeight };
}

/** Crops the drawing to the ink, with a little margin, and returns a PNG. */
function trimToInk(canvas: HTMLCanvasElement): string | null {
  const ctx = canvas.getContext("2d")!;
  const { width, height } = canvas;
  const data = ctx.getImageData(0, 0, width, height).data;
  let top = height,
    left = width,
    right = -1,
    bottom = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (data[(y * width + x) * 4 + 3] > 0) {
        if (x < left) left = x;
        if (x > right) right = x;
        if (y < top) top = y;
        if (y > bottom) bottom = y;
      }
    }
  }
  if (right < 0) return null;
  const pad = Math.round(4 * (window.devicePixelRatio || 1));
  left = Math.max(0, left - pad);
  top = Math.max(0, top - pad);
  right = Math.min(width - 1, right + pad);
  bottom = Math.min(height - 1, bottom + pad);
  const out = document.createElement("canvas");
  out.width = right - left + 1;
  out.height = bottom - top + 1;
  out.getContext("2d")!.drawImage(canvas, left, top, out.width, out.height, 0, 0, out.width, out.height);
  return out.toDataURL("image/png");
}

type Props = {
  onSave: (dataUrl: string) => void;
  onClose: () => void;
};

export function SignaturePad({ onSave, onClose }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef<{ points: { x: number; y: number }[] } | null>(null);
  const [hasInk, setHasInk] = useState(false);

  // Size the canvas backing store to the screen's pixel density.
  useEffect(() => {
    const canvas = canvasRef.current!;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    const ctx = canvas.getContext("2d")!;
    ctx.scale(dpr, dpr);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 2.75;
    ctx.strokeStyle = "#000";
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  function point(event: React.PointerEvent | PointerEvent) {
    const rect = canvasRef.current!.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }

  function onPointerDown(event: React.PointerEvent<HTMLCanvasElement>) {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    const p = point(event);
    drawing.current = { points: [p] };
    // A tap leaves a dot.
    const ctx = canvasRef.current!.getContext("2d")!;
    ctx.beginPath();
    ctx.arc(p.x, p.y, ctx.lineWidth / 2, 0, Math.PI * 2);
    ctx.fillStyle = "#000";
    ctx.fill();
    setHasInk(true);
  }

  function onPointerMove(event: React.PointerEvent<HTMLCanvasElement>) {
    const stroke = drawing.current;
    if (!stroke) return;
    const ctx = canvasRef.current!.getContext("2d")!;
    const events = event.nativeEvent.getCoalescedEvents?.() ?? [event.nativeEvent];
    for (const e of events.length ? events : [event.nativeEvent]) {
      const p = point(e);
      const pts = stroke.points;
      pts.push(p);
      if (pts.length < 3) {
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
        continue;
      }
      // Smooth curve through the midpoints of the last three samples.
      const [a, b, c] = pts.slice(-3);
      ctx.beginPath();
      ctx.moveTo((a.x + b.x) / 2, (a.y + b.y) / 2);
      ctx.quadraticCurveTo(b.x, b.y, (b.x + c.x) / 2, (b.y + c.y) / 2);
      ctx.stroke();
    }
  }

  function onPointerUp() {
    drawing.current = null;
  }

  function clear() {
    const canvas = canvasRef.current!;
    canvas.getContext("2d")!.clearRect(0, 0, canvas.width, canvas.height);
    setHasInk(false);
  }

  function save() {
    const dataUrl = trimToInk(canvasRef.current!);
    if (dataUrl) onSave(dataUrl);
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 p-4"
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div role="dialog" aria-modal="true" aria-labelledby="signature-pad-title" className="w-full max-w-2xl rounded-xl bg-white p-5 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="signature-pad-title" className="text-lg font-bold">
              Draw your signature
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Use your mouse, trackpad, or finger. It&apos;s saved in this browser only, so you only draw it once.
            </p>
          </div>
          <button type="button" onClick={onClose} className="rounded-md p-1 text-slate-500 hover:bg-slate-100" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="relative mt-4">
          <canvas
            ref={canvasRef}
            className="block h-52 w-full touch-none rounded-lg border-2 border-dashed border-slate-300 bg-white sm:h-56"
            style={{ cursor: "crosshair" }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            aria-label="Signature drawing area"
          />
          <div className="pointer-events-none absolute bottom-10 left-6 right-6 border-b border-slate-300" />
          {!hasInk && (
            <p className="pointer-events-none absolute inset-0 flex items-center justify-center text-slate-400">Sign here</p>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-end gap-2">
          <button
            type="button"
            onClick={clear}
            className="rounded-md px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-40"
            disabled={!hasInk}
          >
            Clear
          </button>
          <button
            type="button"
            onClick={save}
            className="rounded-md bg-brand-navy px-4 py-2 text-sm font-semibold text-white hover:bg-brand-navy-dark disabled:opacity-40"
            disabled={!hasInk}
          >
            Use this signature
          </button>
        </div>
      </div>
    </div>
  );
}

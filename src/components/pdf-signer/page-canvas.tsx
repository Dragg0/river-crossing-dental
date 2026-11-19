"use client";

import { useEffect, useRef, useState } from "react";
import type { PDFPageProxy, PageViewport } from "pdfjs-dist";

type Props = {
  page: PDFPageProxy;
  viewport: PageViewport;
  scale: number;
};

/** Renders one PDF page, once it's near the screen, at the current zoom. */
export function PageCanvas({ page, viewport, scale }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "1200px 0px" },
    );
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const canvas = canvasRef.current!;
    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    const renderViewport = page.getViewport({ scale: scale * dpr });
    // Draw into an offscreen canvas so the old render stays up until the new one is ready.
    const offscreen = document.createElement("canvas");
    offscreen.width = Math.floor(renderViewport.width);
    offscreen.height = Math.floor(renderViewport.height);
    const task = page.render({ canvas: offscreen, viewport: renderViewport });
    let cancelled = false;
    task.promise.then(
      () => {
        if (cancelled) return;
        canvas.width = offscreen.width;
        canvas.height = offscreen.height;
        canvas.getContext("2d")!.drawImage(offscreen, 0, 0);
      },
      () => {
        /* Cancelled by a newer render. */
      },
    );
    return () => {
      cancelled = true;
      task.cancel();
    };
  }, [page, scale, visible]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full bg-white"
      style={{ width: viewport.width * scale, height: viewport.height * scale }}
      aria-hidden="true"
    />
  );
}

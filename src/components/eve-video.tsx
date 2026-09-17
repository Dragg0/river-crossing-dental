"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useRef, useState } from "react";

export function EveVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [playbackMessage, setPlaybackMessage] = useState("");

  function startVideo() {
    const video = videoRef.current;
    if (!video) return;

    setStarted(true);
    // Call play directly from the tap so mobile browsers retain user activation.
    void video.play().catch(() => {
      setPlaybackMessage("Tap play in the video controls, or open the video below.");
      video.focus({ preventScroll: true });
    });
  }

  return (
    <>
      {!started && (
        <Image
          src="/videos/meet-eve-poster.jpg"
          alt="Dr. John Peterson introduces Eve, our AI receptionist"
          width={1920}
          height={1080}
          unoptimized
          className="aspect-video w-full rounded-2xl shadow-lg"
        />
      )}
      <video
        ref={videoRef}
        id="eve-introduction-video"
        hidden={!started}
        controls
        playsInline
        preload="none"
        width={1920}
        height={1080}
        poster="/videos/meet-eve-poster.jpg"
        tabIndex={0}
        aria-label="Dr. John Peterson introduces Eve, our AI receptionist"
        onPlaying={() => {
          setPlaybackMessage("");
          videoRef.current?.focus({ preventScroll: true });
        }}
        onError={() => setPlaybackMessage("The video could not load. You can try opening it below.")}
        className="aspect-video w-full rounded-2xl bg-brand-navy-dark shadow-lg"
      >
        <source src="/videos/meet-eve.mp4" type="video/mp4" />
        <track src="/videos/meet-eve.vtt" kind="captions" srcLang="en" label="English" />
        <a href="/videos/meet-eve.mp4">Watch Dr. Peterson introduce Eve.</a>
      </video>
      {!started && (
        <button
          type="button"
          onClick={startVideo}
          aria-controls="eve-introduction-video"
          className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-navy px-5 py-3 text-base font-semibold text-white transition-colors hover:bg-brand-navy-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-navy"
        >
          <Play className="h-5 w-5 shrink-0" aria-hidden="true" />
          Meet Eve — watch the video
        </button>
      )}
      {playbackMessage && (
        <p role="status" className="mt-3 text-sm text-slate-600">
          {playbackMessage}{" "}
          <a href="/videos/meet-eve.mp4" className="font-semibold text-brand-navy underline">
            Open video
          </a>
        </p>
      )}
      <noscript>
        <p className="mt-3">
          <a href="/videos/meet-eve.mp4" className="font-semibold text-brand-navy underline">
            Meet Eve — watch the video
          </a>
        </p>
      </noscript>
    </>
  );
}

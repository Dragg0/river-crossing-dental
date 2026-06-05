"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { nav, siteConfig } from "@/lib/site-config";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close menu when viewport grows past mobile breakpoint (e.g. tablet rotation)
  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [open]);

  const overlay = (
    <div className="md:hidden" role="dialog" aria-modal="true" aria-label="Site navigation">
      {/* Backdrop (click-to-close, dark scrim) */}
      <button
        type="button"
        aria-label="Close menu"
        onClick={() => setOpen(false)}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 60,
          backgroundColor: "rgba(15, 23, 42, 0.6)",
        }}
      />

      {/* Sheet — covers viewport with solid background */}
      <div
        className="flex flex-col"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          height: "100dvh",
          maxHeight: "100dvh",
          zIndex: 70,
          backgroundColor: "#ffffff",
        }}
      >
        <div className="flex h-16 flex-shrink-0 items-center justify-between px-4 border-b border-slate-200 bg-white">
          <span className="font-bold text-brand-navy">Menu</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-slate-100"
            aria-label="Close menu"
          >
            <X className="h-6 w-6 text-brand-navy" />
          </button>
        </div>

        <nav
          className="flex-1 overflow-y-auto px-4 py-6 space-y-1 bg-white"
          style={{ minHeight: 0 }}
        >
          {nav.map((item) => {
            const isExpanded = expanded === item.label;
            return (
              <div key={item.label}>
                {item.children ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setExpanded(isExpanded ? null : item.label)}
                      className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-base font-semibold text-brand-navy hover:bg-slate-50"
                      aria-expanded={isExpanded}
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      />
                    </button>
                    {isExpanded && (
                      <div className="ml-4 mt-1 space-y-1 border-l-2 border-brand-steel-light pl-3">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setOpen(false)}
                            className="block rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-brand-navy"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-4 py-3 text-base font-semibold text-brand-navy hover:bg-slate-50"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>

        <div className="border-t border-slate-200 p-4 space-y-3 bg-white flex-shrink-0">
          <a
            href={`tel:${siteConfig.phone.tel}`}
            className="block text-center text-sm font-medium text-brand-navy"
          >
            Call {siteConfig.phone.display}
          </a>
          <a
            href={siteConfig.booking}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="block w-full rounded-full bg-brand-coral px-6 py-3 text-center text-sm font-semibold text-white shadow-md hover:bg-brand-coral-dark"
          >
            Book Appointment
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full text-brand-navy hover:bg-slate-100"
        aria-label="Open menu"
        aria-expanded={open}
      >
        <Menu className="h-6 w-6" />
      </button>

      {open && createPortal(overlay, document.body)}
    </>
  );
}

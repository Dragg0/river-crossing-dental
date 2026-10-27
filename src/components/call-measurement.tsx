"use client";

import Script from "next/script";
import { createContext, useContext, useEffect, useState, useSyncExternalStore } from "react";
import type { ComponentProps, ReactNode } from "react";
import { siteConfig } from "@/lib/site-config";
import { normalizeForwardingNumber } from "@/lib/call-measurement";
import {
  BOOKING_CONVERSION_SEND_TO,
  CALL_CONVERSION_SEND_TO,
  CONSENT_ALLOWED,
  CONSENT_DENIED,
  GOOGLE_ADS_TAG_ID,
  isGoogleAdsHost,
  isOnlineBookingHref,
  urlWithoutQueryOrHash,
} from "@/lib/google-ads";

const CHOICE_KEY = "rcd-ad-measurement-v1";
const CHOICE_EVENT = "rcd-ad-measurement-change";
const CONVERSION_NAV_TIMEOUT_MS = 1000;
type Choice = "allowed" | "declined" | null;
type Phone = { display: string; tel: string };
const PhoneContext = createContext<Phone>(siteConfig.phone);
let sessionChoice: Choice = null;
let measurementConsentGranted = false;
let tagConfigured = false;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function readChoice(): Choice {
  try {
    const value = localStorage.getItem(CHOICE_KEY);
    return value === "allowed" || value === "declined" ? value : sessionChoice;
  } catch {
    return sessionChoice;
  }
}

function subscribe(listener: () => void) {
  function onStorage(event: StorageEvent) {
    if (event.key === CHOICE_KEY && event.newValue === "declined") window.location.reload();
    listener();
  }
  window.addEventListener("storage", onStorage);
  window.addEventListener(CHOICE_EVENT, listener);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(CHOICE_EVENT, listener);
  };
}

function choose(value: Exclude<Choice, null>) {
  sessionChoice = value;
  try { localStorage.setItem(CHOICE_KEY, value); } catch { /* Choice still works for this visit. */ }
  window.dispatchEvent(new Event(CHOICE_EVENT));
}

function ensureGtagStub() {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function (...args: unknown[]) {
    window.dataLayer!.push(args);
  };
}

function grantMeasurementConsent() {
  if (measurementConsentGranted || readChoice() !== "allowed") return;
  measurementConsentGranted = true;
  ensureGtagStub();
  window.gtag!("consent", "update", { ...CONSENT_ALLOWED });
  window.gtag!("set", "allow_ad_personalization_signals", false);
  window.gtag!("set", "allow_google_signals", false);
  // Queued before gtag.js runs so the tag's own page view cannot carry a query string.
  window.gtag!("set", "page_location", urlWithoutQueryOrHash(window.location.href));
  const referrer = referrerWithoutQuery();
  if (referrer) window.gtag!("set", "page_referrer", referrer);
}

function pageLocationWithoutQuery(): string {
  return urlWithoutQueryOrHash(window.location.href);
}

function referrerWithoutQuery(): string | undefined {
  if (!document.referrer) return undefined;
  try {
    return urlWithoutQueryOrHash(document.referrer);
  } catch {
    return undefined;
  }
}

function measurementAllowedHere(): boolean {
  return readChoice() === "allowed" && isGoogleAdsHost(window.location.hostname);
}

function sendBookingConversion(onSent?: () => void) {
  if (!measurementAllowedHere()) {
    onSent?.();
    return;
  }
  grantMeasurementConsent();
  if (!window.gtag) {
    onSent?.();
    return;
  }
  const payload: Record<string, unknown> = {
    send_to: BOOKING_CONVERSION_SEND_TO,
    page_location: pageLocationWithoutQuery(),
  };
  const referrer = referrerWithoutQuery();
  if (referrer) payload.page_referrer = referrer;

  // A new tab leaves this page in place, so a beacon can finish without
  // delaying navigation. A same-tab booking waits for the hit, then goes.
  if (!onSent) {
    payload.transport_type = "beacon";
    window.gtag("event", "conversion", payload);
    return;
  }

  let finished = false;
  const done = () => {
    if (finished) return;
    finished = true;
    onSent();
  };
  payload.event_callback = done;
  window.gtag("event", "conversion", payload);
  window.setTimeout(done, CONVERSION_NAV_TIMEOUT_MS);
}

function bookingAnchor(target: EventTarget | null): HTMLAnchorElement | null {
  if (!(target instanceof Element)) return null;
  const anchor = target.closest("a");
  if (!anchor || !isOnlineBookingHref(anchor.href)) return null;
  return anchor;
}

export function PhoneLink({ children, ...props }: Omit<ComponentProps<"a">, "href">) {
  const phone = useContext(PhoneContext);
  return <a {...props} href={`tel:${phone.tel}`}>{children}</a>;
}

export function PhoneNumber() {
  return <>{useContext(PhoneContext).display}</>;
}

export function CallMeasurement({ children }: { children: ReactNode }) {
  const choice = useSyncExternalStore<Choice | "pending">(subscribe, readChoice, () => "pending");
  const [phone, setPhone] = useState<Phone>(siteConfig.phone);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const measurementHost = useSyncExternalStore(
    subscribe,
    () => isGoogleAdsHost(window.location.hostname),
    () => false,
  );

  // Queue the consent update before React commits the gtag.js tag below.
  // An effect would run too late: the script can execute before it.
  if (typeof window !== "undefined" && choice === "allowed" && measurementHost) {
    grantMeasurementConsent();
  }

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (event.type === "auxclick") {
        if (event.button !== 1) return;
      } else if (event.button !== 0) {
        return;
      }
      const anchor = bookingAnchor(event.target);
      if (!anchor) return;
      const opensSeparately =
        anchor.target === "_blank" ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.button === 1;
      if (opensSeparately) {
        sendBookingConversion();
        return;
      }
      if (!measurementAllowedHere()) return;
      event.preventDefault();
      sendBookingConversion(() => {
        window.location.assign(anchor.href);
      });
    }
    document.addEventListener("click", onClick, true);
    document.addEventListener("auxclick", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("auxclick", onClick, true);
    };
  }, []);

  function initializeTag() {
    if (tagConfigured || readChoice() !== "allowed") return;
    tagConfigured = true;
    ensureGtagStub();
    grantMeasurementConsent();
    window.gtag!("js", new Date());
    window.gtag!("config", GOOGLE_ADS_TAG_ID, {
      allow_enhanced_conversions: false,
      page_location: pageLocationWithoutQuery(),
    });
    window.gtag!("config", CALL_CONVERSION_SEND_TO, {
      phone_conversion_number: siteConfig.phone.display,
      phone_conversion_callback: (display: string, number: string) => {
        if (readChoice() !== "allowed") return;
        const tel = normalizeForwardingNumber(number);
        if (tel && display) setPhone({ display, tel });
      },
    });
  }

  function updateChoice(value: Exclude<Choice, null>) {
    choose(value);
    setPreferencesOpen(false);
    if (value === "declined") {
      setPhone(siteConfig.phone);
      const tagStarted = measurementConsentGranted || tagConfigured;
      measurementConsentGranted = false;
      if (tagStarted) {
        ensureGtagStub();
        window.gtag!("consent", "update", { ...CONSENT_DENIED });
        // Unload the already-loaded tag; subsequent visits keep it unloaded.
        window.location.reload();
      }
    }
  }

  return (
    <PhoneContext.Provider value={choice === "allowed" ? phone : siteConfig.phone}>
      {children}
      {choice === "allowed" && measurementHost && (
        <Script id="rcd-google-ads" src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_TAG_ID}`}
          strategy="afterInteractive" onReady={initializeTag} />
      )}
      <div className="bg-brand-navy px-4 pb-4 text-center">
        <button type="button" onClick={() => setPreferencesOpen(true)}
          className="text-xs text-slate-300 underline underline-offset-4 hover:text-white">
          Ad measurement preferences
        </button>
      </div>
      {(choice === null || preferencesOpen) && (
        <section aria-label="Ad measurement preferences"
          className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-slate-50 px-3 py-2 text-xs leading-snug text-slate-700 shadow-lg sm:px-4 sm:py-4 sm:text-sm sm:leading-normal">
          <div className="mx-auto flex max-w-5xl flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <p className="min-w-0 flex-1">
              May we use Google measurement cookies to understand which ads lead to calls?
              If you allow this, Google may display a forwarding number that connects to our office
              and measure call details such as time and duration. You can call and book either way.{" "}
              <a href="/privacy-policy" className="font-semibold underline">Privacy details</a>
            </p>
            <div className="flex shrink-0 gap-2">
              <button type="button" onClick={() => updateChoice("declined")}
                className="min-h-9 flex-1 rounded-lg border border-slate-400 px-3 py-1.5 text-xs font-semibold sm:min-h-11 sm:flex-none sm:px-4 sm:py-2 sm:text-sm">Decline</button>
              <button type="button" onClick={() => updateChoice("allowed")}
                className="min-h-9 flex-1 rounded-lg bg-brand-navy px-3 py-1.5 text-xs font-semibold text-white sm:min-h-11 sm:flex-none sm:px-4 sm:py-2 sm:text-sm">Allow measurement</button>
            </div>
          </div>
        </section>
      )}
    </PhoneContext.Provider>
  );
}

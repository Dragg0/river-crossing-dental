"use client";

import Script from "next/script";
import { createContext, useContext, useRef, useState, useSyncExternalStore } from "react";
import type { ComponentProps, ReactNode } from "react";
import { siteConfig } from "@/lib/site-config";
import { normalizeForwardingNumber } from "@/lib/call-measurement";

const TAG_ID = "AW-11116960223";
const CALL_ACTION = `${TAG_ID}/e-qaCI-1hPscEN-z_bQp`;
const CHOICE_KEY = "rcd-ad-measurement-v1";
const CHOICE_EVENT = "rcd-ad-measurement-change";
type Choice = "allowed" | "declined" | null;
type Phone = { display: string; tel: string };
const PhoneContext = createContext<Phone>(siteConfig.phone);
let sessionChoice: Choice = null;

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
  const initialized = useRef(false);

  // Never send preview/development traffic to the practice's advertising account.
  const productionHost = useSyncExternalStore(subscribe, () =>
    ["rivercrossingdental.com", "www.rivercrossingdental.com"].includes(window.location.hostname),
  () => false);

  function initializeTag() {
    if (initialized.current || readChoice() !== "allowed") return;
    initialized.current = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function (...args: unknown[]) { window.dataLayer!.push(args); };
    window.gtag("consent", "default", {
      ad_storage: "granted", ad_user_data: "granted",
      ad_personalization: "denied", analytics_storage: "denied",
    });
    window.gtag("set", "allow_ad_personalization_signals", false);
    window.gtag("set", "allow_google_signals", false);
    window.gtag("js", new Date());
    window.gtag("config", TAG_ID, { allow_enhanced_conversions: false });
    window.gtag("config", CALL_ACTION, {
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
      if (initialized.current) {
        window.gtag?.("consent", "update", {
          ad_storage: "denied", ad_user_data: "denied",
          ad_personalization: "denied", analytics_storage: "denied",
        });
        // Unload the already-loaded tag; subsequent visits keep it unloaded.
        window.location.reload();
      }
    }
  }

  return (
    <PhoneContext.Provider value={choice === "allowed" ? phone : siteConfig.phone}>
      {children}
      {choice === "allowed" && productionHost && (
        <Script id="rcd-google-ads" src={`https://www.googletagmanager.com/gtag/js?id=${TAG_ID}`}
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
          className="fixed inset-x-0 bottom-0 z-50 max-h-[45vh] overflow-y-auto border-t border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-700 shadow-lg">
          <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-center">
            <p className="flex-1">
              May we use Google measurement cookies to understand which ads lead to calls?
              If you allow this, Google may display a forwarding number that connects to our office
              and measure call details such as time and duration. You can call and book either way.{" "}
              <a href="/privacy-policy" className="font-semibold underline">Privacy details</a>
            </p>
            <div className="flex shrink-0 flex-wrap gap-2">
              <button type="button" onClick={() => updateChoice("declined")}
                className="min-h-11 rounded-lg border border-slate-400 px-4 py-2 font-semibold">Decline</button>
              <button type="button" onClick={() => updateChoice("allowed")}
                className="min-h-11 rounded-lg bg-brand-navy px-4 py-2 font-semibold text-white">Allow measurement</button>
            </div>
          </div>
        </section>
      )}
    </PhoneContext.Provider>
  );
}

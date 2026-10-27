export const GOOGLE_ADS_TAG_ID = "AW-11116960223";
export const CALL_CONVERSION_SEND_TO = `${GOOGLE_ADS_TAG_ID}/e-qaCI-1hPscEN-z_bQp`;
export const BOOKING_CONVERSION_SEND_TO = `${GOOGLE_ADS_TAG_ID}/LMLbCKqvy6sdEN-z_bQp`;

const BOOKING_HOST = "book.modento.io";
const BOOKING_PATH = "/river-crossing-dental";

/**
 * Consent Mode v2 signals. The cookie bar asks before any measurement loads
 * ("May we use Google measurement cookies?" / Allow / Decline), and the privacy
 * policy says Google measurement is loaded only after Allow. That is opt-in,
 * so the default is denied in every region, including Utah.
 *
 * Allow turns on advertising storage so a booking click can be attributed.
 * Analytics storage and ad personalization stay denied: this tag records the
 * conversion only, with no analytics cookies, remarketing, or enhanced conversions.
 */
export const CONSENT_DENIED = {
  ad_storage: "denied",
  analytics_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
} as const;

export const CONSENT_ALLOWED = {
  ad_storage: "granted",
  analytics_storage: "denied",
  ad_user_data: "granted",
  ad_personalization: "denied",
} as const;

export function consentDefaultInlineScript(): string {
  const command = JSON.stringify({ ...CONSENT_DENIED, wait_for_update: 500 });
  return `window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function gtag(){window.dataLayer.push(arguments);};window.gtag("consent","default",${command});`;
}

export function isGoogleAdsHost(hostname: string): boolean {
  if (
    hostname === "rivercrossingdental.com" ||
    hostname === "www.rivercrossingdental.com"
  ) {
    return true;
  }
  // Local verification only. Unset in every deployed environment, so preview
  // and development traffic cannot write to the practice's ads account.
  return (
    process.env.NEXT_PUBLIC_GOOGLE_ADS_LOCAL === "1" &&
    (hostname === "localhost" || hostname === "127.0.0.1")
  );
}

export function isOnlineBookingHref(href: string): boolean {
  try {
    const url = new URL(href);
    const path = url.pathname.replace(/\/+$/, "") || "/";
    return url.hostname === BOOKING_HOST && path === BOOKING_PATH;
  } catch {
    return false;
  }
}

/** Drop query strings and fragments so a hit cannot carry page parameters. */
export function urlWithoutQueryOrHash(href: string): string {
  const url = new URL(href);
  return `${url.origin}${url.pathname}`;
}

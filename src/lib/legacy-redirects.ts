import { posts } from "../content/blog";
import { offers } from "../content/offers";
import { services } from "../content/services";

/**
 * Permanent redirects from the pre-rebuild WordPress site
 * (rivercrossingdental.com) to the current Next.js routes.
 *
 * Sources are written without a trailing slash. Next.js also matches the
 * slash variant of each source. See next.config.ts for how that interacts
 * with the framework's own trailing-slash canonicalization.
 *
 * Paths that already exist on the new site are not listed. Next already
 * sends `/contact/` to `/contact`, and redirecting a live path would loop.
 *
 * Intentionally not redirected:
 * - Gambling/casino spam posts and `/category/uncategorized` (where that
 *   spam was filed). Leaving them as 404s keeps those URLs from being
 *   associated with real pages.
 * - `/hello-world` (default WordPress sample) and `/treatments/coming-soon`.
 * - WordPress internals: `/wp-admin`, `/wp-content`, `/wp-includes`,
 *   `/wp-json`, `/wp-login.php`, `/xmlrpc.php`, `/feed`, and asset files.
 * - `/robots.txt` (the new file already lives at that path).
 */
const LEGACY_ROWS = [
  // Specials renamed in the rebuild
  ["/cleaning-special", "/specials/cleaning"],
  ["/exam-special", "/specials/exam"],
  ["/complimentary-orthodontic-consultation", "/specials/ortho-consult"],
  ["/new-patient-special", "/specials/cleaning"],

  // Emergency dentistry
  ["/emergency-dentistry", "/services/emergency-dentistry"],
  ["/what-does-emergency-dentistry-treat", "/services/emergency-dentistry"],
  ["/when-to-see-your-emergency-dentist-in-riverton", "/services/emergency-dentistry"],

  // Invisalign and orthodontics.
  // Adult clear aligners are a section on the orthodontics page. There is
  // no /services/orthodontics/invisalign route. Invisalign First and Teen
  // do have their own pages.
  ["/invisalign-riverton-clear-aligners-river-crossing-dental", "/services/orthodontics"],
  ["/invisalign", "/services/orthodontics"],
  ["/invisalign-for-children", "/services/orthodontics/invisalign-first"],
  ["/invisalign-for-teen", "/services/orthodontics/invisalign-teen"],
  ["/airway-orthodontics", "/services/orthodontics"],
  ["/other-orthodontic-treatments", "/services/orthodontics"],
  ["/orthodontics", "/services/orthodontics"],
  ["/healthy-start", "/services/orthodontics"],
  ["/answering-invisalign-questions", "/services/orthodontics"],
  ["/invisalign-am-i-good-candidate", "/services/orthodontics"],
  ["/tips-invisalign-riverton-patients", "/services/orthodontics"],
  ["/top-5-benefits-riverton-orthodontics", "/services/orthodontics"],
  [
    "/your-first-orthodontic-visit-at-river-crossing-family-dental-orthodontics",
    "/specials/ortho-consult",
  ],
  ["/the-most-common-reason-for-invisalign-its-not-esthetics", "/blog/invisalign-not-just-esthetics"],
  ["/compliance-is-easier-with-braces-right", "/blog/compliance-easier-with-braces"],

  // Dental implants
  ["/dental-implants-learning-center", "/services/dental-implants"],
  ["/dental-implants-survey", "/services/dental-implants"],
  ["/dental-implants-advantages-different-types", "/services/dental-implants"],
  ["/treatments/modern-implants", "/services/dental-implants"],

  // General, pediatric, and restorative pages folded into general dentistry
  ["/services", "/services/general-dentistry"],
  ["/pediatric-dentistry", "/services/general-dentistry"],
  ["/services/pediatric-dentistry", "/services/general-dentistry"],
  ["/sealants", "/services/general-dentistry"],
  ["/services/sealants", "/services/general-dentistry"],
  ["/white-filling", "/services/general-dentistry"],
  ["/services/white-fillings", "/services/general-dentistry"],
  ["/gingivitis-and-periodontal-disease", "/services/general-dentistry"],
  ["/dental-cleanings-route-to-bright-smile", "/services/general-dentistry"],
  ["/when-to-see-your-dentist-in-riverton", "/services/general-dentistry"],
  ["/treatments", "/services/general-dentistry"],
  ["/treatments/sleep-apnea", "/services/general-dentistry"],
  ["/work/white-fillings", "/services/general-dentistry"],

  // Cosmetic treatments, including same-day crowns and whitening
  ["/teeth-whitening", "/services/cosmetic-dentistry"],
  ["/services/teeth-whitening", "/services/cosmetic-dentistry"],
  ["/veneers-esthetic-dentistry", "/services/cosmetic-dentistry"],
  ["/services/veneers-esthetic-dentistry", "/services/cosmetic-dentistry"],
  ["/tooth-colored-bonding-shaping", "/services/cosmetic-dentistry"],
  ["/services/tooth-colored-bonding-shaping", "/services/cosmetic-dentistry"],
  ["/cerec-crowns", "/services/cosmetic-dentistry"],
  ["/services/cerec-crowns", "/services/cosmetic-dentistry"],
  ["/custom-smile-design", "/services/cosmetic-dentistry"],
  ["/services/custom-smile-design", "/services/cosmetic-dentistry"],
  ["/treatments/cerec-one-visit-crowns", "/services/cosmetic-dentistry"],
  ["/cosmetic-dentist-in-riverton-teeth-whitening", "/services/cosmetic-dentistry"],
  ["/what-can-cosmetic-dentist-near-me-do", "/services/cosmetic-dentistry"],
  ["/new-in-office-whitening-system", "/services/cosmetic-dentistry"],
  ["/enter-to-win-a-contest-for-free-in-office-whitening", "/services/cosmetic-dentistry"],
  ["/work/cerec-crowns", "/services/cosmetic-dentistry"],
  ["/work/shaping-bonding", "/services/cosmetic-dentistry"],
  ["/work/veneers-esthetic-dentistry", "/services/cosmetic-dentistry"],
  ["/work/whitening", "/services/cosmetic-dentistry"],
  ["/treatments/orthodontics", "/services/orthodontics"],
  ["/work/orthodontics", "/services/orthodontics"],

  // About, office, and contact
  ["/about", "/meet-the-team"],
  ["/team", "/meet-the-team"],
  ["/office", "/meet-the-team"],
  ["/our-office", "/meet-the-team"],
  ["/office-tour", "/meet-the-team"],
  ["/gallery", "/meet-the-team"],
  ["/features", "/meet-the-team"],
  ["/office/serene-escape-chairs", "/meet-the-team"],
  ["/serene-escape-chairs", "/meet-the-team"],
  ["/meet-our-new-assistant-colleen", "/meet-the-team"],
  ["/helpful-steps-to-find-a-dentist-near-you-in-riverton", "/meet-the-team"],
  ["/choose-right-dental-center-family", "/meet-the-team"],
  ["/choosing-dental-clinic-in-riverton", "/meet-the-team"],
  ["/finding-dental-clinic-near-me-7-things", "/meet-the-team"],
  ["/office/soprolife-camera", "/advanced-technology"],
  ["/soprolife-camera", "/advanced-technology"],
  ["/new-patient-forms", "/contact"],
  ["/serving-patients-in-riverton-ut", "/contact"],

  // Financing and insurance
  ["/membership-plan", "/financing-insurance"],
  ["/have-you-used-dental-insurance-benefits-yet", "/financing-insurance"],

  // One old post is a roundup of every service the practice offers.
  // The homepage is the page that lists those services together.
  ["/dental-center-riverton-8-dental-services", "/"],

  // Generic dental tip with no matching article
  ["/fun-facts-about-toothbrushes-and-toothpaste", "/blog"],

  // Old blog categories and tags
  ["/category/cosmetic-dentistry", "/services/cosmetic-dentistry"],
  ["/category/teeth-whitening", "/services/cosmetic-dentistry"],
  ["/category/whitening", "/services/cosmetic-dentistry"],
  ["/category/dental-tips", "/blog"],
  ["/category/team", "/meet-the-team"],
  ["/tag/employee-highlight", "/meet-the-team"],
  ["/tag/new-employees", "/meet-the-team"],

  // Rank Math sitemap URLs from the WordPress site
  ["/sitemap", "/sitemap.xml"],
  ["/sitemap_index.xml", "/sitemap.xml"],
  ["/page-sitemap.xml", "/sitemap.xml"],
  ["/post-sitemap.xml", "/sitemap.xml"],

  // Blog pagination (/blog/2) and old monthly archives (/2012/05)
  ["/blog/:page(\\d+)", "/blog"],
  ["/:year(\\d{4})/:month(\\d{2})", "/blog"],
] as const;

const LIVE_PATHS = new Set<string>([
  "/",
  "/meet-the-team",
  "/advanced-technology",
  "/financing-insurance",
  "/reviews",
  "/contact",
  "/blog",
  "/privacy-policy",
  "/website-accessibility",
  "/sitemap.xml",
  "/services/cosmetic-dentistry/icon",
  "/services/orthodontics/invisalign-teen",
  "/services/orthodontics/invisalign-first",
  ...services.map((service) => `/services/${service.slug}`),
  ...offers.map((offer) => `/specials/${offer.slug}`),
  ...posts.map((post) => `/blog/${post.slug}`),
]);

function assertLegacyRedirects(rows: ReadonlyArray<readonly [string, string]>) {
  const seen = new Set<string>();

  for (const [source, destination] of rows) {
    if (!source.startsWith("/")) {
      throw new Error(`Legacy redirect source must start with /: ${source}`);
    }
    if (source.length > 1 && source.endsWith("/")) {
      throw new Error(`Legacy redirect source must not end with /: ${source}`);
    }
    if (seen.has(source)) {
      throw new Error(`Duplicate legacy redirect source: ${source}`);
    }
    seen.add(source);
    if (!LIVE_PATHS.has(destination)) {
      throw new Error(`Legacy redirect destination is not a current page: ${source} -> ${destination}`);
    }
    if (!source.includes(":") && LIVE_PATHS.has(source)) {
      throw new Error(`Refusing to redirect a live page: ${source}`);
    }
    if (source === destination) {
      throw new Error(`Legacy redirect loops onto itself: ${source}`);
    }
  }
}

assertLegacyRedirects(LEGACY_ROWS);

export const legacyRedirects: { source: string; destination: string }[] = LEGACY_ROWS.map(
  ([source, destination]) => ({ source, destination }),
);

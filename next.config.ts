import type { NextConfig } from "next";
import { legacyRedirects } from "./src/lib/legacy-redirects";

/**
 * Apex host, anchored. Next treats `has` host values as regular expressions
 * and wraps them in ^...$, so the dots must be escaped.
 */
const APEX_HOST = "rivercrossingdental\\.com";

const nextConfig: NextConfig = {
  // The old WordPress URLs Google still has are the trailing-slash form.
  // Next's built-in slash redirect is a 308 that runs before these rules, so
  // `/emergency-dentistry/` would 308 to `/emergency-dentistry` and only then
  // 301 to the new page. Turning the built-in off lets the rules below match
  // both forms in one 301. src/proxy.ts 301s every other trailing slash
  // (for example `/contact/`) to the slash-free URL.
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [
      // Fallback if a request for the bare domain reaches Next. Vercel already
      // redirects rivercrossingdental.com to www at the edge (308) before this
      // app runs, which is why production usually never hits this rule.
      {
        source: "/:path*",
        has: [{ type: "host", value: APEX_HOST }],
        destination: "https://www.rivercrossingdental.com/:path*",
        statusCode: 301,
      },
      ...legacyRedirects.map(({ source, destination }) => ({
        source,
        destination,
        statusCode: 301 as const,
      })),
    ];
  },
};

export default nextConfig;

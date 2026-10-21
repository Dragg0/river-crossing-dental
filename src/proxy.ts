import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Trailing-slash canonicalization for pages that are not legacy redirects.
 * Legacy paths are 301'd in next.config.ts before this runs, including when
 * the request still has the old WordPress trailing slash.
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (pathname.length > 1 && pathname.endsWith("/")) {
    // Use a plain URL. NextURL remembers that this request had a trailing
    // slash and would put it back on the Location header.
    const url = new URL(request.url);
    url.pathname = pathname.replace(/\/+$/, "") || "/";
    url.search = search;
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

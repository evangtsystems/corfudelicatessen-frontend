import { NextResponse } from "next/server";

export function middleware(request) {
  const host =
    request.headers.get("x-forwarded-host") ||
    request.headers.get("host");

  // Redirect www → non-www (force HTTPS, no port)
  if (host === "www.corfudelicatessen.com") {
    const url = new URL(request.url);

    url.protocol = "https:";
    url.hostname = "corfudelicatessen.com";
    url.port = ""; // 🔥 remove internal port

    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

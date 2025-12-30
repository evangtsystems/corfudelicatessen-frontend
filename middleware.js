import { NextResponse } from "next/server";

export function middleware(request) {
  const host =
    request.headers.get("x-forwarded-host") ||
    request.headers.get("host");

  if (host === "www.corfudelicatessen.com") {
    const url = request.nextUrl.clone();
    url.hostname = "corfudelicatessen.com";
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

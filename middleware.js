import { NextResponse } from "next/server";

export function middleware(request) {
  const url = request.nextUrl.clone();

  // If request is coming from www → redirect to non-www
  if (url.hostname === "www.corfudelicatessen.com") {
    url.hostname = "corfudelicatessen.com";
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

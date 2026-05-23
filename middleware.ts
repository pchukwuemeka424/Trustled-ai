import { NextResponse, type NextRequest } from "next/server";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME ?? "admin@trustled.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "admin123";
const ADMIN_COOKIE_NAME = "admin_session";

const textEncoder = new TextEncoder();
let sessionValueCache: Promise<string> | undefined;

function bytesToHex(bytes: Uint8Array) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function sessionValue() {
  if (!sessionValueCache) {
    sessionValueCache = crypto.subtle
      .digest("SHA-256", textEncoder.encode(`${ADMIN_USERNAME}:${ADMIN_PASSWORD}`))
      .then((hashBuffer) => bytesToHex(new Uint8Array(hashBuffer)));
  }

  return sessionValueCache;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value ?? "";
  if (token !== (await sessionValue())) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

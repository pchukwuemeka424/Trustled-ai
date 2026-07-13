import { NextResponse, type NextRequest } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  getConfiguredSessionHashOverrides,
  getEnvAdminSessionSeed,
} from "@/lib/admin-credentials";

const textEncoder = new TextEncoder();

function bytesToHex(bytes: Uint8Array) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function getEnvSessionHash() {
  const hashBuffer = await crypto.subtle.digest(
    "SHA-256",
    textEncoder.encode(getEnvAdminSessionSeed()),
  );

  return bytesToHex(new Uint8Array(hashBuffer));
}

async function getValidSessionTokens() {
  return [await getEnvSessionHash(), ...getConfiguredSessionHashOverrides()];
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
  const validTokens = await getValidSessionTokens();

  if (!validTokens.includes(token)) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

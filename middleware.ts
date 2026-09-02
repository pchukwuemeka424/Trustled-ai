import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE_NAME } from "@/lib/admin-credentials";
import {
  getConfiguredSessionHashOverrides,
  getEnvAdminSessionSeed,
} from "@/lib/admin-credentials";
import { isEditorAllowedAdminPath } from "@/lib/admin-roles";
import {
  sha256Hex,
  verifySignedAdminSessionToken,
} from "@/lib/admin-session";

async function getEnvSessionHash() {
  return sha256Hex(getEnvAdminSessionSeed());
}

async function isLegacyAdminToken(token: string) {
  const valid = [
    await getEnvSessionHash(),
    ...getConfiguredSessionHashOverrides(),
  ];
  return valid.includes(token);
}

function nextWithPathname(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);
  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  if (pathname === "/admin/login") {
    return nextWithPathname(request);
  }

  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value ?? "";
  const signed = token ? await verifySignedAdminSessionToken(token) : null;
  const legacyAdmin = !signed && token ? await isLegacyAdminToken(token) : false;

  if (!signed && !legacyAdmin) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const role = signed?.role ?? "admin";

  if (role === "editor" && !isEditorAllowedAdminPath(pathname)) {
    return NextResponse.redirect(new URL("/admin/blog", request.url));
  }

  return nextWithPathname(request);
}

export const config = {
  matcher: ["/admin/:path*"],
};

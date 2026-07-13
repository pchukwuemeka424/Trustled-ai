import { NextResponse } from "next/server";
import {
  applyAdminSessionCookie,
  createAdminSessionToken,
  validateAdminCredentials,
} from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { username?: string; password?: string };
    const username = body.username?.trim() ?? "";
    const password = body.password ?? "";

    if (!(await validateAdminCredentials(username, password))) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true });
    applyAdminSessionCookie(response, await createAdminSessionToken());
    return response;
  } catch {
    return NextResponse.json({ error: "Unable to login" }, { status: 500 });
  }
}

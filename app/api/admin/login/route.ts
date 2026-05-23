import { NextResponse } from "next/server";
import { setAdminSession, validateAdminCredentials } from "@/lib/admin-auth";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { username?: string; password?: string };
    const username = body.username?.trim() ?? "";
    const password = body.password ?? "";

    if (!validateAdminCredentials(username, password)) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }

    await setAdminSession();
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unable to login" }, { status: 500 });
  }
}

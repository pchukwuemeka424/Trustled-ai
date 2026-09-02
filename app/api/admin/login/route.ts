import { NextResponse } from "next/server";
import {
  applyAdminSessionCookie,
  createAdminSessionToken,
  validateAdminCredentials,
} from "@/lib/admin-auth";
import { defaultAdminPathForRole } from "@/lib/admin-roles";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      username?: string;
      password?: string;
    };
    const username = body.username?.trim() ?? "";
    const password = body.password ?? "";

    const user = await validateAdminCredentials(username, password);
    if (!user) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 },
      );
    }

    const response = NextResponse.json({
      ok: true,
      role: user.role,
      redirectTo: defaultAdminPathForRole(user.role),
    });
    applyAdminSessionCookie(response, await createAdminSessionToken(user));
    return response;
  } catch {
    return NextResponse.json({ error: "Unable to login" }, { status: 500 });
  }
}

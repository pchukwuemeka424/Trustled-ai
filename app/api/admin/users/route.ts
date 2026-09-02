import { NextResponse } from "next/server";
import { getEnvAdminUsername } from "@/lib/admin-credentials";
import { isAdminRole } from "@/lib/admin-roles";
import { requireUserManagement } from "@/lib/api/admin";
import { createAdminUser, listAdminUsers } from "@/lib/admin-users";

export const runtime = "nodejs";

export async function GET() {
  const auth = await requireUserManagement();
  if (auth instanceof NextResponse) return auth;

  try {
    const users = await listAdminUsers();
    return NextResponse.json({
      users,
      bootstrapAdmin: {
        username: getEnvAdminUsername().toLowerCase(),
        role: "admin" as const,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to load users" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const auth = await requireUserManagement();
  if (auth instanceof NextResponse) return auth;

  try {
    const body = (await request.json()) as {
      username?: string;
      password?: string;
      role?: string;
    };

    const username = body.username?.trim() ?? "";
    const password = body.password ?? "";
    const role = body.role;

    if (!isAdminRole(role)) {
      return NextResponse.json(
        { error: "Role must be admin or editor" },
        { status: 400 },
      );
    }

    if (username.toLowerCase() === getEnvAdminUsername().toLowerCase()) {
      return NextResponse.json(
        { error: "That email is reserved for the main admin account" },
        { status: 409 },
      );
    }

    const user = await createAdminUser({
      username,
      password,
      role,
      createdBy: auth.session.username,
    });

    return NextResponse.json({ ok: true, user });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create user";

    if (
      message === "A user with this email already exists" ||
      message === "Username must be a valid email" ||
      message === "Password must be at least 8 characters" ||
      message === "Invalid role"
    ) {
      const status = message.includes("already exists") ? 409 : 400;
      return NextResponse.json({ error: message }, { status });
    }

    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}

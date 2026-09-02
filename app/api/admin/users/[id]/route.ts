import { NextResponse } from "next/server";
import { requireUserManagement } from "@/lib/api/admin";
import { deleteAdminUser } from "@/lib/admin-users";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function DELETE(_: Request, context: RouteContext) {
  const auth = await requireUserManagement();
  if (auth instanceof NextResponse) return auth;

  try {
    const { id } = await context.params;
    const deleted = await deleteAdminUser(id);

    if (!deleted) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 },
    );
  }
}

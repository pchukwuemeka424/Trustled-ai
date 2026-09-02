import { NextResponse } from "next/server";
import {
  getAdminSession,
  type AdminSession,
} from "@/lib/admin-auth";
import {
  type AdminRole,
  canDeleteBlog,
  canManageBlog,
  canManageSite,
  canManageUsers,
} from "@/lib/admin-roles";

export async function getSessionOrUnauthorized(): Promise<
  { session: AdminSession } | { error: NextResponse }
> {
  const session = await getAdminSession();
  if (!session) {
    return {
      error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }
  return { session };
}

function forbidden(message = "Forbidden") {
  return NextResponse.json({ error: message }, { status: 403 });
}

/** Any authenticated CMS user. */
export async function requireAdmin() {
  const result = await getSessionOrUnauthorized();
  if ("error" in result) return result.error;
  return null;
}

export async function requireSiteAdmin() {
  const result = await getSessionOrUnauthorized();
  if ("error" in result) return result.error;
  if (!canManageSite(result.session.role)) {
    return forbidden("Admin access required");
  }
  return null;
}

export async function requireBlogAccess() {
  const result = await getSessionOrUnauthorized();
  if ("error" in result) return result.error;
  if (!canManageBlog(result.session.role)) {
    return forbidden("Blog access required");
  }
  return null;
}

export async function requireBlogDeleteAccess() {
  const result = await getSessionOrUnauthorized();
  if ("error" in result) return result.error;
  if (!canDeleteBlog(result.session.role)) {
    return forbidden("Only admins can delete blog posts");
  }
  return null;
}

export async function requireUserManagement() {
  const result = await getSessionOrUnauthorized();
  if ("error" in result) return result.error;
  if (!canManageUsers(result.session.role)) {
    return forbidden("Only admins can manage users");
  }
  return { session: result.session };
}

export async function requireRole(role: AdminRole) {
  const result = await getSessionOrUnauthorized();
  if ("error" in result) return result.error;
  if (result.session.role !== role) {
    return forbidden();
  }
  return null;
}

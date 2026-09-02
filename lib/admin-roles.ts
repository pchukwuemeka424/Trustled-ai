export const ADMIN_ROLES = ["admin", "editor"] as const;

export type AdminRole = (typeof ADMIN_ROLES)[number];

export type AdminSession = {
  username: string;
  role: AdminRole;
  exp: number;
};

export function isAdminRole(value: unknown): value is AdminRole {
  return value === "admin" || value === "editor";
}

/** Site pages, nav, settings, live edit, user management */
export function canManageSite(role: AdminRole | null | undefined) {
  return role === "admin";
}

/** Blog list / create / edit / read */
export function canManageBlog(role: AdminRole | null | undefined) {
  return role === "admin" || role === "editor";
}

/** Permanent delete of blog posts */
export function canDeleteBlog(role: AdminRole | null | undefined) {
  return role === "admin";
}

/** Create and manage CMS users */
export function canManageUsers(role: AdminRole | null | undefined) {
  return role === "admin";
}

export function defaultAdminPathForRole(role: AdminRole) {
  return role === "editor" ? "/admin/blog" : "/admin";
}

export function isEditorAllowedAdminPath(pathname: string) {
  return (
    pathname === "/admin/blog" ||
    pathname.startsWith("/admin/blog/") ||
    pathname === "/admin/login"
  );
}

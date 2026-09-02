import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { AdminUsersManager } from "@/components/admin/admin-users-manager";
import { getAdminSession } from "@/lib/admin-auth";
import { canManageUsers } from "@/lib/admin-roles";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login?next=/admin/users");
  }

  if (!canManageUsers(session.role)) {
    redirect("/admin/blog");
  }

  return (
    <AdminShell
      eyebrow="Admin"
      title="Blog users"
      description="Create editors who can write and update blog articles. Only the main admin can manage users."
    >
      <AdminUsersManager />
    </AdminShell>
  );
}

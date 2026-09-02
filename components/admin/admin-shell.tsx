import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { AdminAppFrame } from "@/components/admin/admin-app-frame";
import { getAdminSession } from "@/lib/admin-auth";

type AdminShellProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  dashboardHref?: string;
  children: ReactNode;
};

export async function AdminShell({
  title,
  description,
  actions,
  children,
}: AdminShellProps) {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <AdminAppFrame
      role={session.role}
      username={session.username}
      title={title}
      description={description}
      actions={actions}
    >
      {children}
    </AdminAppFrame>
  );
}

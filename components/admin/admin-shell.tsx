import Link from "next/link";
import type { ReactNode } from "react";
import { AdminLogoutButton } from "@/components/admin-logout-button";

type AdminShellProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
};

export function AdminShell({
  eyebrow = "Admin",
  title,
  description,
  actions,
  children,
}: AdminShellProps) {
  return (
    <section className="admin-shell">
      <div className="wrap">
        <div className="admin-shell-header">
          <div className="admin-shell-intro">
            <p className="eyebrow">{eyebrow}</p>
            <h1>{title}</h1>
            {description ? <p className="lede">{description}</p> : null}
          </div>
          <div className="admin-shell-actions">
            {actions}
            <Link href="/admin" className="btn btn-sm btn-ghost">
              Dashboard
            </Link>
            <AdminLogoutButton />
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}

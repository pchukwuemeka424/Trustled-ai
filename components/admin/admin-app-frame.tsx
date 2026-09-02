"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { AdminLogoutButton } from "@/components/admin-logout-button";
import {
  getAdminNavSections,
  isAdminNavItemActive,
} from "@/lib/admin-nav";
import type { AdminRole } from "@/lib/admin-roles";

type AdminAppFrameProps = {
  role: AdminRole;
  username: string;
  title?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
};

export function AdminAppFrame({
  role,
  username,
  title,
  description,
  actions,
  children,
}: AdminAppFrameProps) {
  const pathname = usePathname() || "/admin";
  const [open, setOpen] = useState(false);
  const sections = getAdminNavSections(role);
  const dashboardHref = role === "editor" ? "/admin/blog" : "/admin";

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("admin-nav-open", open);
    return () => document.body.classList.remove("admin-nav-open");
  }, [open]);

  return (
    <div className="admin-app">
      <button
        type="button"
        className="admin-nav-backdrop"
        aria-label="Close navigation"
        tabIndex={open ? 0 : -1}
        onClick={() => setOpen(false)}
      />

      <aside className={`admin-sidebar${open ? " is-open" : ""}`}>
        <div className="admin-sidebar-brand">
          <Link href={dashboardHref} className="admin-sidebar-logo">
            <span className="admin-sidebar-mark">TL</span>
            <span>
              <strong>TrustLed</strong>
              <span className="admin-sidebar-product">Control centre</span>
            </span>
          </Link>
          <button
            type="button"
            className="admin-sidebar-close"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            ×
          </button>
        </div>

        <nav className="admin-sidebar-nav" aria-label="Admin">
          {sections.map((section) => (
            <div key={section.label} className="admin-sidebar-section">
              <p className="admin-sidebar-label">{section.label}</p>
              <ul>
                {section.items.map((item) => {
                  const active = isAdminNavItemActive(
                    item.href,
                    pathname,
                    item.match,
                  );
                  return (
                    <li key={`${item.href}-${item.label}`}>
                      <Link
                        href={item.href}
                        className={`admin-sidebar-link${active ? " is-active" : ""}`}
                      >
                        <span className="admin-sidebar-link-label">{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-sidebar-user">
            <span className="admin-sidebar-user-role">
              {role === "admin" ? "Admin" : "Editor"}
            </span>
            <span className="admin-sidebar-user-email" title={username}>
              {username}
            </span>
          </div>
          <div className="admin-sidebar-footer-actions">
            <Link href="/" className="admin-side-btn">
              View site
            </Link>
            <AdminLogoutButton className="admin-side-btn" />
          </div>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <button
            type="button"
            className="admin-menu-btn"
            aria-label="Open navigation"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            Menu
          </button>
          <div className="admin-topbar-copy">
            {title ? <h1>{title}</h1> : null}
            {description ? <p>{description}</p> : null}
          </div>
          {actions ? <div className="admin-topbar-actions">{actions}</div> : null}
        </header>
        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
}

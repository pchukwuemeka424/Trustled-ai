import type { AdminRole } from "@/lib/admin-roles";
import { canManageSite, canManageUsers } from "@/lib/admin-roles";

export type AdminNavItem = {
  href: string;
  label: string;
  match?: "exact" | "prefix";
};

export type AdminNavSection = {
  label: string;
  items: AdminNavItem[];
};

export function getAdminNavSections(role: AdminRole): AdminNavSection[] {
  if (!canManageSite(role)) {
    return [
      {
        label: "Overview",
        items: [
          {
            href: "/admin/blog",
            label: "Dashboard",
            match: "exact",
          },
        ],
      },
      {
        label: "Content",
        items: [
          {
            href: "/admin/blog",
            label: "Blog articles",
            match: "prefix",
          },
        ],
      },
    ];
  }

  const sections: AdminNavSection[] = [
    {
      label: "Overview",
      items: [
        {
          href: "/admin",
          label: "Dashboard",
          match: "exact",
        },
      ],
    },
    {
      label: "Website",
      items: [
        {
          href: "/admin/pages",
          label: "Pages",
          match: "prefix",
        },
        {
          href: "/admin/settings",
          label: "Brand",
          match: "exact",
        },
      ],
    },
    {
      label: "Content",
      items: [
        {
          href: "/admin/blog",
          label: "Blog articles",
          match: "prefix",
        },
      ],
    },
  ];

  if (canManageUsers(role)) {
    sections.push({
      label: "Access",
      items: [
        {
          href: "/admin/users",
          label: "Users & roles",
          match: "exact",
        },
      ],
    });
  }

  return sections;
}

export function isAdminNavItemActive(
  href: string,
  pathname: string,
  match: AdminNavItem["match"] = "prefix",
) {
  if (href.includes("?")) {
    return false;
  }

  if (match === "exact") {
    return pathname === href;
  }

  if (href === "/admin") {
    return pathname === "/admin";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

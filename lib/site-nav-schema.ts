export type SiteNavChild = {
  id: string;
  href: string;
  label: string;
  description?: string;
  external?: boolean;
};

export type SiteNavItem = {
  id: string;
  href: string;
  label: string;
  children?: SiteNavChild[];
};

export type SiteNav = SiteNavItem[];

export const defaultSiteNav: SiteNav = [
  { id: "home", href: "/", label: "Home" },
  { id: "about", href: "/about", label: "About Us" },
  {
    id: "services",
    href: "/services",
    label: "Services",
    children: [
      {
        id: "services-advisory",
        href: "/services#advisory",
        label: "AI Governance Advisory",
      },
      {
        id: "services-automation",
        href: "/services#automation",
        label: "AI Solutions & Automation Services",
      },
    ],
  },
  {
    id: "solutions",
    href: "/solutions",
    label: "Solutions",
    children: [
      {
        id: "solutions-garil",
        href: "/solutions#garil",
        label: "GARIL AI",
        description: "Governed AI for research, teaching and learning",
      },
      {
        id: "solutions-asat",
        href: "/solutions#asat",
        label: "ASAT",
        description: "AI Self-Assessment Toolkit",
      },
    ],
  },
  {
    id: "education",
    href: "/education",
    label: "Training",
    children: [
      {
        id: "education-literacy",
        href: "/education#literacy",
        label: "AI Literacy Workshops",
      },
      {
        id: "education-grc",
        href: "/education#grc",
        label: "AI GRC Practitioner Programme",
      },
    ],
  },
  { id: "contact", href: "/contact", label: "Contact Us" },
];

export function createNavId(prefix = "nav") {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

function isNavChild(value: unknown): value is SiteNavChild {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.id === "string" &&
    typeof item.href === "string" &&
    typeof item.label === "string" &&
    (item.description === undefined || typeof item.description === "string") &&
    (item.external === undefined || typeof item.external === "boolean")
  );
}

function isNavItem(value: unknown): value is SiteNavItem {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const item = value as Record<string, unknown>;
  if (
    typeof item.id !== "string" ||
    typeof item.href !== "string" ||
    typeof item.label !== "string"
  ) {
    return false;
  }
  if (item.children === undefined) return true;
  return Array.isArray(item.children) && item.children.every(isNavChild);
}

export function isValidSiteNav(value: unknown): value is SiteNav {
  return Array.isArray(value) && value.every(isNavItem);
}

export function normalizeSiteNav(value: unknown): SiteNav {
  if (!isValidSiteNav(value)) return defaultSiteNav;
  return value.map((item) => ({
    id: item.id.trim() || createNavId("item"),
    href: item.href.trim() || "/",
    label: item.label.trim() || "Untitled",
    children: item.children?.map((child) => ({
      id: child.id.trim() || createNavId("child"),
      href: child.href.trim() || "/",
      label: child.label.trim() || "Untitled",
      description: child.description?.trim() || undefined,
      external: Boolean(child.external),
    })),
  }));
}

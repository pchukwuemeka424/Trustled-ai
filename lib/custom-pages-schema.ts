export type PageCard = {
  id: string;
  title: string;
  body: string;
};

export type NavPlacement = "parent" | "child" | "none";

export type CustomPage = {
  slug: string;
  title: string;
  heroTagline: string;
  heroTitle: string;
  heroLede: string;
  cardsSectionEyebrow: string;
  cardsSectionTitle: string;
  cards: PageCard[];
  ctaTitle: string;
  ctaDescription: string;
  ctaButton: string;
  status: "draft" | "published";
  navPlacement: NavPlacement;
  parentNavId: string;
  navLabel: string;
  navDescription: string;
};

export type CustomPageRecord = CustomPage & {
  createdAt: Date;
  updatedAt: Date;
};

export const RESERVED_PAGE_SLUGS = new Set([
  "",
  "admin",
  "api",
  "about",
  "services",
  "solutions",
  "education",
  "contact",
  "blog",
  "thank-you",
  "login",
  "new",
  "settings",
  "pages",
  "favicon.ico",
  "robots.txt",
  "sitemap.xml",
]);

export function createCardId() {
  return `card-${Math.random().toString(36).slice(2, 10)}`;
}

export function slugifyPageTitle(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
}

export function createEmptyCustomPage(partial?: Partial<CustomPage>): CustomPage {
  const title = partial?.title?.trim() || "New page";
  const slug = partial?.slug?.trim() || slugifyPageTitle(title) || "new-page";

  return {
    slug,
    title,
    heroTagline: partial?.heroTagline ?? "Overview",
    heroTitle: partial?.heroTitle ?? title,
    heroLede:
      partial?.heroLede ??
      "Describe this page for visitors. Add cards below for key points.",
    cardsSectionEyebrow: partial?.cardsSectionEyebrow ?? "Highlights",
    cardsSectionTitle:
      partial?.cardsSectionTitle ?? "What this page covers.",
    cards: partial?.cards ?? [
      {
        id: createCardId(),
        title: "First card",
        body: "Add a short summary for this topic.",
      },
    ],
    ctaTitle: partial?.ctaTitle ?? "Talk to us about your situation.",
    ctaDescription:
      partial?.ctaDescription ??
      "A 30-minute conversation, no pitch deck. We will tell you whether we can help.",
    ctaButton: partial?.ctaButton ?? "Start a conversation",
    status: partial?.status ?? "draft",
    navPlacement: partial?.navPlacement ?? "parent",
    parentNavId: partial?.parentNavId ?? "",
    navLabel: partial?.navLabel ?? title,
    navDescription: partial?.navDescription ?? "",
  };
}

function isPageCard(value: unknown): value is PageCard {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const card = value as Record<string, unknown>;
  return (
    typeof card.id === "string" &&
    typeof card.title === "string" &&
    typeof card.body === "string"
  );
}

export function isValidCustomPage(value: unknown): value is CustomPage {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const page = value as Record<string, unknown>;

  return (
    typeof page.slug === "string" &&
    typeof page.title === "string" &&
    typeof page.heroTagline === "string" &&
    typeof page.heroTitle === "string" &&
    typeof page.heroLede === "string" &&
    typeof page.cardsSectionEyebrow === "string" &&
    typeof page.cardsSectionTitle === "string" &&
    Array.isArray(page.cards) &&
    page.cards.every(isPageCard) &&
    typeof page.ctaTitle === "string" &&
    typeof page.ctaDescription === "string" &&
    typeof page.ctaButton === "string" &&
    (page.status === "draft" || page.status === "published") &&
    (page.navPlacement === "parent" ||
      page.navPlacement === "child" ||
      page.navPlacement === "none") &&
    typeof page.parentNavId === "string" &&
    typeof page.navLabel === "string" &&
    typeof page.navDescription === "string"
  );
}

export function normalizeCustomPage(value: Partial<CustomPage>): CustomPage {
  const base = createEmptyCustomPage(value);
  return {
    ...base,
    slug: slugifyPageTitle(value.slug ?? base.slug) || base.slug,
    cards: (value.cards ?? base.cards).map((card) => ({
      id: card.id?.trim() || createCardId(),
      title: card.title?.trim() || "Untitled card",
      body: card.body ?? "",
    })),
    status: value.status === "published" ? "published" : "draft",
    navPlacement:
      value.navPlacement === "child" || value.navPlacement === "none"
        ? value.navPlacement
        : "parent",
  };
}

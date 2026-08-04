import "server-only";
import { getDatabase } from "@/lib/mongodb";
import {
  createNavId,
  type SiteNav,
  type SiteNavChild,
  type SiteNavItem,
} from "@/lib/site-nav-schema";
import {
  normalizeCustomPage,
  RESERVED_PAGE_SLUGS,
  type CustomPage,
  type CustomPageRecord,
} from "@/lib/custom-pages-schema";
import { getSiteNav, updateSiteNav } from "@/lib/site-nav";

const CUSTOM_PAGE_PREFIX = "custom-page:";

type CustomPageDoc = CustomPage & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
};

function docId(slug: string) {
  return `${CUSTOM_PAGE_PREFIX}${slug}`;
}

function toRecord(doc: CustomPageDoc): CustomPageRecord {
  return {
    ...normalizeCustomPage(doc),
    slug: doc.slug,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

function removeHrefFromNav(nav: SiteNav, href: string): SiteNav {
  return nav
    .map((item) => ({
      ...item,
      children: item.children?.filter((child) => child.href !== href),
    }))
    .filter((item) => item.href !== href);
}

function upsertPageInNav(nav: SiteNav, page: CustomPage): SiteNav {
  const href = `/${page.slug}`;
  const label = page.navLabel.trim() || page.title;
  const description = page.navDescription.trim() || undefined;

  if (page.navPlacement === "none" || page.status !== "published") {
    return removeHrefFromNav(nav, href);
  }

  if (page.navPlacement === "parent") {
    const existingIndex = nav.findIndex((item) => item.href === href);
    if (existingIndex >= 0) {
      return nav.map((item, index) =>
        index === existingIndex
          ? { ...item, label, href }
          : {
              ...item,
              children: item.children?.filter((child) => child.href !== href),
            },
      );
    }

    const withoutChildren = nav.map((item) => ({
      ...item,
      children: item.children?.filter((child) => child.href !== href),
    }));

    const nextItem: SiteNavItem = {
      id: createNavId("page"),
      href,
      label,
      children: [],
    };
    return [...withoutChildren, nextItem];
  }

  const parentId = page.parentNavId.trim();
  const without = removeHrefFromNav(nav, href);
  if (!parentId) return without;

  return without.map((item) => {
    if (item.id !== parentId) return item;
    const existingChild = item.children?.find((child) => child.href === href);
    const child: SiteNavChild = {
      id: existingChild?.id ?? createNavId("page-child"),
      href,
      label,
      description,
    };
    const children = (item.children ?? []).filter(
      (entry) => entry.href !== href,
    );
    return {
      ...item,
      children: [...children, child],
    };
  });
}

export async function listCustomPages(): Promise<CustomPageRecord[]> {
  try {
    const db = await getDatabase();
    const collection = db.collection<CustomPageDoc>("site_content");
    const docs = await collection
      .find({ _id: { $regex: new RegExp(`^${CUSTOM_PAGE_PREFIX}`) } })
      .sort({ updatedAt: -1 })
      .toArray();
    return docs.map(toRecord);
  } catch {
    return [];
  }
}

export async function getCustomPage(
  slug: string,
): Promise<CustomPageRecord | null> {
  const normalizedSlug = slug.trim().toLowerCase();
  if (!normalizedSlug || RESERVED_PAGE_SLUGS.has(normalizedSlug)) {
    return null;
  }

  try {
    const db = await getDatabase();
    const collection = db.collection<CustomPageDoc>("site_content");
    const doc = await collection.findOne({ _id: docId(normalizedSlug) });
    return doc ? toRecord(doc) : null;
  } catch {
    return null;
  }
}

export async function getPublishedCustomPage(
  slug: string,
): Promise<CustomPageRecord | null> {
  const page = await getCustomPage(slug);
  if (!page || page.status !== "published") return null;
  return page;
}

export async function createCustomPage(
  input: CustomPage,
): Promise<CustomPageRecord> {
  const page = normalizeCustomPage(input);
  if (!page.slug || RESERVED_PAGE_SLUGS.has(page.slug)) {
    throw new Error("That URL slug is reserved or invalid.");
  }

  const db = await getDatabase();
  const collection = db.collection<CustomPageDoc>("site_content");
  const existing = await collection.findOne({ _id: docId(page.slug) });
  if (existing) {
    throw new Error("A page with this slug already exists.");
  }

  const now = new Date();
  const doc: CustomPageDoc = {
    ...page,
    _id: docId(page.slug),
    createdAt: now,
    updatedAt: now,
  };

  await collection.insertOne(doc);
  const nav = await getSiteNav();
  await updateSiteNav(upsertPageInNav(nav, page));

  return toRecord(doc);
}

export async function updateCustomPage(
  slug: string,
  input: CustomPage,
): Promise<CustomPageRecord> {
  const currentSlug = slug.trim().toLowerCase();
  const page = normalizeCustomPage(input);
  const nextSlug = page.slug;

  if (!nextSlug || RESERVED_PAGE_SLUGS.has(nextSlug)) {
    throw new Error("That URL slug is reserved or invalid.");
  }

  const db = await getDatabase();
  const collection = db.collection<CustomPageDoc>("site_content");
  const existing = await collection.findOne({ _id: docId(currentSlug) });
  if (!existing) {
    throw new Error("Page not found.");
  }

  if (nextSlug !== currentSlug) {
    const conflict = await collection.findOne({ _id: docId(nextSlug) });
    if (conflict) {
      throw new Error("A page with this slug already exists.");
    }
  }

  const now = new Date();
  const doc: CustomPageDoc = {
    ...page,
    _id: docId(nextSlug),
    createdAt: existing.createdAt,
    updatedAt: now,
  };

  if (nextSlug !== currentSlug) {
    await collection.deleteOne({ _id: docId(currentSlug) });
  }

  await collection.updateOne(
    { _id: docId(nextSlug) },
    { $set: doc },
    { upsert: true },
  );

  let nav = await getSiteNav();
  nav = removeHrefFromNav(nav, `/${currentSlug}`);
  nav = upsertPageInNav(nav, page);
  await updateSiteNav(nav);

  return toRecord(doc);
}

export async function deleteCustomPage(slug: string): Promise<void> {
  const normalizedSlug = slug.trim().toLowerCase();
  const db = await getDatabase();
  const collection = db.collection<CustomPageDoc>("site_content");
  await collection.deleteOne({ _id: docId(normalizedSlug) });

  const nav = await getSiteNav();
  await updateSiteNav(removeHrefFromNav(nav, `/${normalizedSlug}`));
}

import "server-only";
import { getDatabase } from "@/lib/mongodb";
import {
  defaultPageContent,
  type ManagedPage,
  type PageContent,
} from "@/lib/page-content-schema";
import {
  EXTRA_SECTIONS_KEY,
  HIDDEN_SECTIONS_KEY,
} from "@/lib/page-sections";
import { SECTION_LAYOUTS_KEY } from "@/lib/section-layouts";

const PAGE_CONTENT_PREFIX = "page:";

const META_KEYS = new Set([
  SECTION_LAYOUTS_KEY,
  HIDDEN_SECTIONS_KEY,
  EXTRA_SECTIONS_KEY,
]);

type PageContentDoc = {
  _id: string;
  content: Partial<PageContent>;
  updatedAt: Date;
};

function docId(page: ManagedPage) {
  return `${PAGE_CONTENT_PREFIX}${page}`;
}

function normalizePageContent(
  page: ManagedPage,
  content?: Partial<PageContent> | null,
): PageContent {
  const merged: Record<string, string> = {
    ...defaultPageContent[page],
    [SECTION_LAYOUTS_KEY]: "{}",
    [HIDDEN_SECTIONS_KEY]: "[]",
    [EXTRA_SECTIONS_KEY]: "[]",
  };
  if (content) {
    for (const key of Object.keys(merged)) {
      if (META_KEYS.has(key)) continue;
      const value = content[key];
      if (typeof value === "string") {
        merged[key] = value;
      }
    }
    for (const key of META_KEYS) {
      const value = content[key];
      if (typeof value === "string" && value.trim()) {
        merged[key] = value;
      }
    }
  }
  return merged;
}

export async function getPageContent(page: ManagedPage): Promise<PageContent> {
  try {
    const db = await getDatabase();
    const collection = db.collection<PageContentDoc>("site_content");

    const existing = await collection.findOne({ _id: docId(page) });

    if (!existing) {
      await collection.insertOne({
        _id: docId(page),
        content: defaultPageContent[page],
        updatedAt: new Date(),
      });
      return defaultPageContent[page];
    }

    return normalizePageContent(page, existing.content);
  } catch {
    return defaultPageContent[page];
  }
}

export async function updatePageContent(page: ManagedPage, content: PageContent): Promise<PageContent> {
  const db = await getDatabase();
  const collection = db.collection<PageContentDoc>("site_content");
  const normalized = normalizePageContent(page, content);

  await collection.updateOne(
    { _id: docId(page) },
    {
      $set: {
        content: normalized,
        updatedAt: new Date(),
      },
    },
    { upsert: true }
  );

  return normalized;
}

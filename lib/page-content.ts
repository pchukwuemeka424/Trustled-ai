import "server-only";
import { getDatabase } from "@/lib/mongodb";
import {
  defaultPageContent,
  type ManagedPage,
  type PageContent,
} from "@/lib/page-content-schema";

const PAGE_CONTENT_PREFIX = "page:";

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
  const merged: Record<string, string> = { ...defaultPageContent[page] };
  if (content) {
    for (const [key, value] of Object.entries(content)) {
      if (typeof value === "string") {
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

import "server-only";
import { getDatabase } from "@/lib/mongodb";
import {
  defaultHomeContent,
  getHomeContentFieldKeys,
  type HomeContent,
} from "@/lib/home-content-schema";
import { SECTION_LAYOUTS_KEY } from "@/lib/section-layouts";

const HOME_CONTENT_DOC_ID = "home";

type SiteContentDoc = {
  _id: string;
  content: Partial<HomeContent>;
  updatedAt: Date;
};

function normalizeContent(content?: Partial<HomeContent> | null): HomeContent {
  const merged: HomeContent = {
    ...defaultHomeContent,
    [SECTION_LAYOUTS_KEY]: defaultHomeContent[SECTION_LAYOUTS_KEY] ?? "{}",
  };
  if (content) {
    for (const key of getHomeContentFieldKeys()) {
      if (key === SECTION_LAYOUTS_KEY) continue;
      const value = content[key];
      if (typeof value === "string") {
        // Keep default hero image when CMS has an empty background URL.
        if (key === "heroBackgroundUrl" && !value.trim()) continue;
        merged[key] = value;
      }
    }
    const layouts = content[SECTION_LAYOUTS_KEY];
    if (typeof layouts === "string" && layouts.trim()) {
      merged[SECTION_LAYOUTS_KEY] = layouts;
    }
  }
  return merged;
}

export async function getHomeContent(): Promise<HomeContent> {
  try {
    const db = await getDatabase();
    const collection = db.collection<SiteContentDoc>("site_content");

    const existing = await collection.findOne({ _id: HOME_CONTENT_DOC_ID });

    if (!existing) {
      await collection.insertOne({
        _id: HOME_CONTENT_DOC_ID,
        content: defaultHomeContent,
        updatedAt: new Date(),
      });
      return defaultHomeContent;
    }

    return normalizeContent(existing.content);
  } catch {
    return defaultHomeContent;
  }
}

export async function updateHomeContent(content: HomeContent): Promise<HomeContent> {
  const db = await getDatabase();
  const collection = db.collection<SiteContentDoc>("site_content");
  const normalized = normalizeContent(content);

  await collection.updateOne(
    { _id: HOME_CONTENT_DOC_ID },
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

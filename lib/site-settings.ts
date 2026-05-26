import "server-only";
import { getDatabase } from "@/lib/mongodb";
import {
  defaultSiteSettings,
  getSiteSettingsFieldKeys,
  type SiteSettings,
} from "@/lib/site-settings-schema";

const SITE_SETTINGS_DOC_ID = "settings";

type SiteContentDoc = {
  _id: string;
  content: Partial<SiteSettings>;
  updatedAt: Date;
};

function normalizeSettings(
  content?: Partial<SiteSettings> | null,
  base: SiteSettings = defaultSiteSettings,
): SiteSettings {
  const merged = { ...base };
  if (content) {
    for (const key of getSiteSettingsFieldKeys()) {
      const value = content[key];
      if (typeof value === "string") {
        merged[key] = value;
      }
    }
  }
  return merged;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const db = await getDatabase();
    const collection = db.collection<SiteContentDoc>("site_content");

    const existing = await collection.findOne({ _id: SITE_SETTINGS_DOC_ID });

    if (!existing) {
      await collection.insertOne({
        _id: SITE_SETTINGS_DOC_ID,
        content: defaultSiteSettings,
        updatedAt: new Date(),
      });
      return defaultSiteSettings;
    }

    return normalizeSettings(existing.content);
  } catch {
    return defaultSiteSettings;
  }
}

export async function updateSiteSettings(
  settings: Partial<SiteSettings>,
): Promise<SiteSettings> {
  const db = await getDatabase();
  const collection = db.collection<SiteContentDoc>("site_content");
  const existing = await collection.findOne({ _id: SITE_SETTINGS_DOC_ID });
  const current = normalizeSettings(existing?.content);
  const normalized = normalizeSettings(settings, current);

  await collection.updateOne(
    { _id: SITE_SETTINGS_DOC_ID },
    {
      $set: {
        content: normalized,
        updatedAt: new Date(),
      },
    },
    { upsert: true },
  );

  return normalized;
}

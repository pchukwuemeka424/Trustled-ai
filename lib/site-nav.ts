import "server-only";
import { getDatabase } from "@/lib/mongodb";
import {
  defaultSiteNav,
  normalizeSiteNav,
  type SiteNav,
} from "@/lib/site-nav-schema";

const SITE_NAV_DOC_ID = "nav";

type SiteNavDoc = {
  _id: string;
  nav: SiteNav;
  updatedAt: Date;
};

export async function getSiteNav(): Promise<SiteNav> {
  try {
    const db = await getDatabase();
    const collection = db.collection<SiteNavDoc>("site_content");
    const existing = await collection.findOne({ _id: SITE_NAV_DOC_ID });

    if (!existing) {
      await collection.insertOne({
        _id: SITE_NAV_DOC_ID,
        nav: defaultSiteNav,
        updatedAt: new Date(),
      });
      return defaultSiteNav;
    }

    return normalizeSiteNav(existing.nav);
  } catch {
    return defaultSiteNav;
  }
}

export async function updateSiteNav(nav: SiteNav): Promise<SiteNav> {
  const db = await getDatabase();
  const collection = db.collection<SiteNavDoc>("site_content");
  const normalized = normalizeSiteNav(nav);

  await collection.updateOne(
    { _id: SITE_NAV_DOC_ID },
    {
      $set: {
        nav: normalized,
        updatedAt: new Date(),
      },
    },
    { upsert: true },
  );

  return normalized;
}

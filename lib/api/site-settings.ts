import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api/admin";
import { getSiteSettings, updateSiteSettings } from "@/lib/site-settings";
import {
  getSiteSettingsFieldKeys,
  type SiteSettings,
} from "@/lib/site-settings-schema";

function isValidSiteSettings(body: unknown): body is Partial<SiteSettings> {
  if (!body || typeof body !== "object" || Array.isArray(body)) return false;

  const validKeys = new Set(getSiteSettingsFieldKeys());
  return Object.entries(body).every(
    ([key, value]) => validKeys.has(key) && typeof value === "string",
  );
}

export async function getSiteSettingsResponse() {
  try {
    const settings = await getSiteSettings();
    return NextResponse.json({ settings });
  } catch {
    return NextResponse.json(
      { error: "Failed to load site settings" },
      { status: 500 },
    );
  }
}

export async function updateSiteSettingsResponse(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json();

    if (!isValidSiteSettings(body)) {
      return NextResponse.json(
        { error: "Invalid site settings payload" },
        { status: 400 },
      );
    }

    const settings = await updateSiteSettings(body);
    return NextResponse.json({ ok: true, settings });
  } catch {
    return NextResponse.json(
      { error: "Failed to update site settings" },
      { status: 500 },
    );
  }
}

import { NextResponse } from "next/server";
import { requireSiteAdmin } from "@/lib/api/admin";
import { getSiteNav, updateSiteNav } from "@/lib/site-nav";
import { isValidSiteNav } from "@/lib/site-nav-schema";

export async function getSiteNavResponse() {
  try {
    const nav = await getSiteNav();
    return NextResponse.json({ nav });
  } catch {
    return NextResponse.json(
      { error: "Failed to load navigation" },
      { status: 500 },
    );
  }
}

export async function updateSiteNavResponse(request: Request) {
  const unauthorized = await requireSiteAdmin();
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json();
    const nav = (body as { nav?: unknown }).nav;

    if (!isValidSiteNav(nav)) {
      return NextResponse.json(
        { error: "Invalid navigation payload" },
        { status: 400 },
      );
    }

    const saved = await updateSiteNav(nav);
    return NextResponse.json({ ok: true, nav: saved });
  } catch {
    return NextResponse.json(
      { error: "Failed to update navigation" },
      { status: 500 },
    );
  }
}

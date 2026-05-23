import { NextResponse } from "next/server";
import { requireAdmin } from "@/api/admin";
import {
  getPageContentFieldKeys,
  type ManagedPage,
  type PageContent,
} from "@/lib/page-content-schema";
import { getPageContent, updatePageContent } from "@/lib/page-content";

function isValidPageContent(page: ManagedPage, body: unknown): body is PageContent {
  if (!body || typeof body !== "object") return false;

  const keys = getPageContentFieldKeys(page);
  return keys.every((key) => typeof (body as PageContent)[key] === "string");
}

export async function getPageContentResponse(page: ManagedPage) {
  try {
    const content = await getPageContent(page);
    return NextResponse.json({ content });
  } catch {
    return NextResponse.json({ error: "Failed to load page content" }, { status: 500 });
  }
}

export async function updatePageContentResponse(page: ManagedPage, request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json();

    if (!isValidPageContent(page, body)) {
      return NextResponse.json({ error: "Invalid page content payload" }, { status: 400 });
    }

    const content = await updatePageContent(page, body);
    return NextResponse.json({ ok: true, content });
  } catch {
    return NextResponse.json({ error: "Failed to update page content" }, { status: 500 });
  }
}

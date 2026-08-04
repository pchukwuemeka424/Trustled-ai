import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api/admin";
import {
  createCustomPage,
  deleteCustomPage,
  getCustomPage,
  listCustomPages,
  updateCustomPage,
} from "@/lib/custom-pages";
import { isValidCustomPage } from "@/lib/custom-pages-schema";

export async function listCustomPagesResponse() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const pages = await listCustomPages();
    return NextResponse.json({ pages });
  } catch {
    return NextResponse.json(
      { error: "Failed to load pages" },
      { status: 500 },
    );
  }
}

export async function createCustomPageResponse(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json();
    if (!isValidCustomPage(body)) {
      return NextResponse.json(
        { error: "Invalid page payload" },
        { status: 400 },
      );
    }

    const page = await createCustomPage(body);
    return NextResponse.json({ ok: true, page }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to create page",
      },
      { status: 400 },
    );
  }
}

export async function getCustomPageResponse(slug: string) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const page = await getCustomPage(slug);
    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }
    return NextResponse.json({ page });
  } catch {
    return NextResponse.json(
      { error: "Failed to load page" },
      { status: 500 },
    );
  }
}

export async function updateCustomPageResponse(
  slug: string,
  request: Request,
) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json();
    if (!isValidCustomPage(body)) {
      return NextResponse.json(
        { error: "Invalid page payload" },
        { status: 400 },
      );
    }

    const page = await updateCustomPage(slug, body);
    return NextResponse.json({ ok: true, page });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to update page",
      },
      { status: 400 },
    );
  }
}

export async function deleteCustomPageResponse(slug: string) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const existing = await getCustomPage(slug);
    if (!existing) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }
    await deleteCustomPage(slug);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to delete page",
      },
      { status: 400 },
    );
  }
}

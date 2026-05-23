import { NextResponse } from "next/server";
import { requireAdmin } from "@/api/admin";
import { getHomeContent, updateHomeContent } from "@/lib/home-content";
import {
  getHomeContentFieldKeys,
  type HomeContent,
} from "@/lib/home-content-schema";

function isValidHomeContent(body: unknown): body is HomeContent {
  if (!body || typeof body !== "object") return false;

  return getHomeContentFieldKeys().every(
    (key) => typeof (body as HomeContent)[key] === "string",
  );
}

export async function getHomeContentResponse() {
  try {
    const content = await getHomeContent();
    return NextResponse.json({ content });
  } catch {
    return NextResponse.json({ error: "Failed to load home content" }, { status: 500 });
  }
}

export async function updateHomeContentResponse(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json();

    if (!isValidHomeContent(body)) {
      return NextResponse.json({ error: "Invalid home content payload" }, { status: 400 });
    }

    const content = await updateHomeContent(body);
    return NextResponse.json({ ok: true, content });
  } catch {
    return NextResponse.json({ error: "Failed to update home content" }, { status: 500 });
  }
}

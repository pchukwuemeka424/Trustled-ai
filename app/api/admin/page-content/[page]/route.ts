import { getPageContentResponse, updatePageContentResponse } from "@/api/page-content";
import { isManagedPage } from "@/lib/page-content-schema";

type RouteContext = {
  params: Promise<{ page: string }>;
};

export async function GET(_: Request, context: RouteContext) {
  const { page } = await context.params;

  if (!isManagedPage(page)) {
    return Response.json({ error: "Page is not managed" }, { status: 404 });
  }

  return getPageContentResponse(page);
}

export async function PUT(request: Request, context: RouteContext) {
  const { page } = await context.params;

  if (!isManagedPage(page)) {
    return Response.json({ error: "Page is not managed" }, { status: 404 });
  }

  return updatePageContentResponse(page, request);
}

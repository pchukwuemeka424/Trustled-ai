import {
  deleteCustomPageResponse,
  getCustomPageResponse,
  updateCustomPageResponse,
} from "@/lib/api/custom-pages";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;
  return getCustomPageResponse(slug);
}

export async function PUT(request: Request, context: RouteContext) {
  const { slug } = await context.params;
  return updateCustomPageResponse(slug, request);
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { slug } = await context.params;
  return deleteCustomPageResponse(slug);
}

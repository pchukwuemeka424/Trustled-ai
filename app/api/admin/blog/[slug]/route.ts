import {
  deleteBlogPostResponse,
  getBlogPostResponse,
  updateBlogPostResponse,
} from "@/lib/api/blog";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_: Request, context: RouteContext) {
  const { slug } = await context.params;
  return getBlogPostResponse(slug);
}

export async function PUT(request: Request, context: RouteContext) {
  const { slug } = await context.params;
  return updateBlogPostResponse(slug, request);
}

export async function DELETE(_: Request, context: RouteContext) {
  const { slug } = await context.params;
  return deleteBlogPostResponse(slug);
}

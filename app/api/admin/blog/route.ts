import {
  createBlogPostResponse,
  listBlogPostsResponse,
} from "@/lib/api/blog";

export async function GET() {
  return listBlogPostsResponse();
}

export async function POST(request: Request) {
  return createBlogPostResponse(request);
}

import {
  createBlogPostResponse,
  listBlogPostsResponse,
} from "@/api/blog";

export async function GET() {
  return listBlogPostsResponse();
}

export async function POST(request: Request) {
  return createBlogPostResponse(request);
}

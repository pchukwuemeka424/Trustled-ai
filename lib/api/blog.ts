import { NextResponse } from "next/server";
import {
  requireBlogAccess,
  requireBlogDeleteAccess,
} from "@/lib/api/admin";
import {
  createBlogPost,
  deleteBlogPost,
  getBlogPostBySlug,
  listAllBlogPosts,
  updateBlogPost,
} from "@/lib/blog";
import { isValidBlogPostPayload, normalizeBlogPost } from "@/lib/blog-schema";

export async function listBlogPostsResponse() {
  const unauthorized = await requireBlogAccess();
  if (unauthorized) return unauthorized;

  try {
    const posts = await listAllBlogPosts();
    return NextResponse.json({ posts });
  } catch {
    return NextResponse.json(
      { error: "Failed to load blog posts" },
      { status: 500 },
    );
  }
}

export async function createBlogPostResponse(request: Request) {
  const unauthorized = await requireBlogAccess();
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json();

    if (!isValidBlogPostPayload(body)) {
      return NextResponse.json(
        { error: "Invalid blog post payload" },
        { status: 400 },
      );
    }

    const post = await createBlogPost(normalizeBlogPost(body));
    return NextResponse.json({ ok: true, post });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create blog post";

    if (message === "A post with this slug already exists") {
      return NextResponse.json({ error: message }, { status: 409 });
    }

    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 },
    );
  }
}

export async function getBlogPostResponse(slug: string) {
  const unauthorized = await requireBlogAccess();
  if (unauthorized) return unauthorized;

  try {
    const post = await getBlogPostBySlug(slug);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ post });
  } catch {
    return NextResponse.json(
      { error: "Failed to load blog post" },
      { status: 500 },
    );
  }
}

export async function updateBlogPostResponse(slug: string, request: Request) {
  const unauthorized = await requireBlogAccess();
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json();

    if (!isValidBlogPostPayload(body)) {
      return NextResponse.json(
        { error: "Invalid blog post payload" },
        { status: 400 },
      );
    }

    const post = await updateBlogPost(slug, normalizeBlogPost(body));

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true, post });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update blog post";

    if (message === "A post with this slug already exists") {
      return NextResponse.json({ error: message }, { status: 409 });
    }

    return NextResponse.json(
      { error: "Failed to update blog post" },
      { status: 500 },
    );
  }
}

export async function deleteBlogPostResponse(slug: string) {
  const unauthorized = await requireBlogDeleteAccess();
  if (unauthorized) return unauthorized;

  try {
    const deleted = await deleteBlogPost(slug);

    if (!deleted) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete blog post" },
      { status: 500 },
    );
  }
}

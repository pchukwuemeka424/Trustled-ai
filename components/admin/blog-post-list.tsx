"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BlogFeaturedImage } from "@/components/blog/blog-post-card";
import { formatBlogDate, type BlogPostStatus } from "@/lib/blog-schema";

export type AdminBlogPostSummary = {
  slug: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  author: string;
  publishedAt: string;
  status: BlogPostStatus;
};

type BlogPostListProps = {
  posts: AdminBlogPostSummary[];
  /** Base path for edit links, e.g. `/blog` or `/admin/blog` */
  editBasePath?: string;
};

export function BlogPostList({ posts, editBasePath = "/admin/blog" }: BlogPostListProps) {
  const router = useRouter();
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete(slug: string, title: string) {
    if (!window.confirm(`Delete “${title}”? This cannot be undone.`)) {
      return;
    }

    setError(null);
    setDeletingSlug(slug);

    try {
      const response = await fetch(`/api/admin/blog/${encodeURIComponent(slug)}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? "Failed to delete post");
      }

      router.refresh();
    } catch (deleteError) {
      setError(
        deleteError instanceof Error ? deleteError.message : "Failed to delete post",
      );
    } finally {
      setDeletingSlug(null);
    }
  }

  if (posts.length === 0) {
    return <p className="lede">No blog posts yet.</p>;
  }

  return (
    <>
      {error ? <p className="form-error">{error}</p> : null}
      <ul className="blog-admin-list">
        {posts.map((post, index) => (
          <li
            key={post.slug || `${post.publishedAt}-${index}`}
            className="blog-admin-list-item"
          >
            <div className="blog-admin-list-main">
              {post.imageUrl ? (
                <BlogFeaturedImage
                  imageUrl={post.imageUrl}
                  title={post.title}
                  className="blog-admin-list-thumb"
                />
              ) : null}
              <div>
                <p className="blog-admin-list-meta">
                  <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
                  <span aria-hidden="true"> · </span>
                  <span>{post.author}</span>
                  <span aria-hidden="true"> · </span>
                  <span className={`blog-status blog-status--${post.status}`}>
                    {post.status}
                  </span>
                </p>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
              </div>
              <div className="blog-admin-list-actions">
                <Link
                  className="text-link"
                  href={`${editBasePath}/${encodeURIComponent(post.slug)}/edit`}
                >
                  Edit
                </Link>
                {post.status === "published" ? (
                  <Link className="text-link" href={`/blog/${post.slug}`}>
                    View
                  </Link>
                ) : null}
                <button
                  type="button"
                  className="blog-admin-delete"
                  disabled={deletingSlug === post.slug}
                  onClick={() => handleDelete(post.slug, post.title)}
                >
                  {deletingSlug === post.slug ? "Deleting…" : "Delete"}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

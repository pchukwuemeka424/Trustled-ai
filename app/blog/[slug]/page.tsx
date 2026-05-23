import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogManageToolbar } from "@/components/blog/blog-manage-toolbar";
import { BlogFeaturedImage } from "@/components/blog/blog-post-card";
import { BlogPostBody } from "@/components/blog/blog-post-body";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getBlogPostBySlug, getPublishedBlogPostBySlug } from "@/lib/blog";
import { formatBlogDate } from "@/lib/blog-schema";

export const dynamic = "force-dynamic";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedBlogPostBySlug(slug);

  if (!post) {
    return { title: "Article not found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    ...(post.imageUrl
      ? { openGraph: { images: [{ url: post.imageUrl }] } }
      : {}),
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const isAdmin = await isAdminAuthenticated();
  const post = isAdmin
    ? await getBlogPostBySlug(slug)
    : await getPublishedBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const isDraft = post.status === "draft";

  return (
    <>
      <BlogManageToolbar isAdmin={isAdmin} isManaging={false} />

      <section className="hero hero--page">
        <div className="wrap hero-inner">
          <p className="hero-tagline">Blog</p>
          {isDraft && isAdmin ? (
            <p className="blog-draft-banner">Draft — only visible to admins</p>
          ) : null}
          <h1>{post.title}</h1>
          <p className="blog-meta blog-meta--hero">
            <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
            <span aria-hidden="true"> · </span>
            <span>{post.author}</span>
          </p>
          {isAdmin ? (
            <p style={{ marginTop: "1rem" }}>
              <Link
                className="text-link"
                href={`/blog/${encodeURIComponent(post.slug)}/edit`}
              >
                Edit article
              </Link>
            </p>
          ) : null}
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="blog-article-layout">
            <BlogFeaturedImage
              imageUrl={post.imageUrl}
              title={post.title}
              className="blog-article-image"
            />
            <BlogPostBody content={post.content} />
            <p className="blog-back">
              <Link className="text-link" href="/blog">
                Back to blog <span className="arrow" aria-hidden="true">→</span>
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

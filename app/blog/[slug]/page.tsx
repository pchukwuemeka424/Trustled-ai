import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogArticleSidebar } from "@/components/blog/blog-article-sidebar";
import { BlogManageToolbar } from "@/components/blog/blog-manage-toolbar";
import { BlogFeaturedImage } from "@/components/blog/blog-post-card";
import { BlogPostBody } from "@/components/blog/blog-post-body";
import { isBlogEditorAuthenticated } from "@/lib/admin-auth";
import {
  getBlogPostBySlug,
  getPublishedBlogPostBySlug,
  listPublishedBlogPosts,
} from "@/lib/blog";
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

  const url = `/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url,
      publishedTime: post.publishedAt,
      authors: post.author ? [post.author] : undefined,
      ...(post.imageUrl ? { images: [{ url: post.imageUrl }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      ...(post.imageUrl ? { images: [post.imageUrl] } : {}),
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const canManage = await isBlogEditorAuthenticated();
  const post = canManage
    ? await getBlogPostBySlug(slug)
    : await getPublishedBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const isDraft = post.status === "draft";
  const recentPosts = (await listPublishedBlogPosts())
    .filter((item) => item.slug !== post.slug)
    .slice(0, 4)
    .map((item) => ({
      slug: item.slug,
      title: item.title,
      publishedAt: item.publishedAt,
      imageUrl: item.imageUrl,
    }));

  return (
    <>
      <BlogManageToolbar isAdmin={canManage} isManaging={false} />

      <article className="blog-article-page">
        <header className="blog-article-header">
          <div className="wrap">
            <nav className="blog-breadcrumb" aria-label="Breadcrumb">
              <Link href="/blog">Blog</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{post.title}</span>
            </nav>

            {isDraft && canManage ? (
              <p className="blog-draft-banner">Draft — only visible to editors</p>
            ) : null}

            <p className="blog-article-label">Insight</p>
            <h1 className="blog-article-title">{post.title}</h1>

            <p className="blog-meta blog-meta--article">
              <time dateTime={post.publishedAt}>
                {formatBlogDate(post.publishedAt)}
              </time>
              <span aria-hidden="true"> · </span>
              <span>{post.author}</span>
            </p>

            {post.excerpt ? (
              <p className="blog-article-excerpt">{post.excerpt}</p>
            ) : null}

            {canManage ? (
              <p className="blog-article-admin">
                <Link
                  className="text-link"
                  href={`/blog/${encodeURIComponent(post.slug)}/edit`}
                >
                  Edit article
                </Link>
              </p>
            ) : null}
          </div>
        </header>

        <div className="wrap blog-article-shell">
          <div className="blog-article-layout">
            <div className="blog-article-main">
              <BlogFeaturedImage
                imageUrl={post.imageUrl}
                title={post.title}
                className="blog-article-image"
              />
              <BlogPostBody content={post.content} />
            </div>

            <BlogArticleSidebar recentPosts={recentPosts} />
          </div>
        </div>
      </article>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { BlogPostList } from "@/components/admin/blog-post-list";
import { BlogManageToolbar } from "@/components/blog/blog-manage-toolbar";
import { BlogPostCardContent } from "@/components/blog/blog-post-card";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { blogPostSummary, listAllBlogPosts, listPublishedBlogPosts } from "@/lib/blog";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical guidance on AI governance, shadow AI, and proportionate compliance for schools, universities, and regulated SMEs.",
  alternates: {
    canonical: "/blog",
  },
};

type BlogPageProps = {
  searchParams: Promise<{ edit?: string }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const isAdmin = await isAdminAuthenticated();
  const isManaging = isAdmin && params.edit === "1";
  const posts = isManaging
    ? await listAllBlogPosts()
    : await listPublishedBlogPosts();

  return (
    <>
      <BlogManageToolbar isAdmin={isAdmin} isManaging={isManaging} />

      <section className="hero hero--page">
        <div className="wrap hero-inner">
          <p className="hero-tagline">Blog</p>
          <h1>
            {isManaging ? "Manage blog articles" : "Practical AI governance insight."}
          </h1>
          <p className="lede">
            {isManaging
              ? "Create, edit, publish, or delete articles shown on the public blog."
              : "Short articles on shadow AI, regulatory readiness, and building governance that works in real organisations."}
          </p>
        </div>
      </section>

      <section>
        <div className="wrap">
          {isManaging ? (
            <>
              <div className="blog-manage-header">
                <p className="lede">
                  {posts.length} article{posts.length === 1 ? "" : "s"}
                </p>
                <Link className="btn btn-sm" href="/blog/new">
                  New article
                </Link>
              </div>
              <BlogPostList
                posts={posts.map(blogPostSummary)}
                editBasePath="/blog"
              />
            </>
          ) : posts.length === 0 ? (
            <p className="lede">No articles published yet. Check back soon.</p>
          ) : (
            <div className="blog-grid">
              {posts.map((post, index) => (
                <article
                  key={post.slug || `${post.publishedAt}-${index}`}
                  className="blog-card"
                  {...(index > 0
                    ? { "data-delay": String(Math.min(index, 3)) }
                    : {})}
                >
                  <BlogPostCardContent post={post} />
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {!isManaging ? (
        <section className="cta-band">
          <div className="wrap">
            <h2>Want to talk through your situation?</h2>
            <p>
              A 30-minute conversation, no pitch deck. We will tell you whether we
              can help.
            </p>
            <Link className="btn btn-on-ink" href="/contact">
              Start a conversation
            </Link>
          </div>
        </section>
      ) : null}
    </>
  );
}

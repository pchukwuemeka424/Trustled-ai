import Link from "next/link";
import { formatBlogDate } from "@/lib/blog-schema";
import type { BlogPostRecord } from "@/lib/blog-schema";

type BlogArticleSidebarProps = {
  recentPosts: Pick<
    BlogPostRecord,
    "slug" | "title" | "publishedAt" | "imageUrl"
  >[];
};

export function BlogArticleSidebar({ recentPosts }: BlogArticleSidebarProps) {
  return (
    <aside className="blog-article-sidebar" aria-label="Blog sidebar">
      <div className="blog-sidebar-block">
        <h2 className="blog-sidebar-heading">Recent articles</h2>
        {recentPosts.length === 0 ? (
          <p className="blog-sidebar-empty">No other articles yet.</p>
        ) : (
          <ul className="blog-sidebar-list">
            {recentPosts.map((post) => (
              <li key={post.slug} className="blog-sidebar-item">
                <Link
                  className="blog-sidebar-link"
                  href={`/blog/${post.slug}`}
                >
                  {post.imageUrl ? (
                    <span className="blog-sidebar-thumb">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={post.imageUrl} alt="" loading="lazy" />
                    </span>
                  ) : null}
                  <span className="blog-sidebar-link-text">
                    <span className="blog-sidebar-link-title">{post.title}</span>
                    <time
                      className="blog-sidebar-link-date"
                      dateTime={post.publishedAt}
                    >
                      {formatBlogDate(post.publishedAt)}
                    </time>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="blog-sidebar-block">
        <Link className="text-link blog-sidebar-back" href="/blog">
          Back to blog <span className="arrow" aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="blog-sidebar-block blog-sidebar-cta">
        <h2 className="blog-sidebar-heading">Need guidance?</h2>
        <p>
          A 30-minute conversation, no pitch deck. We will tell you whether we
          can help.
        </p>
        <Link className="btn btn-sm" href="/contact">
          Start a conversation
        </Link>
      </div>
    </aside>
  );
}

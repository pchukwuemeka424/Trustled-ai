import Link from "next/link";
import { formatBlogDate } from "@/lib/blog-schema";
import type { BlogPostRecord } from "@/lib/blog-schema";

export type BlogPostCardPost = Pick<
  BlogPostRecord,
  "slug" | "title" | "excerpt" | "author" | "publishedAt" | "imageUrl"
>;

type BlogPostCardProps = {
  post: BlogPostCardPost;
};

export function BlogFeaturedImage({
  imageUrl,
  title,
  className = "blog-card-image",
}: {
  imageUrl: string;
  title: string;
  className?: string;
}) {
  if (!imageUrl) return null;

  return (
    <div className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imageUrl} alt="" loading="lazy" />
    </div>
  );
}

export function BlogPostCardContent({ post }: BlogPostCardProps) {
  return (
    <>
      <BlogFeaturedImage imageUrl={post.imageUrl} title={post.title} />
      <div className="blog-card-body">
        <p className="blog-meta">
          <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
          <span aria-hidden="true"> · </span>
          <span>{post.author}</span>
        </p>
        <h2>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>
        <p>{post.excerpt}</p>
        <Link className="text-link blog-card-link" href={`/blog/${post.slug}`}>
          Read article <span className="arrow" aria-hidden="true">→</span>
        </Link>
      </div>
    </>
  );
}

type BlogPostCardArticleProps = BlogPostCardProps & {
  delay?: number;
};

export function BlogPostCard({ post, delay }: BlogPostCardArticleProps) {
  return (
    <article
      className="blog-card reveal"
      {...(delay ? { "data-delay": String(Math.min(delay, 3)) } : {})}
    >
      <BlogPostCardContent post={post} />
    </article>
  );
}

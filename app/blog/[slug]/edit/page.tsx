import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { BlogPostForm } from "@/components/admin/blog-post-form";
import { BlogManageToolbar } from "@/components/blog/blog-manage-toolbar";
import { isBlogEditorAuthenticated } from "@/lib/admin-auth";
import { getBlogPostBySlug } from "@/lib/blog";

export const dynamic = "force-dynamic";

type EditBlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogEditPage({ params }: EditBlogPostPageProps) {
  const canManage = await isBlogEditorAuthenticated();

  if (!canManage) {
    const { slug } = await params;
    redirect(`/admin/login?next=${encodeURIComponent(`/blog/${slug}/edit`)}`);
  }

  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <BlogManageToolbar isAdmin isManaging />

      <section className="hero hero--page">
        <div className="wrap hero-inner">
          <p className="hero-tagline">Blog</p>
          <h1>Edit article</h1>
          <p style={{ marginTop: "0.75rem" }}>
            <Link className="text-link" href="/blog?edit=1">
              Back to blog manager
            </Link>
          </p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <BlogPostForm
            mode="edit"
            initialPost={{
              slug: post.slug,
              title: post.title,
              excerpt: post.excerpt,
              content: post.content,
              imageUrl: post.imageUrl,
              author: post.author,
              publishedAt: post.publishedAt,
              status: post.status,
            }}
            originalSlug={post.slug}
            returnTo="/blog?edit=1"
          />
        </div>
      </section>
    </>
  );
}

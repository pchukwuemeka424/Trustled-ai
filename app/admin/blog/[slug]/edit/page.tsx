import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { BlogPostForm } from "@/components/admin/blog-post-form";
import { getBlogPostBySlug } from "@/lib/blog";

export const dynamic = "force-dynamic";

type EditBlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function EditBlogPostPage({
  params,
}: EditBlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <AdminShell
      title="Edit article"
      description="Update copy, media, status, and publish details."
      actions={
        <Link className="btn btn-sm btn-ghost" href="/admin/blog">
          Back
        </Link>
      }
    >
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
      />
    </AdminShell>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogPostForm } from "@/components/admin/blog-post-form";
import { Container } from "@/components/container";
import { getBlogPostBySlug } from "@/lib/blog";

export const dynamic = "force-dynamic";

type EditBlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function EditBlogPostPage({ params }: EditBlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <section style={{ padding: "clamp(3rem,6vw,5rem) 0" }}>
      <Container>
        <div style={{ marginBottom: "2rem" }}>
          <p className="eyebrow">Admin</p>
          <h1 style={{ marginTop: "0.5rem" }}>Edit article</h1>
          <p style={{ marginTop: "0.75rem" }}>
            <Link className="text-link" href="/admin/blog">
              Back to blog articles
            </Link>
          </p>
        </div>

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
      </Container>
    </section>
  );
}

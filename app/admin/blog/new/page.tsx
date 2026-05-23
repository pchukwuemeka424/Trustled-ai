import Link from "next/link";
import { BlogPostForm } from "@/components/admin/blog-post-form";
import { Container } from "@/components/container";

export default function AdminNewBlogPostPage() {
  return (
    <section style={{ padding: "clamp(3rem,6vw,5rem) 0" }}>
      <Container>
        <div style={{ marginBottom: "2rem" }}>
          <p className="eyebrow">Admin</p>
          <h1 style={{ marginTop: "0.5rem" }}>New article</h1>
          <p style={{ marginTop: "0.75rem" }}>
            <Link className="text-link" href="/admin/blog">
              Back to blog articles
            </Link>
          </p>
        </div>

        <BlogPostForm mode="create" />
      </Container>
    </section>
  );
}

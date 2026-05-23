import Link from "next/link";
import { AdminLogoutButton } from "@/components/admin-logout-button";
import { BlogPostList } from "@/components/admin/blog-post-list";
import { Container } from "@/components/container";
import { blogPostSummary, listAllBlogPosts } from "@/lib/blog";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const posts = await listAllBlogPosts();

  return (
    <section style={{ padding: "clamp(3rem,6vw,5rem) 0" }}>
      <Container>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          <div>
            <p className="eyebrow">Admin</p>
            <h1 style={{ marginTop: "0.5rem" }}>Blog articles</h1>
            <p className="lede" style={{ marginTop: "0.75rem", maxWidth: "42rem" }}>
              Create, edit, and publish articles shown on the public blog.
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <Link className="btn btn-sm" href="/admin/blog/new">
              New article
            </Link>
            <Link className="btn btn-sm btn-ghost" href="/admin">
              Back to admin
            </Link>
            <AdminLogoutButton />
          </div>
        </div>

        <BlogPostList posts={posts.map(blogPostSummary)} />
      </Container>
    </section>
  );
}

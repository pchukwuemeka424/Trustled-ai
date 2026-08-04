import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";
import { BlogPostList } from "@/components/admin/blog-post-list";
import { blogPostSummary, listAllBlogPosts } from "@/lib/blog";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const posts = await listAllBlogPosts();

  return (
    <AdminShell
      title="Blog articles"
      description="Create, edit, and publish articles shown on the public blog."
      actions={
        <Link className="btn btn-sm" href="/admin/blog/new">
          New article
        </Link>
      }
    >
      <BlogPostList posts={posts.map(blogPostSummary)} />
    </AdminShell>
  );
}

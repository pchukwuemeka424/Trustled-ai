import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { BlogPostList } from "@/components/admin/blog-post-list";
import { getAdminSession } from "@/lib/admin-auth";
import { canDeleteBlog, canManageBlog } from "@/lib/admin-roles";
import { blogPostSummary, listAllBlogPosts } from "@/lib/blog";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const session = await getAdminSession();

  if (!session || !canManageBlog(session.role)) {
    redirect("/admin/login?next=/admin/blog");
  }

  const posts = await listAllBlogPosts();
  const allowDelete = canDeleteBlog(session.role);
  const isEditor = session.role === "editor";

  return (
    <AdminShell
      eyebrow={isEditor ? "Editor" : "Admin"}
      title="Blog articles"
      description={
        isEditor
          ? "Create, edit, and read articles shown on the public blog."
          : "Create, edit, and publish articles shown on the public blog."
      }
      dashboardHref={isEditor ? "/admin/blog" : "/admin"}
      actions={
        <Link className="btn btn-sm" href="/admin/blog/new">
          New article
        </Link>
      }
    >
      <BlogPostList
        posts={posts.map(blogPostSummary)}
        canDelete={allowDelete}
      />
    </AdminShell>
  );
}

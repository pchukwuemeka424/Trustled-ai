import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";
import { BlogPostForm } from "@/components/admin/blog-post-form";

export default function AdminNewBlogPostPage() {
  return (
    <AdminShell
      title="New article"
      description="Write a draft or publish straight to the public blog."
      actions={
        <Link className="btn btn-sm btn-ghost" href="/admin/blog">
          Back
        </Link>
      }
    >
      <BlogPostForm mode="create" />
    </AdminShell>
  );
}

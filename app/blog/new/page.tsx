import Link from "next/link";
import { redirect } from "next/navigation";
import { BlogPostForm } from "@/components/admin/blog-post-form";
import { BlogManageToolbar } from "@/components/blog/blog-manage-toolbar";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function BlogNewPage() {
  const isAdmin = await isAdminAuthenticated();

  if (!isAdmin) {
    redirect("/admin/login?next=/blog/new");
  }

  return (
    <>
      <BlogManageToolbar isAdmin isManaging />

      <section className="hero hero--page">
        <div className="wrap hero-inner">
          <p className="hero-tagline">Blog</p>
          <h1>New article</h1>
          <p style={{ marginTop: "0.75rem" }}>
            <Link className="text-link" href="/blog?edit=1">
              Back to blog manager
            </Link>
          </p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <BlogPostForm mode="create" returnTo="/blog?edit=1" />
        </div>
      </section>
    </>
  );
}

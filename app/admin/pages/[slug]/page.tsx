import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { CustomPageForm } from "@/components/admin/custom-page-form";
import { getCustomPage } from "@/lib/custom-pages";
import type { CustomPage } from "@/lib/custom-pages-schema";
import { getSiteNav } from "@/lib/site-nav";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function toFormPage(
  page: NonNullable<Awaited<ReturnType<typeof getCustomPage>>>,
): CustomPage {
  const { createdAt: _c, updatedAt: _u, ...content } = page;
  return content;
}

export default async function AdminEditPagePage({ params }: PageProps) {
  const { slug } = await params;
  const [page, nav] = await Promise.all([getCustomPage(slug), getSiteNav()]);

  if (!page) {
    notFound();
  }

  return (
    <AdminShell
      title={page.title}
      description="Update content, cards, and where this page sits in the navigation."
      actions={
        <>
          <Link className="btn btn-sm btn-ghost" href={`/${page.slug}`}>
            View
          </Link>
          <Link className="btn btn-sm btn-ghost" href="/admin/pages">
            All pages
          </Link>
        </>
      }
    >
      <CustomPageForm mode="edit" initialPage={toFormPage(page)} nav={nav} />
    </AdminShell>
  );
}

import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";
import { CustomPageForm } from "@/components/admin/custom-page-form";
import { getSiteNav } from "@/lib/site-nav";

export const dynamic = "force-dynamic";

export default async function AdminNewPagePage() {
  const nav = await getSiteNav();

  return (
    <AdminShell
      title="Add page"
      description="Create a page with a hero, cards, and choose whether it sits as a parent or subpage in the header."
      actions={
        <Link className="btn btn-sm btn-ghost" href="/admin/pages">
          All pages
        </Link>
      }
    >
      <CustomPageForm mode="create" nav={nav} />
    </AdminShell>
  );
}

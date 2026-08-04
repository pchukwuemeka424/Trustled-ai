import Link from "next/link";
import { SiteSettingsForm } from "@/components/admin/site-settings-form";
import { AdminShell } from "@/components/admin/admin-shell";
import { getSiteSettings } from "@/lib/site-settings";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <AdminShell
      title="Site settings"
      description="Upload or change the logo shown in the site header and manage the footer content used on every page."
    >
      <div className="admin-panel" style={{ maxWidth: "48rem" }}>
        <h2 className="eyebrow">Header and footer</h2>
        <SiteSettingsForm initialSettings={settings} />
      </div>
      <p style={{ marginTop: "1.25rem" }}>
        <Link href="/admin/pages" className="text-link">
          Manage pages &amp; navigation →
        </Link>
      </p>
    </AdminShell>
  );
}

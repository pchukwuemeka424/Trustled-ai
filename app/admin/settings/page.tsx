import Link from "next/link";
import { SiteSettingsForm } from "@/components/admin/site-settings-form";
import { AdminLogoutButton } from "@/components/admin-logout-button";
import { Container } from "@/components/container";
import { getSiteSettings } from "@/lib/site-settings";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

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
            marginBottom: "2.5rem",
          }}
        >
          <div>
            <p className="eyebrow">Admin</p>
            <h1 style={{ marginTop: "0.5rem" }}>Site settings</h1>
            <p className="lede" style={{ marginTop: "0.75rem", maxWidth: "42rem" }}>
              Upload or change the logo shown in the site header on every page.
              When logged in, you can also use &ldquo;Upload logo&rdquo; next to the
              brand in the header.
            </p>
          </div>
          <AdminLogoutButton />
        </div>

        <p style={{ marginBottom: "1.5rem" }}>
          <Link href="/admin" className="text-link">
            &larr; Back to page editor
          </Link>
        </p>

        <div
          style={{
            maxWidth: "32rem",
            padding: "1.5rem",
            border: "1px solid var(--line)",
            borderRadius: "var(--radius)",
            background: "var(--white)",
          }}
        >
          <h2 className="eyebrow">Header logo</h2>
          <SiteSettingsForm
            initialLogoUrl={settings.logoUrl}
            initialLogoAlt={settings.logoAlt}
          />
        </div>
      </Container>
    </section>
  );
}

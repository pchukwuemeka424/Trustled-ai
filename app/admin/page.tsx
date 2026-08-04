import Link from "next/link";
import { AdminLogoutButton } from "@/components/admin-logout-button";
import { listCustomPages } from "@/lib/custom-pages";

export const dynamic = "force-dynamic";

const liveEditSections = [
  {
    label: "Core",
    pages: [
      { name: "Home", href: "/?edit=1", hint: "Hero, offerings, FAQ, CTA" },
      { name: "About", href: "/about?edit=1", hint: "Story, cards, team" },
      { name: "Contact", href: "/contact?edit=1", hint: "Form and details" },
    ],
  },
  {
    label: "Offerings",
    pages: [
      { name: "Services", href: "/services?edit=1", hint: "Advisory & automation" },
      {
        name: "Solutions",
        href: "/solutions?edit=1",
        hint: "GARIL AI & ASAT",
      },
      { name: "Training", href: "/education?edit=1", hint: "Workshops & GRC" },
    ],
  },
];

export default async function AdminPage() {
  const customPages = await listCustomPages();

  return (
    <section className="admin-shell">
      <div className="wrap">
        <div className="admin-shell-header">
          <div className="admin-shell-intro">
            <p className="eyebrow">Admin</p>
            <h1>TrustLed control centre</h1>
            <p className="lede">
              Manage pages, cards, navigation, and live content from one place.
            </p>
          </div>
          <div className="admin-shell-actions">
            <Link href="/admin/pages/new" className="btn btn-sm">
              Add page
            </Link>
            <AdminLogoutButton />
          </div>
        </div>

        <div className="admin-hero-actions">
          <Link href="/admin/pages" className="admin-feature-card">
            <p className="eyebrow">Pages</p>
            <h2>Pages, cards &amp; placement</h2>
            <p>
              Create pages, add cards, and set each one as a parent, subpage, or
              hidden from the header.
            </p>
            <span className="text-link">
              Open pages manager <span className="arrow">→</span>
            </span>
          </Link>
          <Link href="/admin/settings" className="admin-feature-card">
            <p className="eyebrow">Brand</p>
            <h2>Logo &amp; footer</h2>
            <p>
              Update the header logo and the footer columns used across the
              site.
            </p>
            <span className="text-link">
              Edit settings <span className="arrow">→</span>
            </span>
          </Link>
          <Link href="/admin/blog" className="admin-feature-card">
            <p className="eyebrow">Blog</p>
            <h2>Articles</h2>
            <p>Write, edit, and publish posts for the public blog.</p>
            <span className="text-link">
              Manage blog <span className="arrow">→</span>
            </span>
          </Link>
        </div>

        <div className="admin-dashboard-grid" style={{ marginTop: "1.75rem" }}>
          {liveEditSections.map((section) => (
            <section key={section.label} className="admin-panel">
              <h2 className="eyebrow">{section.label}</h2>
              <ul className="admin-link-list">
                {section.pages.map((page) => (
                  <li key={page.href}>
                    <Link href={page.href} className="admin-link-row">
                      <span>
                        <strong>{page.name}</strong>
                        <span className="admin-link-meta">{page.hint}</span>
                      </span>
                      <span>Live edit →</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <section className="admin-panel">
            <div className="admin-panel-header">
              <h2 className="eyebrow">Your pages</h2>
              <Link href="/admin/pages/new" className="btn btn-sm">
                Add
              </Link>
            </div>
            {customPages.length === 0 ? (
              <p className="admin-empty">
                No custom pages yet. Add one to create cards and place it in the
                nav.
              </p>
            ) : (
              <ul className="admin-link-list">
                {customPages.slice(0, 6).map((page) => (
                  <li key={page.slug}>
                    <Link
                      href={`/admin/pages/${page.slug}`}
                      className="admin-link-row"
                    >
                      <span>
                        <strong>{page.title}</strong>
                        <span className="admin-link-meta">
                          /{page.slug} · {page.cards.length} cards
                        </span>
                      </span>
                      <span>Manage →</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </section>
  );
}

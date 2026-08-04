import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";
import { SiteNavEditor } from "@/components/admin/site-nav-editor";
import { listCustomPages } from "@/lib/custom-pages";
import { getSiteNav } from "@/lib/site-nav";

export const dynamic = "force-dynamic";

const systemPages = [
  { name: "Home", href: "/?edit=1", path: "/" },
  { name: "About", href: "/about?edit=1", path: "/about" },
  { name: "Services", href: "/services?edit=1", path: "/services" },
  { name: "Solutions", href: "/solutions?edit=1", path: "/solutions" },
  { name: "Training", href: "/education?edit=1", path: "/education" },
  { name: "Contact", href: "/contact?edit=1", path: "/contact" },
];

export default async function AdminPagesPage() {
  const [pages, nav] = await Promise.all([listCustomPages(), getSiteNav()]);

  return (
    <AdminShell
      title="Pages & navigation"
      description="Create pages with cards, place them as parents or subpages in the header, and edit existing marketing copy live."
      actions={
        <Link className="btn btn-sm" href="/admin/pages/new">
          Add page
        </Link>
      }
    >
      <div className="admin-dashboard-grid">
        <section className="admin-panel">
          <h2 className="eyebrow">Marketing pages</h2>
          <p className="admin-help">
            Open live edit on the built-in pages to change copy in place.
          </p>
          <ul className="admin-link-list">
            {systemPages.map((page) => (
              <li key={page.path}>
                <Link href={page.href} className="admin-link-row">
                  <span>
                    <strong>{page.name}</strong>
                    <span className="admin-link-meta">{page.path}</span>
                  </span>
                  <span>Edit live →</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="admin-panel">
          <div className="admin-panel-header">
            <div>
              <h2 className="eyebrow">Custom pages</h2>
              <p className="admin-help">
                Pages you create here can include cards and appear in the nav.
              </p>
            </div>
            <Link className="btn btn-sm" href="/admin/pages/new">
              Add page
            </Link>
          </div>

          {pages.length === 0 ? (
            <p className="admin-empty">No custom pages yet.</p>
          ) : (
            <ul className="admin-link-list">
              {pages.map((page) => (
                <li key={page.slug}>
                  <Link
                    href={`/admin/pages/${page.slug}`}
                    className="admin-link-row"
                  >
                    <span>
                      <strong>{page.title}</strong>
                      <span className="admin-link-meta">
                        /{page.slug} · {page.status} ·{" "}
                        {page.navPlacement === "parent"
                          ? "parent"
                          : page.navPlacement === "child"
                            ? "subpage"
                            : "hidden"}{" "}
                        · {page.cards.length} card
                        {page.cards.length === 1 ? "" : "s"}
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

      <div style={{ marginTop: "1.5rem" }}>
        <SiteNavEditor initialNav={nav} />
      </div>
    </AdminShell>
  );
}

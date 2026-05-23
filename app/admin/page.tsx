import Link from "next/link";
import { Container } from "@/components/container";
import { AdminLogoutButton } from "@/components/admin-logout-button";

const sections = [
  {
    label: "Site",
    pages: [{ name: "Header logo", href: "/admin/settings" }],
  },
  {
    label: "Marketing",
    pages: [
      { name: "Home", href: "/?edit=1" },
      { name: "About", href: "/about?edit=1" },
    ],
  },
  {
    label: "Services & solutions",
    pages: [
      { name: "Services", href: "/services?edit=1" },
      { name: "Solutions (ASAT)", href: "/solutions?edit=1" },
      { name: "Education & Training", href: "/education?edit=1" },
    ],
  },
  {
    label: "Contact",
    pages: [{ name: "Contact page", href: "/contact?edit=1" }],
  },
  {
    label: "Blog",
    pages: [
      { name: "Blog articles", href: "/admin/blog" },
      { name: "New article", href: "/admin/blog/new" },
    ],
  },
];

export default function AdminPage() {
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
            <h1 style={{ marginTop: "0.5rem" }}>Page editor</h1>
            <p className="lede" style={{ marginTop: "0.75rem", maxWidth: "42rem" }}>
              Open any page with live edit enabled. Click &ldquo;Edit page&rdquo; on
              the toolbar, change copy in place, then save. Changes are stored in
              MongoDB when configured, or fall back to defaults locally.
            </p>
          </div>
          <AdminLogoutButton />
        </div>

        <div
          style={{
            display: "grid",
            gap: "2rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          }}
        >
          {sections.map((section) => (
            <div key={section.label}>
              <h2 className="eyebrow">{section.label}</h2>
              <ul
                style={{
                  marginTop: "0.75rem",
                  listStyle: "none",
                  padding: 0,
                  border: "1px solid var(--line)",
                }}
              >
                {section.pages.map((page) => (
                  <li
                    key={page.href}
                    style={{ borderBottom: "1px solid var(--line)" }}
                  >
                    <Link
                      href={page.href}
                      className="text-link"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "0.85rem 1rem",
                      }}
                    >
                      <span>{page.name}</span>
                      <span>Edit &rarr;</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

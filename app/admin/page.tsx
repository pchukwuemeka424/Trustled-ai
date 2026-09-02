import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminAppFrame } from "@/components/admin/admin-app-frame";
import { getAdminSession } from "@/lib/admin-auth";
import { canManageSite, canManageUsers } from "@/lib/admin-roles";
import { listAdminUsers } from "@/lib/admin-users";
import { formatBlogDate } from "@/lib/blog-schema";
import { listAllBlogPosts } from "@/lib/blog";
import { listCustomPages } from "@/lib/custom-pages";
import { getSiteNav } from "@/lib/site-nav";

export const dynamic = "force-dynamic";

const sitePages = [
  { name: "Home", href: "/?edit=1", hint: "Hero & FAQ" },
  { name: "About", href: "/about?edit=1", hint: "Story & team" },
  { name: "Services", href: "/services?edit=1", hint: "Advisory" },
  { name: "Solutions", href: "/solutions?edit=1", hint: "GARIL & ASAT" },
  { name: "Training", href: "/education?edit=1", hint: "Workshops" },
  { name: "Contact", href: "/contact?edit=1", hint: "Form" },
];

export default async function AdminPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login?next=/admin");
  }

  if (!canManageSite(session.role)) {
    redirect("/admin/blog");
  }

  const showUsers = canManageUsers(session.role);

  const [posts, customPages, navItems, managedUsers] = await Promise.all([
    listAllBlogPosts(),
    listCustomPages(),
    getSiteNav(),
    showUsers ? listAdminUsers().catch(() => []) : Promise.resolve([]),
  ]);

  const publishedCount = posts.filter((post) => post.status === "published").length;
  const draftCount = posts.filter((post) => post.status === "draft").length;
  const editorCount = managedUsers.filter((user) => user.role === "editor").length;
  const adminCount = managedUsers.filter((user) => user.role === "admin").length + 1;
  const recentPosts = posts.slice(0, 6);
  const navLinkCount = navItems.reduce(
    (total, item) => total + 1 + (item.children?.length ?? 0),
    0,
  );

  const metrics = [
    {
      label: "Published",
      value: publishedCount,
      detail: "Live on /blog",
      href: "/admin/blog",
    },
    {
      label: "Drafts",
      value: draftCount,
      detail: "Ready to review",
      href: "/admin/blog",
    },
    {
      label: "Custom pages",
      value: customPages.length,
      detail: "Card-based pages",
      href: "/admin/pages",
    },
    {
      label: "Nav links",
      value: navLinkCount,
      detail: "Header destinations",
      href: "/admin/pages",
    },
    ...(showUsers
      ? [
          {
            label: "Editors",
            value: editorCount,
            detail: "Blog-only access",
            href: "/admin/users",
          },
          {
            label: "Admins",
            value: adminCount,
            detail: "Full CMS access",
            href: "/admin/users",
          },
        ]
      : []),
  ];

  const actions = [
    {
      href: "/admin/blog/new",
      label: "Write article",
      hint: "Start a draft",
    },
    {
      href: "/admin/pages/new",
      label: "Create page",
      hint: "Add cards & route",
    },
    {
      href: "/admin/pages",
      label: "Edit navigation",
      hint: "Reorder header links",
    },
    {
      href: "/admin/settings",
      label: "Update brand",
      hint: "Logo and footer",
    },
    ...(showUsers
      ? [
          {
            href: "/admin/users",
            label: "Manage users",
            hint: "Editors and admins",
          },
        ]
      : []),
    {
      href: "/",
      label: "Preview site",
      hint: "Open the live website",
    },
  ];

  return (
    <AdminAppFrame
      role={session.role}
      username={session.username}
      title="Dashboard"
      description="Manage publishing, website pages, and team access."
      actions={
        <>
          <Link href="/admin/blog/new" className="admin-btn admin-btn--primary">
            New article
          </Link>
          <Link href="/admin/pages/new" className="admin-btn admin-btn--secondary">
            Add page
          </Link>
        </>
      }
    >
      <section
        className="admin-metrics"
        aria-label="Key metrics"
        style={{ ["--admin-metric-count" as string]: metrics.length }}
      >
        {metrics.map((metric) => (
          <Link key={metric.label} href={metric.href} className="admin-metric">
            <span className="admin-metric-label">{metric.label}</span>
            <span className="admin-metric-value">{metric.value}</span>
            <span className="admin-metric-detail">{metric.detail}</span>
          </Link>
        ))}
      </section>

      <section className="admin-card">
        <div className="admin-card-head">
          <div>
            <h2>Quick actions</h2>
            <p>Jump into the work you do most often.</p>
          </div>
        </div>
        <div className="admin-action-grid">
          {actions.map((action) => (
            <Link key={action.href} href={action.href} className="admin-action-tile">
              <strong>{action.label}</strong>
              <span>{action.hint}</span>
            </Link>
          ))}
        </div>
      </section>

      <div className="admin-workspace">
        <section className="admin-card">
          <div className="admin-card-head">
            <div>
              <h2>Publishing</h2>
              <p>Recent articles across drafts and the live blog.</p>
            </div>
            <div className="admin-card-head-actions">
              <Link href="/admin/blog/new" className="admin-btn admin-btn--sm admin-btn--secondary">
                Write
              </Link>
              <Link href="/admin/blog" className="admin-inline-link">
                View all
              </Link>
            </div>
          </div>

          {recentPosts.length === 0 ? (
            <div className="admin-empty-state">
              <strong>No articles yet</strong>
              <p>Publish your first post to start the TrustLed blog.</p>
              <Link href="/admin/blog/new" className="admin-btn admin-btn--primary admin-btn--sm">
                Write first article
              </Link>
            </div>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th aria-label="Edit" />
                  </tr>
                </thead>
                <tbody>
                  {recentPosts.map((post) => (
                    <tr key={post.slug}>
                      <td>
                        <Link
                          href={`/admin/blog/${encodeURIComponent(post.slug)}/edit`}
                          className="admin-table-title"
                        >
                          {post.title}
                        </Link>
                        <span className="admin-table-sub">{post.author}</span>
                      </td>
                      <td className="admin-table-muted">
                        {formatBlogDate(post.publishedAt)}
                      </td>
                      <td>
                        <span className={`admin-badge admin-badge--${post.status}`}>
                          {post.status}
                        </span>
                      </td>
                      <td className="admin-table-action">
                        <Link
                          href={`/admin/blog/${encodeURIComponent(post.slug)}/edit`}
                          className="admin-inline-link"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="admin-card">
          <div className="admin-card-head">
            <div>
              <h2>Website</h2>
              <p>Live-edit marketing pages and manage custom routes.</p>
            </div>
            <Link href="/admin/pages" className="admin-inline-link">
              Manage
            </Link>
          </div>

          <div className="admin-card-body">
            <div className="admin-subsection">
              <div className="admin-subsection-head">
                <h3>Live edit</h3>
                <p>Update copy on core pages.</p>
              </div>
              <div className="admin-chip-grid">
                {sitePages.map((page) => (
                  <Link key={page.href} href={page.href} className="admin-chip">
                    <strong>{page.name}</strong>
                    <span>{page.hint}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="admin-subsection">
              <div className="admin-subsection-head">
                <h3>Custom pages</h3>
                <p>Pages built with cards and added to navigation.</p>
              </div>

              {customPages.length === 0 ? (
                <div className="admin-callout">
                  <div>
                    <strong>No custom pages yet</strong>
                    <p>Create a page, add cards, then place it in the header nav.</p>
                  </div>
                  <Link href="/admin/pages/new" className="admin-btn admin-btn--sm admin-btn--primary">
                    Create page
                  </Link>
                </div>
              ) : (
                <ul className="admin-mini-list">
                  {customPages.slice(0, 5).map((page) => (
                    <li key={page.slug}>
                      <Link href={`/admin/pages/${page.slug}`} className="admin-mini-row">
                        <span>
                          <strong>{page.title}</strong>
                          <span className="admin-mini-meta">
                            /{page.slug} · {page.cards.length} cards
                          </span>
                        </span>
                        <span className="admin-inline-link">Open</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="admin-website-links">
              <Link href="/admin/pages" className="admin-text-link">
                Navigation settings
              </Link>
              <Link href="/admin/settings" className="admin-text-link">
                Brand kit
              </Link>
              <Link href="/blog?edit=1" className="admin-text-link">
                Blog manager
              </Link>
            </div>
          </div>
        </section>
      </div>
    </AdminAppFrame>
  );
}

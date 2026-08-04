"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  createCardId,
  createEmptyCustomPage,
  slugifyPageTitle,
  type CustomPage,
  type NavPlacement,
  type PageCard,
} from "@/lib/custom-pages-schema";
import type { SiteNav } from "@/lib/site-nav-schema";

type CustomPageFormProps = {
  mode: "create" | "edit";
  initialPage?: CustomPage;
  nav: SiteNav;
};

export function CustomPageForm({
  mode,
  initialPage,
  nav,
}: CustomPageFormProps) {
  const router = useRouter();
  const [page, setPage] = useState<CustomPage>(
    initialPage ?? createEmptyCustomPage(),
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const originalSlug = initialPage?.slug ?? "";

  function updateField<K extends keyof CustomPage>(
    field: K,
    value: CustomPage[K],
  ) {
    setPage((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  }

  function updateCard(id: string, patch: Partial<PageCard>) {
    setPage((prev) => ({
      ...prev,
      cards: prev.cards.map((card) =>
        card.id === id ? { ...card, ...patch } : card,
      ),
    }));
    setSaved(false);
  }

  function addCard() {
    setPage((prev) => ({
      ...prev,
      cards: [
        ...prev.cards,
        {
          id: createCardId(),
          title: `Card ${prev.cards.length + 1}`,
          body: "Describe this point.",
        },
      ],
    }));
    setSaved(false);
  }

  function removeCard(id: string) {
    setPage((prev) => ({
      ...prev,
      cards: prev.cards.filter((card) => card.id !== id),
    }));
    setSaved(false);
  }

  function moveCard(id: string, direction: -1 | 1) {
    setPage((prev) => {
      const index = prev.cards.findIndex((card) => card.id === id);
      const nextIndex = index + direction;
      if (index < 0 || nextIndex < 0 || nextIndex >= prev.cards.length) {
        return prev;
      }
      const cards = [...prev.cards];
      const [item] = cards.splice(index, 1);
      cards.splice(nextIndex, 0, item);
      return { ...prev, cards };
    });
    setSaved(false);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setSaved(false);

    try {
      const endpoint =
        mode === "create"
          ? "/api/admin/pages"
          : `/api/admin/pages/${encodeURIComponent(originalSlug)}`;
      const response = await fetch(endpoint, {
        method: mode === "create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(page),
      });

      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
        page?: CustomPage;
      };

      if (!response.ok) {
        throw new Error(data.error ?? "Failed to save page");
      }

      setSaved(true);
      if (mode === "create" && data.page?.slug) {
        router.push(`/admin/pages/${data.page.slug}`);
        router.refresh();
        return;
      }

      if (data.page && data.page.slug !== originalSlug) {
        router.replace(`/admin/pages/${data.page.slug}`);
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!originalSlug) return;
    if (!window.confirm("Delete this page permanently?")) return;

    setSaving(true);
    setError("");
    try {
      const response = await fetch(
        `/api/admin/pages/${encodeURIComponent(originalSlug)}`,
        { method: "DELETE" },
      );
      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(data.error ?? "Failed to delete page");
      }
      router.push("/admin/pages");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
      setSaving(false);
    }
  }

  const parentOptions = nav.filter((item) => item.href !== `/${page.slug}`);

  return (
    <form className="admin-form" onSubmit={(event) => void handleSubmit(event)}>
      <div className="admin-form-grid">
        <section className="admin-panel">
          <h2 className="eyebrow">Page content</h2>
          <label className="site-settings-label" htmlFor="title">
            Page title
          </label>
          <input
            id="title"
            className="hero-bg-edit-input"
            value={page.title}
            onChange={(event) => {
              const title = event.target.value;
              setPage((prev) => ({
                ...prev,
                title,
                heroTitle: prev.heroTitle === prev.title ? title : prev.heroTitle,
                navLabel: prev.navLabel === prev.title ? title : prev.navLabel,
                slug:
                  mode === "create"
                    ? slugifyPageTitle(title)
                    : prev.slug,
              }));
              setSaved(false);
            }}
            required
          />

          <label className="site-settings-label" htmlFor="slug">
            URL slug
          </label>
          <div className="admin-slug-row">
            <span>/</span>
            <input
              id="slug"
              className="hero-bg-edit-input"
              value={page.slug}
              onChange={(event) =>
                updateField("slug", slugifyPageTitle(event.target.value))
              }
              required
            />
          </div>

          <label className="site-settings-label" htmlFor="heroTagline">
            Hero tagline
          </label>
          <input
            id="heroTagline"
            className="hero-bg-edit-input"
            value={page.heroTagline}
            onChange={(event) => updateField("heroTagline", event.target.value)}
          />

          <label className="site-settings-label" htmlFor="heroTitle">
            Hero headline
          </label>
          <input
            id="heroTitle"
            className="hero-bg-edit-input"
            value={page.heroTitle}
            onChange={(event) => updateField("heroTitle", event.target.value)}
          />

          <label className="site-settings-label" htmlFor="heroLede">
            Hero supporting text
          </label>
          <textarea
            id="heroLede"
            className="hero-bg-edit-input"
            rows={4}
            value={page.heroLede}
            onChange={(event) => updateField("heroLede", event.target.value)}
          />
        </section>

        <section className="admin-panel">
          <h2 className="eyebrow">Navigation placement</h2>
          <p className="admin-help">
            Choose whether this page is a top-level parent, a subpage under an
            existing parent, or hidden from the header.
          </p>

          <label className="site-settings-label" htmlFor="navPlacement">
            Position
          </label>
          <select
            id="navPlacement"
            className="hero-bg-edit-input"
            value={page.navPlacement}
            onChange={(event) =>
              updateField("navPlacement", event.target.value as NavPlacement)
            }
          >
            <option value="parent">Parent (top-level menu item)</option>
            <option value="child">Subpage (under a parent)</option>
            <option value="none">Hidden from navigation</option>
          </select>

          {page.navPlacement === "child" ? (
            <>
              <label className="site-settings-label" htmlFor="parentNavId">
                Parent page
              </label>
              <select
                id="parentNavId"
                className="hero-bg-edit-input"
                value={page.parentNavId}
                onChange={(event) =>
                  updateField("parentNavId", event.target.value)
                }
                required
              >
                <option value="">Select a parent…</option>
                {parentOptions.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </>
          ) : null}

          <label className="site-settings-label" htmlFor="navLabel">
            Menu label
          </label>
          <input
            id="navLabel"
            className="hero-bg-edit-input"
            value={page.navLabel}
            onChange={(event) => updateField("navLabel", event.target.value)}
          />

          <label className="site-settings-label" htmlFor="navDescription">
            Dropdown description (optional)
          </label>
          <input
            id="navDescription"
            className="hero-bg-edit-input"
            value={page.navDescription}
            onChange={(event) =>
              updateField("navDescription", event.target.value)
            }
            placeholder="Shown under the label in dropdown menus"
          />

          <label className="site-settings-label" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            className="hero-bg-edit-input"
            value={page.status}
            onChange={(event) =>
              updateField(
                "status",
                event.target.value === "published" ? "published" : "draft",
              )
            }
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </section>
      </div>

      <section className="admin-panel admin-panel--wide">
        <div className="admin-panel-header">
          <div>
            <h2 className="eyebrow">Cards</h2>
            <p className="admin-help">
              Add, reorder, or remove cards shown in the page grid.
            </p>
          </div>
          <button type="button" className="btn btn-sm" onClick={addCard}>
            Add card
          </button>
        </div>

        <label className="site-settings-label" htmlFor="cardsSectionEyebrow">
          Cards section eyebrow
        </label>
        <input
          id="cardsSectionEyebrow"
          className="hero-bg-edit-input"
          value={page.cardsSectionEyebrow}
          onChange={(event) =>
            updateField("cardsSectionEyebrow", event.target.value)
          }
        />

        <label className="site-settings-label" htmlFor="cardsSectionTitle">
          Cards section title
        </label>
        <input
          id="cardsSectionTitle"
          className="hero-bg-edit-input"
          value={page.cardsSectionTitle}
          onChange={(event) =>
            updateField("cardsSectionTitle", event.target.value)
          }
        />

        <div className="admin-card-list">
          {page.cards.length === 0 ? (
            <p className="admin-help">No cards yet. Add one to get started.</p>
          ) : null}
          {page.cards.map((card, index) => (
            <article key={card.id} className="admin-card-editor">
              <div className="admin-card-editor-top">
                <p className="eyebrow">Card {index + 1}</p>
                <div className="admin-card-editor-actions">
                  <button
                    type="button"
                    className="btn btn-sm btn-ghost"
                    onClick={() => moveCard(card.id, -1)}
                    disabled={index === 0}
                  >
                    Up
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-ghost"
                    onClick={() => moveCard(card.id, 1)}
                    disabled={index === page.cards.length - 1}
                  >
                    Down
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-ghost"
                    onClick={() => removeCard(card.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <label
                className="site-settings-label"
                htmlFor={`${card.id}-title`}
              >
                Title
              </label>
              <input
                id={`${card.id}-title`}
                className="hero-bg-edit-input"
                value={card.title}
                onChange={(event) =>
                  updateCard(card.id, { title: event.target.value })
                }
              />
              <label className="site-settings-label" htmlFor={`${card.id}-body`}>
                Body
              </label>
              <textarea
                id={`${card.id}-body`}
                className="hero-bg-edit-input"
                rows={3}
                value={card.body}
                onChange={(event) =>
                  updateCard(card.id, { body: event.target.value })
                }
              />
            </article>
          ))}
        </div>
      </section>

      <section className="admin-panel admin-panel--wide">
        <h2 className="eyebrow">Call to action</h2>
        <label className="site-settings-label" htmlFor="ctaTitle">
          CTA title
        </label>
        <input
          id="ctaTitle"
          className="hero-bg-edit-input"
          value={page.ctaTitle}
          onChange={(event) => updateField("ctaTitle", event.target.value)}
        />
        <label className="site-settings-label" htmlFor="ctaDescription">
          CTA description
        </label>
        <textarea
          id="ctaDescription"
          className="hero-bg-edit-input"
          rows={3}
          value={page.ctaDescription}
          onChange={(event) =>
            updateField("ctaDescription", event.target.value)
          }
        />
        <label className="site-settings-label" htmlFor="ctaButton">
          CTA button label
        </label>
        <input
          id="ctaButton"
          className="hero-bg-edit-input"
          value={page.ctaButton}
          onChange={(event) => updateField("ctaButton", event.target.value)}
        />
      </section>

      {error ? (
        <p className="hero-bg-edit-error" role="alert">
          {error}
        </p>
      ) : null}
      {saved ? (
        <p className="site-settings-saved" role="status">
          Page saved.
          {page.status === "published" ? (
            <>
              {" "}
              <Link href={`/${page.slug}`} className="text-link">
                View page
              </Link>
            </>
          ) : null}
        </p>
      ) : null}

      <div className="admin-form-footer">
        <button type="submit" className="btn" disabled={saving}>
          {saving ? "Saving…" : mode === "create" ? "Create page" : "Save page"}
        </button>
        {mode === "edit" ? (
          <button
            type="button"
            className="btn btn-ghost"
            disabled={saving}
            onClick={() => void handleDelete()}
          >
            Delete page
          </button>
        ) : null}
      </div>
    </form>
  );
}

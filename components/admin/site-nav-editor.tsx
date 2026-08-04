"use client";

import Link from "next/link";
import { useState } from "react";
import {
  createNavId,
  type SiteNav,
  type SiteNavChild,
  type SiteNavItem,
} from "@/lib/site-nav-schema";

type SiteNavEditorProps = {
  initialNav: SiteNav;
};

export function SiteNavEditor({ initialNav }: SiteNavEditorProps) {
  const [nav, setNav] = useState<SiteNav>(initialNav);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  function updateItem(id: string, patch: Partial<SiteNavItem>) {
    setNav((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    );
    setSaved(false);
  }

  function updateChild(
    parentId: string,
    childId: string,
    patch: Partial<SiteNavChild>,
  ) {
    setNav((prev) =>
      prev.map((item) => {
        if (item.id !== parentId) return item;
        return {
          ...item,
          children: item.children?.map((child) =>
            child.id === childId ? { ...child, ...patch } : child,
          ),
        };
      }),
    );
    setSaved(false);
  }

  function addParent() {
    setNav((prev) => [
      ...prev,
      {
        id: createNavId("item"),
        href: "/",
        label: "New parent",
        children: [],
      },
    ]);
    setSaved(false);
  }

  function addChild(parentId: string) {
    setNav((prev) =>
      prev.map((item) => {
        if (item.id !== parentId) return item;
        return {
          ...item,
          children: [
            ...(item.children ?? []),
            {
              id: createNavId("child"),
              href: item.href,
              label: "New subpage",
            },
          ],
        };
      }),
    );
    setSaved(false);
  }

  function removeParent(id: string) {
    setNav((prev) => prev.filter((item) => item.id !== id));
    setSaved(false);
  }

  function removeChild(parentId: string, childId: string) {
    setNav((prev) =>
      prev.map((item) => {
        if (item.id !== parentId) return item;
        return {
          ...item,
          children: item.children?.filter((child) => child.id !== childId),
        };
      }),
    );
    setSaved(false);
  }

  function moveParent(id: string, direction: -1 | 1) {
    setNav((prev) => {
      const index = prev.findIndex((item) => item.id === id);
      const nextIndex = index + direction;
      if (index < 0 || nextIndex < 0 || nextIndex >= prev.length) return prev;
      const next = [...prev];
      const [item] = next.splice(index, 1);
      next.splice(nextIndex, 0, item);
      return next;
    });
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    setError("");
    setSaved(false);
    try {
      const response = await fetch("/api/admin/nav", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nav }),
      });
      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
        nav?: SiteNav;
      };
      if (!response.ok) {
        throw new Error(data.error ?? "Failed to save navigation");
      }
      if (data.nav) setNav(data.nav);
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="admin-panel admin-panel--wide">
      <div className="admin-panel-header">
        <div>
          <h2 className="eyebrow">Header navigation</h2>
          <p className="admin-help">
            Reorder parents, add subpages, or adjust labels and URLs. Contact
            stays as the header CTA.
          </p>
        </div>
        <button type="button" className="btn btn-sm" onClick={addParent}>
          Add parent
        </button>
      </div>

      <div className="admin-nav-list">
        {nav.map((item, index) => (
          <article key={item.id} className="admin-nav-item">
            <div className="admin-nav-item-top">
              <p className="eyebrow">Parent {index + 1}</p>
              <div className="admin-card-editor-actions">
                <button
                  type="button"
                  className="btn btn-sm btn-ghost"
                  onClick={() => moveParent(item.id, -1)}
                  disabled={index === 0}
                >
                  Up
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-ghost"
                  onClick={() => moveParent(item.id, 1)}
                  disabled={index === nav.length - 1}
                >
                  Down
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-ghost"
                  onClick={() => addChild(item.id)}
                >
                  Add subpage
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-ghost"
                  onClick={() => removeParent(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>

            <div className="admin-nav-fields">
              <div>
                <label className="site-settings-label" htmlFor={`${item.id}-label`}>
                  Label
                </label>
                <input
                  id={`${item.id}-label`}
                  className="hero-bg-edit-input"
                  value={item.label}
                  onChange={(event) =>
                    updateItem(item.id, { label: event.target.value })
                  }
                />
              </div>
              <div>
                <label className="site-settings-label" htmlFor={`${item.id}-href`}>
                  URL
                </label>
                <input
                  id={`${item.id}-href`}
                  className="hero-bg-edit-input"
                  value={item.href}
                  onChange={(event) =>
                    updateItem(item.id, { href: event.target.value })
                  }
                />
              </div>
            </div>

            {(item.children ?? []).map((child) => (
              <div key={child.id} className="admin-nav-child">
                <div className="admin-nav-fields">
                  <div>
                    <label
                      className="site-settings-label"
                      htmlFor={`${child.id}-label`}
                    >
                      Subpage label
                    </label>
                    <input
                      id={`${child.id}-label`}
                      className="hero-bg-edit-input"
                      value={child.label}
                      onChange={(event) =>
                        updateChild(item.id, child.id, {
                          label: event.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label
                      className="site-settings-label"
                      htmlFor={`${child.id}-href`}
                    >
                      Subpage URL
                    </label>
                    <input
                      id={`${child.id}-href`}
                      className="hero-bg-edit-input"
                      value={child.href}
                      onChange={(event) =>
                        updateChild(item.id, child.id, {
                          href: event.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <label
                  className="site-settings-label"
                  htmlFor={`${child.id}-desc`}
                >
                  Description
                </label>
                <input
                  id={`${child.id}-desc`}
                  className="hero-bg-edit-input"
                  value={child.description ?? ""}
                  onChange={(event) =>
                    updateChild(item.id, child.id, {
                      description: event.target.value,
                    })
                  }
                />
                <button
                  type="button"
                  className="btn btn-sm btn-ghost"
                  style={{ marginTop: "0.75rem" }}
                  onClick={() => removeChild(item.id, child.id)}
                >
                  Remove subpage
                </button>
              </div>
            ))}
          </article>
        ))}
      </div>

      {error ? (
        <p className="hero-bg-edit-error" role="alert">
          {error}
        </p>
      ) : null}
      {saved ? (
        <p className="site-settings-saved" role="status">
          Navigation saved. Refresh the site to see header updates.
        </p>
      ) : null}

      <div className="admin-form-footer">
        <button
          type="button"
          className="btn"
          disabled={saving}
          onClick={() => void handleSave()}
        >
          {saving ? "Saving…" : "Save navigation"}
        </button>
        <Link href="/" className="text-link">
          Preview site
        </Link>
      </div>
    </div>
  );
}

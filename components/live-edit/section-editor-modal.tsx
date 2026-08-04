"use client";

import { useEffect, useId, useState } from "react";
import {
  plainTextToEditorHtml,
  RichTextEditor,
} from "@/components/admin/rich-text-editor";

export type SectionEditorField = {
  key: string;
  label: string;
  kind?: "text" | "html" | "multiline" | "lines";
  placeholder?: string;
};

type SectionEditorModalProps = {
  open: boolean;
  title: string;
  fields: SectionEditorField[];
  values: Record<string, string>;
  onClose: () => void;
  onApply: (next: Record<string, string>) => void;
};

export function SectionEditorModal({
  open,
  title,
  fields,
  values,
  onClose,
  onApply,
}: SectionEditorModalProps) {
  const titleId = useId();
  const [draft, setDraft] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!open) return;
    const next: Record<string, string> = {};
    for (const field of fields) {
      const raw = values[field.key] ?? "";
      next[field.key] =
        field.kind === "html" || field.kind === "multiline"
          ? plainTextToEditorHtml(raw)
          : raw;
    }
    setDraft(next);
  }, [open, fields, values]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="section-editor-backdrop"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="section-editor-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <header className="section-editor-header">
          <div>
            <p className="eyebrow">Edit section</p>
            <h2 id={titleId}>{title}</h2>
          </div>
          <button
            type="button"
            className="btn btn-sm btn-ghost"
            onClick={onClose}
          >
            Close
          </button>
        </header>

        <div className="section-editor-body">
          {fields.map((field) => {
            const kind = field.kind ?? "text";
            return (
              <div key={field.key} className="section-editor-field">
                <label
                  className="site-settings-label"
                  htmlFor={`section-field-${field.key}`}
                >
                  {field.label}
                </label>
                {kind === "html" || kind === "multiline" ? (
                  <RichTextEditor
                    value={draft[field.key] ?? ""}
                    onChange={(html) =>
                      setDraft((prev) => ({ ...prev, [field.key]: html }))
                    }
                    placeholder={field.placeholder ?? `Edit ${field.label}`}
                    minHeight={kind === "html" ? 240 : 160}
                  />
                ) : kind === "lines" ? (
                  <textarea
                    id={`section-field-${field.key}`}
                    className="hero-bg-edit-input"
                    rows={8}
                    value={draft[field.key] ?? ""}
                    onChange={(event) =>
                      setDraft((prev) => ({
                        ...prev,
                        [field.key]: event.target.value,
                      }))
                    }
                    placeholder={
                      field.placeholder ?? "One item per line"
                    }
                  />
                ) : (
                  <input
                    id={`section-field-${field.key}`}
                    className="hero-bg-edit-input"
                    value={draft[field.key] ?? ""}
                    onChange={(event) =>
                      setDraft((prev) => ({
                        ...prev,
                        [field.key]: event.target.value,
                      }))
                    }
                    placeholder={field.placeholder}
                  />
                )}
              </div>
            );
          })}
        </div>

        <footer className="section-editor-footer">
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => {
              onApply(draft);
              onClose();
            }}
          >
            Apply changes
          </button>
        </footer>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  SectionEditorModal,
  type SectionEditorField,
} from "@/components/live-edit/section-editor-modal";
import { useOptionalLiveEdit } from "@/components/live-edit/live-edit-context";

function splitBulletLabel(item: string) {
  const separators = [" – ", " — ", " - "];
  for (const separator of separators) {
    const index = item.indexOf(separator);
    if (index > 0) {
      return {
        label: item.slice(0, index),
        detail: item.slice(index + separator.length),
      };
    }
  }
  return { label: item, detail: "" };
}

function toPlainLines(value: string) {
  if (!/<\/?[a-z][\s\S]*>/i.test(value)) return value;
  return value
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|li|h[1-6])>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

type EditableBulletListProps = {
  field: string;
  defaultValue: string;
  className?: string;
  splitLabels?: boolean;
  label?: string;
};

export function EditableBulletList({
  field,
  defaultValue,
  className = "content-bullets",
  splitLabels = true,
  label = "Bullet list",
}: EditableBulletListProps) {
  const liveEdit = useOptionalLiveEdit();
  const isAdmin = Boolean(liveEdit?.isAdmin);
  const text = toPlainLines(liveEdit?.values[field] ?? defaultValue);
  const [open, setOpen] = useState(false);

  const fieldDef: SectionEditorField = {
    key: field,
    label,
    kind: "lines",
    placeholder: "One bullet point per line",
  };

  const items = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <>
      <div className="editable-text-wrap">
        {items.length ? (
          <ul className={className}>
            {items.map((item) => {
              if (!splitLabels) {
                return (
                  <li key={item}>
                    <span>{item}</span>
                  </li>
                );
              }

              const { label: itemLabel, detail } = splitBulletLabel(item);
              return (
                <li key={item}>
                  {detail ? (
                    <>
                      <strong>{itemLabel}</strong>
                      <span>{detail}</span>
                    </>
                  ) : (
                    <span>{itemLabel}</span>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="admin-help">No list items yet.</p>
        )}
        {isAdmin ? (
          <button
            type="button"
            className="editable-field-edit-btn"
            onClick={() => {
              if (!liveEdit?.isEditing) liveEdit?.startEdit();
              setOpen(true);
            }}
          >
            Edit
          </button>
        ) : null}
      </div>

      {isAdmin ? (
        <SectionEditorModal
          open={open}
          title={label}
          fields={[fieldDef]}
          values={{ [field]: text }}
          onClose={() => setOpen(false)}
          onApply={(next) => {
            liveEdit?.setField(field, toPlainLines(next[field] ?? ""));
          }}
        />
      ) : null}
    </>
  );
}

"use client";

import {
  useMemo,
  useState,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { SectionColumns } from "@/components/live-edit/section-columns";
import {
  SectionEditorModal,
  type SectionEditorField,
} from "@/components/live-edit/section-editor-modal";
import { useOptionalLiveEdit } from "@/components/live-edit/live-edit-context";
import {
  createEmptyColumnBlock,
  parseSectionLayouts,
  SECTION_LAYOUTS_KEY,
  sectionKeyFromTitle,
  stringifySectionLayouts,
  type ColumnCount,
} from "@/lib/section-layouts";

type EditableSectionProps = {
  title: string;
  fields: SectionEditorField[];
  children: ReactNode;
  sectionKey?: string;
  as?: ElementType;
  className?: string;
  id?: string;
} & Omit<HTMLAttributes<HTMLElement>, "title" | "children" | "className" | "id">;

export function EditableSection({
  title,
  fields,
  children,
  sectionKey,
  as: Tag = "section",
  className,
  id,
  ...rest
}: EditableSectionProps) {
  const liveEdit = useOptionalLiveEdit();
  const [open, setOpen] = useState(false);
  const [columnPickerOpen, setColumnPickerOpen] = useState(false);
  const showEditUi = Boolean(liveEdit?.isAdmin);
  const resolvedKey = sectionKey || sectionKeyFromTitle(title);

  const layouts = useMemo(
    () => parseSectionLayouts(liveEdit?.values[SECTION_LAYOUTS_KEY] ?? "{}"),
    [liveEdit?.values],
  );

  function openEditor() {
    if (!liveEdit) return;
    if (!liveEdit.isEditing) liveEdit.startEdit();
    setOpen(true);
  }

  function applyChanges(next: Record<string, string>) {
    if (!liveEdit) return;
    for (const field of fields) {
      if (Object.prototype.hasOwnProperty.call(next, field.key)) {
        liveEdit.setField(field.key, next[field.key] ?? "");
      }
    }
  }

  function addColumnsToSection(count: ColumnCount) {
    if (!liveEdit) return;
    if (!liveEdit.isEditing) liveEdit.startEdit();
    const blocks = layouts[resolvedKey] ?? [];
    liveEdit.setField(
      SECTION_LAYOUTS_KEY,
      stringifySectionLayouts({
        ...layouts,
        [resolvedKey]: [...blocks, createEmptyColumnBlock(count)],
      }),
    );
    setColumnPickerOpen(false);
  }

  return (
    <>
      <Tag
        id={id}
        className={["editable-section", className].filter(Boolean).join(" ")}
        data-section-key={resolvedKey}
        {...rest}
      >
        {showEditUi ? (
          <div className="editable-section-bar">
            <span className="editable-section-label">{title}</span>
            <div className="editable-section-bar-actions">
              <button
                type="button"
                className="editable-section-edit-btn"
                onClick={openEditor}
              >
                Edit
              </button>
              <button
                type="button"
                className="editable-section-edit-btn editable-section-edit-btn--ghost"
                onClick={() => {
                  if (!liveEdit?.isEditing) liveEdit?.startEdit();
                  setColumnPickerOpen((openPicker) => !openPicker);
                }}
              >
                Insert column
              </button>
            </div>
          </div>
        ) : null}

        {showEditUi && columnPickerOpen ? (
          <div className="wrap section-columns-host section-columns-host--picker">
            <div
              className="section-columns-picker"
              role="group"
              aria-label="Add columns"
            >
              <p className="section-columns-picker-label">
                Insert column layout into this section
              </p>
              <div className="section-columns-picker-options">
                {([1, 2, 3, 4] as const).map((count) => (
                  <button
                    key={count}
                    type="button"
                    className="section-columns-picker-btn"
                    onClick={() => addColumnsToSection(count)}
                  >
                    <span className="section-columns-picker-preview" aria-hidden>
                      {Array.from({ length: count }).map((_, index) => (
                        <span key={index} />
                      ))}
                    </span>
                    <strong>{count}</strong>
                    <span>{count === 1 ? "column" : "columns"}</span>
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="btn btn-sm btn-ghost"
                onClick={() => setColumnPickerOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : null}

        {children}
        <SectionColumns sectionKey={resolvedKey} />
      </Tag>

      {showEditUi ? (
        <SectionEditorModal
          open={open}
          title={title}
          fields={fields}
          values={liveEdit?.values ?? {}}
          onClose={() => setOpen(false)}
          onApply={applyChanges}
        />
      ) : null}
    </>
  );
}

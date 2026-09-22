"use client";

import { useMemo, useState } from "react";
import { SectionColumns } from "@/components/live-edit/section-columns";
import { SectionEditorModal } from "@/components/live-edit/section-editor-modal";
import { useOptionalLiveEdit } from "@/components/live-edit/live-edit-context";
import {
  createEmptyExtraSection,
  EXTRA_SECTIONS_KEY,
  HIDDEN_SECTIONS_KEY,
  parseExtraSections,
  parseHiddenSections,
  stringifyExtraSections,
  stringifyHiddenSections,
  type ExtraSection,
} from "@/lib/page-sections";
import {
  createEmptyColumnBlock,
  parseSectionLayouts,
  SECTION_LAYOUTS_KEY,
  stringifySectionLayouts,
  type ColumnCount,
} from "@/lib/section-layouts";

export function useHiddenSections() {
  const liveEdit = useOptionalLiveEdit();
  const hidden = useMemo(
    () => parseHiddenSections(liveEdit?.values[HIDDEN_SECTIONS_KEY]),
    [liveEdit?.values],
  );

  function setHidden(next: string[]) {
    if (!liveEdit) return;
    if (!liveEdit.isEditing) liveEdit.startEdit();
    liveEdit.setField(HIDDEN_SECTIONS_KEY, stringifyHiddenSections(next));
  }

  return { liveEdit, hidden, setHidden };
}

export function useExtras() {
  const liveEdit = useOptionalLiveEdit();
  const extras = useMemo(
    () => parseExtraSections(liveEdit?.values[EXTRA_SECTIONS_KEY]),
    [liveEdit?.values],
  );

  function ensureEdit() {
    if (!liveEdit) return false;
    if (!liveEdit.isEditing) liveEdit.startEdit();
    return true;
  }

  function setExtras(next: ExtraSection[]) {
    if (!liveEdit || !ensureEdit()) return;
    liveEdit.setField(EXTRA_SECTIONS_KEY, stringifyExtraSections(next));
  }

  return { liveEdit, extras, setExtras, ensureEdit };
}

export function insertExtraAfter(
  extras: ExtraSection[],
  afterKey: string,
): ExtraSection[] {
  const next = [...extras];
  let lastMatch = -1;
  for (let i = 0; i < next.length; i += 1) {
    if (next[i].afterKey === afterKey) lastMatch = i;
  }
  const at = lastMatch >= 0 ? lastMatch + 1 : next.length;
  next.splice(at, 0, createEmptyExtraSection(afterKey));
  return next;
}

function ExtraSectionBlock({
  section,
  extras,
  setExtras,
}: {
  section: ExtraSection;
  extras: ExtraSection[];
  setExtras: (next: ExtraSection[]) => void;
}) {
  const liveEdit = useOptionalLiveEdit();
  const showEditUi = Boolean(liveEdit?.isAdmin);
  const [open, setOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [columnPickerOpen, setColumnPickerOpen] = useState(false);

  const layouts = useMemo(
    () => parseSectionLayouts(liveEdit?.values[SECTION_LAYOUTS_KEY] ?? "{}"),
    [liveEdit?.values],
  );

  const titleField = `${section.id}__title`;
  const bodyField = `${section.id}__body`;

  function addColumns(count: ColumnCount) {
    if (!liveEdit) return;
    if (!liveEdit.isEditing) liveEdit.startEdit();
    const blocks = layouts[section.id] ?? [];
    liveEdit.setField(
      SECTION_LAYOUTS_KEY,
      stringifySectionLayouts({
        ...layouts,
        [section.id]: [...blocks, createEmptyColumnBlock(count)],
      }),
    );
    setColumnPickerOpen(false);
  }

  function handleDelete() {
    if (!confirmDelete) {
      setConfirmDelete(true);
      window.setTimeout(() => setConfirmDelete(false), 4000);
      return;
    }
    setExtras(extras.filter((item) => item.id !== section.id));
  }

  if (!showEditUi) {
    return (
      <section
        className="section-paper extra-page-section"
        data-section-key={section.id}
      >
        <div className="wrap">
          <div className="section-head">
            <h2>{section.title}</h2>
          </div>
          <div
            className="lede rich-content"
            dangerouslySetInnerHTML={{ __html: section.bodyHtml }}
          />
        </div>
        <SectionColumns sectionKey={section.id} />
      </section>
    );
  }

  return (
    <>
      <section
        className="editable-section section-paper extra-page-section"
        data-section-key={section.id}
      >
        <div className="editable-section-bar">
          <span className="editable-section-label">{section.title}</span>
          <div className="editable-section-bar-actions">
            <button
              type="button"
              className="editable-section-edit-btn"
              onClick={() => {
                if (!liveEdit?.isEditing) liveEdit?.startEdit();
                setOpen(true);
              }}
            >
              Edit
            </button>
            <button
              type="button"
              className="editable-section-edit-btn editable-section-edit-btn--ghost"
              onClick={() => {
                if (!liveEdit?.isEditing) liveEdit?.startEdit();
                setColumnPickerOpen((value) => !value);
              }}
            >
              Insert column
            </button>
            <button
              type="button"
              className="editable-section-edit-btn editable-section-edit-btn--ghost"
              onClick={() => {
                if (!liveEdit?.isEditing) liveEdit?.startEdit();
                setExtras(insertExtraAfter(extras, section.afterKey));
              }}
            >
              Add section
            </button>
            <button
              type="button"
              className="editable-section-edit-btn editable-section-edit-btn--danger"
              onClick={handleDelete}
            >
              {confirmDelete ? "Confirm delete" : "Delete"}
            </button>
          </div>
        </div>

        {columnPickerOpen ? (
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
                    onClick={() => addColumns(count)}
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

        <div className="wrap">
          <div className="section-head">
            <h2>{section.title}</h2>
          </div>
          <div
            className="lede rich-content"
            dangerouslySetInnerHTML={{ __html: section.bodyHtml }}
          />
        </div>
        <SectionColumns sectionKey={section.id} />
      </section>

      <SectionEditorModal
        open={open}
        title={section.title}
        fields={[
          { key: titleField, label: "Title", kind: "text" },
          { key: bodyField, label: "Body", kind: "html" },
        ]}
        values={{
          [titleField]: section.title,
          [bodyField]: section.bodyHtml,
        }}
        onClose={() => setOpen(false)}
        onApply={(next) => {
          setExtras(
            extras.map((item) =>
              item.id === section.id
                ? {
                    ...item,
                    title: next[titleField]?.trim() || "New section",
                    bodyHtml: next[bodyField] || "<p></p>",
                  }
                : item,
            ),
          );
        }}
      />
    </>
  );
}

export function ExtraSectionsAfter({ afterKey }: { afterKey: string }) {
  const { liveEdit, extras, setExtras } = useExtras();
  if (!liveEdit && !extras.length) return null;

  const matching = extras.filter((section) => section.afterKey === afterKey);
  if (!matching.length) return null;

  return (
    <>
      {matching.map((section) => (
        <ExtraSectionBlock
          key={section.id}
          section={section}
          extras={extras}
          setExtras={setExtras}
        />
      ))}
    </>
  );
}

export function PageSectionsHost() {
  const { liveEdit, extras, setExtras, ensureEdit } = useExtras();
  const { hidden, setHidden } = useHiddenSections();
  const [adding, setAdding] = useState(false);

  const endExtras = extras.filter((section) => !section.afterKey);

  if (!liveEdit?.isAdmin) {
    if (!endExtras.length) return null;
    return (
      <>
        {endExtras.map((section) => (
          <ExtraSectionBlock
            key={section.id}
            section={section}
            extras={extras}
            setExtras={setExtras}
          />
        ))}
      </>
    );
  }

  return (
    <>
      {endExtras.map((section) => (
        <ExtraSectionBlock
          key={section.id}
          section={section}
          extras={extras}
          setExtras={setExtras}
        />
      ))}

      <div className="wrap page-sections-host">
        {hidden.length ? (
          <div className="page-sections-hidden">
            <p className="page-sections-host-label">Hidden sections</p>
            <ul className="page-sections-hidden-list">
              {hidden.map((key) => (
                <li key={key}>
                  <span>{key}</span>
                  <button
                    type="button"
                    className="btn btn-sm"
                    onClick={() => {
                      setHidden(hidden.filter((item) => item !== key));
                    }}
                  >
                    Restore
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {adding ? (
          <div
            className="page-sections-add-panel"
            role="group"
            aria-label="Add section"
          >
            <p className="page-sections-host-label">Add a new section</p>
            <p className="page-sections-host-help">
              Creates a titled content block you can edit, then save with the page.
            </p>
            <div className="page-sections-add-actions">
              <button
                type="button"
                className="btn"
                onClick={() => {
                  ensureEdit();
                  setExtras([...extras, createEmptyExtraSection("")]);
                  setAdding(false);
                }}
              >
                Add content section
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setAdding(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            className="page-sections-add-btn"
            onClick={() => {
              ensureEdit();
              setAdding(true);
            }}
          >
            Add section
          </button>
        )}
      </div>
    </>
  );
}

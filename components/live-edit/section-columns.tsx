"use client";

import { useMemo, useState } from "react";
import { SectionEditorModal } from "@/components/live-edit/section-editor-modal";
import { useOptionalLiveEdit } from "@/components/live-edit/live-edit-context";
import {
  createEmptyColumnBlock,
  isColumnCount,
  parseSectionLayouts,
  SECTION_LAYOUTS_KEY,
  stringifySectionLayouts,
  type ColumnCount,
  type SectionColumnBlock,
  type SectionLayouts,
} from "@/lib/section-layouts";

type SectionColumnsProps = {
  sectionKey: string;
};

function looksLikeHtml(value: string) {
  return /<\/?[a-z][\s\S]*>/i.test(value.trim());
}

function ensureEditMode(
  liveEdit: ReturnType<typeof useOptionalLiveEdit>,
) {
  if (!liveEdit) return false;
  if (!liveEdit.isEditing) liveEdit.startEdit();
  return true;
}

export function SectionColumns({ sectionKey }: SectionColumnsProps) {
  const liveEdit = useOptionalLiveEdit();
  const isAdmin = Boolean(liveEdit?.isAdmin);
  const raw = liveEdit?.values[SECTION_LAYOUTS_KEY] ?? "{}";
  const layouts = useMemo(() => parseSectionLayouts(raw), [raw]);
  const blocks = layouts[sectionKey] ?? [];

  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerTarget, setPickerTarget] = useState<"section" | string>(
    "section",
  );
  const [editing, setEditing] = useState<{
    blockId: string;
    cellIndex: number;
  } | null>(null);

  function readLayouts(): SectionLayouts {
    return parseSectionLayouts(
      liveEdit?.values[SECTION_LAYOUTS_KEY] ?? "{}",
    );
  }

  function writeLayouts(next: SectionLayouts) {
    liveEdit?.setField(SECTION_LAYOUTS_KEY, stringifySectionLayouts(next));
  }

  function updateBlocks(nextBlocks: SectionColumnBlock[]) {
    const current = readLayouts();
    writeLayouts({
      ...current,
      [sectionKey]: nextBlocks,
    });
  }

  function currentBlocks() {
    return readLayouts()[sectionKey] ?? [];
  }

  function addNewRow(count: ColumnCount) {
    if (!ensureEditMode(liveEdit)) return;
    const next = [...currentBlocks(), createEmptyColumnBlock(count)];
    updateBlocks(next);
    const created = next[next.length - 1];
    setEditing({ blockId: created.id, cellIndex: 0 });
    setPickerOpen(false);
    setPickerTarget("section");
  }

  /** Insert one column in the same row, optionally after a given cell. */
  function addColumnInRow(blockId: string, afterIndex?: number) {
    if (!ensureEditMode(liveEdit)) return;

    let newCellIndex = -1;
    const nextBlocks = currentBlocks().map((block) => {
      if (block.id !== blockId) return block;
      if (block.columns >= 4) return block;

      const insertAt =
        typeof afterIndex === "number" ? afterIndex + 1 : block.cells.length;
      const cells = [...block.cells];
      cells.splice(insertAt, 0, "<p></p>");
      newCellIndex = insertAt;

      return {
        ...block,
        columns: cells.length as ColumnCount,
        cells,
      };
    });

    if (newCellIndex < 0) return;

    updateBlocks(nextBlocks);
    setEditing({ blockId, cellIndex: newCellIndex });
  }

  function insertColumnsIntoBlock(blockId: string, count: ColumnCount) {
    if (!ensureEditMode(liveEdit)) return;
    let firstNewIndex = -1;
    const nextBlocks = currentBlocks().map((block) => {
      if (block.id !== blockId) return block;
      const cells = [...block.cells];
      const started = cells.length;
      while (cells.length < count) cells.push("<p></p>");
      if (count > started) firstNewIndex = started;
      return {
        ...block,
        columns: count,
        cells: cells.slice(0, count),
      };
    });
    updateBlocks(nextBlocks);
    if (firstNewIndex >= 0) {
      setEditing({ blockId, cellIndex: firstNewIndex });
    }
    setPickerOpen(false);
    setPickerTarget("section");
  }

  function removeBlock(blockId: string) {
    if (!ensureEditMode(liveEdit)) return;
    updateBlocks(currentBlocks().filter((block) => block.id !== blockId));
    setEditing((current) =>
      current?.blockId === blockId ? null : current,
    );
  }

  function removeColumn(blockId: string, cellIndex: number) {
    if (!ensureEditMode(liveEdit)) return;
    updateBlocks(
      currentBlocks()
        .map((block) => {
          if (block.id !== blockId) return block;
          if (block.columns <= 1) return null;
          const cells = block.cells.filter((_, index) => index !== cellIndex);
          const nextCount = cells.length as ColumnCount;
          if (!isColumnCount(nextCount)) return null;
          return {
            ...block,
            columns: nextCount,
            cells,
          };
        })
        .filter((block): block is SectionColumnBlock => Boolean(block)),
    );
    setEditing((current) => {
      if (!current || current.blockId !== blockId) return current;
      if (current.cellIndex === cellIndex) return null;
      if (current.cellIndex > cellIndex) {
        return { ...current, cellIndex: current.cellIndex - 1 };
      }
      return current;
    });
  }

  function changeColumns(blockId: string, columns: ColumnCount) {
    if (!ensureEditMode(liveEdit)) return;
    let firstNewIndex = -1;
    const nextBlocks = currentBlocks().map((block) => {
      if (block.id !== blockId) return block;
      const cells = [...block.cells];
      const started = cells.length;
      while (cells.length < columns) cells.push("<p></p>");
      if (columns > started) firstNewIndex = started;
      return {
        ...block,
        columns,
        cells: cells.slice(0, columns),
      };
    });
    updateBlocks(nextBlocks);
    if (firstNewIndex >= 0) {
      setEditing({ blockId, cellIndex: firstNewIndex });
    }
  }

  function setCellHtml(blockId: string, cellIndex: number, html: string) {
    updateBlocks(
      currentBlocks().map((block) => {
        if (block.id !== blockId) return block;
        const cells = [...block.cells];
        cells[cellIndex] = html;
        return { ...block, cells };
      }),
    );
  }

  function openPicker(target: "section" | string) {
    if (!ensureEditMode(liveEdit)) return;
    setPickerTarget(target);
    setPickerOpen(true);
  }

  const editingBlock = editing
    ? blocks.find((block) => block.id === editing.blockId)
    : null;
  const editingHtml =
    editing && editingBlock
      ? (editingBlock.cells[editing.cellIndex] ?? "")
      : "";

  if (!blocks.length && !isAdmin) return null;

  return (
    <div className="wrap section-columns-host">
      <div className="section-columns-wrap">
        {blocks.map((block) => {
          const canAddInRow = isAdmin && block.columns < 4;
          return (
            <div key={block.id} className="section-columns-block">
              {isAdmin ? (
                <div className="section-columns-toolbar">
                  <span className="section-columns-toolbar-label">
                    {block.columns}-column row
                  </span>
                  <div className="section-columns-toolbar-actions">
                    {([1, 2, 3, 4] as const).map((count) => (
                      <button
                        key={count}
                        type="button"
                        className={`section-columns-count-btn${
                          block.columns === count ? " is-active" : ""
                        }`}
                        onClick={() => changeColumns(block.id, count)}
                        aria-label={`Set to ${count} columns`}
                      >
                        {count}
                      </button>
                    ))}
                    <button
                      type="button"
                      className="btn btn-sm"
                      disabled={!canAddInRow}
                      onClick={() => addColumnInRow(block.id)}
                    >
                      Insert column
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-ghost"
                      onClick={() => openPicker(block.id)}
                    >
                      Set columns…
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-ghost"
                      onClick={() => removeBlock(block.id)}
                    >
                      Remove row
                    </button>
                  </div>
                </div>
              ) : null}

              <div
                className={[
                  "section-columns-grid",
                  `section-columns-grid--${block.columns}`,
                  canAddInRow ? "section-columns-grid--with-add" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {block.cells.map((cell, index) => (
                  <div
                    key={`${block.id}-${index}`}
                    className="section-columns-cell"
                  >
                    {isAdmin ? (
                      <div className="section-columns-cell-actions">
                        <button
                          type="button"
                          className="editable-field-edit-btn section-columns-cell-edit"
                          onClick={() => {
                            if (!ensureEditMode(liveEdit)) return;
                            setEditing({
                              blockId: block.id,
                              cellIndex: index,
                            });
                          }}
                        >
                          Edit
                        </button>
                        {canAddInRow ? (
                          <button
                            type="button"
                            className="editable-field-edit-btn section-columns-cell-insert"
                            title="Insert column after this one in the same row"
                            onClick={() => addColumnInRow(block.id, index)}
                          >
                            Insert column
                          </button>
                        ) : null}
                        {block.columns > 1 ? (
                          <button
                            type="button"
                            className="section-columns-cell-remove"
                            onClick={() => removeColumn(block.id, index)}
                            aria-label={`Remove column ${index + 1}`}
                          >
                            ×
                          </button>
                        ) : null}
                      </div>
                    ) : null}
                    {cell.trim() && looksLikeHtml(cell) ? (
                      <div
                        className="rich-content"
                        dangerouslySetInnerHTML={{ __html: cell }}
                      />
                    ) : cell.trim() ? (
                      <p className="whitespace-pre-line">{cell}</p>
                    ) : isAdmin ? (
                      <p className="section-columns-placeholder">
                        Empty column — click Edit to add content
                      </p>
                    ) : null}
                  </div>
                ))}

                {canAddInRow ? (
                  <button
                    type="button"
                    className="section-columns-add-cell"
                    onClick={() => addColumnInRow(block.id)}
                  >
                    <span aria-hidden>+</span>
                    Insert column
                    <small>Same row</small>
                  </button>
                ) : null}
              </div>
            </div>
          );
        })}

        {isAdmin ? (
          <div className="section-columns-add">
            {pickerOpen ? (
              <div
                className="section-columns-picker"
                role="group"
                aria-label="Column count"
              >
                <p className="section-columns-picker-label">
                  {pickerTarget === "section"
                    ? "Add a new column row to this section"
                    : "Set total columns for this row"}
                </p>
                <div className="section-columns-picker-options">
                  {([1, 2, 3, 4] as const).map((count) => (
                    <button
                      key={count}
                      type="button"
                      className="section-columns-picker-btn"
                      onClick={() => {
                        if (pickerTarget === "section") {
                          addNewRow(count);
                          return;
                        }
                        insertColumnsIntoBlock(pickerTarget, count);
                      }}
                    >
                      <span
                        className="section-columns-picker-preview"
                        aria-hidden
                      >
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
                  onClick={() => {
                    setPickerOpen(false);
                    setPickerTarget("section");
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="section-columns-add-btn"
                onClick={() => openPicker("section")}
              >
                Add columns to section
              </button>
            )}
          </div>
        ) : null}

        {editing ? (
          <SectionEditorModal
            open
            title={`Column ${(editing.cellIndex ?? 0) + 1} content`}
            fields={[
              {
                key: "cell",
                label: "Column content",
                kind: "html",
                placeholder: "Add text, images, or HTML for this column",
              },
            ]}
            values={{ cell: editingHtml }}
            onClose={() => setEditing(null)}
            onApply={(next) => {
              setCellHtml(
                editing.blockId,
                editing.cellIndex,
                next.cell ?? "",
              );
            }}
          />
        ) : null}
      </div>
    </div>
  );
}

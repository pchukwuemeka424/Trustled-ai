export const SECTION_LAYOUTS_KEY = "_sectionLayouts";

export type ColumnCount = 1 | 2 | 3 | 4;

export type SectionColumnBlock = {
  id: string;
  columns: ColumnCount;
  cells: string[];
};

export type SectionLayouts = Record<string, SectionColumnBlock[]>;

export function createColumnBlockId() {
  return `cols-${Math.random().toString(36).slice(2, 10)}`;
}

export function isColumnCount(value: unknown): value is ColumnCount {
  return value === 1 || value === 2 || value === 3 || value === 4;
}

export function parseSectionLayouts(raw: string | undefined | null): SectionLayouts {
  if (!raw?.trim()) return {};
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {};
    }

    const layouts: SectionLayouts = {};
    for (const [sectionKey, blocks] of Object.entries(parsed)) {
      if (!Array.isArray(blocks)) continue;
      layouts[sectionKey] = blocks
        .map((block): SectionColumnBlock | null => {
          if (!block || typeof block !== "object" || Array.isArray(block)) {
            return null;
          }
          const item = block as Record<string, unknown>;
          if (!isColumnCount(item.columns)) return null;
          const cells = Array.isArray(item.cells)
            ? item.cells.map((cell) => (typeof cell === "string" ? cell : ""))
            : [];
          while (cells.length < item.columns) cells.push("");
          return {
            id:
              typeof item.id === "string" && item.id.trim()
                ? item.id
                : createColumnBlockId(),
            columns: item.columns,
            cells: cells.slice(0, item.columns),
          };
        })
        .filter((block): block is SectionColumnBlock => Boolean(block));
    }
    return layouts;
  } catch {
    return {};
  }
}

export function stringifySectionLayouts(layouts: SectionLayouts): string {
  return JSON.stringify(layouts);
}

export function createEmptyColumnBlock(columns: ColumnCount): SectionColumnBlock {
  return {
    id: createColumnBlockId(),
    columns,
    cells: Array.from({ length: columns }, () => "<p></p>"),
  };
}

export function sectionKeyFromTitle(title: string) {
  return (
    title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "section"
  );
}

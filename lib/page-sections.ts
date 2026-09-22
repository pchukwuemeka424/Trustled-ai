export const HIDDEN_SECTIONS_KEY = "_hiddenSections";
export const EXTRA_SECTIONS_KEY = "_extraSections";

export const PAGE_SECTION_META_KEYS = [
  HIDDEN_SECTIONS_KEY,
  EXTRA_SECTIONS_KEY,
] as const;

export type ExtraSection = {
  id: string;
  title: string;
  bodyHtml: string;
  /** Built-in section key to insert after; empty string = end of page */
  afterKey: string;
};

export function createExtraSectionId() {
  return `sec-${Math.random().toString(36).slice(2, 10)}`;
}

export function parseHiddenSections(
  raw: string | undefined | null,
): string[] {
  if (!raw?.trim()) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((item): item is string => typeof item === "string")
      .map((item) => item.trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}

export function stringifyHiddenSections(keys: string[]): string {
  return JSON.stringify([...new Set(keys.filter(Boolean))]);
}

export function parseExtraSections(
  raw: string | undefined | null,
): ExtraSection[] {
  if (!raw?.trim()) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((item): ExtraSection | null => {
        if (!item || typeof item !== "object" || Array.isArray(item)) {
          return null;
        }
        const row = item as Record<string, unknown>;
        const id =
          typeof row.id === "string" && row.id.trim()
            ? row.id.trim()
            : createExtraSectionId();
        const title =
          typeof row.title === "string" && row.title.trim()
            ? row.title.trim()
            : "New section";
        const bodyHtml =
          typeof row.bodyHtml === "string" ? row.bodyHtml : "<p></p>";
        const afterKey =
          typeof row.afterKey === "string" ? row.afterKey.trim() : "";
        return { id, title, bodyHtml, afterKey };
      })
      .filter((item): item is ExtraSection => Boolean(item));
  } catch {
    return [];
  }
}

export function stringifyExtraSections(sections: ExtraSection[]): string {
  return JSON.stringify(sections);
}

export function createEmptyExtraSection(afterKey = ""): ExtraSection {
  return {
    id: createExtraSectionId(),
    title: "New section",
    bodyHtml: "<p>Add your content here.</p>",
    afterKey,
  };
}

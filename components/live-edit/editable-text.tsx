"use client";

import {
  forwardRef,
  useCallback,
  useState,
  type CSSProperties,
  type ElementType,
  type KeyboardEvent as ReactKeyboardEvent,
  type FocusEvent as ReactFocusEvent,
} from "react";
import { ModernTextarea } from "@/components/modern-textarea";
import { useLiveEdit, useOptionalLiveEdit } from "./live-edit-context";

type EditableTextProps = {
  field: string;
  defaultValue?: string;
  as?: ElementType;
  multiline?: boolean;
  className?: string;
  style?: CSSProperties;
  placeholder?: string;
  ariaLabel?: string;
};

/** Reveal animations start hidden; remounting in edit mode drops the `.in` class. */
function withRevealVisible(className?: string) {
  if (!className?.includes("reveal") || /\bin\b/.test(className)) {
    return className;
  }
  return `${className} in`;
}

export function EditableText({
  field,
  defaultValue = "",
  as: Tag = "span",
  multiline = false,
  className,
  style,
  placeholder,
  ariaLabel,
}: EditableTextProps) {
  const liveEdit = useOptionalLiveEdit();
  const isAdmin = liveEdit?.isAdmin ?? false;
  const isEditing = liveEdit?.isEditing ?? false;
  const editable = isAdmin && isEditing;
  const text = liveEdit?.values[field] ?? defaultValue;

  if (!editable) {
    const readClassName = [className, multiline ? "whitespace-pre-line" : ""]
      .filter(Boolean)
      .join(" ");

    return (
      <Tag className={readClassName} style={style}>
        {text || (placeholder ? <PlaceholderHint text={placeholder} /> : null)}
      </Tag>
    );
  }

  const editClassName = withRevealVisible(className);

  return (
    <>
      {multiline ? (
        <EditableTextarea
          field={field}
          initial={text}
          className={editClassName}
          style={style}
          placeholder={placeholder}
        />
      ) : (
        <EditableSurface
          Tag={Tag}
          field={field}
          multiline={multiline}
          initial={text}
          className={editClassName}
          style={style}
          placeholder={placeholder}
          ariaLabel={ariaLabel}
        />
      )}
    </>
  );
}

function PlaceholderHint({ text }: { text: string }) {
  return <span style={{ color: "var(--muted)" }}>{text}</span>;
}

type EditableSurfaceProps = {
  Tag: ElementType;
  field: string;
  multiline: boolean;
  initial: string;
  className?: string;
  style?: CSSProperties;
  placeholder?: string;
  ariaLabel?: string;
};

const EditableSurface = forwardRef<HTMLElement, EditableSurfaceProps>(
  function EditableSurface(
    { Tag, field, multiline, initial, className, style, placeholder, ariaLabel },
    ref,
  ) {
    const { setField } = useLiveEdit();
    const [snapshot] = useState(initial);

    const handleBlur = useCallback(
      (event: ReactFocusEvent<HTMLElement>) => {
        const next = (event.currentTarget.innerText ?? "")
          .replace(/\u00a0/g, " ")
          .replace(/\r/g, "");
        const normalized = multiline ? next : next.replace(/\n+/g, " ");
        setField(field, normalized);
      },
      [field, multiline, setField],
    );

    const handleKeyDown = useCallback(
      (event: ReactKeyboardEvent<HTMLElement>) => {
        if (!multiline && event.key === "Enter") {
          event.preventDefault();
          (event.currentTarget as HTMLElement).blur();
        }
      },
      [multiline],
    );

    const handlePaste = useCallback(
      (event: React.ClipboardEvent<HTMLElement>) => {
        event.preventDefault();
        const text = event.clipboardData.getData("text/plain");
        const cleaned = multiline ? text : text.replace(/\n+/g, " ");
        document.execCommand("insertText", false, cleaned);
      },
      [multiline],
    );

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        if ((event.target as HTMLElement).closest("a")) {
          event.preventDefault();
        }
      },
      [],
    );

    return (
      <Tag
        ref={ref as never}
        contentEditable
        suppressContentEditableWarning
        spellCheck
        role="textbox"
        aria-label={ariaLabel ?? `Edit ${field}`}
        aria-multiline={multiline}
        data-live-edit-field={field}
        data-placeholder={placeholder ?? ""}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onClick={handleClick}
        className={
          [
            className,
            "live-edit-surface",
          ]
            .filter(Boolean)
            .join(" ")
        }
        style={style}
      >
        {snapshot}
      </Tag>
    );
  },
);

type EditableTextareaProps = {
  field: string;
  initial: string;
  className?: string;
  style?: CSSProperties;
  placeholder?: string;
};

function textToEditorHtml(value: string) {
  const escaped = value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return escaped.replace(/\n/g, "<br>");
}

function editorHtmlToText(value: string) {
  const withLineBreakHints = value
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|h1|h2|h3|h4|h5|h6|li|blockquote)>/gi, "\n");

  const container = document.createElement("div");
  container.innerHTML = withLineBreakHints;
  return (container.textContent ?? "")
    .replace(/\u00a0/g, " ")
    .replace(/\r/g, "")
    .replace(/\n{3,}/g, "\n\n");
}

function EditableTextarea({
  field,
  initial,
  className,
  style,
  placeholder,
}: EditableTextareaProps) {
  const { setField } = useLiveEdit();
  const [draftHtml, setDraftHtml] = useState(() => textToEditorHtml(initial));

  return (
    <div className={[className, "space-y-1"].filter(Boolean).join(" ")}>
      <div className="rounded-t-md border border-b-0 border-stone-300 bg-stone-50 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-stone-500">
        Rich text area
      </div>
      <div
        className="overflow-hidden rounded-b-md border border-stone-300 bg-white"
        style={style}
      >
        <ModernTextarea
          value={draftHtml}
          placeholder={placeholder}
          rows={8}
          onChange={(next) => {
            const text = editorHtmlToText(next);
            setDraftHtml(next);
            setField(field, text);
          }}
        />
      </div>
    </div>
  );
}

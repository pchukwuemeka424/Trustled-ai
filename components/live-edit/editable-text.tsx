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
import {
  SectionEditorModal,
  type SectionEditorField,
} from "@/components/live-edit/section-editor-modal";
import { useLiveEdit, useOptionalLiveEdit } from "./live-edit-context";

type EditableTextProps = {
  field: string;
  defaultValue?: string;
  as?: ElementType;
  multiline?: boolean;
  rich?: boolean;
  className?: string;
  style?: CSSProperties;
  placeholder?: string;
  ariaLabel?: string;
  label?: string;
};

function looksLikeHtml(value: string) {
  return /<\/?[a-z][\s\S]*>/i.test(value.trim());
}

/** Reveal animations start hidden; remounting in edit mode drops the `.in` class. */
function withRevealVisible(className?: string) {
  if (!className?.includes("reveal") || /\bin\b/.test(className)) {
    return className;
  }
  return `${className} in`;
}

function HtmlOrText({
  Tag,
  text,
  className,
  style,
  multiline,
  placeholder,
}: {
  Tag: ElementType;
  text: string;
  className?: string;
  style?: CSSProperties;
  multiline?: boolean;
  placeholder?: string;
}) {
  if (!text && placeholder) {
    return (
      <Tag className={className} style={style}>
        <span style={{ color: "var(--muted)" }}>{placeholder}</span>
      </Tag>
    );
  }

  if (looksLikeHtml(text)) {
    return (
      <Tag
        className={[className, "rich-content"].filter(Boolean).join(" ")}
        style={style}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    );
  }

  const readClassName = [className, multiline ? "whitespace-pre-line" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag className={readClassName} style={style}>
      {text}
    </Tag>
  );
}

export function EditableText({
  field,
  defaultValue = "",
  as: Tag = "span",
  multiline = false,
  rich = false,
  className,
  style,
  placeholder,
  ariaLabel,
  label,
}: EditableTextProps) {
  const liveEdit = useOptionalLiveEdit();
  const isAdmin = liveEdit?.isAdmin ?? false;
  const isEditing = liveEdit?.isEditing ?? false;
  const text = liveEdit?.values[field] ?? defaultValue;
  const useRichEditor = multiline || rich;
  const [modalOpen, setModalOpen] = useState(false);

  if (!isAdmin) {
    return (
      <HtmlOrText
        Tag={Tag}
        text={text}
        className={className}
        style={style}
        multiline={multiline}
        placeholder={placeholder}
      />
    );
  }

  const fieldDef: SectionEditorField = {
    key: field,
    label: label ?? ariaLabel ?? field,
    kind: useRichEditor ? "html" : "text",
    placeholder,
  };

  const Wrap: ElementType =
    Tag === "span" || Tag === "a" ? "span" : "div";
  const wrapClass = [
    "editable-text-wrap",
    Tag === "span" || Tag === "a" ? "editable-text-wrap--inline" : "",
  ]
    .filter(Boolean)
    .join(" ");

  function openModal() {
    if (!liveEdit) return;
    if (!liveEdit.isEditing) liveEdit.startEdit();
    setModalOpen(true);
  }

  // When page edit mode is on, short fields stay inline; rich/multiline use modal.
  if (!isEditing) {
    return (
      <>
        <Wrap className={wrapClass}>
          <HtmlOrText
            Tag={Tag}
            text={text}
            className={className}
            style={style}
            multiline={multiline}
            placeholder={placeholder}
          />
          {useRichEditor ? (
            <button
              type="button"
              className="editable-field-edit-btn"
              onClick={openModal}
              aria-label={`Edit ${fieldDef.label}`}
            >
              Edit
            </button>
          ) : null}
        </Wrap>
        {useRichEditor ? (
          <SectionEditorModal
            open={modalOpen}
            title={fieldDef.label}
            fields={[fieldDef]}
            values={liveEdit?.values ?? {}}
            onClose={() => setModalOpen(false)}
            onApply={(next) => {
              liveEdit?.setField(field, next[field] ?? "");
            }}
          />
        ) : null}
      </>
    );
  }

  const editClassName = withRevealVisible(className);

  if (useRichEditor) {
    return (
      <>
        <Wrap className={`${wrapClass} editable-text-wrap--editing`}>
          <HtmlOrText
            Tag={Tag}
            text={text}
            className={editClassName}
            style={style}
            multiline={multiline}
            placeholder={placeholder}
          />
          <button
            type="button"
            className="editable-field-edit-btn"
            onClick={openModal}
            aria-label={`Edit ${fieldDef.label}`}
          >
            Edit
          </button>
        </Wrap>
        <SectionEditorModal
          open={modalOpen}
          title={fieldDef.label}
          fields={[fieldDef]}
          values={liveEdit?.values ?? {}}
          onClose={() => setModalOpen(false)}
          onApply={(next) => {
            liveEdit?.setField(field, next[field] ?? "");
          }}
        />
      </>
    );
  }

  return (
    <EditableSurface
      Tag={Tag}
      field={field}
      multiline={false}
      initial={text}
      className={editClassName}
      style={style}
      placeholder={placeholder}
      ariaLabel={ariaLabel}
    />
  );
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
        className={["live-edit-surface", className].filter(Boolean).join(" ")}
        style={style}
      >
        {snapshot}
      </Tag>
    );
  },
);

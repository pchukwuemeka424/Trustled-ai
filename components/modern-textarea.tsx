"use client";

import { useCallback, useEffect, useId } from "react";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Placeholder } from "@tiptap/extension-placeholder";

type ModernTextareaProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  name?: string;
  required?: boolean;
  rows?: number;
};

const toolbarButtonClass =
  "inline-flex h-8 min-w-8 items-center justify-center rounded border border-transparent px-2 text-xs font-semibold text-stone-700 transition hover:bg-stone-100 hover:text-stone-900 disabled:cursor-not-allowed disabled:opacity-40";
const toolbarButtonActiveClass = "border-stone-300 bg-stone-100 text-stone-900";
const toolbarSeparatorClass = "mx-1 h-5 w-px bg-stone-200";

export function ModernTextarea({
  value,
  onChange,
  placeholder,
  className,
  name,
  required,
  rows,
}: ModernTextareaProps) {
  const editorId = useId();
  const minHeight = rows ? Math.max(rows * 28, 180) : 220;

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        link: {
          openOnClick: false,
          autolink: true,
          defaultProtocol: "https",
          HTMLAttributes: {
            target: "_blank",
            rel: "noopener noreferrer",
          },
        },
        codeBlock: false,
        horizontalRule: false,
        blockquote: false,
      }),
      Placeholder.configure({
        placeholder: placeholder ?? "",
        emptyEditorClass:
          "before:pointer-events-none before:absolute before:left-0 before:top-0 before:h-0 before:text-stone-400 before:content-[attr(data-placeholder)]",
      }),
    ],
    content: value || "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        id: editorId,
        class:
          "tiptap-content min-h-[inherit] w-full bg-white px-3 py-2.5 text-sm text-stone-900 outline-none [&_p]:my-2 [&_h2]:mt-4 [&_h2]:text-lg [&_h2]:font-semibold [&_h3]:mt-3 [&_h3]:text-base [&_h3]:font-semibold [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_a]:text-teal-700 [&_a]:underline",
      },
    },
    onUpdate: ({ editor: nextEditor }) => {
      const html = nextEditor.getHTML();
      const normalized = nextEditor.isEmpty ? "" : html;
      onChange(normalized);
    },
  });

  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    const incoming = value || "";
    const isSameEmpty = editor.isEmpty && incoming === "";
    if (current === incoming || isSameEmpty) return;
    editor.commands.setContent(incoming, { emitUpdate: false });
  }, [editor, value]);

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link URL", previousUrl ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  return (
    <div className={className}>
      {name ? (
        <input
          type="hidden"
          name={name}
          value={value}
          required={required}
          aria-hidden="true"
          readOnly
        />
      ) : null}
      <div className="overflow-hidden rounded-md border border-stone-300 bg-white focus-within:border-teal-700 focus-within:ring-2 focus-within:ring-teal-800/20">
        <Toolbar editor={editor} onLink={setLink} />
        <div
          className="relative w-full overflow-y-auto"
          style={{ minHeight: `${minHeight}px` }}
        >
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
}

function Toolbar({
  editor,
  onLink,
}: {
  editor: Editor | null;
  onLink: () => void;
}) {
  const isReady = editor !== null;

  return (
    <div className="flex flex-wrap items-center gap-0.5 border-b border-stone-200 bg-stone-50 px-1.5 py-1">
      <ToolbarButton
        label="Undo"
        ariaLabel="Undo"
        disabled={!isReady || !editor?.can().undo()}
        onClick={() => editor?.chain().focus().undo().run()}
      >
        ↶
      </ToolbarButton>
      <ToolbarButton
        label="Redo"
        ariaLabel="Redo"
        disabled={!isReady || !editor?.can().redo()}
        onClick={() => editor?.chain().focus().redo().run()}
      >
        ↷
      </ToolbarButton>

      <span className={toolbarSeparatorClass} aria-hidden />

      <ToolbarButton
        label="Paragraph"
        ariaLabel="Paragraph"
        disabled={!isReady}
        active={editor?.isActive("paragraph") && !editor?.isActive("heading")}
        onClick={() => editor?.chain().focus().setParagraph().run()}
      >
        P
      </ToolbarButton>
      <ToolbarButton
        label="Heading 2"
        ariaLabel="Heading 2"
        disabled={!isReady}
        active={editor?.isActive("heading", { level: 2 })}
        onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        H2
      </ToolbarButton>
      <ToolbarButton
        label="Heading 3"
        ariaLabel="Heading 3"
        disabled={!isReady}
        active={editor?.isActive("heading", { level: 3 })}
        onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        H3
      </ToolbarButton>

      <span className={toolbarSeparatorClass} aria-hidden />

      <ToolbarButton
        label="Bold"
        ariaLabel="Bold"
        disabled={!isReady}
        active={editor?.isActive("bold")}
        onClick={() => editor?.chain().focus().toggleBold().run()}
      >
        <span className="font-bold">B</span>
      </ToolbarButton>
      <ToolbarButton
        label="Italic"
        ariaLabel="Italic"
        disabled={!isReady}
        active={editor?.isActive("italic")}
        onClick={() => editor?.chain().focus().toggleItalic().run()}
      >
        <span className="italic">I</span>
      </ToolbarButton>
      <ToolbarButton
        label="Underline"
        ariaLabel="Underline"
        disabled={!isReady}
        active={editor?.isActive("underline")}
        onClick={() => editor?.chain().focus().toggleUnderline().run()}
      >
        <span className="underline">U</span>
      </ToolbarButton>

      <span className={toolbarSeparatorClass} aria-hidden />

      <ToolbarButton
        label="Bulleted list"
        ariaLabel="Bulleted list"
        disabled={!isReady}
        active={editor?.isActive("bulletList")}
        onClick={() => editor?.chain().focus().toggleBulletList().run()}
      >
        •
      </ToolbarButton>
      <ToolbarButton
        label="Numbered list"
        ariaLabel="Numbered list"
        disabled={!isReady}
        active={editor?.isActive("orderedList")}
        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
      >
        1.
      </ToolbarButton>

      <span className={toolbarSeparatorClass} aria-hidden />

      <ToolbarButton
        label="Link"
        ariaLabel="Insert or edit link"
        disabled={!isReady}
        active={editor?.isActive("link")}
        onClick={onLink}
      >
        ⛓
      </ToolbarButton>

      <span className={toolbarSeparatorClass} aria-hidden />

      <ToolbarButton
        label="Clear formatting"
        ariaLabel="Clear formatting"
        disabled={!isReady}
        onClick={() =>
          editor?.chain().focus().clearNodes().unsetAllMarks().run()
        }
      >
        ⌫
      </ToolbarButton>
    </div>
  );
}

function ToolbarButton({
  children,
  label,
  ariaLabel,
  active,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  ariaLabel: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={ariaLabel}
      aria-pressed={active ? true : false}
      disabled={disabled}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      className={`${toolbarButtonClass} ${active ? toolbarButtonActiveClass : ""}`}
    >
      {children}
    </button>
  );
}

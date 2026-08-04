"use client";

import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { Placeholder } from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useRef, useState } from "react";
import { uploadAdminImage } from "@/components/admin/upload-image";

type RichTextEditorProps = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  uploadScope?: string;
  minHeight?: number;
};

function looksLikeHtml(value: string) {
  return /<\/?[a-z][\s\S]*>/i.test(value.trim());
}

export function plainTextToEditorHtml(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (looksLikeHtml(value)) return value;

  return value
    .split(/\n{2,}/)
    .map((block) => {
      const escaped = block
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\n/g, "<br>");
      return `<p>${escaped}</p>`;
    })
    .join("");
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Write content…",
  uploadScope = "content",
  minHeight = 220,
}: RichTextEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useState<"visual" | "html">("visual");
  const [htmlDraft, setHtmlDraft] = useState(value);
  const [uploadError, setUploadError] = useState("");
  const [uploading, setUploading] = useState(false);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          class: "rich-text-link",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rich-text-image",
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: plainTextToEditorHtml(value),
    editorProps: {
      attributes: {
        class: "rich-text-editor-content",
        style: `min-height:${minHeight}px`,
      },
    },
    onUpdate: ({ editor: currentEditor }) => {
      const html = currentEditor.getHTML();
      setHtmlDraft(html);
      onChange(html);
    },
  });

  useEffect(() => {
    if (!editor || mode === "html") return;
    const next = plainTextToEditorHtml(value);
    if (next !== editor.getHTML()) {
      editor.commands.setContent(next, { emitUpdate: false });
      setHtmlDraft(next);
    }
  }, [editor, value, mode]);

  function switchToHtml() {
    if (!editor) return;
    const html = editor.getHTML();
    setHtmlDraft(html);
    setMode("html");
  }

  function switchToVisual() {
    if (!editor) return;
    editor.commands.setContent(htmlDraft || "", { emitUpdate: false });
    onChange(htmlDraft);
    setMode("visual");
  }

  function setLink() {
    if (!editor) return;
    const previous = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link URL", previous ?? "https://");
    if (url === null) return;
    if (url.trim() === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url.trim() })
      .run();
  }

  async function insertImage(file: File) {
    if (!editor) return;
    setUploading(true);
    setUploadError("");
    try {
      const url = await uploadAdminImage(file, uploadScope);
      if (mode === "html") {
        const next = `${htmlDraft}<p><img src="${url}" alt="" /></p>`;
        setHtmlDraft(next);
        onChange(next);
      } else {
        editor.chain().focus().setImage({ src: url, alt: "" }).run();
      }
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  if (!editor) {
    return <div className="rich-text-editor-loading">Loading editor…</div>;
  }

  return (
    <div className="rich-text-editor rich-text-editor--pro">
      <div className="rich-text-editor-toolbar" role="toolbar" aria-label="Formatting">
        <button
          type="button"
          className={editor.isActive("bold") ? "is-active" : ""}
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={mode === "html"}
        >
          Bold
        </button>
        <button
          type="button"
          className={editor.isActive("italic") ? "is-active" : ""}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={mode === "html"}
        >
          Italic
        </button>
        <button
          type="button"
          className={editor.isActive("underline") ? "is-active" : ""}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={mode === "html"}
        >
          Underline
        </button>
        <span className="rich-text-toolbar-sep" aria-hidden="true" />
        <button
          type="button"
          className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          disabled={mode === "html"}
        >
          H2
        </button>
        <button
          type="button"
          className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          disabled={mode === "html"}
        >
          H3
        </button>
        <span className="rich-text-toolbar-sep" aria-hidden="true" />
        <button
          type="button"
          className={editor.isActive("bulletList") ? "is-active" : ""}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          disabled={mode === "html"}
        >
          List
        </button>
        <button
          type="button"
          className={editor.isActive("orderedList") ? "is-active" : ""}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          disabled={mode === "html"}
        >
          Numbered
        </button>
        <button
          type="button"
          className={editor.isActive("blockquote") ? "is-active" : ""}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          disabled={mode === "html"}
        >
          Quote
        </button>
        <span className="rich-text-toolbar-sep" aria-hidden="true" />
        <button
          type="button"
          className={editor.isActive("link") ? "is-active" : ""}
          onClick={setLink}
          disabled={mode === "html"}
        >
          Link
        </button>
        <button
          type="button"
          disabled={uploading}
          onClick={() => fileInputRef.current?.click()}
        >
          {uploading ? "Uploading…" : "Image"}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
          hidden
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) void insertImage(file);
            event.target.value = "";
          }}
        />
        <span className="rich-text-toolbar-sep" aria-hidden="true" />
        <button
          type="button"
          className={mode === "visual" ? "is-active" : ""}
          onClick={switchToVisual}
        >
          Visual
        </button>
        <button
          type="button"
          className={mode === "html" ? "is-active" : ""}
          onClick={switchToHtml}
        >
          HTML
        </button>
      </div>

      {mode === "visual" ? (
        <EditorContent editor={editor} />
      ) : (
        <textarea
          className="rich-text-html-source"
          value={htmlDraft}
          onChange={(event) => {
            setHtmlDraft(event.target.value);
            onChange(event.target.value);
          }}
          spellCheck={false}
          style={{ minHeight }}
          aria-label="HTML source"
        />
      )}

      {uploadError ? (
        <p className="form-error rich-text-editor-error">{uploadError}</p>
      ) : null}
    </div>
  );
}

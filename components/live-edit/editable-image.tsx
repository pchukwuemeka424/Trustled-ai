"use client";

import Image, { type ImageProps } from "next/image";
import { useRef, useState } from "react";
import { useLiveEdit } from "./live-edit-context";

type EditableImageProps = Omit<ImageProps, "src" | "alt"> & {
  srcField: string;
  altField: string;
  defaultSrc?: string;
  defaultAlt?: string;
  className?: string;
  uploadScope?: string;
};

export function EditableImage({
  srcField,
  altField,
  defaultSrc = "",
  defaultAlt = "",
  className,
  uploadScope = "content",
  ...imageProps
}: EditableImageProps) {
  const { isAdmin, isEditing, values, setField } = useLiveEdit();
  const editable = isAdmin && isEditing;
  const src = values[srcField] || defaultSrc;
  const alt = values[altField] ?? defaultAlt;
  const [open, setOpen] = useState(false);
  const [draftSrc, setDraftSrc] = useState(src);
  const [draftAlt, setDraftAlt] = useState(alt);
  const [uploadError, setUploadError] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!editable) {
    return src ? <Image {...imageProps} src={src} alt={alt} className={className} /> : null;
  }

  function commit() {
    if (draftSrc !== src) setField(srcField, draftSrc);
    if (draftAlt !== alt) setField(altField, draftAlt);
    setOpen(false);
  }

  function discard() {
    setDraftSrc(src);
    setDraftAlt(alt);
    setOpen(false);
  }

  async function uploadFile(file: File) {
    setUploading(true);
    setUploadError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("scope", uploadScope);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(data.error ?? "Upload failed");
      }

      const data = (await response.json()) as { url?: string };
      if (!data.url) throw new Error("Upload failed");
      setDraftSrc(data.url);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <>
      {src ? (
        <Image {...imageProps} src={src} alt={alt} className={className} />
      ) : (
        <div className="absolute inset-0 grid place-items-center bg-stone-100 text-xs font-medium text-stone-500">
          No image set
        </div>
      )}
      <button
        type="button"
        onClick={() => {
          setDraftSrc(src);
          setDraftAlt(alt);
          setOpen(true);
        }}
        className="absolute right-3 top-3 z-10 inline-flex h-8 items-center gap-1.5 rounded-md bg-stone-900/85 px-3 text-[11px] font-semibold uppercase tracking-wider text-white shadow-sm backdrop-blur transition hover:bg-stone-900"
        aria-label="Edit image"
      >
        <PencilIcon /> Edit image
      </button>
      {open ? (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-stone-900/55 p-4">
          <div className="w-full max-w-md rounded-xl border border-stone-200 bg-white p-5 shadow-xl">
            <p className="text-sm font-semibold text-stone-900">Image source</p>
            <input
              type="url"
              value={draftSrc}
              onChange={(event) => setDraftSrc(event.target.value)}
              className="mt-2 h-10 w-full rounded-md border border-stone-300 px-3 text-sm text-stone-900 outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-800/20"
              placeholder="https://…"
              autoFocus
            />
            <div className="mt-3 flex items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) {
                    void uploadFile(file);
                  }
                  event.currentTarget.value = "";
                }}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="inline-flex h-9 items-center justify-center rounded-md border border-stone-300 px-3 text-sm font-medium text-stone-800 transition hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {uploading ? "Uploading…" : "Upload image"}
              </button>
              <p className="text-xs text-stone-500">
                Upload an image or paste a URL above
              </p>
            </div>
            {uploadError ? (
              <p className="mt-2 text-xs text-red-700" role="alert">
                {uploadError}
              </p>
            ) : null}
            <p className="mt-4 text-sm font-semibold text-stone-900">Alt text</p>
            <input
              type="text"
              value={draftAlt}
              onChange={(event) => setDraftAlt(event.target.value)}
              className="mt-2 h-10 w-full rounded-md border border-stone-300 px-3 text-sm text-stone-900 outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-800/20"
              placeholder="Describe this image for screen readers"
            />
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={discard}
                className="inline-flex h-9 items-center justify-center rounded-md border border-stone-300 px-3 text-sm font-medium text-stone-800 transition hover:bg-stone-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={commit}
                className="inline-flex h-9 items-center justify-center rounded-md bg-stone-900 px-3 text-sm font-semibold text-white transition hover:bg-stone-800"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function PencilIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
      <path d="M14.69 2.86a2 2 0 012.83 0l-.71.7.71-.7a2 2 0 010 2.83l-9.5 9.5a1 1 0 01-.42.25l-3.5 1a1 1 0 01-1.24-1.24l1-3.5a1 1 0 01.25-.42l9.5-9.5zm1.41 1.41a.5.5 0 00-.7 0l-1.06 1.06 1.41 1.41 1.06-1.06a.5.5 0 000-.7l-.71-.71zM4.6 13.99l-.6 2.01 2.01-.6 7.94-7.94-1.41-1.41L4.6 13.99z" />
    </svg>
  );
}

"use client";

import { useRef, useState } from "react";
import { useLiveEdit } from "./live-edit-context";

type EditableHeroBackgroundProps = {
  field: string;
  defaultValue?: string;
  uploadScope?: string;
};

export function EditableHeroBackground({
  field,
  defaultValue = "",
  uploadScope = "hero",
}: EditableHeroBackgroundProps) {
  const { isAdmin, isEditing, values, setField, startEdit } = useLiveEdit();
  const url = values[field] || defaultValue;

  const [open, setOpen] = useState(false);
  const [draftUrl, setDraftUrl] = useState(url);
  const [uploadError, setUploadError] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function openEditor() {
    if (!isEditing) {
      startEdit();
    }
    setDraftUrl(url);
    setUploadError("");
    setOpen(true);
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
      setDraftUrl(data.url);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function apply() {
    setField(field, draftUrl);
    setOpen(false);
  }

  function removeBackground() {
    setField(field, "");
    setDraftUrl("");
    setOpen(false);
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="hero-bg-controls">
      <button
        type="button"
        onClick={openEditor}
        className="hero-bg-edit-btn"
        aria-label="Edit hero background"
      >
        <PencilIcon />
        {url ? "Change background" : "Upload background"}
      </button>

      {open ? (
        <div className="hero-bg-edit-modal" role="dialog" aria-modal="true">
          <div className="hero-bg-edit-panel">
            <p className="hero-bg-edit-title">Hero background image</p>
            <p className="hero-bg-edit-hint">
              Upload a wide landscape image (1920×1080 or larger). A dark overlay
              keeps text readable.
            </p>

            {draftUrl ? (
              <div className="hero-bg-edit-preview-wrap">
                <div
                  className="hero-bg-edit-preview"
                  style={{ backgroundImage: `url(${draftUrl})` }}
                  aria-hidden
                />
                <div className="hero-bg-edit-preview-overlay" aria-hidden />
              </div>
            ) : (
              <div className="hero-bg-edit-preview hero-bg-edit-preview--empty">
                No image selected
              </div>
            )}

            <input
              type="url"
              value={draftUrl}
              onChange={(event) => setDraftUrl(event.target.value)}
              className="hero-bg-edit-input"
              placeholder="https://… or upload below"
              autoFocus
            />

            <div className="hero-bg-edit-actions">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="visually-hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) void uploadFile(file);
                  event.currentTarget.value = "";
                }}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="hero-bg-edit-upload"
              >
                {uploading ? "Uploading…" : "Upload image"}
              </button>
            </div>

            {uploadError ? (
              <p className="hero-bg-edit-error" role="alert">
                {uploadError}
              </p>
            ) : null}

            <div className="hero-bg-edit-footer">
              {url || draftUrl ? (
                <button
                  type="button"
                  onClick={removeBackground}
                  className="hero-bg-edit-remove"
                >
                  Remove
                </button>
              ) : (
                <span />
              )}
              <div className="hero-bg-edit-footer-right">
                <button
                  type="button"
                  onClick={() => {
                    setDraftUrl(url);
                    setOpen(false);
                  }}
                  className="hero-bg-edit-cancel"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={apply}
                  className="hero-bg-edit-apply"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function PencilIcon() {
  return (
    <svg viewBox="0 0 20 20" className="hero-bg-edit-icon" fill="currentColor" aria-hidden>
      <path d="M14.69 2.86a2 2 0 012.83 0l-.71.7.71-.7a2 2 0 010 2.83l-9.5 9.5a1 1 0 01-.42.25l-3.5 1a1 1 0 01-1.24-1.24l1-3.5a1 1 0 01.25-.42l9.5-9.5zm1.41 1.41a.5.5 0 00-.7 0l-1.06 1.06 1.41 1.41 1.06-1.06a.5.5 0 000-.7l-.71-.71zM4.6 13.99l-.6 2.01 2.01-.6 7.94-7.94-1.41-1.41L4.6 13.99z" />
    </svg>
  );
}

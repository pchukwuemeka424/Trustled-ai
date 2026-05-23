"use client";

import { useRef, useState } from "react";

type HeaderLogoEditorProps = {
  logoUrl: string;
  logoAlt: string;
  onSave: (logoUrl: string, logoAlt: string) => Promise<void>;
};

export function HeaderLogoEditor({
  logoUrl,
  logoAlt,
  onSave,
}: HeaderLogoEditorProps) {
  const [open, setOpen] = useState(false);
  const [draftUrl, setDraftUrl] = useState(logoUrl);
  const [draftAlt, setDraftAlt] = useState(logoAlt);
  const [uploadError, setUploadError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function openEditor() {
    setDraftUrl(logoUrl);
    setDraftAlt(logoAlt);
    setUploadError("");
    setOpen(true);
  }

  async function uploadFile(file: File) {
    setUploading(true);
    setUploadError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("scope", "logo");

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

  async function apply() {
    setSaving(true);
    setUploadError("");
    try {
      await onSave(draftUrl, draftAlt);
      setOpen(false);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function removeLogo() {
    setSaving(true);
    setUploadError("");
    try {
      await onSave("", logoAlt);
      setDraftUrl("");
      setOpen(false);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={openEditor}
        className="header-logo-edit-btn"
        aria-label="Change logo"
      >
        <PencilIcon />
        {logoUrl ? "Change logo" : "Upload logo"}
      </button>

      {open ? (
        <div
          className="header-logo-edit-modal"
          role="dialog"
          aria-modal="true"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setDraftUrl(logoUrl);
              setDraftAlt(logoAlt);
              setOpen(false);
            }
          }}
        >
          <div className="hero-bg-edit-panel header-logo-edit-panel">
            <p className="hero-bg-edit-title">Header logo</p>
            <p className="hero-bg-edit-hint">
              Upload a logo image (PNG, SVG, or WebP). Recommended height around
              40px. Leave empty to use the default TrustLed mark.
            </p>

            {draftUrl ? (
              <div className="header-logo-edit-preview-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={draftUrl}
                  alt={draftAlt || "Logo preview"}
                  className="header-logo-edit-preview-img"
                />
              </div>
            ) : (
              <div className="hero-bg-edit-preview--empty">No logo selected</div>
            )}

            <input
              type="url"
              value={draftUrl}
              onChange={(event) => setDraftUrl(event.target.value)}
              className="hero-bg-edit-input"
              placeholder="https://… or upload below"
              autoFocus
            />

            <p className="hero-bg-edit-title header-logo-alt-label">Alt text</p>
            <input
              type="text"
              value={draftAlt}
              onChange={(event) => setDraftAlt(event.target.value)}
              className="hero-bg-edit-input header-logo-alt-input"
              placeholder="Describe the logo for screen readers"
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
              {logoUrl || draftUrl ? (
                <button
                  type="button"
                  onClick={() => void removeLogo()}
                  disabled={saving}
                  className="hero-bg-edit-remove"
                >
                  Remove logo
                </button>
              ) : (
                <span />
              )}
              <div className="hero-bg-edit-footer-right">
                <button
                  type="button"
                  onClick={() => {
                    setDraftUrl(logoUrl);
                    setDraftAlt(logoAlt);
                    setOpen(false);
                  }}
                  disabled={saving}
                  className="hero-bg-edit-cancel"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => void apply()}
                  disabled={saving || uploading}
                  className="hero-bg-edit-apply"
                >
                  {saving ? "Saving…" : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function PencilIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="hero-bg-edit-icon"
      fill="currentColor"
      aria-hidden
    >
      <path d="M14.69 2.86a2 2 0 012.83 0l-.71.7.71-.7a2 2 0 010 2.83l-9.5 9.5a1 1 0 01-.42.25l-3.5 1a1 1 0 01-1.24-1.24l1-3.5a1 1 0 01.25-.42l9.5-9.5zm1.41 1.41a.5.5 0 00-.7 0l-1.06 1.06 1.41 1.41 1.06-1.06a.5.5 0 000-.7l-.71-.71zM4.6 13.99l-.6 2.01 2.01-.6 7.94-7.94-1.41-1.41L4.6 13.99z" />
    </svg>
  );
}

"use client";

import { useRef, useState } from "react";

type SiteSettingsFormProps = {
  initialLogoUrl: string;
  initialLogoAlt: string;
};

export function SiteSettingsForm({
  initialLogoUrl,
  initialLogoAlt,
}: SiteSettingsFormProps) {
  const [logoUrl, setLogoUrl] = useState(initialLogoUrl);
  const [logoAlt, setLogoAlt] = useState(initialLogoAlt);
  const [uploadError, setUploadError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function uploadFile(file: File) {
    setUploading(true);
    setUploadError("");
    setSaved(false);
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
      setLogoUrl(data.url);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setUploadError("");
    setSaved(false);
    try {
      const response = await fetch("/api/admin/site-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ logoUrl, logoAlt }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(data.error ?? "Failed to save settings");
      }

      setSaved(true);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function removeLogo() {
    setLogoUrl("");
    setSaved(false);
  }

  return (
    <form onSubmit={(event) => void handleSubmit(event)} className="site-settings-form">
      <div className="site-settings-preview">
        {logoUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={logoUrl} alt={logoAlt || "Logo preview"} className="brand-logo" />
        ) : (
          <p className="site-settings-preview-empty">No logo — default mark is shown</p>
        )}
      </div>

      <label className="site-settings-label" htmlFor="logoUrl">
        Logo URL
      </label>
      <input
        id="logoUrl"
        type="url"
        value={logoUrl}
        onChange={(event) => {
          setLogoUrl(event.target.value);
          setSaved(false);
        }}
        className="hero-bg-edit-input"
        placeholder="https://… or upload below"
      />

      <div className="hero-bg-edit-actions" style={{ marginTop: "0.75rem" }}>
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
        {logoUrl ? (
          <button
            type="button"
            onClick={() => void removeLogo()}
            className="hero-bg-edit-remove"
            style={{ marginLeft: "0.5rem" }}
          >
            Remove
          </button>
        ) : null}
      </div>

      <label className="site-settings-label" htmlFor="logoAlt">
        Alt text
      </label>
      <input
        id="logoAlt"
        type="text"
        value={logoAlt}
        onChange={(event) => {
          setLogoAlt(event.target.value);
          setSaved(false);
        }}
        className="hero-bg-edit-input"
        placeholder="TrustLed AI"
      />

      {uploadError ? (
        <p className="hero-bg-edit-error" role="alert">
          {uploadError}
        </p>
      ) : null}

      {saved ? (
        <p className="site-settings-saved" role="status">
          Settings saved. Refresh any open pages to see the logo update in the header.
        </p>
      ) : null}

      <button type="submit" disabled={saving || uploading} className="btn" style={{ marginTop: "1.25rem" }}>
        {saving ? "Saving…" : "Save settings"}
      </button>
    </form>
  );
}

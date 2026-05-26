"use client";

import { useRef, useState } from "react";
import type { SiteSettings } from "@/lib/site-settings-schema";

type SiteSettingsFormProps = {
  initialSettings: SiteSettings;
};

const footerSections = [
  {
    title: "Services column",
    headingField: "footerServicesHeading",
    links: [
      ["footerService1Label", "footerService1Href"],
      ["footerService2Label", "footerService2Href"],
      ["footerService3Label", "footerService3Href"],
    ],
  },
  {
    title: "More column",
    headingField: "footerMoreHeading",
    links: [
      ["footerMore1Label", "footerMore1Href"],
      ["footerMore2Label", "footerMore2Href"],
      ["footerMore3Label", "footerMore3Href"],
      ["footerMore4Label", "footerMore4Href"],
    ],
  },
  {
    title: "Contact column",
    headingField: "footerContactHeading",
    links: [
      ["footerContact1Label", "footerContact1Href"],
      ["footerContact2Label", "footerContact2Href"],
      ["footerContact3Label", "footerContact3Href"],
    ],
  },
] as const;

export function SiteSettingsForm({ initialSettings }: SiteSettingsFormProps) {
  const [settings, setSettings] = useState(initialSettings);
  const [uploadError, setUploadError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const logoUrl = settings.logoUrl;
  const logoAlt = settings.logoAlt;

  function updateField(field: string, value: string) {
    setSettings((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  }

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
      updateField("logoUrl", data.url);
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
        body: JSON.stringify(settings),
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
    updateField("logoUrl", "");
  }

  return (
    <form
      onSubmit={(event) => void handleSubmit(event)}
      className="site-settings-form"
    >
      <div className="site-settings-preview">
        {logoUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={logoUrl}
            alt={logoAlt || "Logo preview"}
            className="brand-logo"
          />
        ) : (
          <p className="site-settings-preview-empty">
            No logo — default mark is shown
          </p>
        )}
      </div>

      <TextInput
        id="logoUrl"
        label="Logo URL"
        type="url"
        value={logoUrl}
        onChange={(value) => updateField("logoUrl", value)}
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

      <TextInput
        id="logoAlt"
        label="Alt text"
        value={logoAlt}
        onChange={(value) => updateField("logoAlt", value)}
        placeholder="TrustLed AI"
      />

      <div className="site-settings-group">
        <h3 className="eyebrow">Footer copy</h3>
        <TextInput
          id="footerTagline"
          label="Tagline"
          value={settings.footerTagline}
          onChange={(value) => updateField("footerTagline", value)}
        />
        <TextArea
          id="footerRegistration"
          label="Registration text"
          value={settings.footerRegistration}
          onChange={(value) => updateField("footerRegistration", value)}
        />
        <TextArea
          id="footerDisclaimer"
          label="Disclaimer"
          value={settings.footerDisclaimer}
          onChange={(value) => updateField("footerDisclaimer", value)}
        />
        <TextInput
          id="footerCopyright"
          label="Copyright line"
          value={settings.footerCopyright}
          onChange={(value) => updateField("footerCopyright", value)}
        />
      </div>

      <div className="site-settings-group">
        <h3 className="eyebrow">Footer links</h3>
        {footerSections.map((section) => (
          <fieldset className="site-settings-fieldset" key={section.title}>
            <legend>{section.title}</legend>
            <TextInput
              id={section.headingField}
              label="Column heading"
              value={settings[section.headingField]}
              onChange={(value) => updateField(section.headingField, value)}
            />
            {section.links.map(([labelField, hrefField], index) => (
              <div className="site-settings-link-grid" key={labelField}>
                <TextInput
                  id={labelField}
                  label={`Link ${index + 1} label`}
                  value={settings[labelField]}
                  onChange={(value) => updateField(labelField, value)}
                />
                <TextInput
                  id={hrefField}
                  label={`Link ${index + 1} URL`}
                  value={settings[hrefField]}
                  onChange={(value) => updateField(hrefField, value)}
                  placeholder="/contact or mailto:hello@example.com"
                />
              </div>
            ))}
          </fieldset>
        ))}
      </div>

      {uploadError ? (
        <p className="hero-bg-edit-error" role="alert">
          {uploadError}
        </p>
      ) : null}

      {saved ? (
        <p className="site-settings-saved" role="status">
          Settings saved. Refresh any open pages to see the update.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={saving || uploading}
        className="btn"
        style={{ marginTop: "1.25rem" }}
      >
        {saving ? "Saving…" : "Save settings"}
      </button>
    </form>
  );
}

type TextInputProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "url";
  placeholder?: string;
};

function TextInput({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: TextInputProps) {
  return (
    <>
      <label className="site-settings-label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="hero-bg-edit-input"
        placeholder={placeholder}
      />
    </>
  );
}

type TextAreaProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
};

function TextArea({ id, label, value, onChange }: TextAreaProps) {
  return (
    <>
      <label className="site-settings-label" htmlFor={id}>
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="hero-bg-edit-input"
        rows={3}
      />
    </>
  );
}

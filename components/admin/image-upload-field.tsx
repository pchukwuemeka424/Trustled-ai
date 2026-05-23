"use client";

import { useRef, useState } from "react";
import { uploadAdminImage } from "@/components/admin/upload-image";

type ImageUploadFieldProps = {
  label: string;
  value: string;
  onChange: (url: string) => void;
  uploadScope?: string;
  hint?: string;
};

export function ImageUploadField({
  label,
  value,
  onChange,
  uploadScope = "blog",
  hint = "PNG, JPG, WebP, GIF or SVG. Max 5MB.",
}: ImageUploadFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadError, setUploadError] = useState("");
  const [uploading, setUploading] = useState(false);
  const inputId = `image-upload-${label.replace(/\s+/g, "-").toLowerCase()}`;

  async function handleUpload(file: File) {
    setUploading(true);
    setUploadError("");

    try {
      const url = await uploadAdminImage(file, uploadScope);
      onChange(url);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="field blog-image-field">
      <label htmlFor={inputId}>{label}</label>
      {value ? (
        <div className="blog-image-preview">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" className="blog-image-preview-img" />
          <button
            type="button"
            className="blog-image-remove"
            onClick={() => onChange("")}
          >
            Remove image
          </button>
        </div>
      ) : (
        <div className="blog-image-preview blog-image-preview--empty">
          No image selected
        </div>
      )}
      <input
        id={inputId}
        type="url"
        value={value}
        placeholder="https://… or upload below"
        onChange={(event) => onChange(event.target.value)}
      />
      <div className="blog-image-upload-actions">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
          hidden
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) void handleUpload(file);
            event.target.value = "";
          }}
        />
        <button
          type="button"
          className="hero-bg-edit-upload"
          disabled={uploading}
          onClick={() => fileInputRef.current?.click()}
        >
          {uploading ? "Uploading…" : "Upload image"}
        </button>
      </div>
      <p className="form-note">{hint}</p>
      {uploadError ? <p className="form-error">{uploadError}</p> : null}
    </div>
  );
}

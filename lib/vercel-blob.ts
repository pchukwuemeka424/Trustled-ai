import { put } from "@vercel/blob";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);

function sanitizeSegment(value: string) {
  return value.replace(/[^a-z0-9-_]/gi, "-").toLowerCase();
}

function extensionFor(file: File) {
  if (file.type === "image/png") return ".png";
  if (file.type === "image/jpeg") return ".jpg";
  if (file.type === "image/webp") return ".webp";
  if (file.type === "image/gif") return ".gif";
  if (file.type === "image/svg+xml") return ".svg";
  const nameExt = file.name?.match(/\.[a-z0-9]+$/i)?.[0];
  return nameExt?.toLowerCase() || ".bin";
}

export function assertBlobTokenConfigured() {
  if (!process.env.BLOB_READ_WRITE_TOKEN?.trim()) {
    throw new Error("BLOB_READ_WRITE_TOKEN is not configured");
  }
}

export async function uploadImageToBlob(file: File, scope = "content") {
  if (!ALLOWED_TYPES.has(file.type)) {
    throw new Error("Unsupported image format");
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error("Image must be 5MB or smaller");
  }

  assertBlobTokenConfigured();

  const safeScope = sanitizeSegment(scope || "content");
  const ext = extensionFor(file);
  const pathname = `uploads/${safeScope}/${Date.now()}-${crypto.randomUUID()}${ext}`;

  const blob = await put(pathname, file, {
    access: "public",
    token: process.env.BLOB_READ_WRITE_TOKEN,
    contentType: file.type,
  });

  return { url: blob.url, pathname: blob.pathname };
}

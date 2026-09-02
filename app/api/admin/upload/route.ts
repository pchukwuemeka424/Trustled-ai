import { isBlogEditorAuthenticated } from "@/lib/admin-auth";
import { uploadImageToBlob } from "@/lib/vercel-blob";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!(await isBlogEditorAuthenticated())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const rawScope = String(formData.get("scope") ?? "content");

    if (!(file instanceof File)) {
      return Response.json({ error: "No file provided" }, { status: 400 });
    }

    const { url } = await uploadImageToBlob(file, rawScope);
    return Response.json({ ok: true, url });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to upload image";
    const status =
      message === "BLOB_READ_WRITE_TOKEN is not configured"
        ? 503
        : message === "Unsupported image format" || message === "Image must be 5MB or smaller"
          ? 400
          : 500;
    return Response.json({ error: message }, { status });
  }
}

export async function uploadAdminImage(file: File, scope: string): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("scope", scope);

  const response = await fetch("/api/admin/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const data = (await response.json().catch(() => ({}))) as { error?: string };
    throw new Error(data.error ?? "Upload failed");
  }

  const data = (await response.json()) as { url?: string };
  if (!data.url) {
    throw new Error("Upload failed");
  }

  return data.url;
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { slugify, type BlogPost, type BlogPostStatus } from "@/lib/blog-schema";

type BlogPostFormProps = {
  mode: "create" | "edit";
  initialPost?: BlogPost;
  originalSlug?: string;
  returnTo?: string;
};

const emptyPost: BlogPost = {
  slug: "",
  title: "",
  excerpt: "",
  content: "<p></p>",
  imageUrl: "",
  author: "Franklin Okeke",
  publishedAt: new Date().toISOString(),
  status: "draft",
};

export function BlogPostForm({
  mode,
  initialPost,
  originalSlug,
  returnTo = "/admin/blog",
}: BlogPostFormProps) {
  const router = useRouter();
  const [post, setPost] = useState<BlogPost>(initialPost ?? emptyPost);
  const [slugTouched, setSlugTouched] = useState(mode === "edit");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const suggestedSlug = useMemo(() => slugify(post.title), [post.title]);

  function updateField<K extends keyof BlogPost>(key: K, value: BlogPost[K]) {
    setPost((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const payload: BlogPost = {
      ...post,
      slug: slugify(post.slug || post.title),
      imageUrl: post.imageUrl.trim(),
      publishedAt: new Date(post.publishedAt).toISOString(),
    };

    const endpoint =
      mode === "create"
        ? "/api/admin/blog"
        : `/api/admin/blog/${encodeURIComponent(originalSlug ?? post.slug)}`;

    try {
      const response = await fetch(endpoint, {
        method: mode === "create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json().catch(() => ({}))) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Failed to save post");
      }

      router.push(returnTo);
      router.refresh();
    } catch (saveError) {
      setError(
        saveError instanceof Error ? saveError.message : "Failed to save post",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="form-card blog-admin-form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="blog-title">Title</label>
        <input
          id="blog-title"
          required
          value={post.title}
          onChange={(event) => {
            const title = event.target.value;
            setPost((current) => ({
              ...current,
              title,
              slug: slugTouched ? current.slug : slugify(title),
            }));
          }}
        />
      </div>

      <div className="field">
        <label htmlFor="blog-slug">Slug</label>
        <input
          id="blog-slug"
          required
          value={post.slug}
          onChange={(event) => {
            setSlugTouched(true);
            updateField("slug", slugify(event.target.value));
          }}
        />
        {!slugTouched && suggestedSlug ? (
          <p className="form-note">Suggested: {suggestedSlug}</p>
        ) : null}
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="blog-author">Author</label>
          <input
            id="blog-author"
            required
            value={post.author}
            onChange={(event) => updateField("author", event.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="blog-published-at">Published date</label>
          <input
            id="blog-published-at"
            required
            type="datetime-local"
            value={toLocalInputValue(post.publishedAt)}
            onChange={(event) =>
              updateField("publishedAt", new Date(event.target.value).toISOString())
            }
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="blog-status">Status</label>
        <select
          id="blog-status"
          value={post.status}
          onChange={(event) =>
            updateField("status", event.target.value as BlogPostStatus)
          }
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="blog-excerpt">Excerpt</label>
        <textarea
          id="blog-excerpt"
          required
          rows={3}
          value={post.excerpt}
          onChange={(event) => updateField("excerpt", event.target.value)}
        />
      </div>

      <ImageUploadField
        label="Featured image"
        value={post.imageUrl}
        onChange={(imageUrl) => updateField("imageUrl", imageUrl)}
        uploadScope="blog"
      />

      <div className="field">
        <label>Body</label>
        <RichTextEditor
          value={post.content}
          onChange={(content) => updateField("content", content)}
        />
      </div>

      {error ? <p className="form-error">{error}</p> : null}

      <div className="blog-admin-form-actions">
        <Link className="btn btn-ghost" href={returnTo}>
          Cancel
        </Link>
        <button type="submit" className="btn" disabled={isSubmitting}>
          {isSubmitting ? "Saving…" : mode === "create" ? "Create post" : "Save changes"}
        </button>
      </div>
    </form>
  );
}

function toLocalInputValue(iso: string) {
  const date = new Date(iso);
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60_000);
  return local.toISOString().slice(0, 16);
}

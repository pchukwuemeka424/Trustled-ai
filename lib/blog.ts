import "server-only";
import { getDatabase } from "@/lib/mongodb";
import {
  defaultBlogPosts,
  type BlogPost,
  type BlogPostRecord,
  type BlogPostStatus,
} from "@/lib/blog-schema";

type BlogPostDoc = BlogPost & {
  bodyHtml?: string;
  createdAt?: Date;
  updatedAt: Date;
};

type BlogPostDocWithId = BlogPostDoc & {
  _id?: unknown;
};

function getSlugFromDoc(doc: BlogPostDocWithId): string {
  if (typeof doc.slug === "string" && doc.slug.trim()) {
    return doc.slug.trim();
  }

  if (typeof doc._id === "string" && doc._id.trim()) {
    return doc._id.trim();
  }

  if (doc._id != null) {
    return String(doc._id);
  }

  return "";
}

function normalizePublishedAt(value: unknown): string {
  if (value instanceof Date) {
    return value.toISOString();
  }

  if (typeof value === "string" && !Number.isNaN(Date.parse(value))) {
    return new Date(value).toISOString();
  }

  return new Date().toISOString();
}

function toRecord(doc: BlogPostDocWithId): BlogPostRecord {
  const now = new Date();

  return {
    slug: getSlugFromDoc(doc),
    title: doc.title ?? "",
    excerpt: doc.excerpt ?? "",
    content: doc.content ?? doc.bodyHtml ?? "",
    imageUrl: typeof doc.imageUrl === "string" ? doc.imageUrl : "",
    author: doc.author ?? "TrustLed AI",
    publishedAt: normalizePublishedAt(doc.publishedAt),
    status: doc.status === "draft" ? "draft" : "published",
    createdAt: doc.createdAt ?? now,
    updatedAt: doc.updatedAt ?? now,
  };
}

function defaultRecords(): BlogPostRecord[] {
  const now = new Date();
  return defaultBlogPosts.map((post) => ({
    ...post,
    createdAt: now,
    updatedAt: now,
  }));
}

function sortByPublishedAt(posts: BlogPostRecord[]) {
  return [...posts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

function uniqueBySlug(posts: BlogPostRecord[]): BlogPostRecord[] {
  const seen = new Set<string>();

  return posts.filter((post) => {
    const key = post.slug || `${post.publishedAt}-${post.title}`;
    if (!key || seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

function docFilter(doc: BlogPostDocWithId, slug: string) {
  if (typeof doc._id === "string") {
    return { _id: doc._id } as never;
  }

  if (typeof doc.slug === "string" && doc.slug.trim()) {
    return { slug: doc.slug };
  }

  return { _id: slug } as never;
}

async function findBlogPostDoc(slug: string) {
  const db = await getDatabase();
  const collection = db.collection<BlogPostDocWithId>("blog_posts");
  const bySlug = await collection.findOne({ slug });
  if (bySlug) {
    return bySlug;
  }
  return collection.findOne({ _id: slug } as never);
}

async function ensureDefaultPosts() {
  const db = await getDatabase();
  const collection = db.collection<BlogPostDocWithId>("blog_posts");
  const count = await collection.countDocuments();

  if (count > 0) {
    return;
  }

  const now = new Date();
  await collection.insertMany(
    defaultBlogPosts.map((post) => ({
      _id: post.slug,
      ...post,
      bodyHtml: post.content,
      createdAt: now,
      updatedAt: now,
    })) as never,
  );
}

export async function listPublishedBlogPosts(): Promise<BlogPostRecord[]> {
  try {
    await ensureDefaultPosts();
    const db = await getDatabase();
    const collection = db.collection<BlogPostDocWithId>("blog_posts");
    const docs = await collection
      .find({ status: "published" })
      .sort({ publishedAt: -1 })
      .toArray();

    return uniqueBySlug(docs.map(toRecord));
  } catch {
    return sortByPublishedAt(
      defaultRecords().filter((post) => post.status === "published"),
    );
  }
}

export async function listAllBlogPosts(): Promise<BlogPostRecord[]> {
  try {
    await ensureDefaultPosts();
    const db = await getDatabase();
    const collection = db.collection<BlogPostDocWithId>("blog_posts");
    const docs = await collection.find({}).sort({ publishedAt: -1 }).toArray();
    return uniqueBySlug(docs.map(toRecord));
  } catch {
    return sortByPublishedAt(defaultRecords());
  }
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPostRecord | null> {
  try {
    await ensureDefaultPosts();
    const db = await getDatabase();
    const collection = db.collection<BlogPostDocWithId>("blog_posts");
    const doc = await findBlogPostDoc(slug);

    if (!doc) {
      return null;
    }

    return toRecord(doc);
  } catch {
    return defaultRecords().find((post) => post.slug === slug) ?? null;
  }
}

export async function getPublishedBlogPostBySlug(
  slug: string,
): Promise<BlogPostRecord | null> {
  const post = await getBlogPostBySlug(slug);

  if (!post || post.status !== "published") {
    return null;
  }

  return post;
}

export async function createBlogPost(post: BlogPost): Promise<BlogPostRecord> {
  const db = await getDatabase();
  const collection = db.collection<BlogPostDocWithId>("blog_posts");
  const existing = await findBlogPostDoc(post.slug);

  if (existing) {
    throw new Error("A post with this slug already exists");
  }

  const now = new Date();
  const doc: BlogPostDocWithId = {
    _id: post.slug,
    ...post,
    bodyHtml: post.content,
    createdAt: now,
    updatedAt: now,
  };

  await collection.insertOne(doc as never);
  return toRecord(doc);
}

export async function updateBlogPost(
  slug: string,
  post: BlogPost,
): Promise<BlogPostRecord | null> {
  const db = await getDatabase();
  const collection = db.collection<BlogPostDocWithId>("blog_posts");
  const existing = await findBlogPostDoc(slug);

  if (!existing) {
    return null;
  }

  const now = new Date();
  const oldSlug = getSlugFromDoc(existing);

  if (post.slug !== oldSlug) {
    const conflict = await findBlogPostDoc(post.slug);
    if (conflict) {
      throw new Error("A post with this slug already exists");
    }

    await collection.deleteOne(docFilter(existing, oldSlug));
    const doc: BlogPostDocWithId = {
      _id: post.slug,
      ...post,
      bodyHtml: post.content,
      createdAt: existing.createdAt ?? now,
      updatedAt: now,
    };

    await collection.insertOne(doc as never);
    return toRecord(doc);
  }

  const result = await collection.findOneAndUpdate(
    docFilter(existing, slug),
    {
      $set: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        bodyHtml: post.content,
        imageUrl: post.imageUrl,
        author: post.author,
        publishedAt: post.publishedAt,
        status: post.status,
        updatedAt: now,
      },
    },
    { returnDocument: "after" },
  );

  if (!result) {
    return null;
  }

  return toRecord(result);
}

export async function deleteBlogPost(slug: string): Promise<boolean> {
  const db = await getDatabase();
  const collection = db.collection<BlogPostDocWithId>("blog_posts");
  const existing = await findBlogPostDoc(slug);

  if (!existing) {
    return false;
  }

  const result = await collection.deleteOne(docFilter(existing, slug));
  return result.deletedCount === 1;
}

export function blogPostSummary(post: BlogPostRecord) {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    imageUrl: post.imageUrl,
    author: post.author,
    publishedAt: post.publishedAt,
    status: post.status as BlogPostStatus,
  };
}

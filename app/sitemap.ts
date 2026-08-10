import type { MetadataRoute } from "next";
import { listPublishedBlogPosts } from "@/lib/blog";
import { listCustomPages } from "@/lib/custom-pages";
import { getSiteUrl } from "@/lib/site-url";

export const dynamic = "force-dynamic";

const STATIC_ROUTES: Array<{
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/services", changeFrequency: "monthly", priority: 0.9 },
  { path: "/solutions", changeFrequency: "monthly", priority: 0.9 },
  { path: "/education", changeFrequency: "monthly", priority: 0.8 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${base}${route.path === "/" ? "" : route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const [posts, customPages] = await Promise.all([
    listPublishedBlogPosts(),
    listCustomPages(),
  ]);

  const blogEntries: MetadataRoute.Sitemap = posts
    .filter((post) => Boolean(post.slug))
    .map((post) => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: post.updatedAt ?? new Date(post.publishedAt),
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  const customEntries: MetadataRoute.Sitemap = customPages
    .filter((page) => page.status === "published" && Boolean(page.slug))
    .map((page) => ({
      url: `${base}/${page.slug}`,
      lastModified: page.updatedAt ?? now,
      changeFrequency: "monthly",
      priority: 0.5,
    }));

  return [...staticEntries, ...blogEntries, ...customEntries];
}

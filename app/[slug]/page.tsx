import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CustomPageView } from "@/components/content/custom-page-view";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  getCustomPage,
  getPublishedCustomPage,
} from "@/lib/custom-pages";
import { RESERVED_PAGE_SLUGS } from "@/lib/custom-pages-schema";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (RESERVED_PAGE_SLUGS.has(slug)) return {};

  const isAdmin = await isAdminAuthenticated();
  const page = isAdmin
    ? await getCustomPage(slug)
    : await getPublishedCustomPage(slug);

  if (!page) return {};
  return {
    title: page.title,
    description: page.heroLede.slice(0, 160),
  };
}

export default async function DynamicCustomPage({ params }: PageProps) {
  const { slug } = await params;

  if (RESERVED_PAGE_SLUGS.has(slug)) {
    notFound();
  }

  const isAdmin = await isAdminAuthenticated();
  const page = isAdmin
    ? await getCustomPage(slug)
    : await getPublishedCustomPage(slug);

  if (!page) {
    notFound();
  }

  return <CustomPageView page={page} />;
}

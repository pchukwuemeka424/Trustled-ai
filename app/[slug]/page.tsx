import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CustomPageView } from "@/components/content/custom-page-view";
import { isSiteAdminAuthenticated } from "@/lib/admin-auth";
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

  const isAdmin = await isSiteAdminAuthenticated();
  const page = isAdmin
    ? await getCustomPage(slug)
    : await getPublishedCustomPage(slug);

  if (!page) return {};

  const description = page.heroLede.slice(0, 160);
  const url = `/${page.slug}`;

  return {
    title: page.title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: page.title,
      description,
      url,
    },
  };
}

export default async function DynamicCustomPage({ params }: PageProps) {
  const { slug } = await params;

  if (RESERVED_PAGE_SLUGS.has(slug)) {
    notFound();
  }

  const isAdmin = await isSiteAdminAuthenticated();
  const page = isAdmin
    ? await getCustomPage(slug)
    : await getPublishedCustomPage(slug);

  if (!page) {
    notFound();
  }

  return <CustomPageView page={page} />;
}

import type { Metadata } from "next";
import { AboutContentView } from "@/components/content/about-content-view";
import { LiveEditShell } from "@/components/live-edit/live-edit-shell";
import { isSiteAdminAuthenticated } from "@/lib/admin-auth";
import { getPageContent } from "@/lib/page-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About",
  description:
    "TrustLed AI combines AI governance advisory, AI-powered software and automation, and professional training to help organisations adopt AI responsibly.",
  alternates: {
    canonical: "/about",
  },
};

type AboutPageProps = {
  searchParams: Promise<{ edit?: string }>;
};

export default async function AboutPage({ searchParams }: AboutPageProps) {
  const params = await searchParams;
  const [content, isAdmin] = await Promise.all([
    getPageContent("about"),
    isSiteAdminAuthenticated(),
  ]);

  return (
    <LiveEditShell
      page="about"
      isAdmin={isAdmin}
      initialContent={content}
      startEditing={isAdmin && params.edit === "1"}
    >
      <AboutContentView />
    </LiveEditShell>
  );
}

import type { Metadata } from "next";
import { AboutContentView } from "@/components/content/about-content-view";
import { LiveEditShell } from "@/components/live-edit/live-edit-shell";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getPageContent } from "@/lib/page-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About",
  description:
    "TrustLed AI is a UK AI governance advisory firm helping schools, trusts, universities, and SMEs adopt AI responsibly.",
};

type AboutPageProps = {
  searchParams: Promise<{ edit?: string }>;
};

export default async function AboutPage({ searchParams }: AboutPageProps) {
  const params = await searchParams;
  const [content, isAdmin] = await Promise.all([
    getPageContent("about"),
    isAdminAuthenticated(),
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

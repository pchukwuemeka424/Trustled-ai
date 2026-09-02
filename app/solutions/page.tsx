import type { Metadata } from "next";
import { SolutionsContentView } from "@/components/content/solutions-content-view";
import { LiveEditShell } from "@/components/live-edit/live-edit-shell";
import { isSiteAdminAuthenticated } from "@/lib/admin-auth";
import { getPageContent } from "@/lib/page-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "GARIL AI and ASAT — governed AI products that embed accountability, privacy, security and responsible AI into everyday work.",
  alternates: {
    canonical: "/solutions",
  },
};

type SolutionsPageProps = {
  searchParams: Promise<{ edit?: string }>;
};

export default async function SolutionsPage({ searchParams }: SolutionsPageProps) {
  const params = await searchParams;
  const [content, isAdmin] = await Promise.all([
    getPageContent("solutions"),
    isSiteAdminAuthenticated(),
  ]);

  return (
    <LiveEditShell
      page="solutions"
      isAdmin={isAdmin}
      initialContent={content}
      startEditing={isAdmin && params.edit === "1"}
    >
      <SolutionsContentView />
    </LiveEditShell>
  );
}

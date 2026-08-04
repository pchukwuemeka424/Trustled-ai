import type { Metadata } from "next";
import { EducationContentView } from "@/components/content/education-content-view";
import { LiveEditShell } from "@/components/live-edit/live-edit-shell";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getPageContent } from "@/lib/page-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Training",
  description:
    "AI Literacy Workshops and the AI GRC Practitioner Training Programme for organisations and professionals building practical AI capability.",
};

type EducationPageProps = {
  searchParams: Promise<{ edit?: string }>;
};

export default async function EducationPage({ searchParams }: EducationPageProps) {
  const params = await searchParams;
  const [content, isAdmin] = await Promise.all([
    getPageContent("education"),
    isAdminAuthenticated(),
  ]);

  return (
    <LiveEditShell
      page="education"
      isAdmin={isAdmin}
      initialContent={content}
      startEditing={isAdmin && params.edit === "1"}
    >
      <EducationContentView />
    </LiveEditShell>
  );
}

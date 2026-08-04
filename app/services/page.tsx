import type { Metadata } from "next";
import { ServicesContentView } from "@/components/content/services-content-view";
import { LiveEditShell } from "@/components/live-edit/live-edit-shell";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getPageContent } from "@/lib/page-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI Governance Advisory and AI Solutions & Automation Services that help organisations harness AI securely and meet regulatory obligations.",
};

type ServicesPageProps = {
  searchParams: Promise<{ edit?: string }>;
};

export default async function ServicesPage({ searchParams }: ServicesPageProps) {
  const params = await searchParams;
  const [content, isAdmin] = await Promise.all([
    getPageContent("services"),
    isAdminAuthenticated(),
  ]);

  return (
    <LiveEditShell
      page="services"
      isAdmin={isAdmin}
      initialContent={content}
      startEditing={isAdmin && params.edit === "1"}
    >
      <ServicesContentView />
    </LiveEditShell>
  );
}

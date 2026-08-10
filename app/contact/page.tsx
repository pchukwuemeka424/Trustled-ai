import type { Metadata } from "next";
import { ContactContentView } from "@/components/content/contact-content-view";
import { LiveEditShell } from "@/components/live-edit/live-edit-shell";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getPageContent } from "@/lib/page-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact TrustLed AI. A 30-minute conversation will usually tell us both whether we can help.",
  alternates: {
    canonical: "/contact",
  },
};

type ContactPageProps = {
  searchParams: Promise<{ edit?: string }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const [content, isAdmin] = await Promise.all([
    getPageContent("contact"),
    isAdminAuthenticated(),
  ]);

  return (
    <LiveEditShell
      page="contact"
      isAdmin={isAdmin}
      initialContent={content}
      startEditing={isAdmin && params.edit === "1"}
    >
      <ContactContentView />
    </LiveEditShell>
  );
}

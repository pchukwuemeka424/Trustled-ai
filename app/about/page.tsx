import type { Metadata } from "next";
import { AboutContentView } from "@/components/content/about-content-view";
import { LiveEditShell } from "@/components/live-edit/live-edit-shell";
import { isSiteAdminAuthenticated } from "@/lib/admin-auth";
import { getPageContent } from "@/lib/page-content";
import { aboutPageJsonLd } from "@/lib/seo-json-ld";
import { teamMemberNamesForSeo, teamMembers } from "@/lib/team-members";

export const dynamic = "force-dynamic";

const teamSeoLine = teamMembers
  .map((member) => `${member.name}, ${member.role}`)
  .join("; ");

export const metadata: Metadata = {
  title: "About",
  description: `Meet the TrustLed AI team — ${teamSeoLine}. AI governance advisory, AI-powered software and automation, and professional training for responsible AI adoption.`,
  keywords: [
    "TrustLed AI",
    ...teamMembers.map((member) => member.name),
    "AI Governance",
    "AI Engineering",
    "Research & Scientific Advisory",
  ],
  authors: [
    { name: "TrustLed AI Ltd" },
    ...teamMembers.map((member) => ({ name: member.name })),
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About TrustLed AI",
    description: `Leadership: ${teamMemberNamesForSeo()}. Governing AI. Building what's next.`,
    url: "/about",
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
  const jsonLd = aboutPageJsonLd();

  return (
    <LiveEditShell
      page="about"
      isAdmin={isAdmin}
      initialContent={content}
      startEditing={isAdmin && params.edit === "1"}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutContentView />
    </LiveEditShell>
  );
}

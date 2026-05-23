import type { Metadata } from "next";
import { HomeContentView } from "@/components/content/home-content-view";
import { LiveEditShell } from "@/components/live-edit/live-edit-shell";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getHomeContent } from "@/lib/home-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "TrustLed AI — Adopt AI responsibly, and prove it",
  description:
    "AI governance assessment, shadow AI detection, and training for schools, universities, and regulated SMEs.",
};

type HomePageProps = {
  searchParams: Promise<{ edit?: string }>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const [content, isAdmin] = await Promise.all([
    getHomeContent(),
    isAdminAuthenticated(),
  ]);

  return (
    <LiveEditShell
      page="home"
      isAdmin={isAdmin}
      initialContent={content}
      startEditing={isAdmin && params.edit === "1"}
    >
      <HomeContentView />
    </LiveEditShell>
  );
}

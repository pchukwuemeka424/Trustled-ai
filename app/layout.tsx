import { Fraunces, Spline_Sans } from "next/font/google";
import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SiteEffects } from "@/components/SiteEffects";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getSiteNav } from "@/lib/site-nav";
import { getSiteSettings } from "@/lib/site-settings";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const splineSans = Spline_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "TrustLed AI — Adopt AI responsibly, and prove it",
    template: "%s — TrustLed AI",
  },
  description:
    "AI governance assessment, shadow AI detection, and training for schools, universities, and regulated SMEs.",
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [settings, navItems, isAdmin] = await Promise.all([
    getSiteSettings(),
    getSiteNav(),
    isAdminAuthenticated(),
  ]);

  return (
    <html
      lang="en-GB"
      className={`${fraunces.variable} ${splineSans.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <Link className="skip-link" href="#main">
          Skip to content
        </Link>
        <Header
          initialLogoUrl={settings.logoUrl}
          initialLogoAlt={settings.logoAlt}
          isAdmin={isAdmin}
          navItems={navItems}
        />
        <main id="main">{children}</main>
        <Footer settings={settings} />
        <SiteEffects />
      </body>
    </html>
  );
}

import { Roboto } from "next/font/google";
import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SiteEffects } from "@/components/SiteEffects";
import { isSiteAdminAuthenticated } from "@/lib/admin-auth";
import { getSiteNav } from "@/lib/site-nav";
import { getSiteSettings } from "@/lib/site-settings";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-body",
  display: "swap",
});

const siteUrl = getSiteUrl();
const siteName = "TrustLed AI";
const defaultTitle = "TrustLed AI — Adopt AI responsibly, and prove it";
const defaultDescription =
  "AI governance advisory, AI solutions and automation, and professional training that help organisations harness AI securely and meet regulatory obligations.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s — ${siteName}`,
  },
  description: defaultDescription,
  applicationName: siteName,
  authors: [{ name: "TrustLed AI Ltd" }],
  creator: siteName,
  publisher: "TrustLed AI Ltd",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName,
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: "/images/hero-ai.jpg",
        alt: "TrustLed AI — govern, automate, and advance with responsible AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/images/hero-ai.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = (await headers()).get("x-pathname") ?? "";
  const isAdminApp = pathname.startsWith("/admin");

  if (isAdminApp) {
    return (
      <html
        lang="en-GB"
        className={roboto.variable}
        suppressHydrationWarning
      >
        <body className="admin-body" suppressHydrationWarning>
          <Link className="skip-link" href="#main">
            Skip to content
          </Link>
          <main id="main">{children}</main>
        </body>
      </html>
    );
  }

  const [settings, navItems, isAdmin] = await Promise.all([
    getSiteSettings(),
    getSiteNav(),
    isSiteAdminAuthenticated(),
  ]);

  return (
    <html
      lang="en-GB"
      className={roboto.variable}
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

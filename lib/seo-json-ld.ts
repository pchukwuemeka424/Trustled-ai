import { getSiteUrl } from "@/lib/site-url";
import { teamMembers } from "@/lib/team-members";

export function organizationJsonLd() {
  const base = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TrustLed AI",
    legalName: "TrustLed AI Ltd",
    url: base,
    logo: `${base}/favicon.png`,
    email: "hello@trustledai.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Liverpool",
      addressCountry: "GB",
    },
    employee: teamMembers.map((member) => ({
      "@type": "Person",
      name: member.name,
      jobTitle: member.role,
      worksFor: {
        "@type": "Organization",
        name: "TrustLed AI",
      },
      description: member.bio,
      url: `${base}/about`,
    })),
  };
}

export function aboutPageJsonLd() {
  const base = getSiteUrl();
  const organization = organizationJsonLd();

  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About TrustLed AI",
    url: `${base}/about`,
    description:
      "TrustLed AI combines AI governance advisory, AI-powered software and automation, and professional training to help organisations adopt AI responsibly.",
    mainEntity: organization,
  };
}

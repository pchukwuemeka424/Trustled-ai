export type SiteSettings = Record<string, string>;

export const defaultSiteSettings: SiteSettings = {
  logoUrl: "",
  logoAlt: "TrustLed AI",
  footerTagline: "Assess. Automate. Advance.",
  footerRegistration:
    "TrustLed AI Ltd is registered in England and Wales. Liverpool, United Kingdom.",
  footerDisclaimer:
    "TrustLed AI is an advisory firm and does not provide legal advice.",
  footerServicesHeading: "Services",
  footerService1Label: "AI Governance Advisory",
  footerService1Href: "/services#advisory",
  footerService2Label: "Shadow AI Detection",
  footerService2Href: "/services#shadow",
  footerService3Label: "AI Automation Services",
  footerService3Href: "/services#automation",
  footerMoreHeading: "More",
  footerMore1Label: "ASAT",
  footerMore1Href: "/solutions",
  footerMore2Label: "Education & Training",
  footerMore2Href: "/education",
  footerMore3Label: "About",
  footerMore3Href: "/about",
  footerMore4Label: "Blog",
  footerMore4Href: "/blog",
  footerContactHeading: "Contact",
  footerContact1Label: "hello@trustledai.com",
  footerContact1Href: "mailto:hello@trustledai.com",
  footerContact2Label: "partner@trustledai.com",
  footerContact2Href: "mailto:partner@trustledai.com",
  footerContact3Label: "Start a conversation",
  footerContact3Href: "/contact",
  footerCopyright: "\u00a9 2026 TrustLed AI Ltd. All rights reserved.",
};

export function getSiteSettingsFieldKeys(): string[] {
  return Object.keys(defaultSiteSettings);
}

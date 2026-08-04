export type SiteSettings = Record<string, string>;

export const defaultSiteSettings: SiteSettings = {
  logoUrl: "",
  logoAlt: "TrustLed AI",
  footerTagline: "Govern. Automate. Advance.",
  footerRegistration:
    "TrustLed AI Ltd is registered in England and Wales. Liverpool, United Kingdom.",
  footerDisclaimer:
    "TrustLed AI is an advisory firm and does not provide legal advice.",
  footerServicesHeading: "Services",
  footerService1Label: "AI Governance Advisory",
  footerService1Href: "/services#advisory",
  footerService2Label: "AI Solutions & Automation",
  footerService2Href: "/services#automation",
  footerService3Label: "Training",
  footerService3Href: "/education",
  footerMoreHeading: "More",
  footerMore1Label: "GARIL AI",
  footerMore1Href: "/solutions#garil",
  footerMore2Label: "ASAT",
  footerMore2Href: "/solutions#asat",
  footerMore3Label: "About",
  footerMore3Href: "/about",
  footerMore4Label: "Contact",
  footerMore4Href: "/contact",
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

export type SiteSettings = Record<string, string>;

export const defaultSiteSettings: SiteSettings = {
  logoUrl: "",
  logoAlt: "TrustLed AI",
};

export function getSiteSettingsFieldKeys(): string[] {
  return Object.keys(defaultSiteSettings);
}

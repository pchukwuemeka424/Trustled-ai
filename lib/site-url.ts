/**
 * Absolute site origin for SEO (sitemap, robots, metadataBase).
 * Prefer NEXT_PUBLIC_SITE_URL in production (e.g. https://trustledai.com).
 */
export function getSiteUrl(): string {
  const configured =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.SITE_URL?.trim() ||
    process.env.URL?.trim();

  if (configured) {
    return stripTrailingSlash(ensureProtocol(configured));
  }

  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelProduction) {
    return stripTrailingSlash(ensureProtocol(vercelProduction));
  }

  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl) {
    return stripTrailingSlash(ensureProtocol(vercelUrl));
  }

  return "https://trustledai.com";
}

function ensureProtocol(value: string): string {
  if (/^https?:\/\//i.test(value)) {
    return value;
  }
  return `https://${value}`;
}

function stripTrailingSlash(value: string): string {
  return value.replace(/\/+$/, "");
}

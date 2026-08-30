const LOCAL_SITE_URL = "http://localhost:3000";
export const CANONICAL_SITE_URL = "https://www.pifa.studio";

function normalizeSiteUrl(value: string): string {
  const trimmed = value.trim().replace(/\/$/, "");
  if (!trimmed) return trimmed;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  if (fromEnv) {
    const url = normalizeSiteUrl(fromEnv);
    if (url) return url;
  }

  if (process.env.NODE_ENV === "development") {
    return LOCAL_SITE_URL;
  }

  return CANONICAL_SITE_URL;
}

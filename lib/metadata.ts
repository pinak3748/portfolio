import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site";

export const SITE_NAME = "Pinak Faldu";
export const DEFAULT_TITLE =
  "Pinak Faldu — Product Designer and Engineer for SaaS";
export const DEFAULT_DESCRIPTION =
  "Product designer and engineer building SaaS, mobile apps, and AI-powered tools. Selected work, experiments, and writing.";

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalized}`;
}

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
};

export function createPageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
}: PageMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image ? absoluteUrl(image) : undefined;
  const isHome = path === "/";

  return {
    title: isHome ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type,
      ...(ogImage ? { images: [{ url: ogImage, alt: title }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export function rootMetadata(): Metadata {
  const url = absoluteUrl("/");

  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: DEFAULT_TITLE,
      template: "%s — Pinak Faldu",
    },
    description: DEFAULT_DESCRIPTION,
    icons: {
      icon: [
        { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
        { url: "/favicon.svg", type: "image/svg+xml" },
      ],
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
    openGraph: {
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
    },
  };
}

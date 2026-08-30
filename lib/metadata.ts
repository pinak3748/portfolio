import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site";

export const SITE_NAME = "Pinak Faldu";
export const DEFAULT_DESCRIPTION =
  "Product designer and engineer building SaaS platforms, mobile apps, and AI-powered tools. Work, experiments, and writing from Pinak Faldu.";

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

  return {
    title,
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
  const title = "Pinak Faldu";

  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: title,
      template: "%s",
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
      title,
      description: DEFAULT_DESCRIPTION,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: DEFAULT_DESCRIPTION,
    },
  };
}

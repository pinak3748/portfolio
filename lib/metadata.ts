import { getSiteUrl } from "@/lib/site";
import type { Metadata } from "next";

export const SITE_NAME = "Pinak Faldu";
export const DEFAULT_DESCRIPTION =
  "Product designer and engineer building SaaS platforms, mobile apps, and AI-powered tools. Work, experiments, and writing from Pinak Faldu.";
export const DEFAULT_OG_IMAGE = "/assets/personal.png";

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
  image = DEFAULT_OG_IMAGE,
  type = "website",
}: PageMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const ogImage = absoluteUrl(image);

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
      images: [{ url: ogImage, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export function rootMetadata(): Metadata {
  const url = absoluteUrl("/");
  const ogImage = absoluteUrl(DEFAULT_OG_IMAGE);
  const title = "Pinak Faldu";

  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: title,
      template: "%s",
    },
    description: DEFAULT_DESCRIPTION,
    openGraph: {
      title,
      description: DEFAULT_DESCRIPTION,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
      images: [{ url: ogImage, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: DEFAULT_DESCRIPTION,
      images: [ogImage],
    },
  };
}

import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/blog.server";
import { getCompanies } from "@/lib/case-studies";
import { getMobileApps } from "@/lib/mobile-apps";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const lastModified = new Date();

  const workEntries = getCompanies().flatMap((company) =>
    company.projects.map((project) => ({
      url: `${base}/work/${project.id}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  );

  const mobileEntries = getMobileApps().map((app) => ({
    url: `${base}/mobile/${app.id}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogEntries = getBlogPosts().map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: base,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...workEntries,
    ...mobileEntries,
    ...blogEntries,
  ];
}

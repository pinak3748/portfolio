import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import "server-only";
import { getBlogHeadings } from "@/lib/blog-headings";
import type { BlogPost, BlogPostListing } from "@/lib/blog-types";

const BLOG_DIR = path.join(process.cwd(), "content/blog");
const BLOG_EXTENSION = ".mdx";

function parseDate(value: unknown): string {
  if (typeof value === "string") return value;
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return "";
}

function parseString(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

function parseTags(data: Record<string, unknown>): string[] | undefined {
  const value = data.tags ?? data.tag;
  if (!Array.isArray(value)) return undefined;

  const tags = value.filter((item): item is string => typeof item === "string");
  return tags.length > 0 ? tags : undefined;
}

function parseListingData(
  slug: string,
  data: Record<string, unknown>,
): BlogPostListing {
  return {
    slug,
    title: parseString(data.title) ?? slug,
    description:
      parseString(data.description) ?? parseString(data.summary) ?? undefined,
    date: parseDate(data.date ?? data.publishedAt),
    tags: parseTags(data),
  };
}

function readMdxFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((filename) => filename.endsWith(BLOG_EXTENSION));
}

function parseListing(filename: string): BlogPostListing {
  const slug = filename.replace(/\.mdx$/, "");
  const filePath = path.join(BLOG_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data } = matter(raw);

  return parseListingData(slug, data);
}

export function getBlogPosts(): BlogPostListing[] {
  return readMdxFiles()
    .map(parseListing)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getBlogPost(slug: string): BlogPost | undefined {
  const filePath = path.join(BLOG_DIR, `${slug}${BLOG_EXTENSION}`);
  if (!fs.existsSync(filePath)) return undefined;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    ...parseListingData(slug, data),
    content,
    headings: getBlogHeadings(content),
  };
}

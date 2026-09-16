import type { BlogHeading } from "@/lib/blog-types";

const HEADING_PATTERN = /^(#{2,3})[ \t]+(.+?)(?:[ \t]+#+)?[ \t]*$/;

function plainText(value: string) {
  return value
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]*>/g, "")
    .replace(/[`*_~]/g, "")
    .replace(/\\([\\`*{}[\]()#+\-.!_>])/g, "$1")
    .trim();
}

function slugify(value: string) {
  const slug = value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || "section";
}

export function getBlogHeadings(content: string): BlogHeading[] {
  const headings: BlogHeading[] = [];
  const usedIds = new Map<string, number>();
  let fenceCharacter: "`" | "~" | null = null;
  let fenceLength = 0;

  for (const line of content.split(/\r?\n/)) {
    if (fenceCharacter) {
      const closingFence = new RegExp(
        `^\\s{0,3}${fenceCharacter}{${fenceLength},}\\s*$`,
      );

      if (closingFence.test(line)) {
        fenceCharacter = null;
        fenceLength = 0;
      }

      continue;
    }

    const fence = line.match(/^\s{0,3}([`~])\1{2,}/);
    if (fence) {
      fenceCharacter = fence[1] as "`" | "~";
      fenceLength = fence[0].trim().length;
      continue;
    }

    const match = line.match(HEADING_PATTERN);
    if (!match) continue;

    const title = plainText(match[2]);
    if (!title) continue;

    const baseId = slugify(title);
    const occurrence = (usedIds.get(baseId) ?? 0) + 1;
    usedIds.set(baseId, occurrence);

    headings.push({
      id: occurrence === 1 ? baseId : `${baseId}-${occurrence}`,
      title,
      level: match[1].length as 2 | 3,
    });
  }

  return headings;
}

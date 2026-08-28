export type BlogPostListing = {
  slug: string;
  title: string;
  description?: string;
  date: string;
  tags?: string[];
};

export type BlogPost = BlogPostListing & {
  content: string;
};

export function formatBlogDate(date: string): string {
  if (!date) return "";

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
}

export const BLOG_INITIAL_VISIBLE = 3;

export function getBlogListStaggerItemCount(
  postCount: number,
  collapsed = true,
) {
  if (postCount === 0) return 0;

  const visibleRows = collapsed
    ? Math.min(BLOG_INITIAL_VISIBLE, postCount)
    : postCount;
  const hasMore = postCount > BLOG_INITIAL_VISIBLE;

  return 1 + visibleRows + (collapsed && hasMore ? 1 : 0);
}

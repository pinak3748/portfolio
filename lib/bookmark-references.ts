import data from "@/public/data/bookmark-reference.json";

export type BookmarkVisibility = "public" | "private";

export type BookmarkItem = {
  id: string;
  name: string;
  description: string;
  category: string;
  url: string;
  favicon: string;
  visibility: BookmarkVisibility;
};

export type BookmarkReferenceData = {
  meta: {
    title: string;
    description: string;
    version: number;
    categories: string[];
  };
  items: BookmarkItem[];
};

const bookmarkData = data as BookmarkReferenceData;
const PRIVATE_CATEGORY = "Private";

export function getBookmarkItems(): BookmarkItem[] {
  return bookmarkData.items.filter(
    (item) =>
      item.visibility === "public" && item.category !== PRIVATE_CATEGORY,
  );
}

export function getBookmarkCategories(): string[] {
  const present = new Set(getBookmarkItems().map((item) => item.category));
  return bookmarkData.meta.categories.filter((category) =>
    present.has(category),
  );
}

export function getBookmarkMeta() {
  return bookmarkData.meta;
}

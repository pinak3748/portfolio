import type { Metadata } from "next";
import Link from "next/link";
import { BookmarkCollection } from "@/components/bookmark-collection";
import {
  getBookmarkCategories,
  getBookmarkItems,
  getBookmarkMeta,
} from "@/lib/bookmark-references";
import { createPageMetadata } from "@/lib/metadata";

const meta = getBookmarkMeta();

export const metadata: Metadata = createPageMetadata({
  title: "Design References",
  description: meta.description,
  path: "/references",
});

export default function ReferencesPage() {
  const items = getBookmarkItems();
  const categories = getBookmarkCategories();

  return (
    <main className="mx-auto max-w-173 px-6 py-12 leading-relaxed sm:py-24">
      <Link
        href="/"
        className="mb-8 inline-block text-gray-1000 no-underline hover:text-gray-1200 hover:underline"
      >
        Home
      </Link>

      <h1 className="font-medium text-gray-1200 leading-snug">
        Design References
      </h1>
      <p className="mt-2 text-gray-1100 leading-relaxed">{meta.description}</p>

      <BookmarkCollection items={items} categories={categories} />
    </main>
  );
}

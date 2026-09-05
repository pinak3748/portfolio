"use client";

import { useState } from "react";
import { RedirectIcon } from "@/components/icons";
import type { BookmarkItem } from "@/lib/bookmark-references";

const INITIAL_VISIBLE = 12;
const ALL_CATEGORY = "All";

function pillClassName(active: boolean) {
  return `inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-[0.8125rem] leading-relaxed transition-colors duration-160 ease-[var(--ease-out)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-1200 ${
    active
      ? "bg-gray-1200 text-gray-100"
      : "bg-gray-100 text-gray-1100 hover:bg-gray-200 hover:text-gray-1200"
  }`;
}

function BookmarkCard({ item }: { item: BookmarkItem }) {
  return (
    <li>
      <a
        href={item.url}
        target="_blank"
        rel="noreferrer"
        className="group flex h-full items-start gap-3 rounded-md p-3 no-underline shadow-[0_0_0_1px_color-mix(in_srgb,var(--color-gray-1200)_8%,transparent)] transition-colors duration-160 ease-[var(--ease-out)] hover:bg-gray-100 focus-visible:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-1200"
      >
        {/** biome-ignore lint/performance/noImgElement: favicon host isn't in next.config's image remote patterns */}
        <img
          src={item.favicon}
          alt=""
          width={20}
          height={20}
          className="mt-0.5 size-5 shrink-0 rounded-sm"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="truncate text-[0.9375rem] font-medium leading-6 text-gray-1200">
              {item.name}
            </span>
            <span className="work-redirect shrink-0 text-gray-800">
              <RedirectIcon className="size-3 rotate-45" />
            </span>
          </div>
          <p className="mt-0.5 line-clamp-2 text-gray-1100 leading-relaxed text-sm">
            {item.description}
          </p>
        </div>
      </a>
    </li>
  );
}

export function BookmarkCollection({
  items,
  categories,
}: {
  items: BookmarkItem[];
  categories: string[];
}) {
  const [selectedCategory, setSelectedCategory] =
    useState<string>(ALL_CATEGORY);
  const [expanded, setExpanded] = useState(false);

  if (items.length === 0) return null;

  const counts = new Map<string, number>();
  for (const item of items) {
    counts.set(item.category, (counts.get(item.category) ?? 0) + 1);
  }

  const visibleItems =
    selectedCategory === ALL_CATEGORY
      ? items
      : items.filter((item) => item.category === selectedCategory);

  const hasMore = visibleItems.length > INITIAL_VISIBLE;
  const shownItems = expanded
    ? visibleItems
    : visibleItems.slice(0, INITIAL_VISIBLE);
  const hiddenCount = visibleItems.length - INITIAL_VISIBLE;

  function selectCategory(category: string) {
    setSelectedCategory(category);
    setExpanded(false);
  }

  return (
    <div className="mt-10">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          aria-pressed={selectedCategory === ALL_CATEGORY}
          onClick={() => selectCategory(ALL_CATEGORY)}
          className={pillClassName(selectedCategory === ALL_CATEGORY)}
        >
          All ({items.length})
        </button>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={selectedCategory === category}
            onClick={() => selectCategory(category)}
            className={pillClassName(selectedCategory === category)}
          >
            {category} ({counts.get(category) ?? 0})
          </button>
        ))}
      </div>

      {visibleItems.length === 0 ? (
        <p className="mt-6 text-gray-1000 leading-relaxed">
          No references in this category yet.
        </p>
      ) : (
        <ul className="mt-6 grid list-none grid-cols-1 gap-2 p-0 sm:grid-cols-2 lg:grid-cols-2">
          {shownItems.map((item) => (
            <BookmarkCard key={item.id} item={item} />
          ))}
        </ul>
      )}

      {hasMore ? (
        <button
          type="button"
          onClick={() => setExpanded((open) => !open)}
          className="mt-3 rounded-md px-1.5 py-1.5 text-[0.8125rem] leading-relaxed text-gray-1000 transition-colors duration-160 ease-[var(--ease-out)] hover:bg-gray-100 hover:text-gray-1200 focus-visible:bg-gray-100 focus-visible:text-gray-1200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-1200"
        >
          {expanded ? "Show less" : `Show ${hiddenCount} more`}
        </button>
      ) : null}
    </div>
  );
}

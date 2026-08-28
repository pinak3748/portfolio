"use client";

import Link from "next/link";
import { type CSSProperties, useState } from "react";
import { PenIcon } from "@/components/icons";
import { SectionHeading } from "@/components/section-heading";
import {
  BLOG_INITIAL_VISIBLE,
  type BlogPostListing,
  formatBlogDate,
} from "@/lib/blog-types";
import { staggerStyle } from "@/lib/fade-in";

function BlogRow({
  post,
  staggerIndex,
}: {
  post: BlogPostListing;
  staggerIndex?: number;
}) {
  return (
    <li className="mb-4 last:mb-0">
      <Link
        href={`/blog/${post.slug}`}
        className={`blog-row group block rounded-md px-1.5 py-1.5 no-underline transition-colors duration-160 ease-[var(--ease-out)] hover:bg-gray-100 focus-visible:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-1200${staggerIndex !== undefined ? " fade-in-item" : ""}`}
        style={
          staggerIndex !== undefined ? staggerStyle(staggerIndex) : undefined
        }
      >
        <div className="flex min-w-0 items-baseline justify-between gap-3">
          <span className="min-w-0 flex-1 truncate text-[0.9375rem] font-medium leading-6 text-gray-1200 [@media(hover:hover)_and_(pointer:fine)]:group-hover:underline [@media(hover:hover)_and_(pointer:fine)]:group-hover:decoration-gray-700 [@media(hover:hover)_and_(pointer:fine)]:group-hover:underline-offset-[3px]">
            {post.title}
          </span>
          {post.date ? (
            <time
              dateTime={post.date}
              className="shrink-0 text-[0.8125rem] leading-relaxed text-gray-1000 tabular-nums"
            >
              {formatBlogDate(post.date)}
            </time>
          ) : null}
        </div>
        {post.description ? (
          <p className="mt-1 text-gray-1100 leading-relaxed text-pretty">
            {post.description}
          </p>
        ) : null}
      </Link>
    </li>
  );
}

export function BlogList({
  posts,
  staggerOffset = 0,
}: {
  posts: BlogPostListing[];
  staggerOffset?: number;
}) {
  const [expanded, setExpanded] = useState(false);

  if (posts.length === 0) return null;

  const hasMore = posts.length > BLOG_INITIAL_VISIBLE;
  const visiblePosts = expanded ? posts : posts.slice(0, BLOG_INITIAL_VISIBLE);
  const hiddenCount = posts.length - BLOG_INITIAL_VISIBLE;

  const sectionStyle =
    staggerOffset > 0
      ? ({
          "--stagger-offset": `calc(var(--stagger-step) * ${staggerOffset})`,
        } as CSSProperties)
      : undefined;

  return (
    <section
      className="blog-list mt-10 leading-relaxed"
      aria-label="Writing"
      style={sectionStyle}
    >
      <header className="mb-4 flex items-baseline justify-between gap-4">
        <SectionHeading
          icon={<PenIcon />}
          className="fade-in-item"
          style={staggerStyle(0)}
        >
          Writing
        </SectionHeading>
        <span
          className="fade-in-item shrink-0 text-[0.8125rem] leading-relaxed text-gray-1000 tabular-nums"
          style={staggerStyle(0)}
        >
          {posts.length} {posts.length === 1 ? "post" : "posts"}
        </span>
      </header>

      <ul className="m-0 list-none p-0">
        {visiblePosts.map((post, index) => (
          <BlogRow
            key={post.slug}
            post={post}
            staggerIndex={expanded ? undefined : index + 1}
          />
        ))}
      </ul>

      {hasMore ? (
        <button
          type="button"
          onClick={() => setExpanded((open) => !open)}
          className="mt-1 rounded-md px-1.5 py-1.5 text-[0.8125rem] leading-relaxed text-gray-1000 transition-colors duration-160 ease-[var(--ease-out)] hover:bg-gray-100 hover:text-gray-1200 focus-visible:bg-gray-100 focus-visible:text-gray-1200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-1200"
        >
          {expanded ? "View less" : `View ${hiddenCount} more`}
        </button>
      ) : null}
    </section>
  );
}

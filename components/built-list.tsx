"use client";

import { SectionHeading } from "@/components/section-heading";
import { tagTone } from "@/lib/case-studies";
import { staggerStyle } from "@/lib/fade-in";
import type { Project } from "@/lib/projects";
import { type CSSProperties, useState } from "react";

const INITIAL_VISIBLE = 3;

function capitalizeTitle(title: string) {
  if (!title) return title;
  return title.charAt(0).toUpperCase() + title.slice(1);
}

function Tag({ label }: { label: string }) {
  return (
    <span
      className={`inline-block shrink-0 rounded-full px-2.5 py-1 text-xs leading-4 font-medium ${tagTone(label)}`}
    >
      {label}
    </span>
  );
}

function BuiltRow({
  project,
  staggerIndex,
}: {
  project: Project;
  staggerIndex?: number;
}) {
  return (
    <li className="mb-4 last:mb-0">
      <a
        href={project.url}
        target="_blank"
        rel="noreferrer"
        className={`built-row group block rounded-md px-1.5 py-1.5 no-underline transition-colors duration-160 ease-[var(--ease-out)] hover:bg-gray-100 focus-visible:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-1200${staggerIndex !== undefined ? " fade-in-item" : ""}`}
        style={staggerIndex !== undefined ? staggerStyle(staggerIndex) : undefined}
      >
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="min-w-0 flex-1 truncate text-[0.9375rem] font-medium leading-6 text-gray-1200 [@media(hover:hover)_and_(pointer:fine)]:group-hover:underline [@media(hover:hover)_and_(pointer:fine)]:group-hover:decoration-gray-700 [@media(hover:hover)_and_(pointer:fine)]:group-hover:underline-offset-[3px]">
            {capitalizeTitle(project.title)}
          </span>
          <span className="flex shrink-0 items-center gap-1.5">
            <Tag label={project.stable} />
            {project.tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
            {/* <span className="work-redirect shrink-0 text-gray-800 opacity-0 transition-opacity duration-160 ease-[var(--ease-out)] group-focus-visible:opacity-100 [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100">
              <RedirectIcon />
            </span> */}
          </span>
        </div>
        <p className="mt-1 text-gray-1100 leading-relaxed text-pretty">
          {project.description}
        </p>
      </a>
    </li>
  );
}

export function BuiltList({
  projects,
  staggerOffset = 0,
}: {
  projects: Project[];
  staggerOffset?: number;
}) {
  const [expanded, setExpanded] = useState(false);

  if (projects.length === 0) return null;

  const hasMore = projects.length > INITIAL_VISIBLE;
  const visibleProjects = expanded
    ? projects
    : projects.slice(0, INITIAL_VISIBLE);
  const hiddenCount = projects.length - INITIAL_VISIBLE;

  const sectionStyle =
    staggerOffset > 0
      ? ({ "--stagger-offset": `calc(var(--stagger-step) * ${staggerOffset})` } as CSSProperties)
      : undefined;

  return (
    <section
      className="built-list mt-10 leading-relaxed"
      aria-label="Built in public"
      style={sectionStyle}
    >
      <header className="mb-4 flex items-baseline justify-between gap-4">
        <SectionHeading className="fade-in-item" style={staggerStyle(0)}>
          Built in public
        </SectionHeading>
        <span
          className="fade-in-item shrink-0 text-[0.8125rem] leading-relaxed text-gray-1000 tabular-nums"
          style={staggerStyle(0)}
        >
          {projects.length} projects
        </span>
      </header>

      <ul className="m-0 list-none p-0">
        {visibleProjects.map((project, index) => (
          <BuiltRow
            key={project.id}
            project={project}
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

"use client";

import { SectionHeading } from "@/components/section-heading";
import { staggerStyle } from "@/lib/fade-in";
import { MOBILE_LAB_INITIAL_VISIBLE, type MobileApp } from "@/lib/mobile-apps";
import Image from "next/image";
import Link from "next/link";
import { type CSSProperties, useState } from "react";

function AppTile({
  app,
  staggerIndex,
}: {
  app: MobileApp;
  staggerIndex?: number;
}) {
  return (
    <Link
      href={app.appStoreUrl}
      className={`mobile-lab-tile group flex aspect-square flex-col items-center justify-center gap-2.5 no-underline transition-colors duration-160 ease-[var(--ease-out)] hover:bg-gray-100 focus-visible:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-gray-1200${staggerIndex !== undefined ? " fade-in-item" : ""}`}
      style={
        staggerIndex !== undefined ? staggerStyle(staggerIndex) : undefined
      }
    >
      <Image
        src={app.logo}
        alt={`${app.displayName} app icon`}
        width={56}
        height={56}
        sizes="56px"
        className="size-14 shrink-0 rounded-[22%] object-cover shadow-[0_0_0_1px_color-mix(in_srgb,var(--color-gray-1200)_8%,transparent)]"
      />
      <span className="max-w-full truncate px-2 text-center text-[0.75rem] font-medium leading-snug text-gray-1200 sm:text-[0.8125rem] [@media(hover:hover)_and_(pointer:fine)]:group-hover:underline [@media(hover:hover)_and_(pointer:fine)]:group-hover:decoration-gray-700 [@media(hover:hover)_and_(pointer:fine)]:group-hover:underline-offset-[3px]">
        {app.displayName}
      </span>
    </Link>
  );
}

function ShowMoreTile({
  hiddenCount,
  onClick,
  staggerIndex,
}: {
  hiddenCount: number;
  onClick: () => void;
  staggerIndex?: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`mobile-lab-tile flex aspect-square flex-col items-center justify-center gap-1 text-gray-1000 transition-colors duration-160 ease-[var(--ease-out)] hover:bg-gray-100 hover:text-gray-1200 focus-visible:bg-gray-100 focus-visible:text-gray-1200 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-gray-1200${staggerIndex !== undefined ? " fade-in-item" : ""}`}
      style={
        staggerIndex !== undefined ? staggerStyle(staggerIndex) : undefined
      }
    >
      <span className="text-[0.9375rem] font-medium leading-snug">
        Show more
      </span>
      <span className="text-[0.8125rem] leading-relaxed tabular-nums">
        +{hiddenCount} apps
      </span>
    </button>
  );
}

export function MobileLabGrid({
  apps,
  staggerOffset = 0,
}: {
  apps: MobileApp[];
  staggerOffset?: number;
}) {
  const [expanded, setExpanded] = useState(false);

  if (apps.length === 0) return null;

  const hasMore = apps.length > MOBILE_LAB_INITIAL_VISIBLE;
  const hiddenCount = apps.length - MOBILE_LAB_INITIAL_VISIBLE;
  const visibleApps = expanded
    ? apps
    : apps.slice(0, MOBILE_LAB_INITIAL_VISIBLE);

  const sectionStyle =
    staggerOffset > 0
      ? ({
          "--stagger-offset": `calc(var(--stagger-step) * ${staggerOffset})`,
        } as CSSProperties)
      : undefined;

  return (
    <section
      className="mobile-lab mt-10 leading-relaxed"
      aria-label="Mobile Lab"
      style={sectionStyle}
    >
      <header className="mb-4 flex items-baseline justify-between gap-4">
        <SectionHeading className="fade-in-item" style={staggerStyle(0)}>
          Mobile Lab
        </SectionHeading>
        <span
          className="fade-in-item shrink-0 text-[0.8125rem] leading-relaxed text-gray-1000 tabular-nums"
          style={staggerStyle(0)}
        >
          {apps.length} apps
        </span>
      </header>

      <div className="mobile-lab-grid">
        {visibleApps.map((app, index) => (
          <AppTile
            key={app.id}
            app={app}
            staggerIndex={expanded ? undefined : index + 1}
          />
        ))}
        {!expanded && hasMore ? (
          <ShowMoreTile
            hiddenCount={hiddenCount}
            onClick={() => setExpanded(true)}
            staggerIndex={MOBILE_LAB_INITIAL_VISIBLE + 1}
          />
        ) : null}
      </div>

      {expanded && hasMore ? (
        <button
          type="button"
          onClick={() => setExpanded(false)}
          className="mt-1 rounded-md px-1.5 py-1.5 text-[0.8125rem] leading-relaxed text-gray-1000 transition-colors duration-160 ease-[var(--ease-out)] hover:bg-gray-100 hover:text-gray-1200 focus-visible:bg-gray-100 focus-visible:text-gray-1200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-1200"
        >
          Show less
        </button>
      ) : null}
    </section>
  );
}

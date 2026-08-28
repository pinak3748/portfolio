"use client";

import Image from "next/image";
import { useState } from "react";
import { RedirectIcon } from "@/components/icons";

const DESCRIPTION_PREVIEW_LENGTH = 320;

export function MobileAppDescription({ description }: { description: string }) {
  const [expanded, setExpanded] = useState(false);
  const needsExpand = description.length > DESCRIPTION_PREVIEW_LENGTH;
  const visibleText =
    expanded || !needsExpand
      ? description
      : `${description.slice(0, DESCRIPTION_PREVIEW_LENGTH).trimEnd()}…`;

  return (
    <div>
      <p className="whitespace-pre-line text-gray-1100 leading-relaxed">
        {visibleText}
      </p>
      {needsExpand ? (
        <button
          type="button"
          onClick={() => setExpanded((open) => !open)}
          className="mt-2 text-[0.8125rem] leading-relaxed text-gray-1000 transition-colors duration-160 ease-[var(--ease-out)] hover:text-gray-1200 focus-visible:text-gray-1200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-1200"
        >
          {expanded ? "less" : "more"}
        </button>
      ) : null}
    </div>
  );
}

export function AppStoreLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-4 py-2 text-[0.875rem] font-medium leading-6 text-white no-underline transition-colors duration-160 ease-[var(--ease-out)] hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      View on App Store
      <RedirectIcon className="size-3 rotate-45 text-white" />
    </a>
  );
}

function StoreIconLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-1200 no-underline transition-colors duration-160 ease-[var(--ease-out)] hover:bg-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-1200"
    >
      <Image src={icon} alt="" width={20} height={20} className="size-5" />
    </a>
  );
}

export function StoreIconLinks({
  appStoreUrl,
  playStoreUrl,
}: {
  appStoreUrl?: string;
  playStoreUrl?: string;
}) {
  if (!appStoreUrl && !playStoreUrl) return null;

  return (
    <div className="flex shrink-0 items-start gap-2">
      {appStoreUrl ? (
        <StoreIconLink
          href={appStoreUrl}
          label="View on App Store"
          icon="/app-store.svg"
        />
      ) : null}
      {playStoreUrl ? (
        <StoreIconLink
          href={playStoreUrl}
          label="View on Play Store"
          icon="/play-store.svg"
        />
      ) : null}
    </div>
  );
}

"use client";

import Image from "next/image";
import { useRef } from "react";
import { staggerStyle } from "@/lib/fade-in";
import type { MobileAppScreenshot } from "@/lib/mobile-apps";

export function MobileAppGallery({
  screenshots,
  staggerIndex,
}: {
  screenshots: MobileAppScreenshot[];
  staggerIndex?: number;
}) {
  const trackRef = useRef<HTMLUListElement>(null);

  if (screenshots.length === 0) return null;

  return (
    <section
      className={`mobile-app-screenshots -mx-6 sm:mx-0${staggerIndex !== undefined ? " fade-in-item" : ""}`}
      aria-label="Screenshots"
      style={
        staggerIndex !== undefined ? staggerStyle(staggerIndex) : undefined
      }
    >
      <h2 className="sr-only">Screenshots</h2>
      <ul
        ref={trackRef}
        className="mobile-app-screenshots-track m-0 flex list-none gap-3 overflow-x-auto overscroll-x-contain px-6 py-1 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {screenshots.map((screenshot, index) => (
          <li key={screenshot.src} className="shrink-0">
            <figure className="mobile-app-screenshot m-0 w-[11.5rem] overflow-hidden sm:w-[13.5rem]">
              <Image
                src={screenshot.src}
                alt={screenshot.alt}
                width={screenshot.width}
                height={screenshot.height}
                sizes="(min-width: 640px) 13.5rem, 11.5rem"
                priority={index === 0}
                className="block h-auto w-full object-cover"
              />
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}

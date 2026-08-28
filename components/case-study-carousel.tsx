"use client";

import type { CaseStudyImage } from "@/lib/case-studies";
import Image from "next/image";
import { useRef, useState } from "react";

export function CaseStudyCarousel({ images }: { images: CaseStudyImage[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  function handleScroll() {
    const track = trackRef.current;
    if (!track) return;
    const index = Math.round(track.scrollLeft / track.clientWidth);
    setActive(Math.min(Math.max(index, 0), images.length - 1));
  }

  function goTo(index: number) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({
      left: index * track.clientWidth,
      behavior: "smooth",
    });
  }

  return (
    <div className="lg:hidden">
      <ul
        ref={trackRef}
        onScroll={handleScroll}
        className="m-0 flex snap-x snap-mandatory list-none overflow-x-auto overscroll-x-contain p-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((image, index) => (
          <li key={image.src} className="w-full shrink-0 snap-center">
            <figure className="demo-image-background m-0">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="100vw"
                priority={index === 0}
                className="block h-auto w-full rounded-md shadow-custom"
              />
            </figure>
          </li>
        ))}
      </ul>

      {images.length > 1 ? (
        <div className="mt-4 flex justify-center gap-2">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Show screen ${index + 1}`}
              aria-current={index === active}
              className={`size-1.5 rounded-full transition-all duration-200 ${
                index === active
                  ? "scale-x-[3.33] bg-gray-1200"
                  : "bg-gray-700"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

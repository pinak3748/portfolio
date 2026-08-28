import { CaseStudyCarousel } from "@/components/case-study-carousel";
import type { CaseStudyImage } from "@/lib/case-studies";
import { staggerStyle } from "@/lib/fade-in";
import Image from "next/image";

export function CaseStudyGallery({
  images,
  staggerIndex,
}: {
  images: CaseStudyImage[];
  staggerIndex?: number;
}) {
  if (images.length === 0) return null;

  return (
    <section
      className={`work-gallery px-6 lg:px-3${staggerIndex !== undefined ? " fade-in-item" : ""}`}
      aria-label="Screens"
      style={staggerIndex !== undefined ? staggerStyle(staggerIndex) : undefined}
    >
      <h2 className="sr-only">Screens</h2>

      <CaseStudyCarousel images={images} />

      {/* Desktop: one sticky column that splits the viewport height across every screen. */}
      <ul className="m-0 hidden list-none flex-col gap-3 p-0 lg:sticky lg:top-0 lg:flex lg:h-svh lg:py-3">
        {images.map((image, index) => (
          <li
            key={image.src}
            className="demo-image-background min-h-0 flex-1 basis-0"
          >
            <figure className="relative m-0 h-full w-full overflow-hidden rounded-md">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 30vw, 100vw"
                priority={index === 0}
                className="object-contain"
              />
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}

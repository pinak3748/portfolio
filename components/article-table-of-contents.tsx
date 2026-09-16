"use client";

import {
  type KeyboardEvent,
  type MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import type { BlogHeading } from "@/lib/blog-types";

type ContentsListProps = {
  activeId: string;
  headings: BlogHeading[];
  onSelect?: (id: string) => void;
  railItemRefs?: MutableRefObject<Map<string, HTMLLIElement>>;
};

function ContentsList({
  activeId,
  headings,
  onSelect,
  railItemRefs,
}: ContentsListProps) {
  return (
    <ol className="article-toc-list">
      {headings.map((heading, index) => (
        <li
          key={heading.id}
          className="article-toc-item"
          ref={(element) => {
            if (!railItemRefs) return;

            if (element) railItemRefs.current.set(heading.id, element);
            else railItemRefs.current.delete(heading.id);
          }}
        >
          <a
            href={`#${heading.id}`}
            aria-current={heading.id === activeId ? "location" : undefined}
            className={`article-toc-link article-toc-link-level-${heading.level}${
              heading.id === activeId ? " is-active" : ""
            }`}
            onClick={() => onSelect?.(heading.id)}
          >
            <span className="article-toc-copy">
              <span className="article-toc-index" aria-hidden>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="article-toc-label">{heading.title}</span>
            </span>
            <span className="article-toc-tick" aria-hidden />
          </a>
        </li>
      ))}
    </ol>
  );
}

function getActiveHeadingId(headings: BlogHeading[]) {
  const readingLine = window.innerHeight * 0.32;
  let activeId = headings[0]?.id ?? "";

  for (const heading of headings) {
    const element = document.getElementById(heading.id);
    if (!element) continue;

    if (element.getBoundingClientRect().top <= readingLine) {
      activeId = heading.id;
      continue;
    }

    break;
  }

  return activeId;
}

export function ArticleTableOfContents({
  headings,
}: {
  headings: BlogHeading[];
}) {
  const [activeId, setActiveId] = useState(headings[0]?.id ?? "");
  const [isOpen, setIsOpen] = useState(false);
  const markerRef = useRef<HTMLSpanElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const railItemRefs = useRef(new Map<string, HTMLLIElement>());
  const mobileSelectionRef = useRef<string | null>(null);

  useEffect(() => {
    let animationFrame = 0;

    const updateActiveHeading = () => {
      animationFrame = 0;
      setActiveId(getActiveHeadingId(headings));
    };

    const requestUpdate = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(updateActiveHeading);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, [headings]);

  useEffect(() => {
    const positionMarker = () => {
      const marker = markerRef.current;
      const item = railItemRefs.current.get(activeId);
      if (!marker || !item) return;

      const markerY = item.offsetTop + item.offsetHeight / 2 - 0.5;
      marker.style.transform = `translate3d(0, ${markerY}px, 0)`;
    };

    const animationFrame = window.requestAnimationFrame(positionMarker);
    window.addEventListener("resize", positionMarker);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", positionMarker);
    };
  }, [activeId]);

  useEffect(() => {
    const headingId = mobileSelectionRef.current;
    if (isOpen || !headingId) return;

    mobileSelectionRef.current = null;
    const animationFrame = window.requestAnimationFrame(() => {
      document.getElementById(headingId)?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, [isOpen]);

  if (headings.length === 0) return null;

  const activeHeading =
    headings.find((heading) => heading.id === activeId) ?? headings[0];
  const activeIndex = Math.max(
    0,
    headings.findIndex((heading) => heading.id === activeHeading.id),
  );
  const progressLabel = `${String(activeIndex + 1).padStart(2, "0")} / ${String(
    headings.length,
  ).padStart(2, "0")}`;

  function selectMobileHeading(id: string) {
    mobileSelectionRef.current = id;
    setIsOpen(false);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key !== "Escape" || !isOpen) return;

    event.preventDefault();
    setIsOpen(false);
    toggleRef.current?.focus();
  }

  return (
    <>
      <nav className="article-toc-rail" aria-label="On this page">
        <div className="article-toc-meta" aria-hidden>
          <span>Index</span>
          <span>{progressLabel}</span>
        </div>
        <div className="article-toc-track">
          <span ref={markerRef} className="article-toc-marker" aria-hidden />
          <ContentsList
            activeId={activeId}
            headings={headings}
            railItemRefs={railItemRefs}
          />
        </div>
      </nav>

      <nav
        className="article-toc-mobile"
        aria-label="On this page"
        onKeyDown={handleKeyDown}
      >
        <button
          ref={toggleRef}
          type="button"
          aria-expanded={isOpen}
          aria-controls="article-contents"
          className="article-toc-toggle"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className="article-toc-toggle-label">Contents</span>
          <span className="article-toc-toggle-count" aria-hidden>
            {progressLabel}
          </span>
          <span className="article-toc-toggle-current">
            {activeHeading.title}
          </span>
          <span className="article-toc-toggle-icon" aria-hidden>
            {isOpen ? "−" : "+"}
          </span>
        </button>
        {isOpen ? (
          <div id="article-contents" className="article-toc-mobile-panel">
            <div className="article-toc-track">
              <ContentsList
                activeId={activeId}
                headings={headings}
                onSelect={selectMobileHeading}
              />
            </div>
          </div>
        ) : null}
      </nav>
    </>
  );
}

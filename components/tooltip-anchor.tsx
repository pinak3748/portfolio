"use client";

import {
  type HTMLAttributes,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

let activeCard: HTMLSpanElement | null = null;
let hideCardTimer: ReturnType<typeof setTimeout>;

function positionCard(anchor: HTMLElement, bubble: HTMLSpanElement) {
  const anchorRect = anchor.getBoundingClientRect();
  const gutter = 12;
  const gap = 4;
  const left = Math.min(
    window.innerWidth - bubble.offsetWidth - gutter,
    Math.max(
      gutter,
      anchorRect.left + anchorRect.width / 2 - bubble.offsetWidth / 2,
    ),
  );

  bubble.style.left = `${left}px`;

  const side =
    anchorRect.top - gap - bubble.offsetHeight < gutter ? "below" : "above";
  bubble.dataset.side = side;
  bubble.style.top =
    side === "below"
      ? `${anchorRect.bottom + gap}px`
      : `${anchorRect.top - gap}px`;
}

function showCard(anchor: HTMLElement, bubble: HTMLSpanElement) {
  clearTimeout(hideCardTimer);
  if (activeCard && activeCard !== bubble) {
    activeCard.classList.remove("is-open");
  }
  activeCard = bubble;
  positionCard(anchor, bubble);
  bubble.classList.add("is-open");
}

function hideCard(delay = 160) {
  const bubble = activeCard;
  hideCardTimer = setTimeout(() => {
    bubble?.classList.remove("is-open");
    if (activeCard === bubble) activeCard = null;
  }, delay);
}

function dayFromPoint(x: number, y: number) {
  return document
    .elementFromPoint(x, y)
    ?.closest<HTMLElement>(".activity-day[data-tip]");
}

function positionDayTip(anchor: HTMLElement, bubble: HTMLSpanElement) {
  const rect = anchor.getBoundingClientRect();
  bubble.style.left = `${rect.left + rect.width / 2}px`;
  bubble.style.top = `${rect.top}px`;
}

export function TooltipRegion({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const tipRef = useRef<HTMLSpanElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function showDay(day: HTMLElement) {
    const bubble = tipRef.current;
    if (!bubble) return;
    bubble.textContent = day.dataset.tip ?? "";
    positionDayTip(day, bubble);
    bubble.classList.add("is-open");
  }

  function hideDay() {
    tipRef.current?.classList.remove("is-open");
  }

  return (
    <div
      className={className}
      onPointerMove={(e) => {
        const day =
          (e.target as HTMLElement).closest<HTMLElement>(
            ".activity-day[data-tip]",
          ) ?? dayFromPoint(e.clientX, e.clientY);
        if (day && e.currentTarget.contains(day)) showDay(day);
        else hideDay();
      }}
      onPointerLeave={() => hideDay()}
      onPointerDown={(e) => {
        if (e.pointerType !== "touch") return;
        e.currentTarget.setPointerCapture(e.pointerId);
        const day = dayFromPoint(e.clientX, e.clientY);
        if (day) showDay(day);
      }}
      onPointerUp={(e) => {
        if (e.pointerType === "touch") hideDay();
      }}
      onPointerCancel={() => hideDay()}
    >
      {children}
      {mounted
        ? createPortal(
            <span ref={tipRef} className="day-tooltip" role="tooltip" />,
            document.body,
          )
        : null}
    </div>
  );
}

export function TooltipAnchor({
  children,
  tooltip,
  className,
  variant = "tooltip",
  ...props
}: {
  children?: ReactNode;
  tooltip: ReactNode;
  className: string;
  variant?: "tooltip" | "card";
} & Omit<HTMLAttributes<HTMLButtonElement>, "children">) {
  const anchorRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const [mounted, setMounted] = useState(false);
  const [tooltipReady, setTooltipReady] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function open() {
    setTooltipReady(true);
    const anchor = anchorRef.current;
    const bubble = tooltipRef.current;
    if (anchor && bubble) showCard(anchor, bubble);
  }

  function bindBubble(node: HTMLSpanElement | null) {
    tooltipRef.current = node;
    const anchor = anchorRef.current;
    if (!node || !anchor) return;

    const observer = new ResizeObserver(() => {
      if (node.classList.contains("is-open")) positionCard(anchor, node);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }

  return (
    <button
      {...props}
      type="button"
      ref={anchorRef}
      className={className}
      onMouseEnter={open}
      onMouseLeave={() => hideCard()}
      onFocus={open}
      onBlur={(e) => {
        if (tooltipRef.current?.contains(e.relatedTarget as Node | null)) {
          return;
        }
        hideCard(0);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") hideCard(0);
      }}
    >
      {children}
      {mounted
        ? createPortal(
            <span
              ref={bindBubble}
              className={
                variant === "card"
                  ? "tooltip-bubble hover-card enclosed"
                  : "tooltip-bubble"
              }
              role="tooltip"
              onMouseEnter={open}
              onMouseLeave={() => hideCard()}
            >
              {tooltipReady ? tooltip : null}
            </span>,
            document.body,
          )
        : null}
    </button>
  );
}

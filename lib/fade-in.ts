import type { CSSProperties } from "react";

export function staggerStyle(index: number): CSSProperties {
  return { "--stagger-index": index } as CSSProperties;
}

export function createStaggerCounter(start = 0) {
  let index = start;

  return {
    next: () => staggerStyle(index++),
    current: () => index,
  };
}

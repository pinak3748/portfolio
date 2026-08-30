import type { ReactNode } from "react";

type CitationProps = {
  n: number;
  href?: string;
  children: ReactNode;
};

export function Citation({ n, href, children }: CitationProps) {
  const external = href?.startsWith("http");

  return (
    <li
      id={`cite-${n}`}
      className="cite-item scroll-mt-24 text-[0.875rem] leading-relaxed text-gray-1000"
    >
      <span className="mr-1.5 tabular-nums text-gray-1100">{n}.</span>
      {href ? (
        <a
          href={href}
          className="text-gray-1100 underline decoration-gray-700 underline-offset-[3px] transition-colors duration-160 ease-[var(--ease-out)] hover:text-gray-1200 hover:decoration-gray-1200"
          {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        >
          {children}
        </a>
      ) : (
        children
      )}
    </li>
  );
}

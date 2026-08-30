import type { ReactNode } from "react";

type CitationsProps = {
  children: ReactNode;
};

export function Citations({ children }: CitationsProps) {
  return (
    <section
      aria-label="References"
      className="cite-list mt-12 border-t border-gray-400 pt-6"
    >
      <h2 className="mb-4 text-[0.8125rem] font-medium tracking-wide text-gray-1200 uppercase">
        References
      </h2>
      <ol className="m-0 list-none space-y-2 p-0">{children}</ol>
    </section>
  );
}

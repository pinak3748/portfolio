type CiteProps = {
  n: number;
};

export function Cite({ n }: CiteProps) {
  return (
    <a
      href={`#cite-${n}`}
      className="cite-ref align-super text-[0.65em] font-normal text-gray-1100 no-underline transition-colors duration-160 ease-[var(--ease-out)] hover:text-gray-1200"
      aria-label={`Reference ${n}`}
    >
      {n}
    </a>
  );
}

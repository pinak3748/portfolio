type IconProps = {
  className?: string;
};

export function RedirectIcon({ className = "size-3.5 rotate-45" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 12.5V3.5" />
      <path d="M4.5 7 8 3.5 11.5 7" />
    </svg>
  );
}

export function FolderIcon({ className = "size-3.5" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 4.5h3.2l1.3 1.5H13.5v6.5H2.5z" />
    </svg>
  );
}

export function ListIcon({ className = "size-3.5" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5.5 4h8" />
      <path d="M5.5 8h8" />
      <path d="M5.5 12h8" />
      <path d="M2.5 4h.01" />
      <path d="M2.5 8h.01" />
      <path d="M2.5 12h.01" />
    </svg>
  );
}

export function BookIcon({ className = "size-3.5" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3.5h4.2a2 2 0 0 1 1.8 1v8a1.5 1.5 0 0 0-1.5-1.5H3z" />
      <path d="M13 3.5H8.8a2 2 0 0 0-1.8 1v8a1.5 1.5 0 0 1 1.5-1.5H13z" />
    </svg>
  );
}

export function PenIcon({ className = "size-3.5" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3.5 12.5 1.2-4.2 7-7a1.4 1.4 0 0 1 2 2l-7 7z" />
      <path d="M10.5 4.5 12 6" />
    </svg>
  );
}

export function ImageIcon({ className = "size-3.5" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2.5" y="3.5" width="11" height="9" rx="1.5" />
      <circle cx="5.75" cy="6.5" r="0.9" />
      <path d="m5 11 2.5-2.5 2 2L12 8l1.5 3" />
    </svg>
  );
}

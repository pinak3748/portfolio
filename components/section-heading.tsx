import type { CSSProperties, ReactNode } from "react";

export function SectionHeading({
  icon,
  children,
  className,
  style,
}: {
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <h2
      className={`flex items-center gap-2 text-[0.9375rem] leading-6 font-normal text-gray-1000${className ? ` ${className}` : ""}`}
      style={style}
    >
      {icon ? <span className="text-gray-800">{icon}</span> : null}
      {children}
    </h2>
  );
}

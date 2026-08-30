import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import type { ComponentPropsWithoutRef } from "react";
import { Citation } from "@/components/mdx/citation";
import { Citations } from "@/components/mdx/citations";
import { Cite } from "@/components/mdx/cite";

type AnchorProps = ComponentPropsWithoutRef<"a">;
type ImageProps = ComponentPropsWithoutRef<"img">;

export const mdxComponents: MDXRemoteProps["components"] = {
  a: ({ href, children, ...props }: AnchorProps) => {
    const external = href?.startsWith("http");

    return (
      <a
        href={href}
        className="text-gray-1200 underline decoration-gray-700 underline-offset-[3px] transition-colors duration-160 ease-[var(--ease-out)] hover:decoration-gray-1200"
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        {...props}
      >
        {children}
      </a>
    );
  },
  img: ({ src, alt, ...props }: ImageProps) => (
    <img src={src} alt={alt ?? ""} loading="lazy" {...props} />
  ),
  Cite,
  Citations,
  Citation,
};

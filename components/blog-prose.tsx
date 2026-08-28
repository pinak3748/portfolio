import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import type { ComponentPropsWithoutRef } from "react";
import remarkGfm from "remark-gfm";

type AnchorProps = ComponentPropsWithoutRef<"a">;
type ImageProps = ComponentPropsWithoutRef<"img">;

const mdxComponents: MDXRemoteProps["components"] = {
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
};

export async function BlogProse({ content }: { content: string }) {
  return (
    <div className="blog-prose">
      <MDXRemote
        source={content}
        components={mdxComponents}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
          },
        }}
      />
    </div>
  );
}

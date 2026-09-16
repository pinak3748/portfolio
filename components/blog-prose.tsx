import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/components/mdx/mdx-components";
import type { BlogHeading } from "@/lib/blog-types";

type MarkdownHeading = {
  type?: string;
  depth?: number;
  data?: {
    hProperties?: Record<string, unknown>;
  };
};

type MarkdownRoot = {
  children?: unknown[];
};

function isArticleHeading(node: unknown): node is MarkdownHeading {
  if (!node || typeof node !== "object") return false;

  const { type, depth } = node as MarkdownHeading;
  return type === "heading" && (depth === 2 || depth === 3);
}

function createHeadingIdPlugin(headings: BlogHeading[]) {
  return () => (tree: MarkdownRoot) => {
    let headingIndex = 0;

    for (const node of tree.children ?? []) {
      if (!isArticleHeading(node)) continue;

      const heading = headings[headingIndex++];
      if (!heading) continue;

      node.data = {
        ...node.data,
        hProperties: {
          ...node.data?.hProperties,
          id: heading.id,
        },
      };
    }
  };
}

export async function BlogProse({
  content,
  headings,
}: {
  content: string;
  headings: BlogHeading[];
}) {
  return (
    <div className="blog-prose">
      <MDXRemote
        source={content}
        components={mdxComponents}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm, createHeadingIdPlugin(headings)],
          },
        }}
      />
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleTableOfContents } from "@/components/article-table-of-contents";
import { BlogProse } from "@/components/blog-prose";
import { JsonLd } from "@/components/json-ld";
import { getBlogPost, getBlogPosts } from "@/lib/blog.server";
import { formatBlogDate } from "@/lib/blog-types";
import { tagTone } from "@/lib/case-studies";
import { createStaggerCounter } from "@/lib/fade-in";
import { absoluteUrl, createPageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return createPageMetadata({
    title: post.title,
    description: post.description ?? post.title,
    path: `/blog/${slug}`,
    type: "article",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) notFound();

  const stagger = createStaggerCounter();
  const url = absoluteUrl(`/blog/${slug}`);
  const image = absoluteUrl(`/blog/${slug}/opengraph-image`);
  const tableOfContentsHeadings =
    post.headings.length > 0
      ? post.headings
      : [
          {
            id: "article-introduction",
            title: "Introduction",
            level: 2 as const,
          },
        ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url,
    ...(post.date ? { datePublished: post.date } : {}),
    author: {
      "@type": "Person",
      name: "Pinak Faldu",
      url: absoluteUrl("/"),
    },
    publisher: {
      "@type": "Person",
      name: "Pinak Faldu",
      url: absoluteUrl("/"),
    },
    image,
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <main className="blog-detail">
        <div className="blog-detail-content mx-auto max-w-173 px-6 py-12 sm:py-24">
          <Link
            href="/"
            className="blog-back fade-in-item inline-block text-gray-1000 no-underline hover:text-gray-1200 hover:underline"
            style={stagger.next()}
          >
            Home
          </Link>

          <header className="blog-header fade-in-item" style={stagger.next()}>
            {post.date ? (
              <time dateTime={post.date} className="blog-date tabular-nums">
                {formatBlogDate(post.date)}
              </time>
            ) : null}
            <div className="flex flex-col">
              <h1 className="blog-title">{post.title}</h1>
              {post.description ? (
                <p className="blog-description">{post.description}</p>
              ) : null}
            </div>
            {post.tags && post.tags.length > 0 ? (
              <ul className="blog-tags mt-4 flex flex-wrap gap-1.5 p-0 list-none">
                {post.tags.map((tag) => (
                  <li key={tag}>
                    <span
                      className={`inline-block rounded-full px-2.5 py-1 text-xs leading-4 font-medium ${tagTone(tag)}`}
                    >
                      {tag}
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}
          </header>

          <ArticleTableOfContents headings={tableOfContentsHeadings} />

          <article
            id={post.headings.length === 0 ? "article-introduction" : undefined}
            className="fade-in-item"
            style={stagger.next()}
          >
            <BlogProse content={post.content} headings={post.headings} />
          </article>
        </div>
      </main>
    </>
  );
}

import { getBlogPost, getBlogPosts } from "@/lib/blog.server";
import { OgBlogImage } from "@/lib/og/image";

export const alt = "Writing by Pinak Faldu";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  return OgBlogImage({ title: post?.title ?? "Pinak Faldu" });
}

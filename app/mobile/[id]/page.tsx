import { PenIcon, RedirectIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import {
  AppStoreLink,
  MobileAppDescription,
  StoreIconLinks,
} from "@/components/mobile-app-detail";
import { MobileAppGallery } from "@/components/mobile-app-gallery";
import { SectionHeading } from "@/components/section-heading";
import { createStaggerCounter } from "@/lib/fade-in";
import { absoluteUrl, createPageMetadata } from "@/lib/metadata";
import { getMobileApp, getMobileApps } from "@/lib/mobile-apps";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getMobileApps().map((app) => ({ id: app.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const app = getMobileApp(id);
  if (!app) return {};

  const ogImage = app.screenshots[0]?.src ?? app.logo;

  return createPageMetadata({
    title: `${app.title} Pinak Faldu`,
    description: app.subtitle || app.description.slice(0, 160),
    path: `/mobile/${app.id}`,
    image: ogImage,
  });
}

export default async function MobileAppPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const app = getMobileApp(id);

  if (!app) notFound();

  const blogs = app.blogs ?? [];
  const stagger = createStaggerCounter();
  const pageUrl = absoluteUrl(`/mobile/${app.id}`);

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: app.title,
    description: app.subtitle || app.description.slice(0, 160),
    url: pageUrl,
    image: absoluteUrl(app.logo),
    applicationCategory: "MobileApplication",
    operatingSystem: "iOS",
    author: {
      "@type": "Person",
      name: "Pinak Faldu",
      url: absoluteUrl("/"),
    },
    ...(app.appStoreUrl ? { downloadUrl: app.appStoreUrl } : {}),
  };

  return (
    <>
      <JsonLd data={appSchema} />
      <main className="mobile-app-detail mx-auto max-w-173 px-6 py-12 leading-relaxed sm:py-24">
        <Link
          href="/"
          className="fade-in-item mb-8 inline-block text-gray-1000 no-underline hover:text-gray-1200 hover:underline"
          style={stagger.next()}
        >
          Home
        </Link>

        <section
          className="mobile-app-hero fade-in-item -mx-6 mb-8 px-6 py-8 sm:mx-0 sm:rounded-xl"
          style={stagger.next()}
        >
          <div className="flex items-start gap-4">
            <Image
              src={app.logo}
              alt={`${app.displayName} app icon`}
              width={128}
              height={128}
              className="size-[4.5rem] shrink-0 rounded-[22%] object-cover shadow-[0_0_0_1px_color-mix(in_srgb,var(--color-gray-1200)_12%,transparent)] sm:size-24"
              priority
            />

            <div className="min-w-0 flex-1">
              <h1 className="font-medium text-gray-1200 leading-snug text-pretty">
                {app.title}
              </h1>
              {app.subtitle ? (
                <p className="mt-1 text-gray-1100 leading-snug text-pretty">
                  {app.subtitle}
                </p>
              ) : null}
              <p className="mt-2 text-[0.8125rem] leading-relaxed text-gray-1000">
                {app.price} · In-App Purchases
              </p>
              {app.appStoreUrl ? (
                <div className="mt-4">
                  <AppStoreLink href={app.appStoreUrl} />
                </div>
              ) : null}
            </div>

            <StoreIconLinks
              appStoreUrl={app.appStoreUrl}
              playStoreUrl={app.playStoreUrl}
            />
          </div>
        </section>

        <MobileAppGallery
          screenshots={app.screenshots}
          staggerIndex={stagger.current()}
        />

        <section className="mt-10" aria-labelledby="description-heading">
          <div
            id="description-heading"
            className="fade-in-item"
            style={stagger.next()}
          >
            <SectionHeading>Description</SectionHeading>
          </div>
          <div className="fade-in-item mt-2" style={stagger.next()}>
            <MobileAppDescription description={app.description} />
          </div>
        </section>

        {blogs.length > 0 ? (
          <section className="mt-10" aria-labelledby="blogs-heading">
            <div
              id="blogs-heading"
              className="fade-in-item"
              style={stagger.next()}
            >
              <SectionHeading icon={<PenIcon />}>Blogs</SectionHeading>
            </div>
            <ul className="work-tree-list mt-2">
              {blogs.map((post) => (
                <li
                  key={post.href}
                  className="work-tree-item fade-in-item"
                  style={stagger.next()}
                >
                  <Link
                    href={post.href}
                    className="flex min-w-0 items-center gap-2 rounded-md py-1.5 pr-1 -ml-1 pl-1 text-[0.9375rem] leading-6 text-gray-1200 no-underline transition-colors duration-160 ease-[var(--ease-out)] hover:bg-gray-100"
                  >
                    <span className="min-w-0 flex-1 truncate">
                      {post.title}
                    </span>
                    <span className="work-redirect shrink-0 text-gray-800">
                      <RedirectIcon />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </main>
    </>
  );
}

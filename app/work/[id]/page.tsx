import { CaseStudyGallery } from "@/components/case-study-gallery";
import { BookIcon, ListIcon, PenIcon, RedirectIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { SectionHeading } from "@/components/section-heading";
import { SocialBadge } from "@/components/social-badge";
import {
  getCaseStudyWithCompany,
  getCompanies,
  tagTone,
} from "@/lib/case-studies";
import { createStaggerCounter } from "@/lib/fade-in";
import { absoluteUrl, createPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getCompanies().flatMap((company) =>
    company.projects.map((project) => ({ id: project.id })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const result = getCaseStudyWithCompany(id);
  if (!result) return {};

  const { project } = result;
  const ogImage = project.images[0]?.src ?? project.logo;

  return createPageMetadata({
    title: project.title,
    description: project.description,
    path: `/work/${project.id}`,
    image: ogImage,
  });
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = getCaseStudyWithCompany(id);

  if (!result) notFound();

  const { project, company } = result;
  const blogs = project.blogs ?? [];
  const stagger = createStaggerCounter();
  const headStyles = {
    home: stagger.next(),
    header: stagger.next(),
    tags: project.tags.length > 0 ? stagger.next() : undefined,
    description: stagger.next(),
  };
  const galleryStaggerIndex = stagger.current();
  const pageUrl = absoluteUrl(`/work/${project.id}`);
  const workSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: pageUrl,
    image: absoluteUrl(project.images[0]?.src ?? project.logo),
    author: {
      "@type": "Person",
      name: "Pinak Faldu",
      url: absoluteUrl("/"),
    },
    creator: {
      "@type": "Organization",
      name: company.company,
      ...(company.link ? { url: company.link } : {}),
    },
  };

  return (
    <>
      <JsonLd data={workSchema} />
      <main className="work-detail grid gap-10 leading-relaxed lg:min-h-svh lg:grid-cols-[minmax(0,1fr)_minmax(22rem,30rem)] lg:gap-0">
        <div className="work-pane contents lg:block lg:sticky lg:top-0 lg:max-h-svh lg:overflow-y-auto lg:[scrollbar-width:none] lg:[&::-webkit-scrollbar]:hidden">
          <div className="work-head order-1 mx-auto w-full max-w-173 px-6 pt-12 sm:pt-24 lg:order-0 lg:pt-24">
            <Link
              href="/"
              className="fade-in-item mb-8 inline-block text-gray-1000 no-underline hover:text-gray-1200 hover:underline"
              style={headStyles.home}
            >
              Home
            </Link>

            <div
              className="fade-in-item mb-6 flex items-center justify-start gap-3"
              style={headStyles.header}
            >
              <Image
                src={project.logo}
                alt={`${project.title} logo`}
                width={88}
                height={88}
                className="size-11 shrink-0 rounded-[10px] object-cover shadow-[0_0_0_1px_color-mix(in_srgb,var(--color-gray-1200)_8%,transparent)]"
              />
              <div className="flex min-w-0 flex-col">
                <h1 className="font-medium text-gray-1200 leading-snug">
                  {project.title}
                </h1>
                {company.link ? (
                  <span className="text-gray-1100 leading-snug">
                    Worked at{" "}
                    <SocialBadge
                      href={company.link}
                      icon={company.logo}
                      name={company.company}
                    />
                  </span>
                ) : (
                  <span className="text-gray-1100 leading-snug">
                    {company.company}
                  </span>
                )}
              </div>
            </div>

            {project.tags.length > 0 ? (
              <ul
                className="fade-in-item mb-4 flex list-none flex-wrap gap-2 p-0 m-0"
                style={headStyles.tags}
              >
                {project.tags.map((tag) => (
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

            <p
              className="fade-in-item mb-4 text-gray-1100 leading-relaxed"
              style={headStyles.description}
            >
              {project.description}
            </p>
          </div>

          <div className="work-body order-3 mx-auto w-full max-w-173 space-y-10 px-6 pb-12 sm:pb-24 lg:order-0 lg:pb-24">
            <section className="mt-10" aria-labelledby="features-heading">
              <div
                id="features-heading"
                className="fade-in-item"
                style={stagger.next()}
              >
                <SectionHeading icon={<ListIcon />}>Features</SectionHeading>
              </div>
              <dl className="mt-2">
                {project.features.map((feature) => (
                  <div
                    key={feature.name}
                    className="fade-in-item mt-4"
                    style={stagger.next()}
                  >
                    <dt className="font-medium text-gray-1200 leading-snug">
                      {feature.name}
                    </dt>
                    <dd className="mt-1 text-gray-1100 leading-relaxed">
                      {feature.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            <section aria-labelledby="case-study-heading">
              <div
                id="case-study-heading"
                className="fade-in-item"
                style={stagger.next()}
              >
                <SectionHeading icon={<BookIcon />}>Case study</SectionHeading>
              </div>
              <div className="fade-in-item mt-2" style={stagger.next()}>
                {project.caseStudy?.link ? (
                  <Link
                    href={project.caseStudy.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-gray-1100 no-underline hover:text-gray-1200 hover:underline"
                  >
                    {project.caseStudy.title}
                    <span className="work-redirect text-gray-800">
                      <RedirectIcon className="size-3 rotate-45" />
                    </span>
                  </Link>
                ) : (
                  <p className="text-gray-1000 leading-relaxed">
                    Case study link coming soon.
                  </p>
                )}
              </div>
            </section>

            <section aria-labelledby="blogs-heading">
              <div
                id="blogs-heading"
                className="fade-in-item"
                style={stagger.next()}
              >
                <SectionHeading icon={<PenIcon />}>Blogs</SectionHeading>
              </div>
              <div className="mt-2">
                {blogs.length > 0 ? (
                  <ul className="work-tree-list">
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
                ) : (
                  <p
                    className="fade-in-item text-gray-1000 leading-relaxed"
                    style={stagger.next()}
                  >
                    Nothing published yet. Writing about this project will show
                    up here.
                  </p>
                )}
              </div>
            </section>
          </div>
        </div>

        <CaseStudyGallery
          images={project.images}
          staggerIndex={galleryStaggerIndex}
        />
      </main>
    </>
  );
}

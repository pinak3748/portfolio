import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import { WritingCode } from "@/components/activity-graph";
import { JsonLd } from "@/components/json-ld";
import { ProductDesign } from "@/components/product-design";
import { SiteFooter } from "@/components/site-footer";
import { SocialBadge } from "@/components/social-badge";
import { TooltipAnchor } from "@/components/tooltip-anchor";
import {
  absoluteUrl,
  createPageMetadata,
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
} from "@/lib/metadata";
import { getPersonal } from "@/lib/personal";

const WorkTree = dynamic(() =>
  import("@/components/work-tree").then((m) => ({ default: m.WorkTree })),
);
const BuiltList = dynamic(() =>
  import("@/components/built-list").then((m) => ({ default: m.BuiltList })),
);
const MobileLabGrid = dynamic(() =>
  import("@/components/mobile-lab-grid").then((m) => ({
    default: m.MobileLabGrid,
  })),
);
const BlogList = dynamic(() =>
  import("@/components/blog-list").then((m) => ({ default: m.BlogList })),
);

import { getActivityDays } from "@/lib/activity";
import { getBlogPosts } from "@/lib/blog.server";
import { getCompanies, getWorkStaggerItemCount } from "@/lib/case-studies";
import { getMobileApps, getMobileLabStaggerItemCount } from "@/lib/mobile-apps";
import { getBuiltListStaggerItemCount, getProjects } from "@/lib/projects";

export const metadata: Metadata = createPageMetadata({
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  path: "/",
});

const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${absoluteUrl("/")}#person`,
      name: "Pinak Faldu",
      url: absoluteUrl("/"),
      jobTitle: "Product Designer & Lead",
      image: absoluteUrl("/assets/personal.png"),
      sameAs: [
        "https://github.com/pinak3748",
        "https://x.com/iampinak_",
        "https://linkedin.com/in/pinakfaldu",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${absoluteUrl("/")}#website`,
      name: "Pinak Faldu",
      url: absoluteUrl("/"),
      author: { "@id": `${absoluteUrl("/")}#person` },
    },
    {
      "@type": "ProfilePage",
      "@id": absoluteUrl("/"),
      url: absoluteUrl("/"),
      name: "Pinak Faldu",
      isPartOf: { "@id": `${absoluteUrl("/")}#website` },
      about: { "@id": `${absoluteUrl("/")}#person` },
    },
  ],
};

export default function Home() {
  const activity = getActivityDays();
  const work = getCompanies();
  const mobileApps = getMobileApps();
  const projects = getProjects();
  const blogPosts = getBlogPosts();
  const personal = getPersonal();
  const mobileLabStaggerOffset = 5 + getWorkStaggerItemCount(work);
  const builtStaggerOffset =
    mobileLabStaggerOffset + getMobileLabStaggerItemCount();
  const blogStaggerOffset =
    builtStaggerOffset +
    getBuiltListStaggerItemCount(projects.length) +
    getMobileLabStaggerItemCount();

  return (
    <>
      <JsonLd data={homeSchema} />
      <main className="fade-in-stagger mx-auto max-w-173 px-6 py-12 leading-relaxed sm:py-24">
        <div className="fade-in-item">
          <div className="mb-6 flex items-center justify-start gap-3">
            <div className="group relative size-11 shrink-0 [perspective:800px] before:absolute before:-inset-2 before:content-['']">
              <Image
                alt="Pinak Faldu"
                width="88"
                height="88"
                priority
                sizes="44px"
                className="pointer-events-none size-11 rounded-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] [transform-style:preserve-3d] motion-reduce:transition-none [@media(hover:hover)_and_(pointer:fine)]:group-hover:-rotate-y-180"
                src="/assets/personal.png"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="flex items-center gap-1 font-medium text-gray-1200 leading-snug">
                Pinak Faldu
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="inline-block size-4 shrink-0 text-blue-500"
                  fill="currentColor"
                  stroke="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.00 1.00A4.62 4.62 0 0 1 14.58 3.22A3.84 3.84 0 0 1 17.95 2.75A4.62 4.62 0 0 1 18.92 6.01A3.84 3.84 0 0 1 22.01 7.43A4.62 4.62 0 0 1 21.06 10.70A3.84 3.84 0 0 1 22.89 13.57A4.62 4.62 0 0 1 20.32 15.80A3.84 3.84 0 0 1 20.31 19.20A4.62 4.62 0 0 1 16.95 19.70A3.84 3.84 0 0 1 15.10 22.55A4.62 4.62 0 0 1 12.00 21.15A3.84 3.84 0 0 1 8.90 22.55A4.62 4.62 0 0 1 7.05 19.70A3.84 3.84 0 0 1 3.69 19.20A4.62 4.62 0 0 1 3.68 15.80A3.84 3.84 0 0 1 1.11 13.57A4.62 4.62 0 0 1 2.94 10.70A3.84 3.84 0 0 1 1.99 7.43A4.62 4.62 0 0 1 5.08 6.01A3.84 3.84 0 0 1 6.05 2.75A4.62 4.62 0 0 1 9.42 3.22A3.84 3.84 0 0 1 12.00 1.00Z M10.55 16.05 L6.95 12.45 L8.6 10.8 L10.55 12.75 L15.4 7.9 L17.05 9.55 Z"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </h1>
              <span className="text-gray-1100 leading-snug">
                Product Designer & Lead
              </span>
            </div>
          </div>
        </div>

        <p className="fade-in-item mb-4 text-gray-1100 leading-relaxed">
          I'm a product engineer at{" "}
          <SocialBadge
            href="https://ionio.ai"
            icon="/assets/case-study/ionio.png"
            name="Ionio"
          />
          , working across design, code, and everything in between. I like
          building products, helping with how they work, and doing whatever else
          it takes to get them out into the world.
        </p>

        <p className="fade-in-item mb-4 text-gray-1100 leading-relaxed">
          I've built SaaS platforms, payment systems, data enrichment pipelines,
          mobile apps, AI-powered tools, automation workflows, and the
          infrastructure behind them.
        </p>

        <p className="fade-in-item mb-4 text-gray-1100 leading-relaxed">
          Sometimes I'm <WritingCode days={activity}>writing code</WritingCode>.
          Sometimes I'm thinking through a{" "}
          <ProductDesign>product design</ProductDesign>. Sometimes I'm{" "}
          <TooltipAnchor
            className="keyword"
            tooltip="I've redesigned this in my head more times than I can count"
          >
            <span>overthinking the details.</span>
          </TooltipAnchor>
        </p>

        <p className="fade-in-item mb-4 text-gray-1100 leading-relaxed">
          You can find my code on{" "}
          <SocialBadge
            href="https://github.com/pinak3748"
            icon="/github.svg"
            name="GitHub"
          />
          , my thoughts on{" "}
          <SocialBadge
            href="https://x.com/iampinak_"
            icon="/twitter.svg"
            name="X"
          />
          , and my professional history on{" "}
          <SocialBadge
            href="https://linkedin.com/in/pinakfaldu"
            icon="/linkedin.svg"
            name="LinkedIn"
          />
          .
        </p>

        <WorkTree groups={work} staggerOffset={5} />

        <BuiltList projects={projects} staggerOffset={builtStaggerOffset} />

        <MobileLabGrid
          apps={mobileApps}
          staggerOffset={mobileLabStaggerOffset}
        />

        <BlogList posts={blogPosts} staggerOffset={blogStaggerOffset} />

        <SiteFooter personal={personal} />
      </main>
    </>
  );
}

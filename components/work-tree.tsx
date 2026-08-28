"use client";

import Image from "next/image";
import Link from "next/link";
import { type CSSProperties, useEffect, useState } from "react";
import { RedirectIcon } from "@/components/icons";
import { SectionHeading } from "@/components/section-heading";
import { type CompanyGroup, tagTone } from "@/lib/case-studies";
import { staggerStyle } from "@/lib/fade-in";

function ProjectRow({
  project,
}: {
  project: CompanyGroup["projects"][number];
}) {
  return (
    <Link
      href={`/work/${project.id}`}
      className="flex min-w-0 cursor-pointer items-center gap-2.5 rounded-md py-1.5 pr-1 -ml-1 pl-1 no-underline transition-colors duration-160 ease-[var(--ease-out)] hover:bg-gray-100 focus-visible:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-1200"
    >
      <Image
        src={project.logo}
        alt={`${project.title} logo`}
        width={40}
        height={40}
        sizes="20px"
        className="size-5 shrink-0 rounded-[5px] object-cover shadow-[0_0_0_1px_color-mix(in_srgb,var(--color-gray-1200)_8%,transparent)]"
      />
      <span className="min-w-0 flex-1 truncate text-[0.9375rem] leading-6 text-gray-1200">
        {project.title}
      </span>
      {project.tags[0] ? (
        <span
          className={`shrink-0 truncate rounded-full px-2.5 py-1 text-xs leading-4 font-medium ${tagTone(project.tags[0])}`}
        >
          {project.tags[0]}
        </span>
      ) : null}
    </Link>
  );
}

function CompanyBranch({
  group,
  companyStaggerIndex,
  projectStaggerIndices,
}: {
  group: CompanyGroup;
  companyStaggerIndex: number;
  projectStaggerIndices: Map<string, number>;
}) {
  const [open, setOpen] = useState(true);
  const [motionReady, setMotionReady] = useState(false);

  useEffect(() => {
    setMotionReady(true);
  }, []);

  function keepRowClosed(event: React.MouseEvent) {
    event.stopPropagation();
  }

  return (
    <details
      open={open}
      data-motion={motionReady ? "" : undefined}
      onToggle={(event) => {
        const next = event.currentTarget.open;
        if (next !== open) setOpen(next);
      }}
    >
      <summary
        className="fade-in-item flex cursor-pointer items-center gap-2 rounded-md py-1.5 pr-1 -ml-1 pl-1 outline-none select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-1200"
        style={staggerStyle(companyStaggerIndex)}
      >
        <Image
          src={group.logo}
          alt={`${group.company} logo`}
          width={40}
          height={40}
          sizes="20px"
          className="size-5 shrink-0 rounded-[5px] object-cover shadow-[0_0_0_1px_color-mix(in_srgb,var(--color-gray-1200)_8%,transparent)]"
        />
        <span className="min-w-0 truncate text-[0.9375rem] leading-6 text-gray-1100">
          {group.company}
        </span>
        {group.link ? (
          <Link
            href={group.link}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${group.company} website`}
            onClick={keepRowClosed}
            className="work-redirect shrink-0 rounded-full p-0.5 text-gray-800 hover:text-gray-1200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-1200"
          >
            <RedirectIcon />
          </Link>
        ) : null}
      </summary>
      <div className="work-company-panel" inert={open ? undefined : true}>
        <div className="work-company-panel-inner">
          <ul className="work-tree-list">
            {group.projects.map((project) => (
              <li
                key={project.id}
                className="work-tree-item fade-in-item"
                style={staggerStyle(projectStaggerIndices.get(project.id) ?? 0)}
              >
                <ProjectRow project={project} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </details>
  );
}

function buildWorkStaggerIndices(groups: CompanyGroup[]) {
  const companyIndices = new Map<string, number>();
  const projectIndices = new Map<string, number>();
  let index = 1;

  for (const group of groups) {
    companyIndices.set(group.id, index++);

    for (const project of group.projects) {
      projectIndices.set(project.id, index++);
    }
  }

  return { companyIndices, projectIndices };
}

export function WorkTree({
  groups,
  staggerOffset = 0,
}: {
  groups: CompanyGroup[];
  staggerOffset?: number;
}) {
  const { companyIndices, projectIndices } = buildWorkStaggerIndices(groups);

  return (
    <section
      className="work-tree mt-10"
      aria-label="Past work"
      style={
        staggerOffset > 0
          ? ({
              "--stagger-offset": `calc(var(--stagger-step) * ${staggerOffset})`,
            } as CSSProperties)
          : undefined
      }
    >
      <SectionHeading className="fade-in-item" style={staggerStyle(0)}>
        Work
      </SectionHeading>
      <ul className="work-tree-list">
        {groups.map((group) => (
          <li key={group.id} className="work-tree-item">
            <CompanyBranch
              group={group}
              companyStaggerIndex={companyIndices.get(group.id) ?? 0}
              projectStaggerIndices={projectIndices}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

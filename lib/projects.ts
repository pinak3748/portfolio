import projects from "@/public/data/projects.json";

export type Project = {
  id: string;
  title: string;
  description: string;
  stable: string;
  tags: string[];
  url: string;
  stars?: number;
};

const INITIAL_VISIBLE = 3;

export function getProjects(): Project[] {
  return projects as Project[];
}

export function getBuiltListStaggerItemCount(
  projectCount: number,
  collapsed = true,
) {
  if (projectCount === 0) return 0;

  const visibleRows = collapsed
    ? Math.min(INITIAL_VISIBLE, projectCount)
    : projectCount;
  const hasMore = projectCount > INITIAL_VISIBLE;

  return 1 + visibleRows + (collapsed && hasMore ? 1 : 0);
}

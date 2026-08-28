import studies from "@/public/data/case-studies.json";

export type CaseStudyImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type BlogPost = {
  title: string;
  href: string;
};

export type CaseStudyLink = {
  title: string;
  link: string;
};

export type CaseStudy = {
  id: string;
  title: string;
  logo: string;
  description: string;
  features: { name: string; description: string }[];
  tags: string[];
  images: CaseStudyImage[];
  caseStudy?: CaseStudyLink;
  blogs?: BlogPost[];
};

export type CompanyGroup = {
  id: string;
  company: string;
  logo: string;
  link?: string;
  projects: CaseStudy[];
};

export function getCompanies(): CompanyGroup[] {
  return studies as CompanyGroup[];
}

export function getWorkStaggerItemCount(groups: CompanyGroup[]) {
  let count = 1;

  for (const group of groups) {
    count += 1 + group.projects.length;
  }

  return count;
}

export function getCaseStudy(id: string): CaseStudy | undefined {
  return getCompanies()
    .flatMap((company) => company.projects)
    .find((project) => project.id === id);
}

export function getCaseStudyWithCompany(id: string) {
  for (const company of getCompanies()) {
    const project = company.projects.find((p) => p.id === id);
    if (project) return { project, company };
  }
}

const TAG_CLASS = "bg-gray-200 text-gray-1100";

export function tagTone(_tag: string) {
  return TAG_CLASS;
}

import apps from "@/public/data/mobile-apps.json";

export type MobileAppScreenshot = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type MobileAppBlogPost = {
  title: string;
  href: string;
};

export type MobileApp = {
  id: string;
  appStoreId: number;
  displayName: string;
  title: string;
  subtitle: string;
  description: string;
  releaseNotes: string;
  version: string;
  releaseDate: string;
  category: string;
  ageRating: string;
  developer: string;
  languages: string[];
  size: string;
  price: string;
  minimumOsVersion: string;
  appStoreUrl: string;
  playStoreUrl?: string;
  logo: string;
  screenshots: MobileAppScreenshot[];
  blogs?: MobileAppBlogPost[];
};

const INITIAL_VISIBLE = 7;

export function getMobileApps(): MobileApp[] {
  return apps as MobileApp[];
}

export function getMobileApp(id: string): MobileApp | undefined {
  return getMobileApps().find((app) => app.id === id);
}

export function getMobileLabStaggerItemCount(collapsed = true) {
  const count = getMobileApps().length;
  const visibleTiles = collapsed
    ? Math.min(INITIAL_VISIBLE, count) + (count > INITIAL_VISIBLE ? 1 : 0)
    : count;
  return 1 + visibleTiles;
}

export { INITIAL_VISIBLE as MOBILE_LAB_INITIAL_VISIBLE };

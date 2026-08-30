import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import type { ReactElement, ReactNode } from "react";
import { SITE_NAME } from "@/lib/metadata";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";
export const OG_ROLE = "Product Designer & Lead";

const geistMedium = await readFile(
  join(process.cwd(), "lib/og/fonts/Geist-Medium.ttf"),
);
const geistRegular = await readFile(
  join(process.cwd(), "lib/og/fonts/Geist-Regular.ttf"),
);

const logoSrc = `data:image/svg+xml;base64,${(
  await readFile(join(process.cwd(), "public/logo.svg"))
).toString("base64")}`;

function OgLogo() {
  return (
    // biome-ignore lint/performance/noImgElement: ImageResponse has no next/image
    <img src={logoSrc} width={80} height={80} alt="" />
  );
}

function OgFrame({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#ffffff",
        padding: "72px 80px",
        fontFamily: "Geist",
      }}
    >
      <OgLogo />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 960,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function titleSize(title: string) {
  if (title.length <= 28) return 72;
  if (title.length <= 48) return 60;
  return 52;
}

export function createOgImage(element: ReactElement) {
  return new ImageResponse(element, {
    ...OG_SIZE,
    fonts: [
      {
        name: "Geist",
        data: geistMedium,
        weight: 500,
        style: "normal",
      },
      {
        name: "Geist",
        data: geistRegular,
        weight: 400,
        style: "normal",
      },
    ],
  });
}

export function OgProfileImage() {
  return createOgImage(
    <OgFrame>
      <div
        style={{
          display: "flex",
          fontSize: 56,
          fontWeight: 500,
          color: "#202020",
          letterSpacing: -1.6,
          lineHeight: 1.1,
        }}
      >
        {SITE_NAME}
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 10,
          fontSize: 28,
          fontWeight: 400,
          color: "#646464",
          letterSpacing: -0.2,
        }}
      >
        {OG_ROLE}
      </div>
    </OgFrame>,
  );
}

export function OgBlogImage({ title }: { title: string }) {
  return createOgImage(
    <OgFrame>
      <div
        style={{
          display: "flex",
          fontSize: titleSize(title),
          fontWeight: 500,
          color: "#202020",
          letterSpacing: -1.8,
          lineHeight: 1.12,
        }}
      >
        {title}
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 18,
          fontSize: 28,
          fontWeight: 400,
          color: "#646464",
          letterSpacing: -0.2,
        }}
      >
        {SITE_NAME}
      </div>
    </OgFrame>,
  );
}

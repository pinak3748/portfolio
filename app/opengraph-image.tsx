import { OgProfileImage } from "@/lib/og/image";

export const alt = "Pinak Faldu";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return OgProfileImage();
}

"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { TooltipAnchor } from "./tooltip-anchor";

export function ProductDesign({ children }: { children: ReactNode }) {
  return (
    <TooltipAnchor
      className="keyword"
      variant="card"
      tooltip={
        <div className="preview-card">
          <Image
            src="/assets/excalidraw.png"
            alt="Product design board"
            width={2152}
            height={1562}
            sizes="150px"
          />
        </div>
      }
    >
      {children}
    </TooltipAnchor>
  );
}

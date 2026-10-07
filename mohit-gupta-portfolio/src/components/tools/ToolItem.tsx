"use client";

import { useRef, type CSSProperties } from "react";
import type { Tool } from "@/data/tools";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useParallax } from "@/hooks/useParallax";
import { MEDIA } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * One floating tool name. Two motions are layered on separate elements:
 * scroll parallax on the outer one, a slow ambient drift on the inner one.
 */
export default function ToolItem({ tool, index }: { tool: Tool; index: number }) {
  const layer = useRef<HTMLDivElement>(null);
  // The rows sit too close together on phones to drift past each other.
  const roomy = useMediaQuery(MEDIA.tablet);
  useParallax(layer, roomy ? tool.depth * 2.5 : 0);

  return (
    <li className="tool-row" style={{ "--offset": tool.offset } as CSSProperties}>
      <div ref={layer} className="w-max will-change-transform">
        <div
          className="drift group flex items-center gap-4 md:gap-6"
          style={
            { "--drift-time": `${tool.drift}s`, "--drift-delay": `${index * -1.7}s` } as CSSProperties
          }
        >
          <span
            aria-hidden
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-glass text-sm font-semibold backdrop-blur-md transition-colors duration-500 ease-cine group-hover:border-warm group-hover:text-warm md:h-14 md:w-14 md:text-base"
          >
            {tool.mark}
          </span>
          <span
            className={cn(
              "display text-[clamp(1.6rem,6vw,6.5rem)] transition-[color,-webkit-text-stroke-color] duration-500 ease-cine group-hover:text-paper",
              tool.outline && "outline-text",
            )}
          >
            {tool.name}
          </span>
        </div>
      </div>
    </li>
  );
}

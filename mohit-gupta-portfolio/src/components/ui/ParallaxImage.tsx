"use client";

import { useRef } from "react";
import Image from "next/image";
import type { Photo } from "@/data/portfolio";
import { useParallax } from "@/hooks/useParallax";
import { cn } from "@/lib/utils";

type Props = {
  photo: Photo;
  sizes: string;
  strength?: number;
  priority?: boolean;
  className?: string;
};

/**
 * Fills its parent with a photo that drifts slower than the page.
 * The parent must be positioned and have a defined size.
 */
export default function ParallaxImage({ photo, sizes, strength = 8, priority, className }: Props) {
  const layer = useRef<HTMLDivElement>(null);
  useParallax(layer, strength);

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {/* Oversized vertically so the drift never exposes an edge. */}
      <div ref={layer} className="absolute inset-x-0 -inset-y-[12%] will-change-transform">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    </div>
  );
}

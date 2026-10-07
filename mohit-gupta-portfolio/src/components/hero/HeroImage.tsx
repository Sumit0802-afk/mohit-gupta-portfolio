"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { heroImage } from "@/data/portfolio";
import { gsap } from "@/lib/gsap";
import { MEDIA } from "@/lib/constants";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useMousePosition } from "@/hooks/useMousePosition";

/**
 * Full-bleed hero photograph. Three nested layers keep the transforms apart:
 *   [data-hero-scroll]  sinks as the page scrolls        (heroScroll)
 *   pointer layer       leans a few pixels with the mouse (here)
 *   [data-hero-image]   settles from 105% to 100% on load (playIntro)
 */
export default function HeroImage() {
  const pointerLayer = useRef<HTMLDivElement>(null);
  const finePointer = useMediaQuery(MEDIA.finePointer);
  const reduced = useMediaQuery(MEDIA.reducedMotion);
  const lean = useRef<{ x: (value: number) => void; y: (value: number) => void } | null>(null);

  useEffect(() => {
    if (!pointerLayer.current) return;
    lean.current = {
      x: gsap.quickTo(pointerLayer.current, "x", { duration: 1.4, ease: "power3.out" }),
      y: gsap.quickTo(pointerLayer.current, "y", { duration: 1.4, ease: "power3.out" }),
    };
  }, []);

  useMousePosition(({ nx, ny }) => {
    lean.current?.x(nx * -14);
    lean.current?.y(ny * -10);
  }, finePointer && !reduced);

  return (
    <div data-hero-scroll className="absolute inset-0 will-change-transform">
      <div ref={pointerLayer} className="absolute -inset-4 will-change-transform">
        <div data-hero-image className="absolute inset-0 will-change-transform">
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}

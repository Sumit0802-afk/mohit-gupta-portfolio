"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "@/lib/gsap";
import { MEDIA } from "@/lib/constants";

/**
 * Drifts an element vertically while its parent crosses the viewport.
 * `strength` is the travel in percent of the element's own height, each way.
 */
export function useParallax(ref: RefObject<HTMLElement | null>, strength = 10) {
  useEffect(() => {
    const element = ref.current;
    if (!element || !strength) return;

    const media = gsap.matchMedia();
    media.add(MEDIA.motionOk, () => {
      gsap.fromTo(
        element,
        { yPercent: -strength },
        {
          yPercent: strength,
          ease: "none",
          scrollTrigger: {
            trigger: element.parentElement ?? element,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    });

    return () => media.revert();
  }, [ref, strength]);
}

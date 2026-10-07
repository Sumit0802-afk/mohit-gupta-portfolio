"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { MEDIA } from "@/lib/constants";
import { initScrollEffects, refreshOnFontsReady } from "@/animations/scrollAnimations";

/**
 * Wrap a page in this to activate the data-reveal* attributes used by the
 * (server-rendered) sections inside it.
 */
export default function ScrollEffects({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = scope.current;
    if (!element) return;

    const media = gsap.matchMedia();
    media.add(MEDIA.motionOk, () => {
      initScrollEffects(element);
      refreshOnFontsReady();
    });
    return () => media.revert();
  }, []);

  return <div ref={scope}>{children}</div>;
}

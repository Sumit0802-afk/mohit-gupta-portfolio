/** Cinematic easing used everywhere: cubic-bezier(0.22, 1, 0.36, 1). */
export const EASE_BEZIER = [0.22, 1, 0.36, 1] as const;

/** Name of the same curve once registered with GSAP (see lib/gsap.ts). */
export const EASE = "cine";

export const MEDIA = {
  desktop: "(min-width: 1024px)",
  tablet: "(min-width: 768px)",
  finePointer: "(hover: hover) and (pointer: fine) and (min-width: 1024px)",
  reducedMotion: "(prefers-reduced-motion: reduce)",
  motionOk: "(prefers-reduced-motion: no-preference)",
} as const;

/** Black-screen transition between the home page and a gallery, in ms. */
export const PAGE_TRANSITION = {
  cover: 380,
  hold: 100,
  reveal: 320,
} as const;

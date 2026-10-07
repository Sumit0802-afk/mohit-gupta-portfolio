import { gsap, ScrollTrigger } from "@/lib/gsap";
import { revealImages } from "./imageAnimations";
import { revealBlocks, revealLines } from "./textAnimations";

/**
 * Wires up every declarative scroll effect inside `scope`:
 *   [data-reveal]         fade / rise / blur-to-sharp
 *   [data-reveal-lines]   masked line-by-line text reveal
 *   [data-reveal-image]   clip-path image reveal
 *   [data-progress-line]  hairline that fills as its parent scrolls past
 * Call inside a gsap.context so everything is reverted on unmount.
 */
export function initScrollEffects(scope: HTMLElement) {
  const select = gsap.utils.selector(scope);

  revealBlocks(select("[data-reveal]"));
  revealImages(select("[data-reveal-image]"));
  select("[data-reveal-lines]").forEach((element: HTMLElement) => revealLines(element));

  select("[data-progress-line]").forEach((line: HTMLElement) => {
    gsap.fromTo(
      line,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: line.parentElement,
          start: "top 70%",
          end: "bottom 60%",
          scrub: true,
        },
      },
    );
  });
}

/**
 * Pins `pin` and converts vertical scrolling into horizontal travel of `track`.
 * Images tagged [data-chapter-image] counter-drift for depth, and `bar` (if
 * given) fills with the overall progress.
 */
export function horizontalScroll(pin: HTMLElement, track: HTMLElement, bar?: HTMLElement | null) {
  const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

  const travel = gsap.to(track, {
    x: () => -distance(),
    ease: "none",
    scrollTrigger: {
      trigger: pin,
      pin: true,
      scrub: 0.6,
      start: "top top",
      end: () => `+=${distance()}`,
      invalidateOnRefresh: true,
      onUpdate: (self) => bar && gsap.set(bar, { scaleX: self.progress }),
    },
  });

  track.querySelectorAll<HTMLElement>("[data-chapter-image]").forEach((image) => {
    gsap.fromTo(
      image,
      { xPercent: -7 },
      {
        xPercent: 7,
        ease: "none",
        scrollTrigger: {
          trigger: image.parentElement,
          containerAnimation: travel,
          start: "left right",
          end: "right left",
          scrub: true,
        },
      },
    );
  });
}

/** Slides an oversized line of type sideways as its section scrolls through. */
export function horizontalDrift(section: HTMLElement, line: HTMLElement) {
  const overflow = () => Math.max(0, line.scrollWidth - window.innerWidth * 0.86);

  gsap.fromTo(
    line,
    { x: () => window.innerWidth * 0.14 },
    {
      x: () => -overflow(),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    },
  );
}

export function refreshOnFontsReady() {
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

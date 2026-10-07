import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";
import { EASE } from "@/lib/constants";

/**
 * Splits a block into lines and slides each one up from behind a mask when it
 * scrolls into view. Re-splits itself on resize and once web fonts load.
 */
export function revealLines(element: HTMLElement) {
  gsap.set(element, { autoAlpha: 1 });

  SplitText.create(element, {
    type: "lines",
    mask: "lines",
    autoSplit: true,
    onSplit(self) {
      return gsap.from(self.lines, {
        yPercent: 110,
        duration: 1.25,
        ease: EASE,
        stagger: 0.09,
        scrollTrigger: { trigger: element, start: "top 88%", once: true },
      });
    },
  });
}

/** Fade + rise + blur-to-sharp, batched so neighbours stagger together. */
export function revealBlocks(elements: HTMLElement[]) {
  if (!elements.length) return;

  gsap.set(elements, { autoAlpha: 0, y: 36, filter: "blur(10px)" });

  ScrollTrigger.batch(elements, {
    start: "top 90%",
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.1,
        ease: EASE,
        stagger: 0.09,
        clearProps: "filter",
      }),
  });
}

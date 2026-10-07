import { gsap } from "@/lib/gsap";
import { EASE } from "@/lib/constants";

// The loader + laptop opening only plays on the first visit of a session.
// Coming back from a gallery gets a shorter entrance.
let introPlayed = false;
export const hasIntroPlayed = () => introPlayed;

type IntroOptions = { desktop: boolean; reduced: boolean };

/**
 * Opening sequence:
 *   black screen -> 00..100 counter -> clip-path reveal -> the site sits in a
 *   laptop frame (desktop only) -> frame pushes in to full screen -> type,
 *   navigation and metadata arrive in order.
 * Must be called inside a gsap.context.
 */
export function playIntro(root: HTMLElement, { desktop, reduced }: IntroOptions) {
  const select = gsap.utils.selector(root);
  const html = document.documentElement;
  const loader = document.querySelector<HTMLElement>("[data-loader]");
  const nav = document.querySelector<HTMLElement>("[data-nav]");

  if (reduced) {
    if (loader) gsap.set(loader, { display: "none" });
    introPlayed = true;
    return;
  }

  const firstVisit = !introPlayed && !!loader;
  const framed = firstVisit && desktop;

  const device = select("[data-hero-device]");
  const screen = select("[data-hero-screen]");
  const chrome = select("[data-hero-chrome]");

  gsap.set(select("[data-hero-char]"), { yPercent: 115 });
  gsap.set(select("[data-hero-meta]"), { autoAlpha: 0, y: 18 });
  gsap.set(select("[data-hero-image]"), { scale: 1.05 });
  if (nav) gsap.set(nav, { autoAlpha: 0, y: -14 });
  if (framed) {
    gsap.set(device, { scale: 0.62 });
    gsap.set(screen, { borderRadius: "1.1vw" });
    gsap.set(chrome, { autoAlpha: 1 });
  }

  const timeline = gsap.timeline({
    defaults: { ease: EASE },
    onComplete: () => {
      html.classList.remove("intro-lock");
      gsap.set(device, { clearProps: "transform,willChange" });
    },
  });

  if (firstVisit && loader) {
    html.classList.add("intro-lock");
    const count = loader.querySelector<HTMLElement>("[data-loader-count]");
    const bar = loader.querySelector<HTMLElement>("[data-loader-bar]");
    const progress = { value: 0 };

    timeline
      .to(progress, {
        value: 100,
        duration: 1.4,
        delay: 0.3,
        ease: "steps(4)",
        onUpdate: () => {
          if (count) count.textContent = String(Math.round(progress.value)).padStart(2, "0");
        },
      })
      .to(bar, { scaleX: 1, duration: 1.4, ease: "power1.inOut" }, "<")
      .addLabel("reveal", "+=0.3")
      .to(loader, { clipPath: "inset(0% 0% 100% 0%)", duration: 1, ease: "power3.inOut" }, "reveal")
      .set(loader, { display: "none" })
      .call(() => void (introPlayed = true), [], "reveal");
  } else {
    timeline.addLabel("reveal", 0);
  }

  timeline
    .to(select("[data-hero-image]"), { scale: 1, duration: 2.8, ease: "power2.out" }, "reveal")
    .to(select("[data-hero-char]"), { yPercent: 0, duration: 1.3, stagger: 0.04 }, "reveal+=0.25");

  if (framed) {
    timeline
      .to(device, { scale: 1, duration: 1.7, ease: "power3.inOut" }, "reveal+=1.15")
      .to(screen, { borderRadius: 0, duration: 0.7, ease: "power2.in" }, "reveal+=2.1")
      .to(chrome, { autoAlpha: 0, duration: 0.4, ease: "power1.out" }, "reveal+=2.4");
  }

  const settle = framed ? "reveal+=2.5" : "reveal+=0.9";
  if (nav) timeline.to(nav, { autoAlpha: 1, y: 0, duration: 0.9 }, settle);
  timeline.to(
    select("[data-hero-meta]"),
    { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.12 },
    framed ? "reveal+=2.6" : "reveal+=1",
  );
}

/** Hero leaves the frame with depth: picture sinks, type lifts and fades. */
export function heroScroll(root: HTMLElement) {
  const select = gsap.utils.selector(root);
  const scrollTrigger = { trigger: root, start: "top top", end: "bottom top", scrub: true };

  gsap.to(select("[data-hero-scroll]"), { yPercent: 14, ease: "none", scrollTrigger });
  gsap.to(select("[data-hero-title]"), { yPercent: -22, ease: "none", scrollTrigger });
  gsap.to(select("[data-hero-shade]"), { opacity: 1, ease: "none", scrollTrigger });
}

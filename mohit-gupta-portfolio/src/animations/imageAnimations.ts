import { gsap, ScrollTrigger } from "@/lib/gsap";
import { EASE } from "@/lib/constants";

/**
 * Clip-path image reveal: the frame opens from a 10% inset while the picture
 * inside settles from 108% to 100%.
 */
export function revealImages(frames: HTMLElement[]) {
  if (!frames.length) return;

  const inner = (frame: HTMLElement) =>
    frame.querySelector<HTMLElement>("[data-reveal-inner]") ?? frame.firstElementChild;

  frames.forEach((frame) => {
    gsap.set(frame, { autoAlpha: 0, clipPath: "inset(10% 10% 10% 10%)" });
    gsap.set(inner(frame), { scale: 1.08 });
  });

  ScrollTrigger.batch(frames, {
    start: "top 92%",
    once: true,
    onEnter: (batch) => {
      gsap.to(batch, {
        autoAlpha: 1,
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.4,
        ease: EASE,
        stagger: 0.12,
        clearProps: "clipPath",
      });
      gsap.to(
        batch.map((frame) => inner(frame as HTMLElement)),
        { scale: 1, duration: 1.8, ease: EASE, stagger: 0.12 },
      );
    },
  });
}

/**
 * Very subtle 3D tilt that follows the pointer across `surface`.
 * Returns a cleanup function.
 */
export function attachTilt(surface: HTMLElement, target: HTMLElement, maxDegrees = 2.5) {
  gsap.set(target, { transformPerspective: 1400 });
  const rotateX = gsap.quickTo(target, "rotationX", { duration: 0.9, ease: "power3.out" });
  const rotateY = gsap.quickTo(target, "rotationY", { duration: 0.9, ease: "power3.out" });

  const onMove = (event: PointerEvent) => {
    if (event.pointerType === "touch") return;
    const box = surface.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    rotateY(x * maxDegrees * 2);
    rotateX(-y * maxDegrees * 2);
  };
  const onLeave = () => {
    rotateX(0);
    rotateY(0);
  };

  surface.addEventListener("pointermove", onMove);
  surface.addEventListener("pointerleave", onLeave);
  return () => {
    surface.removeEventListener("pointermove", onMove);
    surface.removeEventListener("pointerleave", onLeave);
    gsap.killTweensOf(target);
    gsap.set(target, { clearProps: "transform" });
  };
}

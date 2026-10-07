import { gsap } from "@/lib/gsap";

/** Returns a function that eases `element` towards a viewport position. */
export function createFollower(element: HTMLElement, duration = 0.45) {
  const toX = gsap.quickTo(element, "x", { duration, ease: "power3.out" });
  const toY = gsap.quickTo(element, "y", { duration, ease: "power3.out" });

  let placed = false;
  return (x: number, y: number) => {
    if (!placed) {
      // First move: jump straight there instead of flying in from the corner.
      gsap.set(element, { x, y });
      placed = true;
    }
    toX(x);
    toY(y);
  };
}

/**
 * Magnetic pull: `element` leans towards the pointer while it is inside it.
 * Returns a cleanup function.
 */
export function attachMagnet(element: HTMLElement, strength = 0.3) {
  const toX = gsap.quickTo(element, "x", { duration: 0.7, ease: "power3.out" });
  const toY = gsap.quickTo(element, "y", { duration: 0.7, ease: "power3.out" });

  const onMove = (event: PointerEvent) => {
    if (event.pointerType === "touch") return;
    const box = element.getBoundingClientRect();
    toX((event.clientX - (box.left + box.width / 2)) * strength);
    toY((event.clientY - (box.top + box.height / 2)) * strength);
  };
  const onLeave = () => {
    toX(0);
    toY(0);
  };

  element.addEventListener("pointermove", onMove);
  element.addEventListener("pointerleave", onLeave);
  return () => {
    element.removeEventListener("pointermove", onMove);
    element.removeEventListener("pointerleave", onLeave);
    gsap.killTweensOf(element);
    gsap.set(element, { clearProps: "transform" });
  };
}

import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { EASE, EASE_BEZIER } from "./constants";

// Single registration point so every animation module shares the same setup.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);
  CustomEase.create(EASE, EASE_BEZIER.join(","));
}

export { gsap, ScrollTrigger, SplitText };

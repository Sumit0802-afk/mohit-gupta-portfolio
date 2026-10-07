"use client";

import "lenis/dist/lenis.css";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

/** Mounts Lenis for the whole app. Renders nothing. */
export default function SmoothScroll() {
  useSmoothScroll();
  return null;
}

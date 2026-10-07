import type { Variants } from "framer-motion";
import { EASE_BEZIER, PAGE_TRANSITION } from "@/lib/constants";

const ease = [...EASE_BEZIER] as [number, number, number, number];

/** Black curtain: wipes up to cover the page, then lifts away off the top. */
export const curtain: Variants = {
  initial: { clipPath: "inset(100% 0% 0% 0%)" },
  cover: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: PAGE_TRANSITION.cover / 1000, ease },
  },
  exit: {
    clipPath: "inset(0% 0% 100% 0%)",
    transition: { duration: PAGE_TRANSITION.reveal / 1000, ease },
  },
};

/** The category name riding inside the curtain. */
export const curtainLabel: Variants = {
  initial: { y: "110%" },
  cover: {
    y: "0%",
    transition: { duration: 0.5, ease, delay: 0.12 },
  },
  exit: {
    y: "-60%",
    opacity: 0,
    transition: { duration: PAGE_TRANSITION.reveal / 1000, ease },
  },
};

/** Lightbox + mobile menu overlays. */
export const overlayFade: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.45, ease } },
  exit: { opacity: 0, transition: { duration: 0.3, ease } },
};

export const menuPanel: Variants = {
  initial: { clipPath: "inset(0% 0% 100% 0%)" },
  animate: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 0.75, ease, staggerChildren: 0.07, delayChildren: 0.2 },
  },
  exit: { clipPath: "inset(0% 0% 100% 0%)", transition: { duration: 0.5, ease } },
};

export const menuItem: Variants = {
  initial: { y: "110%" },
  animate: { y: "0%", transition: { duration: 0.9, ease } },
  exit: { y: "0%" },
};

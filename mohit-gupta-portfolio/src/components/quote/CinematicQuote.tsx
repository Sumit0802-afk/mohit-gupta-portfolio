"use client";

import { useEffect, useRef } from "react";
import { horizontalDrift } from "@/animations/scrollAnimations";
import { personal } from "@/data/personal";
import { gsap } from "@/lib/gsap";
import { MEDIA } from "@/lib/constants";

/** Full-screen black interlude. The line slides sideways as you scroll past. */
export default function CinematicQuote() {
  const section = useRef<HTMLElement>(null);
  const line = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const media = gsap.matchMedia();
    media.add(MEDIA.motionOk, () => {
      if (section.current && line.current) horizontalDrift(section.current, line.current);
    });
    return () => media.revert();
  }, []);

  return (
    <section
      ref={section}
      aria-label="Quote"
      className="flex min-h-svh flex-col justify-center gap-12 overflow-hidden bg-black py-24"
    >
      <blockquote>
        <p
          ref={line}
          className="accent w-max whitespace-nowrap px-[var(--gutter)] text-[19vw] leading-none will-change-transform motion-reduce:w-auto motion-reduce:whitespace-normal motion-reduce:text-[13vw] md:text-[13.5vw] md:motion-reduce:text-[9vw]"
        >
          &ldquo;Every frame tells a <span className="text-warm">story</span>.&rdquo;
        </p>
      </blockquote>

      <p className="label shell flex flex-col gap-1 text-mute md:flex-row md:gap-4">
        <span className="font-bold text-paper">{personal.name}</span>
        <span aria-hidden className="hidden md:inline">
          /
        </span>
        <span>{personal.role}</span>
      </p>
    </section>
  );
}

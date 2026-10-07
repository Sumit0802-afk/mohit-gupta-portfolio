"use client";

import { Fragment, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { horizontalScroll } from "@/animations/scrollAnimations";
import { chapters } from "@/data/portfolio";
import { gsap } from "@/lib/gsap";
import { pad2 } from "@/lib/utils";
import NavigationLink from "@/components/navigation/NavigationLink";
import RollText from "@/components/ui/RollText";
import PortfolioLink from "./PortfolioLink";

/**
 * Sticky horizontal chapter reel: vertical scrolling moves the pictures
 * sideways on tablet and up. On phones (and with reduced motion) it becomes a
 * plain swipeable row.
 */
export default function HorizontalShowcase() {
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      if (pin.current && track.current) horizontalScroll(pin.current, track.current, bar.current);
    });
    return () => media.revert();
  }, []);

  return (
    <section aria-label="Chapters" className="relative bg-ink">
      <div
        ref={pin}
        className="no-scrollbar relative overflow-x-auto py-20 md:motion-safe:flex md:motion-safe:h-svh md:motion-safe:flex-col md:motion-safe:justify-center md:motion-safe:overflow-hidden md:motion-safe:py-0"
      >
        {/* Chapter index + progress */}
        <div className="shell sticky left-0 mb-10 md:motion-safe:absolute md:motion-safe:inset-x-0 md:motion-safe:top-24 md:motion-safe:mb-0">
          <p className="label flex flex-wrap items-center gap-x-3 gap-y-1 text-mute">
            {chapters.map((chapter, index) => (
              <Fragment key={chapter.name}>
                {index > 0 && <ArrowRight size={12} strokeWidth={1.5} aria-hidden />}
                <span>{chapter.name}</span>
              </Fragment>
            ))}
          </p>
          <span className="mt-4 hidden h-px w-full bg-white/10 md:motion-safe:block" aria-hidden>
            <span
              ref={bar}
              className="block h-full origin-left bg-warm"
              style={{ transform: "scaleX(0)" }}
            />
          </span>
        </div>

        <div
          ref={track}
          className="flex w-max items-center gap-6 px-[var(--gutter)] will-change-transform md:gap-[5vw]"
        >
          <div className="w-[70vw] shrink-0 md:w-[30vw]">
            <h2 className="display text-[clamp(2.5rem,5.6vw,6.5rem)]">
              One
              <br />
              visual
              <br />
              <span className="accent font-normal text-warm">language</span>
            </h2>
            <p className="label mt-8 flex items-center gap-3 text-mute">
              Keep scrolling <ArrowRight size={14} strokeWidth={1.5} aria-hidden />
            </p>
          </div>

          {chapters.map((chapter, index) => (
            <article key={chapter.name} className="relative w-[80vw] shrink-0 pb-[4vw] md:w-[58vw]">
              <div className="group relative h-[52svh] overflow-hidden rounded-[1.25rem] bg-ink3 md:h-[62svh]">
                <div data-chapter-image className="absolute -inset-x-[9%] inset-y-0 will-change-transform">
                  <Image
                    src={chapter.image.src}
                    alt={chapter.image.alt}
                    fill
                    sizes="(min-width: 768px) 70vw, 96vw"
                    className="object-cover transition-transform duration-[1600ms] ease-cine group-hover:scale-[1.05]"
                  />
                </div>
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.45)_0%,rgba(5,5,5,0)_35%,rgba(5,5,5,0.75)_100%)]"
                />

                <div className="absolute inset-x-6 top-6 flex items-start justify-between gap-6 md:inset-x-8 md:top-8">
                  <span className="label shrink-0 whitespace-nowrap">
                    {pad2(index + 1)} / {pad2(chapters.length)}
                  </span>
                  <p className="max-w-[18rem] text-right text-sm leading-relaxed text-paper/80 max-sm:hidden">
                    {chapter.note}
                  </p>
                </div>

                {chapter.href ? (
                  <PortfolioLink
                    href={chapter.href}
                    label={chapter.name}
                    data-cursor="explore"
                    aria-label={`Explore ${chapter.name}`}
                    className="roll-host absolute inset-0 flex items-start p-6 pt-14 md:p-8 md:pt-[4.25rem]"
                  >
                    <span className="label flex items-center gap-2">
                      <RollText hover="Explore">View project</RollText>
                      <ArrowRight size={14} strokeWidth={1.5} aria-hidden />
                    </span>
                  </PortfolioLink>
                ) : (
                  <NavigationLink
                    id="experience"
                    className="roll-host label absolute left-6 top-14 flex items-center gap-2 md:left-8 md:top-[4.25rem]"
                  >
                    <RollText>See experience</RollText>
                    <ArrowRight size={14} strokeWidth={1.5} aria-hidden />
                  </NavigationLink>
                )}
              </div>

              <h3 className="display pointer-events-none absolute bottom-0 left-4 text-[clamp(3rem,10.5vw,11.5rem)] md:left-8">
                {chapter.name}
              </h3>
            </article>
          ))}

          {/* Breathing room after the last chapter */}
          <span aria-hidden className="block w-[2vw] shrink-0" />
        </div>
      </div>
    </section>
  );
}

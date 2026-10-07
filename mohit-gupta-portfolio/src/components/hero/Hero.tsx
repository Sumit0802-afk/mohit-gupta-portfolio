"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import { heroScroll, playIntro } from "@/animations/heroAnimations";
import { categories } from "@/data/portfolio";
import { personal } from "@/data/personal";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { gsap } from "@/lib/gsap";
import { MEDIA } from "@/lib/constants";
import NavigationLink from "@/components/navigation/NavigationLink";
import PageLoader from "@/components/loader/PageLoader";
import ScrollIndicator from "@/components/ui/ScrollIndicator";
import HeroImage from "./HeroImage";
import HeroText from "./HeroText";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const element = root.current;
    if (!element) return;

    const reduced = window.matchMedia(MEDIA.reducedMotion).matches;
    const desktop = window.matchMedia(MEDIA.desktop).matches;

    const context = gsap.context(() => {
      playIntro(element, { desktop, reduced });
      if (!reduced) heroScroll(element);
    }, element);

    return () => {
      context.revert();
      document.documentElement.classList.remove("intro-lock");
    };
  }, []);

  return (
    <>
      <PageLoader />

      <section ref={root} id="top" className="relative h-svh min-h-[34rem] overflow-clip bg-black">
        {/* Soft warm light behind the laptop during the opening */}
        <div
          data-hero-chrome
          aria-hidden
          className="invisible absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_58%,rgba(217,180,138,0.14),transparent_70%)]"
        />

        <div data-hero-device className="absolute inset-0 will-change-transform">
          {/* Laptop lid + browser bar. Only visible while the opening plays on desktop. */}
          <div
            data-hero-chrome
            aria-hidden
            className="invisible absolute -inset-x-[1.1vw] -bottom-[1.1vw] -top-[2.8vw] rounded-[1.7vw] border border-white/15 bg-[#141414] shadow-[0_5vw_10vw_-2vw_rgba(0,0,0,0.9)]"
          >
            <div className="flex h-[2.8vw] items-center gap-[0.5vw] px-[1.3vw]">
              <span className="h-[0.6vw] w-[0.6vw] rounded-full bg-white/25" />
              <span className="h-[0.6vw] w-[0.6vw] rounded-full bg-white/15" />
              <span className="h-[0.6vw] w-[0.6vw] rounded-full bg-white/15" />
              <span className="mx-auto h-[1.3vw] w-[24vw] rounded-full bg-white/[0.07]" />
            </div>
          </div>
          {/* Laptop base */}
          <div
            data-hero-chrome
            aria-hidden
            className="invisible absolute -inset-x-[8vw] top-[calc(100%+1.1vw)] h-[1.6vw] rounded-b-[1.6vw] rounded-t-[0.3vw] bg-gradient-to-b from-[#2b2b2b] to-[#0c0c0c]"
          >
            <span className="mx-auto block h-[0.5vw] w-[14vw] rounded-b-[0.6vw] bg-black/60" />
          </div>

          <div data-hero-screen className="absolute inset-0 overflow-hidden bg-ink">
            <HeroImage />

            {/* Legibility: darken top (nav) and bottom (metadata), keep the middle open */}
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.72)_0%,rgba(5,5,5,0.18)_32%,rgba(5,5,5,0.28)_60%,rgba(5,5,5,0.9)_100%)]"
            />
            <div data-hero-shade aria-hidden className="absolute inset-0 bg-ink opacity-0" />

            <HeroText />

            <p
              data-hero-meta
              className="accent absolute left-[var(--gutter)] top-[calc(50%+min(3vw,5svh))] hidden text-[clamp(1.5rem,2.4vw,2.75rem)] leading-tight text-paper/90 md:block"
            >
              Visual storyteller
              <br />
              <span className="text-warm">in photography &amp; film</span>
            </p>

            {/* Floating glass card */}
            <div data-hero-meta className="absolute right-[var(--gutter)] top-[15svh] hidden lg:block">
              <NavigationLink
                id="work"
                data-cursor="explore"
                className="group flex w-[19rem] items-center gap-4 rounded-2xl border border-line bg-glass p-3 pr-4 backdrop-blur-xl transition-colors duration-500 ease-cine hover:bg-glass2"
              >
                <span className="flex -space-x-3">
                  {categories.map((category) => (
                    <span
                      key={category.slug}
                      className="relative h-12 w-12 overflow-hidden rounded-full border border-ink"
                    >
                      <Image
                        src={category.cover.src}
                        alt=""
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </span>
                  ))}
                </span>
                <span className="flex-1">
                  <span className="label block text-mute">Selected work</span>
                  <span className="mt-1 block text-sm font-medium leading-snug">
                    Portraits, wildlife, concerts
                  </span>
                </span>
                <ArrowUpRight
                  size={18}
                  strokeWidth={1.5}
                  aria-hidden
                  className="transition-transform duration-500 ease-cine group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </NavigationLink>
            </div>

            <div className="absolute inset-x-0 bottom-0 grid grid-cols-2 items-end gap-6 px-[var(--gutter)] pb-7 md:grid-cols-3 md:pb-9">
              <p
                data-hero-meta
                className="text-xs font-semibold uppercase leading-[1.7] tracking-[0.3em] md:text-sm"
              >
                Photographer
                <br />
                <span className="accent text-xl normal-case tracking-normal text-warm md:text-2xl">
                  &amp;
                </span>
                <br />
                Videographer
              </p>

              <p
                data-hero-meta
                className="label order-last col-span-2 flex items-center gap-2 text-paper/80 md:order-none md:col-span-1 md:justify-center"
              >
                <MapPin size={13} strokeWidth={1.5} aria-hidden />
                {personal.region} / {personal.country}
              </p>

              <div data-hero-meta className="justify-self-end">
                <ScrollIndicator />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

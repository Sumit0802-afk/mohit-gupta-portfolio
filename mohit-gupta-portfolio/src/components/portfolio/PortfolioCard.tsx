"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { attachTilt } from "@/animations/imageAnimations";
import type { Category } from "@/data/portfolio";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { MEDIA } from "@/lib/constants";
import { pad2 } from "@/lib/utils";
import RollText from "@/components/ui/RollText";
import PortfolioLink from "./PortfolioLink";

type Props = { category: Category; index: number };

/**
 * One immersive genre card. Hover: picture pushes in, overlay darkens, the
 * number shifts and VIEW PROJECT slides in. The whole card opens the gallery.
 */
export default function PortfolioCard({ category, index }: Props) {
  const surface = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLElement>(null);
  const finePointer = useMediaQuery(MEDIA.finePointer);
  const reduced = useMediaQuery(MEDIA.reducedMotion);

  useEffect(() => {
    if (!surface.current || !card.current || !finePointer || reduced) return;
    return attachTilt(surface.current, card.current);
  }, [finePointer, reduced]);

  return (
    <div ref={surface}>
      <article
        ref={card}
        className="group relative h-[72svh] min-h-[28rem] overflow-hidden rounded-[1.25rem] border border-white/10 bg-ink3 will-change-transform md:h-[min(84svh,calc(100svh-7rem))]"
      >
        <Image
          src={category.cover.src}
          alt={category.cover.alt}
          fill
          sizes="(min-width: 768px) 92vw, 100vw"
          className="object-cover transition-transform duration-[1600ms] ease-cine group-hover:scale-[1.06]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.5)_0%,rgba(5,5,5,0.05)_38%,rgba(5,5,5,0.88)_100%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-black/0 transition-colors duration-700 ease-cine group-hover:bg-black/35"
        />

        <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-10">
          <div className="flex items-start justify-between gap-6">
            <span className="display text-[clamp(2.5rem,6vw,6rem)] text-paper/90 transition-transform duration-700 ease-cine group-hover:translate-x-4">
              {pad2(index + 1)}
            </span>
            <span className="label pt-2 text-paper/80">{pad2(category.images.length)} frames</span>
          </div>

          {/* Bottom padding on phones leaves room for the VIEW PROJECT / Drive row */}
          <div className="flex flex-col gap-6 pb-12 md:flex-row md:items-end md:justify-between md:pb-0">
            <div>
              <h3 className="display text-[clamp(3.25rem,13vw,13.5rem)]">{category.name}</h3>
              <p className="mt-4 max-w-md text-base leading-relaxed text-paper/80 md:text-lg">
                {category.description}
              </p>
            </div>
            {/* Spacer keeps the text clear of the VIEW PROJECT pill on desktop */}
            <span aria-hidden className="hidden h-14 w-56 md:block" />
          </div>
        </div>

        <PortfolioLink
          href={`/${category.slug}`}
          label={category.name}
          data-cursor="view"
          aria-label={`View project: ${category.name}`}
          className="roll-host absolute inset-0 z-10 flex items-end justify-end p-6 md:p-10"
        >
          <span className="label flex items-center gap-3 rounded-full border border-line bg-glass px-6 py-4 backdrop-blur-xl transition-all duration-700 ease-cine group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 max-md:hidden [@media(hover:hover)]:translate-y-6 [@media(hover:hover)]:opacity-0">
            <RollText hover="Explore">View project</RollText>
            <ArrowRight
              size={16}
              strokeWidth={1.5}
              aria-hidden
              className="transition-transform duration-700 ease-cine group-hover:translate-x-1.5"
            />
          </span>
        </PortfolioLink>

        <div className="absolute inset-x-6 bottom-6 z-20 flex items-center justify-between md:inset-x-auto md:bottom-auto md:right-10 md:top-[4.5rem]">
          <span className="label flex items-center gap-2 md:hidden" aria-hidden>
            View project <ArrowRight size={14} strokeWidth={1.5} />
          </span>
          <a
            href={category.driveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="label flex items-center gap-1.5 text-paper/70 underline-offset-4 transition-colors duration-500 hover:text-paper hover:underline"
          >
            Drive folder
            <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden />
            <span className="sr-only">
              , {category.name} on Google Drive (opens in a new tab)
            </span>
          </a>
        </div>
      </article>
    </div>
  );
}

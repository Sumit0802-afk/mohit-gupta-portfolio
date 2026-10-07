import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { categories, getCategory, PLACEHOLDER_IMAGERY } from "@/data/portfolio";
import type { PortfolioSlug } from "@/lib/portfolioLinks";
import { pad2 } from "@/lib/utils";
import PortfolioLink from "@/components/portfolio/PortfolioLink";
import ImageReveal from "@/components/ui/ImageReveal";
import MagneticButton from "@/components/ui/MagneticButton";
import ParallaxImage from "@/components/ui/ParallaxImage";
import RollText from "@/components/ui/RollText";
import ScrollEffects from "@/components/ui/ScrollEffects";
import MasonryGallery from "./MasonryGallery";

/** Dedicated gallery page for one genre: /portraits, /wildlife, /concerts. */
export default function GalleryPage({ slug }: { slug: PortfolioSlug }) {
  const category = getCategory(slug);
  const position = categories.indexOf(category);
  const next = categories[(position + 1) % categories.length];

  return (
    <ScrollEffects>
      <main id="main">
        <header className="shell pb-12 pt-32 md:pb-16 md:pt-44">
          <PortfolioLink
            href="/#work"
            label="Selected work"
            className="roll-host label inline-flex items-center gap-2 text-mute transition-colors duration-500 hover:text-paper"
          >
            <ArrowLeft size={14} strokeWidth={1.5} aria-hidden />
            <RollText>Back to work</RollText>
          </PortfolioLink>

          <p data-reveal className="label mt-12 flex items-center gap-3 text-mute">
            <span className="text-warm">{pad2(position + 1)}</span>
            <span aria-hidden className="h-px w-8 bg-line" />
            <span>Gallery</span>
          </p>
          <h1 data-reveal-lines className="display mt-6 text-[clamp(3.5rem,16vw,17rem)]">
            {category.name}
          </h1>

          <div className="mt-10 flex flex-col gap-8 border-t border-line pt-8 md:flex-row md:items-end md:justify-between">
            <div data-reveal>
              <p className="accent max-w-xl text-2xl text-paper/90 md:text-3xl">
                {category.description}
              </p>
              <p className="label mt-5 text-mute">
                {pad2(category.images.length)} frames
                {PLACEHOLDER_IMAGERY && " · sample imagery"}
              </p>
            </div>
            <div data-reveal>
              <MagneticButton>
                <a
                  href={category.driveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn roll-host label"
                >
                  <RollText hover="Open Google Drive">Full collection</RollText>
                  <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden className="btn-arrow" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </MagneticButton>
            </div>
          </div>
        </header>

        <div className="shell">
          <ImageReveal className="aspect-[4/5] rounded-[1.25rem] md:aspect-[21/9]">
            <ParallaxImage photo={category.cover} sizes="92vw" priority />
          </ImageReveal>
        </div>

        <section aria-label={`${category.name} images`} className="shell section">
          <MasonryGallery photos={category.images} />

          {PLACEHOLDER_IMAGERY && (
            <p data-reveal className="mt-10 max-w-xl text-sm leading-relaxed text-mute">
              The photographs on this page are placeholders, not Mohit&rsquo;s work. His{" "}
              {category.name.toLowerCase()} collection lives in the Google Drive folder linked above.
            </p>
          )}
        </section>

        <section aria-label="Next gallery" className="border-t border-line">
          <PortfolioLink
            href={`/${next.slug}`}
            label={next.name}
            data-cursor="explore"
            className="shell group flex flex-col gap-4 py-16 md:py-24"
          >
            <span className="label text-mute">Next gallery</span>
            <span className="flex items-end justify-between gap-6">
              <span className="display text-[clamp(3rem,13vw,14rem)] transition-transform duration-700 ease-cine group-hover:translate-x-4">
                {next.name}
              </span>
              <ArrowRight
                strokeWidth={1}
                aria-hidden
                className="mb-[0.5vw] h-[clamp(2.5rem,7vw,7rem)] w-[clamp(2.5rem,7vw,7rem)] shrink-0 text-warm transition-transform duration-700 ease-cine group-hover:translate-x-3"
              />
            </span>
          </PortfolioLink>
        </section>
      </main>
    </ScrollEffects>
  );
}

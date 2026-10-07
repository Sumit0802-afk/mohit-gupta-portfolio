import { personal } from "@/data/personal";
import { cn } from "@/lib/utils";

const LINES = [personal.firstName, personal.lastName];

/**
 * MOHIT / GUPTA set as two viewport-wide lines, first flush left and second
 * flush right. Each letter is its own span so playIntro() can slide them up.
 */
export default function HeroText() {
  return (
    // The wrapper does the centring; GSAP owns the transform of the <h1> itself.
    <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-[56%] px-[var(--gutter)]">
      <h1
        data-hero-title
        aria-label={personal.name}
        className="display hero-title text-paper will-change-transform"
      >
        {LINES.map((word, line) => (
          <span
            key={word}
            aria-hidden
            className={cn("block overflow-hidden px-[0.03em] pt-[0.05em]", line === 1 && "text-right")}
          >
            {Array.from(word).map((letter, index) => (
              <span key={index} data-hero-char className="inline-block will-change-transform">
                {letter}
              </span>
            ))}
          </span>
        ))}
      </h1>
    </div>
  );
}

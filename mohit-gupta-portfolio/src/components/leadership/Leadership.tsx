"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { leadership } from "@/data/leadership";
import { leadershipImages } from "@/data/portfolio";
import SectionTitle from "@/components/ui/SectionTitle";
import LeadershipCard from "./LeadershipCard";

const ARROW =
  "flex h-12 w-12 items-center justify-center rounded-full border border-line bg-glass transition-colors duration-500 ease-cine hover:bg-paper hover:text-ink";

export default function Leadership() {
  const rail = useRef<HTMLUListElement>(null);

  const step = (direction: 1 | -1) => {
    const element = rail.current;
    if (!element) return;
    const card = element.querySelector<HTMLElement>("li");
    const distance = (card?.offsetWidth ?? element.clientWidth) + 24;
    element.scrollBy({ left: direction * distance, behavior: "smooth" });
  };

  return (
    <section aria-label="Leadership" className="section overflow-x-clip">
      <div className="shell flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <SectionTitle index="04" label="Leadership" title="Beyond the camera" />
        <div data-reveal className="flex shrink-0 gap-3">
          <button type="button" aria-label="Previous card" className={ARROW} onClick={() => step(-1)}>
            <ArrowLeft size={18} strokeWidth={1.5} aria-hidden />
          </button>
          <button type="button" aria-label="Next card" className={ARROW} onClick={() => step(1)}>
            <ArrowRight size={18} strokeWidth={1.5} aria-hidden />
          </button>
        </div>
      </div>

      {/* data-lenis-prevent lets trackpads swipe this rail sideways natively */}
      <ul
        ref={rail}
        data-lenis-prevent-touch
        tabIndex={0}
        aria-label="Leadership roles"
        className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto px-[var(--gutter)] pb-4 pt-2 [scroll-padding-inline:var(--gutter)] md:mt-20"
      >
        {leadership.map((role, index) => (
          <li
            key={role.organisation}
            data-reveal
            className="w-[82vw] shrink-0 snap-start sm:w-[26rem] lg:w-[28rem]"
          >
            <LeadershipCard role={role} index={index} photo={leadershipImages[index]} />
          </li>
        ))}
      </ul>
    </section>
  );
}

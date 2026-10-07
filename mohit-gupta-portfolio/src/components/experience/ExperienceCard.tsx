import type { ExperienceEntry } from "@/data/experience";
import { pad2 } from "@/lib/utils";

/** One role: sticky summary on the left, responsibilities on a timeline rail. */
export default function ExperienceCard({ entry }: { entry: ExperienceEntry }) {
  return (
    <article className="grid gap-12 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-5">
        <div data-reveal className="lg:sticky lg:top-32">
          <p className="label text-warm">{entry.period}</p>
          <h3 className="mt-5 text-[clamp(1.75rem,3vw,3rem)] font-bold uppercase leading-[1.02] tracking-[-0.03em]">
            {entry.role}
          </h3>
          <p className="accent mt-5 text-3xl text-paper/90">{entry.company}</p>
          <p className="label mt-3 text-mute">{entry.place}</p>
        </div>
      </div>

      <div className="relative pl-7 md:pl-12 lg:col-span-7">
        <span aria-hidden className="absolute left-0 top-0 h-full w-px bg-white/10" />
        <span
          data-progress-line
          aria-hidden
          className="absolute left-0 top-0 h-full w-px origin-top bg-warm"
        />

        <ol>
          {entry.responsibilities.map((item, index) => (
            <li
              key={item}
              data-reveal
              className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-white/10 py-7 first:pt-0 md:py-9"
            >
              <span className="label pt-1.5 text-mute">{pad2(index + 1)}</span>
              <p className="text-lg leading-relaxed text-paper/90 md:text-xl">{item}</p>
            </li>
          ))}
        </ol>
      </div>
    </article>
  );
}

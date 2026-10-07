import { aboutImage, PLACEHOLDER_IMAGERY } from "@/data/portfolio";
import { personal } from "@/data/personal";
import ImageReveal from "@/components/ui/ImageReveal";
import ParallaxImage from "@/components/ui/ParallaxImage";

const FACTS = [
  { term: "Based in", detail: personal.location },
  { term: "Focus", detail: "Portrait, wildlife, concert and corporate" },
  { term: "Internship", detail: "Netts Mobility" },
];

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="shell section">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <p data-reveal className="label flex items-center gap-3 text-mute">
            <span className="text-warm">01</span>
            <span aria-hidden className="h-px w-8 bg-line" />
            <span id="about-heading" role="heading" aria-level={2}>
              About
            </span>
          </p>

          <p
            data-reveal-lines
            className="mt-8 text-[clamp(1.9rem,4.3vw,4.6rem)] font-semibold leading-[1.06] tracking-[-0.035em] md:mt-12"
          >
            &ldquo;{personal.statement}&rdquo;
          </p>

          <p data-reveal className="mt-10 max-w-xl text-lg leading-relaxed text-mute md:mt-14">
            {personal.summary}
          </p>

          <dl className="mt-12 grid gap-6 border-t border-line pt-8 sm:grid-cols-3">
            {FACTS.map((fact) => (
              <div key={fact.term} data-reveal>
                <dt className="label text-mute">{fact.term}</dt>
                <dd className="mt-2 text-base font-medium leading-snug">{fact.detail}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-5 lg:pt-24">
          <ImageReveal className="aspect-[4/5] rounded-2xl">
            <ParallaxImage photo={aboutImage} sizes="(min-width: 1024px) 40vw, 92vw" strength={7} />
          </ImageReveal>
          <p data-reveal className="label mt-4 flex justify-between text-mute">
            <span>{personal.name}</span>
            <span>{PLACEHOLDER_IMAGERY ? "Sample image" : personal.role}</span>
          </p>
        </div>
      </div>
    </section>
  );
}

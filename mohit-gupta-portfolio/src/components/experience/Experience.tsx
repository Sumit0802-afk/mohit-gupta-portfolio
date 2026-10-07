import { experience } from "@/data/experience";
import SectionTitle from "@/components/ui/SectionTitle";
import ExperienceCard from "./ExperienceCard";

export default function Experience() {
  return (
    <section id="experience" aria-label="Experience" className="shell section bg-ink2">
      <SectionTitle index="03" label="Experience" title="Experience" />

      <div className="mt-16 flex flex-col gap-24 border-t border-line pt-12 md:mt-24 md:pt-16">
        {experience.map((entry) => (
          <ExperienceCard key={`${entry.company}-${entry.role}`} entry={entry} />
        ))}
      </div>
    </section>
  );
}

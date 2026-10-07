import { skillGroups } from "@/data/skills";
import SectionTitle from "@/components/ui/SectionTitle";
import SkillCategory from "./SkillCategory";

export default function Skills() {
  return (
    <section aria-label="Skills" className="shell section bg-ink2">
      <SectionTitle index="05" label="Skills" title="Craft & tools" />

      <div className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2 md:mt-24 lg:grid-cols-4">
        {skillGroups.map((group, index) => (
          <SkillCategory key={group.title} group={group} index={index} />
        ))}
      </div>
    </section>
  );
}

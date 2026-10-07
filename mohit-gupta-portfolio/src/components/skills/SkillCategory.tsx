import type { SkillGroup } from "@/data/skills";
import { pad2 } from "@/lib/utils";
import SkillItem from "./SkillItem";

type Props = { group: SkillGroup; index: number };

export default function SkillCategory({ group, index }: Props) {
  return (
    <div data-reveal>
      <h3 className="flex items-baseline gap-3 border-b border-line pb-5">
        <span className="label text-warm">{pad2(index + 1)}</span>
        <span className="text-xl font-bold uppercase tracking-[-0.02em]">{group.title}</span>
      </h3>
      <ul className="group/list">
        {group.skills.map((skill) => (
          <SkillItem key={skill} name={skill} />
        ))}
      </ul>
    </div>
  );
}

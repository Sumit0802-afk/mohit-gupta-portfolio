import { tools } from "@/data/tools";
import SectionTitle from "@/components/ui/SectionTitle";
import ToolItem from "./ToolItem";

export default function Tools() {
  return (
    <section aria-label="Software" className="shell section overflow-x-clip">
      <SectionTitle index="06" label="Software" title="Tools I use" />

      <ul className="mt-16 flex flex-col gap-5 md:mt-24 md:gap-3">
        {tools.map((tool, index) => (
          <ToolItem key={tool.name} tool={tool} index={index} />
        ))}
      </ul>
    </section>
  );
}

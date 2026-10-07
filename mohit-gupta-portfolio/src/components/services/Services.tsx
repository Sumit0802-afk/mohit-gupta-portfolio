import { services } from "@/data/skills";
import SectionTitle from "@/components/ui/SectionTitle";
import ServiceCard from "./ServiceCard";

export default function Services() {
  return (
    <section aria-label="What I create" className="shell section">
      <SectionTitle index="08" label="Create" title="What I create" />

      <ul className="mt-16 grid gap-5 sm:grid-cols-2 md:mt-24 xl:grid-cols-4">
        {services.map((service, index) => (
          <ServiceCard key={service.title} service={service} index={index} />
        ))}
      </ul>
    </section>
  );
}

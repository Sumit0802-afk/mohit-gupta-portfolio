import { PLACEHOLDER_IMAGERY } from "@/data/portfolio";
import SectionTitle from "@/components/ui/SectionTitle";
import PortfolioGrid from "./PortfolioGrid";

export default function Portfolio() {
  return (
    <section id="work" aria-label="Selected work" className="shell section bg-ink2">
      <div className="mb-14 flex flex-col gap-8 md:mb-20 md:flex-row md:items-end md:justify-between">
        <SectionTitle
          index="02"
          label="Work"
          title="Selected work"
          subtitle="Three genres. One visual language."
        />
        {PLACEHOLDER_IMAGERY && (
          <p data-reveal className="label max-w-[16rem] text-mute md:text-right">
            Sample imagery shown. Full collections open on Google Drive.
          </p>
        )}
      </div>

      <PortfolioGrid />
    </section>
  );
}

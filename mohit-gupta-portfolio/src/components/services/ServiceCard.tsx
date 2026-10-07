import type { Service } from "@/data/skills";
import { pad2 } from "@/lib/utils";

/** Large inverting card: fills white from the bottom on hover. */
export default function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <li
      data-reveal
      className="group relative isolate flex min-h-[19rem] flex-col justify-between overflow-hidden rounded-[1.25rem] border border-line p-7 transition-colors duration-700 ease-cine hover:text-ink md:min-h-[25rem] md:p-8"
    >
      <span
        aria-hidden
        className="absolute inset-0 -z-10 translate-y-[101%] bg-paper transition-transform duration-700 ease-cine group-hover:translate-y-0"
      />
      <span className="label text-mute transition-colors duration-700 group-hover:text-ink/60">
        {pad2(index + 1)}
      </span>
      <div>
        <h3 className="display text-[clamp(2.25rem,3.6vw,3.75rem)]">{service.title}</h3>
        <p className="accent mt-4 text-2xl leading-tight text-warm transition-colors duration-700 group-hover:text-ink/70">
          {service.detail}
        </p>
      </div>
    </li>
  );
}

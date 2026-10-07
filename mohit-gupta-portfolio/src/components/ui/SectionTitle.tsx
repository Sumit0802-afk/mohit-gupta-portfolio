import { cn } from "@/lib/utils";

type Props = {
  /** e.g. "02" */
  index: string;
  /** e.g. "Work" */
  label: string;
  title: string;
  subtitle?: string;
  className?: string;
};

/** "02 / WORK" eyebrow above an oversized section heading. */
export default function SectionTitle({ index, label, title, subtitle, className }: Props) {
  return (
    <header className={cn("flex flex-col gap-6 md:gap-8", className)}>
      <p data-reveal className="label flex items-center gap-3 text-mute">
        <span className="text-warm">{index}</span>
        <span aria-hidden className="h-px w-8 bg-line" />
        <span>{label}</span>
      </p>
      <h2 data-reveal-lines className="display section-title">
        {title}
      </h2>
      {subtitle && (
        <p data-reveal className="accent max-w-xl text-2xl text-mute md:text-3xl">
          {subtitle}
        </p>
      )}
    </header>
  );
}

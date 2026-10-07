import { education } from "@/data/personal";

export default function Education() {
  return (
    <section aria-labelledby="education-heading" className="shell section bg-ink2">
      <p data-reveal className="label flex items-center gap-3 text-mute">
        <span className="text-warm">07</span>
        <span aria-hidden className="h-px w-8 bg-line" />
        <span>Education</span>
      </p>

      <div className="mt-10 grid gap-10 border-t border-line pt-10 md:mt-14 md:grid-cols-12 md:pt-14">
        <h2 id="education-heading" className="sr-only">
          Education
        </h2>

        <p
          data-reveal-lines
          className="accent text-[clamp(4.5rem,15vw,15rem)] leading-[0.85] md:col-span-6"
        >
          {education.degree}
        </p>

        <div className="flex flex-col justify-end gap-8 md:col-span-6">
          <p
            data-reveal-lines
            className="text-[clamp(1.75rem,3.4vw,3.5rem)] font-bold uppercase leading-[1.02] tracking-[-0.035em]"
          >
            {education.field}
          </p>
          <dl className="grid grid-cols-2 gap-6 border-t border-white/10 pt-6">
            <div data-reveal>
              <dt className="label text-mute">University</dt>
              <dd className="mt-2 text-lg font-medium leading-snug">
                {education.school}
                <br />
                <span className="text-mute">{education.place}</span>
              </dd>
            </div>
            <div data-reveal>
              <dt className="label text-mute">Years</dt>
              <dd className="mt-2 text-lg font-medium tabular-nums">{education.years}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}

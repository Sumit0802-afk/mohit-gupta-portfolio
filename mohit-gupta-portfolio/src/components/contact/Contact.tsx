import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { personal } from "@/data/personal";
import ContactButton from "./ContactButton";

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="shell section">
      <p data-reveal className="label flex items-center gap-3 text-mute">
        <span className="text-warm">09</span>
        <span aria-hidden className="h-px w-8 bg-line" />
        <span>Contact</span>
      </p>

      <h2
        id="contact-heading"
        data-reveal-lines
        className="display mt-8 text-[11.2vw] md:mt-12 md:text-[7.3vw]"
      >
        Let&rsquo;s create
        <br />
        something
        <br />
        worth <span className="accent font-normal text-warm">remembering.</span>
      </h2>

      <div className="mt-14 grid gap-12 border-t border-line pt-10 md:mt-20 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p data-reveal className="max-w-md text-xl leading-relaxed text-paper/90">
            {personal.availability}
          </p>
          <div data-reveal className="mt-10 flex flex-wrap gap-4">
            <ContactButton
              href={personal.emailHref}
              icon={<Mail size={16} strokeWidth={1.5} />}
              hover="Say hello"
            >
              Email me
            </ContactButton>
            <ContactButton
              href={personal.phoneHref}
              icon={<Phone size={16} strokeWidth={1.5} />}
              hover="+91 74288 74204"
            >
              Call me
            </ContactButton>
            <ContactButton
              href={personal.linkedin}
              icon={<ArrowUpRight size={16} strokeWidth={1.5} />}
              hover="Connect"
              external
            >
              LinkedIn
            </ContactButton>
            <ContactButton
              href={personal.instagram}
              icon={<ArrowUpRight size={16} strokeWidth={1.5} />}
              hover={personal.instagramHandle}
              external
            >
              Instagram
            </ContactButton>
          </div>
        </div>

        <dl className="grid gap-8 sm:grid-cols-[1fr_1.9fr_1fr] lg:col-span-7 lg:pl-10">
          <div data-reveal>
            <dt className="label text-mute">Phone</dt>
            <dd className="mt-3 text-lg font-medium tabular-nums">
              <a href={personal.phoneHref} className="underline-offset-4 hover:underline">
                {personal.phone}
              </a>
            </dd>
          </div>
          <div data-reveal>
            <dt className="label text-mute">Email</dt>
            <dd className="mt-3 break-words text-lg font-medium">
              <a href={personal.emailHref} className="underline-offset-4 hover:underline">
                {personal.email}
              </a>
            </dd>
          </div>
          <div data-reveal>
            <dt className="label text-mute">Location</dt>
            <dd className="mt-3 text-lg font-medium">{personal.location}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

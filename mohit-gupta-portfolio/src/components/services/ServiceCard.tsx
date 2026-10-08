import Image from "next/image";
import type { Photo } from "@/data/portfolio";
import type { Service } from "@/data/skills";
import { pad2 } from "@/lib/utils";

type Props = { service: Service; index: number; photo?: Photo };

/** Large card over a dimmed photograph that brightens and pushes in on hover. */
export default function ServiceCard({ service, index, photo }: Props) {
  return (
    <li
      data-reveal
      className="group relative isolate flex min-h-[19rem] flex-col justify-between overflow-hidden rounded-[1.25rem] border border-line bg-ink3 p-7 transition-colors duration-700 ease-cine hover:border-white/40 md:min-h-[25rem] md:p-8"
    >
      {photo && (
        <Image
          src={photo.src}
          alt=""
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="-z-20 object-cover opacity-80 transition-[opacity,transform] duration-[1400ms] ease-cine group-hover:scale-[1.06] group-hover:opacity-100"
        />
      )}
      {/* Keeps the copy readable over any picture */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,5,5,0.45)_0%,rgba(5,5,5,0.25)_40%,rgba(5,5,5,0.88)_100%)]"
      />
      <span className="label text-paper/80">{pad2(index + 1)}</span>
      <div>
        <h3 className="display text-[clamp(2.25rem,3.6vw,3.75rem)]">{service.title}</h3>
        <p className="accent mt-4 text-2xl leading-tight text-warm">{service.detail}</p>
      </div>
    </li>
  );
}

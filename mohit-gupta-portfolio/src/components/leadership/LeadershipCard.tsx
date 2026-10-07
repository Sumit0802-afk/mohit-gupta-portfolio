"use client";

import type { CSSProperties, PointerEvent } from "react";
import Image from "next/image";
import type { LeadershipRole } from "@/data/leadership";
import type { Photo } from "@/data/portfolio";
import { pad2 } from "@/lib/utils";

type Props = { role: LeadershipRole; index: number; photo?: Photo };

/**
 * Card over a dimmed black-and-white photograph. On hover the picture gains
 * its colour back and pushes in, under a warm spotlight that follows the pointer.
 */
export default function LeadershipCard({ role, index, photo }: Props) {
  const onMove = (event: PointerEvent<HTMLElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - box.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - box.top}px`);
  };

  return (
    <article
      onPointerMove={onMove}
      style={{ "--mx": "50%", "--my": "0px" } as CSSProperties}
      className="group relative flex h-full min-h-[26rem] flex-col justify-between overflow-hidden rounded-[1.25rem] border border-line bg-ink3 p-7 transition-[border-color,transform] duration-700 ease-cine hover:-translate-y-1.5 hover:border-white/40 md:p-9"
    >
      {photo && (
        <Image
          src={photo.src}
          alt=""
          fill
          sizes="(min-width: 640px) 28rem, 82vw"
          className="object-cover opacity-85 grayscale transition-[opacity,filter,transform] duration-[1400ms] ease-cine group-hover:scale-[1.06] group-hover:opacity-100 group-hover:grayscale-0"
        />
      )}
      {/* Keeps the copy readable over any picture */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.35)_0%,rgba(5,5,5,0.4)_40%,rgba(5,5,5,0.86)_100%)]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(26rem_circle_at_var(--mx)_var(--my),rgba(217,180,138,0.16),transparent_60%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
      />

      <div className="relative flex items-start justify-between">
        <span className="label text-paper/80">Card {pad2(index + 1)}</span>
        <span className="display text-5xl text-white/25 transition-colors duration-700 group-hover:text-warm/70">
          {pad2(index + 1)}
        </span>
      </div>

      <div className="relative">
        <h3 className="text-[clamp(1.6rem,2.4vw,2.25rem)] font-bold uppercase leading-[1.02] tracking-[-0.03em]">
          {role.title}
        </h3>
        <p className="accent mt-3 text-2xl text-warm">{role.organisation}</p>
        <p className="mt-6 border-t border-white/20 pt-6 text-base leading-relaxed text-paper/75">
          {role.description}
        </p>
      </div>
    </article>
  );
}

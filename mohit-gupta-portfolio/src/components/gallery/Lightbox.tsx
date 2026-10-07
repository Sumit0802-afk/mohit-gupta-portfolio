"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { overlayFade } from "@/animations/pageTransitions";
import type { Photo } from "@/data/portfolio";
import { lockScroll } from "@/hooks/useSmoothScroll";
import { EASE_BEZIER } from "@/lib/constants";
import { pad2 } from "@/lib/utils";

type Props = {
  photos: Photo[];
  /** Index of the open photo, or null when closed. */
  index: number | null;
  onChange: (index: number | null) => void;
};

const CONTROL =
  "flex h-12 w-12 items-center justify-center rounded-full border border-line bg-glass backdrop-blur-xl transition-colors duration-500 hover:bg-paper hover:text-ink";

export default function Lightbox({ photos, index, onChange }: Props) {
  const closeButton = useRef<HTMLButtonElement>(null);
  const open = index !== null;
  const count = photos.length;

  useEffect(() => {
    if (!open) return;

    lockScroll(true);
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButton.current?.focus();

    return () => {
      lockScroll(false);
      previouslyFocused?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (index === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onChange(null);
      if (event.key === "ArrowRight") onChange((index + 1) % count);
      if (event.key === "ArrowLeft") onChange((index - 1 + count) % count);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, count, onChange]);

  const photo = index !== null ? photos[index] : null;

  return (
    <AnimatePresence>
      {photo && index !== null && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          variants={overlayFade}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed inset-0 z-[150] flex flex-col bg-black/95 backdrop-blur-sm"
          onClick={() => onChange(null)}
        >
          <div className="flex items-center justify-between px-[var(--gutter)] py-5">
            <p className="label tabular-nums" aria-live="polite">
              {pad2(index + 1)} <span className="text-mute">/ {pad2(count)}</span>
            </p>
            <button
              ref={closeButton}
              type="button"
              aria-label="Close image viewer"
              className={CONTROL}
              onClick={() => onChange(null)}
            >
              <X size={20} strokeWidth={1.5} aria-hidden />
            </button>
          </div>

          <div className="relative flex-1">
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [...EASE_BEZIER] }}
              className="absolute inset-x-4 inset-y-0 md:inset-x-24"
            >
              {photo.video ? (
                <video
                  src={photo.video}
                  poster={photo.src}
                  controls
                  autoPlay
                  playsInline
                  aria-label={photo.alt}
                  className="h-full w-full object-contain"
                  onClick={(event) => event.stopPropagation()}
                >
                  <a href={photo.video}>Download this video</a>
                </video>
              ) : (
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  onClick={(event) => event.stopPropagation()}
                />
              )}
            </motion.div>
          </div>

          <div
            className="flex items-center justify-center gap-4 px-[var(--gutter)] py-5"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Previous image"
              className={CONTROL}
              onClick={() => onChange((index - 1 + count) % count)}
            >
              <ChevronLeft size={20} strokeWidth={1.5} aria-hidden />
            </button>
            <button
              type="button"
              aria-label="Next image"
              className={CONTROL}
              onClick={() => onChange((index + 1) % count)}
            >
              <ChevronRight size={20} strokeWidth={1.5} aria-hidden />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

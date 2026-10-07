import Image from "next/image";
import { Play } from "lucide-react";
import type { Photo } from "@/data/portfolio";
import ImageReveal from "@/components/ui/ImageReveal";

type Props = { photo: Photo; position: number; onOpen: () => void };

/** One tile of the masonry wall. Keeps the photo's own aspect ratio. */
export default function GalleryImage({ photo, position, onOpen }: Props) {
  return (
    <button
      type="button"
      onClick={onOpen}
      data-cursor="view"
      aria-label={`${photo.video ? "Play video" : "Open image"} ${position}: ${photo.alt}`}
      className="group relative mb-4 block w-full break-inside-avoid md:mb-6"
    >
      <ImageReveal className="rounded-xl bg-ink3">
        <Image
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          loading="lazy"
          sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw"
          className="h-auto w-full transition-transform duration-[1600ms] ease-cine group-hover:scale-[1.04]"
        />
      </ImageReveal>

      {photo.video && (
        <span
          data-reveal
          aria-hidden
          className="label absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-line bg-black/50 px-4 py-2.5 backdrop-blur-md"
        >
          <Play size={12} fill="currentColor" strokeWidth={0} />
          Film
        </span>
      )}
    </button>
  );
}

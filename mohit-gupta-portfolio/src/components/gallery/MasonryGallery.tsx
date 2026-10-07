"use client";

import { useState } from "react";
import type { Photo } from "@/data/portfolio";
import GalleryImage from "./GalleryImage";
import Lightbox from "./Lightbox";

/** Editorial masonry wall of mixed aspect ratios, with a lightbox. */
export default function MasonryGallery({ photos }: { photos: Photo[] }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 md:gap-6 lg:columns-3">
        {photos.map((photo, index) => (
          <GalleryImage
            key={`${photo.src}-${index}`}
            photo={photo}
            position={index + 1}
            onOpen={() => setActive(index)}
          />
        ))}
      </div>

      <Lightbox photos={photos} index={active} onChange={setActive} />
    </>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reports page scroll progress (0..1) to `onProgress` once per frame and
 * returns whether the page has scrolled past `threshold` pixels.
 */
export function useScrollProgress(onProgress?: (progress: number) => void, threshold = 40) {
  const [scrolled, setScrolled] = useState(false);
  const saved = useRef(onProgress);

  useEffect(() => {
    saved.current = onProgress;
  }, [onProgress]);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      saved.current?.(max > 0 ? Math.min(1, y / max) : 0);
      setScrolled(y > threshold);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [threshold]);

  return scrolled;
}

"use client";

import { useEffect, useRef } from "react";

export type MousePosition = {
  /** Viewport pixels. */
  x: number;
  y: number;
  /** Normalised to -1..1 around the viewport centre. */
  nx: number;
  ny: number;
};

/**
 * Calls `handler` on every pointer move without causing React renders, so it
 * is safe to drive transforms from it.
 */
export function useMousePosition(handler: (position: MousePosition) => void, enabled = true) {
  const saved = useRef(handler);

  useEffect(() => {
    saved.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      saved.current({
        x: event.clientX,
        y: event.clientY,
        nx: (event.clientX / window.innerWidth) * 2 - 1,
        ny: (event.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled]);
}

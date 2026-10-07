"use client";

import { useEffect, useRef } from "react";
import { createFollower } from "@/animations/cursorAnimations";
import { MEDIA } from "@/lib/constants";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useMousePosition } from "@/hooks/useMousePosition";

const LABELS: Record<string, string> = { view: "View", explore: "Explore" };

/**
 * Desktop-only cursor. A small white dot that grows over links and becomes a
 * labelled disc over anything tagged data-cursor="view" | "explore".
 * Touch devices and narrow screens keep the native cursor.
 */
export default function CustomCursor() {
  const enabled = useMediaQuery(MEDIA.finePointer);
  const cursor = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const follow = useRef<((x: number, y: number) => void) | null>(null);

  useEffect(() => {
    const element = cursor.current;
    if (!enabled || !element) return;

    follow.current = createFollower(element);
    document.documentElement.classList.add("has-cursor");

    const onOver = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const tagged = target?.closest<HTMLElement>("[data-cursor]")?.dataset.cursor;
      const state = tagged ?? (target?.closest("a, button, [role='button']") ? "link" : "default");
      element.dataset.state = state;
      if (label.current && LABELS[state]) label.current.textContent = LABELS[state];
    };
    const hide = () => (element.dataset.visible = "false");

    document.addEventListener("mouseover", onOver);
    document.documentElement.addEventListener("mouseleave", hide);
    return () => {
      document.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", hide);
      document.documentElement.classList.remove("has-cursor");
      follow.current = null;
    };
  }, [enabled]);

  useMousePosition(({ x, y }) => {
    if (!cursor.current || !follow.current) return;
    cursor.current.dataset.visible = "true";
    follow.current(x, y);
  }, enabled);

  if (!enabled) return null;

  return (
    <div ref={cursor} className="cursor" data-state="default" data-visible="false" aria-hidden>
      <div className="cursor-dot">
        <span ref={label} className="cursor-label">
          View
        </span>
      </div>
    </div>
  );
}

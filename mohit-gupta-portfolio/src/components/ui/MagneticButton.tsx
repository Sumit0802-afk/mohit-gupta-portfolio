"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { attachMagnet } from "@/animations/cursorAnimations";
import { MEDIA } from "@/lib/constants";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type Props = { children: ReactNode; strength?: number; className?: string };

/** Wraps a button or link so it leans gently towards the cursor. */
export default function MagneticButton({ children, strength = 0.3, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const finePointer = useMediaQuery(MEDIA.finePointer);
  const reduced = useMediaQuery(MEDIA.reducedMotion);

  useEffect(() => {
    if (!ref.current || !finePointer || reduced) return;
    return attachMagnet(ref.current, strength);
  }, [finePointer, reduced, strength]);

  return (
    <span ref={ref} className={`inline-block ${className ?? ""}`}>
      {children}
    </span>
  );
}

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = { children: ReactNode; className?: string };

/**
 * Frame that opens with a clip-path reveal when scrolled into view while its
 * content settles from 108% to 100%. Needs a <ScrollEffects> ancestor.
 */
export default function ImageReveal({ children, className }: Props) {
  return (
    <div data-reveal-image className={cn("relative overflow-hidden", className)}>
      <div data-reveal-inner className="h-full w-full will-change-transform">
        {children}
      </div>
    </div>
  );
}

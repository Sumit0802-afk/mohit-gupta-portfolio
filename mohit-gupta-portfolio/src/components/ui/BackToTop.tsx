"use client";

import { ArrowUp } from "lucide-react";
import { scrollToTarget } from "@/hooks/useSmoothScroll";
import RollText from "./RollText";

export default function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => scrollToTarget(0)}
      className="roll-host label flex items-center gap-2 text-mute transition-colors duration-500 hover:text-paper"
    >
      <RollText>Back to top</RollText>
      <ArrowUp size={14} strokeWidth={1.5} aria-hidden />
    </button>
  );
}

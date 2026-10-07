import { ArrowDown } from "lucide-react";

export default function ScrollIndicator({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className ?? ""}`}>
      <span className="label">Scroll to explore</span>
      <span className="relative block h-12 w-px overflow-hidden bg-white/20" aria-hidden>
        <span className="scroll-cue absolute inset-0 bg-paper" />
      </span>
      <ArrowDown size={14} strokeWidth={1.5} aria-hidden />
    </div>
  );
}

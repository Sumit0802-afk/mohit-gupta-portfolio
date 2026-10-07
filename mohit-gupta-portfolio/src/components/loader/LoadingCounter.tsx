/** 00 -> 25 -> 50 -> 75 -> 100. The numbers are driven by playIntro(). */
export default function LoadingCounter() {
  return (
    <div className="flex flex-col items-center gap-5">
      <p className="label tabular-nums text-paper">
        <span data-loader-count>00</span>
        <span className="ml-1 text-mute">%</span>
      </p>
      <span className="block h-px w-28 bg-white/15" aria-hidden>
        <span
          data-loader-bar
          className="block h-full origin-left bg-paper"
          style={{ transform: "scaleX(0)" }}
        />
      </span>
    </div>
  );
}

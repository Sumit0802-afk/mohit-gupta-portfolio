"use client";

import { useState } from "react";
import { hasIntroPlayed } from "@/animations/heroAnimations";
import { personal } from "@/data/personal";
import LoadingCounter from "./LoadingCounter";

/**
 * Black opening screen. Shown once per session; playIntro() counts it up and
 * wipes it away with a clip-path to reveal the site.
 */
export default function PageLoader() {
  const [show] = useState(() => !hasIntroPlayed());
  if (!show) return null;

  return (
    <div
      data-loader
      role="status"
      aria-label="Loading portfolio"
      className="fixed inset-0 z-[100] grid place-items-center bg-black"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
    >
      <LoadingCounter />
      <p className="label absolute inset-x-0 bottom-8 text-center text-mute" aria-hidden>
        {personal.name} &mdash; {personal.role}
      </p>
    </div>
  );
}

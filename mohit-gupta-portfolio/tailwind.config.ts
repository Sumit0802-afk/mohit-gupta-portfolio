import type { Config } from "tailwindcss";

// Loaded from src/app/globals.css through `@config`. The raw values live as
// CSS variables in src/styles/variables.css so plain CSS can share them.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        ink2: "var(--ink-2)",
        ink3: "var(--ink-3)",
        paper: "var(--paper)",
        mute: "var(--mute)",
        glass: "var(--glass)",
        glass2: "var(--glass-2)",
        line: "var(--line)",
        warm: "var(--warm)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Helvetica Neue", "Inter", "Arial", "sans-serif"],
        serif: ["var(--font-serif)", "Playfair Display", "Georgia", "serif"],
      },
      transitionTimingFunction: {
        cine: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
};

export default config;

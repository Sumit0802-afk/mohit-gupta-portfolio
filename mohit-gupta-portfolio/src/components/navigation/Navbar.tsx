"use client";

import { useRef, useState } from "react";
import { Menu } from "lucide-react";
import { navigation } from "@/data/navigation";
import { personal } from "@/data/personal";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { cn } from "@/lib/utils";
import MagneticButton from "@/components/ui/MagneticButton";
import RollText from "@/components/ui/RollText";
import MobileMenu from "./MobileMenu";
import NavigationLink from "./NavigationLink";

export default function Navbar() {
  const progress = useRef<HTMLSpanElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const scrolled = useScrollProgress((value) => {
    if (progress.current) progress.current.style.transform = `scaleX(${value})`;
  });

  return (
    <>
      <header data-nav className="fixed inset-x-0 top-0 z-50">
        <div
          className={cn(
            "relative grid grid-cols-[1fr_auto] items-center overflow-hidden border transition-all duration-700 ease-cine md:grid-cols-[1fr_auto_1fr]",
            scrolled
              ? "mx-3 mt-3 rounded-full border-line bg-ink/55 px-5 py-2.5 backdrop-blur-xl md:mx-6 md:px-7"
              : "mx-0 mt-0 rounded-none border-transparent bg-transparent px-[var(--gutter)] py-6",
          )}
        >
          <NavigationLink
            id="top"
            className="roll-host label justify-self-start font-bold tracking-[0.3em]"
            aria-label={`${personal.name}, back to top`}
          >
            <RollText>{personal.name}</RollText>
          </NavigationLink>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-9 lg:gap-12">
              {navigation.map((item) => (
                <li key={item.id}>
                  <NavigationLink
                    id={item.id}
                    className="roll-host label text-paper/80 transition-colors duration-500 hover:text-paper"
                  >
                    <RollText>{item.label}</RollText>
                  </NavigationLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden justify-self-end md:block">
            <MagneticButton>
              <NavigationLink id="contact" className="btn roll-host label !px-5 !py-2.5">
                <RollText>Let&rsquo;s talk</RollText>
              </NavigationLink>
            </MagneticButton>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="-mr-2 flex h-11 w-11 items-center justify-center justify-self-end md:hidden"
          >
            <Menu size={22} strokeWidth={1.5} aria-hidden />
          </button>

          {/* Reading progress along the bottom edge of the bar */}
          <span
            ref={progress}
            aria-hidden
            style={{ transform: "scaleX(0)" }}
            className={cn(
              "absolute inset-x-0 bottom-0 h-px origin-left bg-warm transition-opacity duration-500",
              scrolled ? "opacity-70" : "opacity-0",
            )}
          />
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

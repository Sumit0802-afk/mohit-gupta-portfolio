"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { menuItem, menuPanel } from "@/animations/pageTransitions";
import { navigation } from "@/data/navigation";
import { personal } from "@/data/personal";
import { lockScroll } from "@/hooks/useSmoothScroll";
import { pad2 } from "@/lib/utils";
import NavigationLink from "./NavigationLink";

type Props = { open: boolean; onClose: () => void };

/** Full-screen black menu with oversized links, for phones and tablets. */
export default function MobileMenu({ open, onClose }: Props) {
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    lockScroll(true);
    const previouslyFocused = document.activeElement as HTMLElement | null;
    panel.current?.querySelector<HTMLElement>("button")?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !panel.current) return;

      // Keep focus inside the menu while it is open.
      const focusable = panel.current.querySelectorAll<HTMLElement>("a, button");
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lockScroll(false);
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panel}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          variants={menuPanel}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed inset-0 z-[60] flex flex-col bg-black px-[var(--gutter)] pb-8 pt-6 md:hidden"
        >
          <div className="flex items-center justify-between">
            <span className="label font-bold tracking-[0.3em]">{personal.name}</span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="-mr-2 flex h-11 w-11 items-center justify-center"
            >
              <X size={24} strokeWidth={1.5} aria-hidden />
            </button>
          </div>

          <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center">
            <ul className="flex flex-col gap-3">
              {navigation.map((item, index) => (
                <li key={item.id} className="overflow-hidden">
                  <motion.div variants={menuItem} className="flex items-baseline gap-4">
                    <span className="label text-warm">{pad2(index + 1)}</span>
                    <NavigationLink
                      id={item.id}
                      onNavigate={onClose}
                      className="display text-[12.5vw] leading-none"
                    >
                      {item.label}
                    </NavigationLink>
                  </motion.div>
                </li>
              ))}
            </ul>
          </nav>

          <div className="label flex flex-col gap-2 border-t border-line pt-6 text-mute">
            <a href={personal.emailHref} className="normal-case tracking-normal text-paper">
              {personal.email}
            </a>
            <a href={personal.phoneHref}>+91 {personal.phone}</a>
            <span>{personal.location}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

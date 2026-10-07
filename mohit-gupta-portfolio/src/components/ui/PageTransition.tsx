"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { curtain, curtainLabel } from "@/animations/pageTransitions";
import { MEDIA, PAGE_TRANSITION } from "@/lib/constants";

type Navigate = (href: string, label: string) => void;

const TransitionContext = createContext<Navigate>(() => undefined);

/** Navigate to another page behind a black curtain that shows `label`. */
export const usePageTransition = () => useContext(TransitionContext);

export default function PageTransition({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [label, setLabel] = useState<string | null>(null);
  const destination = useRef<string | null>(null);

  const navigate = useCallback<Navigate>(
    (href, nextLabel) => {
      const path = href.split("#")[0] || "/";
      const samePage = path === window.location.pathname;
      if (samePage || window.matchMedia(MEDIA.reducedMotion).matches) {
        router.push(href);
        return;
      }
      destination.current = path;
      setLabel(nextLabel);
      window.setTimeout(() => router.push(href), PAGE_TRANSITION.cover + PAGE_TRANSITION.hold);
    },
    [router],
  );

  // Lift the curtain once the new route has rendered underneath it.
  useEffect(() => {
    if (!label) return;
    const arrived = destination.current === pathname;
    const timer = window.setTimeout(() => setLabel(null), arrived ? 60 : 4000);
    return () => window.clearTimeout(timer);
  }, [label, pathname]);

  return (
    <TransitionContext.Provider value={navigate}>
      {children}
      <AnimatePresence>
        {label && (
          <motion.div
            key="curtain"
            aria-hidden
            variants={curtain}
            initial="initial"
            animate="cover"
            exit="exit"
            className="fixed inset-0 z-[120] grid place-items-center bg-black"
          >
            <div className="overflow-hidden px-6">
              <motion.p variants={curtainLabel} className="display text-[min(17vw,15rem)]">
                {label}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}

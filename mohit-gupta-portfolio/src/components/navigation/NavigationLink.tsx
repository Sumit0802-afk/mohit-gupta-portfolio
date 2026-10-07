"use client";

import type { MouseEvent, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { scrollToTarget } from "@/hooks/useSmoothScroll";

type Props = {
  /** Section id on the home page, or "top". */
  id: string;
  children: ReactNode;
  className?: string;
  onNavigate?: () => void;
  "data-cursor"?: string;
  "aria-label"?: string;
};

/**
 * Link to a home-page section. Smooth-scrolls when already on the home page,
 * otherwise routes back to it with the hash.
 */
export default function NavigationLink({ id, children, onNavigate, ...rest }: Props) {
  const onHome = usePathname() === "/";

  if (!onHome) {
    return (
      <Link href={id === "top" ? "/" : `/#${id}`} onClick={onNavigate} {...rest}>
        {children}
      </Link>
    );
  }

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onNavigate?.();
    // Wait a frame so any overlay that locked scrolling has released it.
    requestAnimationFrame(() => scrollToTarget(id === "top" ? 0 : `#${id}`));
  };

  return (
    <a href={`#${id}`} onClick={onClick} {...rest}>
      {children}
    </a>
  );
}

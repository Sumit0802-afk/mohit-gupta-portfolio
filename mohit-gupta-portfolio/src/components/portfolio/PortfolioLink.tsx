"use client";

import type { MouseEvent, ReactNode } from "react";
import Link from "next/link";
import { usePageTransition } from "@/components/ui/PageTransition";

type Props = {
  href: string;
  /** Word shown on the black transition screen, e.g. "Portraits". */
  label: string;
  children?: ReactNode;
  className?: string;
  "data-cursor"?: string;
  "aria-label"?: string;
};

/** Internal link that navigates behind the black page-transition curtain. */
export default function PortfolioLink({ href, label, children, ...rest }: Props) {
  const navigate = usePageTransition();

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    // Leave new-tab / new-window clicks to the browser.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    navigate(href, label);
  };

  return (
    <Link href={href} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
}

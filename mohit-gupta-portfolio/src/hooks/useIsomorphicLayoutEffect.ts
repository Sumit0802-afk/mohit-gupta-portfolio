import { useEffect, useLayoutEffect } from "react";

/** useLayoutEffect in the browser, useEffect on the server (no warning). */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

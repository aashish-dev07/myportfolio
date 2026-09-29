"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Subscribes to a CSS media query.
 *
 * useSyncExternalStore rather than useState+useEffect: the browser is the
 * source of truth here, so React can read it directly and keep SSR consistent
 * (the server snapshot is always `false`) without a cascading render on mount.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export type Theme = "dark" | "light";

/**
 * Reads the theme straight off `<html data-theme>`, which the inline script in
 * the layout sets before first paint. A MutationObserver keeps React in sync,
 * so the attribute stays the single source of truth.
 */
export function useTheme(): [Theme, (next: Theme) => void] {
  const theme = useSyncExternalStore(
    (onChange) => {
      const observer = new MutationObserver(onChange);
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme"],
      });
      return () => observer.disconnect();
    },
    () => (document.documentElement.dataset.theme as Theme) || "dark",
    () => "dark" as Theme,
  );

  const setTheme = useCallback((next: Theme) => {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private mode or blocked storage — the change still applies this visit.
    }
  }, []);

  return [theme, setTheme];
}

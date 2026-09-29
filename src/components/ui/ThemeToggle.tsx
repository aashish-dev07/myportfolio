"use client";

import { AnimatePresence, motion } from "motion/react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/hooks";

export function ThemeToggle() {
  const [theme, setTheme] = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      className="glass relative grid size-10 place-items-center overflow-hidden rounded-full transition-colors hover:border-line-strong"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 14, opacity: 0, rotate: -35 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -14, opacity: 0, rotate: 35 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="grid place-items-center"
        >
          {theme === "dark" ? (
            <Moon className="size-4 text-accent" />
          ) : (
            <Sun className="size-4 text-accent" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

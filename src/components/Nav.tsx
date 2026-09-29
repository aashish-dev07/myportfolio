"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Download, Menu, X } from "lucide-react";
import { Github } from "./ui/BrandIcons";
import { navLinks, profile } from "@/data/profile";
import { ThemeToggle } from "./ui/ThemeToggle";
import { Magnetic } from "./ui/Magnetic";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight whichever section currently owns the upper third of the viewport.
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector<HTMLElement>(l.href))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0.1, 0.3, 0.6] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={[
            "mx-auto flex h-[var(--nav-h)] max-w-6xl items-center justify-between gap-4 px-5 transition-all duration-300 sm:px-8",
            scrolled
              ? "mt-3 rounded-2xl border border-line bg-bg-elevated/70 backdrop-blur-xl sm:mx-6"
              : "border border-transparent",
          ].join(" ")}
        >
          <a href="#home" className="group flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-accent to-accent-3 font-mono text-sm font-bold text-[var(--accent-contrast)]">
              AK
            </span>
            <span className="hidden text-sm font-medium tracking-tight sm:block">
              Aashish<span className="text-muted">.dev</span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const id = link.href.slice(1);
              const isActive = active === id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative rounded-full px-3.5 py-2 text-sm text-muted transition-colors hover:text-ink"
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-surface-strong"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className={isActive ? "relative text-ink" : "relative"}>
                    {link.label}
                  </span>
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <Magnetic className="hidden sm:block">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub profile"
                className="glass grid size-10 place-items-center rounded-full transition-colors hover:border-line-strong"
              >
                <Github className="size-4" />
              </a>
            </Magnetic>

            <Magnetic className="hidden sm:block">
              <a
                href="#contact"
                className="rounded-full bg-gradient-to-r from-accent to-accent-2 px-5 py-2.5 text-sm font-medium text-[var(--accent-contrast)] transition-shadow hover:shadow-[0_0_28px_-6px_var(--glow)]"
              >
                Hire me
              </a>
            </Magnetic>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="glass grid size-10 place-items-center rounded-full md:hidden"
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-xl md:hidden"
          >
            <nav className="flex h-full flex-col items-center justify-center gap-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i + 0.08, duration: 0.4 }}
                  className="px-6 py-3 text-3xl font-semibold tracking-tight text-muted transition-colors hover:text-ink"
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.4 }}
                className="mt-6 flex flex-col items-center gap-3"
              >
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-gradient-to-r from-accent to-accent-2 px-8 py-3 font-medium text-[var(--accent-contrast)]"
                >
                  Hire me
                </a>

                <a
                  href={profile.resume}
                  download={profile.resumeFileName}
                  onClick={() => setOpen(false)}
                  className="glass inline-flex items-center gap-2 rounded-full px-8 py-3 font-medium"
                >
                  <Download className="size-4 text-accent" />
                  Download CV
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

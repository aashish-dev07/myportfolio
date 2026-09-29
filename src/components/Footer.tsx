"use client";

import { Mail, Phone, ArrowUp } from "lucide-react";
import { Github, Linkedin } from "./ui/BrandIcons";
import { navLinks, profile } from "@/data/profile";
import { Magnetic } from "./ui/Magnetic";

export function Footer() {
  return (
    <footer className="relative border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="flex flex-col items-center gap-9 text-center">
          <a href="#home" className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-accent to-accent-3 font-mono text-sm font-bold text-[var(--accent-contrast)]">
              AK
            </span>
            <span className="text-sm font-medium tracking-tight">
              Aashish<span className="text-muted">.dev</span>
            </span>
          </a>

          <nav className="flex flex-wrap justify-center gap-x-7 gap-y-2">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-muted transition-colors hover:text-ink"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {[
              { href: profile.github, icon: Github, label: "GitHub" },
              { href: profile.linkedin, icon: Linkedin, label: "LinkedIn" },
              { href: `mailto:${profile.email}`, icon: Mail, label: "Email" },
              { href: profile.phoneHref, icon: Phone, label: "Phone" },
            ].map((s) => (
              <Magnetic key={s.label}>
                <a
                  href={s.href}
                  aria-label={s.label}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noreferrer noopener" : undefined}
                  className="glass grid size-11 place-items-center rounded-full transition-colors hover:border-line-strong hover:text-accent"
                >
                  <s.icon className="size-[18px]" />
                </a>
              </Magnetic>
            ))}
          </div>

          <div className="flex w-full flex-col items-center gap-4 border-t border-line pt-8 sm:flex-row sm:justify-between">
            <p className="text-xs text-faint">
              © {new Date().getFullYear()} {profile.name}. Built with Next.js, TypeScript &amp; Tailwind CSS.
            </p>

            <a
              href="#home"
              className="inline-flex items-center gap-2 text-xs text-faint transition-colors hover:text-accent"
            >
              Back to top
              <ArrowUp className="size-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

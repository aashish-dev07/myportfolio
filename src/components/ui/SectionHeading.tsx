"use client";

import { motion } from "motion/react";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  const centered = align === "center";

  return (
    <div
      className={[
        "flex flex-col gap-4",
        centered ? "items-center text-center" : "items-start text-left",
      ].join(" ")}
    >
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 font-mono text-xs tracking-[0.18em] text-muted uppercase">
          <span className="relative flex size-1.5">
            <span className="animate-pulse-ring absolute inline-flex size-full rounded-full bg-accent" />
            <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
          </span>
          {eyebrow}
        </span>
      </Reveal>

      <Reveal delay={0.08}>
        <h2 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          {title}
        </h2>
      </Reveal>

      <Reveal delay={0.14}>
        <motion.span
          className="block h-px rounded-full bg-gradient-to-r from-accent via-accent-2 to-accent-3"
          initial={{ width: 0 }}
          whileInView={{ width: centered ? 120 : 84 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </Reveal>

      {description && (
        <Reveal delay={0.2}>
          <p
            className={[
              "text-pretty text-base leading-relaxed text-muted sm:text-lg",
              centered ? "mx-auto max-w-2xl" : "max-w-2xl",
            ].join(" ")}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}

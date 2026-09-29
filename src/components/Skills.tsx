"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { skillGroups } from "@/data/profile";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

export function Skills() {
  const [activeId, setActiveId] = useState(skillGroups[0].id);
  const active = skillGroups.find((g) => g.id === activeId) ?? skillGroups[0];

  return (
    <section id="skills" className="relative scroll-mt-24 py-24 sm:py-32">
      {/* Soft wash so the section separates from its neighbours. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/4 -z-10 mx-auto h-96 max-w-4xl rounded-full bg-accent-2/10 blur-[140px]"
      />

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Skills"
          title="The stack I reach for"
          description="Grouped the way I actually use them — pick a category to see where my time goes."
        />

        {/* Category tabs ------------------------------------------------ */}
        <Reveal className="mt-14">
          <div
            role="tablist"
            aria-label="Skill categories"
            className="flex flex-wrap justify-center gap-2"
          >
            {skillGroups.map((g) => {
              const isActive = g.id === activeId;
              return (
                <button
                  key={g.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveId(g.id)}
                  className={[
                    "relative rounded-full px-4 py-2.5 text-sm transition-colors",
                    isActive ? "text-[var(--accent-contrast)]" : "text-muted hover:text-ink",
                  ].join(" ")}
                >
                  {isActive && (
                    <motion.span
                      layoutId="skill-tab"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-accent-2"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{g.title}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Active group ------------------------------------------------- */}
        {/* Reserve the tallest group's height so switching tabs does not jump. */}
        <div className="mt-10 sm:min-h-[23rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-center text-sm text-muted">{active.blurb}</p>

              <div className="mt-9 grid gap-x-10 gap-y-6 sm:grid-cols-2">
                {active.skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.045, duration: 0.4 }}
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="font-mono text-xs text-faint tabular-nums">
                        {skill.level}%
                      </span>
                    </div>

                    <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-surface-strong">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-accent via-accent-2 to-accent-3"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{
                          duration: 0.9,
                          delay: 0.12 + i * 0.045,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

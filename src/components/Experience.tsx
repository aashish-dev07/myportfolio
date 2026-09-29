"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Briefcase, MapPin } from "lucide-react";
import { experience } from "@/data/profile";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { SpotlightCard } from "./ui/SpotlightCard";

export function Experience() {
  const trackRef = useRef<HTMLDivElement>(null);

  // The timeline spine fills as the section scrolls past.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 75%", "end 55%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section id="experience" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've shipped"
          description="Four years across product teams and client work — Node.js and React today, Laravel and Angular alongside it."
        />

        <div ref={trackRef} className="relative mt-16 pl-8 sm:pl-12">
          {/* Spine */}
          <div
            aria-hidden
            className="absolute top-2 bottom-2 left-[7px] w-px bg-line sm:left-[15px]"
          />
          <motion.div
            aria-hidden
            style={{ scaleY }}
            className="absolute top-2 bottom-2 left-[7px] w-px origin-top bg-gradient-to-b from-accent via-accent-2 to-accent-3 sm:left-[15px]"
          />

          <div className="space-y-8">
            {experience.map((job, i) => (
              <Reveal key={job.company} direction="up" delay={i * 0.06}>
                <div className="relative">
                  {/* Node */}
                  <span
                    aria-hidden
                    className="absolute top-8 -left-8 grid size-[15px] place-items-center sm:-left-12"
                  >
                    <span className="animate-pulse-ring absolute size-[15px] rounded-full bg-accent/50" />
                    <span className="relative size-[9px] rounded-full bg-accent ring-4 ring-[var(--bg)]" />
                  </span>

                  <SpotlightCard className="p-7 sm:p-9">
                    <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
                      <div>
                        <h3 className="text-xl font-semibold tracking-tight">
                          {job.role}
                        </h3>
                        <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
                          <span className="inline-flex items-center gap-1.5">
                            <Briefcase className="size-3.5 text-accent" />
                            {job.company}
                          </span>
                          {job.location && (
                            <span className="inline-flex items-center gap-1.5">
                              <MapPin className="size-3.5 text-accent" />
                              {job.location}
                            </span>
                          )}
                        </p>
                      </div>

                      <span className="rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-xs whitespace-nowrap text-muted">
                        {job.period}
                      </span>
                    </div>

                    <ul className="mt-6 space-y-3">
                      {job.points.map((point) => (
                        <li
                          key={point}
                          className="flex gap-3 text-sm leading-relaxed text-muted"
                        >
                          <span
                            aria-hidden
                            className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-gradient-to-r from-accent to-accent-2"
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </SpotlightCard>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

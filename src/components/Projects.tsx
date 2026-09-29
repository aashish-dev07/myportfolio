"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Star } from "lucide-react";
import { Github } from "./ui/BrandIcons";
import { profile, projects, type Project } from "@/data/profile";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { SpotlightCard } from "./ui/SpotlightCard";
import { Magnetic } from "./ui/Magnetic";

const FILTERS = ["All", "Node.js", "Laravel", "Personal"] as const;
type Filter = (typeof FILTERS)[number];

function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: -10 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      className={project.featured ? "lg:col-span-2" : ""}
    >
      <SpotlightCard className="group flex h-full flex-col p-7 sm:p-9">
        {/* Accent strip */}
        <span
          aria-hidden
          className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${project.accent} opacity-60`}
        />

        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h3 className="text-2xl font-semibold tracking-tight">{project.title}</h3>
              {project.featured && (
                <span className="inline-flex items-center gap-1 rounded-full bg-accent/12 px-2.5 py-1 font-mono text-[10px] tracking-wider text-accent uppercase ring-1 ring-accent/25">
                  <Star className="size-3" />
                  Featured
                </span>
              )}
            </div>
            <p
              className={`mt-1.5 bg-gradient-to-r bg-clip-text text-sm font-medium text-transparent ${project.accent}`}
            >
              {project.tagline}
            </p>
          </div>

          <span className="shrink-0 font-mono text-xs whitespace-nowrap text-faint">
            {project.period}
          </span>
        </div>

        <p className="mt-5 text-pretty text-sm leading-relaxed text-muted">
          {project.description}
        </p>

        <p className="mt-4 font-mono text-xs text-faint">{project.role}</p>

        {/* Expandable highlights ---------------------------------------- */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-medium text-accent transition-opacity hover:opacity-80"
        >
          {open ? "Hide details" : `What I built (${project.highlights.length})`}
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
            <ChevronDown className="size-4" />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-4 space-y-3 border-l border-line pl-4">
                {project.highlights.map((h) => (
                  <li key={h} className="text-sm leading-relaxed text-muted">
                    {h}
                  </li>
                ))}
              </div>
            </motion.ul>
          )}
        </AnimatePresence>

        {/* Stack + link -------------------------------------------------- */}
        <div className="mt-auto pt-7">
          <div className="flex flex-wrap gap-2">
            {project.stack.map((t) => (
              <span
                key={t}
                className="rounded-md border border-line bg-surface px-2.5 py-1 font-mono text-[11px] text-muted"
              >
                {t}
              </span>
            ))}
          </div>

          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-6 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
          >
            <Github className="size-4" />
            View on GitHub
          </a>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<Filter>("All");

  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <section id="projects" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Projects"
          title="Things I've built"
          description="Production platforms and client products, plus the personal builds I use to learn something new."
        />

        {/* Filters ------------------------------------------------------- */}
        <Reveal className="mt-12">
          <div className="flex flex-wrap justify-center gap-2">
            {FILTERS.map((f) => {
              const isActive = f === filter;
              const count =
                f === "All" ? projects.length : projects.filter((p) => p.category === f).length;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  aria-pressed={isActive}
                  className={[
                    "relative rounded-full border px-4 py-2 text-sm transition-colors",
                    isActive
                      ? "border-accent/40 text-ink"
                      : "border-line text-muted hover:text-ink",
                  ].join(" ")}
                >
                  {isActive && (
                    <motion.span
                      layoutId="project-filter"
                      className="absolute inset-0 rounded-full bg-accent/12"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">
                    {f}
                    <span className="ml-1.5 font-mono text-xs text-faint">{count}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Grid ---------------------------------------------------------- */}
        <motion.div layout className="mt-10 grid gap-6 lg:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visible.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Repo CTA ------------------------------------------------------ */}
        <Reveal className="mt-14">
          <div className="flex justify-center">
            <Magnetic>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer noopener"
                className="glass inline-flex items-center gap-3 rounded-full px-7 py-4 font-medium transition-colors hover:border-line-strong"
              >
                <Github className="size-5 text-accent" />
                Browse all my repositories
              </a>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

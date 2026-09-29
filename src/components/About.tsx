"use client";

import { Award, Brain, Database, GraduationCap, Server, ShieldCheck } from "lucide-react";
import { certifications, education, profile } from "@/data/profile";
import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { SpotlightCard } from "./ui/SpotlightCard";

const PILLARS = [
  {
    icon: Server,
    title: "API & Backend",
    body: "REST API design on Node.js/Express and Laravel — 180+ endpoints in production on Tourneyfest alone, with middleware, file uploads and structured logging.",
  },
  {
    icon: Database,
    title: "Data Modelling",
    body: "MongoDB aggregation pipelines and indexing, plus relational work in MySQL with Mongoose and Eloquent as the ORM layer.",
  },
  {
    icon: ShieldCheck,
    title: "Auth & Access",
    body: "OAuth 2.0 with Google Sign-In via Passport.js, bcrypt hashing and role-based access control separating admins, coaches and players.",
  },
  {
    icon: Brain,
    title: "AI-Assisted Delivery",
    body: "Claude Code and OpenAI Codex in the daily loop for building, debugging and reviewing — faster output without skipping the review step.",
  },
];

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="About me"
          title="Full stack, end to end"
          description="Four years of turning requirements into shipped products — from the database schema right through to the animation on the button."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-[1.15fr_1fr]">
          {/* Narrative -------------------------------------------------- */}
          <Reveal direction="right">
            <SpotlightCard className="h-full p-8 sm:p-10">
              <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">
                The short version
              </p>
              <p className="mt-5 text-pretty text-lg leading-relaxed">
                {profile.summary}
              </p>
              <p className="mt-5 text-pretty leading-relaxed text-muted">
                {profile.summaryExtended}
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {["MongoDB", "Express.js", "React.js", "Node.js", "Next.js", "TypeScript", "Laravel", "MySQL"].map(
                  (t) => (
                    <span
                      key={t}
                      className="rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-xs text-muted"
                    >
                      {t}
                    </span>
                  ),
                )}
              </div>
            </SpotlightCard>
          </Reveal>

          {/* Education + certifications --------------------------------- */}
          <div className="grid gap-6">
            <Reveal direction="left">
              <SpotlightCard className="p-8">
                <h3 className="flex items-center gap-2.5 text-sm font-semibold tracking-wide uppercase">
                  <GraduationCap className="size-4 text-accent" />
                  Education
                </h3>
                <ul className="mt-6 space-y-5">
                  {education.map((e) => (
                    <li key={e.degree} className="border-l border-line pl-4">
                      <p className="text-sm font-medium">{e.degree}</p>
                      <p className="mt-1 text-sm text-muted">{e.school}</p>
                      <p className="mt-1 font-mono text-xs text-faint">{e.period}</p>
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>

            <Reveal direction="left" delay={0.1}>
              <SpotlightCard className="p-8">
                <h3 className="flex items-center gap-2.5 text-sm font-semibold tracking-wide uppercase">
                  <Award className="size-4 text-accent" />
                  Certifications
                </h3>
                <ul className="mt-6 space-y-3">
                  {certifications.map((c) => (
                    <li
                      key={c.name}
                      className="flex items-baseline justify-between gap-4 text-sm"
                    >
                      <span>
                        {c.name}
                        <span className="text-faint"> · {c.issuer}</span>
                      </span>
                      <span className="shrink-0 font-mono text-xs text-faint">
                        {c.year}
                      </span>
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>
          </div>
        </div>

        {/* Pillars ------------------------------------------------------ */}
        <RevealGroup className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p) => (
            <RevealItem key={p.title}>
              <SpotlightCard className="group h-full p-7">
                <div className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-accent/15 to-accent-3/15 ring-1 ring-line transition-transform duration-300 group-hover:scale-110">
                  <p.icon className="size-5 text-accent" />
                </div>
                <h3 className="mt-5 font-medium">{p.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{p.body}</p>
              </SpotlightCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

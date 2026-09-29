"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, Download, Mail, MapPin, Phone, Sparkles } from "lucide-react";
import { Github } from "./ui/BrandIcons";
import { useRef } from "react";
import { profile, stats } from "@/data/profile";
import { Aurora } from "./ui/Aurora";
import { Counter } from "./ui/Counter";
import { Magnetic } from "./ui/Magnetic";
import { Marquee } from "./ui/Marquee";
import { TypeRotator } from "./TypeRotator";

const TICKER = [
  "MongoDB", "Express.js", "React.js", "Node.js", "Next.js", "TypeScript",
  "Laravel", "MySQL", "AWS S3", "OAuth 2.0", "RBAC", "Tailwind CSS",
  "Zustand", "Mongoose", "Postman", "Claude Code",
] as const;

const NAME_WORDS = profile.name.split(" ");

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Content drifts up and fades as the hero scrolls away.
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-svh flex-col justify-center overflow-hidden pt-[var(--nav-h)]"
    >
      <Aurora />

      <motion.div
        style={{ y, opacity }}
        className="relative mx-auto w-full max-w-6xl px-5 py-16 sm:px-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs text-muted"
        >
          <span className="relative flex size-2">
            <span className="animate-pulse-ring absolute inline-flex size-full rounded-full bg-accent" />
            <span className="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
          Available for full stack roles &amp; freelance work
        </motion.div>

        <h1 className="mt-7 text-5xl font-semibold tracking-tighter sm:text-7xl lg:text-8xl">
          {NAME_WORDS.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 46, rotateX: -55 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.85,
                delay: 0.2 + i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mr-[0.25em] inline-block [transform-style:preserve-3d]"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-4 text-xl tracking-tight sm:text-3xl"
        >
          <span className="text-muted">I build as a </span>
          <TypeRotator phrases={profile.roles} />
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.62 }}
          className="mt-6 max-w-2xl text-pretty leading-relaxed text-muted"
        >
          {profile.summary}
        </motion.p>

        {/* Contact row ---------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.72 }}
          className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted"
        >
          <span className="inline-flex items-center gap-2">
            <MapPin className="size-4 text-accent" />
            {profile.location}
          </span>
          <a
            href={profile.phoneHref}
            className="inline-flex items-center gap-2 transition-colors hover:text-ink"
          >
            <Phone className="size-4 text-accent" />
            {profile.phone}
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 transition-colors hover:text-ink"
          >
            <Mail className="size-4 text-accent" />
            {profile.email}
          </a>
        </motion.div>

        {/* CTAs ------------------------------------------------------------ */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.82 }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <Magnetic>
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-7 py-3.5 font-medium text-[var(--accent-contrast)] transition-shadow hover:shadow-[0_0_40px_-8px_var(--glow)]"
            >
              <Sparkles className="size-4" />
              View my work
            </a>
          </Magnetic>

          <Magnetic>
            <a
              href={profile.resume}
              download={profile.resumeFileName}
              className="group glass inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-medium transition-colors hover:border-line-strong"
            >
              <Download className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              Download CV
            </a>
          </Magnetic>

          <Magnetic>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              className="glass inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-medium transition-colors hover:border-line-strong"
            >
              <Github className="size-4" />
              GitHub
            </a>
          </Magnetic>

          <Magnetic>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-line px-7 py-3.5 font-medium text-muted transition-colors hover:border-line-strong hover:text-ink"
            >
              <Mail className="size-4" />
              Get in touch
            </a>
          </Magnetic>
        </motion.div>

        {/* Stats ----------------------------------------------------------- */}
        <motion.dl
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.94 }}
          className="mt-12 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-7 border-t border-line pt-8 sm:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-3xl font-semibold tracking-tight sm:text-4xl">
                <span className="text-gradient">
                  <Counter value={s.value} suffix={s.suffix} />
                </span>
              </dd>
              <p className="mt-1 text-xs leading-snug text-faint">{s.label}</p>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="relative mx-auto w-full max-w-6xl px-5 pb-8 sm:px-8"
      >
        <Marquee items={TICKER} />
      </motion.div>

      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="animate-drift absolute bottom-5 left-1/2 hidden -translate-x-1/2 text-faint transition-colors hover:text-accent lg:block"
      >
        <ArrowDown className="size-5" />
      </motion.a>
    </section>
  );
}

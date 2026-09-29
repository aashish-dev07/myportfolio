"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertCircle, CheckCircle2, Download, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { Github, Linkedin } from "./ui/BrandIcons";
import { profile } from "@/data/profile";
import { MESSAGE_MAX, validateContact, type ContactPayload, type FieldErrors } from "@/lib/validation";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { SpotlightCard } from "./ui/SpotlightCard";
import { Magnetic } from "./ui/Magnetic";

type Status = "idle" | "sending" | "sent" | "error";

const EMPTY: ContactPayload = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  website: "",
};

const CHANNELS = [
  {
    icon: Phone,
    label: "Call or WhatsApp",
    value: profile.phone,
    href: profile.phoneHref,
  },
  {
    icon: Mail,
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    icon: Github,
    label: "GitHub",
    value: profile.github.replace(/^https?:\/\//, ""),
    href: profile.github,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: profile.linkedin.replace(/^https?:\/\//, ""),
    href: profile.linkedin,
  },
];

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-400"
          >
            <AlertCircle className="size-3.5 shrink-0" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm outline-none transition-colors placeholder:text-faint focus:border-accent/60 focus:bg-surface-strong";

export function Contact() {
  const [form, setForm] = useState<ContactPayload>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");

  const set = (key: keyof ContactPayload) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    // Clear the error as soon as the visitor starts fixing the field.
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setServerError("");

    const found = validateContact(form);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        if (data.errors) setErrors(data.errors);
        setServerError(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setForm(EMPTY);
      setErrors({});
      setStatus("sent");
      setTimeout(() => setStatus("idle"), 6000);
    } catch {
      setServerError("Network error — please check your connection and try again.");
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative scroll-mt-24 py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 mx-auto h-96 max-w-3xl rounded-full bg-accent/10 blur-[150px]"
      />

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something"
          description="Have a role, a project or a question? Send it across and I'll get back to you within a day."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-[1fr_1.3fr]">
          {/* Details ------------------------------------------------------ */}
          <div className="grid content-start gap-6">
            <Reveal direction="right">
              <SpotlightCard className="p-8">
                <h3 className="text-sm font-semibold tracking-wide uppercase">
                  Reach me directly
                </h3>

                <ul className="mt-7 space-y-5">
                  {CHANNELS.map((c) => (
                    <li key={c.label}>
                      <a
                        href={c.href}
                        target={c.href.startsWith("http") ? "_blank" : undefined}
                        rel={c.href.startsWith("http") ? "noreferrer noopener" : undefined}
                        className="group flex items-center gap-4"
                      >
                        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent/15 to-accent-3/15 ring-1 ring-line transition-transform duration-300 group-hover:scale-110">
                          <c.icon className="size-[18px] text-accent" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-xs text-faint">{c.label}</span>
                          <span className="block truncate text-sm transition-colors group-hover:text-accent">
                            {c.value}
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex items-center gap-3 border-t border-line pt-6 text-sm text-muted">
                  <MapPin className="size-4 shrink-0 text-accent" />
                  {profile.location}
                </div>

                <a
                  href={profile.resume}
                  download={profile.resumeFileName}
                  className="group mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-line bg-surface px-5 py-3 text-sm font-medium transition-colors hover:border-line-strong hover:bg-surface-strong"
                >
                  <Download className="size-4 text-accent transition-transform duration-300 group-hover:translate-y-0.5" />
                  Download my resume
                </a>
              </SpotlightCard>
            </Reveal>

            <Reveal direction="right" delay={0.1}>
              <SpotlightCard className="p-8">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex size-2">
                    <span className="animate-pulse-ring absolute inline-flex size-full rounded-full bg-accent" />
                    <span className="relative inline-flex size-2 rounded-full bg-accent" />
                  </span>
                  <p className="text-sm font-medium">Open to opportunities</p>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Full-time full stack roles, contract work and freelance builds.
                  Typical reply time is under 24 hours.
                </p>
              </SpotlightCard>
            </Reveal>
          </div>

          {/* Query form --------------------------------------------------- */}
          <Reveal direction="left">
            <SpotlightCard className="p-8 sm:p-10">
              <form onSubmit={handleSubmit} noValidate className="grid gap-5">
                {/* Honeypot — visually and semantically hidden from people. */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden
                  value={form.website}
                  onChange={set("website")}
                  className="absolute -left-[9999px] size-0 opacity-0"
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="name" label="Your name" error={errors.name}>
                    <input
                      id="name"
                      name="name"
                      autoComplete="name"
                      value={form.name}
                      onChange={set("name")}
                      placeholder="Jane Cooper"
                      className={inputClass}
                    />
                  </Field>

                  <Field id="email" label="Email" error={errors.email}>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={set("email")}
                      placeholder="jane@company.com"
                      className={inputClass}
                    />
                  </Field>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="phone" label="Phone (optional)" error={errors.phone}>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={set("phone")}
                      placeholder="+91 98765 43210"
                      className={inputClass}
                    />
                  </Field>

                  <Field id="subject" label="Subject" error={errors.subject}>
                    <input
                      id="subject"
                      name="subject"
                      value={form.subject}
                      onChange={set("subject")}
                      placeholder="Full stack role / project enquiry"
                      className={inputClass}
                    />
                  </Field>
                </div>

                <Field id="message" label="Your query" error={errors.message}>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    maxLength={MESSAGE_MAX}
                    value={form.message}
                    onChange={set("message")}
                    placeholder="Tell me about the role, the product or what you'd like built…"
                    className={`${inputClass} resize-y`}
                  />
                  <p className="mt-1.5 text-right font-mono text-xs text-faint tabular-nums">
                    {form.message.length}/{MESSAGE_MAX}
                  </p>
                </Field>

                <div className="flex flex-wrap items-center gap-4">
                  <Magnetic>
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-7 py-3.5 font-medium text-[var(--accent-contrast)] transition-shadow hover:shadow-[0_0_36px_-8px_var(--glow)] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {status === "sending" ? (
                        <>
                          <Loader2 className="size-4 animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          <Send className="size-4" />
                          Send message
                        </>
                      )}
                    </button>
                  </Magnetic>

                  <AnimatePresence mode="wait">
                    {status === "sent" && (
                      <motion.p
                        key="sent"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        className="inline-flex items-center gap-2 text-sm text-accent"
                      >
                        <CheckCircle2 className="size-4" />
                        Thanks — your message is on its way.
                      </motion.p>
                    )}

                    {status === "error" && serverError && (
                      <motion.p
                        key="error"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        className="inline-flex items-center gap-2 text-sm text-rose-400"
                      >
                        <AlertCircle className="size-4" />
                        {serverError}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <p aria-live="polite" className="sr-only">
                  {status === "sent" ? "Message sent successfully." : ""}
                  {status === "error" ? serverError || "Please fix the highlighted fields." : ""}
                </p>
              </form>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

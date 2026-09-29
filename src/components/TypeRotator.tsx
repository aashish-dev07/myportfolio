"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/** Types each phrase out, holds it, deletes it, moves to the next. */
export function TypeRotator({ phrases }: { phrases: readonly string[] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    // With reduced motion the first phrase is shown statically (derived
    // below), so the typing loop never starts.
    if (reduce) return;

    const full = phrases[index % phrases.length];
    const done = !deleting && typed === full;
    const empty = deleting && typed === "";

    const delay = done ? 1900 : empty ? 250 : deleting ? 32 : 68;

    const timer = setTimeout(() => {
      if (done) {
        setDeleting(true);
      } else if (empty) {
        setDeleting(false);
        setIndex((i) => (i + 1) % phrases.length);
      } else {
        setTyped(
          deleting ? full.slice(0, typed.length - 1) : full.slice(0, typed.length + 1),
        );
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [typed, deleting, index, phrases, reduce]);

  const text = reduce ? phrases[0] : typed;

  return (
    <span className="inline-flex items-center">
      <span className="text-gradient font-semibold">{text}</span>
      <span className="animate-blink ml-1 inline-block h-[1em] w-[2px] translate-y-[0.08em] bg-accent" />
    </span>
  );
}

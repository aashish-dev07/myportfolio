"use client";

import { useRef, type ReactNode } from "react";

/**
 * Card shell that tracks the pointer and feeds --mx/--my to the CSS
 * `.spotlight` gradient, plus the gradient hairline from `.card-sheen`.
 */
export function SpotlightCard({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <Tag
      // @ts-expect-error - polymorphic ref narrows to HTMLDivElement here
      ref={ref}
      onPointerMove={onMove}
      className={`spotlight card-sheen glass relative overflow-hidden rounded-2xl ${className}`}
    >
      <div className="relative z-[2]">{children}</div>
    </Tag>
  );
}

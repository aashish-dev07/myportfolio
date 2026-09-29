"use client";

/**
 * Seamless horizontal ticker. The item list is rendered twice and the track
 * translates exactly -50%, so the loop has no visible seam.
 */
export function Marquee({ items }: { items: readonly string[] }) {
  return (
    <div
      aria-hidden
      className="group relative flex overflow-hidden py-3 [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]"
    >
      <div className="animate-marquee flex shrink-0 items-center gap-3 pr-3 group-hover:[animation-play-state:paused]">
        {[...items, ...items].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="glass shrink-0 rounded-full px-4 py-2 font-mono text-xs whitespace-nowrap text-muted"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

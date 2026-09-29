/**
 * Decorative background: three slow-drifting gradient blobs, a grid overlay
 * and a noise layer. Purely visual — hidden from assistive tech.
 */
export function Aurora({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div className="grid-lines absolute inset-0 opacity-60" />

      <div className="animate-float-slow absolute -top-40 -left-32 size-[34rem] rounded-full bg-accent/20 blur-[120px]" />
      <div
        className="animate-float-slow absolute -top-24 right-0 size-[30rem] rounded-full bg-accent-3/20 blur-[120px]"
        style={{ animationDelay: "-7s" }}
      />
      <div
        className="animate-float-slow absolute bottom-0 left-1/3 size-[28rem] rounded-full bg-accent-2/15 blur-[130px]"
        style={{ animationDelay: "-14s" }}
      />

      <div className="noise absolute inset-0 opacity-[0.035] mix-blend-overlay" />
    </div>
  );
}

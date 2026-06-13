/** Post-session rank chip — floats beside the hero phone. Fixed light card. */
export function RankCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`w-[250px] border border-line bg-paper p-4 shadow-[0_16px_48px_-16px_rgba(26,31,43,0.25)] ${className}`}
    >
      <div className="flex items-center justify-between">
        <span className="tag text-muted">Session complete</span>
        <span className="tag text-blue">↑ 3</span>
      </div>
      <p className="display mt-2 text-[34px] text-ink">
        #14 <span className="text-blue">→ #11</span>
      </p>
      <p className="tag mt-2 text-muted">1H 42M verified · Westfield High</p>
    </div>
  );
}

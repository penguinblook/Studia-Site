"use client";

import { useEffect, useState } from "react";

/** Live countdown for the lock-screen mock. Static under reduced motion. */
export default function SessionTimer({
  startSeconds = 6127, // 1:42:07
  className = "",
}: {
  startSeconds?: number;
  className?: string;
}) {
  const [seconds, setSeconds] = useState(startSeconds);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(
      () => setSeconds((s) => (s > 0 ? s - 1 : startSeconds)),
      1000
    );
    return () => clearInterval(id);
  }, [startSeconds]);

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");

  return (
    <span className={className} suppressHydrationWarning>
      {h}:{m}:{s}
    </span>
  );
}

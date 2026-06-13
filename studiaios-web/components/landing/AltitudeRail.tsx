"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, MOTION_OK } from "@/lib/gsap";

/**
 * Fixed right-edge altitude readout — the ascent motif. Climbs from 0 m to
 * 2,847 m with scroll progress. Decorative; hidden from screen readers and
 * from small screens.
 */
export default function AltitudeRail() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia(root);
    mm.add(MOTION_OK, () => {
      const num = root.current?.querySelector(".alt-num");
      const dot = root.current?.querySelector(".alt-dot");
      const st = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          if (num)
            num.textContent = Math.round(self.progress * 2847)
              .toLocaleString("en-US");
          if (dot)
            gsap.set(dot, { bottom: `${self.progress * 100}%` });
        },
      });
      gsap.to(root.current, { autoAlpha: 1, duration: 0.6, delay: 1.2 });
      return () => st.kill();
    });
    return () => mm.revert();
  }, []);

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 opacity-0 lg:flex"
    >
      <span className="tag text-fg-muted [writing-mode:vertical-rl]">alt</span>
      <div className="relative h-[26svh] w-px bg-rule">
        <span className="alt-dot absolute -left-[2.5px] bottom-0 h-[6px] w-[6px] bg-accent" />
      </div>
      <span className="font-mono text-[11px] tabular-nums text-fg-muted">
        <span className="alt-num">0</span> m
      </span>
    </div>
  );
}

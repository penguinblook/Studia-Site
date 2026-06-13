"use client";

import { useEffect, useRef } from "react";
import { gsap, MOTION_OK } from "@/lib/gsap";
import { useReveals } from "@/lib/useReveals";

const ROWS = [
  { rank: "08", name: "quietgrind", time: "21H 04M", you: false },
  { rank: "09", name: "m.okafor", time: "20H 41M", you: false },
  { rank: "10", name: "studywithlena", time: "19H 58M", you: false },
  { rank: "11", name: "you ↑3", time: "19H 12M", you: true },
  { rank: "12", name: "dru.kim", time: "18H 22M", you: false },
];

export default function Climb() {
  const root = useRef<HTMLElement>(null);
  useReveals(root);

  useEffect(() => {
    const mm = gsap.matchMedia(root);
    mm.add(MOTION_OK, () => {
      gsap.from(".board-row", {
        autoAlpha: 0,
        x: -24,
        stagger: 0.09,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: ".board", start: "top 78%" },
      });

      // the rank ticks down 14 → 11 as the number scrolls into view
      const target = root.current?.querySelector(".rank-num");
      if (target) {
        const obj = { v: 14 };
        gsap.to(obj, {
          v: 11,
          duration: 1.4,
          ease: "power2.out",
          snap: { v: 1 },
          scrollTrigger: { trigger: target, start: "top 80%" },
          onUpdate: () => {
            target.textContent = `#${Math.round(obj.v)}`;
          },
        });
      }
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="ranks">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-36">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="tag text-fg-muted" data-reveal>
              The climb
            </p>
            <h2
              className="display mt-4 text-[clamp(2.4rem,5.5vw,4.5rem)]"
              data-reveal
            >
              Your school is watching.
            </h2>
            <p className="mt-7 max-w-sm leading-relaxed text-fg-soft" data-reveal>
              Join your school and every verified minute counts toward your
              rank — and your school&rsquo;s rank against every other school in
              the city. Rivalries form on their own. Skip a night, and someone
              else does the moving.
            </p>

            <p className="display mt-10 text-[clamp(3.4rem,7vw,5.5rem)]" data-reveal>
              <span className="text-fg-muted">#14 → </span>
              <span className="rank-num text-accent">#11</span>
            </p>
            <p className="tag mt-2 text-fg-muted" data-reveal>
              One session. Three places.
            </p>

            <ul className="mt-10 flex flex-wrap gap-2" data-reveal>
              {["Live Activity", "Lock-screen widgets", "Streaks", "Study map"].map(
                (f) => (
                  <li
                    key={f}
                    className="tag border border-rule px-3 py-2 text-fg-soft"
                  >
                    {f}
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <div className="board w-full border border-rule bg-bg" data-reveal>
              <div className="flex items-center justify-between border-b border-rule px-5 py-3.5">
                <span className="tag text-fg-muted">
                  Westfield High — this week
                </span>
                <span className="tag text-fg-muted">847 enrolled</span>
              </div>
              <ul>
                {ROWS.map((r) => (
                  <li
                    key={r.rank}
                    className={`board-row flex items-center gap-4 border-b border-l-4 border-b-rule px-5 py-4 last:border-b-0 ${
                      r.you ? "border-l-accent bg-accent/5" : "border-l-transparent"
                    }`}
                  >
                    <span
                      className={`font-mono text-sm tabular-nums ${
                        r.you ? "font-bold text-accent" : "text-fg-muted"
                      }`}
                    >
                      {r.rank}
                    </span>
                    <span
                      className={`flex-1 font-mono text-sm ${
                        r.you ? "font-bold text-accent" : "text-fg-soft"
                      }`}
                    >
                      {r.name}
                    </span>
                    <span className="font-mono text-sm tabular-nums text-fg-muted">
                      {r.time}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between border-t border-rule px-5 py-3.5">
                <span className="tag text-fg-muted">School rank — city</span>
                <span className="tag text-accent">#3 of 41 ↑1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

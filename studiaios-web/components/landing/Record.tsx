"use client";

import { useEffect, useRef } from "react";
import { gsap, MOTION_OK } from "@/lib/gsap";
import { useReveals } from "@/lib/useReveals";

const FILLED = new Set([
  1, 2, 3, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 18, 19, 20, 21, 22, 23, 24,
  26, 27, 28, 29, 30,
]);
const DEEP = new Set([3, 7, 12, 16, 21, 24, 28]);
const SOFT = new Set([1, 6, 11, 14, 19, 26, 30]);

export default function Record() {
  const root = useRef<HTMLElement>(null);
  useReveals(root);

  useEffect(() => {
    const mm = gsap.matchMedia(root);
    mm.add(MOTION_OK, () => {
      gsap.from(".cell-filled", {
        scale: 0,
        autoAlpha: 0,
        duration: 0.45,
        ease: "back.out(2)",
        stagger: { each: 0.035, grid: [5, 6], from: "start" },
        scrollTrigger: { trigger: ".record-grid", start: "top 78%" },
      });

      const streak = root.current?.querySelector(".streak-num");
      if (streak) {
        const obj = { v: 0 };
        gsap.to(obj, {
          v: 23,
          duration: 1.6,
          ease: "power2.out",
          snap: { v: 1 },
          scrollTrigger: { trigger: streak, start: "top 85%" },
          onUpdate: () => {
            streak.textContent = String(Math.round(obj.v));
          },
        });
      }
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="bg-bg-warm">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-36">
        <div className="grid items-center gap-14 md:grid-cols-12">
          <div className="order-1 md:order-none md:col-span-5">
            <div className="border border-rule bg-bg p-7 sm:p-9" data-reveal>
              <div className="mb-6 flex items-baseline justify-between">
                <span className="tag text-fg-muted">The record</span>
                <span className="display text-xl text-accent">
                  <span className="streak-num">23</span>-day streak
                </span>
              </div>
              <div
                className="record-grid grid grid-cols-6 gap-1.5"
                role="img"
                aria-label="A 30-day grid of study sessions, 26 of 30 verified"
              >
                {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => {
                  const filled = FILLED.has(d);
                  const tone = DEEP.has(d)
                    ? "bg-accent-deep"
                    : SOFT.has(d)
                      ? "bg-accent-soft"
                      : "bg-accent";
                  return (
                    <div
                      key={d}
                      className={`aspect-square ${
                        filled ? `cell-filled ${tone}` : "border border-rule"
                      } ${d === 30 ? "blink" : ""}`}
                    />
                  );
                })}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="tag text-fg-muted">May 12 — Jun 10</span>
                <span className="tag text-accent">26 / 30 verified</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 md:col-start-8">
            <p className="tag text-fg-muted" data-reveal>
              The record
            </p>
            <h2
              className="display mt-4 text-[clamp(2.4rem,5.5vw,4.5rem)]"
              data-reveal
            >
              Thirty days, in evidence.
            </h2>
            <p className="mt-7 max-w-sm leading-relaxed text-fg-soft" data-reveal>
              Every verified session fills a square. After a month it stops
              being a habit tracker and starts being a portrait — twenty-six
              squares nobody can fake, including you.
            </p>
            <p className="tag mt-8 text-fg-muted" data-reveal>
              Streak protection on Studia+ — one freeze a week
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

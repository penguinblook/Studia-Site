"use client";

import { useRef } from "react";
import { useReveals } from "@/lib/useReveals";

const FREE = [
  "Sessions + app shield",
  "AI witness verification",
  "School leaderboards",
  "Streaks + the record",
  "Study map + live “studying now”",
];

const PLUS = [
  "Advanced Insights — peak hours, weekdays, a 20-week heatmap",
  "Project focuses + unlimited block modes",
  "Test study spots — is it quiet enough to focus?",
  "Full history, exportable as CSV",
  "Streak protection — one freeze a week",
];

export default function PlusSection() {
  const root = useRef<HTMLElement>(null);
  useReveals(root);

  return (
    <section ref={root} id="plus">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-36">
        <p className="tag text-fg-muted" data-reveal>
          Studia+
        </p>
        <h2
          className="display mt-4 max-w-2xl text-[clamp(2.4rem,5.5vw,4.5rem)]"
          data-reveal
        >
          The climb is free. Forever.
        </h2>

        <div className="mt-14 grid border border-rule md:grid-cols-2" data-reveal>
          <div className="p-8 sm:p-12">
            <p className="tag text-fg-muted">Free — always</p>
            <ul className="mt-7 space-y-4 font-mono text-sm text-fg-soft">
              {FREE.map((f) => (
                <li
                  key={f}
                  className="border-t border-rule pt-4 first:border-t-0 first:pt-0"
                >
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-blue p-8 text-paper sm:p-12">
            <p className="tag text-paper/70">Studia+ — for the obsessed</p>
            <ul className="mt-7 space-y-4 font-mono text-sm text-paper/90">
              {PLUS.map((f) => (
                <li
                  key={f}
                  className="border-t border-paper/20 pt-4 first:border-t-0 first:pt-0"
                >
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="tag mt-6 text-fg-muted" data-reveal>
          Billed via the App Store · Cancel anytime · Leaderboards are never
          paywalled
        </p>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { gsap, MOTION_OK } from "@/lib/gsap";
import { useReveals } from "@/lib/useReveals";

function Report({
  verified,
  time,
  detected,
  reason,
  className = "",
}: {
  verified: boolean;
  time: string;
  detected: string;
  reason?: string;
  className?: string;
}) {
  return (
    <div
      className={`w-full max-w-[340px] border border-charcoal-line bg-charcoal-soft p-5 ${className}`}
    >
      <div className="flex items-center justify-between">
        <span className="tag text-paper/50">Witness report</span>
        <span className="tag text-paper/30">{time}</span>
      </div>

      <div className="relative mt-4 h-[150px] overflow-hidden border border-charcoal-line bg-charcoal">
        {verified ? (
          <>
            <div className="absolute bottom-0 left-0 right-0 h-[44px] bg-paper-warm/15" />
            <div className="absolute bottom-[44px] left-6 h-[34px] w-[88px] -rotate-3 bg-paper/25" />
            <div className="absolute bottom-[44px] right-7 h-[52px] w-[78px] bg-blue-soft/40" />
            <div className="absolute bottom-[40px] right-4 h-[5px] w-[92px] bg-blue-soft/50" />
            <div className="absolute bottom-[52px] left-[118px] h-[4px] w-[46px] rotate-12 bg-paper/40" />
          </>
        ) : (
          <>
            <div className="absolute inset-x-0 top-0 h-[60px] bg-paper/5" />
            <div className="absolute left-1/2 top-[34px] h-[8px] w-[110px] -translate-x-1/2 rounded-full bg-paper/10" />
            <div className="absolute inset-x-0 bottom-0 h-[56px] bg-black/40" />
          </>
        )}
        <div className="scanline absolute inset-x-0 top-0 h-px bg-blue-soft/70" />
        <span className="tag absolute left-3 top-3 text-paper/30">
          {verified ? "1 / 3" : "3 / 3"}
        </span>
      </div>

      <p className="tag mt-4 leading-relaxed text-paper/50">{detected}</p>
      {reason && (
        <p className="mt-2 font-mono text-xs lowercase text-paper/40">
          &ldquo;{reason}&rdquo;
        </p>
      )}

      <div className="mt-4 flex items-center justify-between border-t border-charcoal-line pt-4">
        <span className="tag text-paper/40">Ruling</span>
        {verified ? (
          <span className="display border-2 border-blue-soft px-3 py-1 text-sm text-blue-soft">
            Verified
          </span>
        ) : (
          <span className="display border-2 border-paper/25 px-3 py-1 text-sm text-paper/40">
            Rejected
          </span>
        )}
      </div>
    </div>
  );
}

export default function Witness() {
  const root = useRef<HTMLElement>(null);
  useReveals(root);

  useEffect(() => {
    const mm = gsap.matchMedia(root);
    mm.add(MOTION_OK, () => {
      gsap.to(".report-a", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.8 },
      });
      gsap.to(".report-b", {
        yPercent: 8,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.8 },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="witness" className="bg-charcoal text-paper">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-36">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="tag text-blue-soft" data-reveal>
              The witness
            </p>
            <h2
              className="display mt-4 text-[clamp(2.4rem,5.5vw,4.5rem)]"
              data-reveal
            >
              It can&rsquo;t be charmed.
            </h2>
            <p
              className="mt-7 max-w-sm leading-relaxed text-paper/70"
              data-reveal
            >
              The witness is an AI that looks at exactly one thing: your proof
              photo. It doesn&rsquo;t know you had a long day. It doesn&rsquo;t
              care that you were &ldquo;basically studying.&rdquo; It rules on
              what it sees — and only verified minutes count.
            </p>
            <p
              className="display mt-10 max-w-md text-xl leading-snug text-paper md:text-2xl"
              data-reveal
            >
              It doesn&rsquo;t know your excuses.
              <br />
              <span className="text-blue-soft">
                It knows what a desk looks like.
              </span>
            </p>
            <p className="tag mt-10 text-paper/40" data-reveal>
              Judged, then discarded — photos are never stored
            </p>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start">
              <div className="report-a sm:mt-14 sm:-rotate-1" data-reveal>
                <Report
                  verified
                  time="11:42 PM"
                  detected="Detected: desk · notes · laptop · pen"
                />
              </div>
              <div className="report-b sm:rotate-1" data-reveal>
                <Report
                  verified={false}
                  time="1:17 AM"
                  detected="Detected: ceiling · pillow · darkness"
                  reason="that's a bed, not a study setup"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

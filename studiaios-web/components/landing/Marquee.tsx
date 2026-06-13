"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, MOTION_OK } from "@/lib/gsap";

const WORDS = ["Lock in", "Prove it", "Get verified", "Climb"];

function Track() {
  return (
    <div className="marquee-track" aria-hidden="true">
      {WORDS.map((w, i) => (
        <span key={i} className="flex items-baseline">
          <span
            className={`display px-6 text-[clamp(2.6rem,6vw,4.5rem)] leading-none ${
              i % 2 === 1 ? "text-stroke" : ""
            }`}
          >
            {w}
          </span>
          <span className="font-mono text-xl text-accent">
            {String(i + 1).padStart(2, "0")}
          </span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia(root);
    mm.add(MOTION_OK, () => {
      const tween = gsap.to(".marquee-track", {
        xPercent: -100,
        ease: "none",
        duration: 26,
        repeat: -1,
      });

      // velocity-reactive: scrolling fast skews the type and speeds the belt
      const proxy = { skew: 0 };
      const clampSkew = gsap.utils.clamp(-8, 8);
      const st = ScrollTrigger.create({
        onUpdate: (self) => {
          const v = self.getVelocity() / 240;
          const skew = clampSkew(v);
          if (Math.abs(skew) > Math.abs(proxy.skew)) {
            proxy.skew = skew;
            gsap.to(proxy, {
              skew: 0,
              duration: 0.7,
              ease: "power3",
              overwrite: true,
              onUpdate: () => {
                gsap.set(".marquee-track", { skewX: proxy.skew });
                tween.timeScale(1 + Math.abs(proxy.skew) / 5);
              },
            });
          }
        },
      });
      return () => st.kill();
    });
    return () => mm.revert();
  }, []);

  return (
    <div
      ref={root}
      className="marquee border-y border-rule py-7"
      role="presentation"
    >
      <Track />
      <Track />
      <Track />
    </div>
  );
}

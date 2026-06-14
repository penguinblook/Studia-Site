"use client";

import { useEffect, useRef } from "react";
import { gsap, MOTION_OK } from "@/lib/gsap";
import AppStoreButton from "../AppStoreButton";

export default function FinalCta() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia(root);
    mm.add(MOTION_OK, () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top 70%" },
        defaults: { ease: "power4.out" },
      });
      tl.from(".cta-line", { yPercent: 112, duration: 1.1, stagger: 0.1 })
        .from(".cta-actions", { y: 26, autoAlpha: 0, duration: 0.8 }, 0.55);
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="bg-blue text-paper">
      <div className="mx-auto max-w-7xl px-5 py-28 text-center sm:px-8 md:py-40">
        <h2 className="display text-[clamp(3rem,9vw,7.5rem)]">
          <span className="mask">
            <span className="cta-line block">Lock in</span>
          </span>
          <span className="mask">
            <span className="cta-line block">tonight.</span>
          </span>
        </h2>
        <div className="cta-actions">
          <div className="mt-10 flex justify-center">
            <AppStoreButton variant="paper" />
          </div>
          <p className="tag mt-8 text-paper/60">
            improve your studying today
          </p>
        </div>
      </div>
    </section>
  );
}

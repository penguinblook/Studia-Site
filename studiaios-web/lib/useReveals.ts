"use client";

import { useEffect, type RefObject } from "react";
import { gsap, MOTION_OK } from "./gsap";

/**
 * Animates every [data-reveal] inside `root` when it scrolls into view.
 * Elements stay fully visible without JS or under reduced motion.
 */
export function useReveals(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const mm = gsap.matchMedia(root);
    mm.add(MOTION_OK, () => {
      const els = gsap.utils.toArray<HTMLElement>("[data-reveal]", root.current);
      for (const el of els) {
        gsap.from(el, {
          y: 28,
          autoAlpha: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: parseFloat(el.dataset.reveal || "0"),
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      }
    });
    return () => mm.revert();
  }, [root]);
}

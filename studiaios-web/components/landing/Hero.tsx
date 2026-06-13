"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, MOTION_OK } from "@/lib/gsap";
import AppStoreButton from "../AppStoreButton";
import { PhoneFrame, ActiveScreen } from "./screens";

/**
 * The opening act: the page loads as Studia's blue lock screen at full
 * viewport — timer ticking. Scrolling "ends the session": the lock screen
 * zooms back into the phone while the paper page reveals around it.
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const zoomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia(root);
    mm.add(MOTION_OK, () => {
      const stage = root.current?.querySelector<HTMLElement>(".hero-stage");
      const zoom = zoomRef.current;
      const screen = root.current?.querySelector<HTMLElement>(
        ".hero-slot .phone-screen"
      );
      if (!stage || !zoom || !screen) return;

      const BASE_W = 264;
      const BASE_H = 572;

      // center the zoom layer on the phone-screen slot
      const place = () => {
        const sr = stage.getBoundingClientRect();
        const pr = screen.getBoundingClientRect();
        gsap.set(zoom, {
          display: "block",
          left: pr.left - sr.left + pr.width / 2 - BASE_W / 2,
          top: pr.top - sr.top + pr.height / 2 - BASE_H / 2,
        });
      };
      const from = () => {
        const sr = stage.getBoundingClientRect();
        const pr = screen.getBoundingClientRect();
        return {
          x: sr.left + sr.width / 2 - (pr.left + pr.width / 2),
          y: sr.top + sr.height / 2 - (pr.top + pr.height / 2),
          scale: Math.max(sr.width / BASE_W, sr.height / BASE_H) * 1.02,
        };
      };

      place();
      ScrollTrigger.addEventListener("refreshInit", place);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          end: "+=170%",
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
        defaults: { ease: "none" },
      });

      tl.fromTo(
        zoom,
        {
          x: () => from().x,
          y: () => from().y,
          scale: () => from().scale,
          borderRadius: 0,
        },
        {
          x: 0,
          y: 0,
          scale: () => {
            const pr = screen.getBoundingClientRect();
            return pr.width / BASE_W;
          },
          borderRadius: 36,
          duration: 0.62,
          ease: "power1.inOut",
        },
        0
      )
        .to(".screen-cue", { autoAlpha: 0, duration: 0.1 }, 0.05)
        .fromTo(
          ".hero-frame",
          { autoAlpha: 0, scale: 0.94 },
          { autoAlpha: 1, scale: 1, duration: 0.22, ease: "power2.out" },
          0.42
        )
        .fromTo(
          ".hero-kicker",
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.12 },
          0.34
        )
        .fromTo(
          ".hero-line",
          { yPercent: 112 },
          { yPercent: 0, stagger: 0.07, duration: 0.2, ease: "power3.out" },
          0.4
        )
        .fromTo(
          ".hero-sub",
          { autoAlpha: 0, y: 22 },
          { autoAlpha: 1, y: 0, duration: 0.14 },
          0.62
        )
        .fromTo(
          ".hero-cta",
          { autoAlpha: 0, y: 22 },
          { autoAlpha: 1, y: 0, duration: 0.14 },
          0.7
        );

      return () => {
        ScrollTrigger.removeEventListener("refreshInit", place);
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="relative">
      <div className="hero-stage relative h-svh overflow-hidden">
        <div className="mx-auto grid h-full max-w-7xl grid-rows-[auto_1fr] items-center gap-4 px-5 pb-4 pt-4 sm:px-8 md:grid-cols-12 md:grid-rows-1 md:gap-10">
          <div className="md:col-span-7">
            <p className="hero-kicker tag flex items-center gap-3 text-fg-muted">
              <span className="inline-block h-2 w-2 bg-accent" aria-hidden="true" />
              Strava for studying
            </p>

            <h1 className="display mt-5 text-[clamp(2.9rem,8.5vw,7.5rem)]">
              <span className="mask">
                <span className="hero-line block">Lock in.</span>
              </span>
              <span className="mask">
                <span className="hero-line block">Prove it.</span>
              </span>
              <span className="mask">
                <span className="hero-line block text-accent">Climb.</span>
              </span>
            </h1>

            <p className="hero-sub mt-6 max-w-md text-base leading-relaxed text-fg-soft sm:text-lg">
              Studia shields your phone while you study, an AI witness rules on
              your proof photo, and your school leaderboard watches you rise.
            </p>

            <div className="hero-cta mt-8 flex flex-wrap items-center gap-5">
              <AppStoreButton />
              <span className="tag text-fg-muted">
                Free — leaderboards never paywalled
              </span>
            </div>
          </div>

          <div className="hero-slot flex items-center justify-center md:col-span-5 md:justify-end">
            <div className="hero-frame origin-center scale-[0.68] sm:scale-[0.8] md:scale-100">
              <PhoneFrame label="Studia lock screen: blue, with a white progress ring and countdown timer">
                <ActiveScreen />
              </PhoneFrame>
            </div>
          </div>
        </div>

        {/* the full-bleed lock screen that zooms back into the phone */}
        <div
          ref={zoomRef}
          className="absolute z-30 hidden h-[572px] w-[264px] overflow-hidden will-change-transform"
          aria-hidden="true"
        >
          <ActiveScreen cue />
        </div>
      </div>
    </section>
  );
}

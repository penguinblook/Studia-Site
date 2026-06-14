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
      const notch = root.current?.querySelector<HTMLElement>(
        ".hero-slot .phone-notch"
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
        // force3D:false — a scrubbed timeline holds elements on their last
        // transform; the default translate3d/matrix3d keeps text on a GPU layer
        // and renders it blurry after scrolling back up. 2D transforms snap to
        // the pixel grid and stay crisp.
        defaults: { ease: "none", force3D: false },
      });

      // The ring sits ~60px above the screen's vertical center in the normal
      // lock-screen layout. At load we nudge the full-bleed intro down by that
      // (×scale) so the countdown reads dead-center; the tween still ends at
      // y:0 so it lands exactly on the phone — no mid-scroll misalignment.
      const RING_RISE = 60;

      tl.fromTo(
        zoom,
        {
          x: () => from().x,
          y: () => from().y + RING_RISE * from().scale,
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
        // the ring is absent at load — it fades in as the session "ends"
        .fromTo(
          ".hero-ring",
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.18, ease: "power2.out" },
          0.06
        )
        // fade the phone in WITHOUT touching its scale — scaling it here both
        // clobbers the responsive Tailwind size and makes the zoom (measured
        // against this slot) land too small, leaving a gap + clipped notch.
        .fromTo(
          ".hero-frame",
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.22, ease: "power2.out" },
          0.42
        )
        // once landed, cross-fade the intro layer out so the real phone (the
        // normal lock screen, identical to step 01) is what's left on screen
        .to(zoom, { autoAlpha: 0, duration: 0.12 }, 0.62)
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

      // The phone's notch is hidden behind the full-bleed intro the whole time;
      // fade it in only once the intro has cross-faded away, so it appears on
      // the already-landed phone instead of being clipped mid-zoom. Scoped to
      // the hero phone so other phones on the page keep their notch.
      if (notch) {
        gsap.set(notch, { autoAlpha: 0 });
        tl.to(notch, { autoAlpha: 1, duration: 0.1 }, 0.72);
      }

      return () => {
        ScrollTrigger.removeEventListener("refreshInit", place);
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="relative">
      <div className="hero-stage relative h-svh overflow-hidden">
        <div className="mx-auto grid h-full max-w-7xl grid-rows-[auto_auto] content-center items-center gap-3 px-5 pb-4 pt-3 sm:gap-4 sm:px-8 md:grid-cols-12 md:grid-rows-1 md:content-stretch md:gap-10 md:pt-4">
          <div className="md:col-span-7">

            <h1 className="display mt-2 text-[clamp(2.4rem,8vw,7.5rem)] sm:mt-5">
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

            <p className="hero-sub mt-4 max-w-md text-sm leading-snug text-fg-soft sm:mt-6 sm:text-lg sm:leading-relaxed">
              Studia lets you track your study sessions whilst locking your phone. Build a habit of focused work, track where you work best, and compete against other schools in your city, country, and around the world.
            </p>

            <div className="hero-cta mt-5 flex flex-wrap items-center gap-5 sm:mt-8">
              <AppStoreButton />
            </div>
          </div>

          <div className="hero-slot flex items-center justify-center md:col-span-5 md:justify-end">
            {/* fixed-size box so the phone's scaled (transform) footprint
                reserves only its VISUAL height — otherwise the untransformed
                280×590 box overflows the mobile viewport and clips the phone. */}
            <div className="flex h-[330px] w-[168px] items-center justify-center sm:h-[472px] sm:w-[226px] md:h-auto md:w-auto">
              <div className="hero-frame origin-center scale-[0.56] sm:scale-[0.8] md:scale-100">
                <PhoneFrame label="Studia lock screen: blue, with a white progress ring and countdown timer">
                  <ActiveScreen />
                </PhoneFrame>
              </div>
            </div>
          </div>
        </div>

        {/* the full-bleed lock screen that zooms back into the phone */}
        <div
          ref={zoomRef}
          className="absolute z-30 hidden h-[572px] w-[264px] overflow-hidden will-change-transform"
          aria-hidden="true"
        >
          <ActiveScreen cue intro />
        </div>
      </div>
    </section>
  );
}

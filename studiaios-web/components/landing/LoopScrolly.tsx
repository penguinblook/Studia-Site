"use client";

import { useEffect, useRef } from "react";
import { gsap, MOTION_OK } from "@/lib/gsap";
import {
  PhoneFrame,
  ActiveScreen,
  CameraScreen,
  VerifiedScreen,
  LeaderboardScreen,
} from "./screens";

const STEPS = [
  {
    num: "01",
    tag: "01 Lock in",
    title: "Your phone locks.",
    body: "Start a session and Studia shields your distracting apps for up to two hours. Students say this helps them focus and get work done up to 80% more efficiently.",
  },
  {
    num: "02",
    tag: "02 Prove it",
    title: "Show your work.",
    body: "When the timer ends, your camera opens. You must snap a photo of you studying or working on your project. ",
  },
  {
    num: "03",
    tag: "03 Get Verified",
    title: "Earn the stamp.",
    body: "Your photo gets reviewed by our servers and deemed verified study time or not. Only verified work contributes to your school, but unverified sessions count towards your personal stats and streaks.",
  },
  {
    num: "04",
    tag: "04 Climb",
    title: "Watch your rank move.",
    body: "Every hour you spend studying with Studia contributes to your school's rank. Every hour you spend studying with Studia is progress towards your personal goals.",
  },
];

export default function LoopScrolly() {
  const root = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia(root);
    mm.add(MOTION_OK, () => {
      const el = root.current;
      if (!el) return;
      const screens = gsap.utils.toArray<HTMLElement>(".loop-screen", el);
      const captions = gsap.utils.toArray<HTMLElement>(".loop-caption", el);
      const ghosts = gsap.utils.toArray<HTMLElement>(".loop-ghost", el);
      const phone = el.querySelector(".loop-phone");
      const ghostRail = el.querySelector(".loop-ghost-rail");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el.querySelector(".loop-pin"),
          start: "top top",
          end: "+=360%",
          pin: true,
          scrub: 0.7,
          snap: {
            snapTo: "labels",
            duration: { min: 0.15, max: 0.45 },
            ease: "power1.inOut",
          },
          onUpdate: (self) => {
            const idx = Math.min(3, Math.round(self.progress * 3));
            if (progressRef.current)
              progressRef.current.textContent = `0${idx + 1}`;
          },
        },
      });

      tl.addLabel("s0", 0);
      for (let i = 1; i < STEPS.length; i++) {
        const dir = i % 2 === 0 ? 1 : -1;
        tl
          // the phone "turns in your hand" between screens
          .to(phone, { rotationY: 14 * dir, duration: 0.24, ease: "power2.in" }, i)
          .to(phone, { rotationY: 0, duration: 0.26, ease: "power2.out" }, i + 0.26)
          .to(screens[i - 1], { autoAlpha: 0, x: -40 * dir, duration: 0.4 }, i)
          .fromTo(
            screens[i],
            { autoAlpha: 0, x: 40 * dir, scale: 0.97 },
            { autoAlpha: 1, x: 0, scale: 1, duration: 0.42 },
            i + 0.1
          )
          .to(captions[i - 1], { autoAlpha: 0, y: -26, duration: 0.36 }, i)
          .fromTo(
            captions[i],
            { autoAlpha: 0, y: 26 },
            { autoAlpha: 1, y: 0, duration: 0.38 },
            i + 0.1
          )
          .to(ghosts[i - 1], { autoAlpha: 0, yPercent: -30, duration: 0.4 }, i)
          .fromTo(
            ghosts[i],
            { autoAlpha: 0, yPercent: 30 },
            { autoAlpha: 1, yPercent: 0, duration: 0.4 },
            i + 0.08
          )
          .addLabel(`s${i}`, i + 0.55);
      }
      tl.to({}, { duration: 0.45 });

      // Parallax: the giant index drifts slowly upward across the whole pinned
      // scroll, so it reads as a deeper layer behind the phone. Spans the full
      // timeline (position 0, duration = total steps), independent of the
      // per-step cross-fade running on the numerals themselves.
      if (ghostRail) {
        tl.fromTo(
          ghostRail,
          { yPercent: 9 },
          { yPercent: -9, ease: "none", duration: STEPS.length },
          0
        );
      }
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="loop" className="bg-bg-warm">
      <div className="loop-pin relative flex min-h-svh flex-col overflow-hidden px-5 py-5 sm:px-8 sm:py-7">
        <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between">
          <p className="tag text-fg-muted">The loop</p>
          <p className="font-mono text-sm text-fg-muted" aria-hidden="true">
            <span ref={progressRef} className="text-accent">
              01
            </span>{" "}
            / 04
          </p>
        </div>

        <div className="relative mx-auto grid w-full max-w-7xl flex-1 items-center gap-8 md:grid-cols-12">
          <div className="order-2 md:order-none md:col-span-5">
            <div className="stack min-h-[170px] md:min-h-[260px]">
              {STEPS.map((s) => (
                <div key={s.tag} className="loop-caption stack-item">
                  <p className="tag text-accent">{s.tag}</p>
                  <h3 className="display mt-4 text-2xl sm:text-3xl md:text-[2.6rem]">
                    {s.title}
                  </h3>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-fg-soft sm:text-base">
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative order-1 flex justify-center [perspective:1200px] md:order-none md:col-span-6 md:col-start-7">
            {/* giant step index — a bold accent-outlined numeral that rises
                above the phone and drifts on scroll (parallax, set in JS). The
                tint lives on this parent because the per-step cross-fade drives
                each numeral's own opacity to full. */}
            <div
              className="loop-ghost-rail pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-[0.4]"
              aria-hidden="true"
            >
              <div className="stack -translate-y-[20%] md:-translate-y-[24%]">
                {STEPS.map((s) => (
                  <span
                    key={s.num}
                    className="loop-ghost stack-item display block leading-[0.72] text-transparent text-[60vw] [-webkit-text-stroke:3px_var(--accent)] md:text-[42vw] lg:text-[34rem]"
                  >
                    {s.num}
                  </span>
                ))}
              </div>
            </div>

            {/* fixed-size box: collapse the phone's scaled-transform footprint
                to its visual height so it doesn't overflow mobile svh and push
                the captions off the bottom of the screen. */}
            <div className="relative z-10 flex h-[392px] w-[186px] items-center justify-center sm:h-[502px] sm:w-[238px] md:h-auto md:w-auto">
              <div className="loop-phone origin-center scale-[0.66] sm:scale-[0.85] md:scale-100">
                <PhoneFrame label="The Studia loop on a phone: lock screen, proof camera, verified recap, leaderboard">
                <div className="stack h-full">
                  <div className="loop-screen stack-item h-full">
                    <ActiveScreen ticking={false} />
                  </div>
                  <div className="loop-screen stack-item h-full">
                    <CameraScreen />
                  </div>
                  <div className="loop-screen stack-item h-full">
                    <VerifiedScreen />
                  </div>
                  <div className="loop-screen stack-item h-full">
                    <LeaderboardScreen />
                  </div>
                </div>
                </PhoneFrame>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

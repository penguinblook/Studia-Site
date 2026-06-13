/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from "react";
import SessionTimer from "../SessionTimer";

/* ---------------------------------------------------------------------------
   Pixel-faithful web ports of real Studia screens, scaled from the app source
   (app/session/active.tsx, verify.tsx, components/recapCard.tsx, wordmark.tsx).
   App screen ≈ 390pt wide → phone screen here is 264px, so dimensions are
   scaled by ~0.68 and rounded.
--------------------------------------------------------------------------- */

/** components/wordmark.tsx — "Studia" + square accent at the baseline. */
export function Wordmark({
  size = 22,
  color = "#faf9f5",
  className = "",
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-end ${className}`}
      style={{ gap: size * 0.06 }}
    >
      <span
        className="display"
        style={{
          fontSize: size,
          color,
          letterSpacing: -size * 0.04,
          lineHeight: 0.95,
          textTransform: "none",
        }}
      >
        Studia
      </span>
      <span
        aria-hidden="true"
        style={{
          width: size * 0.16,
          height: size * 0.16,
          backgroundColor: color,
          borderRadius: size * 0.04,
          marginBottom: size * 0.06,
        }}
      />
    </span>
  );
}

function CloseCircle() {
  return (
    <span className="flex h-[27px] w-[27px] items-center justify-center rounded-full bg-white/[0.14] text-[15px] leading-none text-paper">
      ×
    </span>
  );
}

export function PhoneFrame({
  children,
  className = "",
  label = "Studia app shown on an iPhone",
}: {
  children: ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={`relative w-[280px] rounded-[44px] border border-charcoal-line bg-charcoal p-2 shadow-[0_32px_90px_-28px_rgba(26,31,43,0.55)] ${className}`}
      role="img"
      aria-label={label}
    >
      <div className="phone-screen relative h-[572px] w-[264px] overflow-hidden rounded-[36px] bg-charcoal">
        <div className="pointer-events-none absolute left-1/2 top-2 z-20 h-[20px] w-[78px] -translate-x-1/2 rounded-full bg-black/85" />
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------ app/session/active.tsx */
/** Blue lock screen: logo, 260pt ring (→176px), Archivo Black timer,
 *  WORKING ON block, outlined End session button. */
export function ActiveScreen({
  ticking = true,
  cue = false,
}: {
  ticking?: boolean;
  /** replaces the End-session label with the scroll cue (hero only) */
  cue?: boolean;
}) {
  const SIZE = 176;
  const STROKE = 5;
  const R = (SIZE - STROKE) / 2;
  const C = 2 * Math.PI * R;
  return (
    <div className="flex h-full w-full flex-col items-center bg-blue px-4 pb-4 pt-8">
      <div className="flex h-[30px] w-full items-center justify-end">
        <CloseCircle />
      </div>

      <img
        src="/logo-white.png"
        alt=""
        width={57}
        height={57}
        className="mb-[19px] object-contain"
      />

      <div className="relative" style={{ width: SIZE, height: SIZE }}>
        <svg width={SIZE} height={SIZE} className="-rotate-90">
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={R}
            fill="none"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth={STROKE}
          />
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={R}
            fill="none"
            stroke="#faf9f5"
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={`${C} ${C}`}
            strokeDashoffset={C * 0.28}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          {ticking ? (
            <SessionTimer className="display text-[40px] tabular-nums leading-none tracking-[-0.03em] text-paper" />
          ) : (
            <span className="display text-[40px] tabular-nums leading-none tracking-[-0.03em] text-paper">
              1:42:07
            </span>
          )}
        </div>
      </div>

      <div className="mt-[27px] flex flex-col items-center px-2">
        <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/60">
          Working on
        </span>
        <span className="display mt-[7px] text-center text-[16px] normal-case leading-[1.25] tracking-[-0.02em] text-paper">
          AP Calc — integrals
        </span>
      </div>

      <div className="flex-1" />

      <span className="relative flex w-full items-center justify-center rounded-[10px] border-[1.5px] border-white/35 py-[11px]">
        <span className="display text-[10px] normal-case tracking-[-0.01em] text-paper">
          End session
        </span>
        {cue && (
          <span className="screen-cue absolute inset-0 flex items-center justify-center rounded-[10px] bg-blue font-mono text-[10px] uppercase tracking-[0.18em] text-paper">
            Scroll to end session ↓
          </span>
        )}
      </span>
    </div>
  );
}

/* ------------------------------------------------ app/session/verify.tsx (camera) */
export function CameraScreen() {
  return (
    <div className="flex h-full w-full flex-col bg-blue pb-4 pt-8">
      <div className="flex h-[30px] items-center justify-between px-[10px]">
        <CloseCircle />
        <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/[0.82]">
          Show your work
        </span>
        <span className="flex h-[19px] min-w-[27px] items-center justify-center rounded-full bg-white/[0.14] px-[7px] font-mono text-[8px] text-paper">
          1/3
        </span>
      </div>

      {/* camWrap: flex-1, mx-20→14, rounded 22→15, black */}
      <div className="relative mx-[14px] mt-[5px] flex-1 overflow-hidden rounded-[15px] bg-black">
        {/* abstract live preview: desk, notebook, laptop */}
        <div className="absolute bottom-0 left-0 right-0 h-[64px] bg-paper-warm/20" />
        <div className="absolute bottom-[64px] left-6 h-[38px] w-[92px] -rotate-3 bg-paper/30" />
        <div className="absolute bottom-[64px] right-7 h-[56px] w-[82px] bg-blue-soft/45" />
        <div className="absolute bottom-[59px] right-4 h-[5px] w-[96px] bg-blue-soft/60" />
        <div className="absolute bottom-[76px] left-[112px] h-[4px] w-[46px] rotate-12 bg-paper/45" />
        <div className="scanline absolute inset-x-0 top-0 h-px bg-paper/70" />
        {/* sending overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-[7px] bg-black/45">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-paper/30 border-t-paper" />
          <span className="display text-[10px] normal-case text-paper">
            Checking…
          </span>
        </div>
      </div>

      <p className="mt-[11px] text-center text-[9px] font-medium text-white/[0.82]">
        Point at your books, notes, or screen.
      </p>

      <div className="flex items-center justify-center py-[15px]">
        <span className="flex h-[50px] w-[50px] items-center justify-center rounded-full border-[3px] border-paper">
          <span className="h-[38px] w-[38px] rounded-full bg-paper" />
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------ components/recapCard.tsx */
function CheckIcon({ size = 10 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#faf9f5" />
      <path
        d="M7 12.5l3.2 3.2L17 9"
        fill="none"
        stroke="#2f8f5b"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FlameIcon({ size = 10, color = "#faf9f5" }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path
        d="M12 2c.7 3.4-1.2 5-2.8 6.7C7.5 10.5 6 12.3 6 15a6 6 0 0 0 12 0c0-2.2-1-3.9-2.2-5.4-.5 1-1.2 1.8-2.1 2.2.5-2.9-.3-7-1.7-9.8z"
        fill={color}
      />
    </svg>
  );
}

/** 320×400 shareable recap card — classic (blue) and light (paper) variants.
 *  Scaled with a multiplier so it can sit inside the phone (×0.68) or in-page. */
export function RecapCard({
  variant = "classic",
  scale = 1,
  className = "",
}: {
  variant?: "classic" | "light";
  scale?: number;
  className?: string;
}) {
  const s = (n: number) => n * scale;
  const classic = variant === "classic";
  const text = classic ? "#faf9f5" : "#1a1f2b";
  const soft = classic ? "rgba(255,255,255,0.82)" : "#3a414f";
  const muted = classic ? "rgba(255,255,255,0.62)" : "#8a909c";
  const line = classic ? "rgba(255,255,255,0.18)" : "#e4e2dc";
  return (
    <div
      className={`flex flex-col justify-between overflow-hidden ${
        classic ? "bg-blue" : "border border-line bg-paper"
      } ${className}`}
      style={{
        width: s(320),
        height: s(400),
        borderRadius: s(28),
        padding: s(26),
      }}
    >
      <div className="flex items-center justify-between">
        <Wordmark size={s(22)} color={classic ? "#faf9f5" : "#3a5d9c"} />
        <span
          className="font-mono uppercase"
          style={{ fontSize: s(9), letterSpacing: s(1.6), color: muted }}
        >
          Show your work
        </span>
      </div>

      <div className="flex flex-1 flex-col items-start justify-center">
        <span
          className="display normal-case"
          style={{ fontSize: s(66), lineHeight: 1.04, letterSpacing: s(-3), color: text }}
        >
          1h 42m
        </span>
        <span style={{ fontSize: s(16), marginTop: s(-2), color: soft }}>
          studying
        </span>
        <span
          className="display normal-case"
          style={{
            fontSize: s(22),
            lineHeight: `${s(27)}px`,
            letterSpacing: s(-0.5),
            marginTop: s(18),
            color: text,
          }}
        >
          AP Calc — integrals
        </span>
        <span
          className="flex items-center rounded-full bg-[#2f8f5b]/95"
          style={{
            gap: s(6),
            paddingInline: s(11),
            paddingBlock: s(6),
            marginTop: s(16),
          }}
        >
          <CheckIcon size={s(15)} />
          <span
            className="display normal-case text-paper"
            style={{ fontSize: s(11), letterSpacing: s(0.4) }}
          >
            VERIFIED STUDY
          </span>
        </span>
      </div>

      <div
        className="flex items-center border-t"
        style={{ gap: s(14), paddingTop: s(16), borderColor: line }}
      >
        <span className="flex items-center" style={{ gap: s(5) }}>
          <FlameIcon size={s(15)} color={text} />
          <span className="display normal-case" style={{ fontSize: s(12), color: text }}>
            23 days
          </span>
        </span>
        <span
          className="font-mono uppercase"
          style={{ fontSize: s(10), letterSpacing: s(1), color: muted }}
        >
          Thu, Jun 11
        </span>
        <span
          className="display flex-1 truncate text-right normal-case"
          style={{ fontSize: s(12), color: text }}
        >
          Westfield High
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------ verify.tsx (verified result) */
export function VerifiedScreen() {
  return (
    <div className="flex h-full w-full flex-col items-center bg-blue px-4 pb-5 pt-8">
      <div className="flex h-[30px] w-full items-center justify-start">
        <CloseCircle />
      </div>

      <h3 className="display mt-1 text-[16px] normal-case tracking-[-0.02em] text-paper">
        Session verified
      </h3>
      <p className="mt-[4px] text-[9px] font-medium text-white/[0.82]">
        Nice! This one counts as verified study time.
      </p>

      <div className="mt-4">
        <RecapCard scale={0.68} />
      </div>

      {/* carousel dots */}
      <div className="mt-3 flex items-center gap-[4px]">
        <span className="h-[5px] w-[12px] rounded-full bg-paper" />
        <span className="h-[5px] w-[5px] rounded-full bg-white/[0.18]" />
        <span className="h-[5px] w-[5px] rounded-full bg-white/[0.18]" />
      </div>

      <div className="flex-1" />

      <div className="flex w-full items-start justify-center gap-[18px]">
        {["Save", "Copy", "More"].map((l) => (
          <span key={l} className="flex flex-col items-center gap-[4px]">
            <span className="h-[30px] w-[30px] rounded-full bg-white/[0.14]" />
            <span className="display text-[8px] normal-case text-paper">{l}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------ app/leaderboard (paper) */
const ROWS = [
  { rank: 9, name: "m.okafor", h: "20.7h" },
  { rank: 10, name: "studywithlena", h: "19.9h" },
  { rank: 11, name: "you", h: "19.2h", you: true },
  { rank: 12, name: "dru.kim", h: "18.4h" },
  { rank: 13, name: "quietgrind", h: "17.1h" },
];

export function LeaderboardScreen() {
  return (
    <div className="flex h-full w-full flex-col bg-paper px-4 pb-4 pt-9 text-ink">
      <span className="tag self-start rounded-full border border-line px-[8px] py-[4px] !text-[7px] text-muted">
        Rankings
      </span>
      <h3 className="display mt-[8px] text-[19px] normal-case tracking-[-0.02em]">
        School leaderboard
      </h3>

      <div className="mt-[10px] flex gap-[5px]">
        {["School", "City", "National"].map((g, i) => (
          <span
            key={g}
            className={`rounded-full px-[10px] py-[5px] font-mono text-[8px] uppercase tracking-[0.08em] ${
              i === 0 ? "bg-ink text-paper" : "border border-line text-muted"
            }`}
          >
            {g}
          </span>
        ))}
      </div>

      <ul className="mt-[12px] flex-1">
        {ROWS.map((r) => (
          <li
            key={r.rank}
            className={`flex items-center gap-[9px] border-b border-line py-[9px] last:border-b-0 ${
              r.you ? "-mx-2 rounded-[10px] border-b-0 bg-blue px-2" : ""
            }`}
          >
            <span
              className={`w-[18px] font-mono text-[10px] tabular-nums ${
                r.you ? "text-white/[0.62]" : "text-muted"
              }`}
            >
              {r.rank}
            </span>
            <span
              className={`h-[20px] w-[20px] rounded-full ${
                r.you ? "bg-white/20" : "bg-paper-warm"
              }`}
            />
            <span
              className={`display flex-1 truncate text-[11px] normal-case ${
                r.you ? "text-paper" : "text-ink"
              }`}
            >
              {r.name}
              {r.you && (
                <span className="ml-[6px] font-mono text-[8px] text-white/[0.82]">
                  ↑3
                </span>
              )}
            </span>
            <span
              className={`font-mono text-[10px] tabular-nums ${
                r.you ? "text-white/[0.82]" : "text-ink-soft"
              }`}
            >
              {r.h}
            </span>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between rounded-[12px] border border-line bg-paper-warm px-[12px] py-[9px]">
        <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted">
          Your school — city
        </span>
        <span className="display text-[12px] normal-case text-blue">
          #3 of 41
        </span>
      </div>
    </div>
  );
}

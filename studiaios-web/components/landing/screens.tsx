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
        <div className="phone-notch pointer-events-none absolute left-1/2 top-2 z-20 h-[20px] w-[78px] -translate-x-1/2 rounded-full bg-black/85" />
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
  intro = false,
}: {
  ticking?: boolean;
  /** replaces the End-session label with the scroll cue (hero only) */
  cue?: boolean;
  /** hero intro variant: tags the ring with `.hero-ring` so the hero can fade
   *  it in on scroll. Layout stays identical to the phone so the full-bleed
   *  intro and the landed phone line up at every scroll position. */
  intro?: boolean;
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
        <svg
          width={SIZE}
          height={SIZE}
          className={`-rotate-90 ${intro ? "hero-ring" : ""}`}
        >
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
            <SessionTimer className="display text-[43px] tabular-nums leading-none tracking-[-0.047em] text-paper" />
          ) : (
            <span className="display text-[43px] tabular-nums leading-none tracking-[-0.047em] text-paper">
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
          style={{ fontSize: s(52), lineHeight: 1.04, letterSpacing: s(-3), color: text }}
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
          THU, JUN 11
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
function DownloadIcon({ size = 15 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" aria-hidden="true">
      <path d="M12 4v10m0 0l-4-4m4 4l4-4M5 18.5h14" stroke="#faf9f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CopyIcon({ size = 15 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" aria-hidden="true">
      <rect x="9" y="9" width="11" height="11" rx="2.5" stroke="#faf9f5" strokeWidth="2" />
      <path d="M5 15V6a2 2 0 0 1 2-2h8" stroke="#faf9f5" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function EllipsisIcon({ size = 15 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="#faf9f5" aria-hidden="true">
      <circle cx="5" cy="12" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="19" cy="12" r="2" />
    </svg>
  );
}

export function VerifiedScreen() {
  const actions: { label: string; icon: ReactNode }[] = [
    { label: "Save", icon: <DownloadIcon /> },
    { label: "Copy", icon: <CopyIcon /> },
    { label: "More", icon: <EllipsisIcon /> },
  ];
  return (
    <div className="flex h-full w-full flex-col items-center bg-blue px-4 pb-5 pt-8">
      {/* doneHeader — close sits top-right (justify-end) */}
      <div className="flex h-[30px] w-full items-center justify-end">
        <CloseCircle />
      </div>

      <h3 className="display text-[16px] normal-case tracking-[-0.02em] text-paper">
        Session verified
      </h3>
      <p className="mt-[7px] text-[9px] font-medium text-white/[0.82]">
        Nice! This one counts as verified study time.
      </p>

      <div className="mt-3">
        <RecapCard scale={0.68} />
      </div>

      {/* carousel dots */}
      <div className="mt-[10px] flex items-center gap-[5px]">
        <span className="h-[5px] w-[12px] rounded-full bg-paper" />
        <span className="h-[5px] w-[5px] rounded-full bg-white/[0.18]" />
        <span className="h-[5px] w-[5px] rounded-full bg-white/[0.18]" />
      </div>
      <span className="mt-[3px] font-mono text-[7px] uppercase tracking-[0.14em] text-white/[0.62]">
        Classic
      </span>

      <div className="flex-1" />

      <div className="flex w-full items-start justify-center gap-[11px]">
        {actions.map((a) => (
          <span key={a.label} className="flex w-[42px] flex-col items-center gap-[5px]">
            <span className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-white/[0.18] bg-white/10">
              {a.icon}
            </span>
            <span className="display text-[8px] normal-case text-paper">{a.label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------ app/leaderboard/index.tsx
   School leaderboard — blueDeep hero (RANKINGS badge, title, geo tabs) over a
   paper sheet (metric toggle, scope chips, top-3 podium, list rows). Scaled
   from the app's 390pt layout (×0.68). */
function ChevronLeft({ size = 12, color = "#faf9f5" }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" aria-hidden="true">
      <path d="M15 5l-7 7 7 7" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TrophyIcon({ size = 9, color = "#faf9f5" }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill={color} aria-hidden="true">
      <path d="M7 4h10v3a5 5 0 0 1-10 0V4zM5 5h2v1.8A3 3 0 0 1 5 5zm12 0h2a3 3 0 0 1-2 1.8V5zM9.5 13.5h5L14 17h1.5a1 1 0 0 1 0 2h-7a1 1 0 0 1 0-2H10l-.5-3.5z" />
    </svg>
  );
}

function ClockIcon({ size = 9, color = "#faf9f5" }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke={color} strokeWidth="2" />
      <path d="M12 7.5V12l3 2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PeopleIcon({ size = 9, color = "#faf9f5" }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" aria-hidden="true">
      <circle cx="9" cy="8" r="3" stroke={color} strokeWidth="2" />
      <path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M16 6.2A2.6 2.6 0 0 1 16 11M17 13.4c2.3.3 4 2.2 4 4.6" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

type Crest = { rank: number; name: string; crest: string; value: string; you?: boolean };

const PODIUM: { left: Crest; top: Crest; right: Crest } = {
  left: { rank: 2, name: "Lincoln Prep", crest: "LINC", value: "128h" },
  top: { rank: 1, name: "Westfield High", crest: "WEST", value: "142h" },
  right: { rank: 3, name: "Riverside", crest: "RIVE", value: "119h" },
};

const SCHOOL_ROWS: (Crest & { meta: string })[] = [
  { rank: 4, name: "Eastgate High", crest: "EAST", value: "104h", meta: "Chicago · 212 studiers" },
  { rank: 5, name: "St. Mary's Academy", crest: "STMA", value: "98h", meta: "Boston · 188 studiers" },
  { rank: 6, name: "Northside High", crest: "NORT", value: "92h", meta: "Austin · 170 studiers", you: true },
];

function PodiumCard({ data, top, minHeight }: { data: Crest; top?: boolean; minHeight: number }) {
  return (
    <div
      className={`relative flex flex-1 flex-col items-center justify-end gap-[4px] rounded-[9px] px-[5px] pb-[8px] pt-[16px] ${
        top ? "bg-blue-deep" : "bg-paper-warm"
      }`}
      style={{ minHeight }}
    >
      <span
        className={`absolute top-[5px] font-mono text-[7px] tracking-[0.12em] ${
          top ? "text-white/[0.62]" : "text-muted"
        }`}
      >
        #{data.rank}
      </span>
      <span
        className={`flex h-[28px] w-[28px] items-center justify-center rounded-[7px] border ${
          top ? "border-white/[0.36] bg-white/[0.16]" : "border-ink bg-paper"
        }`}
      >
        <span className={`display text-[8px] normal-case tracking-[0.02em] ${top ? "text-paper" : "text-ink"}`}>
          {data.crest}
        </span>
      </span>
      <span
        className={`display text-center text-[8px] normal-case leading-[1.1] tracking-[-0.02em] ${
          top ? "text-paper" : "text-ink"
        }`}
      >
        {data.name}
      </span>
      <span className={`display text-[12px] normal-case tracking-[-0.04em] ${top ? "text-paper" : "text-ink"}`}>
        {data.value}
      </span>
    </div>
  );
}

export function LeaderboardScreen() {
  return (
    <div className="flex h-full w-full flex-col bg-blue-deep">
      {/* hero */}
      <div className="px-[14px] pb-[13px] pt-9">
        <div className="mt-1 flex items-center justify-between">
          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/[0.18] bg-white/10">
            <ChevronLeft />
          </span>
          <span className="flex items-center gap-[4px] rounded-full bg-white/10 px-[7px] py-[4px]">
            <TrophyIcon />
            <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-paper">
              Rankings
            </span>
          </span>
          <span className="w-6" />
        </div>

        <h3 className="display mt-[13px] text-[18px] normal-case tracking-[-0.03em] text-paper">
          School leaderboard
        </h3>
        <p className="mt-[4px] font-mono text-[8px] uppercase tracking-[0.11em] text-white/[0.62]">
          Hours studied · Everywhere
        </p>

        <div className="mt-[12px] flex gap-[2px] rounded-[8px] bg-white/10 p-[3px]">
          {["City", "Country", "Global"].map((g, i) => (
            <span
              key={g}
              className={`flex-1 rounded-[6px] py-[6px] text-center font-mono text-[8px] uppercase tracking-[0.08em] ${
                i === 2 ? "bg-paper text-ink" : "text-white/[0.82]"
              }`}
            >
              {g}
            </span>
          ))}
        </div>
      </div>

      {/* paper sheet */}
      <div className="flex flex-1 flex-col rounded-t-[15px] bg-paper px-[14px] pt-[11px]">
        {/* metric toggle */}
        <div className="flex gap-[2px] rounded-[8px] bg-paper-warm p-[3px]">
          <span className="flex flex-1 items-center justify-center gap-[4px] rounded-[6px] bg-ink py-[7px]">
            <ClockIcon color="#faf9f5" />
            <span className="display text-[9px] normal-case tracking-[-0.01em] text-paper">Hours</span>
          </span>
          <span className="flex flex-1 items-center justify-center gap-[4px] rounded-[6px] py-[7px]">
            <PeopleIcon color="#3a414f" />
            <span className="display text-[9px] normal-case tracking-[-0.01em] text-ink-soft">Studiers</span>
          </span>
        </div>

        {/* scope chips */}
        <div className="mt-[12px] flex gap-[4px]">
          {["This week", "Month", "All time"].map((s, i) => (
            <span
              key={s}
              className={`display rounded-full border px-[8px] py-[4px] text-[7px] normal-case tracking-[-0.01em] ${
                i === 0 ? "border-ink bg-ink text-paper" : "border-line text-ink-soft"
              }`}
            >
              {s}
            </span>
          ))}
        </div>

        {/* podium */}
        <div className="mt-[14px] flex items-end gap-[5px]">
          <PodiumCard data={PODIUM.left} minHeight={73} />
          <PodiumCard data={PODIUM.top} top minHeight={87} />
          <PodiumCard data={PODIUM.right} minHeight={62} />
        </div>

        {/* list rows */}
        <div className="mt-[10px] flex flex-col gap-[4px]">
          {SCHOOL_ROWS.map((r) => (
            <div
              key={r.rank}
              className={`flex items-center gap-[8px] rounded-[8px] p-[8px] ${
                r.you ? "bg-blue-deep" : "bg-paper-warm"
              }`}
            >
              <span
                className={`w-[15px] text-center font-mono text-[8px] tabular-nums ${
                  r.you ? "text-white/[0.62]" : "text-muted"
                }`}
              >
                {r.rank}
              </span>
              <span
                className={`flex h-[26px] w-[26px] items-center justify-center rounded-[6px] border ${
                  r.you ? "border-white/[0.36] bg-white/[0.16]" : "border-ink bg-paper"
                }`}
              >
                <span className={`display text-[8px] normal-case ${r.you ? "text-paper" : "text-ink"}`}>
                  {r.crest}
                </span>
              </span>
              <span className="min-w-0 flex-1">
                <span
                  className={`display block truncate text-[9px] normal-case tracking-[-0.02em] ${
                    r.you ? "text-paper" : "text-ink"
                  }`}
                >
                  {r.name}
                </span>
                <span
                  className={`mt-[2px] block truncate font-mono text-[6px] tracking-[0.08em] ${
                    r.you ? "text-white/[0.62]" : "text-muted"
                  }`}
                >
                  {r.meta}
                </span>
              </span>
              <span
                className={`display text-[10px] normal-case tracking-[-0.04em] ${
                  r.you ? "text-paper" : "text-ink"
                }`}
              >
                {r.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

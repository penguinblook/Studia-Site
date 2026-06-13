# studiaios.com

Marketing site for **Studia** — Strava for studying. Next.js (App Router) + TypeScript + Tailwind CSS v4, built for Vercel.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build check
```

Requires Node 18.18+ (Node 20+ recommended).

## Structure

```
app/
  page.tsx             home — composed from components/landing/*
  privacy/ terms/ support/ delete-account/
  layout.tsx           fonts (next/font: Archivo, Archivo Black, Geist Mono), global metadata
  globals.css          brand tokens (mirrors the app's constants/theme.ts), grain, motion
  opengraph-image.tsx  generated OG/Twitter card
  icon.svg             favicon (ascent mark)
  sitemap.ts robots.ts
components/
  landing/             GSAP-choreographed sections:
    Hero               masked headline reveal, self-drawing ascent line, parallax phone
    LoopScrolly        pinned scrollytelling — the phone plays all four app screens
    screens            faithful replicas of real app screens (blue ring lock screen,
                       SHOW YOUR WORK camera, verified ruling, rank card)
    Witness/Climb/Record/PlusSection/FinalCta/Marquee/AltitudeRail
  Nav, Footer, LegalShell, mocks
lib/
  site.ts              site constants + placeholders (single place to edit)
  gsap.ts useReveals.ts  GSAP + ScrollTrigger setup, shared reveal hook
```

Brand tokens live in `app/globals.css` (`@theme`) and mirror the app's `constants/theme.ts` exactly — including the app's warm-charcoal dark palette, applied automatically via `prefers-color-scheme` through semantic tokens (`bg`, `fg`, `rule`, `accent`, …). Brand-blue surfaces never invert, matching the app.

Motion is GSAP (`gsap` + ScrollTrigger). All animation is gated behind `prefers-reduced-motion: no-preference` via `gsap.matchMedia`; reduced-motion users get a fully readable static layout (scrollytelling stacks flatten to normal flow).

## Placeholders to fill before launch

All in `lib/site.ts` (legal pages read from it), plus one in the terms page:

| Placeholder | Where | What |
| --- | --- | --- |
| `[CONTACT_EMAIL]` | `lib/site.ts` | support/legal contact email |
| `[COMPANY/LEGAL ENTITY]` | `lib/site.ts` | legal entity name |
| `[EFFECTIVE_DATE]` | `lib/site.ts` | effective date for privacy + terms |
| `[JURISDICTION]` | `app/terms/page.tsx` | governing law |
| `APP_STORE_URL` | `lib/site.ts` | real App Store link once live |

## Deploy to Vercel

1. Push this folder to its own Git repo (e.g. `studiaios-web`).
2. In Vercel: **Add New → Project**, import the repo. Framework auto-detects as Next.js; no config needed.
3. Deploy.

### Point studiaios.com at Vercel

1. Vercel project → **Settings → Domains** → add `studiaios.com` (and `www.studiaios.com`, redirecting www → apex).
2. At your DNS provider, either:
   - **Apex:** `A` record `@` → `76.76.21.21`, and `CNAME` `www` → `cname.vercel-dns.com`, or
   - use Vercel's nameservers and let it manage DNS.
3. Wait for DNS to propagate; Vercel provisions TLS automatically.

## Notes

- Legal pages reflect actual app data practices (verified against the app source): Supabase (auth/email), PostHog (analytics), RevenueCat/Apple (purchases), opt-in location (study map, ~500m-coarsened heatmap), microphone (sound levels only — audio never recorded or stored), Screen Time/FamilyControls (on-device), and proof photos that are judged then discarded — never stored.
- Phone "screenshots" are in-page replicas of the real screens (`app/session/active.tsx`, `verify.tsx`) using the actual palette, fonts, and copy.
- Motion respects `prefers-reduced-motion`; only dependency beyond Next/React is `gsap`.

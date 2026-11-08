# PROJECT_STATUS.md — Seven Summit Rinjani

## Project Information

- Project: Seven Summit Rinjani
- Type: Frontend-only promotional website
- Main coding agent: OpenAI Codex CLI
- Main instructions: AGENTS.md
- Primary language: Indonesian
- Current phase: Phase 3B — Hero video integration
- Project status: Hero MP4 integration completed; poster and destination media pending

## Technology Stack

- React 19.3.1
- Vite 8.3.6
- TypeScript 7.0.2
- Tailwind CSS 4.3.5 (Vite plugin)
- React Router 8.5.1
- Zustand where necessary
- React Hook Form
- Zod
- Lucide React
- Motion for React or Framer Motion
- Rive React runtime

- @vitejs/plugin-react 6.2.1
- @types/react 19.3.0
- @types/react-dom 19.3.0

Future dependencies such as React Hook Form, Zod, Lucide, Motion, Zustand, and
Rive will only be added in the implementation phase that uses them.

## Phase Checklist

- [x] Phase 1 — Project audit and architecture
- [x] Phase 2 — Dependencies, routing, and design system
- [ ] Phase 3 — Landing page
- [ ] Phase 4 — Dummy login
- [ ] Phase 5 — Mascot architecture and fallback
- [ ] Phase 6 — Destination gallery
- [ ] Phase 7 — Destination detail and video
- [ ] Phase 8 — Rive animation integration
- [ ] Phase 9 — Mascot dialogue and audio
- [ ] Phase 10 — Booking form
- [ ] Phase 11 — Simulated checkout
- [ ] Phase 12 — Payment success
- [ ] Phase 13 — Responsive and accessibility audit
- [ ] Phase 14 — Final testing and documentation

## Important Decisions

- Landing page is public.
- Login is optional for browsing.
- Booking is a frontend simulation.
- Payment is a frontend simulation.
- Rive is the intended mascot animation format.
- MP3 is the intended mascot voice format.
- PNG/WebP is the mascot fallback format.
- Missing assets must have documented placeholders.
- Destination facts must be verified before publication.
- No backend or real payment gateway.
- Tailwind CSS v4 uses the official `@tailwindcss/vite` plugin and CSS `@theme`
  tokens; no legacy Tailwind configuration file is needed.
- The router is created once outside the React tree with `createBrowserRouter`.
- Routes not yet implemented show an explicit preparation state, while unknown
  paths show a dedicated 404 page.
- Primary design reference: Visit Indonesia (https://www.indonesia.travel/us/en).
  Its destination-discovery approach is inspiration only; Seven Summit Rinjani
  retains independent branding, content, and assets.
- The landing hero is planned as a team-supplied cinematic Rinjani MP4 with a
  WebP poster fallback. No hero media has been implemented or supplied.
- The gallery must follow Rinjani introduction and tourism-experience content;
  it must not appear immediately after the hero.
- Phase 3A uses labelled interface placeholders only. It does not present a
  fabricated image, video, destination name, or factual destination content as
  authentic Rinjani material.

## Reference Design

- Primary: https://www.indonesia.travel/us/en
- Archived, superseded local reference: docs/references/landing_reference.jpeg

## Available Assets

List actual supplied assets here.

Available asset:

- `public/assets/videos/hero/rinjani-hero.mp4` — supplied team hero video.

No final hero poster, destination imagery, destination video, mascot animation,
mascot image, or mascot voice has been confirmed yet.

The canonical asset guide is `docs/ASSETS_GUIDE.md`.

## Current Implementation

Phase 2 provides a working React/Vite/TypeScript application foundation:

- Global Tailwind v4 design tokens for the approved brand palette.
- A responsive, accessible application shell with a skip link and visible focus
  states.
- Required URL structure for public, demo, dynamic, and unknown routes.
- Explicit placeholder pages only; landing page content has not been built.
- Centralized expected asset paths, with comments requiring components to use
  fallbacks when final files are unavailable.
- Phase 3A adds the landing-page visual structure: transparent landing navbar,
  nearly full-viewport hero, interactive destination selector, introductory
  sections, placeholder gallery, FAQ, and footer.
- Hero media attempts the configured MP4, then the configured poster, and
  finally a clearly labelled CSS placeholder if neither file is available.
- The supplied `rinjani-hero.mp4` is now served as the default hero background.
  Reduced-motion users do not render autoplay video; they receive the poster or
  the labelled fallback when the poster is absent.

## Known Issues

- Final media assets are not supplied; all future media components need a
  non-broken fallback.
- The approved WebP hero poster is still required for the non-video and failed
  video fallback state.
- No verified data exists yet for the seven destinations; factual content must
  remain placeholder content until credible sources are provided or verified.
- The selector uses temporary labels `Destinasi 01` through `Destinasi 07`.
  These are UI placeholders, not official destination names.

## Pending Tasks

1. Receive and verify the approved WebP hero poster and verified destination
   media.
2. Replace only the relevant labelled placeholders after each asset and its
   destination mapping has been verified.
3. Phase 3C: perform responsive, performance, and accessibility testing.
4. Keep destination facts as clearly labelled placeholders until verified.

## Handoff Instructions

Before continuing:
1. Read AGENTS.md.
2. Read this file.
3. Inspect actual project files.
4. Check git status.
5. Verify the last completed phase.
6. Verify unfinished work and test results.
7. Continue from the first incomplete phase.

Do not rely solely on prior conversation history.

## Latest Work Log

- Initial project specification prepared.
- Phase 1 completed: project audit found a documentation-only workspace with no
  prior frontend implementation or package manifest.
- Phase 2 completed: React/Vite/TypeScript/Tailwind foundation and React Router
  route structure created.
- Tests completed: `npm.cmd run build` passed; `npm.cmd run lint` (TypeScript
  check) passed; `git diff --check` passed.
- Dependencies added: react, react-dom, react-router, vite, typescript,
  @vitejs/plugin-react, tailwindcss, @tailwindcss/vite, @types/react, and
  @types/react-dom.
- Files created: `package.json`, `package-lock.json`, `index.html`, Vite and
  TypeScript configuration, `src/main.tsx`, `src/router.tsx`, global styles,
  the application shell, placeholder route pages, and asset configuration.
- Design decision updated without Phase 3 implementation: Visit Indonesia is
  the primary visual reference; the archived Roamly image is superseded. Hero
  media is now specified as team-supplied MP4 plus a WebP poster fallback, and
  landing-page content order places Rinjani introduction and experience before
  the gallery.
- Phase 3A completed: created the landing-page structure and interactions with
  no new dependencies. Added hero MP4/poster fallback handling, an interactive
  seven-item placeholder selector, carousel controls, responsive navigation,
  and labelled placeholder sections in the approved order.
- Phase 3A files changed: `src/pages/LandingPage.tsx`,
  `src/components/layout/AppShell.tsx`, `src/config/assets.ts`, and
  `src/styles/index.css`. Files added: `src/components/landing/HeroMedia.tsx`,
  `src/components/landing/DestinationSelector.tsx`,
  `src/data/landingDestinations.ts`, and `src/types/landing.ts`.
- Phase 3A checks passed: `npm.cmd run build`, `npm.cmd run lint`, and
  `git diff --check`.
- Hero MP4 integration completed: `HeroMedia` now suppresses autoplay when
  `prefers-reduced-motion` is enabled, while retaining MP4-to-poster-to-labelled
  fallback behavior. No dependency was added and no landing-page section was
  changed.
- Hero video checks passed: production build and TypeScript check passed; Vite
  preview served `/assets/videos/hero/rinjani-hero.mp4` with HTTP 200,
  `video/mp4`, and the expected 56,271,253-byte content length.

## Last Handoff

- Completed work: Phase 3B hero MP4 integration.
- Next action: wait for an approved WebP hero poster or direction to continue
  with another verified asset integration.

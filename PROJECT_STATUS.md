# PROJECT_STATUS.md — Seven Summit Rinjani

## Project Information

- Project: Seven Summit Rinjani
- Type: Frontend-only promotional website
- Main coding agent: OpenAI Codex CLI
- Main instructions: AGENTS.md
- Primary language: Indonesian
- Current phase: Phase 5 — Mascot architecture and fallback
- Project status: Dummy login and hero MP4/poster integration complete; destination media and mascot assets pending

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
- [x] Phase 4 — Dummy login
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
- `public/assets/images/hero/gunung.webp` — supplied team hero poster for
  reduced-motion and failed-video fallback.

No destination imagery, destination video, mascot animation, mascot image, or
mascot voice has been confirmed yet.

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
  Reduced-motion users do not render autoplay video; they receive
  `gunung.webp`, then the labelled fallback only if the poster is unavailable.
- The hero now uses a centered `max-w-7xl` container, with its placeholder
  destination selector restored at the bottom. The landing navigation has a
  subtle translucent layer to remain readable above supplied video footage.

## Known Issues

- Final media assets are not supplied; all future media components need a
  non-broken fallback.
- No verified data exists yet for the seven destinations; factual content must
  remain placeholder content until credible sources are provided or verified.
- The selector uses temporary labels `Destinasi 01` through `Destinasi 07`.
  These are UI placeholders, not official destination names.

## Pending Tasks

1. Receive and verify destination media.
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
- Phase 3A hero composition finalization: restored the interactive placeholder
  destination selector, repaired the hero's centered responsive layout, and
  replaced the invalid `mt-70` class with valid responsive spacing. No assets
  or dependencies were added.
- Phase 3A finalization checks passed: `npm.cmd run lint`,
  `npm.cmd run build`, and `git diff --check`.
- Phase 3C responsive adjustment: preserved the project owner's video-focused
  hero layout with the destination selector hidden. The hero's horizontal
  margins now use `w-auto` to avoid width-plus-margin overflow, and the
  intentionally large desktop text spacing scales down at smaller breakpoints.
- Phase 3C checks passed: `npm.cmd run lint` and `npm.cmd run build`.
- Phase 4 started: the supplied login and sign-up session references guide the
  form's composition only. Their media is not reused as destination imagery.
- Phase 4 completed: implemented the responsive `/login` form with visible
  demo credentials, required-field validation, invalid-credential feedback,
  public-browsing return link, and a minimal `sessionStorage` demo session
  that never stores the password. No dependency was added and no sign-up route
  was created because it is outside the specified routes.
- Phase 4 files changed: `src/pages/LoginPage.tsx`,
  `src/router.tsx`, and `PROJECT_STATUS.md`.
- Phase 4 checks passed: `npm.cmd run lint`, `npm.cmd run build`,
  `GET /login` through the Vite development server (HTTP 200), and
  `git diff --check`.
- Phase 3C hero poster integration: verified the supplied
  `public/assets/images/hero/gunung.webp` and updated the centralized asset
  path. It now provides the existing HeroMedia fallback for reduced-motion and
  failed-video states.
- Phase 3C poster checks passed: `npm.cmd run lint`, `npm.cmd run build`,
  and the production build contains `gunung.webp` at the expected path and
  87,432-byte size.

- Background music integration: added a global, keyboard-accessible ambient
  music control using the supplied MP3 in public/audio/bg_music. It loops only
  after an explicit visitor action because browsers can block unmuted autoplay.
  The hero video remains muted.
- Background music checks passed: npm.cmd run lint, npm.cmd run build, and the
  production build contains the expected 6,650,775-byte MP3.
- Background music update: the app now attempts unmuted autoplay at 35% volume.
  The player is a medium, accessible music-disc control at the bottom right and
  remains the fallback when the browser blocks autoplay.

## Last Handoff

- Completed work: Phase 4 dummy login and Phase 3C hero poster integration.
- Next action: begin Phase 5 by preparing the modular mascot architecture and
  static fallback while awaiting a valid Rive animation, fallback image, and
  optional audio files.

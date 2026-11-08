# PROJECT_STATUS.md — Seven Summit Rinjani

## Project Information

- Project: Seven Summit Rinjani
- Type: Frontend-only promotional website
- Main coding agent: OpenAI Codex CLI
- Main instructions: AGENTS.md
- Primary language: Indonesian
- Current phase: Phase 3 — Landing page
- Project status: Phase 2 completed

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

## Reference Design

- docs/references/landing-reference.jpg

## Available Assets

List actual supplied assets here.

No final hero image, destination imagery, destination video, mascot animation,
mascot image, or mascot voice has been confirmed yet.

The asset document supplied is named `docs/ASSETS_GUIDE.md`; other documents
refer to `docs/ASSET_GUIDE.md`. This naming mismatch remains documented until
the project owner chooses the canonical filename.

## Current Implementation

Phase 2 provides a working React/Vite/TypeScript application foundation:

- Global Tailwind v4 design tokens for the approved brand palette.
- A responsive, accessible application shell with a skip link and visible focus
  states.
- Required URL structure for public, demo, dynamic, and unknown routes.
- Explicit placeholder pages only; landing page content has not been built.
- Centralized expected asset paths, with comments requiring components to use
  fallbacks when final files are unavailable.

## Known Issues

- Final media assets are not supplied; all future media components need a
  non-broken fallback.
- The supplied landing-page reference image is not present at
  `docs/references/landing-reference.jpg`.
- No verified data exists yet for the seven destinations; factual content must
  remain placeholder content until credible sources are provided or verified.

## Pending Tasks

1. Implement Phase 3: the public landing page using the approved layout
   direction and honest visual fallbacks.
2. Obtain or confirm the landing-page reference image and final hero asset when
   available.
3. Keep destination facts as clearly labelled placeholders until verified.

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

## Last Handoff

- Completed phase: Phase 2 — Dependencies, routing, and design system.
- Next action: Phase 3 — Implement the public landing page after confirming
  the visual direction and any supplied assets.

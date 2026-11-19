# PROJECT_STATUS.md — Seven Summit Rinjani

## Project Information

- Project: Seven Summit Rinjani
- Type: Frontend-only promotional website
- Main coding agent: OpenAI Codex CLI
- Main instructions: AGENTS.md
- Primary language: Indonesian
- Current phase: Phase 12 — Payment success demo
- Project status: `/` menampilkan Landing Page video, `/home` menampilkan Destination Carousel, dan `/explore` menampilkan fitur Explore. Login sukses menuju `/home`. Pemeriksaan visual lintas perangkat masih perlu dilakukan.

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

Added for the booking form: React Hook Form 7.92.0, Zod 4.6.7, and
@hookform/resolvers 7.0.7. Other planned dependencies will only be added in
the implementation phase that uses them.

## Phase Checklist

- [x] Phase 1 — Project audit and architecture
- [x] Phase 2 — Dependencies, routing, and design system
- [x] Phase 3 — Landing page
- [x] Phase 4 — Dummy login
- [ ] Phase 5 — Mascot architecture and fallback
- [x] Phase 6 — Homepage destination carousel
- [ ] Phase 7 — Destination detail and video
- [ ] Phase 8 — Rive animation integration
- [ ] Phase 9 — Mascot dialogue and audio
- [x] Phase 10 — Booking form
- [x] Phase 11 — Simulated checkout
- [x] Phase 12 — Payment success
- [ ] Phase 13 — Responsive and accessibility audit
- [ ] Phase 14 — Final testing and documentation

## Important Decisions

### Arsitektur halaman terbaru

- `/` adalah Landing Page dengan video hero, logo, dan tombol Login saja. Tidak
  ada CTA Explore, musik latar, atau Destination Carousel di halaman ini.
- `/home` adalah Homepage dan hanya merender DestinationCarousel. Desain,
  tujuh destinasi, animasi, transisi, dan kontrol carousel dipertahankan.
- Setiap kartu yang tampil pada carousel menuju `/explore` tanpa meneruskan
  identitas destinasi atau navigation state.
- `/explore` menggunakan kembali bagian Explore dari `HomepageSections` dalam
  kondisi normal, menampilkan semua destinasi tanpa selected state.
- `HomepageSections` dan section lama tetap ada di kode; komposisi lama tidak
  dirender pada Landing Page, Homepage, atau halaman Explore.
- Login sukses menuju `/home`; desain Login dan Signup tidak diubah.

### Keputusan Homepage sebelumnya (riwayat)

- Klarifikasi pemilik terbaru: tampilan DestinationCarousel yang sudah ada
  adalah tampilan Homepage/Landing Page yang digunakan. Jangan gunakan atau
  tampilkan HeroSection baru di Homepage; Carousel menjadi bagian pembuka
  setelah Navbar.
- Urutan implementasi saat ini: Navbar, DestinationCarousel, Transition
  Section, Explore / Jelajah, About, Contact, Footer.
- HeroSection component yang sempat dibuat pada implementasi awal tidak
  dipasang di Homepage. Jangan mengubah desain Carousel untuk menambahkan Hero
  terpisah.
- Tidak ada section Reviews/Ulasan.
- Desain Login dan Signup yang sudah disepakati dipertahankan.
- Desain Carousel yang sudah ada dipertahankan selama penambahan section.
- Explore wajib mengikuti referensi khusus
  `docs/references/explore-reference.png`; jangan mengganti konsep atau
  membuat alternatif desain. Referensi adalah file baru yang belum dilacak di
  Git dan tidak boleh diubah atau dihapus.
- Transition, About, Contact, dan Footer boleh dikembangkan secara kreatif,
  dengan konsistensi identitas visual Seven Summit Rinjani dan responsivitas.
- Rencana navbar Homepage: sticky; transparan/glass di atas Carousel, lalu solid atau
  semi-transparan ketika halaman di-scroll.
- Transition mengantar pengunjung dari Carousel ke Explore dengan pengantar
  singkat dan tombol Mulai Jelajah yang menggulir ke section Explore.
- Explore merupakan section Homepage, bukan halaman terpisah. Jangan
  mengembalikan Gallery terpisah atau menambahkan Reviews.

### Riwayat keputusan desain yang diperbarui

- Catatan terdahulu yang menyebut Homepage hanya satu carousel layar penuh
  berdasarkan `docs/references/homepage-final-reference.png` merekam keputusan
  dan implementasi sebelumnya. Catatan itu bukan lagi spesifikasi akhir
  Homepage; carousel tetap dipertahankan sebagai satu bagian dari susunan baru.
- Rencana terdahulu yang menempatkan pengenalan Rinjani dan pengalaman
  pariwisata sebelum galeri telah digantikan oleh urutan Homepage terbaru di
  atas. Riwayat pengerjaan sebelumnya tetap tercatat di Latest Work Log.

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
- Historical implementation decision: the Homepage opened directly into one
  full-screen destination carousel based on
  `docs/references/homepage-final-reference.png`. This has been superseded by
  the latest multi-section Homepage structure documented above; preserve the
  carousel design and implement the remaining sections around it.
- `docs/references/homepage-motion-reference.mp4` guides the carousel movement.
  The `/destinations` route remains unchanged and is handled separately.
- Carousel imagery uses supplied project assets. Destination descriptions are
  provided by the project owner and are not represented as independently
  verified facts.

## Reference Design

- Primary: https://www.indonesia.travel/us/en
- Archived, superseded local reference: docs/references/landing_reference.jpeg

## Available Assets

List actual supplied assets here.

Available asset:

- `public/assets/videos/hero/rinjani-hero.mp4` — supplied team hero video.
- `public/assets/images/hero/gunung.webp` — supplied team hero poster for
  reduced-motion and failed-video fallback.
- `public/assets/images/logo/Logo-7-Summits.png` and
  `public/assets/images/logo/Logo-7-Summits-BLACK.png` — Navbar wordmarks for
  glass and solid states respectively.
- Seven landscape backgrounds under `public/assets/images/destinations/` and
  seven portrait cards under `public/assets/images/carausel/` — supplied
  Homepage carousel media. Inspect and reuse these existing assets and the
  centralized destination data for Explore where appropriate; do not recreate
  them without a specific technical reason.
- `docs/references/explore-reference.png` — owner-supplied Explore section
  design reference; currently untracked in Git. Preserve the file unchanged.

Seven destination video files are present under
`public/assets/videos/destinations/`. No mascot animation, image, or voice has
been confirmed yet.

The canonical asset guide is `docs/ASSETS_GUIDE.md`.

## Current Implementation

### Kondisi aktual halaman

- `/` renders `HeroSection` with the existing `HeroMedia`; the Landing Page
  navbar is supplied by `AppShell` and contains only the supplied logo and a
  Login link. BackgroundMusic is not mounted on `/`.
- `/home` renders `HomePage`, which contains only the existing full-screen
  `DestinationCarousel`. Its supplied destination cards link to `/explore`.
- `/explore` renders the Explore section from `HomepageSections` only. It uses
  the existing destination array and portrait assets. Search, difficulty,
  duration, altitude, trail-status, and quick-recommendation controls filter
  the cards; trail status is randomly assigned for the demo and is labelled as
  non-operational. Cards show short difficulty and duration summaries.
- Login and Signup pages exist and share the previously agreed authentication
  design. Retain them unchanged during Homepage work.

Phase 2 provides a working React/Vite/TypeScript application foundation:

- Global Tailwind v4 design tokens for the approved brand palette.
- A responsive, accessible application shell with a skip link and visible focus
  states.
- Required URL structure for public, demo, dynamic, and unknown routes.
- The gallery route remains a placeholder. Destination detail, booking,
  checkout, and payment-success routes render their current demo flows.
- Centralized expected asset paths, with comments requiring components to use
  fallbacks when final files are unavailable.
- `/` uses the separate hero-media Landing Page; `/home` contains the existing
  full-screen image-backed carousel; `/explore` contains the existing Explore
  controls and cards.
- Login and Signup share a reference-based authentication layout. Login uses
  the existing demo credentials and session storage; Signup performs client
  side validation only and does not persist an account without a backend.
- Hero media attempts the configured MP4, then the configured poster, and
  finally a clearly labelled CSS placeholder if neither file is available.
- `HeroMedia` is rendered by the active Landing Page and retains reduced-motion
  and media-failure fallback behavior.
- The carousel uses landscape backgrounds, portrait preview cards, a vertical
  selector, automatic and manual controls, transitions, responsive layout, and
  missing-image fallbacks.
- `src/data/destinations.ts` stores the seven owner-provided descriptions. The
  active carousel slide displays its name, altitude, location, and only the
  optional details supplied for that destination.
- `/destinations/:slug` renders a responsive, centered video preview with
  controls, a destination poster fallback, and the available destination
  description and facts. Its return link points to Explore; the booking CTA
  points to the existing booking placeholder route.

## Known Issues

- Most destination details are owner-provided and still require verification.
  Rinjani's minimum two-day trekking duration follows TNGR guidance; its
  difficulty badge is a demo label requested by the owner.
- Explore trail statuses are randomly generated demo values. They do not
  describe the actual current opening or closure of any route.
- The motion-reference MP4 still needs a visual comparison in a browser.
- Destination records currently contain short descriptions rather than full
  long-form descriptions, gallery images, or dedicated safety information;
  the detail page only displays available data. Booking remains a placeholder.

## Pending Tasks

1. Visually review Landing Page, `/home`, and `/explore` at desktop, tablet,
   and mobile sizes.
2. Review the carousel against `docs/references/homepage-motion-reference.mp4`
   at desktop and mobile sizes, while keeping the existing carousel design.
3. Verify Login-to-Homepage and Carousel-to-Explore navigation in a browser.
4. Keep destination facts clearly identified as owner-provided or placeholder
   content until verified; do not present unverified claims as facts.

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

- Landing Page and route separation: `/` now renders a video-only hero with the
  logo and Login action supplied by the route-specific AppShell navbar. Hero
  media uses the centralized hero video path and poster fallback; background
  music is not mounted on `/`. The existing glass navbar and background music
  remain on `/home` with the Carousel.
- Added `/home` for the existing DestinationCarousel and `/explore` for the
  existing Explore UI. Carousel cards navigate to `/explore` without passing
  destination identity. Explore is rendered without Transition, About,
  Contact, or Footer; the original `HomepageSections` component and markup
  remain in place.
- Successful demo Login now navigates to `/home`. The existing Login and
  Signup layouts and form behavior were not changed.
- Files changed: `src/pages/LandingPage.tsx`, `src/pages/HomePage.tsx`,
  `src/pages/ExplorePage.tsx`, `src/components/landing/HeroSection.tsx`,
  `src/components/landing/DestinationCarousel.tsx`,
  `src/components/landing/HomepageSections.tsx`,
  `src/components/layout/AppShell.tsx`, `src/config/assets.ts`,
  `src/pages/LoginPage.tsx`, `src/router.tsx`, and `PROJECT_STATUS.md`.
- Checks passed: `npm.cmd run lint`, `npm.cmd run build`, and
  `git diff --check`. Browser interaction and responsive visual checks remain
  pending. Production build retains the existing >500 kB chunk-size warning.

- Destination detail implementation: connected Explore card detail links to
  `/destinations/:slug`, mapped each destination to its supplied MP4 and
  landscape poster, and implemented a responsive video/detail page with
  controls, failure fallback, available factual fields, return-to-Explore, and
  booking CTA. No new dependency was added.
- Destination detail checks passed: `npm.cmd run lint`, `npm.cmd run build`,
  and `git diff --check`. Full long-form destination content and booking flow
  remain pending.
- Detail navigation polish: Explore's Lihat Detail link now has a capsule
  button style matching the adjacent action; entering a destination detail
  route resets scroll to the page top immediately. Checks passed: lint, build,
  and `git diff --check`.
- Destination preview autoplay trial: the detail-page video now requests
  muted autoplay while retaining player controls and inline playback. Carousel
  and background music behavior were not changed.
- Detail return and navbar section links now navigate to the Homepage hash and
  smooth-scroll to Explore, About, Contact, or the Carousel anchor after the
  Homepage is mounted. Reduced-motion preference disables smooth animation.

- Navbar logo update: replaced the text/initials placeholder with supplied
  logo assets. The white logo appears over the initial glass Homepage navbar;
  the black logo appears after scrolling and on solid navbar routes. Logo links
  return to the `#seven-summit` carousel anchor.
- Explore section alignment: adjusted the layout to follow
  `docs/references/explore-reference.png`, including its search field, quick
  recommendations, difficulty/duration/altitude/trail filter groups, portrait
  destination cards, labels, and two placeholder action buttons. Popularity
  and trail-status controls remain unavailable because no supporting data is
  present. The action buttons have no navigation behavior yet.

- Homepage sections implementation: added a Hero using the existing hero
  media component, an introduction ahead of the existing carousel, Transition,
  Explore, About, Contact, and Footer. Explore reuses centralized destination
  content and supplied portrait cards, with search and filters based only on
  fields available in the data. No Login, Signup, or Carousel component was
  modified. Navbar anchors now target the Homepage sections and the Homepage
  navbar becomes sticky with a scroll state.
- Homepage implementation checks passed: `npm.cmd run lint`,
  `npm.cmd run build`, and `git diff --check`. Visual responsive review remains
  pending.
- Homepage composition adjustment: removed the new Hero and introductory
  section from the active Homepage render after the owner clarified that the
  existing full-screen Carousel is the Landing Page. Transition, Explore,
  About, Contact, and Footer follow the Carousel. Login, Signup, and the
  Carousel component remain unchanged.
- Homepage responsive follow-up: destination cards now wrap altitude and
  difficulty labels rather than clipping them; card content adapts to narrow
  grid columns, and Carousel stage sizing has tablet/mobile adjustments.
  Section anchors use smooth scrolling, with reduced-motion preference
  respected. Login, Signup, and `DestinationCarousel.tsx` were not modified.
- Responsive follow-up checks passed: `npm.cmd run lint`,
  `npm.cmd run build`, and `git diff --check`. Visual device-size inspection
  remains pending.

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
- Earlier hero MP4 integration completed: `HeroMedia` suppresses autoplay when
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
- Authentication visual refresh: added shared torn-paper and mountain-photo
  layout for `/login` and `/signup`. Login retains its demo credential flow;
  Signup validates email/password confirmation locally and reports that no
  account was persisted. Added route navigation between both pages.
- Authentication follow-up: added dummy Google, Facebook, and TikTok options
  to both forms; each displays an unconnected demo notice. Both forms now
  require an explicit policy-consent checkbox. Added autofill styling so
  browser-saved usernames, email addresses, and passwords retain the orange
  field background and white text.
- Authentication form polish: moved field validation messages into normal form
  flow to prevent overlap, replaced placeholder glyphs with matching inline
  user/email/lock icons, and added accessible show/hide controls for passwords
  on both Login and Signup.
- Phase 4 files changed: `src/pages/LoginPage.tsx`,
  `src/router.tsx`, and `PROJECT_STATUS.md`.
- Phase 4 checks passed: `npm.cmd run lint`, `npm.cmd run build`,
  `GET /login` through the Vite development server (HTTP 200), and
  `git diff --check`.
- Earlier Phase 3C hero poster integration: verified the supplied
  `public/assets/images/hero/gunung.webp` and updated the centralized asset
  path. It now provides the existing HeroMedia fallback for reduced-motion and
  failed-video states.
- Phase 3C poster checks passed: `npm.cmd run lint`, `npm.cmd run build`,
  and the production build contains `gunung.webp` at the expected path and
  87,432-byte size.

- Homepage carousel completion: integrated seven supplied landscape and
  portrait image pairs into the Homepage introduction. Manual navigation,
  autoplay, pause/resume, background fade, card slide, staggered text, keyboard,
  touch, visibility pause, reduced-motion behavior, and image fallbacks are in
  place. Replaced an invalid Tailwind spacing utility and centered the hero
  content wrapper for responsive consistency.
- Homepage carousel checks passed: `npm.cmd run lint`, `npm.cmd run build`,
  and `git diff --check`.

- Background music integration: added a global, keyboard-accessible ambient
  music control using the supplied MP3 in public/audio/bg_music. It loops only
  after an explicit visitor action because browsers can block unmuted autoplay.
  The hero video remains muted.
- Background music checks passed: npm.cmd run lint, npm.cmd run build, and the
  production build contains the expected 6,650,775-byte MP3.
- Background music update: the app now attempts unmuted autoplay at 35% volume.
  The player is a medium, accessible music-disc control at the bottom right and
  remains the fallback when the browser blocks autoplay.
- Homepage carousel implementation: replaced the standalone gallery section
  with an image-backed seven-slide carousel in the introduction. Added automatic
  and manual navigation, pause/resume, background fade, card slide, staggered
  text, keyboard arrows, touch swipe, hidden-tab pause, reduced-motion support,
  and missing-image fallbacks. No dependency was added; slide text remains
  placeholder content.
- Homepage reference alignment: replaced the separate hero and multi-section
  landing page with a single-screen carousel composition. The local final
  reference guides the navbar, full-bleed image, centered heading, left-side
  destination rail, and two preview cards. The motion reference continues to
  guide background fade, card slide, and staggered text. The carousel remains
  responsive and retains reduced-motion and manual controls.
- Owner-provided destination content is centralized in
  `src/data/destinations.ts` and connected to the Homepage carousel. Optional
  duration, difficulty, mountain type, temperature, and note fields are shown
  only when supplied. No routes, page sections, or dependencies were added.

## Last Handoff

- Explore filters and cards: enabled the Buka/Tutup checkboxes and assign a
  randomized 4/3 split when the Explore section mounts; the assignment stays
  stable during filtering and is labelled demo on the cards and filter. Added
  concise difficulty and duration badges for all seven destinations. Rinjani
  displays the owner-requested demo difficulty Extreme and a minimum two-day
  trekking-duration summary per TNGR guidance. Replaced the disabled Populer
  quick filter with Puncak tertinggi so it uses altitude data without claiming
  unverified popularity.
- Explore filter files changed: `src/components/landing/HomepageSections.tsx`,
  `src/data/destinations.ts`, `src/types/destination.ts`,
  `src/styles/index.css`, and `PROJECT_STATUS.md`.
- Explore filter checks passed: `npm.cmd run lint`, `npm.cmd run build`, and
  `git diff --check`. The production bundle remains about 523 kB and triggers
  Vite's chunk-size warning.
- Global scrollbar polish: made the page scrollbar thin with a transparent
  track and a semi-transparent glossy green/cream thumb. Firefox receives the
  native thin/color treatment; WebKit browsers receive the gradient and hover
  styling. The scrollbar remains visible and usable.
- Scrollbar files changed: `src/styles/index.css` and `PROJECT_STATUS.md`.
- Scrollbar checks passed: `npm.cmd run lint`, `npm.cmd run build`, and
  `git diff --check`. Vite still reports the existing approximately 522 kB
  JavaScript chunk-size warning.
- Payment success scroll follow-up: `/payment/success` resets scroll to the top
  on entry so its heading and summary begin in a consistent position. The
  return action now navigates to `/#seven-summit`; the existing hash-scroll
  behavior places the visitor at the top of the Landing Page carousel.
- Scroll follow-up files changed: `src/pages/PaymentSuccessPage.tsx` and
  `PROJECT_STATUS.md`.
- Scroll follow-up checks passed: `npm.cmd run lint`, `npm.cmd run build`, and
  `git diff --check`. The production bundle is about 522 kB; Vite reports its
  configured 500 kB chunk-size warning.
- Payment success page: the checkout confirmation modal now leads to
  `/payment/success`, which reads a validated summary from `sessionStorage`.
  It displays the demo reference, destination, customer/contact details, trip
  date and duration, participant names/count, guide count, payment method,
  itemized demo amount, total, confirmation time, and SIMULATED status. The
  page has one action to return to the Landing Page and no navbar/back button.
  The confirmation modal also has a direct continue action and auto-continues
  after a short delay. Selecting the return action clears the demo session.
- Payment success files changed: `src/pages/PaymentSuccessPage.tsx`,
  `src/pages/CheckoutPage.tsx`, `src/data/demoPayment.ts`, `src/router.tsx`,
  `src/components/layout/AppShell.tsx`, `src/styles/index.css`, and
  `PROJECT_STATUS.md`.
- Payment success checks passed: `npm.cmd run lint`, `npm.cmd run build`, and
  `git diff --check`. The production bundle is about 522 kB and triggers the
  Vite chunk-size warning.
- Simulated checkout implementation: `/checkout` now validates the saved
  session booking, displays destination/trip details, and lets the user select
  cash, debit, or credit without collecting payment credentials. Demo totals
  use clearly labelled illustrative rates of Rp175.000 per participant and
  Rp250.000 per guide. The Pay action shows an animated confirmation and then
  continues to `/payment/success`; no transaction is processed. Invalid or
  missing session data displays a recovery path to Explore.
- Checkout files changed: `src/pages/CheckoutPage.tsx`, `src/router.tsx`,
  `src/components/layout/AppShell.tsx`, `src/styles/index.css`, and
  `PROJECT_STATUS.md`.
- Checkout checks passed: `npm.cmd run lint`, `npm.cmd run build`, and
  `git diff --check`. The production bundle is about 514 kB and Vite reports
  its configured 500 kB chunk-size warning.
- Booking guide control follow-up: replaced the guide checkbox and numeric
  field with one dropdown containing Tanpa guide, 1 guide, 3 guide, and 5
  guide. The selected count is validated, shown in the trip summary, and stored
  with the demo booking.
- Guide dropdown files changed: `src/pages/BookingPage.tsx`,
  `src/styles/index.css`, and `PROJECT_STATUS.md`.
- Guide dropdown checks passed: `npm.cmd run lint`, `npm.cmd run build`, and
  `git diff --check`. The build retains its existing bundle-size warning.
- Booking page follow-up: added the destination portrait image above the name
  in the trip summary card. Added a required duration select based only on
  `estimatedDuration` already recorded for each destination; Sempana offers
  its documented normal-hike and 2-day/1-night camping descriptions. Rinjani
  has no duration value, so the select is disabled and clearly says the
  information is unavailable. The selected duration is validated and saved
  with the demo booking.
- Booking follow-up files changed: `src/pages/BookingPage.tsx`,
  `src/styles/index.css`, and `PROJECT_STATUS.md`.
- Booking follow-up checks passed: `npm.cmd run lint`, `npm.cmd run build`,
  and `git diff --check`. The production build still reports a bundle above
  500 kB.
- Explore card booking action now routes directly to `/booking/:slug`. The
  destination preview video now loops continuously. Destination Detail and
  Booking routes hide the global navbar and show one glossy back-to-Explore
  control at the top left. Their content has no second back button; the
  primary orange action is centered and enlarged.
- Focused-route navigation files changed: `src/components/layout/AppShell.tsx`,
  `src/pages/DestinationDetailPage.tsx`, `src/pages/BookingPage.tsx`,
  `src/styles/index.css`, and `PROJECT_STATUS.md`.
- Focused-route navigation checks passed: `npm.cmd run lint`,
  `npm.cmd run build`, and `git diff --check`.
- Completed work: Homepage opens with the existing full-screen Carousel,
  followed by Transition and the new content sections, including basic Explore
  search/filters;
  existing Carousel and Login/Signup implementations remain intact.
- Booking form demo: replaced the `/booking/:slug` placeholder with a
  responsive trip form. It validates contact details, future trip date, solo
  or group participant names, guide preference/count, and optional notes using
  React Hook Form and Zod. It stores a valid demo request in `sessionStorage`
  and navigates to `/checkout`; no real request, availability, fee, or booking
  is created. The checkout route is now implemented as a simulated flow.
- Booking form files changed: `src/pages/BookingPage.tsx`, `src/router.tsx`,
  `src/styles/index.css`, `package.json`, `package-lock.json`, and
  `PROJECT_STATUS.md`.
- Booking form dependencies added: `react-hook-form` 7.92.0, `zod` 4.6.7,
  and `@hookform/resolvers` 7.0.7.
- Booking form checks passed: `npm.cmd run lint`, `npm.cmd run build`, and
  `git diff --check`. The production build reports a JavaScript chunk slightly
  above 500 kB; code splitting can be considered if the app grows.
- Next action: visually review Landing Page, Homepage Carousel, and Explore
  at desktop, tablet, and mobile sizes, then continue remaining mascot and
  final responsive/accessibility work.

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

Anime.js 4.5.0 is used for visual transitions in the destination carousel and
booking wizard; React continues to own navigation, form state, and flow logic.

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

- `/` renders `HeroSection` with the existing `HeroMedia` and navbar.
  BackgroundMusic starts by attempting autoplay on entry; its toggle is hidden
  on `/`, and the same audio instance remains mounted across the delayed
  redirect to `/login`. If autoplay is blocked, the first pointer or keyboard
  interaction retries playback. On entry, a “Selamat Datang” overlay
  appears over the blurred Hero video and fades out. After about 3.7 seconds,
  a blurred fade transition begins; `/` redirects to `/login` at about 4.4
  seconds without a welcome overlay on Login.
- `/home` renders `HomePage`, which contains only the existing full-screen
  `DestinationCarousel`. Its supplied destination cards link to `/explore`.
  The navbar bell opens `/booking-history` and displays the saved-entry count.
- `/booking-history` lists successful demo payment summaries persisted in
  browser `localStorage`; each entry can expand to show booking and payment
  details. Records are validated and deduplicated by reference. They are local
  to the browser and are not server-backed or official reservation evidence.
  Its navbar forces the black logo variant for contrast against the cream
  background.
- `/about-us` renders the About Us page with its Explore CTA and a shared footer
  containing only the brand logo and copyright. `/contact` renders the demo
  contact form with the same footer. Homepage navbar links navigate to these
  dedicated routes; About Us and Contact are not homepage sections.
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

- Booking history is stored only in this browser's `localStorage`; it is not
  linked to an account or synchronized to a server/device.
- Background music autoplay depends on browser policy; if blocked until user
  interaction, playback retries on the first pointer or keyboard input.
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

- Booking-history navbar logo: the `/booking-history` route now displays the
  black logo variant at all times to match its light navbar background. Other
  routes retain their existing logo behavior. Checks passed: `npm.cmd run
  lint` and `git diff --check`.

- Booking history: successful confirmations from both the booking wizard and
  legacy checkout now append validated summaries to browser `localStorage`,
  deduplicated by payment reference. Added `/booking-history` with expandable
  booking/payment details and an empty state. The Homepage navbar bell links to
  the page and shows the number of saved entries; same-tab and cross-tab updates
  refresh the count. Returning from payment success clears checkout session
  data only; the history persists. UI labels the records as simulated.
- Booking-history files changed: `src/data/demoPayment.ts`,
  `src/pages/BookingHistoryPage.tsx`, `src/pages/CheckoutPage.tsx`,
  `src/pages/BookingWizardPage.tsx`, `src/components/layout/AppShell.tsx`,
  `src/router.tsx`, `src/styles/index.css`, and `PROJECT_STATUS.md`.
- Booking-history checks passed: `npm.cmd run lint`, `npm.cmd run build`, and
  `git diff --check`. Build still reports the existing JavaScript bundle-size
  warning (589.16 kB over the 500 kB threshold). Browser interaction checks
  remain pending.

- Anime.js visual transitions: the carousel background, destination copy, and
  active-card image now animate through Anime.js. All card areas retain their
  existing `/explore` links and show a visible “Lihat semua destinasi” cue.
  The booking wizard panel and active progress marker also use Anime.js;
  route logic, form values, and step flow remain React-controlled. Animations
  are skipped for `prefers-reduced-motion`, and Anime scopes are reverted when
  dependencies change or components unmount. CSS keyframe animations that
  previously targeted carousel backgrounds and copy were removed to avoid
  competing animation systems.
- Anime.js files changed: `package.json`, `package-lock.json`,
  `src/components/landing/DestinationCarousel.tsx`,
  `src/components/layout/BookingProgressHeader.tsx`,
  `src/pages/BookingWizardPage.tsx`, `src/styles/index.css`, and
  `PROJECT_STATUS.md`.
- Anime.js checks passed: `npm.cmd run lint`, `npm.cmd run build`, and
  `git diff --check`. Vite reports a 581.91 kB JavaScript chunk, above its
  configured 500 kB warning threshold; browser visual checks remain pending.

- Landing Page and route separation: `/` now renders a video-only hero with the
  logo and Login action supplied by the route-specific AppShell navbar. Hero
  media uses the centralized hero video path and poster fallback. Background
  music is attempted on `/`, without its toggle visible there, and continues
  through the redirect to Login; the music control remains on `/home` with the
  Carousel.
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

- Booking readability and payment-method details: increased wizard, invoice,
  payment-option, and payment-success typography with responsive sizes. Removed
  the notice above the payment method list. Selecting bank transfer reveals a
  visibly fake `DEMO-VA` reference; selecting QRIS reveals a labeled,
  non-scannable QR-style illustration with no payment data; selecting e-wallet
  shows a masked demo number instead of collecting the user's real wallet
  phone number. Removed the redundant side summary card from Payment Success;
  the invoice content remains the source of trip and payment details.
- Files changed: `src/pages/BookingWizardPage.tsx`,
  `src/pages/PaymentSuccessPage.tsx`, `src/styles/index.css`, and
  `PROJECT_STATUS.md`.
- Checks passed: `npm.cmd run lint`, `npm.cmd run build`, and
  `git diff --check`. Build output is 543.66 kB with Vite's chunk-size warning.
- Next action: visually review payment-method details, enlarged text, and the
  success invoice at desktop, tablet, and mobile widths.

- Booking wizard visual refinements: the progress header now spans the full
  viewport with content inset from both edges. Form panels are wider and taller
  across stages, and the side summary uses the prior image/title/description
  card style while retaining current package and demo price details. Payment
  confirmation now appears as a focused dialog over the blurred payment stage
  for 3.6 seconds before navigating to the completion page. The completion page
  shows step 5 progress and a side summary. Both success return actions now go
  to `/home` and say “Kembali ke Homepage”.
- Files changed: new `src/components/layout/BookingProgressHeader.tsx`,
  `src/pages/BookingWizardPage.tsx`, `src/pages/PaymentSuccessPage.tsx`,
  `src/styles/index.css`, and `PROJECT_STATUS.md`.
- Checks passed: `npm.cmd run lint`, `npm.cmd run build`, and
  `git diff --check`. Build output is 543.33 kB with Vite's chunk-size warning.
- Known issue: visual review at desktop and mobile sizes remains outstanding.
- Next action: inspect all wizard stages, the blurred success dialog, and the
  completion page in a browser at desktop and mobile widths.

- Booking flow redesign from `docs/references/pesan-izin-&-guide-01.jpeg` to
  `-05.jpeg`: `/booking/:slug` now uses five stages—Paket & Jadwal, Data
  Pendaki, Invoice, Pembayaran, and Selesai—with a destination/price summary.
  Participant count controls the number of optional member data forms. Invoice
  and payment choices are demo-only and do not show real bank credentials or
  process a transaction. The success animation remains and redirects to
  `/payment/success` after 3.6 seconds, with an immediate continue button.
- Files changed: new `src/pages/BookingWizardPage.tsx`,
  `src/components/layout/AppShell.tsx`, `src/data/demoPayment.ts`,
  `src/pages/CheckoutPage.tsx`, `src/pages/PaymentSuccessPage.tsx`,
  `src/router.tsx`, `src/styles/index.css`, and `PROJECT_STATUS.md`. Existing
  `BookingPage.tsx` remains in the repository but is no longer used by the
  booking route.
- Checks passed: `npm.cmd run lint`, `npm.cmd run build`, and
  `git diff --check`. Build output is 540.86 kB with Vite's chunk-size warning.
- Known limitation: package options and demo prices use only existing
  destination duration data and illustrative rates; no real availability,
  permit, or payment information is integrated.
- Next action: visually review all five booking stages at desktop and mobile
  sizes, including the participant-count form behavior and success delay.

- Homepage viewport height follow-up: `/home` shell is constrained to the
  dynamic viewport height with overflow clipped, and its main area may shrink
  to the carousel. This prevents the navbar's layout space from creating a
  page scrollbar; About Us and Contact remain naturally scrollable pages.
- Files changed: `src/components/layout/AppShell.tsx` and
  `PROJECT_STATUS.md`.
- Checks passed: `npm.cmd run lint`, `npm.cmd run build`, and
  `git diff --check`. Build output is 536.42 kB with the existing Vite
  chunk-size warning.
- Next action: visually confirm `/home` has no scrollbar at desktop and mobile
  viewport sizes.

- Page height and navbar follow-up: application shell and main content now use a
  flexible column layout so short About Us and Contact pages keep the shared
  footer at the bottom of the viewport. Their content sections fill available
  space, and both routes now use the same solid navbar appearance as Explore.
  Homepage continues to show only its full-screen Carousel.
- Files changed: `src/components/layout/AppShell.tsx`,
  `src/pages/AboutUsPage.tsx`, `src/pages/ContactPage.tsx`, and
  `PROJECT_STATUS.md`.
- Checks passed: `npm.cmd run lint`, `npm.cmd run build`, and
  `git diff --check`. Build output is 536.39 kB with the existing Vite
  chunk-size warning.
- Next action: visually review footer placement and navbar consistency at
  desktop and mobile widths.

- About Us and Contact route separation: `/home` now contains only the
  Destination Carousel. Navbar About Us and Contact links open `/about-us` and
  `/contact`; the corresponding pages retain the existing informational copy,
  Explore CTA, and demo form. Both pages share a footer with only the logo and
  copyright. These routes reset to the top on entry.
- Files changed: `src/pages/HomePage.tsx`, new
  `src/pages/AboutUsPage.tsx`, new `src/pages/ContactPage.tsx`, new
  `src/components/layout/BrandFooter.tsx`, `src/router.tsx`,
  `src/components/layout/AppShell.tsx`, and `PROJECT_STATUS.md`.
- Checks passed: `npm.cmd run lint`, `npm.cmd run build`, and
  `git diff --check`. Build output is 536.19 kB with Vite's existing chunk-size
  warning. No dependencies were added.
- Next action: visually review the dedicated pages and route navigation at
  desktop and mobile sizes.

- Homepage footer refinement: replaced the text brand link with the supplied
  light logo, limited footer navigation to About Us and Contact, and retained
  the existing copyright line.
- Files changed: `src/components/landing/HomepageSections.tsx` and
  `PROJECT_STATUS.md`.
- Checks passed: `npm.cmd run lint`, `npm.cmd run build`, and
  `git diff --check`. Build output is 531.36 kB with Vite's existing chunk-size
  warning.
- Next action: visually review the footer logo and links at desktop and mobile
  widths.

- Transition CTA behavior: the Homepage divider's “Mulai Jelajah” button now
  navigates to `/explore`, matching the About Us destination CTA.
- Files changed: `src/components/landing/HomepageSections.tsx` and
  `PROJECT_STATUS.md`.
- Checks passed: `npm.cmd run lint`, `npm.cmd run build`, and
  `git diff --check`. Build output remains 531.15 kB with Vite's chunk-size
  warning.
- Next action: visually confirm both Homepage Explore CTAs navigate to the
  Explore page at its top.

- Homepage About/Contact refinement: expanded the About Us introduction and
  added a CTA to `/explore`; restored the transition divider before About Us.
  Replaced the Contact placeholder copy with a demo form for name, email,
  telephone, and question. It uses native required/email validation and does
  not send data to a backend.
- Files changed: `src/components/landing/HomepageSections.tsx`,
  `src/styles/index.css`, and `PROJECT_STATUS.md`.
- Checks passed: `npm.cmd run lint`, `npm.cmd run build`, and
  `git diff --check`. Build output is 531.15 kB with the existing Vite chunk
  size warning.
- Next action: visually review the homepage divider and Contact form at
  desktop and mobile widths.

- Explore navbar controls and search contrast: restored the search, language,
  login, and menu controls on `/explore` while keeping its center CTA hidden.
  Improved expanded search field, placeholder, and icon contrast on the light
  navbar state shared by Homepage and Explore.
- Files changed: `src/components/layout/AppShell.tsx`,
  `src/styles/index.css`, and `PROJECT_STATUS.md`.
- Checks passed: `npm.cmd run lint`, `npm.cmd run build`, and
  `git diff --check`. Build output is 529.12 kB with the existing Vite chunk
  size warning.
- Next action: visually review navbar controls and search contrast at desktop
  and mobile widths.

- Homepage logo behavior: clicking the logo while already on `/home` now
  smoothly scrolls to the page top; reduced-motion preferences use an instant
  scroll. From other routes, the logo continues to navigate to `/home` at top.
- Files changed: `src/components/layout/AppShell.tsx` and
  `PROJECT_STATUS.md`.
- Checks passed: `npm.cmd run lint`, `npm.cmd run build`, and
  `git diff --check`. Build output is 529.15 kB with the existing Vite chunk
  size warning.
- Next action: visually confirm logo scrolling from the About Us and Contact
  sections.

- Navigation scroll follow-up: entering `/explore` from the Homepage Jelajah
  CTA and returning to `/home` with the logo now reset the viewport to the top.
  Hash links to About Us and Contact retain their section scroll behavior.
- Files changed: `src/components/layout/AppShell.tsx` and
  `PROJECT_STATUS.md`.
- Checks passed: `npm.cmd run lint`, `npm.cmd run build`, and
  `git diff --check`. Build output is 528.89 kB with the existing Vite chunk
  size warning.
- Next action: visually confirm top-of-page navigation and section links.

- Homepage CTA follow-up: Jelajah click now navigates to `/explore`; About Us
  uses smooth scrolling to its section, including after a route/hash update;
  Contact now renders on `/home` alongside About Us and the footer. Explore
  keeps its logo-only navbar behavior.
- Follow-up files changed: `src/components/layout/AppShell.tsx`,
  `src/components/landing/HomepageSections.tsx`, and `PROJECT_STATUS.md`.
- Checks passed: `npm.cmd run lint`, `npm.cmd run build`, and
  `git diff --check`. Build output remains 528.75 kB and Vite reports its
  existing 500 kB chunk-size warning.
- Next action: visually confirm homepage CTA scroll/navigation and Contact
  rendering at desktop and mobile widths.

- Homepage navbar and content follow-up: `/home` now renders About Us, Contact,
  and the existing footer after the Destination Carousel. The centered homepage
  navbar links are Jelajah (`/explore`), About Us (`/home#about`), and Contact
  (`/home#contact`). Explore hides its centered CTA and other navbar actions;
  the logo links back to `/home`.
- Files changed for this follow-up: `src/components/layout/AppShell.tsx`,
  `src/pages/HomePage.tsx`, and `PROJECT_STATUS.md`. Existing local edits in
  other files were preserved.
- Checks passed: `npm.cmd run lint`, `npm.cmd run build`, and
  `git diff --check`. The production bundle is 528.64 kB and Vite reports its
  configured 500 kB chunk-size warning. No dependency was added.
- Known issue: `/home` and `/explore` navbar layout should still receive a
  visual review at mobile and desktop sizes.
- Next action: visually review the revised homepage and Explore navbar, then
  continue the remaining responsive and accessibility audit.

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
- Landing transition refinement: the welcome greeting now appears on initial
  entry to `/`, with a 600 ms fade over the blurred background. A separate
  700 ms blurred fade begins before the automatic redirect to `/login` at about
  4.4 seconds; Login itself does not show the greeting. Reduced-motion
  preferences disable the visual transitions.
- Landing transition files changed: `src/pages/LandingPage.tsx` and
  `src/styles/index.css`.
- Landing transition checks passed: `npm.cmd run lint`, `npm.cmd run build`,
  and `git diff --check`. The production build still reports a JavaScript
  chunk above 500 kB.
- Next action: visually review Landing Page, Homepage Carousel, and Explore
  at desktop, tablet, and mobile sizes, then continue remaining mascot and
  final responsive/accessibility work.

## Latest Work Log

### Bahasa Indonesia / English toggle

- Added shared `LanguageProvider` state with `ID` and `EN`, persisted in
  `localStorage`; it sets the document language and formats dates, numbers,
  and IDR amounts using the selected locale.
- Added a central bilingual dictionary and English destination copy. Integrated
  translations in the navbar, Landing Page, carousel, About/Contact, auth
  pages, Explore filters/cards, destination details, booking progress and
  wizard, checkout, payment success, booking history, and 404 page.
- The toggle remains in the shared navbar. Focused flows that hide the navbar
  use the saved language across routes and reloads.
- Language implementation files include `src/i18n/`, `src/main.tsx`, shared
  layout/auth/landing components, `src/pages/`, and
  `src/components/layout/BookingProgressHeader.tsx`.

### Follow-up: mixed-language labels and buttons

- Corrected the navbar About and Contact CTAs to `Tentang Kami` and `Kontak`
  in Indonesian, and `About Us` and `Contact` in English.
- Connected the remaining visible CTA and button labels in authentication,
  destination exploration, booking, payment selection, invoices, checkout,
  success, and booking history to the translation dictionary.
- Localized destination descriptions, hiking durations, image alt text,
  simulated status, payment method names, date formats, and elevation units.
  Proper destination names and user-entered values remain unchanged.
- Latest checks passed: `npm.cmd run lint`, `npm.cmd run build`, and
  `git diff --check`. Vite continues to report a JavaScript bundle above
  500 kB.
- Next action: visually review both languages on desktop and mobile.

### Language toggle on Login and Signup

- Added an `ID | EN` selector to the brand row inside the form panel on Login
  and Signup. It stays within the panel and does not overlap the hero image.
- The selector uses the shared language setting and browser persistence. Login
  and Signup validation/social notices are now rendered from translation keys so
  they update immediately when the language changes.
- Changed `AuthLanguageToggle.tsx`, `LoginPage.tsx`, `SignupPage.tsx`,
  `translations.ts`, and auth-specific styles in `src/styles/index.css`.
- Checks passed: `npm.cmd run lint`, `npm.cmd run build`, and
  `git diff --check`. The production build still reports the existing bundle
  size warning above 500 kB.

### Popup kebijakan Login and Signup

- Replaced the inline policy links with an accessible dialog trigger on both
  auth forms. The dialog explains the privacy policy and terms of use in both
  Indonesian and English, matching the selected site language.
- The popup closes from its Close button, Escape key, or clicking the backdrop;
  it locks background scrolling and returns focus to the trigger when closed.
  Rendering through a portal keeps it above the clipped auth panel and hero.
- Changed `AuthPolicyDialog.tsx`, `LoginPage.tsx`, `SignupPage.tsx`,
  `translations.ts`, auth-specific styles in `src/styles/index.css`, and this
  status log.
- Checks passed: `npm.cmd run lint`, `npm.cmd run build`, and
  `git diff --check`. Vite continues to report the existing bundle-size warning
  above 500 kB.

### English locale clarification

- Confirmed the existing English copy uses U.S. spelling; no British spellings
  were found in the translation dictionary or auth screens. The English locale
  already formats dates and numbers using `en-US`.
- Set the document language to `en-US` while English is selected and made the
  auth toggle's English option identify itself as `English (United States)`.
- Checks passed: `npm.cmd run lint`, `npm.cmd run build`, and
  `git diff --check`. The build still reports the bundle-size warning above
  500 kB.

### Navbar English flag

- Updated the navbar language toggle to show the United States flag for English; Indonesian still shows the Indonesia flag.
- Checks passed: `npm.cmd run lint` and `git diff --check`.

### Booking history title alignment

- Centered the booking history page title within its max-width by centering the title element and its text.
- Checks passed: npm.cmd run lint and git diff --check.

### Destination detail videos by language

- Replaced the destination detail preview video mapping with explicit Indonesian
  and English file paths for all seven destinations. The active language now
  selects the matching video, and changing destination or language remounts the
  video element and resets its failure fallback state.
- Changed `src/config/assets.ts`, `src/types/destination.ts`,
  `src/data/destinations.ts`, `src/pages/DestinationDetailPage.tsx`, and this
  status log. Existing `.gitignore` changes were left intact.
- Checks passed: `npm.cmd run lint`, `npm.cmd run build`, and
  `git diff --check`. Vite continues to report the existing bundle-size warning
  above 500 kB. Confirmed all 14 destination video files exist and are nonempty.

### Responsive layout refinements

- Added responsive safeguards for compact and short viewports across the shared
  navbar, homepage carousel, auth forms, destination details, booking progress,
  payment summaries, history cards, and About page image.
- The booking stepper now shows only the active step label on narrow screens;
  homepage carousel content can scroll inside its viewport when space is short,
  with compact layouts for phone and tablet landscape orientations.
- Checks passed: `npm.cmd run lint`, `npm.cmd run build`, and
  `git diff --check`. Visual inspection at physical device sizes remains a
  follow-up; Vite continues to report the existing bundle-size warning above
  500 kB.

### About Us image and text layout

- Scoped the About Us page to a dedicated grid: image and copy sit in separate
  desktop columns, while tablet and mobile layouts stack them. Constrained both
  tracks and the image dimensions to prevent overlap.
- Changed `src/pages/AboutUsPage.tsx`, the scoped About Us rules in
  `src/styles/index.css`, and this status log.
- Checks passed: `npm.cmd run lint`, `npm.cmd run build`, and
  `git diff --check`. Vite continues to report the existing bundle-size warning
  above 500 kB.

### About Us overlap follow-up

- Replaced the About Us grid with a scoped flex layout: the desktop image uses a
  bounded 36% column and the text takes the remaining width; screens up to
  800px stack the image above the text. The image is contained within its own
  aspect-ratio box, and horizontal overflow is clipped on this page only.
- Checks passed: `npm.cmd run lint`, `npm.cmd run build`, and
  `git diff --check`. Vite continues to report the existing bundle-size warning
  above 500 kB.

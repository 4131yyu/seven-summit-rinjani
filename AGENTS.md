# AGENTS.md — SEVEN SUMMIT RINJANI

## 1. Project Identity

Project name: Seven Summit Rinjani

Project type: Frontend-only tourism and outdoor adventure promotional website.

Primary development agent: OpenAI Codex CLI.

Primary language: Indonesian.

The website introduces visitors to the Seven Summit Rinjani concept, presents destination information, provides an interactive mascot experience, and demonstrates a simulated booking and checkout flow.

The website must look like a professional outdoor travel brand, not a generic dashboard or generic website template.

The user is learning frontend development. Act as a senior frontend developer and technical mentor. Explain important implementation decisions and code changes in clear Indonesian.

## 2. Main Objectives

Build these features:

1. Public landing page.
2. Responsive navigation.
3. Optional dummy login.
4. Homepage experience and brand information.
5. Seven destination gallery.
6. Destination detail pages.
7. Destination-specific video previews.
8. Interactive mascot guide.
9. Contextual mascot dialogue.
10. Optional mascot audio.
11. Booking form.
12. Simulated checkout.
13. Simulated payment success.
14. Responsive and accessible user experience.

This is a frontend demonstration project.

Do not build:
- A backend.
- A production database.
- Real reservation integration.
- Real payment gateway.
- Real banking or payment credential collection.

Clearly label all simulated booking and payment features as demonstrations.

## 3. Working Rules for Codex

Before starting any task:

1. Read AGENTS.md.
2. Read PROJECT_STATUS.md.
3. Inspect the current project files.
4. Check the current Git status.
5. Understand the existing implementation before modifying it.

Do not assume the project is empty.

Do not scaffold a new application inside an existing application.

Do not overwrite existing configuration without inspecting it.

Do not delete working code without explaining why and receiving approval for destructive changes.

Use small, reviewable implementation phases.

After every completed phase:
- Explain what was changed.
- Explain why it was changed.
- Explain important code flow.
- List created and modified files.
- Run relevant checks.
- Report errors and unresolved TODOs.
- Update PROJECT_STATUS.md.

Use Indonesian for explanations.

Do not generate unnecessary code or documentation.

## 4. Technology Stack

Preferred stack:

- React
- Vite
- TypeScript
- Tailwind CSS
- React Router
- Zustand when shared state is genuinely needed
- React Hook Form
- Zod
- Lucide React
- Motion for React OR Framer Motion, choose one
- Rive React runtime for the interactive mascot

Technical rules:

- Inspect package.json before installing dependencies.
- Check the installed versions.
- Use compatible stable versions.
- Verify official documentation for packages whose APIs or setup may have changed.
- Do not mix Motion and Framer Motion without a clear reason.
- Do not install duplicate libraries for the same responsibility.
- Do not add dependencies simply because they are popular.
- Use TypeScript types and reusable components appropriately.
- Keep the implementation understandable and maintainable.

Tailwind CSS:
- Inspect the installed Tailwind version.
- Follow the correct setup for that version.
- Do not blindly copy outdated Tailwind configuration instructions.

Rive:
- Verify the official React runtime and current API before integration.
- Do not assume an API based on an outdated example.

## 5. Visual Design Direction

Use Visit Indonesia as the main visual direction (option B: adapt its overall
visual approach while retaining the Seven Summit Rinjani identity).

Primary reference:
https://www.indonesia.travel/us/en

The local `docs/references/landing_reference.jpeg` is an archived Roamly
reference from an earlier decision. It is not the primary design reference and
must not drive the Phase 3 layout.

Use the reference as inspiration, not as an exact copy. Do not reuse Visit
Indonesia branding, copy, logos, or media.

Brand identity:
Seven Summit Rinjani.

Visual characteristics:
- Premium outdoor adventure.
- Immersive destination storytelling with strong visual hierarchy.
- Clear, editorial sections that introduce place and experience before
  discovery content.
- Full-width cinematic media with readable overlays and restrained motion.
- A horizontal destination selector in the hero, inspired by Visit Indonesia's
  discovery-oriented approach.
- Spacious layouts, clean typography, and natural earthy colors.
- Seven Summit Rinjani branding, palette, language, and outdoor focus remain
  distinct from the reference.

Color palette:

- Forest Green: #173C35
- Deep Green: #244F45
- Warm Cream: #F4F0E7
- Terracotta: #C87958
- Charcoal: #202521
- White: #FFFFFF

Use the palette consistently.

Avoid:
- Generic dashboard appearance.
- Excessive gradients.
- Excessive glass effects.
- Too many decorative animations.
- Cluttered navigation.
- Tiny text.
- Inconsistent spacing.
- Unrelated stock photos presented as authentic Rinjani locations.
- Copying Visit Indonesia's brand assets, content, or exact interface.

The design must be responsive on desktop, tablet, and mobile.

## 6. Public Landing Page

Route: /

The landing page is public and must be accessible without login.

### Navbar

- Seven Summit logo on the left.
- Explore, About, and Contact navigation.
- Sign In and Explore Now actions on the right.
- Transparent or subtle glass appearance over the hero media.
- Responsive mobile navigation.

### Hero Section

- Use the cinematic Rinjani MP4 supplied by the team when it is available.
- Provide a poster-image fallback when video cannot load, playback is reduced,
  or video is unavailable.
- Headline: "Discover the Seven Summits of Rinjani".
- Short supporting description.
- Primary CTA: "Explore the Summits".
- Maintain readable text contrast.
- Video must be muted by default, use `playsInline`, and must not contain
  forced sound autoplay.
- Use a documented fallback until final hero video and poster are supplied.

### Hero Destination Selector

Create a horizontal destination selector inspired by Visit Indonesia's
destination-discovery experience.

It can show:
- Destination selection.
- A concise exploration label.
- An accessible action to continue exploring.

It is a visual exploration control, not a real search backend. Do not show
unverified difficulty information.

### Brand Highlights

Show meaningful information about the Seven Summit experience.

Do not invent:
- Statistics.
- Official certifications.
- Partnerships.
- Safety guarantees.
- Tourism claims.

### Landing Page Content Order

The landing page must not show the seven-destination gallery immediately after
the hero. Its initial order is:

1. Hero video and destination selector.
2. Introduction to Rinjani.
3. Tourism and outdoor experience section.
4. Seven-destination gallery.

### Explore Seven Summits

- Seven destination cards.
- Image.
- Name.
- Short description.
- Detail navigation.
- Smooth carousel.
- Manual carousel controls.
- Touch support on mobile.
- Accessible navigation controls.

Use centralized destination data.

### Additional Sections

Include:
- About Seven Summit.
- Adventure experience.
- FAQ.
- Footer.

Footer:
- Brand logo.
- Slogan.
- Navigation links.
- Contact placeholders.
- Social links only when actual destinations are supplied.

## 7. Routing

Use React Router.

Required routes:

- / — LandingPage
- /login — LoginPage
- /destinations — GalleryPage
- /destinations/:slug — DestinationDetailPage
- /booking/:slug — BookingPage
- /checkout — CheckoutPage
- /payment/success — PaymentSuccessPage

Requirements:
- Landing page is public.
- Gallery is public.
- Login is optional for browsing.
- Booking and checkout are demo flows.
- Handle invalid slugs.
- Handle missing booking data.
- Handle direct page refresh.
- Handle unknown routes.
- Avoid unnecessary redirects.

The /home route is not required. Do not create a duplicate homepage without a clear reason.

## 8. Dummy Authentication

Route: /login

Demo credentials:

Username: visitor

Password: rinjani123

Rules:
- Clearly label credentials as a demo account.
- Validate form input.
- Do not store plaintext passwords.
- Do not claim production-grade security.
- Do not create a fake backend.
- Use minimal demo session state.
- Allow public browsing without login.
- Login can unlock a personalized welcome interaction.

## 9. Destination Data Architecture

Store destination data in:

src/data/destinations.ts

Suggested fields:

- id
- slug
- name
- shortDescription
- description
- altitude
- location
- difficulty
- estimatedDuration
- heroImage
- thumbnailImage
- previewVideo
- videoPoster
- galleryImages
- highlights
- trekkingInformation
- safetyInformation

Define TypeScript interfaces in:

src/types/destination.ts

Critical factual accuracy rules:

- Do not invent official names of the seven destinations.
- Do not assume the meaning or official status of the Seven Summit concept.
- Do not invent altitudes.
- Do not invent coordinates.
- Do not invent trail routes.
- Do not invent difficulty levels.
- Do not invent permits or tourism regulations.
- Do not invent estimated trekking duration.
- Verify factual information from credible sources before presenting it as fact.
- If facts are not verified, use clear placeholders.
- Keep demo content separate from verified information.

## 10. Destination Detail and Video

Route:

/destinations/:slug

Each detail page should include:

1. Destination hero.
2. Video preview above the main description.
3. Video poster.
4. Destination description.
5. Highlights.
6. Trekking information.
7. Safety information.
8. Destination gallery.
9. Booking CTA.

Video rules:
- Use HTML video controls.
- Do not autoplay with sound.
- Lazy-load videos where practical.
- Do not load all seven videos simultaneously.
- Use the video associated with the selected destination.
- Handle missing video files gracefully.
- Show a documented placeholder when no video exists.
- Do not present unrelated footage as footage of a specific destination.

## 11. Interactive Mascot System

The mascot is a virtual guide for Seven Summit Rinjani.

It must not be merely a decorative image.

It should support:
- Character animation.
- Multiple expressions.
- Contextual behavior.
- Text dialogue.
- Optional audio.
- Mute and unmute.
- Replay.
- Hide and reopen.
- Responsive positioning.
- Graceful fallback.

### Primary Animation Format

Use Rive (.riv) as the primary interactive animation format.

Use a compatible official Rive React runtime.

Before implementation:
1. Verify the current official runtime package.
2. Inspect the actual Rive asset.
3. Identify the artboard.
4. Identify the State Machine.
5. Identify actual input names.
6. Identify input types.
7. Map React state to actual Rive inputs.

Do not invent State Machine names or input names.

Do not claim that a static placeholder is an interactive animation.

If the final Rive file is unavailable:
- Prepare the component architecture.
- Use a static fallback if supplied.
- Keep dialogue functional.
- Keep audio controls functional where possible.
- Document missing assets.
- Do not create fake .riv files.

### Mascot Asset Paths

- public/assets/mascot/animations/mascot-main.riv
- public/assets/mascot/animations/mascot-fallback.webp
- public/assets/mascot/images/mascot-main.png
- public/assets/mascot/audio/mascot-welcome.mp3
- public/assets/mascot/audio/mascot-gallery.mp3
- public/assets/mascot/audio/mascot-destination.mp3
- public/assets/mascot/audio/mascot-booking.mp3
- public/assets/mascot/audio/mascot-success.mp3

These are expected paths, not actual assets.

### Mascot Component Architecture

Create modular components:

- Mascot.tsx — main mascot composition.
- MascotAnimation.tsx — Rive rendering and input control.
- MascotDialogue.tsx — contextual text.
- MascotControls.tsx — mute, replay, hide/reopen.
- MascotAudio.tsx — optional voice playback.

Supporting files:

- hooks/useMascot.ts
- hooks/useAudio.ts
- data/mascotMessages.ts
- types/mascot.ts
- store/mascotStore.ts only if shared state is needed.

Keep animation, dialogue, and audio responsibilities separate.

### Conceptual Animation States

Prepare for these behaviors:

- idle
- welcome
- explore
- thinking
- happy
- success
- sad

These are conceptual behavior names, not guaranteed Rive input names.

Only map them to actual Rive inputs after inspecting the supplied animation.

### Mascot Context Mapping

Landing:
- Idle behavior.
- Optional welcome.

Login:
- Friendly greeting.

After login:
- Welcome interaction.

Gallery:
- Encourage visitors to explore.

Destination detail:
- Provide contextual destination guidance.

Booking:
- Guide visitors through the form.

Checkout:
- Explain that payment is simulated.

Payment success:
- Celebration animation.

### Dialogue System

Store dialogue centrally in:

src/data/mascotMessages.ts

Each entry should support:
- Unique ID.
- Context.
- Message text.
- Intended animation behavior.
- Optional audio path.
- Replay behavior.

Use natural, concise Indonesian.

Do not repeat the same greeting on every component render or every route update.

Do not interrupt users excessively.

### Audio System

Use MP3 for optional mascot voice.

Requirements:
- Mute/unmute.
- Replay.
- Stop previous audio before playing another.
- Prevent overlapping audio.
- Handle missing or failed files.
- Respect browser autoplay restrictions.
- Never require audio to understand the website.
- Show text dialogue even when audio is unavailable.
- Do not force audio autoplay.

### Mascot Positioning

- Use a floating position that does not obstruct important content.
- Ensure forms remain accessible.
- Ensure mobile layouts remain usable.
- Allow visitors to hide and reopen the mascot.
- Use accessible labels.
- Respect prefers-reduced-motion.

Reuse one shared mascot system across routes where practical. Avoid multiple competing mascot instances.

## 12. Asset Management

All final assets must be organized under public/assets.

Expected categories:

- images/hero/
- images/destinations/
- images/gallery/
- videos/destinations/
- videos/hero/
- mascot/animations/
- mascot/images/
- mascot/audio/

Keep paths centralized in:

src/config/assets.ts

Destination-specific paths may be stored in destination data.

Rules:
- Use descriptive filenames.
- Use clear TODO comments for missing assets.
- Do not create fake media files.
- Do not use unrelated stock images as authentic Rinjani assets.
- Use fallbacks.
- Use meaningful alt text.
- Optimize images.
- Lazy-load large media.
- Document asset requirements in `docs/ASSETS_GUIDE.md` until the project
  owner decides the canonical filename.

## 13. Booking Form

Route:

/booking/:slug

Fields:
- Full name.
- Email.
- Phone number.
- Departure date.
- Participant count.
- Guide required: yes/no.
- Additional notes.

Use:
- React Hook Form.
- Zod.

Requirements:
- Validate required fields.
- Show useful Indonesian validation messages.
- Show booking summary.
- Use clearly labelled demo pricing.
- Do not claim real availability.
- Preserve valid booking information during the demo checkout flow.

## 14. Simulated Checkout

Route:

/checkout

Show:
- Destination.
- Customer information.
- Departure date.
- Participants.
- Demo pricing.
- Simulated payment method.
- Confirm action.
- Cancel action.

Rules:
- No real payment gateway.
- Do not request real card details.
- Do not request bank credentials.
- Do not request OTP.
- Clearly label the transaction as simulated.
- Confirmation creates only a demo success state.
- Cancellation returns to the relevant previous flow.

## 15. Payment Success

Route:

/payment/success

Show:
- Success animation or illustration.
- Demo booking reference.
- Customer name.
- Destination.
- Date.
- Participant count.
- Demo total.
- Status: SIMULATED.
- Return to gallery action.

Never present a demo transaction as an official permit, real booking, or confirmed reservation.

## 16. State Management

Use Zustand only when shared state is genuinely needed.

Potential stores:

- authStore.ts
- bookingStore.ts
- mascotStore.ts

Rules:
- Keep state minimal.
- Do not place every UI value in global state.
- Use local component state where appropriate.
- Persist only necessary demo data.
- Handle invalid or stale localStorage.
- Never persist passwords.
- Separate authentication, booking, and mascot state.

## 17. Accessibility and Responsive Design

Support:
- Desktop.
- Tablet.
- Mobile.

Requirements:
- Semantic HTML.
- Keyboard navigation.
- Visible focus states.
- Readable contrast.
- Accessible control labels.
- Descriptive image alt text.
- Reduced-motion support.
- Responsive images.
- No horizontal overflow.
- Touch-friendly controls.
- Video controls usable on mobile.

## 18. Error Handling

Handle:
- Missing hero video or poster image.
- Missing destination images.
- Missing videos.
- Missing Rive animation.
- Missing mascot audio.
- Invalid login.
- Invalid destination slug.
- Invalid booking.
- Missing checkout data.
- Payment cancellation.
- Invalid localStorage.
- Direct route refresh.

Do not leave broken media or blank critical page areas.

## 19. Development Phases

Work in these phases:

Phase 1 — Project audit and architecture.

Phase 2 — Dependencies, routing, design tokens, global styles.

Phase 3 — Public landing page.

Phase 4 — Dummy login.

Phase 5 — Mascot component architecture and fallback.

Phase 6 — Seven destination gallery.

Phase 7 — Destination detail and video placeholders.

Phase 8 — Rive animation integration when the actual asset is supplied.

Phase 9 — Mascot dialogue, audio, and route interactions.

Phase 10 — Booking form.

Phase 11 — Simulated checkout.

Phase 12 — Payment success.

Phase 13 — Responsive and accessibility audit.

Phase 14 — Final testing and documentation.

Do not implement all phases in one uncontrolled change.

Complete, explain, test, and document each phase before proceeding.

## 20. Progress and Handoff

PROJECT_STATUS.md is the source of truth for project progress.

At the end of each completed phase:
- Update completed phases.
- Record changed files.
- Record dependencies added.
- Record tests performed.
- Record test results.
- Record known issues.
- Record missing assets.
- Record the exact next action.

This is required so a different Codex session or account can continue work.

Do not assume conversation history is available in another session or account.

## 21. Final Acceptance Criteria

The project is complete when:

- Public landing page is responsive.
- Landing design follows the Visit Indonesia-inspired direction without copying
  its brand or assets.
- Navigation works.
- Demo login works.
- Public pages remain accessible without login.
- Seven destination cards are data-driven.
- Destination details load by slug.
- Destination videos have usable fallbacks.
- Mascot fallback works.
- Rive integration works when a valid asset is supplied.
- Mascot dialogue works without audio.
- Audio controls work when audio is supplied.
- Mascot does not repeatedly interrupt visitors.
- Booking validation works.
- Checkout is clearly simulated.
- Payment success displays correct demo data.
- Missing assets do not break the website.
- Lint, TypeScript checks, and production build pass where configured.
- README.md and PROJECT_STATUS.md are current.
- Remaining limitations and TODOs are documented.

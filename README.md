# Seven Summit Rinjani

A frontend-only promotional website for the Seven Summit Rinjani outdoor adventure concept.

## Project Features

- Public landing page.
- Dummy login.
- Seven destination gallery.
- Destination detail pages.
- Destination video previews.
- Interactive mascot using Rive.
- Contextual mascot dialogue and optional audio.
- Demo booking form.
- Simulated checkout.
- Simulated payment success.

## Requirements

- Node.js
- npm
- Git
- Visual Studio Code
- OpenAI Codex CLI

Check versions:

```bash
node -v
npm -v
git --version
```

## Installation

Clone or open the project directory.

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Build production:

```bash
npm run build
```

Run lint:

```bash
npm run lint
```

Check TypeScript:

Use the script available in package.json. If no type-check script exists, configure one appropriate for the project.

## Demo Login

Username: visitor

Password: rinjani123

This is a frontend demonstration account, not production authentication.

## Routes

- /
- /login
- /destinations
- /destinations/:slug
- /booking/:slug
- /checkout
- /payment/success

## Project Instructions

Read AGENTS.md before development.

Read PROJECT_STATUS.md before continuing an existing implementation.

## Development Progress

All completed phases and known issues must be recorded in PROJECT_STATUS.md.

## Asset Documentation

See docs/ASSET_GUIDE.md for image, video, Rive, and audio requirements.

## Important Notice

Booking and payment are simulated.

The website does not provide real reservation confirmation, permits, or payment processing.
A frontend-only promotional website for the Seven Summit Rinjani outdoor adventure concept.
To introduce and promote seven mountain destinations in the Rinjani region through an interactive and informative website, while providing visitors with an engaging experience to explore destinations and try a simulated booking process.
https://seven-summit-sembalun.netlify.app
- Landing page.
- Demo login.
- Seven destination gallery.
- Destination detail pages with video previews.
- Interactive mascot.
- Demo booking form.
- Simulated checkout and payment success.
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Rive
- Netlify
- Node.js
- npm
- Git
```
npm install
npm run dev
```
```
npm run build
npm run preview
```
Run lint:
```
npm run lint
```
- Username: visitor
- Password: rinjani123
- /
- /login
- /destinations
- /destinations/:slug
- /booking/:slug
- /checkout
- /payment/success
The project is deployed on Netlify using manual deployment.

After making changes:
1. Run npm run build.
2. Upload the generated dist folder to Netlify.
3. Verify the production website.
- AGENTS.md — Development instructions.
- PROJECT_STATUS.md — Development progress and known issues.
- docs/ASSETS_GUIDE.md — Asset requirements.
This is a frontend demonstration project. Authentication, booking, checkout, and payment are simulated. No real reservations, permits, or payment transactions are processed.

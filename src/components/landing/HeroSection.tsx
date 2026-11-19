import { assetPaths } from "../../config/assets";
import { HeroMedia } from "./HeroMedia";

export function HeroSection() {
  return (
    <section aria-labelledby="landing-hero-title" className="homepage-hero relative isolate flex h-dvh min-h-0 items-center overflow-hidden bg-charcoal px-6 py-24 text-white sm:px-8 lg:px-12">
      <HeroMedia posterSrc={assetPaths.heroPoster} videoSrc={assetPaths.landingHeroVideo} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-linear-to-r from-charcoal/35 via-charcoal/15 to-transparent" />
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="max-w-2xl">
          <p className="inline-flex rounded-full border border-white/20 bg-charcoal/30 px-4 py-2 text-xs font-semibold text-white shadow-sm backdrop-blur-sm sm:text-sm">
            Your Home Above the Clouds
          </p>
          <h1 className="mt-5 font-sans text-[clamp(2rem,5.4vw,3.75rem)] font-extrabold uppercase leading-[1.16] tracking-tight text-white drop-shadow-lg" id="landing-hero-title">
            <span className="block">DISCOVER YOUR</span>
            <span className="block">WILD SIDE</span>
          </h1>
          <p className="mt-7 max-w-[30rem] font-display text-sm leading-5 text-white drop-shadow-md sm:text-base sm:leading-6 lg:text-[17px]">
            Lost in Nature, Found in Adventure. Let the mountains guide your journey, the fresh air refresh your soul, and every step bring you closer to something extraordinary.
          </p>
        </div>
      </div>
    </section>
  );
}

import { assetPaths } from "../../config/assets";
import { HeroMedia } from "./HeroMedia";

export function HeroSection() {
  return (
    <section aria-labelledby="homepage-hero-title" className="homepage-hero relative isolate flex min-h-svh items-end overflow-hidden bg-charcoal px-6 pb-20 pt-32 text-white sm:px-10 sm:pb-24 lg:px-16">
      <HeroMedia posterSrc={assetPaths.heroPoster} videoSrc="/assets/videos/hero/rinjani-hero.mp4" />
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <p className="section-kicker text-cream">Seven Summit Rinjani</p>
        <h1 className="mt-4 max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tight drop-shadow-lg sm:text-6xl lg:text-7xl" id="homepage-hero-title">Temukan Keindahan Puncak Rinjani</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-white/90 drop-shadow sm:text-lg">Jelajahi lanskap Sembalun dan rencanakan petualanganmu di alam terbuka.</p>
        <a className="button-primary mt-8 inline-flex bg-terracotta hover:bg-terracotta/90" href="#explore">Mulai Jelajah</a>
      </div>
    </section>
  );
}

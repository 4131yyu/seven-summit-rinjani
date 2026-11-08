import { useEffect, useState } from "react";

import type { LandingDestination } from "../../types/landing";

type HeroMediaProps = {
  destination: LandingDestination;
};

export function HeroMedia({ destination }: HeroMediaProps) {
  const [videoFailed, setVideoFailed] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    setVideoFailed(false);
    setPosterFailed(false);
  }, [destination.id]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  const showVideo = Boolean(destination.videoSrc) && !videoFailed && !prefersReducedMotion;
  const showPoster = !showVideo;
  const showPlaceholder = showPoster && posterFailed;

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden bg-forest">
      <div className="hero-media-placeholder absolute inset-0" />

      {showVideo ? (
        <video
          autoPlay
          className="absolute inset-0 h-full w-full object-cover"
          loop
          muted
          onError={() => setVideoFailed(true)}
          playsInline
          poster={destination.posterSrc}
          preload="metadata"
        >
          <source src={destination.videoSrc} type="video/mp4" />
        </video>
      ) : null}

      {showPoster && !posterFailed ? (
        <img
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          onError={() => setPosterFailed(true)}
          src={destination.posterSrc}
        />
      ) : null}

      <div className="absolute inset-0 bg-linear-to-t from-charcoal via-charcoal/40 to-forest/20" />

      {showPlaceholder ? (
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <p className="max-w-xs rounded-full border border-white/25 bg-charcoal/30 px-4 py-2 text-xs font-medium tracking-wide text-white/85 backdrop-blur-sm">
            {prefersReducedMotion
              ? "Mode gerakan dikurangi — video tidak diputar otomatis"
              : "Visual placeholder — media tim belum tersedia"}
          </p>
        </div>
      ) : null}
    </div>
  );
}

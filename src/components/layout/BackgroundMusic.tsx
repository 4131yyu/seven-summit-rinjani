import { useEffect, useRef, useState } from "react";

type BackgroundMusicProps = {
  src: string;
};

export function BackgroundMusic({ src }: BackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const hasAttemptedAutoplay = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio || hasAttemptedAutoplay.current) return;

    hasAttemptedAutoplay.current = true;
    audio.volume = 0.35;

    void audio.play().then(
      () => setIsPlaying(true),
      () => setIsPlaying(false),
    );
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      setHasError(false);
      await audio.play();
      setIsPlaying(true);
    } catch {
      setHasError(true);
      setIsPlaying(false);
    }
  };

  return (
    <div className="fixed right-4 bottom-4 z-30 sm:right-6 sm:bottom-6">
      <audio loop onEnded={() => setIsPlaying(false)} onError={() => setHasError(true)} preload="metadata" ref={audioRef}>
        <source src={src} type="audio/mpeg" />
      </audio>
      <button
        aria-describedby={hasError ? "background-music-error" : undefined}
        aria-pressed={isPlaying}
        aria-label={isPlaying ? "Matikan musik latar" : "Nyalakan musik latar"}
        className="relative grid size-14 place-items-center overflow-hidden rounded-full border border-white/25 bg-charcoal/90 text-white shadow-lg backdrop-blur transition hover:bg-forest focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-terracotta"
        onClick={toggleMusic}
        type="button"
      >
        <span aria-hidden="true" className="absolute inset-2 rounded-full border border-cream/35" />
        <span aria-hidden="true" className="absolute size-3 rounded-full bg-terracotta" />
        <span aria-hidden="true" className="relative text-lg leading-none">♫</span>
      </button>
      {hasError ? (
        <p className="mt-2 max-w-56 rounded-xl bg-charcoal/90 px-3 py-2 text-xs leading-5 text-white" id="background-music-error">
          Musik latar tidak dapat diputar pada perangkat ini.
        </p>
      ) : null}
    </div>
  );
}

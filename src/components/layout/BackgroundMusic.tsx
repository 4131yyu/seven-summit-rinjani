import { useCallback, useEffect, useRef, useState } from "react";

type BackgroundMusicProps = {
  isSuppressed?: boolean;
  showControls?: boolean;
  src: string;
};

export function BackgroundMusic({ isSuppressed = false, showControls = true, src }: BackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const hasAttemptedAutoplay = useRef(false);
  const wasSuppressed = useRef(false);
  const isSuppressedRef = useRef(isSuppressed);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    isSuppressedRef.current = isSuppressed;
  }, [isSuppressed]);

  const playAudio = useCallback(async (audio: HTMLAudioElement, showError = false) => {
    try {
      await audio.play();
      if (isSuppressedRef.current || audio.paused) {
        audio.pause();
        setIsPlaying(false);
        return;
      }
      setIsPlaying(true);
    } catch {
      if (showError) setHasError(true);
      setIsPlaying(false);
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.volume = 0.35;

    if (isSuppressed) {
      wasSuppressed.current = true;
      audio.pause();
      setIsPlaying(false);
      return;
    }

    if (!hasAttemptedAutoplay.current) {
      hasAttemptedAutoplay.current = true;
      void playAudio(audio);
      const resumeAfterInteraction = () => {
        if (!audio.paused || isSuppressedRef.current) return;
        void playAudio(audio);
      };
      window.addEventListener("pointerdown", resumeAfterInteraction);
      window.addEventListener("keydown", resumeAfterInteraction);
      return () => {
        window.removeEventListener("pointerdown", resumeAfterInteraction);
        window.removeEventListener("keydown", resumeAfterInteraction);
      };
    }

    if (wasSuppressed.current) {
      wasSuppressed.current = false;
      void playAudio(audio);
    }
  }, [isSuppressed, playAudio]);

  const toggleMusic = () => {
    const audio = audioRef.current;

    if (!audio || isSuppressed) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    setHasError(false);
    void playAudio(audio, true);
  };

  return (
    <div className={showControls ? "fixed right-4 bottom-4 z-30 sm:right-6 sm:bottom-6" : "sr-only"}>
      <audio loop muted={isSuppressed} onEnded={() => setIsPlaying(false)} onError={() => setHasError(true)} preload="metadata" ref={audioRef}>
        <source src={src} type="audio/mpeg" />
      </audio>
      {showControls ? <button
        aria-describedby={hasError ? "background-music-error" : undefined}
        aria-pressed={isPlaying}
        aria-label={isSuppressed ? "Musik latar dijeda selama preview video" : isPlaying ? "Matikan musik latar" : "Nyalakan musik latar"}
        className="relative grid size-14 place-items-center overflow-hidden rounded-full border border-white/25 bg-charcoal/90 text-white shadow-lg backdrop-blur transition hover:bg-forest focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-terracotta disabled:cursor-not-allowed disabled:opacity-50"
        disabled={isSuppressed}
        onClick={toggleMusic}
        type="button"
      >
        <span aria-hidden="true" className="absolute inset-2 rounded-full border border-cream/35" />
        <span aria-hidden="true" className="absolute size-3 rounded-full bg-terracotta" />
        <span aria-hidden="true" className="relative text-lg leading-none">♫</span>
      </button> : null}
      {hasError && showControls ? (
        <p className="mt-2 max-w-56 rounded-xl bg-charcoal/90 px-3 py-2 text-xs leading-5 text-white" id="background-music-error">
          Musik latar tidak dapat diputar pada perangkat ini.
        </p>
      ) : null}
    </div>
  );
}

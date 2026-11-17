import { type KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";

import { landingDestinations } from "../../data/landingDestinations";

const AUTOPLAY_DELAY = 6500;
const FADE_DURATION = 800;

export function DestinationCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [manualReset, setManualReset] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isPointerOver, setIsPointerOver] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const touchStartX = useRef<number | null>(null);
  const didSwipe = useRef(false);

  const showSlide = useCallback((nextIndex: number) => {
    setPreviousIndex(activeIndex);
    setActiveIndex((nextIndex + landingDestinations.length) % landingDestinations.length);
    setManualReset((value) => value + 1);
  }, [activeIndex]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const updateVisibility = () => setIsDocumentVisible(!document.hidden);
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    if (previousIndex === null) return;
    const timeout = window.setTimeout(() => setPreviousIndex(null), FADE_DURATION);
    return () => window.clearTimeout(timeout);
  }, [previousIndex]);

  const canAutoplay =
    !isPaused &&
    !isPointerOver &&
    !hasFocus &&
    !isTouching &&
    isDocumentVisible &&
    !prefersReducedMotion;

  useEffect(() => {
    if (!canAutoplay) return;

    const timeout = window.setTimeout(() => {
      setPreviousIndex(activeIndex);
      setActiveIndex((activeIndex + 1) % landingDestinations.length);
    }, AUTOPLAY_DELAY);

    return () => window.clearTimeout(timeout);
  }, [activeIndex, canAutoplay, manualReset]);

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      showSlide(activeIndex + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      showSlide(activeIndex - 1);
    }
  };

  const visibleCards = landingDestinations
    .map((destination, index) => {
      const rawOffset = (index - activeIndex + landingDestinations.length) % landingDestinations.length;
      const offset = rawOffset > landingDestinations.length / 2
        ? rawOffset - landingDestinations.length
        : rawOffset;
      return { destination, index, offset };
    })
    .filter(({ offset }) => Math.abs(offset) <= 1);
  const activeDestination = landingDestinations[activeIndex];

  return (
    <section
      aria-label="Carousel tujuh destinasi"
      aria-roledescription="carousel"
      className="destination-carousel relative isolate overflow-hidden rounded-[1.75rem] bg-charcoal text-white sm:rounded-[2rem]"
      onBlurCapture={(event) => {
        setHasFocus(event.currentTarget.contains(event.relatedTarget as Node | null));
      }}
      onFocusCapture={() => setHasFocus(true)}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPointerOver(true)}
      onMouseLeave={() => setIsPointerOver(false)}
      onPointerDown={(event) => {
        if (event.pointerType === "touch") {
          setIsTouching(true);
          touchStartX.current = event.clientX;
        }
      }}
      onPointerUp={(event) => {
        if (event.pointerType === "touch" && touchStartX.current !== null) {
          const deltaX = event.clientX - touchStartX.current;
          if (Math.abs(deltaX) > 48) {
            didSwipe.current = true;
            showSlide(activeIndex + (deltaX < 0 ? 1 : -1));
            window.setTimeout(() => {
              didSwipe.current = false;
            }, 0);
          }
          touchStartX.current = null;
          setIsTouching(false);
        }
      }}
      onPointerCancel={() => {
        touchStartX.current = null;
        setIsTouching(false);
      }}
      tabIndex={0}
    >
      <div aria-hidden="true" className="absolute inset-0 bg-deep-green">
        {previousIndex !== null && !failedImages[landingDestinations[previousIndex].backgroundImage] ? (
          <img
            alt=""
            className="destination-background destination-background-exit"
            onError={() => setFailedImages((images) => ({
              ...images,
              [landingDestinations[previousIndex].backgroundImage]: true,
            }))}
            src={landingDestinations[previousIndex].backgroundImage}
          />
        ) : null}
        {!failedImages[activeDestination.backgroundImage] ? (
          <img
            alt=""
            className={`destination-background ${previousIndex === null ? "destination-background-initial" : "destination-background-enter"}`}
            onError={() => setFailedImages((images) => ({
              ...images,
              [activeDestination.backgroundImage]: true,
            }))}
            src={activeDestination.backgroundImage}
          />
        ) : null}
        <div className="destination-background-overlay absolute inset-0" />
      </div>

      <div className="relative z-10 grid min-h-[44rem] items-center gap-8 px-5 py-8 sm:min-h-[48rem] sm:px-10 sm:py-12 lg:min-h-[42rem] lg:grid-cols-[0.92fr_1.08fr] lg:gap-5 lg:px-14">
        <div
          aria-atomic="true"
          aria-live="off"
          className="destination-copy-enter order-2 max-w-xl lg:order-1"
          key={activeDestination.id}
        >
          <p className="text-xs font-semibold tracking-[0.22em] text-cream/75 uppercase">
            Jelajahi Seven Summit
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {activeDestination.selectorLabel}
          </h2>
          <p className="mt-5 max-w-md text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
            {activeDestination.description}
          </p>
          <p className="mt-4 text-xs font-medium text-cream/70">
            Nama dan informasi destinasi menunggu verifikasi.
          </p>
        </div>

        <div
          aria-label={`Slide ${activeIndex + 1} dari ${landingDestinations.length}`}
          className="destination-card-stage order-1 h-[21rem] touch-pan-y sm:h-[27rem] lg:order-2 lg:h-[34rem]"
        >
          {visibleCards.map(({ destination, index, offset }) => {
            const isActive = index === activeIndex;
            const positionClass = isActive
              ? "destination-card-active"
              : offset < 0
                ? "destination-card-previous"
                : "destination-card-next";

            return (
              <button
                aria-current={isActive ? "true" : undefined}
                aria-label={`Tampilkan ${destination.selectorLabel}`}
                className={`destination-card ${positionClass}`}
                key={destination.id}
                onClick={() => {
                  if (!didSwipe.current) showSlide(index);
                }}
                tabIndex={isActive ? 0 : -1}
                type="button"
              >
                {!failedImages[destination.cardImage] ? (
                  <img
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                    draggable={false}
                    loading={Math.abs(offset) === 1 ? "lazy" : "eager"}
                    onError={() => setFailedImages((images) => ({
                      ...images,
                      [destination.cardImage]: true,
                    }))}
                    src={destination.cardImage}
                  />
                ) : (
                  <span aria-hidden="true" className="destination-card-placeholder absolute inset-0" />
                )}
                <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-charcoal/90 via-charcoal/35 to-transparent px-4 pb-5 pt-16 text-left text-sm font-semibold text-white sm:px-5 sm:text-base">
                  {destination.selectorLabel}
                </span>
              </button>
            );
          })}
        </div>

        <div className="order-3 flex flex-wrap items-center justify-between gap-4 lg:col-span-2">
          <div aria-label="Pilih slide destinasi" className="flex flex-wrap gap-2">
            {landingDestinations.map((destination, index) => (
              <button
                aria-label={`Ke ${destination.selectorLabel}`}
                aria-pressed={activeIndex === index}
                className={`h-3 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${activeIndex === index ? "w-8 bg-terracotta" : "w-3 bg-white/55 hover:bg-white"}`}
                key={destination.id}
                onClick={() => showSlide(index)}
                type="button"
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button aria-label="Destinasi sebelumnya" className="destination-control" onClick={() => showSlide(activeIndex - 1)} type="button">
              <span aria-hidden="true">←</span>
            </button>
            <button aria-label="Destinasi berikutnya" className="destination-control" onClick={() => showSlide(activeIndex + 1)} type="button">
              <span aria-hidden="true">→</span>
            </button>
            <button
              aria-label={isPaused ? "Lanjutkan perpindahan otomatis" : "Jeda perpindahan otomatis"}
              aria-pressed={isPaused}
              className="destination-control destination-pause-control"
              onClick={() => setIsPaused((paused) => !paused)}
              type="button"
            >
              <span aria-hidden="true">{isPaused ? "▶" : "Ⅱ"}</span>
            </button>
          </div>
        </div>
      </div>

      {prefersReducedMotion ? (
        <p className="sr-only" role="status">
          Perpindahan otomatis dinonaktifkan sesuai preferensi gerakan perangkat.
        </p>
      ) : null}
    </section>
  );
}

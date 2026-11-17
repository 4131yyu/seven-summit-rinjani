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
      aria-label="Seven Summit Rinjani, pilihan destinasi"
      aria-roledescription="carousel"
      className="destination-carousel relative isolate min-h-svh overflow-hidden bg-charcoal text-white"
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

      <div id="seven-summit" className="relative z-10 flex min-h-svh flex-col px-5 pb-7 pt-24 sm:px-9 sm:pb-10 sm:pt-28 lg:px-14 lg:pb-12 lg:pt-32">
        <header className="destination-copy-enter mx-auto w-full max-w-5xl text-center" key={activeDestination.id}>
          <p className="text-xs font-semibold tracking-[0.24em] text-white/85 uppercase sm:text-sm">Seven Summit Rinjani</p>
          <h1 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight text-white drop-shadow-md sm:text-5xl lg:text-6xl">Where Will You Go Next?</h1>
          <p className="destination-copy-caption mx-auto mt-2 max-w-2xl text-xs leading-5 text-white/90 drop-shadow sm:text-sm">Explore the mountain destinations and choose where your journey begins.</p>
        </header>

        <div className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-6 pt-7 sm:pt-9 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.95fr)] lg:gap-12">
          <div className="flex min-w-0 items-center gap-4 sm:gap-7 lg:gap-10">
            <nav aria-label="Pilih destinasi" className="destination-selector-rail flex shrink-0 flex-col items-center gap-1">
              {landingDestinations.map((destination, index) => (
                <button aria-current={activeIndex === index ? "step" : undefined} aria-label={`Pilih ${destination.selectorLabel}`} className={`destination-selector-dot ${activeIndex === index ? "destination-selector-dot-active" : ""}`} key={destination.id} onClick={() => showSlide(index)} type="button" />
              ))}
            </nav>
            <div className="destination-copy-enter max-w-xl" id="active-destination" key={`copy-${activeDestination.id}`}>
              <p className="text-xs font-semibold tracking-[0.2em] text-cream/80 uppercase sm:text-sm">Destinasi {activeDestination.id}</p>
              <h2 className="mt-2 font-display text-3xl font-semibold leading-tight text-white drop-shadow sm:text-4xl lg:text-5xl">{activeDestination.name}</h2>
              <p className="mt-3 text-xs font-semibold tracking-[0.14em] text-cream/80 uppercase sm:text-sm">Ketinggian puncak</p>
              <p className="destination-altitude mt-1 font-display text-xl font-semibold text-white drop-shadow sm:text-2xl">{activeDestination.altitude}</p>
              <p className="mt-3 max-w-lg text-sm leading-6 text-white drop-shadow sm:text-base">{activeDestination.shortDescription}</p>
              <dl className="destination-details mt-4 grid gap-x-5 gap-y-3 sm:grid-cols-2">
                <div className="destination-detail-item sm:col-span-2">
                  <dt>Lokasi</dt>
                  <dd>{activeDestination.location}</dd>
                </div>
                {activeDestination.estimatedDuration ? (
                  <div className="destination-detail-item">
                    <dt>Estimasi waktu tempuh</dt>
                    <dd>{activeDestination.estimatedDuration}</dd>
                  </div>
                ) : null}
                {activeDestination.difficulty ? (
                  <div className="destination-detail-item">
                    <dt>Tingkat kesulitan</dt>
                    <dd>{activeDestination.difficulty}</dd>
                  </div>
                ) : null}
                {activeDestination.mountainType ? (
                  <div className="destination-detail-item">
                    <dt>Tipe gunung</dt>
                    <dd>{activeDestination.mountainType}</dd>
                  </div>
                ) : null}
                {activeDestination.temperature ? (
                  <div className="destination-detail-item">
                    <dt>Suhu udara</dt>
                    <dd>{activeDestination.temperature}</dd>
                  </div>
                ) : null}
              </dl>
            </div>
          </div>

          <div aria-label={`Kartu pilihan, slide ${activeIndex + 1} dari ${landingDestinations.length}`} className="destination-card-stage mx-auto h-[15rem] w-full max-w-[30rem] touch-pan-y sm:h-[20rem] lg:h-[22rem]">
            {visibleCards.map(({ destination, index, offset }) => {
              const isActive = index === activeIndex;
              const positionClass = isActive ? "destination-card-active" : offset < 0 ? "destination-card-previous" : "destination-card-next";
              return (
                <button aria-current={isActive ? "true" : undefined} aria-label={`Tampilkan ${destination.selectorLabel}`} className={`destination-card ${positionClass}`} key={destination.id} onClick={() => { if (!didSwipe.current) showSlide(index); }} tabIndex={isActive ? 0 : -1} type="button">
                  {!failedImages[destination.cardImage] ? (
                    <img alt="" className="absolute inset-0 h-full w-full object-cover" draggable={false} loading={Math.abs(offset) === 1 ? "lazy" : "eager"} onError={() => setFailedImages((images) => ({ ...images, [destination.cardImage]: true }))} src={destination.cardImage} />
                  ) : <span aria-hidden="true" className="destination-card-placeholder absolute inset-0" />}
                  <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-charcoal/90 via-charcoal/35 to-transparent px-3 pb-3 pt-12 text-left text-xs font-semibold text-white sm:px-4 sm:pb-4 sm:pt-14 sm:text-sm">{destination.selectorLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        <footer className="mx-auto mt-5 flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 sm:mt-7">
          <div className="flex items-center gap-2">
            <button aria-label="Destinasi sebelumnya" className="destination-control" onClick={() => showSlide(activeIndex - 1)} type="button"><span aria-hidden="true">←</span></button>
            <button aria-label="Destinasi berikutnya" className="destination-control" onClick={() => showSlide(activeIndex + 1)} type="button"><span aria-hidden="true">→</span></button>
            <button aria-label={isPaused ? "Lanjutkan perpindahan otomatis" : "Jeda perpindahan otomatis"} aria-pressed={isPaused} className="destination-control destination-pause-control" onClick={() => setIsPaused((paused) => !paused)} type="button"><span aria-hidden="true">{isPaused ? "▶" : "Ⅱ"}</span></button>
          </div>
          <span className="sr-only" id="contact-placeholder">Informasi kontak Seven Summit Rinjani akan ditambahkan setelah tersedia.</span>
        </footer>
      </div>
      {prefersReducedMotion ? (
        <p className="sr-only" role="status">
          Perpindahan otomatis dinonaktifkan sesuai preferensi gerakan perangkat.
        </p>
      ) : null}
    </section>
  );
}

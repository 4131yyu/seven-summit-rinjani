import { type KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import { animate, createScope, stagger } from "animejs";
import { Link } from "react-router";

import { landingDestinations } from "../../data/landingDestinations";
import { useLanguage } from "../../i18n/LanguageProvider";
import { localizeDestination } from "../../i18n/destinationTranslations";

const AUTOPLAY_DELAY = 1500;
const FADE_DURATION = 700;

export function DestinationCarousel() {
  const { language, t } = useLanguage();
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
  const carouselRef = useRef<HTMLElement>(null);

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

  useEffect(() => {
    const root = carouselRef.current;
    if (!root || prefersReducedMotion) return;

    const scope = createScope({ root }).add(() => {
      const activeBackground = root.querySelector(".destination-background-active");
      const previousBackground = root.querySelector(".destination-background-exit");
      const copy = root.querySelector("#active-destination");
      const activeCardImage = root.querySelector(".destination-card-active img");

      if (activeBackground && previousIndex !== null) {
        animate(activeBackground, { opacity: [0, 1], scale: [1.035, 1], duration: FADE_DURATION, ease: "out(3)" });
      }
      if (previousBackground) {
        animate(previousBackground, { opacity: [1, 0], duration: FADE_DURATION, ease: "out(2)" });
      }
      if (copy && previousIndex !== null) {
        animate(copy.children, { opacity: [0, 1], translateY: [12, 0], delay: stagger(65), duration: 420, ease: "out(3)" });
      }
      if (activeCardImage && previousIndex !== null) {
        animate(activeCardImage, { scale: [1.07, 1], duration: 650, ease: "out(3)" });
      }
    });

    return () => scope.revert();
  }, [activeIndex, prefersReducedMotion, previousIndex]);

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
  const displayDestination = localizeDestination(activeDestination, language);

  return (
    <section
      aria-label={t("carousel.label")}
      aria-roledescription="carousel"
      className="destination-carousel relative isolate h-dvh min-h-0 overflow-hidden bg-charcoal text-white"
      ref={carouselRef}
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
            className={`destination-background ${previousIndex === null ? "destination-background-initial" : "destination-background-active"}`}
            onError={() => setFailedImages((images) => ({
              ...images,
              [activeDestination.backgroundImage]: true,
            }))}
            src={activeDestination.backgroundImage}
          />
        ) : null}
        <div className="destination-background-overlay absolute inset-0" />
      </div>

      <div id="seven-summit" className="relative z-10 flex h-full min-h-0 flex-col px-5 pb-7 pt-24 sm:px-9 sm:pb-10 sm:pt-28 lg:px-14 lg:pb-12 lg:pt-32">
        <header className="destination-copy-enter mx-auto w-full max-w-5xl text-center" key={activeDestination.id}>
          <p className="text-xs font-semibold tracking-[0.24em] text-white/85 uppercase sm:text-sm">Seven Summit Rinjani</p>
          <h1 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight text-white drop-shadow-md sm:text-5xl lg:text-6xl">{t("carousel.heading")}</h1>
          <p className="destination-copy-caption mx-auto mt-2 max-w-2xl text-xs leading-5 text-white/90 drop-shadow sm:text-sm">{t("carousel.caption")}</p>
        </header>

        <div className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-6 pt-7 sm:pt-9 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.95fr)] lg:gap-12">
          <div className="flex min-w-0 items-center gap-4 sm:gap-7 lg:gap-10">
            <nav aria-label={t("carousel.label")} className="destination-selector-rail flex shrink-0 flex-col items-center gap-1">
              {landingDestinations.map((destination, index) => (
              <button aria-current={activeIndex === index ? "step" : undefined} aria-label={`${t("carousel.destination")} ${destination.selectorLabel}`} className={`destination-selector-dot ${activeIndex === index ? "destination-selector-dot-active" : ""}`} key={destination.id} onClick={() => showSlide(index)} type="button" />
              ))}
            </nav>
            <div className="destination-copy-enter max-w-xl" id="active-destination" key={`copy-${activeDestination.id}`}>
              <p className="text-xs font-semibold tracking-[0.2em] text-cream/80 uppercase sm:text-sm">{t("carousel.destination")} {activeDestination.id}</p>
              <h2 className="mt-2 font-display text-3xl font-semibold leading-tight text-white drop-shadow sm:text-4xl lg:text-5xl">{activeDestination.name}</h2>
              <p className="mt-3 text-xs font-semibold tracking-[0.14em] text-cream/80 uppercase sm:text-sm">{t("carousel.altitude")}</p>
              <p className="destination-altitude mt-1 font-display text-xl font-semibold text-white drop-shadow sm:text-2xl">{displayDestination.altitude}</p>
              <p className="mt-3 max-w-lg text-sm leading-6 text-white drop-shadow sm:text-base">{displayDestination.shortDescription}</p>
              <dl className="destination-details mt-4 grid gap-x-5 gap-y-3 sm:grid-cols-2">
                <div className="destination-detail-item sm:col-span-2">
                  <dt>{t("carousel.location")}</dt>
                  <dd>{displayDestination.location}</dd>
                </div>
                {displayDestination.estimatedDuration ? (
                  <div className="destination-detail-item">
                    <dt>{t("carousel.duration")}</dt>
                    <dd>{displayDestination.estimatedDuration}</dd>
                  </div>
                ) : null}
                {displayDestination.difficulty ? (
                  <div className="destination-detail-item">
                    <dt>{t("carousel.difficulty")}</dt>
                    <dd>{displayDestination.difficulty}</dd>
                  </div>
                ) : null}
                {displayDestination.mountainType ? (
                  <div className="destination-detail-item">
                    <dt>{t("carousel.mountainType")}</dt>
                    <dd>{displayDestination.mountainType}</dd>
                  </div>
                ) : null}
                {displayDestination.temperature ? (
                  <div className="destination-detail-item">
                    <dt>{t("carousel.temperature")}</dt>
                    <dd>{displayDestination.temperature}</dd>
                  </div>
                ) : null}
              </dl>
            </div>
          </div>

          <div aria-label={`${t("carousel.slideLabel")} ${activeIndex + 1} ${language === "ID" ? "dari" : "of"} ${landingDestinations.length}`} className="destination-card-stage mx-auto w-full max-w-[30rem] touch-pan-y">
            {visibleCards.map(({ destination, index, offset }) => {
              const isActive = index === activeIndex;
              const positionClass = isActive ? "destination-card-active" : offset < 0 ? "destination-card-previous" : "destination-card-next";
              return (
                <Link aria-current={isActive ? "true" : undefined} aria-label={`${t("carousel.exploreFrom")} ${destination.selectorLabel}`} className={`destination-card ${positionClass} no-underline`} key={destination.id} onClick={(event) => { if (didSwipe.current) event.preventDefault(); }} to="/explore">
                  {!failedImages[destination.cardImage] ? (
                    <img alt="" className="absolute inset-0 h-full w-full object-cover" draggable={false} loading={Math.abs(offset) === 1 ? "lazy" : "eager"} onError={() => setFailedImages((images) => ({ ...images, [destination.cardImage]: true }))} src={destination.cardImage} />
                  ) : <span aria-hidden="true" className="destination-card-placeholder absolute inset-0" />}
                  <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-charcoal/90 via-charcoal/35 to-transparent px-3 pb-3 pt-12 text-left text-xs font-semibold text-white sm:px-4 sm:pb-4 sm:pt-14 sm:text-sm">
                    <span className="block">{destination.selectorLabel}</span>
                    <span className="mt-1 block text-[0.65rem] font-medium tracking-wide text-cream/90 sm:text-xs">{t("carousel.exploreCards")} <span aria-hidden="true">→</span></span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        <footer className="mx-auto mt-5 flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 sm:mt-7">
          <div className="flex items-center gap-2">
            <button aria-label={t("carousel.previous")} className="destination-control" onClick={() => showSlide(activeIndex - 1)} type="button"><span aria-hidden="true">←</span></button>
            <button aria-label={t("carousel.next")} className="destination-control" onClick={() => showSlide(activeIndex + 1)} type="button"><span aria-hidden="true">→</span></button>
            <button aria-label={isPaused ? t("carousel.resume") : t("carousel.pause")} aria-pressed={isPaused} className="destination-control destination-pause-control" onClick={() => setIsPaused((paused) => !paused)} type="button"><span aria-hidden="true">{isPaused ? "▶" : "Ⅱ"}</span></button>
          </div>
          <span className="sr-only" id="contact-placeholder">{t("carousel.contactPlaceholder")}</span>
        </footer>
      </div>
      {prefersReducedMotion ? (
        <p className="sr-only" role="status">
          {t("carousel.reducedMotion")}
        </p>
      ) : null}
    </section>
  );
}

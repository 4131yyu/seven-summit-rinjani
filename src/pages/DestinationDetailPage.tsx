import { useLayoutEffect, useState } from "react";
import { Link, useParams } from "react-router";

import { destinations } from "../data/destinations";
import { useLanguage } from "../i18n/LanguageProvider";
import { localizeDestination } from "../i18n/destinationTranslations";

export function DestinationDetailPage() {
  const { language, t } = useLanguage();
  const { slug } = useParams();
  const destination = destinations.find((item) => item.slug === slug);
  const [videoFailed, setVideoFailed] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [slug]);

  if (!destination) {
    return (
      <section className="destination-detail-page px-5 py-20 text-center" aria-labelledby="destination-missing-title">
        <p className="section-kicker">{t("detail.notFound")}</p>
        <h1 className="section-title mx-auto mt-3" id="destination-missing-title">{t("detail.unavailable")}</h1>
      </section>
    );
  }

  const displayDestination = localizeDestination(destination, language);

  return (
    <article className="destination-detail-page" aria-labelledby="destination-detail-title">
      <header className="destination-detail-heading">
        <p className="section-kicker">Seven Summit Rinjani · Destinasi {destination.id}</p>
        <h1 className="section-title mx-auto mt-3" id="destination-detail-title">{destination.name}</h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-charcoal/70 sm:text-base">{t("detail.preview")}</p>
      </header>

      <section className="destination-video-section" aria-label={`${t("detail.video")} ${destination.name}`}>
        <div className="destination-video-frame">
          {!videoFailed && destination.previewVideo ? (
            <video
              aria-label={`${t("detail.video")} ${destination.name}`}
              autoPlay
              controls
              loop
              muted={false}
              playsInline
              preload="metadata"
              poster={destination.videoPoster}
              onError={() => setVideoFailed(true)}
            >
              <source src={destination.previewVideo} type="video/mp4" />
              {t("detail.video.unsupported")}
            </video>
          ) : !posterFailed && destination.videoPoster ? (
            <img
              alt={`${t("detail.video")} ${destination.name}`}
              onError={() => setPosterFailed(true)}
              src={destination.videoPoster}
            />
          ) : (
            <div className="destination-video-fallback" role="status">
              {t("detail.video.unavailable")}
            </div>
          )}
          {videoFailed && !posterFailed ? <p className="destination-video-notice" role="status">{t("detail.video.failed")}</p> : null}
        </div>
      </section>

      <section className="destination-detail-copy" aria-labelledby="destination-description-title">
        <div className="destination-description">
          <p className="section-kicker">{t("detail.about")}</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-forest sm:text-3xl" id="destination-description-title">{t("detail.getToKnow")} {destination.name}</h2>
          <p className="mt-4 text-base leading-7 text-charcoal/80">{displayDestination.shortDescription}</p>
        </div>

        <dl className="destination-facts">
          <div><dt>{t("detail.altitude")}</dt><dd>{destination.altitude}</dd></div>
          <div><dt>{t("detail.location")}</dt><dd>{displayDestination.location}</dd></div>
          {displayDestination.estimatedDuration ? <div><dt>{t("detail.duration")}</dt><dd>{displayDestination.estimatedDuration}</dd></div> : null}
          {displayDestination.difficulty ? <div><dt>{t("detail.difficulty")}</dt><dd>{displayDestination.difficulty}</dd></div> : null}
          {displayDestination.mountainType ? <div><dt>{t("detail.mountainType")}</dt><dd>{displayDestination.mountainType}</dd></div> : null}
          {displayDestination.temperature ? <div><dt>{t("detail.temperature")}</dt><dd>{displayDestination.temperature}</dd></div> : null}
        </dl>

        <p className="destination-demo-note">{t("detail.note")}</p>
        <div className="destination-detail-actions">
          <Link className="detail-button detail-button-primary focused-page-cta" to={`/booking/${destination.slug}`}>{t("detail.book")}</Link>
        </div>
      </section>
    </article>
  );
}

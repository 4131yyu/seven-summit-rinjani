import { useLayoutEffect, useState } from "react";
import { Link, useParams } from "react-router";

import { destinations } from "../data/destinations";

export function DestinationDetailPage() {
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
        <p className="section-kicker">Destinasi tidak ditemukan</p>
        <h1 className="section-title mx-auto mt-3" id="destination-missing-title">Halaman ini belum tersedia</h1>
      </section>
    );
  }

  return (
    <article className="destination-detail-page" aria-labelledby="destination-detail-title">
      <header className="destination-detail-heading">
        <p className="section-kicker">Seven Summit Rinjani · Destinasi {destination.id}</p>
        <h1 className="section-title mx-auto mt-3" id="destination-detail-title">{destination.name}</h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-charcoal/70 sm:text-base">Preview video dan informasi destinasi</p>
      </header>

      <section className="destination-video-section" aria-label={`Preview video ${destination.name}`}>
        <div className="destination-video-frame">
          {!videoFailed && destination.previewVideo ? (
            <video
              aria-label={`Video preview ${destination.name}`}
              autoPlay
              controls
              loop
              muted
              playsInline
              preload="metadata"
              poster={destination.videoPoster}
              onError={() => setVideoFailed(true)}
            >
              <source src={destination.previewVideo} type="video/mp4" />
              Browser Anda tidak mendukung pemutaran video.
            </video>
          ) : !posterFailed && destination.videoPoster ? (
            <img
              alt={`Poster video ${destination.name}`}
              onError={() => setPosterFailed(true)}
              src={destination.videoPoster}
            />
          ) : (
            <div className="destination-video-fallback" role="status">
              Preview video untuk destinasi ini belum tersedia.
            </div>
          )}
          {videoFailed && !posterFailed ? <p className="destination-video-notice" role="status">Video tidak dapat diputar. Poster destinasi ditampilkan sebagai gantinya.</p> : null}
        </div>
      </section>

      <section className="destination-detail-copy" aria-labelledby="destination-description-title">
        <div className="destination-description">
          <p className="section-kicker">Tentang destinasi</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-forest sm:text-3xl" id="destination-description-title">Kenali {destination.name}</h2>
          <p className="mt-4 text-base leading-7 text-charcoal/80">{destination.shortDescription}</p>
        </div>

        <dl className="destination-facts">
          <div><dt>Ketinggian</dt><dd>{destination.altitude}</dd></div>
          <div><dt>Lokasi</dt><dd>{destination.location}</dd></div>
          {destination.estimatedDuration ? <div><dt>Estimasi durasi</dt><dd>{destination.estimatedDuration}</dd></div> : null}
          {destination.difficulty ? <div><dt>Tingkat kesulitan</dt><dd>{destination.difficulty}</dd></div> : null}
          {destination.mountainType ? <div><dt>Tipe gunung</dt><dd>{destination.mountainType}</dd></div> : null}
          {destination.temperature ? <div><dt>Informasi suhu</dt><dd>{destination.temperature}</dd></div> : null}
        </dl>

        <p className="destination-demo-note">Informasi ini merupakan konten demo dan perlu dikonfirmasi kembali sebelum perjalanan.</p>
        <div className="destination-detail-actions">
          <Link className="detail-button detail-button-primary focused-page-cta" to={`/booking/${destination.slug}`}>Pesan Izin / Guide</Link>
        </div>
      </section>
    </article>
  );
}

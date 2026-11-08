import { useRef, useState } from "react";

import { DestinationSelector } from "../components/landing/DestinationSelector";
import { HeroMedia } from "../components/landing/HeroMedia";
import { landingDestinations } from "../data/landingDestinations";

const experiencePlaceholders = [
  "Narasi perjalanan",
  "Persiapan pengalaman",
  "Momen di alam terbuka",
] as const;

export function LandingPage() {
  const [activeDestinationId, setActiveDestinationId] = useState(landingDestinations[0].id);
  const galleryRef = useRef<HTMLDivElement>(null);
  const activeDestination =
    landingDestinations.find((destination) => destination.id === activeDestinationId) ??
    landingDestinations[0];

  const scrollToGallery = () => {
    document.getElementById("galeri-destinasi")?.scrollIntoView({ behavior: "smooth" });
  };

  const moveGallery = (direction: "next" | "previous") => {
    const gallery = galleryRef.current;

    if (!gallery) return;

    gallery.scrollBy({
      left: (direction === "next" ? 1 : -1) * gallery.clientWidth * 0.82,
      behavior: "smooth",
    });
  };

  return (
    <>
      <section aria-labelledby="hero-heading" className="relative flex min-h-svh overflow-x-clip">
        <HeroMedia destination={activeDestination} />
        <div className="relative z-10 mx-4 flex w-auto max-w-7xl flex-col px-5 pb-6 pt-28 sm:mx-5 sm:px-8 sm:pb-10 sm:pt-32 lg:px-12 lg:pt-36">
          {/* <div className="flex flex-1 items-start py-10 sm:py-14"> */}
            <div className="max-w-3xl">
              <p className="text-sm font-semibold tracking-[0.2em] text-cream/80 uppercase">Seven Summit Rinjani</p>
              <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl" id="hero-heading">
                Discover the Seven Summits of Rinjani
              </h1>
              <p className="mt-32 max-w-xl text-base leading-7 text-cream/90 sm:mt-48 sm:text-lg sm:leading-8 lg:mt-70">
                Sebuah ruang untuk mempersiapkan pengalaman eksplorasi Rinjani melalui visual dan informasi yang akan diperbarui bersama tim.
              </p>
              <button className="button-primary mt-7" onClick={scrollToGallery} type="button">Explore the Summits</button>
              <p className="mt-4 text-sm text-white/70">{activeDestination.statusLabel}</p>
            </div>
          </div>
          {/* <div className="pt-4 sm:pt-6">
            <DestinationSelector activeDestinationId={activeDestinationId} destinations={landingDestinations} onSelect={setActiveDestinationId} />
          </div> */}
        {/* </div> */}
      </section>

      <section className="bg-cream py-20 sm:py-28" id="tentang">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <div><p className="section-kicker">Pengenalan</p><h2 className="section-title mt-4">Ruang pengantar untuk Gunung Rinjani</h2></div>
          <div className="rounded-3xl border border-forest/10 bg-white p-7 sm:p-10">
            <p className="text-lg leading-8 text-charcoal/80">Bagian ini disiapkan untuk pengenalan Rinjani yang ditinjau dan disetujui oleh tim. Saat ini, kami belum menampilkan narasi faktual, rute, atau klaim wisata yang belum diverifikasi.</p>
            <p className="mt-6 text-sm font-medium text-terracotta">Konten editorial menunggu verifikasi.</p>
          </div>
        </div>
      </section>

      <section className="bg-forest py-20 text-white sm:py-28" id="pengalaman">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="section-kicker text-terracotta">Pengalaman</p>
          <div className="mt-4 flex max-w-3xl flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">Dari inspirasi menuju persiapan yang lebih terarah.</h2>
            <p className="max-w-md leading-7 text-white/75">Area ini membangun ritme editorial untuk konten pengalaman yang akan disediakan dan diverifikasi oleh tim.</p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {experiencePlaceholders.map((title, index) => (
              <article className="rounded-3xl border border-white/15 bg-white/5 p-7" key={title}>
                <p className="text-sm font-semibold text-terracotta">0{index + 1}</p><h3 className="mt-12 text-2xl font-semibold">{title}</h3>
                <p className="mt-3 leading-7 text-white/70">Placeholder struktur konten. Visual dan informasi final akan diisi setelah aset serta naskah terverifikasi tersedia.</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-20 sm:py-28" id="galeri-destinasi">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl"><p className="section-kicker">Jelajahi</p><h2 className="section-title mt-4">Tujuh destinasi, menunggu cerita yang tepat.</h2><p className="mt-4 leading-7 text-charcoal/75">Galeri telah siap secara struktur. Nama, deskripsi, dan media akan ditambahkan hanya setelah setiap destinasi diverifikasi.</p></div>
            <div aria-label="Kontrol galeri" className="flex gap-2">
              <button aria-label="Lihat kartu sebelumnya" className="gallery-control" onClick={() => moveGallery("previous")} type="button">←</button>
              <button aria-label="Lihat kartu berikutnya" className="gallery-control" onClick={() => moveGallery("next")} type="button">→</button>
            </div>
          </div>
          <div className="scrollbar-hidden mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4" ref={galleryRef}>
            {landingDestinations.map((destination, index) => (
              <article className="flex min-h-96 w-[82%] shrink-0 snap-start flex-col justify-end rounded-3xl bg-deep-green p-6 text-white sm:w-[48%] lg:w-[31%]" key={destination.id}>
                <p className="text-sm font-semibold tracking-[0.18em] text-terracotta uppercase">Placeholder 0{index + 1}</p><h3 className="mt-auto font-display text-3xl font-semibold">{destination.selectorLabel}</h3><p className="mt-3 leading-7 text-white/75">Nama, visual, dan deskripsi menunggu verifikasi.</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28" id="faq">
        <div className="mx-auto max-w-3xl px-5 sm:px-8"><p className="section-kicker">FAQ</p><h2 className="section-title mt-4">Informasi akan diperbarui bersama konten final.</h2>
          <div className="mt-10 divide-y divide-forest/10 rounded-3xl border border-forest/10">
            {["Kapan detail destinasi tersedia?", "Apakah informasi perjalanan sudah final?"].map((question) => (<details className="group px-6 py-5" key={question}><summary className="cursor-pointer list-none font-semibold text-forest">{question}</summary><p className="mt-3 leading-7 text-charcoal/75">Informasi akan ditampilkan setelah materi dan fakta terkait telah diverifikasi oleh tim.</p></details>))}
          </div>
        </div>
      </section>

      <footer className="bg-charcoal py-12 text-white" id="kontak"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-5 sm:px-8 md:flex-row md:items-end"><div><p className="font-display text-2xl font-semibold">Seven Summit Rinjani</p><p className="mt-2 max-w-sm text-sm leading-6 text-white/65">An outdoor exploration concept in development.</p></div><p className="text-sm text-white/55">Kontak dan tautan sosial akan ditambahkan saat tersedia.</p></div></footer>
    </>
  );
}

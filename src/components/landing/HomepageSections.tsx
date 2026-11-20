import { useMemo, useState } from "react";
import { Link } from "react-router";

import { assetPaths } from "../../config/assets";
import { destinations } from "../../data/destinations";
import { useLanguage } from "../../i18n/LanguageProvider";
import { localizeDestination } from "../../i18n/destinationTranslations";

const difficultyOptions = ["Pemula", "Menengah", "Ekstrem"] as const;
const durationOptions = ["Day Hike/Tektok", "Camping 2H1M", "Ekspedisi"] as const;
const trailStatusOptions = ["Buka", "Tutup"] as const;
const recommendations = ["Semua", "Puncak tertinggi", "Pemula", "Tantangan"] as const;

function altitudeValue(altitude: string) {
  const match = altitude.match(/[\d.]+/);
  return match ? Number(match[0].replaceAll(".", "")) : null;
}

function matchesDifficulty(difficulty: string | undefined, category: string) {
  if (!difficulty) return false;
  const value = difficulty.toLocaleLowerCase("id");
  if (category === "Pemula") return value.includes("mudah");
  if (category === "Menengah") return value.includes("menengah");
  return value.includes("ekstrem");
}

function shortDifficultyLabel(difficulty: string | undefined, language: "ID" | "EN", t: ReturnType<typeof useLanguage>["t"]) {
  if (!difficulty) return t("explore.infoSoon");
  const value = difficulty.toLocaleLowerCase(language === "ID" ? "id" : "en");
  if (value.includes("ekstrem") || value.includes("extreme")) return t("explore.difficulty.extreme");
  if ((value.includes("mudah") || value.includes("easy")) && (value.includes("menengah") || value.includes("moderate"))) return t("explore.difficulty.easyMedium");
  if (value.includes("mudah") || value.includes("easy")) return t("explore.difficulty.beginner");
  return t("explore.difficulty.medium");
}

function matchesDuration(duration: string | undefined, category: string) {
  if (!duration) return false;
  const value = duration.toLocaleLowerCase("id");
  const isMultiDay = /minimal|min\.?\s*2\s*hari|lebih dari 1 hari|ekspedisi/.test(value);
  if (category === "Camping 2H1M") return /camping|berkemah|2\s*hari\s*1\s*malam|2h1m/.test(value);
  if (category === "Ekspedisi") return isMultiDay;
  return !isMultiDay || /\d[,.]?\d?\s*(hingga|sampai|[-–])\s*\d+\s*jam/.test(value);
}

function createDemoTrailStatuses() {
  const shuffled = [...destinations];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }
  return Object.fromEntries(shuffled.map((destination, index) => [destination.slug, index < 4 ? "Buka" : "Tutup"]));
}

type HomepageSectionsProps = {
  aboutAndFooterOnly?: boolean;
  exploreOnly?: boolean;
};

export function HomepageSections({ aboutAndFooterOnly = false, exploreOnly = false }: HomepageSectionsProps) {
  const { language, t, formatNumber } = useLanguage();
  const [query, setQuery] = useState("");
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [selectedTrailStatuses, setSelectedTrailStatuses] = useState<string[]>([]);
  const [demoTrailStatuses] = useState(createDemoTrailStatuses);
  const [minimumAltitude, setMinimumAltitude] = useState(1000);
  const [maximumAltitude, setMaximumAltitude] = useState(4000);
  const [recommendation, setRecommendation] = useState<string>("Semua");
  const highestAltitudeIds = useMemo(() => [...destinations]
    .sort((first, second) => (altitudeValue(second.altitude) ?? 0) - (altitudeValue(first.altitude) ?? 0))
    .slice(0, 3)
    .map((destination) => destination.id), []);

  const filteredDestinations = useMemo(() => destinations.filter((destination) => {
    const trailStatus = demoTrailStatuses[destination.slug];
    const localized = localizeDestination(destination, language);
    const visibleStatus = language === "EN" ? (trailStatus === "Buka" ? "Open" : "Closed") : trailStatus;
    const searchable = `${destination.name} ${localized.shortDescription} ${localized.location} ${destination.altitude} ${localized.difficulty ?? ""} ${localized.estimatedDuration ?? ""} ${visibleStatus}`.toLocaleLowerCase(language === "ID" ? "id" : "en");
    if (query.trim() && !searchable.includes(query.trim().toLocaleLowerCase(language === "ID" ? "id" : "en"))) return false;
    const altitude = altitudeValue(destination.altitude);
    if (altitude !== null && (altitude < minimumAltitude || altitude > maximumAltitude)) return false;
    if (selectedDifficulties.length && !selectedDifficulties.some((item) => matchesDifficulty(destination.difficulty, item))) return false;
    if (selectedDurations.length && !selectedDurations.some((item) => matchesDuration(destination.estimatedDuration, item))) return false;
    if (selectedTrailStatuses.length && !selectedTrailStatuses.includes(trailStatus)) return false;
    if (recommendation === "Puncak tertinggi" && !highestAltitudeIds.includes(destination.id)) return false;
    if (recommendation === "Pemula" && !matchesDifficulty(destination.difficulty, "Pemula")) return false;
    if (recommendation === "Tantangan" && !/(menengah|menantang|curam|ekstrem)/.test(destination.difficulty?.toLocaleLowerCase("id") ?? "")) return false;
    return true;
  }), [demoTrailStatuses, highestAltitudeIds, language, maximumAltitude, minimumAltitude, query, recommendation, selectedDifficulties, selectedDurations, selectedTrailStatuses]);

  const toggleSelection = (value: string, selection: string[], update: (next: string[]) => void) => {
    update(selection.includes(value) ? selection.filter((item) => item !== value) : [...selection, value]);
  };

  return (
    <>
      {!exploreOnly ? <section className="transition-section relative overflow-hidden bg-forest px-6 py-20 text-cream sm:px-10 sm:py-28">
        <div aria-hidden="true" className="transition-contour" />
        <div className="relative mx-auto max-w-6xl">
          <p className="section-kicker text-terracotta">{t("explore.next")}</p>
          <div className="mt-4 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div><h2 className="font-display text-3xl font-semibold leading-tight sm:text-5xl">{t("explore.nextHeading")}</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-cream/80 sm:text-base">{t("explore.nextCopy")}</p></div>
            <Link className="inline-flex min-h-12 items-center justify-center rounded-full bg-terracotta px-6 font-semibold text-white transition hover:bg-terracotta/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white" to="/explore">{t("explore.start")} <span aria-hidden="true" className="ml-2">↓</span></Link>
          </div>
        </div>
      </section> : null}

      {!aboutAndFooterOnly ? <section aria-labelledby="explore-title" className="explore-section scroll-mt-24 bg-[#f7f4eb] px-5 py-10 text-charcoal sm:px-8 sm:py-14 lg:px-12 lg:py-16" id="explore">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div><h2 className="font-sans text-3xl font-extrabold tracking-tight text-forest sm:text-5xl" id="explore-title">{t("explore.heading")}</h2><p className="mt-3 max-w-3xl text-sm leading-6 sm:text-base">{t("explore.intro")}</p></div>
            <label className="explore-search"><span className="sr-only">{t("explore.search.label")}</span><input onChange={(event) => setQuery(event.target.value)} placeholder={t("explore.search.placeholder")} type="search" value={query} /><span aria-hidden="true">⌕</span></label>
          </div>
          <div className="mt-4 flex flex-col gap-2 lg:ml-auto lg:w-[calc(75%-1.5rem)] lg:flex-row lg:items-center lg:justify-between">
            <p className="text-sm">{t('explore.quick.label') + ':'}</p>
            <div aria-label={t("explore.quick.label")} className="flex flex-wrap gap-1.5">
              {recommendations.map((item) => <button aria-pressed={recommendation === item} className={`rounded-full px-4 py-2 text-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta ${recommendation === item ? "bg-forest text-white" : "text-charcoal hover:bg-forest/10"}`} key={item} onClick={() => setRecommendation(item)} type="button">{item === "Semua" ? t("explore.quick.all") : item === "Puncak tertinggi" ? t("explore.quick.highest") : item === "Pemula" ? t("explore.quick.beginner") : t("explore.quick.challenge")}</button>)}
            </div>
          </div>
          <div className="mt-5 grid gap-4 lg:grid-cols-[14rem_minmax(0,1fr)]">
            <aside aria-label={t("explore.filter.search")} className="explore-filters">
              <h3 className="border-b border-forest/15 pb-3 text-lg font-bold">{t('explore.filter.heading')}</h3>
              <fieldset className="explore-filter-group"><legend>{t("explore.filter.difficulty")}</legend>{difficultyOptions.map((item) => <label key={item}><input checked={selectedDifficulties.includes(item)} onChange={() => toggleSelection(item, selectedDifficulties, setSelectedDifficulties)} type="checkbox" />{item === "Pemula" ? t("explore.quick.beginner") : item === "Menengah" ? t("explore.difficulty.medium") : t("explore.difficulty.extreme")}</label>)}</fieldset>
              <fieldset className="explore-filter-group"><legend>{t("explore.filter.duration")}</legend>{durationOptions.map((item) => <label key={item}><input checked={selectedDurations.includes(item)} onChange={() => toggleSelection(item, selectedDurations, setSelectedDurations)} type="checkbox" />{item === "Day Hike/Tektok" ? t("explore.duration.dayHike") : item === "Camping 2H1M" ? t("explore.duration.camping") : t("explore.duration.expedition")}</label>)}</fieldset>
              <fieldset className="explore-filter-group"><legend>{t("explore.filter.altitude")}</legend><div className="explore-range-controls"><input aria-label={t("explore.filter.minAltitude")} max={maximumAltitude - 100} min="1000" onChange={(event) => setMinimumAltitude(Number(event.target.value))} step="100" type="range" value={minimumAltitude} /><input aria-label={t("explore.filter.maxAltitude")} max="4000" min={minimumAltitude + 100} onChange={(event) => setMaximumAltitude(Number(event.target.value))} step="100" type="range" value={maximumAltitude} /></div><div className="explore-range-labels"><span>{formatNumber(minimumAltitude)} m a.s.l.</span><span>{formatNumber(maximumAltitude)} m a.s.l.</span></div></fieldset>
              <fieldset className="explore-filter-group"><legend>{t("explore.filter.trail")}</legend>{trailStatusOptions.map((status) => <label key={status}><input checked={selectedTrailStatuses.includes(status)} onChange={() => toggleSelection(status, selectedTrailStatuses, setSelectedTrailStatuses)} type="checkbox" />{status === "Buka" ? t("explore.trail.open") : t("explore.trail.closed")}</label>)}<p>{t("explore.trail.note")}</p></fieldset>
            </aside>
            <div className="min-w-0">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3"><h3 className="text-xl font-bold">{t("explore.cards.heading")}</h3><span aria-live="polite" className="text-sm text-charcoal/65">{formatNumber(filteredDestinations.length)} {t("explore.destinationCount")}</span></div>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {filteredDestinations.map((destination) => {
                  const trailStatus = demoTrailStatuses[destination.slug];
                  const displayDestination = localizeDestination(destination, language);
                  return <article className="explore-card" key={destination.id}>
                  <div className="explore-card-image-wrap"><img alt={`${language === "ID" ? "Pemandangan" : "View of"} ${destination.name}`} className="explore-card-image" loading="lazy" onError={(event) => { event.currentTarget.style.visibility = "hidden"; }} src={destination.cardImage} /></div>
                  <div className="explore-card-content">
                    <h4 className="font-display text-lg font-semibold leading-tight text-charcoal">{destination.name}</h4>
                    <span className="explore-card-altitude">{destination.altitude}</span>
                    <div className="explore-card-labels">
                      <span className={`difficulty-label difficulty-${matchesDifficulty(destination.difficulty, "Pemula") ? "beginner" : matchesDifficulty(destination.difficulty, "Ekstrem") ? "extreme" : "medium"}`}>{shortDifficultyLabel(displayDestination.difficulty, language, t)}</span>
                      <span className="duration-label">{displayDestination.estimatedDurationLabel ?? t("explore.estimatedSoon")}</span>
                      <span aria-label={`${t("explore.trail.aria")}: ${trailStatus === "Buka" ? t("explore.trail.open") : t("explore.trail.closed")}`} className={`trail-status-label ${trailStatus === "Buka" ? "trail-status-open" : "trail-status-closed"}`}>{t("explore.trail.label")}: {trailStatus === "Buka" ? t("explore.trail.open") : t("explore.trail.closed")} · {t("explore.demo")}</span>
                    </div>
                    <div className="explore-card-actions"><Link className="explore-detail-button" to={`/destinations/${destination.slug}`}>{t('explore.detail')}</Link><Link className="explore-booking-button" to={`/booking/${destination.slug}`}>{t('explore.book')}</Link></div>
                  </div>
                </article>;
                })}
              </div>
              {filteredDestinations.length === 0 ? <p className="rounded-2xl border border-forest/15 bg-white p-8 text-center text-sm">{t('explore.empty')}</p> : null}
            </div>
          </div>
        </div>
      </section> : null}

      {!exploreOnly ? <>
      <section aria-labelledby="about-title" className="bg-cream px-6 py-20 sm:px-10 sm:py-28" id="about">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-center"><div className="about-image-wrap"><img alt="Lanskap pegunungan di kawasan Sembalun" className="h-full w-full object-cover" loading="lazy" src={destinations[0].backgroundImage} /></div><div><p className="section-kicker">Tentang kami</p><h2 className="section-title mt-3" id="about-title">Mengenal Seven Summit Rinjani</h2><p className="mt-5 text-sm leading-7 text-charcoal/75 sm:text-base">Seven Summit Rinjani mengajak kamu mengenal ragam lanskap dan pengalaman alam di kawasan Sembalun, Lombok. Setiap destinasi memiliki karakter dan daya tariknya sendiri—mulai dari suasana perbukitan hingga panorama pegunungan—yang memberi banyak cara untuk menikmati perjalanan di alam terbuka.</p><p className="mt-3 text-sm leading-7 text-charcoal/75 sm:text-base">Melalui website ini, kamu dapat melihat pengenalan destinasi, membaca informasi yang tersedia, dan menemukan inspirasi untuk merencanakan petualangan sesuai minatmu. Ingin mulai memilih tujuan? Jelajahi destinasi Seven Summit Rinjani dan temukan tempat yang ingin kamu kenal lebih dekat.</p><Link className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-terracotta px-6 font-semibold text-white transition hover:bg-terracotta/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest" to="/explore">Jelajahi Destinasi</Link></div></div>
      </section>

      <section aria-labelledby="contact-title" className="bg-deep-green px-6 py-16 text-white sm:px-10 sm:py-20" id="contact">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start"><div><p className="section-kicker text-cream/75">Hubungi kami</p><h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl" id="contact-title">Ada yang ingin ditanyakan?</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-white/80">Kirim pertanyaan melalui formulir demo ini. Pesan tidak dikirim ke layanan atau alamat kontak sungguhan.</p></div><form className="grid gap-4 rounded-2xl border border-white/15 bg-white/5 p-5 sm:p-7" onSubmit={(event) => event.preventDefault()}><label className="grid gap-1.5 text-sm font-medium" htmlFor="contact-name">Nama<input autoComplete="name" className="contact-form-field" id="contact-name" name="name" placeholder="Nama kamu" required /></label><div className="grid gap-4 sm:grid-cols-2"><label className="grid gap-1.5 text-sm font-medium" htmlFor="contact-email">Email<input autoComplete="email" className="contact-form-field" id="contact-email" name="email" placeholder="nama@email.com" required type="email" /></label><label className="grid gap-1.5 text-sm font-medium" htmlFor="contact-phone">Nomor telepon<input autoComplete="tel" className="contact-form-field" id="contact-phone" name="phone" placeholder="08xxxxxxxxxx" required type="tel" /></label></div><label className="grid gap-1.5 text-sm font-medium" htmlFor="contact-question">Pertanyaan<textarea className="contact-form-field min-h-32 resize-y" id="contact-question" name="question" placeholder="Tuliskan pertanyaan kamu" required rows={4} /></label><div><button className="inline-flex min-h-12 items-center justify-center rounded-full bg-terracotta px-6 font-semibold text-white transition hover:bg-terracotta/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white" type="submit">Kirim Pertanyaan (Demo)</button></div></form></div>
      </section>

      <footer className="bg-charcoal px-6 py-8 text-white sm:px-10"><div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><a aria-label="Seven Summit Rinjani, ke bagian atas" className="inline-flex w-fit rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white" href="#konten-utama"><img alt="Seven Summit Rinjani" className="h-12 w-auto object-contain" src={assetPaths.logoLight} /></a><nav aria-label="Navigasi footer" className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/75">{aboutAndFooterOnly ? <><a className="hover:text-white" href="#about">About Us</a><a className="hover:text-white" href="#contact">Contact</a></> : <><a className="hover:text-white" href="#explore">Jelajah</a><a className="hover:text-white" href="#about">Tentang</a><a className="hover:text-white" href="#contact">Kontak</a></>}</nav><p className="text-xs text-white/60">© {new Date().getFullYear()} Seven Summit Rinjani · Demo</p></div></footer>
      </> : null}
    </>
  );
}

import { useEffect, useState } from "react";
import { Link } from "react-router";

import { destinations } from "../data/destinations";
import { useLanguage } from "../i18n/LanguageProvider";
import { localizeDestination } from "../i18n/destinationTranslations";
import {
  bookingHistoryChangedEvent,
  formatRupiah,
  readBookingHistory,
  type PaymentSuccessSummary,
} from "../data/demoPayment";

function BookingHistoryCard({ summary }: { summary: PaymentSuccessSummary }) {
  const { language, t, formatDate, formatDateTime, formatCurrency } = useLanguage();
  const booking = summary.booking;
  const destination = destinations.find((item) => item.slug === booking.destinationSlug);
  const displayDestination = destination ? localizeDestination(destination, language) : undefined;
  const durationLabel = booking.durationOption === "camping-2d1n"
    ? t("booking.package.camping")
    : booking.durationOption === "day-hike"
      ? (displayDestination?.estimatedDuration ?? "").split(/\s*\((?:atau|or)/i)[0].trim().replace(/[.]$/, "")
      : displayDestination?.estimatedDuration ?? t("common.unavailable");

  return (
    <article className="booking-history-card">
      <div className="booking-history-card-heading">
        <div>
          <p className="section-kicker">{t("history.reference")}</p>
          <strong className="booking-history-reference">{summary.reference}</strong>
        </div>
        <span className="booking-history-status">{t("history.status")}</span>
      </div>

      <div className="booking-history-destination">
        {destination ? <img alt={`${language === "ID" ? "Pemandangan" : "View of"} ${destination.name}`} loading="lazy" src={destination.cardImage} onError={(event) => {
          event.currentTarget.src = destination.backgroundImage;
        }} /> : null}
        <div>
          <p className="section-kicker">{t("history.destination")}</p>
          <h2>{destination?.name ?? "Destinasi tidak tersedia"}</h2>
          <p>{formatDate(booking.departureDate)} · {booking.participantCount} {t("common.hikers")}</p>
        </div>
        <strong className="booking-history-total">{formatCurrency(summary.total)}</strong>
      </div>

      <details className="booking-history-details">
        <summary>{t("history.details")}</summary>
        <div className="booking-history-detail-grid">
          <section>
            <h3>{t("history.customer")}</h3>
            <dl>
              <div><dt>{t("history.name")}</dt><dd>{booking.fullName}</dd></div>
              <div><dt>Email</dt><dd>{booking.email}</dd></div>
              <div><dt>{t("history.phone")}</dt><dd>{booking.phone}</dd></div>
              {booking.identityNumber ? <div><dt>{t("history.identity")}</dt><dd>{booking.identityNumber}</dd></div> : null}
            </dl>
          </section>
          <section>
            <h3>{t("history.trip")}</h3>
            <dl>
              <div><dt>{t("history.date")}</dt><dd>{formatDate(booking.departureDate)}</dd></div>
              <div><dt>{t("history.duration")}</dt><dd>{durationLabel}</dd></div>
              <div><dt>{t("history.participants")}</dt><dd>{booking.participantCount} {t("common.hikers")}</dd></div>
              <div><dt>{t("booking.guide.label")}</dt><dd>{booking.guideCount === 0 ? t("booking.noGuide") : `${booking.guideCount} ${t("booking.guide.label")}`}</dd></div>
            </dl>
            {booking.members.length ? <div className="booking-history-member-list"><h4>{t("history.members")}</h4><ul>{booking.members.map((member, index) => <li key={`${member.name}-${index}`}>{t("history.hiker")} {index + 2}: {member.name || t("history.member.empty")}</li>)}</ul></div> : null}
            {booking.notes ? <div className="booking-history-notes"><h4>{t("history.notes")}</h4><p>{booking.notes}</p></div> : null}
          </section>
          <section>
            <h3>{t("history.payment")}</h3>
            <dl>
              <div><dt>{t("checkout.trip")}</dt><dd>{formatCurrency(summary.tripSubtotal)}</dd></div>
              {booking.guideCount > 0 ? <div><dt>{t("checkout.guide")}</dt><dd>{formatCurrency(summary.guideSubtotal)}</dd></div> : null}
              <div><dt>{t("history.method")}</dt><dd>{t(summary.paymentMethod === "bank-transfer" ? "booking.payment.bank" : summary.paymentMethod === "qris" ? "booking.payment.qris" : "booking.payment.wallet")}</dd></div>
              <div><dt>{t("history.confirmedAt")}</dt><dd>{formatDateTime(summary.paidAt)}</dd></div>
              <div><dt>{t("history.status.label")}</dt><dd>{t("history.simulated")}</dd></div>
              <div className="booking-history-detail-total"><dt>{t("history.total")}</dt><dd>{formatCurrency(summary.total)}</dd></div>
            </dl>
          </section>
        </div>
        <p className="booking-history-disclaimer">{t("history.disclaimer")}</p>
      </details>
    </article>
  );
}

export function BookingHistoryPage() {
  const { t, formatDate, formatDateTime, formatCurrency } = useLanguage();
  const [history, setHistory] = useState(readBookingHistory);

  useEffect(() => {
    const refresh = () => setHistory(readBookingHistory());
    window.addEventListener(bookingHistoryChangedEvent, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(bookingHistoryChangedEvent, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return (
    <article className="booking-history-page" aria-labelledby="booking-history-title">
      <header className="booking-history-heading">
        <p className="section-kicker">{t("history.kicker")}</p>
        <h1 className="section-title" id="booking-history-title">{t("history.title")}</h1>
        <p>{t("history.copy")}</p>
      </header>

      {history.length ? <div aria-label={`${history.length} ${t("history.count.aria")}`} className="booking-history-list">
        {history.map((summary) => <BookingHistoryCard key={summary.reference} summary={summary} />)}
      </div> : <section className="booking-history-empty">
        <span aria-hidden="true" className="booking-history-empty-icon"><svg fill="none" viewBox="0 0 48 48"><path d="M15 9h18a3 3 0 0 1 3 3v27l-12-7-12 7V12a3 3 0 0 1 3-3Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="2.5" /></svg></span>
        <h2>{t("history.empty.title")}</h2>
        <p>{t("history.empty.copy")}</p>
        <Link className="detail-button detail-button-primary" to="/explore">{t("history.explore")}</Link>
      </section>}
    </article>
  );
}




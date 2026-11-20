import { useLayoutEffect, useState } from "react";
import { Link } from "react-router";

import { BookingProgressHeader } from "../components/layout/BookingProgressHeader";
import { destinations } from "../data/destinations";
import { useLanguage } from "../i18n/LanguageProvider";
import { localizeDestination } from "../i18n/destinationTranslations";
import {
  bookingStorageKey,
  demoGuidePrice,
  demoTripPricePerParticipant,
  paymentSuccessSchema,
  paymentSuccessStorageKey,
} from "../data/demoPayment";

function loadPaymentSummary() {
  try {
    const stored = window.sessionStorage.getItem(paymentSuccessStorageKey);
    if (!stored) return null;
    const result = paymentSuccessSchema.safeParse(JSON.parse(stored));
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}

export function PaymentSuccessPage() {
  const { language, t, formatDate, formatDateTime, formatCurrency } = useLanguage();
  const [summary] = useState(loadPaymentSummary);
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const destination = summary
    ? destinations.find((item) => item.slug === summary.booking.destinationSlug)
    : undefined;
  const displayDestination = destination ? localizeDestination(destination, language) : undefined;

  const clearDemoPayment = () => {
    try {
      window.sessionStorage.removeItem(paymentSuccessStorageKey);
      window.sessionStorage.removeItem(bookingStorageKey);
    } catch {
      // Continue to the Homepage even if browser storage is unavailable.
    }
  };

  if (!summary || !destination) {
    return (
      <>
        <BookingProgressHeader activeStep={5} closeTo="/home" />
        <article className="payment-success-page" aria-labelledby="payment-success-missing-title">
          <section className="payment-success-card payment-success-missing">
            <span aria-hidden="true" className="payment-success-icon"><svg fill="none" viewBox="0 0 48 48"><path d="M24 13v15m0 7h.02" stroke="currentColor" strokeLinecap="round" strokeWidth="4" /></svg></span>
            <p className="section-kicker">{t("success.missing.title")}</p>
            <h1 className="section-title mt-3" id="payment-success-missing-title">{t("success.missing.title")}</h1>
            <p>{t("success.missing.copy")}</p>
            <Link className="detail-button detail-button-primary focused-page-cta payment-success-home-link" onClick={clearDemoPayment} to="/home">{t("success.home")}</Link>
          </section>
        </article>
      </>
    );
  }

  const booking = summary.booking;
  const durationLabel = booking.durationOption === "camping-2d1n"
    ? t("booking.package.camping")
    : booking.durationOption === "day-hike"
      ? (displayDestination?.estimatedDuration ?? "").split(/\s*\((?:atau|or)/i)[0].trim().replace(/[.]$/, "")
      : displayDestination?.estimatedDuration ?? t("common.unavailable");

  return (
    <>
    <BookingProgressHeader activeStep={5} closeTo="/home" />
    <article className="payment-success-page" aria-labelledby="payment-success-title">
      <div className="payment-success-layout">
      <div className="payment-success-main">
      <header className="payment-success-heading">
        <span aria-hidden="true" className="payment-success-icon"><svg fill="none" viewBox="0 0 48 48"><path d="m13 25 7.2 7L35 17" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" /></svg></span>
        <p className="section-kicker">{t("success.status")}</p>
        <h1 className="section-title mx-auto mt-3" id="payment-success-title">{t("success.title")}</h1>
        <p>{t("success.copy")}</p>
      </header>

      <section className="payment-success-card" aria-label={t("success.cardLabel")}>
        <div className="payment-success-card-top">
          <div><p className="section-kicker">{t("success.reference")}</p><strong>{summary.reference}</strong></div>
          <span className="payment-success-status">{t("history.status")}</span>
        </div>

        <div className="payment-success-destination">
          <img alt={`${language === "ID" ? "Pemandangan" : "View of"} ${destination.name}`} className="payment-success-image" loading="eager" src={destination.cardImage} onError={(event) => {
            if (event.currentTarget.src !== new URL(destination.backgroundImage, window.location.href).href) {
              event.currentTarget.src = destination.backgroundImage;
              return;
            }
            event.currentTarget.hidden = true;
          }} />
          <div><p className="section-kicker">{t("success.destination")}</p><h2>{destination.name}</h2></div>
        </div>

        <div className="payment-success-details">
          <section aria-labelledby="payment-success-trip-title">
            <h3 id="payment-success-trip-title">{t("success.tripDetails")}</h3>
            <dl>
              <div><dt>{t("success.customer")}</dt><dd>{booking.fullName}</dd></div>
              <div><dt>Email</dt><dd>{booking.email}</dd></div>
              <div><dt>{t("history.phone")}</dt><dd>{booking.phone}</dd></div>
              <div><dt>{t("success.date")}</dt><dd>{formatDate(booking.departureDate)}</dd></div>
              <div><dt>{t("history.duration")}</dt><dd>{durationLabel || t("common.unavailable")}</dd></div>
              <div><dt>{t("success.tripType")}</dt><dd>{booking.tripType === "solo" ? t("success.solo") : t("success.group")}</dd></div>
              <div><dt>{t("success.participants")}</dt><dd>{booking.participantCount} {t("common.person")}</dd></div>
              <div><dt>{t("booking.guide.label")}</dt><dd>{booking.guideCount === 0 ? t("booking.noGuide") : `${booking.guideCount} ${t("booking.guide.label")}`}</dd></div>
            </dl>
            {booking.members.length ? <div className="payment-success-members"><h4>{t("success.memberDetails")}</h4><ul>{booking.members.map((member, index) => <li key={`${member.name}-${index}`}>{t("success.hiker")} {index + 2}: {member.name || t("success.member.missing")}</li>)}</ul></div> : null}
            {booking.notes ? <div className="payment-success-notes"><h4>{t("success.notes")}</h4><p>{booking.notes}</p></div> : null}
          </section>

          <section aria-labelledby="payment-success-cost-title">
            <h3 id="payment-success-cost-title">{t("success.costs")}</h3>
            <dl className="payment-success-costs">
              <div><dt>{t("checkout.trip")} ({booking.participantCount} × {formatCurrency(demoTripPricePerParticipant)})</dt><dd>{formatCurrency(summary.tripSubtotal)}</dd></div>
              {booking.guideCount > 0 ? <div><dt>{t("checkout.guide")} ({booking.guideCount} × {formatCurrency(demoGuidePrice)})</dt><dd>{formatCurrency(summary.guideSubtotal)}</dd></div> : null}
              <div><dt>{t("success.paymentMethod")}</dt><dd>{t(summary.paymentMethod === "bank-transfer" ? "booking.payment.bank" : summary.paymentMethod === "qris" ? "booking.payment.qris" : "booking.payment.wallet")}</dd></div>
              <div><dt>{t("success.confirmedAt")}</dt><dd>{formatDateTime(summary.paidAt)}</dd></div>
              <div className="payment-success-total"><dt>{t("success.total")}</dt><dd>{formatCurrency(summary.total)}</dd></div>
            </dl>
          </section>
        </div>

        <p className="payment-success-disclaimer">{t("success.disclaimer")}</p>
      </section>

      <Link className="detail-button detail-button-primary focused-page-cta payment-success-home-link" onClick={clearDemoPayment} to="/home">{t("success.home")}</Link>
      </div>
      </div>
    </article>
    </>
  );
}

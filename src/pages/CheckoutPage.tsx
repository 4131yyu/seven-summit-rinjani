import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";

import {
  bookingStorageKey,
  demoGuidePrice,
  demoTripPricePerParticipant,
  formatRupiah,
  paymentSuccessSchema,
  paymentSuccessStorageKey,
  saveBookingHistory,
  storedBookingSchema,
  type PaymentMethod,
  type StoredBooking,
} from "../data/demoPayment";
import { destinations } from "../data/destinations";
import { useLanguage } from "../i18n/LanguageProvider";
import { localizeDestination } from "../i18n/destinationTranslations";

const paymentMethods: { value: PaymentMethod; titleKey: "booking.payment.bank" | "booking.payment.qris" | "booking.payment.wallet"; descriptionKey: "booking.payment.bank.copy" | "booking.payment.qris.copy" | "booking.payment.wallet.copy" }[] = [
  { value: "bank-transfer", titleKey: "booking.payment.bank", descriptionKey: "booking.payment.bank.copy" },
  { value: "qris", titleKey: "booking.payment.qris", descriptionKey: "booking.payment.qris.copy" },
  { value: "ewallet", titleKey: "booking.payment.wallet", descriptionKey: "booking.payment.wallet.copy" },
];

function loadStoredBooking(): StoredBooking | null {
  try {
    const saved = window.sessionStorage.getItem(bookingStorageKey);
    if (!saved) return null;
    const parsed: unknown = JSON.parse(saved);
    const result = storedBookingSchema.safeParse(parsed);
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}

export function CheckoutPage() {
  const { language, t, formatDate, formatCurrency } = useLanguage();
  const navigate = useNavigate();
  const [booking] = useState(loadStoredBooking);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const successDialogRef = useRef<HTMLElement | null>(null);
  const destination = booking
    ? destinations.find((item) => item.slug === booking.destinationSlug)
    : undefined;
  const displayDestination = destination ? localizeDestination(destination, language) : undefined;
  const tripTotal = booking ? booking.participantCount * demoTripPricePerParticipant : 0;
  const guideTotal = booking ? booking.guideCount * demoGuidePrice : 0;
  const total = tripTotal + guideTotal;

  useEffect(() => {
    if (!showConfirmation) return;

    successDialogRef.current?.focus();
    const redirectTimer = window.setTimeout(() => {
      navigate("/payment/success", { replace: true });
    }, 3600);

    return () => window.clearTimeout(redirectTimer);
  }, [navigate, showConfirmation]);

  const returnHref = booking ? `/booking/${booking.destinationSlug}` : "/#explore";

  const goToSuccessPage = () => navigate("/payment/success", { replace: true });

  const startPaymentConfirmation = () => {
    if (!booking || !paymentMethod) return;
    const successSummary = {
      booking,
      paymentMethod,
      tripSubtotal: tripTotal,
      guideSubtotal: guideTotal,
      total,
      reference: `DEMO-${Date.now().toString(36).toUpperCase()}`,
      paidAt: new Date().toISOString(),
      status: "SIMULATED" as const,
    };
    const validation = paymentSuccessSchema.safeParse(successSummary);
    if (!validation.success) {
      setPaymentError(t("booking.error.summary"));
      return;
    }

    try {
      window.sessionStorage.setItem(paymentSuccessStorageKey, JSON.stringify(validation.data));
      if (!saveBookingHistory(validation.data)) {
        window.sessionStorage.removeItem(paymentSuccessStorageKey);
        setPaymentError(t("booking.error.history"));
        return;
      }
      setPaymentError("");
      setShowConfirmation(true);
    } catch {
      setPaymentError(t("booking.error.session"));
    }
  };

  if (!booking || !destination) {
    return (
      <article className="checkout-page" aria-labelledby="checkout-missing-title">
        <div className="focused-route-header"><Link aria-label={t("checkout.backExplore")} className="focused-route-back" to="/#explore"><span aria-hidden="true">←</span> {t("checkout.backExplore")}</Link></div>
        <section className="checkout-missing-card">
          <p className="section-kicker">{t("checkout.demo")}</p>
          <h1 className="section-title mt-3" id="checkout-missing-title">{t("checkout.missing.title")}</h1>
          <p>{t("checkout.missing.copy")}</p>
          <Link className="detail-button detail-button-primary focused-page-cta" to="/#explore">{t("checkout.backExplore")}</Link>
        </section>
      </article>
    );
  }

  const selectedDuration = displayDestination?.estimatedDuration
    ? booking.durationOption === "camping-2d1n"
      ? t("booking.package.camping")
      : booking.durationOption === "day-hike"
        ? displayDestination.estimatedDuration.split(/\s*\((?:atau|or)/i)[0].trim().replace(/[.]$/, "")
        : displayDestination.estimatedDuration
    : t("common.unavailable");

  return (
    <article className="checkout-page" aria-labelledby="checkout-title">
      <div className="focused-route-header">
        <Link aria-label={t("checkout.backBooking")} className="focused-route-back" to={returnHref}>
          <span aria-hidden="true">←</span> {t("checkout.backBooking")}
        </Link>
      </div>

      <header className="checkout-heading">
        <p className="section-kicker">{t("checkout.demo")}</p>
        <h1 className="section-title mx-auto mt-3" id="checkout-title">{t("checkout.title")}</h1>
        <p>{t("checkout.copy")}</p>
      </header>

      <div className="checkout-layout">
        <section className="checkout-card checkout-order" aria-labelledby="checkout-order-title">
          <div className="checkout-card-heading">
            <div><p className="section-kicker">{t("checkout.plan")}</p><h2 id="checkout-order-title">{destination.name}</h2></div>
            <span className="checkout-demo-badge">{t("explore.demo").toUpperCase()}</span>
          </div>
          <img alt={`${language === "ID" ? "Pemandangan" : "View of"} ${destination.name}`} className="checkout-destination-image" loading="eager" src={destination.cardImage} onError={(event) => {
            if (event.currentTarget.src !== new URL(destination.backgroundImage, window.location.href).href) {
              event.currentTarget.src = destination.backgroundImage;
              return;
            }
            event.currentTarget.hidden = true;
          }} />
          <dl className="checkout-trip-facts">
            <div><dt>{t("checkout.customer")}</dt><dd>{booking.fullName}</dd></div>
            <div><dt>Email</dt><dd>{booking.email}</dd></div>
            <div><dt>{t("checkout.date")}</dt><dd>{formatDate(booking.departureDate)}</dd></div>
            <div><dt>{t("checkout.duration")}</dt><dd>{selectedDuration}</dd></div>
            <div><dt>{t("checkout.participants")}</dt><dd>{booking.participantCount} {t("common.person")}</dd></div>
            <div><dt>{t("booking.guide.label")}</dt><dd>{booking.guideCount === 0 ? t("booking.noGuide") : `${booking.guideCount} ${t("booking.guide.label")}`}</dd></div>
          </dl>
        </section>

        <div className="checkout-payment-column">
          <section className="checkout-card checkout-methods" aria-labelledby="payment-method-title">
            <p className="section-kicker">{t("checkout.choose")}</p>
            <h2 id="payment-method-title">{t("checkout.method")}</h2>
            <div className="checkout-method-list" role="radiogroup" aria-label={t("checkout.methods.aria")}>
              {paymentMethods.map((method) => (
                <label className={`checkout-method-option ${paymentMethod === method.value ? "checkout-method-selected" : ""}`} key={method.value}>
                  <input checked={paymentMethod === method.value} name="payment-method" onChange={() => setPaymentMethod(method.value)} type="radio" value={method.value} />
                  <span className="checkout-method-mark" aria-hidden="true">{method.value === "bank-transfer" ? "B" : method.value === "qris" ? "Q" : "E"}</span>
                  <span className="checkout-method-copy"><strong>{t(method.titleKey)}</strong><small>{t(method.descriptionKey)}</small></span>
                </label>
              ))}
            </div>
            <p className="checkout-no-credentials">{t("checkout.noCredentials")}</p>
          </section>

          <section className="checkout-card checkout-total-card" aria-labelledby="checkout-total-title">
            <p className="section-kicker">{t("checkout.amount")}</p>
            <h2 id="checkout-total-title">{t("checkout.costs")}</h2>
            <dl className="checkout-cost-lines">
              <div><dt>{t("checkout.trip")} ({booking.participantCount} × {formatCurrency(demoTripPricePerParticipant)})</dt><dd>{formatCurrency(tripTotal)}</dd></div>
              {booking.guideCount > 0 ? <div><dt>{t("checkout.guide")} ({booking.guideCount} × {formatCurrency(demoGuidePrice)})</dt><dd>{formatCurrency(guideTotal)}</dd></div> : null}
              <div className="checkout-grand-total"><dt>{t("checkout.total")}</dt><dd>{formatCurrency(total)}</dd></div>
            </dl>
            <p className="checkout-price-note">{t("checkout.priceNote")}</p>
            <button className="detail-button detail-button-primary focused-page-cta checkout-pay-button" disabled={!paymentMethod} onClick={startPaymentConfirmation} type="button">{t("checkout.pay")} {formatCurrency(total)}</button>
            {!paymentMethod ? <p className="checkout-select-hint">{t("checkout.selectHint")}</p> : null}
            {paymentError ? <p className="checkout-storage-error" role="alert">{paymentError}</p> : null}
          </section>
        </div>
      </div>

      {showConfirmation ? (
        <div className="checkout-success-overlay">
          <section
            aria-describedby="checkout-success-copy"
            aria-labelledby="checkout-success-title"
            aria-modal="true"
            className="checkout-success-dialog"
            onKeyDown={(event) => {
              if (event.key === "Escape") event.preventDefault();
              if (event.key === "Tab") {
                event.preventDefault();
                event.currentTarget.querySelector<HTMLButtonElement>(".checkout-return-now")?.focus();
              }
            }}
            ref={successDialogRef}
            role="dialog"
            tabIndex={-1}
          >
            <span aria-hidden="true" className="checkout-success-icon"><svg fill="none" viewBox="0 0 48 48"><path d="m13 25 7.2 7L35 17" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" /></svg></span>
            <p className="section-kicker">{t("booking.payment.success")}</p>
            <h2 id="checkout-success-title">{t("booking.payment.success")}</h2>
            <p id="checkout-success-copy">{t("checkout.success.copy")} {formatCurrency(total)} {t("checkout.success.withMethod")} {paymentMethod ? t(paymentMethod === "bank-transfer" ? "booking.payment.bank" : paymentMethod === "qris" ? "booking.payment.qris" : "booking.payment.wallet") : ""} {t("checkout.success.done")}</p>
            <p className="checkout-redirect-copy" role="status">{t("checkout.success.continue")}</p>
            <button className="checkout-return-now" onClick={goToSuccessPage} type="button">{t("checkout.viewSummary")}</button>
          </section>
        </div>
      ) : null}
    </article>
  );
}

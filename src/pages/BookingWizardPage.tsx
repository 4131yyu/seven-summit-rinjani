import { useEffect, useMemo, useRef, useState } from "react";
import { animate, createScope } from "animejs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router";
import { z } from "zod";

import { BookingProgressHeader } from "../components/layout/BookingProgressHeader";
import { bookingStorageKey, demoGuidePrice, demoTripPricePerParticipant, paymentSuccessSchema, paymentSuccessStorageKey, saveBookingHistory, type PaymentMethod, type StoredBooking } from "../data/demoPayment";
import { destinations } from "../data/destinations";
import { useLanguage } from "../i18n/LanguageProvider";
import { localizeDestination } from "../i18n/destinationTranslations";
import type { Language } from "../i18n/translations";

const methods: { value: PaymentMethod; titleKey: "booking.payment.bank" | "booking.payment.qris" | "booking.payment.wallet"; descriptionKey: "booking.payment.bank.copy" | "booking.payment.qris.copy" | "booking.payment.wallet.copy" }[] = [
  { value: "bank-transfer", titleKey: "booking.payment.bank", descriptionKey: "booking.payment.bank.copy" },
  { value: "qris", titleKey: "booking.payment.qris", descriptionKey: "booking.payment.qris.copy" },
  { value: "ewallet", titleKey: "booking.payment.wallet", descriptionKey: "booking.payment.wallet.copy" },
];

function DemoQrPlaceholder({ ariaLabel }: { ariaLabel: string }) {
  const cells = Array.from({ length: 21 * 21 }, (_, index) => {
    const row = Math.floor(index / 21);
    const column = index % 21;
    const inFinder = (top: number, left: number) => row >= top && row < top + 7 && column >= left && column < left + 7;
    for (const [top, left] of [[0, 0], [0, 14], [14, 0]]) {
      if (inFinder(top, left)) {
        const localRow = row - top;
        const localColumn = column - left;
        const edge = localRow === 0 || localRow === 6 || localColumn === 0 || localColumn === 6;
        const center = localRow >= 2 && localRow <= 4 && localColumn >= 2 && localColumn <= 4;
        return edge || center;
      }
    }
    return (row * 13 + column * 7 + row * column) % 9 < 4;
  });

  return <div aria-label={ariaLabel} className="booking-demo-qr" role="img"><div aria-hidden="true" className="booking-demo-qr-grid">{cells.map((active, index) => <i className={active ? "is-active" : ""} key={index} />)}</div><span>DEMO</span></div>;
}

function getDurationOptions(destination: (typeof destinations)[number], displayDestination: (typeof destinations)[number], t: ReturnType<typeof useLanguage>["t"]) {
  if (!displayDestination.estimatedDuration) return [];
  const camping = destination.estimatedDuration?.match(/\(atau\s*2\s*hari\s*1\s*malam[^)]*\)/i);
  if (!camping) return [{ value: "estimated-duration", label: displayDestination.estimatedDuration }];
  return [
    { value: "day-hike", label: displayDestination.estimatedDuration.split(/\s*\((?:atau|or)/i)[0].trim().replace(/[.]$/, "") },
    { value: "camping-2d1n", label: t("booking.package.camping") },
  ];
}

function todayString() {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
}

function createWizardSchema(t: ReturnType<typeof useLanguage>["t"]) {
  const message = (key: Parameters<typeof t>[0]) => t(key);
  return z.object({
    fullName: z.string().trim().min(2, message("booking.error.name")),
    email: z.string().trim().email(message("booking.error.email")),
    phone: z.string().trim().regex(/^[+\d\s()-]+$/, message("booking.error.phoneFormat")).refine((value) => value.replace(/\D/g, "").length >= 8, message("booking.error.phoneLength")),
    identityNumber: z.string().trim(), emergencyName: z.string().trim(), emergencyPhone: z.string().trim(),
    departureDate: z.string().min(1, message("booking.error.date")),
    durationOption: z.string().min(1, message("booking.error.packageRequired")),
    participantCount: z.number().int().min(1, message("booking.error.participants")).max(20, message("booking.error.participants")),
    tripType: z.enum(["solo", "group"]),
    members: z.array(z.object({ name: z.string().trim(), identityNumber: z.string().trim() })),
    guideCount: z.union([z.literal(0), z.literal(1), z.literal(3), z.literal(5)]),
    notes: z.string().trim().max(600, message("booking.error.notes")),
  }).superRefine((values, ctx) => {
    if (values.departureDate && values.departureDate < todayString()) ctx.addIssue({ code: "custom", path: ["departureDate"], message: message("booking.error.pastDate") });
    if (values.members.length !== values.participantCount - 1) ctx.addIssue({ code: "custom", path: ["members"], message: message("booking.error.members") });
  });
}
type WizardValues = z.infer<ReturnType<typeof createWizardSchema>>;

export function BookingWizardPage() {
  const panelRef = useRef<HTMLFormElement>(null);
  const { language, t, formatDate, formatCurrency } = useLanguage();
  const { slug } = useParams();
  const navigate = useNavigate();
  const destination = destinations.find((item) => item.slug === slug);
  const displayDestination = destination ? localizeDestination(destination, language) : undefined;
  const durationOptions = useMemo(() => destination && displayDestination ? getDurationOptions(destination, displayDestination, t) : [], [destination, displayDestination, t]);
  const wizardSchema = useMemo(() => createWizardSchema(t), [language, t]);
  const [step, setStep] = useState(1);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [booking, setBooking] = useState<StoredBooking | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [virtualAccount] = useState(() => `DEMO-VA-${Date.now().toString().slice(-8)}`);
  const [promo, setPromo] = useState("");
  const [promoMessage, setPromoMessage] = useState("");
  const [formError, setFormError] = useState("");
  const [invoiceNumber] = useState(() => `DEMO-${Date.now().toString(36).toUpperCase()}`);
  const { register, control, watch, setValue, trigger, handleSubmit, formState: { errors } } = useForm<WizardValues>({
    resolver: zodResolver(wizardSchema),
    mode: "onTouched",
    defaultValues: { fullName: "", email: "", phone: "", identityNumber: "", emergencyName: "", emergencyPhone: "", departureDate: "", durationOption: "", participantCount: 1, tripType: "solo", members: [], guideCount: 0, notes: "" },
  });
  const { fields, append, remove } = useFieldArray({ control, name: "members" });
  const participantCount = watch("participantCount");
  const durationOption = watch("durationOption");
  const guideCount = watch("guideCount");
  const tripTotal = participantCount * demoTripPricePerParticipant;
  const guideTotal = guideCount * demoGuidePrice;
  const total = tripTotal + guideTotal;

  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: "instant" }); }, [slug]);
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const scope = createScope({ root: panel }).add(() => {
      animate(panel, { opacity: [0.72, 1], translateY: [10, 0], duration: 260, ease: "out(3)" });
    });

    return () => scope.revert();
  }, [step]);
  useEffect(() => {
    if (!showPaymentSuccess) return;
    document.querySelector<HTMLElement>(".booking-payment-success-dialog")?.focus();
    const timer = window.setTimeout(() => navigate("/payment/success", { replace: true }), 3600);
    return () => window.clearTimeout(timer);
  }, [navigate, showPaymentSuccess]);

  if (!destination) return <section className="destination-detail-page px-5 py-20 text-center"><h1 className="section-title">{t("booking.invoice.error")}</h1></section>;

  const updateParticipantCount = (nextCount: number) => {
    const bounded = Math.max(1, Math.min(20, nextCount));
    setValue("participantCount", bounded, { shouldValidate: true });
    setValue("tripType", bounded === 1 ? "solo" : "group");
    const targetMembers = bounded - 1;
    if (fields.length < targetMembers) {
      for (let index = fields.length; index < targetMembers; index += 1) append({ name: "", identityNumber: "" });
    } else if (fields.length > targetMembers) {
      for (let index = fields.length - 1; index >= targetMembers; index -= 1) remove(index);
    }
  };

  const continueFromPackage = async () => {
    const valid = await trigger(["departureDate", "durationOption"]);
    if (valid) setStep(2);
  };

  const saveBooking = (values: WizardValues) => {
    if (!durationOptions.some((item) => item.value === values.durationOption)) {
      setFormError(t("booking.error.package"));
      return;
    }
    const record: StoredBooking = {
      ...values,
      destinationSlug: destination.slug,
      createdAt: new Date().toISOString(),
      status: "SIMULATED",
    };
    try {
      window.sessionStorage.setItem(bookingStorageKey, JSON.stringify(record));
      setBooking(record);
      setFormError("");
      setStep(3);
    } catch {
      setFormError(t("booking.error.storage"));
    }
  };

  const confirmDemoPayment = () => {
    if (!booking || !paymentMethod) return;
    const result = paymentSuccessSchema.safeParse({ booking, paymentMethod, tripSubtotal: tripTotal, guideSubtotal: guideTotal, total, reference: invoiceNumber, paidAt: new Date().toISOString(), status: "SIMULATED" });
    if (!result.success) { setFormError(t("booking.error.payment")); return; }
    try {
      window.sessionStorage.setItem(paymentSuccessStorageKey, JSON.stringify(result.data));
      if (!saveBookingHistory(result.data)) {
        window.sessionStorage.removeItem(paymentSuccessStorageKey);
        setFormError(t("booking.error.history"));
        return;
      }
      setShowPaymentSuccess(true);
    } catch {
      setFormError(t("booking.error.session"));
    }
  };

  const selectedPackage = durationOptions.find((item) => item.value === durationOption)?.label ?? t("booking.date.missing");
  const summaryCard = (
    <aside className="booking-summary booking-wizard-summary" aria-label={t("booking.summary.title")}>
      <p className="section-kicker">{t("booking.summary.title")}</p>
      <img alt={`${language === "ID" ? "Pemandangan" : "View of"} ${destination.name}`} className="booking-summary-image" src={destination.cardImage} onError={(event) => { event.currentTarget.src = destination.backgroundImage; }} />
      <h2>{destination.name}</h2>
      <p>{displayDestination?.shortDescription}</p>
      <dl>
        <div><dt>{t("booking.summary.package")}</dt><dd>{selectedPackage}</dd></div>
        <div><dt>{t("booking.summary.date")}</dt><dd>{formatDate(watch("departureDate"), { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</dd></div>
        <div><dt>{t("booking.summary.hikers")}</dt><dd>{participantCount} {t("common.person")}</dd></div>
        <div><dt>{t("booking.summary.ticket")}</dt><dd>{formatCurrency(tripTotal)}</dd></div>
        {guideCount > 0 ? <div><dt>{t("booking.summary.guide")}</dt><dd>{formatCurrency(guideTotal)}</dd></div> : null}
        <div className="booking-wizard-total"><dt>{t("booking.invoice.total")}</dt><dd>{formatCurrency(total)}</dd></div>
      </dl>
      <p className="booking-summary-note">{t("booking.summary.note")}</p>
    </aside>
  );

  return (
    <div className="booking-wizard-page">
      <BookingProgressHeader activeStep={step} closeTo={`/destinations/${destination.slug}`} />
      {step < 5 ? <div className="booking-wizard-layout">
        <form className="booking-wizard-panel" noValidate onSubmit={handleSubmit(saveBooking)} ref={panelRef}>
          {step === 1 ? <>
            <header className="booking-wizard-panel-heading"><h1>{t("booking.step1.title")}</h1><p>{t("booking.step1.copy")}</p></header>
            <div className="booking-field"><label>{t("booking.summit")}</label><div className="booking-destination-choice"><img alt="" src={destination.cardImage} /><strong>{destination.name} ({destination.altitude})</strong></div></div>
            <fieldset className="booking-package-field"><legend>{t("booking.package.type")}</legend><div className="booking-package-options">{durationOptions.length ? durationOptions.map((option) => <label className={`booking-package-option ${durationOption === option.value ? "booking-package-selected" : ""}`} key={option.value}><input checked={durationOption === option.value} onChange={() => setValue("durationOption", option.value, { shouldValidate: true })} type="radio" value={option.value} /><strong>{option.value === "day-hike" ? t("booking.package.dayhike") : option.value === "camping-2d1n" ? t("booking.package.camping") : t("booking.package.generic")}</strong><small>{option.label}</small></label>) : <p>{t("booking.package.unavailable")}</p>}</div>{errors.durationOption ? <p className="booking-error">{errors.durationOption.message}</p> : null}</fieldset>
            <div className="booking-wizard-two-fields"><div className="booking-field"><label htmlFor="wizard-date">{t("booking.date")}</label><input id="wizard-date" min={todayString()} type="date" {...register("departureDate")} />{errors.departureDate ? <p className="booking-error">{errors.departureDate.message}</p> : null}</div><div className="booking-field"><label>{t("booking.participant.count")}</label><div className="booking-count-control"><button aria-label={t("booking.count.less")} disabled={participantCount <= 1} onClick={() => updateParticipantCount(participantCount - 1)} type="button">−</button><output aria-live="polite">{participantCount}</output><button aria-label={t("booking.count.more")} disabled={participantCount >= 20} onClick={() => updateParticipantCount(participantCount + 1)} type="button">+</button></div></div></div>
            <fieldset className="booking-addons"><legend>{t("booking.addons")}</legend><div className="booking-addon-row"><div><strong>{t("booking.guide.label")}</strong><small>{t("booking.guide.price")} {formatCurrency(demoGuidePrice)} {t("booking.guide.unit")}</small></div><select aria-label={t("booking.guide.count")} {...register("guideCount", { valueAsNumber: true })}><option value={0}>{t("booking.noGuide")}</option><option value={1}>1 {t("checkout.guide")}</option><option value={3}>3 {t("checkout.guide")}</option><option value={5}>5 {t("checkout.guide")}</option></select></div></fieldset>
            <div className="booking-wizard-actions"><button className="detail-button detail-button-primary" onClick={continueFromPackage} type="button">{t("booking.continue.traveler")} <span aria-hidden="true">→</span></button></div>
          </> : null}

          {step === 2 ? <>
            <header className="booking-wizard-panel-heading"><h1>{t("booking.step2.title")}</h1><p>{t("booking.step2.copy")}</p></header>
            <section className="booking-wizard-form-section"><h2>{t("booking.group.leader")}</h2><div className="booking-field"><label htmlFor="wizard-name">{t("booking.fullName")}</label><input autoComplete="name" id="wizard-name" {...register("fullName")} />{errors.fullName ? <p className="booking-error">{errors.fullName.message}</p> : null}</div><div className="booking-wizard-two-fields"><div className="booking-field"><label htmlFor="wizard-email">{t("booking.email")}</label><input autoComplete="email" id="wizard-email" type="email" {...register("email")} />{errors.email ? <p className="booking-error">{errors.email.message}</p> : null}</div><div className="booking-field"><label htmlFor="wizard-phone">{t("booking.whatsapp")}</label><input autoComplete="tel" id="wizard-phone" type="tel" {...register("phone")} />{errors.phone ? <p className="booking-error">{errors.phone.message}</p> : null}</div></div><div className="booking-field"><label htmlFor="wizard-identity">{t("booking.identity")} <span>({t("booking.optional")})</span></label><input id="wizard-identity" {...register("identityNumber")} /></div></section>
            {participantCount > 1 ? <section className="booking-wizard-form-section"><h2>{t("booking.group.members")}</h2><div className="booking-wizard-members">{fields.map((field, index) => <fieldset className="booking-wizard-member" key={field.id}><legend>{t("booking.hiker")} {index + 2}</legend><div className="booking-wizard-two-fields"><div className="booking-field"><label htmlFor={`member-name-${index}`}>{t("booking.fullName")} <span>({t("booking.optional")})</span></label><input id={`member-name-${index}`} {...register(`members.${index}.name`)} /></div><div className="booking-field"><label htmlFor={`member-id-${index}`}>{t("booking.identity")} <span>({t("booking.optional")})</span></label><input id={`member-id-${index}`} {...register(`members.${index}.identityNumber`)} /></div></div></fieldset>)}</div></section> : null}
            <section className="booking-wizard-form-section"><h2>{t("booking.emergency")} <span>({t("booking.optional")})</span></h2><div className="booking-wizard-two-fields"><div className="booking-field"><label htmlFor="emergency-name">{t("booking.name")}</label><input id="emergency-name" autoComplete="off" {...register("emergencyName")} /></div><div className="booking-field"><label htmlFor="emergency-phone">{t("booking.phone")}</label><input id="emergency-phone" autoComplete="off" type="tel" {...register("emergencyPhone")} /></div></div></section>
            <label className="booking-demo-consent"><input type="checkbox" /> <span>{t("booking.demo.consent")}</span></label>
            {formError ? <p className="booking-error" role="alert">{formError}</p> : null}
            <div className="booking-wizard-actions"><button className="detail-button detail-button-secondary" onClick={() => setStep(1)} type="button">{t("booking.back")}</button><button className="detail-button detail-button-primary" type="submit">{t("booking.continue.invoice")} <span aria-hidden="true">→</span></button></div>
          </> : null}

          {step === 3 && booking ? <>
            <header className="booking-wizard-panel-heading"><h1>{t("booking.step3.title")}</h1><p>{t("booking.step3.copy")}</p></header>
            <section className="demo-invoice"><div className="demo-invoice-top"><div><strong>Seven Summit Rinjani</strong><small>{t("booking.invoice.service")}</small></div><div><strong>INVOICE</strong><small>{invoiceNumber}</small><span>{t("booking.invoice.paidStatus")}</span></div></div><div className="demo-invoice-facts"><div><small>{t("booking.invoice.billed")}</small><strong>{booking.fullName}</strong><span>{booking.email}</span></div><div><small>{t("booking.invoice.trip")}</small><strong>{destination.name}</strong><span>{selectedPackage}</span><span>{formatDate(booking.departureDate, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</span><span>{participantCount} {t("common.hikers")}</span></div><div><small>{t("booking.invoice.status")}</small><strong>{t("booking.invoice.pending")}</strong></div></div><div className="demo-invoice-line"><strong>{t("booking.invoice.ticket")} ({participantCount} {t("common.hikers")})</strong><span>{formatCurrency(tripTotal)}</span></div>{guideTotal > 0 ? <div className="demo-invoice-line"><strong>{t("booking.summary.guide")} ({guideCount})</strong><span>{formatCurrency(guideTotal)}</span></div> : null}<div className="demo-invoice-total"><strong>{t("booking.invoice.total")}</strong><strong>{formatCurrency(total)}</strong></div><p>{t("booking.invoice.note")}</p></section>
            <div className="booking-promo-row"><input aria-label={t("booking.promo.label")} onChange={(event) => { setPromo(event.target.value); setPromoMessage(""); }} placeholder={t("booking.promo.placeholder")} value={promo} /><button onClick={() => setPromoMessage(promo.trim() ? t("booking.promo.inactive") : t("booking.promo.empty"))} type="button">{t("booking.promo.apply")}</button></div>{promoMessage ? <p className="booking-field-hint" role="status">{promoMessage}</p> : null}
            <div className="booking-wizard-actions"><button className="detail-button detail-button-secondary" onClick={() => setStep(2)} type="button">{t("booking.back")}</button><button className="detail-button detail-button-primary" onClick={() => setStep(4)} type="button">{t("booking.continue.payment")} <span aria-hidden="true">→</span></button></div>
          </> : null}

          {step === 4 ? <>
            <header className="booking-wizard-panel-heading"><h1>{t("booking.step4.title")}</h1><p>Invoice {invoiceNumber} · {language === "ID" ? "pilih metode pembayaran simulasi." : "choose a simulated payment method."}</p></header>
            <fieldset className="booking-payment-options"><legend className="sr-only">{t("booking.payment.methods")}</legend>{methods.map((method) => <label className={`booking-payment-option ${paymentMethod === method.value ? "booking-payment-selected" : ""}`} key={method.value}><input checked={paymentMethod === method.value} name="wizard-payment-method" onChange={() => setPaymentMethod(method.value)} type="radio" /><span><strong>{t(method.titleKey)}</strong><small>{t(method.descriptionKey)}</small></span></label>)}</fieldset>
            {paymentMethod === "bank-transfer" ? <section aria-live="polite" className="booking-demo-payment-detail"><p>{t("booking.payment.va.title")}</p><strong>{virtualAccount}</strong><small>{t("booking.payment.va.note")}</small></section> : null}
            {paymentMethod === "qris" ? <section aria-live="polite" className="booking-demo-payment-detail booking-demo-qris-detail"><DemoQrPlaceholder ariaLabel={t("booking.payment.qr.aria")} /><div><strong>{t("booking.payment.qr.title")}</strong><p>{t("booking.payment.qr.note")}</p></div></section> : null}
            {paymentMethod === "ewallet" ? <section aria-live="polite" className="booking-demo-payment-detail"><p>{t("booking.payment.wallet.title")}</p><strong>08xx-xxxx-xxxx</strong><small>{t("booking.payment.wallet.value")}</small></section> : null}
            {formError ? <p className="booking-error" role="alert">{formError}</p> : null}
            <div className="booking-wizard-actions"><button className="detail-button detail-button-secondary" onClick={() => setStep(3)} type="button">{t("booking.back.invoice")}</button><button className="detail-button detail-button-primary" disabled={!paymentMethod} onClick={confirmDemoPayment} type="button">{t("booking.paid")}</button></div>
            <p className="booking-field-hint">{t("booking.noCredentials")}</p>
          </> : null}
        </form>
        {summaryCard}
      </div> : null}
      {showPaymentSuccess ? <div className="checkout-success-overlay">
        <section aria-describedby="booking-payment-success-copy" aria-labelledby="booking-payment-success-title" aria-modal="true" className="checkout-success-dialog booking-payment-success-dialog" role="dialog" tabIndex={-1}>
          <span aria-hidden="true" className="checkout-success-icon"><svg fill="none" viewBox="0 0 48 48"><path d="m13 25 7.2 7L35 17" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" /></svg></span>
          <p className="section-kicker">{t("checkout.success.kicker")}</p>
          <h2 id="booking-payment-success-title">{t("booking.payment.success")}</h2>
          <p id="booking-payment-success-copy">{t("booking.payment.success.copy")} {paymentMethod ? t(methods.find((method) => method.value === paymentMethod)!.titleKey) : language === "ID" ? "pilihan Anda" : "your selected method"} {t("booking.payment.success.simulated")}</p>
          <p className="checkout-redirect-copy" role="status">{t("booking.payment.redirect")}</p>
          <div className="booking-success-progress"><span /></div>
          <button className="checkout-return-now" onClick={() => navigate("/payment/success", { replace: true })} type="button">{t("booking.payment.viewInvoice")}</button>
        </section>
      </div> : null}
    </div>
  );
}




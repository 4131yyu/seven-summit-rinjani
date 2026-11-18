import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";

import {
  bookingStorageKey,
  demoGuidePrice,
  demoTripPricePerParticipant,
  formatRupiah,
  paymentMethodLabels,
  paymentSuccessSchema,
  paymentSuccessStorageKey,
  storedBookingSchema,
  type PaymentMethod,
  type StoredBooking,
} from "../data/demoPayment";
import { destinations } from "../data/destinations";

const paymentMethods: { value: PaymentMethod; title: string; description: string }[] = [
  { value: "cash", title: "Tunai", description: "Pembayaran tunai simulasi" },
  { value: "debit", title: "Kartu debit", description: "Pilihan metode saja, tanpa data kartu" },
  { value: "credit", title: "Kartu kredit", description: "Pilihan metode saja, tanpa data kartu" },
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
  const navigate = useNavigate();
  const [booking] = useState(loadStoredBooking);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const successDialogRef = useRef<HTMLElement | null>(null);
  const destination = booking
    ? destinations.find((item) => item.slug === booking.destinationSlug)
    : undefined;
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
      setPaymentError("Ringkasan pembayaran tidak dapat disiapkan. Periksa kembali data pemesanan.");
      return;
    }

    try {
      window.sessionStorage.setItem(paymentSuccessStorageKey, JSON.stringify(validation.data));
      setPaymentError("");
      setShowConfirmation(true);
    } catch {
      setPaymentError("Ringkasan demo tidak dapat disimpan di sesi browser ini. Periksa pengaturan penyimpanan browser lalu coba lagi.");
    }
  };

  if (!booking || !destination) {
    return (
      <article className="checkout-page" aria-labelledby="checkout-missing-title">
        <div className="focused-route-header"><Link aria-label="Kembali ke Jelajah" className="focused-route-back" to="/#explore"><span aria-hidden="true">←</span> Kembali ke Jelajah</Link></div>
        <section className="checkout-missing-card">
          <p className="section-kicker">Checkout demonstrasi</p>
          <h1 className="section-title mt-3" id="checkout-missing-title">Data pemesanan tidak ditemukan</h1>
          <p>Silakan kembali ke Jelajah dan isi formulir rencana perjalanan terlebih dahulu.</p>
          <Link className="detail-button detail-button-primary focused-page-cta" to="/#explore">Kembali ke Jelajah</Link>
        </section>
      </article>
    );
  }

  const selectedDuration = destination.estimatedDuration
    ? booking.durationOption === "camping-2d1n"
      ? "Camping — 2 hari 1 malam"
      : booking.durationOption === "day-hike"
        ? destination.estimatedDuration.split(/\(atau/i)[0].trim().replace(/[.]$/, "")
        : destination.estimatedDuration
    : "Belum tersedia";

  return (
    <article className="checkout-page" aria-labelledby="checkout-title">
      <div className="focused-route-header">
        <Link aria-label="Kembali ke pemesanan" className="focused-route-back" to={returnHref}>
          <span aria-hidden="true">←</span> Kembali ke pemesanan
        </Link>
      </div>

      <header className="checkout-heading">
        <p className="section-kicker">Checkout demonstrasi</p>
        <h1 className="section-title mx-auto mt-3" id="checkout-title">Tinjau pembayaran</h1>
        <p>Periksa rencana dan pilih metode pembayaran simulasi untuk melanjutkan.</p>
      </header>

      <div className="checkout-layout">
        <section className="checkout-card checkout-order" aria-labelledby="checkout-order-title">
          <div className="checkout-card-heading">
            <div><p className="section-kicker">Ringkasan rencana</p><h2 id="checkout-order-title">{destination.name}</h2></div>
            <span className="checkout-demo-badge">DEMO</span>
          </div>
          <img alt={`Pemandangan ${destination.name}`} className="checkout-destination-image" loading="eager" src={destination.cardImage} onError={(event) => {
            if (event.currentTarget.src !== new URL(destination.backgroundImage, window.location.href).href) {
              event.currentTarget.src = destination.backgroundImage;
              return;
            }
            event.currentTarget.hidden = true;
          }} />
          <dl className="checkout-trip-facts">
            <div><dt>Pemesan</dt><dd>{booking.fullName}</dd></div>
            <div><dt>Email</dt><dd>{booking.email}</dd></div>
            <div><dt>Tanggal rencana</dt><dd>{new Date(`${booking.departureDate}T00:00:00`).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</dd></div>
            <div><dt>Durasi</dt><dd>{selectedDuration}</dd></div>
            <div><dt>Peserta</dt><dd>{booking.participantCount} orang</dd></div>
            <div><dt>Guide</dt><dd>{booking.guideCount === 0 ? "Tanpa guide" : `${booking.guideCount} guide`}</dd></div>
          </dl>
        </section>

        <div className="checkout-payment-column">
          <section className="checkout-card checkout-methods" aria-labelledby="payment-method-title">
            <p className="section-kicker">Pilih metode</p>
            <h2 id="payment-method-title">Metode pembayaran</h2>
            <div className="checkout-method-list" role="radiogroup" aria-label="Metode pembayaran demonstrasi">
              {paymentMethods.map((method) => (
                <label className={`checkout-method-option ${paymentMethod === method.value ? "checkout-method-selected" : ""}`} key={method.value}>
                  <input checked={paymentMethod === method.value} name="payment-method" onChange={() => setPaymentMethod(method.value)} type="radio" value={method.value} />
                  <span className="checkout-method-mark" aria-hidden="true">{method.value === "cash" ? "Rp" : method.value === "debit" ? "D" : "K"}</span>
                  <span className="checkout-method-copy"><strong>{method.title}</strong><small>{method.description}</small></span>
                </label>
              ))}
            </div>
            <p className="checkout-no-credentials">Tidak ada nomor kartu, rekening, PIN, atau OTP yang diminta. Pemilihan metode hanya bagian dari demo.</p>
          </section>

          <section className="checkout-card checkout-total-card" aria-labelledby="checkout-total-title">
            <p className="section-kicker">Nominal simulasi</p>
            <h2 id="checkout-total-title">Rincian biaya demo</h2>
            <dl className="checkout-cost-lines">
              <div><dt>Trip ({booking.participantCount} × {formatRupiah(demoTripPricePerParticipant)})</dt><dd>{formatRupiah(tripTotal)}</dd></div>
              {booking.guideCount > 0 ? <div><dt>Guide ({booking.guideCount} × {formatRupiah(demoGuidePrice)})</dt><dd>{formatRupiah(guideTotal)}</dd></div> : null}
              <div className="checkout-grand-total"><dt>Total demo</dt><dd>{formatRupiah(total)}</dd></div>
            </dl>
            <p className="checkout-price-note">Nominal ini hanya angka contoh untuk simulasi website. Bukan harga layanan, tagihan, atau permintaan pembayaran nyata.</p>
            <button className="detail-button detail-button-primary focused-page-cta checkout-pay-button" disabled={!paymentMethod} onClick={startPaymentConfirmation} type="button">Bayar {formatRupiah(total)}</button>
            {!paymentMethod ? <p className="checkout-select-hint">Pilih metode pembayaran untuk mengaktifkan tombol.</p> : null}
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
            <p className="section-kicker">Pembayaran demonstrasi</p>
            <h2 id="checkout-success-title">Pembayaran berhasil</h2>
            <p id="checkout-success-copy">Simulasi pembayaran {formatRupiah(total)} dengan metode {paymentMethod ? paymentMethodLabels[paymentMethod] : "pilihan Anda"} berhasil. Tidak ada transaksi nyata yang diproses.</p>
            <p className="checkout-redirect-copy" role="status">Lanjutkan untuk melihat ringkasan sukses pembayaran.</p>
            <button className="checkout-return-now" onClick={goToSuccessPage} type="button">Lihat ringkasan pembayaran</button>
          </section>
        </div>
      ) : null}
    </article>
  );
}

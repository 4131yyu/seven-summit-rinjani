import { useLayoutEffect, useState } from "react";
import { Link } from "react-router";

import { destinations } from "../data/destinations";
import {
  bookingStorageKey,
  demoGuidePrice,
  demoTripPricePerParticipant,
  formatRupiah,
  paymentMethodLabels,
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

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatDateTime(date: string) {
  return new Date(date).toLocaleString("id-ID", {
    dateStyle: "long",
    timeStyle: "short",
  });
}

export function PaymentSuccessPage() {
  const [summary] = useState(loadPaymentSummary);
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const destination = summary
    ? destinations.find((item) => item.slug === summary.booking.destinationSlug)
    : undefined;

  const clearDemoPayment = () => {
    try {
      window.sessionStorage.removeItem(paymentSuccessStorageKey);
      window.sessionStorage.removeItem(bookingStorageKey);
    } catch {
      // Continue to the public Landing Page even if browser storage is unavailable.
    }
  };

  if (!summary || !destination) {
    return (
      <article className="payment-success-page" aria-labelledby="payment-success-missing-title">
        <section className="payment-success-card payment-success-missing">
          <span aria-hidden="true" className="payment-success-icon"><svg fill="none" viewBox="0 0 48 48"><path d="M24 13v15m0 7h.02" stroke="currentColor" strokeLinecap="round" strokeWidth="4" /></svg></span>
          <p className="section-kicker">Ringkasan demonstrasi</p>
          <h1 className="section-title mt-3" id="payment-success-missing-title">Ringkasan pembayaran tidak tersedia</h1>
          <p>Data sesi pembayaran tidak ditemukan atau sudah tidak valid. Tidak ada pembayaran nyata yang diproses.</p>
          <Link className="detail-button detail-button-primary focused-page-cta payment-success-home-link" onClick={clearDemoPayment} to="/#seven-summit">Kembali ke Landing Page</Link>
        </section>
      </article>
    );
  }

  const booking = summary.booking;
  const durationLabel = booking.durationOption === "camping-2d1n"
    ? "Camping — 2 hari 1 malam"
    : booking.durationOption === "day-hike"
      ? (destination.estimatedDuration ?? "").split(/\(atau/i)[0].trim().replace(/[.]$/, "")
      : destination.estimatedDuration ?? "Belum tersedia";

  return (
    <article className="payment-success-page" aria-labelledby="payment-success-title">
      <header className="payment-success-heading">
        <span aria-hidden="true" className="payment-success-icon"><svg fill="none" viewBox="0 0 48 48"><path d="m13 25 7.2 7L35 17" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" /></svg></span>
        <p className="section-kicker">Status transaksi demo</p>
        <h1 className="section-title mx-auto mt-3" id="payment-success-title">Pembayaran berhasil</h1>
        <p>Konfirmasi ini hanya untuk simulasi. Tidak ada transaksi, pemesanan, atau izin pendakian nyata yang dibuat.</p>
      </header>

      <section className="payment-success-card" aria-label="Ringkasan pembayaran demonstrasi">
        <div className="payment-success-card-top">
          <div><p className="section-kicker">Referensi demonstrasi</p><strong>{summary.reference}</strong></div>
          <span className="payment-success-status">SIMULATED</span>
        </div>

        <div className="payment-success-destination">
          <img alt={`Pemandangan ${destination.name}`} className="payment-success-image" loading="eager" src={destination.cardImage} onError={(event) => {
            if (event.currentTarget.src !== new URL(destination.backgroundImage, window.location.href).href) {
              event.currentTarget.src = destination.backgroundImage;
              return;
            }
            event.currentTarget.hidden = true;
          }} />
          <div><p className="section-kicker">Destinasi</p><h2>{destination.name}</h2></div>
        </div>

        <div className="payment-success-details">
          <section aria-labelledby="payment-success-trip-title">
            <h3 id="payment-success-trip-title">Detail perjalanan</h3>
            <dl>
              <div><dt>Pemesan</dt><dd>{booking.fullName}</dd></div>
              <div><dt>Email</dt><dd>{booking.email}</dd></div>
              <div><dt>Nomor telepon</dt><dd>{booking.phone}</dd></div>
              <div><dt>Tanggal</dt><dd>{formatDate(booking.departureDate)}</dd></div>
              <div><dt>Durasi</dt><dd>{durationLabel || "Belum tersedia"}</dd></div>
              <div><dt>Tipe trip</dt><dd>{booking.tripType === "solo" ? "Sendirian" : "Berkelompok"}</dd></div>
              <div><dt>Jumlah peserta</dt><dd>{booking.participantCount} orang</dd></div>
              <div><dt>Guide</dt><dd>{booking.guideCount === 0 ? "Tanpa guide" : `${booking.guideCount} guide`}</dd></div>
            </dl>
            {booking.members.length ? <div className="payment-success-members"><h4>Nama anggota</h4><ul>{booking.members.map((member, index) => <li key={`${member.name}-${index}`}>{member.name}</li>)}</ul></div> : null}
            {booking.notes ? <div className="payment-success-notes"><h4>Catatan trip</h4><p>{booking.notes}</p></div> : null}
          </section>

          <section aria-labelledby="payment-success-cost-title">
            <h3 id="payment-success-cost-title">Rincian pembayaran demo</h3>
            <dl className="payment-success-costs">
              <div><dt>Trip ({booking.participantCount} × {formatRupiah(demoTripPricePerParticipant)})</dt><dd>{formatRupiah(summary.tripSubtotal)}</dd></div>
              {booking.guideCount > 0 ? <div><dt>Guide ({booking.guideCount} × {formatRupiah(demoGuidePrice)})</dt><dd>{formatRupiah(summary.guideSubtotal)}</dd></div> : null}
              <div><dt>Metode pembayaran</dt><dd>{paymentMethodLabels[summary.paymentMethod]}</dd></div>
              <div><dt>Waktu konfirmasi</dt><dd>{formatDateTime(summary.paidAt)}</dd></div>
              <div className="payment-success-total"><dt>Total simulasi</dt><dd>{formatRupiah(summary.total)}</dd></div>
            </dl>
          </section>
        </div>

        <p className="payment-success-disclaimer">Nominal dan konfirmasi di atas hanya demonstrasi tampilan website; bukan bukti pembayaran atau reservasi.</p>
      </section>

      <Link className="detail-button detail-button-primary focused-page-cta payment-success-home-link" onClick={clearDemoPayment} to="/#seven-summit">Kembali ke Landing Page</Link>
    </article>
  );
}

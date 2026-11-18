import { useEffect, useLayoutEffect, useState } from "react";
import { useMemo } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { bookingStorageKey } from "../data/demoPayment";
import { destinations } from "../data/destinations";

function getDurationOptions(destination: (typeof destinations)[number]) {
  if (!destination.estimatedDuration) return [];

  const campingMention = destination.estimatedDuration.match(/\(atau\s*(2\s*hari\s*1\s*malam)[^)]*\)/i);
  if (campingMention) {
    const dayHikeEstimate = destination.estimatedDuration.split(/\(atau/i)[0].trim().replace(/[.]$/, "");
    return [
      { value: "day-hike", label: `Day hike / tektok — ${dayHikeEstimate}` },
      { value: "camping-2d1n", label: `Camping — ${campingMention[1]}` },
    ];
  }

  return [{ value: "estimated-duration", label: destination.estimatedDuration }];
}

function getLocalDateString() {
  const date = new Date();
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60_000).toISOString().slice(0, 10);
}

function createBookingSchema(availableDurations: string[]) {
  return z.object({
    fullName: z.string().trim().min(2, "Nama minimal 2 karakter."),
    email: z.string().trim().email("Masukkan alamat email yang valid."),
    phone: z.string().trim()
      .regex(/^[+\d\s()-]+$/, "Gunakan angka dan tanda +, -, atau kurung saja.")
      .refine((value) => value.replace(/\D/g, "").length >= 8, "Nomor telepon minimal 8 angka."),
    departureDate: z.string().min(1, "Pilih tanggal rencana pendakian."),
    durationOption: z.string().min(1, "Pilih durasi pendakian."),
    tripType: z.enum(["solo", "group"]),
    members: z.array(z.object({ name: z.string().trim() })),
    guideCount: z.number().refine((count) => [0, 1, 3, 5].includes(count), "Pilih tanpa guide, 1, 3, atau 5 guide."),
    notes: z.string().trim().max(600, "Catatan maksimal 600 karakter."),
  }).superRefine((value, context) => {
    if (value.departureDate && value.departureDate < getLocalDateString()) {
      context.addIssue({ code: "custom", path: ["departureDate"], message: "Tanggal tidak boleh berada di masa lalu." });
    }

    if (availableDurations.length && !availableDurations.includes(value.durationOption)) {
      context.addIssue({ code: "custom", path: ["durationOption"], message: "Pilih salah satu durasi yang tercatat." });
    }

    if (value.tripType === "group") {
      if (value.members.length === 0) {
        context.addIssue({ code: "custom", path: ["members"], message: "Tambahkan minimal satu anggota selain pemesan." });
      }
      value.members.forEach((member, index) => {
        if (member.name.length < 2) {
          context.addIssue({ code: "custom", path: ["members", index, "name"], message: "Nama anggota minimal 2 karakter." });
        }
      });
    }

  });
}

type BookingFormValues = z.infer<ReturnType<typeof createBookingSchema>>;

export function BookingPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const destination = destinations.find((item) => item.slug === slug);
  const [storageError, setStorageError] = useState("");
  const durationOptions = useMemo(() => destination ? getDurationOptions(destination) : [], [destination]);
  const bookingSchema = useMemo(() => createBookingSchema(durationOptions.map((option) => option.value)), [durationOptions]);
  const {
    register,
    control,
    watch,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      departureDate: "",
      durationOption: durationOptions.length ? "" : "unavailable",
      tripType: "solo",
      members: [],
      guideCount: 0,
      notes: "",
    },
  });
  const { fields, append, remove } = useFieldArray({ control, name: "members" });
  const tripType = watch("tripType");
  const guideCount = watch("guideCount");
  const durationOption = watch("durationOption");
  const participantCount = tripType === "solo" ? 1 : fields.length + 1;
  const tripTypeRegistration = register("tripType");

  useEffect(() => {
    reset({
      fullName: "",
      email: "",
      phone: "",
      departureDate: "",
      durationOption: durationOptions.length ? "" : "unavailable",
      tripType: "solo",
      members: [],
      guideCount: 0,
      notes: "",
    });
  }, [durationOptions, reset, slug]);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [slug]);

  if (!destination) {
    return (
      <section className="destination-detail-page px-5 py-20 text-center" aria-labelledby="booking-missing-title">
        <p className="section-kicker">Destinasi tidak ditemukan</p>
        <h1 className="section-title mx-auto mt-3" id="booking-missing-title">Pemesanan belum tersedia</h1>
      </section>
    );
  }

  const onSubmit = (values: BookingFormValues) => {
    setStorageError("");
    const booking = {
      ...values,
      members: values.tripType === "group" ? values.members : [],
      participantCount,
      guideCount: values.guideCount,
      destinationSlug: destination.slug,
      destinationName: destination.name,
      createdAt: new Date().toISOString(),
      status: "SIMULATED" as const,
    };

    try {
      window.sessionStorage.setItem(bookingStorageKey, JSON.stringify(booking));
      navigate("/checkout");
    } catch {
      setStorageError("Data belum dapat disimpan di sesi browser ini. Coba lagi atau periksa pengaturan penyimpanan browser.");
    }
  };

  return (
    <article className="booking-page" aria-labelledby="booking-title">
      <header className="booking-heading">
        <p className="section-kicker">Rencanakan perjalanan</p>
        <h1 className="section-title mx-auto mt-3" id="booking-title">Pemesanan Izin / Guide</h1>
        <p className="booking-intro">Lengkapi rencana awal perjalanan ke <strong>{destination.name}</strong>. Ini formulir demonstrasi; pengiriman data tidak membuat reservasi atau izin pendakian resmi.</p>
      </header>

      <div className="booking-layout">
        <form className="booking-form" noValidate onSubmit={handleSubmit(onSubmit)}>
          <section className="booking-form-section" aria-labelledby="contact-info-title">
            <div className="booking-section-heading">
              <span className="booking-step">01</span>
              <div><h2 id="contact-info-title">Informasi pemesan</h2><p>Kontak utama untuk rencana trip ini.</p></div>
            </div>
            <div className="booking-fields-grid">
              <div className="booking-field">
                <label htmlFor="booking-full-name">Nama lengkap <span aria-hidden="true">*</span></label>
                <input autoComplete="name" id="booking-full-name" {...register("fullName")} aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? "booking-full-name-error" : undefined} placeholder="Nama sesuai identitas" />
                {errors.fullName ? <p className="booking-error" id="booking-full-name-error">{errors.fullName.message}</p> : null}
              </div>
              <div className="booking-field">
                <label htmlFor="booking-email">Email <span aria-hidden="true">*</span></label>
                <input autoComplete="email" id="booking-email" type="email" {...register("email")} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "booking-email-error" : undefined} placeholder="nama@email.com" />
                {errors.email ? <p className="booking-error" id="booking-email-error">{errors.email.message}</p> : null}
              </div>
              <div className="booking-field">
                <label htmlFor="booking-phone">Nomor telepon / WhatsApp <span aria-hidden="true">*</span></label>
                <input autoComplete="tel" id="booking-phone" inputMode="tel" type="tel" {...register("phone")} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "booking-phone-error" : undefined} placeholder="Contoh: +62 812 3456 7890" />
                {errors.phone ? <p className="booking-error" id="booking-phone-error">{errors.phone.message}</p> : null}
              </div>
              <div className="booking-field">
                <label htmlFor="booking-date">Tanggal rencana pendakian <span aria-hidden="true">*</span></label>
                <input id="booking-date" min={getLocalDateString()} type="date" {...register("departureDate")} aria-invalid={Boolean(errors.departureDate)} aria-describedby={errors.departureDate ? "booking-date-error" : undefined} />
                {errors.departureDate ? <p className="booking-error" id="booking-date-error">{errors.departureDate.message}</p> : null}
              </div>
              <div className="booking-field">
                <label htmlFor="booking-duration">Durasi pendakian <span aria-hidden="true">*</span></label>
                <select disabled={durationOptions.length === 0} id="booking-duration" {...register("durationOption")} aria-invalid={Boolean(errors.durationOption)} aria-describedby={errors.durationOption ? "booking-duration-error" : "booking-duration-hint"}>
                  {durationOptions.length ? <option value="">Pilih durasi pendakian</option> : <option value="unavailable">Informasi durasi belum tersedia</option>}
                  {durationOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
                <p className={errors.durationOption ? "booking-error" : "booking-field-hint"} id={errors.durationOption ? "booking-duration-error" : "booking-duration-hint"}>{errors.durationOption?.message ?? (durationOptions.length ? "Pilihan mengikuti estimasi durasi yang tercatat untuk destinasi ini." : "Durasi destinasi ini belum tercatat, jadi belum ada opsi yang bisa dipilih.")}</p>
              </div>
            </div>
          </section>

          <section className="booking-form-section" aria-labelledby="trip-plan-title">
            <div className="booking-section-heading">
              <span className="booking-step">02</span>
              <div><h2 id="trip-plan-title">Susunan trip</h2><p>Pilih perjalanan sendiri atau bersama rombongan.</p></div>
            </div>
            <fieldset className="booking-choice-group">
              <legend>Tipe perjalanan</legend>
              <label className={`booking-choice ${tripType === "solo" ? "booking-choice-selected" : ""}`}>
                <input type="radio" value="solo" {...tripTypeRegistration} />
                <span><strong>Sendirian</strong><small>1 peserta termasuk pemesan</small></span>
              </label>
              <label className={`booking-choice ${tripType === "group" ? "booking-choice-selected" : ""}`}>
                <input
                  type="radio"
                  value="group"
                  {...tripTypeRegistration}
                  onChange={(event) => {
                    tripTypeRegistration.onChange(event);
                    if (event.currentTarget.checked && fields.length === 0) append({ name: "" });
                  }}
                />
                <span><strong>Berkelompok</strong><small>Tambah nama anggota trip</small></span>
              </label>
            </fieldset>
            {tripType === "group" ? (
              <div className="booking-members" aria-live="polite">
                <div className="booking-members-heading"><div><h3>Anggota trip</h3><p>{participantCount} peserta termasuk pemesan</p></div><button className="booking-add-member" onClick={() => append({ name: "" })} type="button">+ Tambah anggota</button></div>
                {fields.map((field, index) => (
                  <div className="booking-member-row" key={field.id}>
                    <div className="booking-field">
                      <label htmlFor={`booking-member-${index}`}>Nama anggota {index + 1} <span aria-hidden="true">*</span></label>
                      <input id={`booking-member-${index}`} {...register(`members.${index}.name`)} aria-invalid={Boolean(errors.members?.[index]?.name)} placeholder="Nama lengkap anggota" />
                      {errors.members?.[index]?.name ? <p className="booking-error">{errors.members[index]?.name?.message}</p> : null}
                    </div>
                    <button aria-label={`Hapus anggota ${index + 1}`} className="booking-remove-member" onClick={() => remove(index)} type="button">Hapus</button>
                  </div>
                ))}
                {errors.members?.message ? <p className="booking-error">{errors.members.message}</p> : null}
              </div>
            ) : null}
          </section>

          <section className="booking-form-section" aria-labelledby="guide-title">
            <div className="booking-section-heading">
              <span className="booking-step">03</span>
              <div><h2 id="guide-title">Kebutuhan guide</h2><p>Pilih jumlah guide untuk rencana trip ini.</p></div>
            </div>
            <div className="booking-field booking-guide-select">
              <label htmlFor="booking-guide-count">Jumlah guide</label>
              <select id="booking-guide-count" {...register("guideCount", { valueAsNumber: true })} aria-invalid={Boolean(errors.guideCount)} aria-describedby={errors.guideCount ? "booking-guide-count-error" : "booking-guide-count-hint"}>
                <option value={0}>Tanpa guide</option>
                <option value={1}>1 guide</option>
                <option value={3}>3 guide</option>
                <option value={5}>5 guide</option>
              </select>
              <p className={errors.guideCount ? "booking-error" : "booking-field-hint"} id={errors.guideCount ? "booking-guide-count-error" : "booking-guide-count-hint"}>{errors.guideCount?.message ?? "Pilihan ini hanya mencatat preferensi dalam demo."}</p>
            </div>
          </section>

          <section className="booking-form-section" aria-labelledby="notes-title">
            <div className="booking-section-heading">
              <span className="booking-step">04</span>
              <div><h2 id="notes-title">Catatan tambahan</h2><p>Opsional, misalnya kebutuhan atau informasi trip lainnya.</p></div>
            </div>
            <div className="booking-field">
              <label htmlFor="booking-notes">Catatan</label>
              <textarea id="booking-notes" rows={4} {...register("notes")} aria-invalid={Boolean(errors.notes)} aria-describedby={errors.notes ? "booking-notes-error" : "booking-notes-hint"} placeholder="Tuliskan catatan yang relevan untuk rencana perjalanan..." />
              <p className={errors.notes ? "booking-error" : "booking-field-hint"} id={errors.notes ? "booking-notes-error" : "booking-notes-hint"}>{errors.notes?.message ?? "Jangan masukkan informasi pembayaran atau data sensitif."}</p>
            </div>
          </section>

          <p className="booking-demo-notice" role="note">Demo saja — belum ada biaya, ketersediaan, izin, guide, atau reservasi nyata yang dikonfirmasi.</p>
          {storageError ? <p className="booking-storage-error" role="alert">{storageError}</p> : null}
          <div className="booking-actions">
            <button className="detail-button detail-button-primary focused-page-cta" disabled={isSubmitting} type="submit">{isSubmitting ? "Menyimpan..." : "Lanjut pembayaran"}<span aria-hidden="true">→</span></button>
          </div>
        </form>

        <aside className="booking-summary" aria-label="Ringkasan rencana trip">
          <p className="section-kicker">Rencana perjalanan</p>
          <img alt={`Pemandangan ${destination.name}`} className="booking-summary-image" loading="eager" onError={(event) => {
            if (event.currentTarget.src !== new URL(destination.backgroundImage, window.location.href).href) {
              event.currentTarget.src = destination.backgroundImage;
              return;
            }
            event.currentTarget.hidden = true;
          }} src={destination.cardImage} />
          <h2>{destination.name}</h2>
          <p>{destination.shortDescription}</p>
          <dl><div><dt>Durasi</dt><dd>{durationOptions.find((option) => option.value === durationOption)?.label ?? (durationOptions.length ? "Belum dipilih" : "Belum tersedia")}</dd></div><div><dt>Peserta</dt><dd>{participantCount} orang</dd></div><div><dt>Guide</dt><dd>{guideCount === 0 ? "Tanpa guide" : `${guideCount} guide`}</dd></div><div><dt>Status</dt><dd>Demonstrasi</dd></div></dl>
          <p className="booking-summary-note">Tanggal dan kebutuhan trip diisi oleh Anda. Detail ini belum menunjukkan jadwal atau layanan yang tersedia.</p>
        </aside>
      </div>
    </article>
  );
}

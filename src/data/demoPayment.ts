import { z } from "zod";

export const bookingStorageKey = "seven-summit-rinjani-demo-booking";
export const paymentSuccessStorageKey = "seven-summit-rinjani-demo-payment-success";
export const bookingHistoryStorageKey = "seven-summit-rinjani-booking-history";
export const bookingHistoryChangedEvent = "seven-summit-rinjani:booking-history-changed";

export const demoTripPricePerParticipant = 175_000;
export const demoGuidePrice = 250_000;

export const storedBookingSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  departureDate: z.string().min(1),
  durationOption: z.string(),
  tripType: z.enum(["solo", "group"]),
  members: z.array(z.object({ name: z.string(), identityNumber: z.string().optional() })),
  identityNumber: z.string().optional(),
  emergencyName: z.string().optional(),
  emergencyPhone: z.string().optional(),
  participantCount: z.number().int().min(1),
  guideCount: z.union([z.literal(0), z.literal(1), z.literal(3), z.literal(5)]),
  destinationSlug: z.string().min(1),
  createdAt: z.string().min(1),
  status: z.literal("SIMULATED"),
  notes: z.string().optional(),
});

export const paymentMethodSchema = z.enum(["bank-transfer", "qris", "ewallet"]);

export const paymentSuccessSchema = z.object({
  booking: storedBookingSchema,
  paymentMethod: paymentMethodSchema,
  tripSubtotal: z.number().int().nonnegative(),
  guideSubtotal: z.number().int().nonnegative(),
  total: z.number().int().positive(),
  reference: z.string().min(1),
  paidAt: z.string().min(1),
  status: z.literal("SIMULATED"),
}).refine((summary) => summary.tripSubtotal + summary.guideSubtotal === summary.total, {
  message: "Ringkasan pembayaran tidak valid.",
  path: ["total"],
});

export type StoredBooking = z.infer<typeof storedBookingSchema>;
export type PaymentMethod = z.infer<typeof paymentMethodSchema>;
export type PaymentSuccessSummary = z.infer<typeof paymentSuccessSchema>;

export function readBookingHistory(): PaymentSuccessSummary[] {
  try {
    const stored = window.localStorage.getItem(bookingHistoryStorageKey);
    if (!stored) return [];
    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];

    return parsed.flatMap((entry) => {
      const result = paymentSuccessSchema.safeParse(entry);
      return result.success ? [result.data] : [];
    });
  } catch {
    return [];
  }
}

export function saveBookingHistory(summary: PaymentSuccessSummary): boolean {
  try {
    const history = readBookingHistory();
    const nextHistory = [summary, ...history.filter((entry) => entry.reference !== summary.reference)];
    window.localStorage.setItem(bookingHistoryStorageKey, JSON.stringify(nextHistory));
    window.dispatchEvent(new Event(bookingHistoryChangedEvent));
    return true;
  } catch {
    return false;
  }
}

export const paymentMethodLabels: Record<PaymentMethod, string> = {
  "bank-transfer": "Transfer bank (demo)",
  qris: "QRIS (demo)",
  ewallet: "E-Wallet (demo)",
};

export function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

import { z } from "zod";

export const bookingStorageKey = "seven-summit-rinjani-demo-booking";
export const paymentSuccessStorageKey = "seven-summit-rinjani-demo-payment-success";

export const demoTripPricePerParticipant = 175_000;
export const demoGuidePrice = 250_000;

export const storedBookingSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  departureDate: z.string().min(1),
  durationOption: z.string(),
  tripType: z.enum(["solo", "group"]),
  members: z.array(z.object({ name: z.string() })),
  participantCount: z.number().int().min(1),
  guideCount: z.union([z.literal(0), z.literal(1), z.literal(3), z.literal(5)]),
  destinationSlug: z.string().min(1),
  createdAt: z.string().min(1),
  status: z.literal("SIMULATED"),
  notes: z.string().optional(),
});

export const paymentMethodSchema = z.enum(["cash", "debit", "credit"]);

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

export const paymentMethodLabels: Record<PaymentMethod, string> = {
  cash: "Tunai",
  debit: "Kartu debit",
  credit: "Kartu kredit",
};

export function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

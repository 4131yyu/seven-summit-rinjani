import { assetPaths } from "../config/assets";
import type { LandingDestination } from "../types/landing";

/**
 * Label dan narasi tetap berupa placeholder sampai informasi destinasi
 * diverifikasi. Path gambar terpusat di src/config/assets.ts.
 */
export const landingDestinations: LandingDestination[] = assetPaths.destinationCarousel.map(
  (destination) => ({
    id: destination.id,
    selectorLabel: "Destinasi " + destination.id,
    backgroundImage: destination.backgroundImage,
    cardImage: destination.cardImage,
    description: "Informasi destinasi akan ditampilkan setelah diverifikasi.",
  }),
);

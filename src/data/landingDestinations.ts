import { assetPaths } from "../config/assets";
import type { LandingDestination } from "../types/landing";

/**
 * Data sementara untuk interaksi selector landing page.
 * Nama dan narasi final hanya boleh diisi setelah diverifikasi oleh tim.
 */
export const landingDestinations: LandingDestination[] = [
  {
    id: "destination-01",
    selectorLabel: "Destinasi 01",
    statusLabel: "Menunggu nama dan media terverifikasi",
    videoSrc: assetPaths.heroVideo,
    posterSrc: assetPaths.heroPoster,
  },
  ...Array.from({ length: 6 }, (_, index) => {
    const sequence = String(index + 2).padStart(2, "0");

    return {
      id: `destination-${sequence}`,
      selectorLabel: `Destinasi ${sequence}`,
      statusLabel: "Menunggu nama dan media terverifikasi",
      posterSrc: `/assets/images/destinations/destination-${sequence}-poster.webp`,
    };
  }),
];

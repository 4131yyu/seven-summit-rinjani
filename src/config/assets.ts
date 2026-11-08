/**
 * Lokasi aset final. Komponen harus selalu menyediakan fallback ketika berkas
 * di bawah ini tidak ada atau tidak dapat dimuat.
 */
export const assetPaths = {
  heroVideo: "/assets/videos/hero/rinjani-hero.mp4",
  heroPoster: "/assets/images/hero/gunung.webp",
  backgroundMusic: encodeURI(
    "/audio/bg_music/Akbar Chalay & Mingse - Astaga Bercanda (Lirik_Lyrics) - 7clouds Indonesia.mp3",
  ),
  mascotFallback: "/assets/mascot/animations/mascot-fallback.webp",
  mascotRive: "/assets/mascot/animations/mascot-main.riv",
} as const;

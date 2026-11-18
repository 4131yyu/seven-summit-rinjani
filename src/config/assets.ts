/**
 * Lokasi aset final. Komponen harus selalu menyediakan fallback ketika berkas
 * di bawah ini tidak ada atau tidak dapat dimuat.
 */
export const assetPaths = {
  logoLight: "/assets/images/logo/Logo-7-Summits.png",
  logoDark: "/assets/images/logo/Logo-7-Summits-BLACK.png",
  // heroVideo: "/assets/videos/hero/rinjani-hero.mp4",
  heroVideo: "/assets/videos/destinations/01-Rinjani.mp4",
  heroPoster: "/assets/images/hero/gunung.webp",
  backgroundMusic: encodeURI(
    "/audio/bg_music/Akbar Chalay & Mingse - Astaga Bercanda (Lirik_Lyrics) - 7clouds Indonesia.mp3",
  ),
  destinationCarousel: [
    {
      id: "01",
      backgroundImage: "/assets/images/destinations/01-rinjani-landscape.webp",
      cardImage: "/assets/images/carausel/01-rinjani-potret.webp",
    },
    {
      id: "02",
      backgroundImage: "/assets/images/destinations/02-sempana-landscape.webp",
      cardImage: encodeURI("/assets/images/carausel/02-bukit sempana potrait.webp"),
    },
    {
      id: "03",
      backgroundImage: "/assets/images/destinations/03-lembah-gedong-landscape.webp",
      cardImage: encodeURI("/assets/images/carausel/03-gedong potrait.webp"),
    },
    {
      id: "04",
      backgroundImage: "/assets/images/destinations/04-kondo-landscape.webp",
      cardImage: encodeURI("/assets/images/carausel/04-kondo potrait.webp"),
    },
    {
      id: "05",
      backgroundImage: "/assets/images/destinations/05-anak-dara-landscape.webp",
      cardImage: encodeURI("/assets/images/carausel/05-anak-dara-potret.webp"),
    },
    {
      id: "06",
      backgroundImage: "/assets/images/destinations/06-pergasingan-landscape.webp",
      cardImage: encodeURI("/assets/images/carausel/06-pergasingan potrait.webp"),
    },
    {
      id: "07",
      backgroundImage: "/assets/images/destinations/07-bao-daya-landscape.webp",
      cardImage: encodeURI("/assets/images/carausel/07-bao daya potret.webp"),
    },
  ],
  destinationVideos: [
    { id: "01", src: "/assets/videos/destinations/01-Rinjani.mp4" },
    { id: "02", src: "/assets/videos/destinations/02-Sempana.mp4" },
    { id: "03", src: "/assets/videos/destinations/03-Gedong.mp4" },
    { id: "04", src: "/assets/videos/destinations/04-Kondo.mp4" },
    { id: "05", src: "/assets/videos/destinations/05-Anakdara.mp4" },
    { id: "06", src: "/assets/videos/destinations/06-Pergasingan.mp4" },
    { id: "07", src: "/assets/videos/destinations/07-Baodaya.mp4" },
  ],
  mascotFallback: "/assets/mascot/animations/mascot-fallback.webp",
  mascotRive: "/assets/mascot/animations/mascot-main.riv",
} as const;

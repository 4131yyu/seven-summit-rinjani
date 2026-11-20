/**
 * Lokasi aset final. Komponen harus selalu menyediakan fallback ketika berkas
 * di bawah ini tidak ada atau tidak dapat dimuat.
 */
export const assetPaths = {
  logoLight: "/assets/images/logo/Logo-7-Summits.png",
  logoDark: "/assets/images/logo/Logo-7-Summits-BLACK.png",
  landingHeroVideo: "/assets/videos/bg_video/05-Anakdara.mp4",
  authVideo: "/assets/videos/bg_video/02-Sempana.mp4",
  heroPoster: "/assets/images/hero/alternative_background.webp",
  backgroundMusic: encodeURI(
    "/audio/bg_music/Aylex-Geography.mp3",
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
    {
      id: "01",
      ID: "/assets/videos/destinations/Video_ID/01-Rinjani.mp4",
      EN: "/assets/videos/destinations/Video_EN/01-Rinjani.mp4",
    },
    {
      id: "02",
      ID: "/assets/videos/destinations/Video_ID/02-Sempana.mp4",
      EN: "/assets/videos/destinations/Video_EN/02-Sempana.mp4",
    },
    {
      id: "03",
      ID: "/assets/videos/destinations/Video_ID/03-gedong.mp4",
      EN: "/assets/videos/destinations/Video_EN/03-Lembah-Gedong.mp4",
    },
    {
      id: "04",
      ID: "/assets/videos/destinations/Video_ID/04-kondo.mp4",
      EN: "/assets/videos/destinations/Video_EN/04-Bukit-Kondo.mp4",
    },
    {
      id: "05",
      ID: "/assets/videos/destinations/Video_ID/05-Anakdara.mp4",
      EN: "/assets/videos/destinations/Video_EN/05-Anakdara.mp4",
    },
    {
      id: "06",
      ID: "/assets/videos/destinations/Video_ID/06-pergasingan.mp4",
      EN: "/assets/videos/destinations/Video_EN/06-Pergasingan.mp4",
    },
    {
      id: "07",
      ID: "/assets/videos/destinations/Video_ID/07-bao-daya.mp4",
      EN: "/assets/videos/destinations/Video_EN/07-Baodaya.mp4",
    },
  ],
  mascotFallback: "/assets/mascot/animations/mascot-fallback.webp",
  mascotRive: "/assets/mascot/animations/mascot-main.riv",
} as const;

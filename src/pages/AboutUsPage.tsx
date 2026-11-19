import { Link } from "react-router";

import { BrandFooter } from "../components/layout/BrandFooter";
import { destinations } from "../data/destinations";

export function AboutUsPage() {
  return (
    <>
      <section aria-labelledby="about-title" className="flex flex-1 flex-col justify-center bg-cream px-6 py-14 sm:px-10 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <div className="about-image-wrap">
            <img alt="Lanskap pegunungan di kawasan Sembalun" className="h-full w-full object-cover" loading="lazy" src={destinations[0].backgroundImage} />
          </div>
          <div>
            <p className="section-kicker">Tentang kami</p>
            <h1 className="section-title mt-3" id="about-title">Mengenal Seven Summit Rinjani</h1>
            <p className="mt-5 text-sm leading-7 text-charcoal/75 sm:text-base">Seven Summit Rinjani mengajak kamu mengenal ragam lanskap dan pengalaman alam di kawasan Sembalun, Lombok. Setiap destinasi memiliki karakter dan daya tariknya sendiri—mulai dari suasana perbukitan hingga panorama pegunungan—yang memberi banyak cara untuk menikmati perjalanan di alam terbuka.</p>
            <p className="mt-3 text-sm leading-7 text-charcoal/75 sm:text-base">Melalui website ini, kamu dapat melihat pengenalan destinasi, membaca informasi yang tersedia, dan menemukan inspirasi untuk merencanakan petualangan sesuai minatmu. Ingin mulai memilih tujuan? Jelajahi destinasi Seven Summit Rinjani dan temukan tempat yang ingin kamu kenal lebih dekat.</p>
            <Link className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-terracotta px-6 font-semibold text-white transition hover:bg-terracotta/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest" to="/explore">Jelajahi Destinasi</Link>
          </div>
        </div>
      </section>
      <BrandFooter />
    </>
  );
}

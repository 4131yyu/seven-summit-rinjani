import { Link } from "react-router";

export function NotFoundPage() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-7xl items-center px-5 py-16 sm:px-8">
      <div>
        <p className="text-sm font-semibold tracking-[0.2em] text-terracotta uppercase">404</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-forest">Halaman tidak ditemukan</h1>
        <p className="mt-4 max-w-xl text-charcoal/80">
          Alamat yang Anda buka belum tersedia atau sudah tidak berlaku.
        </p>
        <Link className="button-primary mt-8 inline-flex" to="/">
          Kembali ke beranda
        </Link>
      </div>
    </section>
  );
}

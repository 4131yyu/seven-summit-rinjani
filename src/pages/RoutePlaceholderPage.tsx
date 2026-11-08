type RoutePlaceholderPageProps = {
  title: string;
};

export function RoutePlaceholderPage({ title }: RoutePlaceholderPageProps) {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-7xl items-center px-5 py-16 sm:px-8">
      <div className="max-w-xl rounded-3xl border border-forest/10 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold tracking-[0.2em] text-terracotta uppercase">Dalam persiapan</p>
        <h1 className="mt-3 font-display text-3xl font-semibold text-forest">{title}</h1>
        <p className="mt-4 leading-7 text-charcoal/80">
          Rute ini telah disiapkan agar struktur navigasi dapat diuji sejak awal. Fungsinya akan
          diimplementasikan pada fase proyek yang relevan.
        </p>
      </div>
    </section>
  );
}

import { NavLink, Outlet, useLocation } from "react-router";

import { assetPaths } from "../../config/assets";
import { BackgroundMusic } from "./BackgroundMusic";

const navigationItems = [
  { label: "Jelajah", href: "#galeri-destinasi" },
  { label: "Tentang", href: "#tentang" },
  { label: "Kontak", href: "#kontak" },
] as const;

export function AppShell() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  return (
    <div className="min-h-screen bg-cream text-charcoal">
      <a className="skip-link" href="#konten-utama">
        Lewati navigasi
      </a>
      <header className={`z-20 inset-x-0 top-0 ${isLandingPage ? "absolute border-b border-white/10 bg-charcoal/15 text-white backdrop-blur-sm" : "relative border-b border-forest/10 bg-cream/95 text-forest backdrop-blur"}`}>
        <nav
          aria-label="Navigasi utama"
          className="mx-auto flex w-full max-w-384 items-center gap-4 px-5 py-4 sm:px-8 lg:px-12"
        >
          <NavLink className="font-display text-lg font-semibold tracking-tight" to="/">
            Seven Summit Rinjani
          </NavLink>
          <div className="ml-auto hidden items-center gap-8 md:flex">
            {navigationItems.map((item) => (
              <a className={`rounded-full px-3 py-2 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta ${isLandingPage ? "hover:bg-white/15" : "hover:bg-forest/10"}`} href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
            <NavLink className={`rounded-full px-3 py-2 text-sm font-semibold ${isLandingPage ? "hover:bg-white/15" : "hover:bg-forest/10"}`} to="/login">Masuk</NavLink>
            <a className="rounded-full bg-terracotta px-4 py-2 text-sm font-semibold text-white" href="#galeri-destinasi">Mulai jelajah</a>
          </div>
          <details className="relative ml-auto md:hidden">
            <summary className="cursor-pointer rounded-full border border-current/40 bg-charcoal/20 px-3 py-2 text-sm font-semibold">Menu</summary>
            <div className="absolute right-0 mt-3 flex min-w-48 flex-col rounded-2xl bg-cream p-2 text-forest shadow-xl">
              {navigationItems.map((item) => (<a className="rounded-xl px-3 py-2 hover:bg-forest/10" href={item.href} key={item.href}>{item.label}</a>))}
              <NavLink className="rounded-xl px-3 py-2 hover:bg-forest/10" to="/login">Masuk</NavLink>
            </div>
          </details>
        </nav>
      </header>
      <main id="konten-utama">
        <Outlet />
      </main>
      <BackgroundMusic src={assetPaths.backgroundMusic} />
    </div>
  );
}

import { NavLink, Outlet } from "react-router";

const navigationItems = [
  { label: "Beranda", to: "/" },
  { label: "Destinasi", to: "/destinations" },
  { label: "Masuk", to: "/login" },
] as const;

export function AppShell() {
  return (
    <div className="min-h-screen bg-cream text-charcoal">
      <a className="skip-link" href="#konten-utama">
        Lewati navigasi
      </a>
      <header className="border-b border-forest/10 bg-cream/95 backdrop-blur">
        <nav
          aria-label="Navigasi utama"
          className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8"
        >
          <NavLink className="font-display text-lg font-semibold tracking-tight text-forest" to="/">
            Seven Summit Rinjani
          </NavLink>
          <div className="flex items-center gap-1" role="list">
            {navigationItems.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  `rounded-full px-3 py-2 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta ${
                    isActive ? "bg-forest text-white" : "text-deep-green hover:bg-forest/10"
                  }`
                }
                key={item.to}
                to={item.to}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
      </header>
      <main id="konten-utama">
        <Outlet />
      </main>
    </div>
  );
}

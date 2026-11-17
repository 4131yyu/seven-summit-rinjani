import { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router";

import { assetPaths } from "../../config/assets";
import { BackgroundMusic } from "./BackgroundMusic";

const navigationItems = [
  { label: "Jelajah", href: "#seven-summit" },
  { label: "Tentang", href: "#active-destination" },
  { label: "Kontak", href: "#contact-placeholder" },
] as const;

export function AppShell() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [language, setLanguage] = useState<"ID" | "EN">("ID");
  const location = useLocation();
  const isLandingPage = location.pathname === "/";
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="min-h-screen bg-cream text-charcoal">
      <a className="skip-link" href={isAuthPage ? "#auth-main" : "#konten-utama"}>
        Lewati navigasi
      </a>
      {!isAuthPage ? <header className={`site-navbar z-20 ${isLandingPage ? "site-navbar-floating" : "relative border-b border-forest/10 bg-cream/95 text-forest backdrop-blur"}`}>
        <nav
          aria-label="Navigasi utama"
          className={`site-navbar-inner mx-auto grid w-full grid-cols-[1fr_auto] items-center gap-3 ${isLandingPage ? "max-w-none px-3 py-2.5 sm:px-5 sm:py-3" : "max-w-384 px-5 py-4 sm:px-8 lg:px-12"}`}
        >
          <NavLink aria-label="Seven Summit Rinjani, beranda" className="flex shrink-0 items-center gap-2.5 font-display text-lg font-semibold tracking-tight" to="/">
            <span aria-hidden="true" className="brand-logo-placeholder">SS</span>
            <span className="hidden sm:inline">Seven Summit Rinjani</span>
            <span className="sm:hidden">Seven Summit</span>
          </NavLink>
          <div className="site-navbar-links hidden items-center justify-center gap-1 md:flex">
            {navigationItems.map((item) => (
              <a className="navbar-link" href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
          </div>

          <div className="site-navbar-actions flex items-center justify-self-end gap-1.5 sm:gap-2">
            <form
              className={`navbar-search ${searchOpen ? "navbar-search-open" : ""}`}
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <label className="sr-only" htmlFor="site-search">Search destinations</label>
              {searchOpen ? <input autoFocus className="navbar-search-input" id="site-search" placeholder="Search (soon)" type="search" /> : null}
              <button aria-label={searchOpen ? "Submit search" : "Open search"} className="navbar-icon-button" onClick={() => setSearchOpen((open) => !open)} type={searchOpen ? "submit" : "button"}>
                <svg aria-hidden="true" fill="none" height="17" viewBox="0 0 24 24" width="17"><circle cx="10.8" cy="10.8" r="6.3" stroke="currentColor" strokeWidth="1.7" /><path d="m15.5 15.5 4.2 4.2" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" /></svg>
              </button>
            </form>

            <span aria-hidden="true" className="navbar-separator" />

            <button aria-label={`Change language, currently ${language}`} className="navbar-language-button" onClick={() => setLanguage((current) => current === "ID" ? "EN" : "ID")} type="button">
              <span aria-hidden="true" className="navbar-language-flag">{language === "ID" ? "🇮🇩" : "🇬🇧"}</span>
              <span>{language}</span>
            </button>

            <NavLink aria-label="Profile, sign in" className="navbar-icon-button hidden sm:inline-flex" to="/login">
              <svg aria-hidden="true" fill="none" height="18" viewBox="0 0 24 24" width="18"><circle cx="12" cy="8" r="3.3" stroke="currentColor" strokeWidth="1.6" /><path d="M5.5 20c.7-3.2 3-5 6.5-5s5.8 1.8 6.5 5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" /></svg>
            </NavLink>

            <details className="navbar-menu relative">
              <summary aria-label="Open navigation menu" className="navbar-icon-button">
                <svg aria-hidden="true" fill="none" height="19" viewBox="0 0 24 24" width="19"><path d="M4 6.5h16M4 12h16M4 17.5h16" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" /></svg>
              </summary>
              <div className="navbar-menu-popover">
                <p className="navbar-menu-title">Seven Summit Rinjani</p>
                {navigationItems.map((item) => (
                  <a href={item.href} key={item.href}>{item.label}</a>
                ))}
                <NavLink to="/login">Masuk</NavLink>
              </div>
            </details>
          </div>
        </nav>
      </header> : null}
      <main id={isAuthPage ? "auth-main" : "konten-utama"}>
        <Outlet />
      </main>
      <BackgroundMusic src={assetPaths.backgroundMusic} />
    </div>
  );
}

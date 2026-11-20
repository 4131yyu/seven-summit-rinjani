import { useEffect, useState, type MouseEvent } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router";

import { assetPaths } from "../../config/assets";
import { bookingHistoryChangedEvent, readBookingHistory } from "../../data/demoPayment";
import { useLanguage } from "../../i18n/LanguageProvider";
import { BackgroundMusic } from "./BackgroundMusic";

export function AppShell() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [bookingHistoryCount, setBookingHistoryCount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { language, t, toggleLanguage } = useLanguage();
  const isLandingPage = location.pathname === "/";
  const isHomePage = location.pathname === "/home";
  const isBookingHistoryPage = location.pathname === "/booking-history";
  const isExplorePage = location.pathname === "/explore";
  const isInfoPage = location.pathname === "/about-us" || location.pathname === "/contact";
  const isBookingPage = /^\/booking\/[^/]+$/.test(location.pathname);
  const isDestinationDetailPage = /^\/destinations\/[^/]+$/.test(location.pathname);
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";
  const isPaymentFlowPage = location.pathname === "/checkout" || location.pathname === "/payment/success";
  const isFocusedPage = /^\/destinations\/[^/]+$/.test(location.pathname);
  const navigationItems = isHomePage
    ? [
      { label: t("nav.explore"), href: "/explore" },
      { label: t("nav.about"), href: "/about-us" },
      { label: t("nav.contact"), href: "/contact" },
    ] as const
    : [];

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const updateBookingHistoryCount = () => setBookingHistoryCount(readBookingHistory().length);
    updateBookingHistoryCount();
    window.addEventListener(bookingHistoryChangedEvent, updateBookingHistoryCount);
    window.addEventListener("storage", updateBookingHistoryCount);
    return () => {
      window.removeEventListener(bookingHistoryChangedEvent, updateBookingHistoryCount);
      window.removeEventListener("storage", updateBookingHistoryCount);
    };
  }, []);

  useEffect(() => {
    if (!["/home", "/explore", "/about-us", "/contact"].includes(location.pathname)) return;
    if (location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== "/home" || !location.hash) return;

    const sectionId = decodeURIComponent(location.hash.slice(1));
    let frame = 0;
    let attempts = 0;
    const scrollWhenReady = () => {
      const section = document.getElementById(sectionId);
      if (!section && attempts < 10) {
        attempts += 1;
        frame = window.requestAnimationFrame(scrollWhenReady);
        return;
      }
      section?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
    };
    frame = window.requestAnimationFrame(scrollWhenReady);

    return () => window.cancelAnimationFrame(frame);
  }, [location.hash, location.pathname]);

  const sectionHref = (href: string) => href;
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
  };
  const handleSectionNavigation = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    event.preventDefault();
    if (!href.includes("#")) {
      navigate(href);
      return;
    }
    const sectionId = href.slice(href.indexOf("#") + 1);
    if (isHomePage) {
      window.history.replaceState(null, "", href);
      scrollToSection(sectionId);
      return;
    }
    navigate(href);
  };
  const handleHomeLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!isHomePage || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    window.history.replaceState(null, "", "/home");
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  };

  return (
    <div className={`${isLandingPage ? "landing-page-shell h-dvh overflow-clip" : isHomePage ? "homepage-shell h-dvh overflow-hidden flex flex-col" : "min-h-screen flex flex-col"} bg-cream text-charcoal`}>
      <a className="skip-link" href={isAuthPage ? "#auth-main" : "#konten-utama"}>
        {t("nav.skip")}
      </a>
      {isLandingPage ? (
        <header className="site-navbar site-navbar-floating site-navbar-hoverable z-20">
          <nav aria-label={t("nav.brandIdentity")} className="site-navbar-inner mx-auto flex w-full max-w-none items-center px-3 py-2.5 sm:px-5 sm:py-3">
            <Link aria-label={t("brand.landing")} className="site-brand-link" to="/">
              <img alt="Seven Summit Rinjani" className="site-brand-logo site-brand-logo-light" src={assetPaths.logoLight} />
              <img aria-hidden="true" className="site-brand-logo site-brand-logo-dark" src={assetPaths.logoDark} />
            </Link>
          </nav>
        </header>
      ) : null}
      {!isAuthPage && !isFocusedPage && !isBookingPage && !isPaymentFlowPage && !isLandingPage ? <header className={`site-navbar z-20 ${isHomePage ? `site-navbar-floating site-navbar-hoverable ${hasScrolled ? "site-navbar-scrolled" : ""}` : isExplorePage || isInfoPage ? "site-navbar-hoverable site-navbar-scrolled relative border-b border-forest/10 bg-cream/95 text-forest backdrop-blur" : "relative border-b border-forest/10 bg-cream/95 text-forest backdrop-blur"}`}>
        <nav
          aria-label={t("nav.main")}
          className={`site-navbar-inner mx-auto grid w-full grid-cols-[1fr_auto] items-center gap-3 ${isHomePage ? "max-w-none px-3 py-2.5 sm:px-5 sm:py-3" : "max-w-384 px-5 py-4 sm:px-8 lg:px-12"}`}
        >
          <Link aria-label={t("brand.home")} className={`site-brand-link ${isBookingHistoryPage ? "site-brand-link-dark" : ""}`} onClick={handleHomeLogoClick} to="/home">
            <img alt="Seven Summit Rinjani" className="site-brand-logo site-brand-logo-light" src={assetPaths.logoLight} />
            <img aria-hidden="true" className="site-brand-logo site-brand-logo-dark" src={assetPaths.logoDark} />
          </Link>
          <div className={`site-navbar-links hidden items-center justify-center gap-1 ${isHomePage ? "md:flex" : ""}`}>
            {navigationItems.map((item) => (
              <Link aria-current={item.href === "/explore" && isExplorePage ? "page" : undefined} className="navbar-link navbar-cta-link" onClick={(event) => handleSectionNavigation(event, sectionHref(item.href))} to={sectionHref(item.href)} key={item.href}>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="site-navbar-actions flex items-center justify-self-end gap-1.5 sm:gap-2">
            <form
              className={`navbar-search ${searchOpen ? "navbar-search-open" : ""}`}
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <label className="sr-only" htmlFor="site-search">{t("nav.search.label")}</label>
              {searchOpen ? <input autoFocus className="navbar-search-input" id="site-search" placeholder={t("nav.search.placeholder")} type="search" /> : null}
              <button aria-label={searchOpen ? t("nav.search.submit") : t("nav.search.open")} className="navbar-icon-button" onClick={() => setSearchOpen((open) => !open)} type={searchOpen ? "submit" : "button"}>
                <svg aria-hidden="true" fill="none" height="17" viewBox="0 0 24 24" width="17"><circle cx="10.8" cy="10.8" r="6.3" stroke="currentColor" strokeWidth="1.7" /><path d="m15.5 15.5 4.2 4.2" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" /></svg>
              </button>
            </form>

            <span aria-hidden="true" className="navbar-separator" />

            <button aria-label={`${t("nav.language.change")}, ${language}`} className="navbar-language-button" onClick={toggleLanguage} type="button">
              <span aria-hidden="true" className="navbar-language-flag">{language === "ID" ? "🇮🇩" : "\u{1F1FA}\u{1F1F8}"}</span>
              <span>{language}</span>
            </button>

            <NavLink aria-label={t("nav.profile")} className="navbar-icon-button hidden sm:inline-flex" to="/login">
              <svg aria-hidden="true" fill="none" height="18" viewBox="0 0 24 24" width="18"><circle cx="12" cy="8" r="3.3" stroke="currentColor" strokeWidth="1.6" /><path d="M5.5 20c.7-3.2 3-5 6.5-5s5.8 1.8 6.5 5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" /></svg>
            </NavLink>

            {isHomePage ? <NavLink aria-label={`${t("nav.history")}, ${bookingHistoryCount} ${t("nav.history.count")}`} className="navbar-icon-button navbar-history-link" title={t("nav.history")} to="/booking-history">
              <svg aria-hidden="true" fill="none" height="18" viewBox="0 0 24 24" width="18"><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" /></svg>
              {bookingHistoryCount > 0 ? <span aria-hidden="true" className="navbar-history-count">{bookingHistoryCount > 99 ? "99+" : bookingHistoryCount}</span> : null}
            </NavLink> : null}

            <details className="navbar-menu relative">
              <summary aria-label={t("nav.menu.open")} className="navbar-icon-button">
                <svg aria-hidden="true" fill="none" height="19" viewBox="0 0 24 24" width="19"><path d="M4 6.5h16M4 12h16M4 17.5h16" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" /></svg>
              </summary>
              <div className="navbar-menu-popover">
                <p className="navbar-menu-title">{t("nav.menu.title")}</p>
                {navigationItems.map((item) => (
                  <Link className="navbar-cta-link" onClick={(event) => handleSectionNavigation(event, sectionHref(item.href))} to={sectionHref(item.href)} key={item.href}>{item.label}</Link>
                ))}
                <NavLink to="/login">{t("nav.signin")}</NavLink>
              </div>
            </details>
          </div>
        </nav>
      </header> : null}
      {isFocusedPage ? <div className="focused-route-header"><Link aria-label={t("checkout.backExplore")} className="focused-route-back" to="/explore"><span aria-hidden="true">←</span> {t("checkout.backExplore")}</Link></div> : null}
      <main className={!isLandingPage ? `flex flex-1 flex-col ${isHomePage ? "min-h-0" : ""}` : undefined} id={isAuthPage ? "auth-main" : "konten-utama"}>
        <Outlet />
      </main>
      <BackgroundMusic isSuppressed={isDestinationDetailPage} showControls={!isLandingPage} src={assetPaths.backgroundMusic} />
    </div>
  );
}

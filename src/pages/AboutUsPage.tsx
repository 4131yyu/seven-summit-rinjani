import { Link } from "react-router";

import { BrandFooter } from "../components/layout/BrandFooter";
import { destinations } from "../data/destinations";
import { useLanguage } from "../i18n/LanguageProvider";

export function AboutUsPage() {
  const { t } = useLanguage();
  return (
    <>
      <section aria-labelledby="about-title" className="about-us-page flex flex-1 flex-col justify-center bg-cream px-6 py-14 sm:px-10 sm:py-20">
        <div className="about-us-layout">
          <div className="about-us-image-wrap">
            <img alt={t("contact.imageAlt")} className="h-full w-full object-cover" loading="lazy" src={destinations[0].backgroundImage} />
          </div>
          <div className="about-us-copy">
            <p className="section-kicker">{t("about.kicker")}</p>
            <h1 className="section-title mt-3" id="about-title">{t("about.title")}</h1>
            <p className="mt-5 text-sm leading-7 text-charcoal/75 sm:text-base">{t("about.p1")}</p>
            <p className="mt-3 text-sm leading-7 text-charcoal/75 sm:text-base">{t("about.p2")}</p>
            <Link className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-terracotta px-6 font-semibold text-white transition hover:bg-terracotta/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest" to="/explore">{t("about.explore")}</Link>
          </div>
        </div>
      </section>
      <BrandFooter />
    </>
  );
}

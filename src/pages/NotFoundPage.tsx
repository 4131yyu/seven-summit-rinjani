import { Link } from "react-router";
import { useLanguage } from "../i18n/LanguageProvider";

export function NotFoundPage() {
  const { t } = useLanguage();
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-7xl items-center px-5 py-16 sm:px-8">
      <div>
        <p className="text-sm font-semibold tracking-[0.2em] text-terracotta uppercase">404</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-forest">{t("notFound.title")}</h1>
        <p className="mt-4 max-w-xl text-charcoal/80">{t("notFound.copy")}</p>
        <Link className="button-primary mt-8 inline-flex" to="/">
          {t("notFound.home")}
        </Link>
      </div>
    </section>
  );
}

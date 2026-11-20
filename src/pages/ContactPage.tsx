import { BrandFooter } from "../components/layout/BrandFooter";
import { useLanguage } from "../i18n/LanguageProvider";

export function ContactPage() {
  const { t } = useLanguage();
  return (
    <>
      <section aria-labelledby="contact-title" className="flex flex-1 flex-col justify-center bg-deep-green px-6 py-12 text-white sm:px-10 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="section-kicker text-cream/75">{t("contact.kicker")}</p>
            <h1 className="mt-3 font-display text-3xl font-semibold sm:text-4xl" id="contact-title">{t("contact.title")}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/80">{t("contact.copy")}</p>
          </div>
          <form className="grid gap-4 rounded-2xl border border-white/15 bg-white/5 p-5 sm:p-7" onSubmit={(event) => event.preventDefault()}>
            <label className="grid gap-1.5 text-sm font-medium" htmlFor="contact-name">{t("contact.name")}<input autoComplete="name" className="contact-form-field" id="contact-name" name="name" placeholder={t("contact.name.placeholder")} required /></label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-1.5 text-sm font-medium" htmlFor="contact-email">{t("contact.email")}<input autoComplete="email" className="contact-form-field" id="contact-email" name="email" placeholder={t("contact.email.placeholder")} required type="email" /></label>
              <label className="grid gap-1.5 text-sm font-medium" htmlFor="contact-phone">{t("contact.phone")}<input autoComplete="tel" className="contact-form-field" id="contact-phone" name="phone" placeholder="08xxxxxxxxxx" required type="tel" /></label>
            </div>
            <label className="grid gap-1.5 text-sm font-medium" htmlFor="contact-question">{t("contact.question")}<textarea className="contact-form-field min-h-32 resize-y" id="contact-question" name="question" placeholder={t("contact.question.placeholder")} required rows={4} /></label>
            <div><button className="inline-flex min-h-12 items-center justify-center rounded-full bg-terracotta px-6 font-semibold text-white transition hover:bg-terracotta/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white" type="submit">{t("contact.submit")}</button></div>
          </form>
        </div>
      </section>
      <BrandFooter />
    </>
  );
}

import { useLanguage } from "../../i18n/LanguageProvider";

export function AuthLanguageToggle() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div aria-label={t("nav.language.change")} className="auth-language-toggle" role="group">
      <button
        aria-pressed={language === "ID"}
        className={language === "ID" ? "auth-language-option auth-language-option-active" : "auth-language-option"}
        onClick={() => setLanguage("ID")}
        title={t("auth.language.indonesian")}
        type="button"
      >
        ID
      </button>
      <span aria-hidden="true" className="auth-language-divider">|</span>
      <button
        aria-pressed={language === "EN"}
        className={language === "EN" ? "auth-language-option auth-language-option-active" : "auth-language-option"}
        onClick={() => setLanguage("EN")}
        title={t("auth.language.english")}
        type="button"
      >
        EN
      </button>
    </div>
  );
}

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { translate, type Language, type TranslationKey } from "./translations";

const LANGUAGE_STORAGE_KEY = "seven-summit-rinjani-language";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  t: (key: TranslationKey) => string;
  formatDate: (value: string, options?: Intl.DateTimeFormatOptions) => string;
  formatDateTime: (value: string) => string;
  formatNumber: (value: number) => string;
  formatCurrency: (value: number) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readSavedLanguage(): Language {
  try {
    return window.localStorage.getItem(LANGUAGE_STORAGE_KEY) === "EN" ? "EN" : "ID";
  } catch {
    return "ID";
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(readSavedLanguage);

  useEffect(() => {
    document.documentElement.lang = language === "ID" ? "id" : "en-US";
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch {
      // Language switching still works for this session if storage is unavailable.
    }
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage((current) => current === "ID" ? "EN" : "ID");
  }, []);
  const t = useCallback((key: TranslationKey) => translate(language, key), [language]);
  const locale = language === "ID" ? "id-ID" : "en-US";
  const formatDate = useCallback((value: string, options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" }) => {
    if (!value) return t("booking.date.missing");
    return new Date(`${value.slice(0, 10)}T00:00:00`).toLocaleDateString(locale, options);
  }, [locale, t]);
  const formatDateTime = useCallback((value: string) => new Date(value).toLocaleString(locale, { dateStyle: "long", timeStyle: "short" }), [locale]);
  const formatNumber = useCallback((value: number) => new Intl.NumberFormat(locale).format(value), [locale]);
  const formatCurrency = useCallback((value: number) => new Intl.NumberFormat(locale, { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value), [locale]);

  const value = useMemo(() => ({ language, setLanguage, toggleLanguage, t, formatDate, formatDateTime, formatNumber, formatCurrency }), [formatCurrency, formatDate, formatDateTime, formatNumber, language, t, toggleLanguage]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage harus digunakan di dalam LanguageProvider.");
  return context;
}

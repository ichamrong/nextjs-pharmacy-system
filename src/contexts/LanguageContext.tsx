"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import enTranslations from "@/i18n/locales/en.json";
import kmTranslations from "@/i18n/locales/km.json";
import { useParams, useRouter } from "next/navigation";

type Language = "en" | "km";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const router = useRouter();
  const [language, setLanguageState] = useState<Language>(
    (params?.locale as Language) || "en",
  );
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    // Update the URL with the new locale
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(/^\/[^\/]+/, `/${lang}`);
    router.push(newPath);
  };

  const t = (key: string): string => {
    if (!isClient) {
      // During SSR, use the initial language from params
      const translations =
        (params?.locale as Language) === "km" ? kmTranslations : enTranslations;
      const value = key
        .split(".")
        .reduce(
          (obj: Record<string, unknown>, k) =>
            obj?.[k] as Record<string, unknown>,
          translations,
        );
      return typeof value === "string" ? value : key;
    }

    const translations = language === "km" ? kmTranslations : enTranslations;
    const value = key
      .split(".")
      .reduce(
        (obj: Record<string, unknown>, k) =>
          obj?.[k] as Record<string, unknown>,
        translations,
      );
    return typeof value === "string" ? value : key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

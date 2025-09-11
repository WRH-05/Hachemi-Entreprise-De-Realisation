"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"
import { en } from "@/translations/en"
import { fr } from "@/translations/fr"
import { ar } from "@/translations/ar"

type Language = "en" | "fr" | "ar"
type Translations = typeof en

interface LanguageContextType {
  language: Language
  translations: Translations
  setLanguage: (lang: Language) => void
  dir: "ltr" | "rtl"
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  // Determine text direction based on language
  const dir = language === "ar" ? "rtl" : "ltr"

  // Apply direction to document
  useEffect(() => {
    document.documentElement.dir = dir
    document.documentElement.lang = language
  }, [language, dir])

  const getTranslations = useCallback(() => {
    switch (language) {
      case "fr":
        return fr
      case "ar":
        return ar
      default:
        return en
    }
  }, [language])

  return (
    <LanguageContext.Provider
      value={{
        language,
        translations: getTranslations(),
        setLanguage,
        dir,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

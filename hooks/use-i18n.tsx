"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { translations, type SupportedLocale, type TranslationKey } from "@/lib/i18n/translations"
import { languages, getLanguageByCode, getBrowserLanguage, type Language } from "@/lib/i18n/languages"
import { formatDateTime, formatTimeAgo, formatNumber, formatCurrency } from "@/lib/i18n/format-utils"

interface I18nContextType {
  locale: SupportedLocale
  language: Language
  setLocale: (locale: SupportedLocale) => void
  t: (key: string, params?: Record<string, string | number>) => string
  formatDate: (date: Date | number, format?: string) => string
  formatRelativeTime: (date: Date | number) => string
  formatNum: (num: number, options?: Intl.NumberFormatOptions) => string
  formatCurrency: (amount: number, currency?: string) => string
  dir: "ltr" | "rtl"
  availableLanguages: Language[]
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

const DEFAULT_LOCALE: SupportedLocale = "en"

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<SupportedLocale>(DEFAULT_LOCALE)
  const [loaded, setLoaded] = useState(false)
  const language = getLanguageByCode(locale)
  const dir = language.rtl ? "rtl" : "ltr"

  // Load language preference from localStorage on mount or detect browser language
  useEffect(() => {
    const savedLocale = localStorage.getItem("preferred-language")

    if (savedLocale && Object.keys(translations).includes(savedLocale)) {
      setLocaleState(savedLocale as SupportedLocale)
    } else {
      // Try to detect browser language
      const browserLocale = getBrowserLanguage()
      setLocaleState(browserLocale)
    }

    setLoaded(true)
  }, [])

  // Save language preference to localStorage when it changes
  useEffect(() => {
    if (loaded) {
      localStorage.setItem("preferred-language", locale)

      // Set HTML attributes for language and direction
      document.documentElement.lang = locale
      document.documentElement.dir = dir

      // You could also add a class for RTL styling if needed
      if (dir === "rtl") {
        document.documentElement.classList.add("rtl")
      } else {
        document.documentElement.classList.remove("rtl")
      }
    }
  }, [locale, loaded, dir])

  const setLocale = (newLocale: SupportedLocale) => {
    if (Object.keys(translations).includes(newLocale)) {
      setLocaleState(newLocale)
    }
  }

  // Translation function with parameter support
  const t = (key: string, params?: Record<string, string | number>): string => {
    const currentTranslations = translations[locale] || translations[DEFAULT_LOCALE]
    let text = currentTranslations[key as TranslationKey] || translations[DEFAULT_LOCALE][key as TranslationKey] || key

    // Replace parameters in the translation string
    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        text = text.replace(new RegExp(`{${paramKey}}`, "g"), String(paramValue))
      })
    }

    return text
  }

  // Date formatting with the current locale
  const formatDate = (date: Date | number, format?: string): string => {
    const dateFormat = format || t("date.format.short")
    return formatDateTime(date, dateFormat, locale)
  }

  // Relative time formatting
  const formatRelativeTime = (date: Date | number): string => {
    return formatTimeAgo(date, locale)
  }

  // Number formatting
  const formatNum = (num: number, options?: Intl.NumberFormatOptions): string => {
    return formatNumber(num, locale, options)
  }

  // Currency formatting
  const formatCurr = (amount: number, currency?: string): string => {
    return formatCurrency(amount, locale, currency)
  }

  return (
    <I18nContext.Provider
      value={{
        locale,
        language,
        setLocale,
        t,
        formatDate,
        formatRelativeTime,
        formatNum,
        formatCurrency: formatCurr,
        dir,
        availableLanguages: languages,
      }}
    >
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}

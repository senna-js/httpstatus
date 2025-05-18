import type { SupportedLocale } from "./translations"
import { translations } from "./translations" // Import the translations variable

export type Language = {
  code: SupportedLocale
  name: string
  flag: string
  nativeName: string
  rtl?: boolean
}

export const languages: Language[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪" },
  { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵" },
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦", rtl: true },
  { code: "pt", name: "Portuguese", nativeName: "Português", flag: "🇵🇹" },
  { code: "it", name: "Italian", nativeName: "Italiano", flag: "🇮🇹" },
]

export const getLanguageByCode = (code: string): Language => {
  return languages.find((lang) => lang.code === code) || languages[0]
}

export const getBrowserLanguage = (): SupportedLocale => {
  if (typeof window === "undefined") return "en"

  const browserLang = navigator.language.split("-")[0] as SupportedLocale
  return Object.keys(translations).includes(browserLang) ? browserLang : "en"
}

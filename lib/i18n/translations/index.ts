import { en } from "./en"
import { es } from "./es"
import { fr } from "./fr"
import { de } from "./de"
import { ja } from "./ja"
import { ar } from "./ar"
import { pt } from "./pt"
import { it } from "./it"

export type TranslationKey = keyof typeof en

export const translations = {
  en,
  es,
  fr,
  de,
  ja,
  ar,
  pt,
  it,
}

export type SupportedLocale = keyof typeof translations

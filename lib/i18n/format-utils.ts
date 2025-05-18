import { format as formatDate, formatDistanceToNow } from "date-fns"
import { enUS, es, fr, de, ja, arSA, ptBR, it } from "date-fns/locale"
import type { SupportedLocale } from "./translations"

const locales = {
  en: enUS,
  es: es,
  fr: fr,
  de: de,
  ja: ja,
  ar: arSA,
  pt: ptBR,
  it: it,
}

export const formatDateTime = (date: Date | number, format: string, locale: SupportedLocale): string => {
  return formatDate(date, format, {
    locale: locales[locale] || enUS,
  })
}

export const formatTimeAgo = (date: Date | number, locale: SupportedLocale): string => {
  return formatDistanceToNow(date, {
    addSuffix: true,
    locale: locales[locale] || enUS,
  })
}

export const formatNumber = (number: number, locale: SupportedLocale, options?: Intl.NumberFormatOptions): string => {
  return new Intl.NumberFormat(locale, options).format(number)
}

export const formatCurrency = (amount: number, locale: SupportedLocale, currency = "USD"): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount)
}

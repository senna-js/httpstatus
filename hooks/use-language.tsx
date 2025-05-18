"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type Language = {
  code: string
  name: string
  flag: string
}

export const languages: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
]

interface LanguageContextType {
  currentLanguage: Language
  setLanguage: (code: string) => void
  t: (key: string) => string
}

const defaultLanguage = languages[0]

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Simple translation function - in a real app, this would be more sophisticated
// and would load translations from JSON files or an API
const translations: Record<string, Record<string, string>> = {
  en: {
    "nav.home": "Home",
    "nav.tools": "Tools",
    "nav.resources": "Resources",
    "nav.statusCodes": "Status Codes",
    "nav.learn": "Learn HTTP",
    "nav.api": "API Documentation",
    "nav.help": "Help & FAQ",
    "search.placeholder": "Check URL or search...",
    "user.profile": "Profile",
    "user.settings": "Settings",
    "user.history": "History",
    "user.savedUrls": "Saved URLs",
    "user.logout": "Log out",
    "language.select": "Select language",
  },
  es: {
    "nav.home": "Inicio",
    "nav.tools": "Herramientas",
    "nav.resources": "Recursos",
    "nav.statusCodes": "Códigos de Estado",
    "nav.learn": "Aprender HTTP",
    "nav.api": "Documentación API",
    "nav.help": "Ayuda y FAQ",
    "search.placeholder": "Verificar URL o buscar...",
    "user.profile": "Perfil",
    "user.settings": "Configuración",
    "user.history": "Historial",
    "user.savedUrls": "URLs guardadas",
    "user.logout": "Cerrar sesión",
    "language.select": "Seleccionar idioma",
  },
  fr: {
    "nav.home": "Accueil",
    "nav.tools": "Outils",
    "nav.resources": "Ressources",
    "nav.statusCodes": "Codes d'État",
    "nav.learn": "Apprendre HTTP",
    "nav.api": "Documentation API",
    "nav.help": "Aide et FAQ",
    "search.placeholder": "Vérifier URL ou rechercher...",
    "user.profile": "Profil",
    "user.settings": "Paramètres",
    "user.history": "Historique",
    "user.savedUrls": "URLs enregistrées",
    "user.logout": "Déconnexion",
    "language.select": "Sélectionner la langue",
  },
  // Add more languages as needed
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(defaultLanguage)
  const [loaded, setLoaded] = useState(false)

  // Load language preference from localStorage on mount
  useEffect(() => {
    setLoaded(true)
    const savedLanguage = localStorage.getItem("preferred-language")
    if (savedLanguage) {
      const language = languages.find((lang) => lang.code === savedLanguage)
      if (language) {
        setCurrentLanguage(language)
      }
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split("-")[0]
      const language = languages.find((lang) => lang.code === browserLang)
      if (language) {
        setCurrentLanguage(language)
        localStorage.setItem("preferred-language", language.code)
      }
    }
  }, [])

  // Save language preference to localStorage when it changes
  useEffect(() => {
    if (loaded) {
      localStorage.setItem("preferred-language", currentLanguage.code)
      // In a real app, you might also want to set the HTML lang attribute
      document.documentElement.lang = currentLanguage.code
    }
  }, [currentLanguage, loaded])

  const setLanguage = (code: string) => {
    const language = languages.find((lang) => lang.code === code)
    if (language) {
      setCurrentLanguage(language)
    }
  }

  // Translation function
  const t = (key: string): string => {
    const langTranslations = translations[currentLanguage.code] || translations.en
    return langTranslations[key] || translations.en[key] || key
  }

  return <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface Settings {
  theme: "light" | "dark" | "system"
  colorScheme: "default" | "green" | "purple"
  showHeaders: boolean
  showRedirectChain: boolean
  compactView: boolean
  showStatusDescription: boolean
  autoCheckCanonical: boolean
  autoAddProtocol: boolean
  autoSaveHistory: boolean
  defaultUserAgent: "default" | "googlebot" | "bingbot" | "mobile"
}

const defaultSettings: Settings = {
  theme: "system",
  colorScheme: "default",
  showHeaders: true,
  showRedirectChain: true,
  compactView: false,
  showStatusDescription: true,
  autoCheckCanonical: false,
  autoAddProtocol: true,
  autoSaveHistory: true,
  defaultUserAgent: "default",
}

interface SettingsContextType {
  settings: Settings
  updateSettings: (newSettings: Partial<Settings>) => void
  resetSettings: () => void
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings)
  const [loaded, setLoaded] = useState(false)

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("http-status-settings")
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings)
        setSettings({ ...defaultSettings, ...parsedSettings })
      } catch (error) {
        console.error("Failed to parse settings:", error)
      }
    }
    setLoaded(true)
  }, [])

  // Save settings to localStorage whenever they change
  useEffect(() => {
    if (loaded) {
      localStorage.setItem("http-status-settings", JSON.stringify(settings))
    }
  }, [settings, loaded])

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }))
  }

  const resetSettings = () => {
    setSettings(defaultSettings)
  }

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, resetSettings }}>{children}</SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider")
  }
  return context
}

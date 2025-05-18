"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
import { useSettings } from "@/hooks/use-settings"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const { settings } = useSettings()
  const { setTheme } = props

  // This ensures the theme from settings is applied
  React.useEffect(() => {
    if (settings.theme) {
      if (typeof setTheme === "function") {
        setTheme(settings.theme)
      }
    }
  }, [settings.theme])

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

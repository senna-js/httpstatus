"use client"

import type React from "react"

import { useSettings } from "@/hooks/use-settings"
import { useEffect, useState } from "react"

export function ThemeColorWrapper({ children }: { children: React.ReactNode }) {
  const { settings } = useSettings()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Only apply theme classes after mounting to prevent hydration mismatch
  if (!mounted) {
    return <>{children}</>
  }

  return <div className={settings.colorScheme !== "default" ? `theme-${settings.colorScheme}` : ""}>{children}</div>
}

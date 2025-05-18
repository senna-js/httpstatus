"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Monitor } from "lucide-react"
import { useEffect, useState } from "react"
import { useI18n } from "@/hooks/use-i18n"

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { t } = useI18n()

  // Ensure component is mounted before accessing theme
  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return null
  }

  return (
    <>
      <Button
        variant={theme === "light" ? "default" : "ghost"}
        size="sm"
        onClick={() => setTheme("light")}
        className="px-3"
      >
        <Sun className="h-4 w-4 mr-1" />
        <span className="sr-only sm:not-sr-only sm:text-xs">{t("theme.light")}</span>
      </Button>
      <Button
        variant={theme === "dark" ? "default" : "ghost"}
        size="sm"
        onClick={() => setTheme("dark")}
        className="px-3"
      >
        <Moon className="h-4 w-4 mr-1" />
        <span className="sr-only sm:not-sr-only sm:text-xs">{t("theme.dark")}</span>
      </Button>
      <Button
        variant={theme === "system" ? "default" : "ghost"}
        size="sm"
        onClick={() => setTheme("system")}
        className="px-3"
      >
        <Monitor className="h-4 w-4 mr-1" />
        <span className="sr-only sm:not-sr-only sm:text-xs">{t("theme.system")}</span>
      </Button>
    </>
  )
}

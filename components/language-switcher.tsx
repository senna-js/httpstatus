"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Check, Globe } from "lucide-react"
import { useI18n } from "@/hooks/use-i18n"
import { toast } from "@/components/ui/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { SupportedLocale } from "@/lib/i18n/translations"

export function LanguageSwitcher() {
  const { t, locale, setLocale, language, availableLanguages } = useI18n()
  const [open, setOpen] = useState(false)

  const handleLanguageChange = (langCode: SupportedLocale) => {
    setLocale(langCode)
    setOpen(false)

    const selectedLang = availableLanguages.find((l) => l.code === langCode)

    toast({
      title: t("language.changed", { name: selectedLang?.nativeName || selectedLang?.name || langCode }),
      description: t("language.changed.desc"),
      duration: 2000,
    })
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full relative" aria-label={t("language.select")}>
          <Globe className="h-5 w-5" />
          <span className="absolute -bottom-1 -right-1 text-[10px]">{language.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>{t("language.select")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-72">
          <div className="p-1">
            {availableLanguages.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                className="flex items-center justify-between cursor-pointer"
                onClick={() => handleLanguageChange(lang.code)}
              >
                <div className="flex items-center">
                  <span className="mr-2 text-base">{lang.flag}</span>
                  <span className="mr-1">{lang.nativeName}</span>
                  {lang.nativeName !== lang.name && (
                    <span className="text-xs text-muted-foreground">({lang.name})</span>
                  )}
                </div>
                {locale === lang.code && <Check className="h-4 w-4" />}
              </DropdownMenuItem>
            ))}
          </div>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

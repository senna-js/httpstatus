"use client"

import Link from "next/link"
import { useI18n } from "@/hooks/use-i18n"

export default function Footer() {
  const { t } = useI18n()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t py-6 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">{t("footer.copyright", { year: currentYear })}</p>
          </div>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
              {t("footer.privacy")}
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
              {t("footer.terms")}
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
              {t("footer.contact")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

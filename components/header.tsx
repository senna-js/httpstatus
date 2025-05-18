"use client"

import React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ModeToggle } from "./mode-toggle"
import { SettingsDialog } from "./settings-dialog"
import { LanguageSwitcher } from "./language-switcher"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { Search, Menu, ChevronRight, BarChart2, Book, Code, HelpCircle, History } from "lucide-react"
import { useRouter } from "next/navigation"
import { useI18n } from "@/hooks/use-i18n"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const pathname = usePathname()
  const router = useRouter()
  const { t } = useI18n()

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // If it looks like a URL, go directly to checking it
      if (searchQuery.includes(".") || searchQuery.startsWith("http")) {
        router.push(`/?url=${encodeURIComponent(searchQuery)}`)
      } else {
        // Otherwise search the documentation
        router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      }
    }
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur transition-all duration-200",
        isScrolled && "shadow-sm",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="rounded-full bg-primary/10 p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <span className="hidden font-bold text-xl sm:inline-block">httpstatus</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:flex-1 md:justify-center md:px-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>{t("nav.home")}</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>{t("nav.tools")}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/20 to-primary/5 p-6 no-underline outline-none focus:shadow-md"
                            href="/"
                          >
                            <BarChart2 className="h-6 w-6 text-primary" />
                            <div className="mb-2 mt-4 text-lg font-medium">{t("tools.statusChecker")}</div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              {t("tools.statusChecker.desc")}
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href="/redirect-checker" title={t("tools.redirectChecker")} icon={<ChevronRight />}>
                        {t("tools.redirectChecker.desc")}
                      </ListItem>
                      <ListItem href="/header-analyzer" title={t("tools.headerAnalyzer")} icon={<Code />}>
                        {t("tools.headerAnalyzer.desc")}
                      </ListItem>
                      <ListItem href="/bulk-checker" title={t("tools.bulkChecker")} icon={<BarChart2 />}>
                        {t("tools.bulkChecker.desc")}
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>{t("nav.resources")}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <ListItem href="/status-codes" title={t("nav.statusCodes")} icon={<Code />}>
                        Complete reference of HTTP status codes
                      </ListItem>
                      <ListItem href="/learn" title={t("nav.learn")} icon={<Book />}>
                        Tutorials and guides about HTTP
                      </ListItem>
                      <ListItem href="/api" title={t("nav.api")} icon={<Code />}>
                        Use our HTTP checker API
                      </ListItem>
                      <ListItem href="/help" title={t("nav.help")} icon={<HelpCircle />}>
                        Frequently asked questions
                      </ListItem>
                      <ListItem href="/history" title={t("history.title")} icon={<History />}>
                        View and manage your URL history
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Search, Settings, Theme Toggle, User Menu */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={t("search.placeholder")}
                className="w-[180px] pl-8 lg:w-[240px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>

            {/* Desktop: Settings, Language & Theme */}
            <div className="hidden md:flex md:items-center md:space-x-1">
              <Link href="/history">
                <Button variant="ghost" size="icon">
                  <History className="h-5 w-5" />
                  <span className="sr-only">{t("history.title")}</span>
                </Button>
              </Link>
              <SettingsDialog showButton={false} />
              <LanguageSwitcher />
              <ModeToggle />
            </div>

            {/* Mobile Menu Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">{t("common.menu")}</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader className="mb-4">
                  <SheetTitle>{t("common.menu")}</SheetTitle>
                  <SheetDescription>Navigate through HTTP Status Checker tools and resources.</SheetDescription>
                </SheetHeader>

                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="mb-6 mt-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder={t("search.placeholder")}
                      className="w-full pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </form>

                {/* Mobile Navigation Links */}
                <div className="flex flex-col space-y-3">
                  <MobileNavLink href="/" icon={<BarChart2 size={16} />} active={pathname === "/"}>
                    {t("nav.home")}
                  </MobileNavLink>
                  <MobileNavLink href="/history" icon={<History size={16} />} active={pathname === "/history"}>
                    {t("history.title")}
                  </MobileNavLink>
                  <MobileNavHeading>{t("nav.tools")}</MobileNavHeading>
                  <MobileNavLink href="/redirect-checker" icon={<ChevronRight size={16} />}>
                    {t("tools.redirectChecker")}
                  </MobileNavLink>
                  <MobileNavLink href="/header-analyzer" icon={<Code size={16} />}>
                    {t("tools.headerAnalyzer")}
                  </MobileNavLink>
                  <MobileNavLink href="/bulk-checker" icon={<BarChart2 size={16} />}>
                    {t("tools.bulkChecker")}
                  </MobileNavLink>

                  <MobileNavHeading>{t("nav.resources")}</MobileNavHeading>
                  <MobileNavLink href="/status-codes" icon={<Code size={16} />} active={pathname === "/status-codes"}>
                    {t("nav.statusCodes")}
                  </MobileNavLink>
                  <MobileNavLink href="/learn" icon={<Book size={16} />} active={pathname === "/learn"}>
                    {t("nav.learn")}
                  </MobileNavLink>
                  <MobileNavLink href="/api" icon={<Code size={16} />} active={pathname === "/api"}>
                    {t("nav.api")}
                  </MobileNavLink>
                  <MobileNavLink href="/help" icon={<HelpCircle size={16} />} active={pathname === "/help"}>
                    {t("nav.help")}
                  </MobileNavLink>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center space-x-2">
                    <SettingsDialog showButton={false} />
                    <LanguageSwitcher />
                    <ModeToggle />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

// Helper Components
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: React.ReactNode }
>(({ className, title, children, icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="flex items-center">
            {icon && <span className="mr-2 text-primary">{icon}</span>}
            <span className="text-sm font-medium leading-none">{title}</span>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

function MobileNavLink({
  href,
  children,
  icon,
  active,
}: {
  href: string
  children: React.ReactNode
  icon?: React.ReactNode
  active?: boolean
}) {
  return (
    <SheetClose asChild>
      <Link
        href={href}
        className={cn(
          "flex items-center space-x-2 rounded-md px-2 py-1.5 text-sm",
          active ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground",
        )}
      >
        {icon && <span className="text-primary">{icon}</span>}
        <span>{children}</span>
      </Link>
    </SheetClose>
  )
}

function MobileNavHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="mt-4 mb-2 px-2 text-xs font-semibold text-muted-foreground">{children}</h3>
}

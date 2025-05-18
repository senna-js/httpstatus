"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useI18n } from "@/hooks/use-i18n"
import type { HistoryItemType } from "@/types/history"
import { Star, StarOff, ExternalLink, Trash2, Copy, Globe } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface HistoryGridProps {
  items: HistoryItemType[]
  onDelete: (id: string) => void
  onToggleFavorite: (id: string) => void
  onCheck: (urls: string[]) => void
  favoriteIds: string[]
}

export default function HistoryGrid({ items, onDelete, onToggleFavorite, onCheck, favoriteIds }: HistoryGridProps) {
  const { t, formatRelativeTime } = useI18n()

  const copyToClipboard = (urls: string[]) => {
    navigator.clipboard.writeText(urls.join("\n"))
    toast({
      title: t("history.copied"),
      description: t("history.copied.description"),
    })
  }

  // Extract domain from URL
  const getDomain = (url: string) => {
    try {
      const domain = new URL(url).hostname
      return domain
    } catch (e) {
      return url
    }
  }

  // Get a color based on the domain name (for visual variety)
  const getDomainColor = (domain: string) => {
    const colors = [
      "bg-blue-100 text-blue-800",
      "bg-green-100 text-green-800",
      "bg-purple-100 text-purple-800",
      "bg-yellow-100 text-yellow-800",
      "bg-pink-100 text-pink-800",
      "bg-indigo-100 text-indigo-800",
      "bg-red-100 text-red-800",
      "bg-orange-100 text-orange-800",
    ]

    // Simple hash function to get consistent color for the same domain
    let hash = 0
    for (let i = 0; i < domain.length; i++) {
      hash = domain.charCodeAt(i) + ((hash << 5) - hash)
    }

    const index = Math.abs(hash) % colors.length
    return colors[index]
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => {
        const mainDomain = getDomain(item.urls[0])
        const domainColor = getDomainColor(mainDomain)

        return (
          <Card key={item.id} className="group">
            <CardHeader className="pb-2 relative">
              <div className="absolute top-2 right-2">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onToggleFavorite(item.id)}>
                  {favoriteIds.includes(item.id) ? (
                    <Star className="h-4 w-4 text-yellow-500" fill="currentColor" />
                  ) : (
                    <StarOff className="h-4 w-4 opacity-50 group-hover:opacity-100" />
                  )}
                </Button>
              </div>

              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${domainColor} mr-3`}>
                  <Globe className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium truncate max-w-[200px]">{mainDomain}</h3>
                  <p className="text-xs text-muted-foreground">{formatRelativeTime(new Date(item.timestamp))}</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pb-2">
              <div className="space-y-2">
                <div className="text-sm truncate max-w-[300px]">{item.urls[0]}</div>
                {item.urls.length > 1 && (
                  <Badge variant="outline">
                    +{item.urls.length - 1} {t("history.more.urls")}
                  </Badge>
                )}
              </div>
            </CardContent>

            <CardFooter className="pt-2 flex justify-between">
              <Button variant="ghost" size="sm" onClick={() => onCheck(item.urls)}>
                <ExternalLink className="mr-2 h-4 w-4" />
                {t("history.action.check")}
              </Button>

              <div className="flex space-x-1">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => copyToClipboard(item.urls)}>
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive"
                  onClick={() => onDelete(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}

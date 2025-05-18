"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast"
import { useI18n } from "@/hooks/use-i18n"
import { Search, Trash2, Clock, Calendar, ArrowUpDown, Settings } from "lucide-react"
import HistoryList from "./history-list"
import HistoryGrid from "./history-grid"
import HistorySettings from "./history-settings"
import { useHistoryStore } from "@/hooks/use-history-store"
import type { HistoryItemType } from "@/types/history"

export default function HistoryManager() {
  const { t } = useI18n()
  const router = useRouter()
  const {
    historyItems,
    favoriteItems,
    loadHistory,
    clearHistory,
    deleteHistoryItem,
    toggleFavorite,
    getFilteredHistory,
  } = useHistoryStore()

  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "most-urls" | "alphabetical">("newest")
  const [filterType, setFilterType] = useState<"all" | "favorites" | "today" | "week" | "month">("all")
  const [showSettingsDialog, setShowSettingsDialog] = useState(false)
  const [filteredItems, setFilteredItems] = useState<HistoryItemType[]>([])

  useEffect(() => {
    loadHistory()
  }, [loadHistory])

  useEffect(() => {
    setFilteredItems(
      getFilteredHistory({
        searchQuery,
        sortBy,
        filterType,
      }),
    )
  }, [historyItems, favoriteItems, searchQuery, sortBy, filterType, getFilteredHistory])

  const handleClearHistory = () => {
    clearHistory()
    toast({
      title: t("history.cleared.title"),
      description: t("history.cleared.description"),
    })
  }

  const handleDeleteItem = (id: string) => {
    deleteHistoryItem(id)
    toast({
      title: t("history.item.deleted"),
      description: t("history.item.deleted.description"),
    })
  }

  const handleToggleFavorite = (id: string) => {
    toggleFavorite(id)
  }

  const handleCheckUrls = (urls: string[]) => {
    router.push(`/?url=${encodeURIComponent(urls.join("\n"))}`)
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t("history.search")}
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Select value={sortBy} onValueChange={(value) => setSortBy(value as any)}>
              <SelectTrigger className="w-[160px]">
                <ArrowUpDown className="mr-2 h-4 w-4" />
                <span>{t(`history.sort.${sortBy}`)}</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">{t("history.sort.newest")}</SelectItem>
                <SelectItem value="oldest">{t("history.sort.oldest")}</SelectItem>
                <SelectItem value="most-urls">{t("history.sort.most-urls")}</SelectItem>
                <SelectItem value="alphabetical">{t("history.sort.alphabetical")}</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterType} onValueChange={(value) => setFilterType(value as any)}>
              <SelectTrigger className="w-[160px]">
                <Clock className="mr-2 h-4 w-4" />
                <span>{t(`history.filter.${filterType}`)}</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("history.filter.all")}</SelectItem>
                <SelectItem value="favorites">{t("history.filter.favorites")}</SelectItem>
                <SelectItem value="today">{t("history.filter.today")}</SelectItem>
                <SelectItem value="week">{t("history.filter.week")}</SelectItem>
                <SelectItem value="month">{t("history.filter.month")}</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon" onClick={() => setShowSettingsDialog(true)}>
              <Settings className="h-4 w-4" />
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{t("history.clear.confirm.title")}</AlertDialogTitle>
                  <AlertDialogDescription>{t("history.clear.confirm.description")}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
                  <AlertDialogAction onClick={handleClearHistory}>
                    {t("history.clear.confirm.action")}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <Tabs defaultValue="list" value={viewMode} onValueChange={(value) => setViewMode(value as "list" | "grid")}>
          <TabsList className="mb-4">
            <TabsTrigger value="list">{t("history.view.list")}</TabsTrigger>
            <TabsTrigger value="grid">{t("history.view.grid")}</TabsTrigger>
          </TabsList>

          <TabsContent value="list">
            <HistoryList
              items={filteredItems}
              onDelete={handleDeleteItem}
              onToggleFavorite={handleToggleFavorite}
              onCheck={handleCheckUrls}
              favoriteIds={favoriteItems}
            />
          </TabsContent>

          <TabsContent value="grid">
            <HistoryGrid
              items={filteredItems}
              onDelete={handleDeleteItem}
              onToggleFavorite={handleToggleFavorite}
              onCheck={handleCheckUrls}
              favoriteIds={favoriteItems}
            />
          </TabsContent>
        </Tabs>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
            <h3 className="mt-4 text-lg font-semibold">{t("history.empty.title")}</h3>
            <p className="mt-2 text-muted-foreground">
              {searchQuery || filterType !== "all" ? t("history.empty.filtered") : t("history.empty.description")}
            </p>
          </div>
        )}
      </Card>

      <HistorySettings open={showSettingsDialog} onOpenChange={setShowSettingsDialog} />
    </div>
  )
}

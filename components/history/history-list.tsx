"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useI18n } from "@/hooks/use-i18n"
import { MoreHorizontal, Star, StarOff, ExternalLink, Trash2, Copy } from "lucide-react"
import type { HistoryItemType } from "@/types/history"
import { toast } from "@/components/ui/use-toast"

interface HistoryListProps {
  items: HistoryItemType[]
  onDelete: (id: string) => void
  onToggleFavorite: (id: string) => void
  onCheck: (urls: string[]) => void
  favoriteIds: string[]
}

export default function HistoryList({ items, onDelete, onToggleFavorite, onCheck, favoriteIds }: HistoryListProps) {
  const { t, formatRelativeTime } = useI18n()
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const copyToClipboard = (urls: string[]) => {
    navigator.clipboard.writeText(urls.join("\n"))
    toast({
      title: t("history.copied"),
      description: t("history.copied.description"),
    })
  }

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[30px]"></TableHead>
            <TableHead>{t("history.table.urls")}</TableHead>
            <TableHead className="w-[180px]">{t("history.table.date")}</TableHead>
            <TableHead className="w-[100px] text-right">{t("history.table.actions")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id} className="group">
              <TableCell>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onToggleFavorite(item.id)}>
                  {favoriteIds.includes(item.id) ? (
                    <Star className="h-4 w-4 text-yellow-500" fill="currentColor" />
                  ) : (
                    <StarOff className="h-4 w-4 opacity-50 group-hover:opacity-100" />
                  )}
                </Button>
              </TableCell>
              <TableCell className="font-medium">
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <span className="truncate max-w-[400px]">{item.urls[0]}</span>
                    {item.urls.length > 1 && (
                      <Badge variant="outline" className="ml-2 cursor-pointer" onClick={() => toggleExpand(item.id)}>
                        +{item.urls.length - 1}
                      </Badge>
                    )}
                  </div>

                  {expandedItems[item.id] && item.urls.length > 1 && (
                    <div className="mt-2 pl-4 border-l-2 space-y-1">
                      {item.urls.slice(1).map((url, idx) => (
                        <div key={idx} className="text-sm text-muted-foreground truncate max-w-[500px]">
                          {url}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="text-sm">{new Date(item.timestamp).toLocaleDateString()}</span>
                  <span className="text-xs text-muted-foreground">{formatRelativeTime(new Date(item.timestamp))}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">{t("history.actions")}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onCheck(item.urls)}>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      {t("history.action.check")}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => copyToClipboard(item.urls)}>
                      <Copy className="mr-2 h-4 w-4" />
                      {t("history.action.copy")}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => onToggleFavorite(item.id)}
                      className={favoriteIds.includes(item.id) ? "text-yellow-500" : ""}
                    >
                      {favoriteIds.includes(item.id) ? (
                        <>
                          <StarOff className="mr-2 h-4 w-4" />
                          {t("history.action.unfavorite")}
                        </>
                      ) : (
                        <>
                          <Star className="mr-2 h-4 w-4" />
                          {t("history.action.favorite")}
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => onDelete(item.id)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      {t("history.action.delete")}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

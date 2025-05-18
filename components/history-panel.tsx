"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { History } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import HistoryItem from "./history-item"
import { toast } from "@/components/ui/use-toast"

export interface HistoryItemType {
  id: string
  urls: string[]
  timestamp: number
}

interface HistoryPanelProps {
  onSelectHistory: (urls: string[]) => void
}

export default function HistoryPanel({ onSelectHistory }: HistoryPanelProps) {
  const [urlHistory, setUrlHistory] = useState<HistoryItemType[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedHistory = localStorage.getItem("url-history")
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory)
        setUrlHistory(parsedHistory)
      } catch (error) {
        console.error("Failed to parse URL history:", error)
      }
    }
  }, [])

  const removeHistoryItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering the parent click event
    const updatedHistory = urlHistory.filter((item) => item.id !== id)
    setUrlHistory(updatedHistory)
    localStorage.setItem("url-history", JSON.stringify(updatedHistory))
  }

  const clearHistory = () => {
    setUrlHistory([])
    localStorage.removeItem("url-history")
    toast({
      title: "History cleared",
      description: "Your URL history has been cleared.",
    })
  }

  const handleSelectHistory = (item: HistoryItemType) => {
    onSelectHistory(item.urls)
  }

  if (!mounted) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="text-xs">
          <History className="h-3 w-3 mr-1" />
          URL History
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72">
        <h4 className="px-2 py-1.5 text-sm font-semibold">Recent Checks</h4>
        {urlHistory.length === 0 ? (
          <div className="px-2 py-4 text-center text-sm text-muted-foreground">No history yet</div>
        ) : (
          <>
            <ScrollArea className="h-[300px]">
              <div className="p-2 space-y-2">
                {urlHistory.map((item) => (
                  <HistoryItem
                    key={item.id}
                    id={item.id}
                    urls={item.urls}
                    timestamp={item.timestamp}
                    onSelect={() => handleSelectHistory(item)}
                    onRemove={removeHistoryItem}
                  />
                ))}
              </div>
            </ScrollArea>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={clearHistory} className="text-red-500 dark:text-red-400 cursor-pointer">
              Clear History
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

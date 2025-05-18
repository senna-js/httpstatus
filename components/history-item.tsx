"use client"

import type React from "react"

import { Clock, X } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface HistoryItemProps {
  id: string
  urls: string[]
  timestamp: number
  onSelect: () => void
  onRemove: (id: string, e: React.MouseEvent) => void
}

export default function HistoryItem({ id, urls, timestamp, onSelect, onRemove }: HistoryItemProps) {
  return (
    <div className="flex flex-col items-start cursor-pointer p-2 hover:bg-secondary rounded-md" onClick={onSelect}>
      <div className="flex w-full justify-between items-start">
        <div className="flex items-center">
          <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">{formatDistanceToNow(timestamp, { addSuffix: true })}</span>
        </div>
        <button
          onClick={(e) => onRemove(id, e)}
          className="text-muted-foreground hover:text-red-500 dark:hover:text-red-400"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
      <div className="mt-1 text-sm truncate w-full">
        {urls.length === 1 ? urls[0] : `${urls[0]} + ${urls.length - 1} more`}
      </div>
      <div className="mt-1 text-xs text-muted-foreground">
        {urls.length} URL{urls.length !== 1 ? "s" : ""}
      </div>
    </div>
  )
}

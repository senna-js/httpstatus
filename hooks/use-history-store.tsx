"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { HistoryItemType, HistorySettings } from "@/types/history"
import { startOfDay, subDays, subWeeks, subMonths } from "date-fns"

interface HistoryState {
  historyItems: HistoryItemType[]
  favoriteItems: string[]
  settings: HistorySettings
  loadHistory: () => void
  addHistoryItem: (urls: string[]) => void
  deleteHistoryItem: (id: string) => void
  clearHistory: () => void
  toggleFavorite: (id: string) => void
  updateSettings: (settings: HistorySettings) => void
  getFilteredHistory: (options: {
    searchQuery: string
    sortBy: "newest" | "oldest" | "most-urls" | "alphabetical"
    filterType: "all" | "favorites" | "today" | "week" | "month"
  }) => HistoryItemType[]
}

const DEFAULT_SETTINGS: HistorySettings = {
  maxItems: 100,
  groupSimilarDomains: true,
  saveMetadata: true,
  autoDeleteAfterDays: 30,
  enableAutoDelete: false,
}

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set, get) => ({
      historyItems: [],
      favoriteItems: [],
      settings: DEFAULT_SETTINGS,

      loadHistory: () => {
        const { settings, historyItems } = get()

        // Apply auto-delete if enabled
        if (settings.enableAutoDelete && historyItems.length > 0) {
          const cutoffDate = subDays(new Date(), settings.autoDeleteAfterDays).getTime()
          const filteredItems = historyItems.filter(
            (item) => item.timestamp > cutoffDate || get().favoriteItems.includes(item.id),
          )

          if (filteredItems.length !== historyItems.length) {
            set({ historyItems: filteredItems })
          }
        }

        // Ensure we don't exceed max items
        if (historyItems.length > settings.maxItems) {
          const itemsToKeep = [...historyItems].sort((a, b) => b.timestamp - a.timestamp).slice(0, settings.maxItems)

          set({ historyItems: itemsToKeep })
        }
      },

      addHistoryItem: (urls) => {
        if (!urls.length) return

        const { historyItems, settings } = get()

        // Create new history item
        const newItem: HistoryItemType = {
          id: Date.now().toString(),
          urls,
          timestamp: Date.now(),
          metadata: settings.saveMetadata
            ? {
                domains: urls
                  .map((url) => {
                    try {
                      return new URL(url).hostname
                    } catch (e) {
                      return null
                    }
                  })
                  .filter(Boolean) as string[],
              }
            : undefined,
        }

        // Add to history, respecting max items limit
        const updatedItems = [newItem, ...historyItems].slice(0, settings.maxItems)

        set({ historyItems: updatedItems })
      },

      deleteHistoryItem: (id) => {
        const { historyItems, favoriteItems } = get()

        set({
          historyItems: historyItems.filter((item) => item.id !== id),
          favoriteItems: favoriteItems.filter((itemId) => itemId !== id),
        })
      },

      clearHistory: () => {
        set({ historyItems: [], favoriteItems: [] })
      },

      toggleFavorite: (id) => {
        const { favoriteItems } = get()

        if (favoriteItems.includes(id)) {
          set({ favoriteItems: favoriteItems.filter((itemId) => itemId !== id) })
        } else {
          set({ favoriteItems: [...favoriteItems, id] })
        }
      },

      updateSettings: (newSettings) => {
        set({ settings: newSettings })

        // Apply new settings immediately
        get().loadHistory()
      },

      getFilteredHistory: ({ searchQuery, sortBy, filterType }) => {
        let { historyItems, favoriteItems } = get()

        // Apply favorites filter
        if (filterType === "favorites") {
          historyItems = historyItems.filter((item) => favoriteItems.includes(item.id))
        }

        // Apply date filters
        if (filterType === "today") {
          const todayStart = startOfDay(new Date()).getTime()
          historyItems = historyItems.filter((item) => item.timestamp >= todayStart)
        } else if (filterType === "week") {
          const weekStart = subWeeks(new Date(), 1).getTime()
          historyItems = historyItems.filter((item) => item.timestamp >= weekStart)
        } else if (filterType === "month") {
          const monthStart = subMonths(new Date(), 1).getTime()
          historyItems = historyItems.filter((item) => item.timestamp >= monthStart)
        }

        // Apply search query
        if (searchQuery) {
          const query = searchQuery.toLowerCase()
          historyItems = historyItems.filter((item) => {
            // Search in URLs
            const urlMatch = item.urls.some((url) => url.toLowerCase().includes(query))

            // Search in domains if metadata exists
            const domainMatch = item.metadata?.domains?.some((domain) => domain.toLowerCase().includes(query)) || false

            return urlMatch || domainMatch
          })
        }

        // Apply sorting
        if (sortBy === "newest") {
          historyItems = [...historyItems].sort((a, b) => b.timestamp - a.timestamp)
        } else if (sortBy === "oldest") {
          historyItems = [...historyItems].sort((a, b) => a.timestamp - b.timestamp)
        } else if (sortBy === "most-urls") {
          historyItems = [...historyItems].sort((a, b) => b.urls.length - a.urls.length)
        } else if (sortBy === "alphabetical") {
          historyItems = [...historyItems].sort((a, b) => {
            const domainA = a.metadata?.domains?.[0] || a.urls[0]
            const domainB = b.metadata?.domains?.[0] || b.urls[0]
            return domainA.localeCompare(domainB)
          })
        }

        return historyItems
      },
    }),
    {
      name: "http-status-history",
      partialize: (state) => ({
        historyItems: state.historyItems,
        favoriteItems: state.favoriteItems,
        settings: state.settings,
      }),
    },
  ),
)

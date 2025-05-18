export interface HistoryItemType {
  id: string
  urls: string[]
  timestamp: number
  metadata?: {
    domains?: string[]
    statusCodes?: number[]
    title?: string
    tags?: string[]
  }
}

export interface HistorySettings {
  maxItems: number
  groupSimilarDomains: boolean
  saveMetadata: boolean
  autoDeleteAfterDays: number
  enableAutoDelete: boolean
}

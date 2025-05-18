"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import StatusResults from "./status-results"
import { toast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"
import HistoryPanel from "./history-panel"
import { useSettings } from "@/hooks/use-settings"
import { SettingsDialog } from "./settings-dialog"
import { useHistoryStore } from "@/hooks/use-history-store"

interface StatusResponse {
  url: string
  status: number
  statusText: string
  headers: Record<string, string>
  redirectChain?: { url: string; status: number; statusText: string }[]
  error?: string
}

export default function StatusChecker({ initialUrl = "" }: { initialUrl?: string }) {
  const { settings } = useSettings()
  const { addHistoryItem } = useHistoryStore()
  const [urls, setUrls] = useState(initialUrl)
  const [canonicalCheck, setCanonicalCheck] = useState(settings.autoCheckCanonical)
  const [userAgent, setUserAgent] = useState(settings.defaultUserAgent)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<StatusResponse[]>([])
  const [progress, setProgress] = useState(0)

  // Update form state when settings change
  useEffect(() => {
    setCanonicalCheck(settings.autoCheckCanonical)
    setUserAgent(settings.defaultUserAgent)
  }, [settings.autoCheckCanonical, settings.defaultUserAgent])

  // Check URL from query parameter
  useEffect(() => {
    if (initialUrl) {
      setUrls(initialUrl)
      handleSubmit(new Event("submit") as any)
    }
  }, [initialUrl])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!urls.trim()) {
      toast({
        title: "Error",
        description: "Please enter at least one URL to check",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    setResults([])
    setProgress(0)

    try {
      // Process URLs, adding protocol if needed
      const urlList = urls
        .split("\n")
        .filter((url) => url.trim())
        .map((url) => {
          url = url.trim()
          // Add https:// protocol if missing and setting is enabled
          if (settings.autoAddProtocol && !url.match(/^https?:\/\//)) {
            return `https://${url}`
          }
          return url
        })

      if (urlList.length > 50) {
        toast({
          title: "Warning",
          description: "Maximum of 50 URLs can be checked at once. Only the first 50 will be processed.",
        })
      }

      // Use the batch API endpoint
      const response = await fetch("/api/batch-check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          urls: urlList.slice(0, 50), // Limit to 50 URLs
          canonicalCheck,
          userAgent,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      setResults(data.results)

      // Save to history if auto-save is enabled
      if (settings.autoSaveHistory) {
        addHistoryItem(urlList.slice(0, 50))
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to check URLs",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
      setProgress(100)
    }
  }

  const handleHistorySelect = (selectedUrls: string[]) => {
    setUrls(selectedUrls.join("\n"))
  }

  const handleExampleClick = () => {
    setUrls("https://example.com\nhttps://httpstatus.io\nhttps://github.com\nhttps://vercel.com\nhttps://nextjs.org")
  }

  return (
    <Card className="p-6 mb-12 bg-card">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Textarea
            placeholder="Enter URLs to check, one per line. Maximum 50 URLs per request."
            className="min-h-[150px] font-mono text-sm"
            value={urls}
            onChange={(e) => setUrls(e.target.value)}
          />
          <div className="flex flex-wrap justify-between items-center mt-2 gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <HistoryPanel onSelectHistory={handleHistorySelect} />
              <SettingsDialog />
            </div>

            <button type="button" onClick={handleExampleClick} className="text-xs text-primary hover:underline">
              Show me some examples
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="canonicalCheck"
              checked={canonicalCheck}
              onCheckedChange={(checked) => setCanonicalCheck(checked === true)}
            />
            <label
              htmlFor="canonicalCheck"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Canonical domain check
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm">User Agent:</span>
            <Select value={userAgent} onValueChange={setUserAgent}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select user agent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Your Browser</SelectItem>
                <SelectItem value="googlebot">Googlebot</SelectItem>
                <SelectItem value="bingbot">Bingbot</SelectItem>
                <SelectItem value="mobile">Mobile Device</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {loading && (
          <div className="mb-6">
            <Progress value={progress} className="h-2 mb-2" />
            <p className="text-sm text-center text-muted-foreground">Processing URLs...</p>
          </div>
        )}

        <div className="flex justify-center">
          <Button type="submit" className="px-8" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Checking...
              </>
            ) : (
              "Check status"
            )}
          </Button>
        </div>
      </form>

      {results.length > 0 && (
        <div className="mt-8">
          <StatusResults results={results} />
        </div>
      )}
    </Card>
  )
}

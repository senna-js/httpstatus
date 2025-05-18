"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, ArrowRight, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSettings } from "@/hooks/use-settings"

interface StatusResponse {
  url: string
  status: number
  statusText: string
  headers: Record<string, string>
  redirectChain?: { url: string; status: number; statusText: string }[]
  error?: string
  canonicalUrl?: string
}

export default function StatusResults({ results }: { results: StatusResponse[] }) {
  const [activeTab, setActiveTab] = useState("all")
  const { settings } = useSettings()

  const getStatusColor = (status: number) => {
    if (settings.colorScheme === "green") {
      if (status >= 200 && status < 300) return "bg-green-500 dark:bg-green-600"
      if (status >= 300 && status < 400) return "bg-teal-500 dark:bg-teal-600"
      if (status >= 400 && status < 500) return "bg-amber-500 dark:bg-amber-600"
      if (status >= 500) return "bg-red-500 dark:bg-red-600"
      return "bg-gray-500 dark:bg-gray-600" // For errors or unknown status
    } else if (settings.colorScheme === "purple") {
      if (status >= 200 && status < 300) return "bg-purple-500 dark:bg-purple-600"
      if (status >= 300 && status < 400) return "bg-indigo-500 dark:bg-indigo-600"
      if (status >= 400 && status < 500) return "bg-amber-500 dark:bg-amber-600"
      if (status >= 500) return "bg-red-500 dark:bg-red-600"
      return "bg-gray-500 dark:bg-gray-600" // For errors or unknown status
    } else {
      // Default blue theme
      if (status >= 200 && status < 300) return "bg-green-500 dark:bg-green-600"
      if (status >= 300 && status < 400) return "bg-blue-500 dark:bg-blue-600"
      if (status >= 400 && status < 500) return "bg-yellow-500 dark:bg-yellow-600"
      if (status >= 500) return "bg-red-500 dark:bg-red-600"
      return "bg-gray-500 dark:bg-gray-600" // For errors or unknown status
    }
  }

  const getStatusDescription = (status: number) => {
    if (!settings.showStatusDescription) return ""

    switch (status) {
      case 200:
        return "OK"
      case 201:
        return "Created"
      case 204:
        return "No Content"
      case 301:
        return "Moved Permanently"
      case 302:
        return "Found"
      case 304:
        return "Not Modified"
      case 400:
        return "Bad Request"
      case 401:
        return "Unauthorized"
      case 403:
        return "Forbidden"
      case 404:
        return "Not Found"
      case 500:
        return "Internal Server Error"
      case 502:
        return "Bad Gateway"
      case 503:
        return "Service Unavailable"
      case 504:
        return "Gateway Timeout"
      default:
        return status === 0 ? "Error" : "Unknown Status"
    }
  }

  const filteredResults = results.filter((result) => {
    if (activeTab === "all") return true
    if (activeTab === "success" && result.status >= 200 && result.status < 300) return true
    if (activeTab === "redirect" && result.status >= 300 && result.status < 400) return true
    if (activeTab === "client-error" && result.status >= 400 && result.status < 500) return true
    if (activeTab === "server-error" && result.status >= 500) return true
    if (activeTab === "error" && (result.status === 0 || result.error)) return true
    return false
  })

  // Count results by status category
  const counts = {
    success: results.filter((r) => r.status >= 200 && r.status < 300).length,
    redirect: results.filter((r) => r.status >= 300 && r.status < 400).length,
    clientError: results.filter((r) => r.status >= 400 && r.status < 500).length,
    serverError: results.filter((r) => r.status >= 500).length,
    error: results.filter((r) => r.status === 0 || r.error).length,
  }

  // Export results as JSON
  const exportResults = () => {
    const dataStr = JSON.stringify(results, null, 2)
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`

    const exportFileDefaultName = `http-status-results-${new Date().toISOString().slice(0, 10)}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  // Export results as CSV
  const exportResultsCSV = () => {
    // Create CSV header
    let csv = "URL,Status Code,Status Text,Canonical URL,Error\n"

    // Add each result as a row
    results.forEach((result) => {
      const url = `"${result.url.replace(/"/g, '""')}"`
      const status = result.status
      const statusText = `"${(result.statusText || getStatusDescription(result.status)).replace(/"/g, '""')}"`
      const canonicalUrl = result.canonicalUrl ? `"${result.canonicalUrl.replace(/"/g, '""')}"` : '""'
      const error = result.error ? `"${result.error.replace(/"/g, '""')}"` : '""'

      csv += `${url},${status},${statusText},${canonicalUrl},${error}\n`
    })

    const dataUri = `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`
    const exportFileDefaultName = `http-status-results-${new Date().toISOString().slice(0, 10)}.csv`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h2 className="text-xl font-bold">Results ({results.length} URLs)</h2>
        <div className="flex space-x-2 mt-2 sm:mt-0">
          <Button variant="outline" size="sm" onClick={exportResultsCSV}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="outline" size="sm" onClick={exportResults}>
            <Download className="h-4 w-4 mr-2" />
            Export JSON
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-4">
        <div className="bg-secondary p-2 rounded text-center">
          <div className="text-sm text-muted-foreground">Success</div>
          <div className="font-bold text-green-500 dark:text-green-400">{counts.success}</div>
        </div>
        <div className="bg-secondary p-2 rounded text-center">
          <div className="text-sm text-muted-foreground">Redirect</div>
          <div className="font-bold text-blue-500 dark:text-blue-400">{counts.redirect}</div>
        </div>
        <div className="bg-secondary p-2 rounded text-center">
          <div className="text-sm text-muted-foreground">Client Error</div>
          <div className="font-bold text-yellow-500 dark:text-yellow-400">{counts.clientError}</div>
        </div>
        <div className="bg-secondary p-2 rounded text-center">
          <div className="text-sm text-muted-foreground">Server Error</div>
          <div className="font-bold text-red-500 dark:text-red-400">{counts.serverError}</div>
        </div>
        <div className="bg-secondary p-2 rounded text-center">
          <div className="text-sm text-muted-foreground">Errors</div>
          <div className="font-bold text-gray-500 dark:text-gray-400">{counts.error}</div>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All ({results.length})</TabsTrigger>
          <TabsTrigger value="success">Success ({counts.success})</TabsTrigger>
          <TabsTrigger value="redirect">Redirect ({counts.redirect})</TabsTrigger>
          <TabsTrigger value="client-error">Client Error ({counts.clientError})</TabsTrigger>
          <TabsTrigger value="server-error">Server Error ({counts.serverError})</TabsTrigger>
          <TabsTrigger value="error">Errors ({counts.error})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          {filteredResults.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No results match the selected filter</div>
          ) : (
            <Accordion type="single" collapsible className="w-full">
              {filteredResults.map((result, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className={`hover:no-underline ${settings.compactView ? "py-2" : ""}`}>
                    <div className="flex items-center w-full">
                      {result.error || result.status === 0 ? (
                        <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400 mr-2" />
                      ) : (
                        <Badge className={`${getStatusColor(result.status)} mr-2`}>{result.status}</Badge>
                      )}
                      <span className="text-left truncate max-w-[300px] sm:max-w-[500px]">{result.url}</span>
                      {result.error && (
                        <span className="ml-2 text-red-500 dark:text-red-400 text-sm">{result.error}</span>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className={`space-y-4 p-2 ${settings.compactView ? "text-sm" : ""}`}>
                      {!result.error && result.status !== 0 && (
                        <>
                          <div>
                            <h3 className="font-semibold mb-1">Status</h3>
                            <p>
                              {result.status} {result.statusText || getStatusDescription(result.status)}
                            </p>
                          </div>

                          {result.canonicalUrl && (
                            <div>
                              <h3 className="font-semibold mb-1">Canonical URL</h3>
                              <p className="break-all">{result.canonicalUrl}</p>
                            </div>
                          )}

                          {settings.showRedirectChain && result.redirectChain && result.redirectChain.length > 0 && (
                            <div>
                              <h3 className="font-semibold mb-1">Redirect Chain</h3>
                              <div className="space-y-2">
                                {result.redirectChain.map((redirect, idx) => (
                                  <div key={idx} className="flex items-center">
                                    <Badge className={`${getStatusColor(redirect.status)} mr-2`}>
                                      {redirect.status}
                                    </Badge>
                                    <span className="truncate max-w-[300px] sm:max-w-[500px]">{redirect.url}</span>
                                    {idx < result.redirectChain!.length - 1 && <ArrowRight className="mx-2 h-4 w-4" />}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {settings.showHeaders && (
                            <div>
                              <h3 className="font-semibold mb-1">Headers</h3>
                              <div className="bg-muted p-2 rounded-md">
                                <pre className="text-xs overflow-x-auto">
                                  {Object.entries(result.headers).map(([key, value]) => (
                                    <div key={key}>
                                      <span className="text-primary">{key}:</span> {value}
                                    </div>
                                  ))}
                                </pre>
                              </div>
                            </div>
                          )}
                        </>
                      )}

                      {(result.error || result.status === 0) && (
                        <div className="text-red-500 dark:text-red-400">
                          <h3 className="font-semibold mb-1">Error</h3>
                          <p>{result.error || "Failed to fetch URL"}</p>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

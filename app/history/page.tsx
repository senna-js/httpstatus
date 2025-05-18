import type { Metadata } from "next"
import HistoryManager from "@/components/history/history-manager"

export const metadata: Metadata = {
  title: "URL History - HTTP Status Checker",
  description: "View and manage your URL history",
}

export default function HistoryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">URL History</h1>
        <p className="text-muted-foreground mb-8">
          View and manage your previously checked URLs. Your history is stored locally on your device.
        </p>

        <HistoryManager />
      </div>
    </div>
  )
}

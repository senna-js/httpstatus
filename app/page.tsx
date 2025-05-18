import { Suspense } from "react"
import StatusChecker from "@/components/status-checker"
import Features from "@/components/features"
import type { Metadata } from "next"
import { ThemeColorWrapper } from "@/components/theme-color-wrapper"

export const metadata: Metadata = {
  title: "HTTP Status Checker - Check HTTP Status Codes, Headers, and Redirects",
  description: "Easily check status codes, response headers, and redirect chains for any URL",
}

export default function Home({ searchParams }: { searchParams: { url?: string } }) {
  const initialUrl = searchParams.url || ""

  return (
    <ThemeColorWrapper>
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center text-center py-12">
            <div className="bg-primary rounded-full p-6 mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-8 h-8"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold mb-4">
              Easily check <span className="text-foreground">status codes</span>,{" "}
              <span className="text-foreground">response headers</span>, and{" "}
              <span className="text-foreground">redirect chains</span>.
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mb-8">
              Quickly analyze and validate URLs with useful functionalities
            </p>
          </div>

          <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading status checker...</div>}>
            <StatusChecker initialUrl={initialUrl} />
          </Suspense>

          <Features />
        </div>
      </main>
    </ThemeColorWrapper>
  )
}

// Create a new API route for batch checking URLs
import { NextResponse } from "next/server"

const USER_AGENTS = {
  default:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  googlebot: "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
  bingbot: "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)",
  mobile:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1",
}

async function checkSingleUrl(url: string, canonicalCheck: boolean, userAgent: string) {
  try {
    // Validate URL format
    let parsedUrl: URL
    try {
      parsedUrl = new URL(url)
    } catch (error) {
      return {
        url,
        status: 0,
        statusText: "Error",
        headers: {},
        error: "Invalid URL format",
      }
    }

    // Prepare headers for the request
    const headers = new Headers()
    headers.set("User-Agent", USER_AGENTS[userAgent as keyof typeof USER_AGENTS] || USER_AGENTS.default)

    // Track redirect chain
    const redirectChain: { url: string; status: number; statusText: string }[] = []
    let currentUrl = url
    let finalResponse: Response | null = null

    // Follow redirects manually to track the chain
    const MAX_REDIRECTS = 10
    let redirectCount = 0

    while (redirectCount < MAX_REDIRECTS) {
      const response = await fetch(currentUrl, {
        method: "GET",
        headers,
        redirect: "manual",
      })

      // If this is a redirect, add to chain and continue
      if (response.status >= 300 && response.status < 400) {
        const location = response.headers.get("location")

        redirectChain.push({
          url: currentUrl,
          status: response.status,
          statusText: response.statusText,
        })

        if (!location) {
          // Redirect without location header
          finalResponse = response
          break
        }

        // Resolve relative URLs
        try {
          currentUrl = new URL(location, currentUrl).toString()
        } catch (error) {
          finalResponse = response
          break
        }

        redirectCount++
      } else {
        // Not a redirect, we're done
        finalResponse = response
        break
      }
    }

    if (!finalResponse) {
      return {
        url,
        status: 0,
        statusText: "Error",
        headers: {},
        error: "Too many redirects",
      }
    }

    // Convert headers to a plain object
    const responseHeaders: Record<string, string> = {}
    finalResponse.headers.forEach((value, key) => {
      responseHeaders[key] = value
    })

    // Check for canonical URL if requested
    let canonicalUrl = null
    if (canonicalCheck && finalResponse.status === 200) {
      try {
        const text = await finalResponse.clone().text()
        const canonicalMatch = text.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i)
        if (canonicalMatch && canonicalMatch[1]) {
          canonicalUrl = canonicalMatch[1]
        }
      } catch (error) {
        // Ignore errors in canonical extraction
      }
    }

    return {
      url,
      status: finalResponse.status,
      statusText: finalResponse.statusText,
      headers: responseHeaders,
      redirectChain: redirectChain.length > 0 ? redirectChain : undefined,
      canonicalUrl,
    }
  } catch (error) {
    return {
      url,
      status: 0,
      statusText: "Error",
      headers: {},
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

export async function POST(request: Request) {
  try {
    const { urls, canonicalCheck, userAgent } = await request.json()

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json({ error: "URLs array is required and must not be empty" }, { status: 400 })
    }

    if (urls.length > 50) {
      return NextResponse.json({ error: "Maximum of 50 URLs can be checked in a single request" }, { status: 400 })
    }

    // Process all URLs in parallel
    const results = await Promise.all(urls.map((url: string) => checkSingleUrl(url.trim(), canonicalCheck, userAgent)))

    return NextResponse.json({ results })
  } catch (error) {
    console.error("Error in batch check:", error)
    return NextResponse.json({ error: "Failed to process URLs" }, { status: 500 })
  }
}

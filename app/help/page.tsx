import type { Metadata } from "next"
import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Help & FAQ - HTTP Status Checker",
  description: "Frequently asked questions and help for using the HTTP Status Checker",
}

export default function HelpPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Help & FAQ</h1>
        <p className="text-gray-600 mb-8">
          Find answers to frequently asked questions about using the HTTP Status Checker.
        </p>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>Learn how to use the HTTP Status Checker effectively</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is HTTP Status Checker?</AccordionTrigger>
                <AccordionContent>
                  HTTP Status Checker is a tool that allows you to check HTTP status codes, response headers, and
                  redirect chains for any URL. It helps developers, SEO specialists, and website administrators diagnose
                  issues with their websites.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>How do I check a URL's status?</AccordionTrigger>
                <AccordionContent>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Enter one or more URLs in the text area on the home page, one URL per line.</li>
                    <li>Optionally, select additional options like canonical domain check or user agent.</li>
                    <li>Click the "Check status" button.</li>
                    <li>View the results, which will show the status code, headers, and any redirect chains.</li>
                  </ol>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>What are HTTP status codes?</AccordionTrigger>
                <AccordionContent>
                  HTTP status codes are three-digit numbers that indicate the outcome of an HTTP request. They are
                  grouped into five classes:
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>
                      <strong>1xx (Informational)</strong>: The request was received, continuing process
                    </li>
                    <li>
                      <strong>2xx (Success)</strong>: The request was successfully received, understood, and accepted
                    </li>
                    <li>
                      <strong>3xx (Redirection)</strong>: Further action needs to be taken to complete the request
                    </li>
                    <li>
                      <strong>4xx (Client Error)</strong>: The request contains bad syntax or cannot be fulfilled
                    </li>
                    <li>
                      <strong>5xx (Server Error)</strong>: The server failed to fulfill a valid request
                    </li>
                  </ul>
                  <p className="mt-2">
                    <Link href="/status-codes" className="text-blue-500 hover:underline">
                      View our complete HTTP status codes reference
                    </Link>
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Features</CardTitle>
            <CardDescription>Learn about the features of HTTP Status Checker</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-4">
                <AccordionTrigger>What is the canonical domain check?</AccordionTrigger>
                <AccordionContent>
                  The canonical domain check looks for the canonical URL specified in the HTML of the page. This is
                  useful for SEO purposes to ensure that the correct canonical URL is being used. The canonical URL is
                  specified using a <code>&lt;link rel="canonical" href="..."&gt;</code> tag in the HTML head.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>Why would I change the user agent?</AccordionTrigger>
                <AccordionContent>
                  Changing the user agent allows you to simulate requests from different browsers or devices. This is
                  useful for testing how a website responds to different clients. For example, some websites serve
                  different content to mobile devices or search engine bots.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger>What is a redirect chain?</AccordionTrigger>
                <AccordionContent>
                  A redirect chain is a sequence of HTTP redirects that occur when accessing a URL. For example, a URL
                  might redirect from HTTP to HTTPS, then to a www subdomain, and finally to a specific page. Long
                  redirect chains can slow down page loading and impact SEO, so it's important to minimize them.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Troubleshooting</CardTitle>
            <CardDescription>Common issues and how to resolve them</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-7">
                <AccordionTrigger>Why am I getting a "Failed to fetch URL" error?</AccordionTrigger>
                <AccordionContent>
                  This error can occur for several reasons:
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>The URL is invalid or malformed</li>
                    <li>The server is down or unreachable</li>
                    <li>The server has blocked our request (some servers block automated requests)</li>
                    <li>There's a network issue between our server and the target server</li>
                  </ul>
                  <p className="mt-2">Try checking the URL manually in your browser to see if it's accessible.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8">
                <AccordionTrigger>Why do I see different results than in my browser?</AccordionTrigger>
                <AccordionContent>
                  There are several reasons why you might see different results:
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>The server might be serving different content based on location, cookies, or other factors</li>
                    <li>Your browser might be caching the page, showing an older version</li>
                    <li>The server might be detecting automated requests and responding differently</li>
                    <li>The user agent setting might be affecting the response</li>
                  </ul>
                  <p className="mt-2">
                    Try using different user agent settings or clearing your browser cache to see if that resolves the
                    discrepancy.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-9">
                <AccordionTrigger>Is there a limit to how many URLs I can check?</AccordionTrigger>
                <AccordionContent>
                  The free version of HTTP Status Checker allows you to check up to 100 URLs per day. If you need to
                  check more URLs, consider upgrading to a premium plan or using our API for programmatic access.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <div className="mt-12 text-center">
          <p className="mb-4">Still have questions?</p>
          <Link
            href="/contact"
            className="inline-flex h-10 items-center justify-center rounded-md bg-blue-500 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  )
}

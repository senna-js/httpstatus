import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, BookOpen, Code, FileText, Globe, Server } from "lucide-react"

export const metadata: Metadata = {
  title: "Learn HTTP - Status Codes, Headers, and More",
  description: "Learn about HTTP status codes, headers, and best practices for web development",
}

export default function LearnPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Learn HTTP</h1>
        <p className="text-gray-600 mb-8">
          Expand your knowledge about HTTP, status codes, headers, and web development best practices.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader>
              <div className="flex items-center mb-2">
                <div className="bg-blue-100 p-2 rounded-full mr-2">
                  <Server className="h-5 w-5 text-blue-500" />
                </div>
                <CardTitle>HTTP Basics</CardTitle>
              </div>
              <CardDescription>Learn the fundamentals of HTTP and how the web works</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-blue-500" />
                  <Link href="/learn/http-basics" className="text-blue-500 hover:underline">
                    Introduction to HTTP
                  </Link>
                </li>
                <li className="flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-blue-500" />
                  <Link href="/learn/request-response" className="text-blue-500 hover:underline">
                    HTTP Request and Response Cycle
                  </Link>
                </li>
                <li className="flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-blue-500" />
                  <Link href="/learn/http-methods" className="text-blue-500 hover:underline">
                    HTTP Methods Explained
                  </Link>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/learn/http-basics" className="text-sm text-blue-500 hover:underline flex items-center">
                View all HTTP basics
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center mb-2">
                <div className="bg-blue-100 p-2 rounded-full mr-2">
                  <Code className="h-5 w-5 text-blue-500" />
                </div>
                <CardTitle>Status Codes</CardTitle>
              </div>
              <CardDescription>Understand HTTP status codes and their meanings</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-blue-500" />
                  <Link href="/status-codes" className="text-blue-500 hover:underline">
                    Complete Status Code Reference
                  </Link>
                </li>
                <li className="flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-blue-500" />
                  <Link href="/learn/status-code-best-practices" className="text-blue-500 hover:underline">
                    Status Code Best Practices
                  </Link>
                </li>
                <li className="flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-blue-500" />
                  <Link href="/learn/error-handling" className="text-blue-500 hover:underline">
                    Error Handling with Status Codes
                  </Link>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/status-codes" className="text-sm text-blue-500 hover:underline flex items-center">
                View all status codes
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </CardFooter>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader>
              <div className="flex items-center mb-2">
                <div className="bg-blue-100 p-2 rounded-full mr-2">
                  <FileText className="h-5 w-5 text-blue-500" />
                </div>
                <CardTitle>HTTP Headers</CardTitle>
              </div>
              <CardDescription>Learn about HTTP headers and their importance</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-blue-500" />
                  <Link href="/learn/common-headers" className="text-blue-500 hover:underline">
                    Common HTTP Headers
                  </Link>
                </li>
                <li className="flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-blue-500" />
                  <Link href="/learn/security-headers" className="text-blue-500 hover:underline">
                    Security Headers Explained
                  </Link>
                </li>
                <li className="flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-blue-500" />
                  <Link href="/learn/caching-headers" className="text-blue-500 hover:underline">
                    Caching Headers and Performance
                  </Link>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/learn/headers" className="text-sm text-blue-500 hover:underline flex items-center">
                View all header guides
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center mb-2">
                <div className="bg-blue-100 p-2 rounded-full mr-2">
                  <Globe className="h-5 w-5 text-blue-500" />
                </div>
                <CardTitle>Redirects</CardTitle>
              </div>
              <CardDescription>Master HTTP redirects and their implementation</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-blue-500" />
                  <Link href="/learn/redirect-types" className="text-blue-500 hover:underline">
                    Types of HTTP Redirects
                  </Link>
                </li>
                <li className="flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-blue-500" />
                  <Link href="/learn/redirect-best-practices" className="text-blue-500 hover:underline">
                    Redirect Best Practices for SEO
                  </Link>
                </li>
                <li className="flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-blue-500" />
                  <Link href="/learn/redirect-chains" className="text-blue-500 hover:underline">
                    Understanding Redirect Chains
                  </Link>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/learn/redirects" className="text-sm text-blue-500 hover:underline flex items-center">
                View all redirect guides
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </CardFooter>
          </Card>
        </div>

        <Card className="mb-12">
          <CardHeader>
            <div className="flex items-center mb-2">
              <div className="bg-blue-100 p-2 rounded-full mr-2">
                <BookOpen className="h-5 w-5 text-blue-500" />
              </div>
              <CardTitle>Tutorials</CardTitle>
            </div>
            <CardDescription>Step-by-step tutorials to help you implement HTTP best practices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Setting Up Proper Redirects</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Learn how to implement proper redirects for your website to maintain SEO value and user experience.
                </p>
                <Link
                  href="/learn/tutorials/redirects"
                  className="text-sm text-blue-500 hover:underline flex items-center"
                >
                  Read tutorial
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Implementing Security Headers</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Protect your website by implementing essential security headers to prevent common vulnerabilities.
                </p>
                <Link
                  href="/learn/tutorials/security-headers"
                  className="text-sm text-blue-500 hover:underline flex items-center"
                >
                  Read tutorial
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Optimizing Cache Headers</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Improve your website's performance by setting up optimal cache headers for different types of content.
                </p>
                <Link
                  href="/learn/tutorials/cache-optimization"
                  className="text-sm text-blue-500 hover:underline flex items-center"
                >
                  Read tutorial
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Handling API Errors</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Learn how to properly handle and communicate API errors using appropriate status codes and messages.
                </p>
                <Link
                  href="/learn/tutorials/api-errors"
                  className="text-sm text-blue-500 hover:underline flex items-center"
                >
                  Read tutorial
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/learn/tutorials" className="text-sm text-blue-500 hover:underline flex items-center">
              View all tutorials
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </CardFooter>
        </Card>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to check your website?</h2>
          <p className="text-gray-600 mb-6">
            Use our HTTP Status Checker to analyze your website's status codes, headers, and redirects.
          </p>
          <Link
            href="/"
            className="inline-flex h-10 items-center justify-center rounded-md bg-blue-500 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            Go to Status Checker
          </Link>
        </div>
      </div>
    </div>
  )
}

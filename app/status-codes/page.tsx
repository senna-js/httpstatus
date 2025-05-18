import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "HTTP Status Codes - Complete Reference",
  description: "Complete reference of HTTP status codes, their meanings, and common use cases",
}

interface StatusCodeGroup {
  range: string
  title: string
  description: string
  codes: {
    code: number
    title: string
    description: string
  }[]
}

const statusCodeGroups: StatusCodeGroup[] = [
  {
    range: "1xx",
    title: "Informational",
    description: "The request was received, continuing process",
    codes: [
      {
        code: 100,
        title: "Continue",
        description:
          "The server has received the request headers and the client should proceed to send the request body.",
      },
      {
        code: 101,
        title: "Switching Protocols",
        description: "The requester has asked the server to switch protocols and the server has agreed to do so.",
      },
      {
        code: 102,
        title: "Processing",
        description: "The server has received and is processing the request, but no response is available yet.",
      },
      {
        code: 103,
        title: "Early Hints",
        description: "Used to return some response headers before final HTTP message.",
      },
    ],
  },
  {
    range: "2xx",
    title: "Success",
    description: "The request was successfully received, understood, and accepted",
    codes: [
      {
        code: 200,
        title: "OK",
        description: "The request has succeeded. The information returned depends on the method used.",
      },
      {
        code: 201,
        title: "Created",
        description: "The request has been fulfilled and a new resource has been created.",
      },
      {
        code: 202,
        title: "Accepted",
        description: "The request has been accepted for processing, but the processing has not been completed.",
      },
      {
        code: 204,
        title: "No Content",
        description: "The server successfully processed the request, but is not returning any content.",
      },
      {
        code: 206,
        title: "Partial Content",
        description: "The server is delivering only part of the resource due to a range header sent by the client.",
      },
    ],
  },
  {
    range: "3xx",
    title: "Redirection",
    description: "Further action needs to be taken in order to complete the request",
    codes: [
      {
        code: 300,
        title: "Multiple Choices",
        description: "The requested resource has multiple representations available.",
      },
      {
        code: 301,
        title: "Moved Permanently",
        description: "The requested resource has been permanently moved to a new URL.",
      },
      { code: 302, title: "Found", description: "The requested resource temporarily resides under a different URL." },
      { code: 303, title: "See Other", description: "The response to the request can be found under a different URL." },
      { code: 304, title: "Not Modified", description: "The resource has not been modified since the last request." },
      {
        code: 307,
        title: "Temporary Redirect",
        description: "The requested resource temporarily resides under a different URL.",
      },
      {
        code: 308,
        title: "Permanent Redirect",
        description: "The requested resource has been permanently moved to a new URL.",
      },
    ],
  },
  {
    range: "4xx",
    title: "Client Error",
    description: "The request contains bad syntax or cannot be fulfilled",
    codes: [
      { code: 400, title: "Bad Request", description: "The server cannot process the request due to a client error." },
      {
        code: 401,
        title: "Unauthorized",
        description: "Authentication is required and has failed or has not been provided.",
      },
      { code: 403, title: "Forbidden", description: "The server understood the request but refuses to authorize it." },
      { code: 404, title: "Not Found", description: "The requested resource could not be found on the server." },
      {
        code: 405,
        title: "Method Not Allowed",
        description: "The request method is not supported for the requested resource.",
      },
      { code: 408, title: "Request Timeout", description: "The server timed out waiting for the request." },
      {
        code: 429,
        title: "Too Many Requests",
        description: "The user has sent too many requests in a given amount of time.",
      },
    ],
  },
  {
    range: "5xx",
    title: "Server Error",
    description: "The server failed to fulfill a valid request",
    codes: [
      {
        code: 500,
        title: "Internal Server Error",
        description: "The server encountered an unexpected condition that prevented it from fulfilling the request.",
      },
      {
        code: 501,
        title: "Not Implemented",
        description: "The server does not support the functionality required to fulfill the request.",
      },
      {
        code: 502,
        title: "Bad Gateway",
        description: "The server received an invalid response from an upstream server.",
      },
      {
        code: 503,
        title: "Service Unavailable",
        description:
          "The server is currently unable to handle the request due to temporary overloading or maintenance.",
      },
      {
        code: 504,
        title: "Gateway Timeout",
        description: "The server did not receive a timely response from an upstream server.",
      },
    ],
  },
]

export default function StatusCodesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">HTTP Status Codes</h1>
        <p className="text-gray-600 mb-8">
          HTTP status codes are issued by a server in response to a client's request. They indicate whether a specific
          HTTP request has been successfully completed, and provide information about the result of the request.
        </p>

        <div className="space-y-8">
          {statusCodeGroups.map((group) => (
            <div key={group.range} className="space-y-4">
              <h2 className="text-2xl font-semibold flex items-center">
                <Badge className="mr-2">{group.range}</Badge>
                {group.title}
              </h2>
              <p className="text-gray-600 mb-4">{group.description}</p>

              <div className="space-y-4">
                {group.codes.map((code) => (
                  <Card key={code.code}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Badge className="mr-2">{code.code}</Badge>
                        {code.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{code.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/" className="text-blue-500 hover:underline">
            ← Back to Status Checker
          </Link>
        </div>
      </div>
    </div>
  )
}

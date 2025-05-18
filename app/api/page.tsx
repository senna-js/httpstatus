import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "HTTP Status Checker API - Documentation",
  description: "API documentation for the HTTP Status Checker service",
}

export default function ApiPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">API Documentation</h1>
        <p className="text-gray-600 mb-8">
          Our HTTP Status Checker API allows you to programmatically check status codes, headers, and redirect chains
          for any URL.
        </p>

        <Tabs defaultValue="overview">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>API Overview</CardTitle>
                <CardDescription>
                  The HTTP Status Checker API provides a simple way to check HTTP status codes and headers for any URL.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Base URL</h3>
                  <code className="bg-gray-100 dark:bg-gray-800 p-2 rounded block">https://your-domain.com/api</code>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Authentication</h3>
                  <p>API requests require an API key to be included in the request headers:</p>
                  <code className="bg-gray-100 dark:bg-gray-800 p-2 rounded block mt-2">
                    X-API-Key: your_api_key_here
                  </code>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Rate Limits</h3>
                  <p>
                    Free tier: 100 requests per day
                    <br />
                    Pro tier: 10,000 requests per day
                    <br />
                    Enterprise tier: Custom limits
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="endpoints">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Check URL Status</CardTitle>
                <CardDescription>Check the HTTP status, headers, and redirect chain for a URL</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Endpoint</h3>
                  <code className="bg-gray-100 dark:bg-gray-800 p-2 rounded block">POST /check-status</code>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Request Body</h3>
                  <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded block overflow-x-auto">
                    {`{
  "url": "https://example.com",
  "canonicalCheck": true,
  "userAgent": "default"
}`}
                  </pre>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Response</h3>
                  <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded block overflow-x-auto">
                    {`{
  "url": "https://example.com",
  "status": 200,
  "statusText": "OK",
  "headers": {
    "content-type": "text/html; charset=utf-8",
    "server": "nginx",
    ...
  },
  "redirectChain": [
    {
      "url": "http://example.com",
      "status": 301,
      "statusText": "Moved Permanently"
    }
  ],
  "canonicalUrl": "https://www.example.com"
}`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Batch Check URLs</CardTitle>
                <CardDescription>Check multiple URLs in a single request</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Endpoint</h3>
                  <code className="bg-gray-100 dark:bg-gray-800 p-2 rounded block">POST /batch-check</code>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Request Body</h3>
                  <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded block overflow-x-auto">
                    {`{
  "urls": [
    "https://example.com",
    "https://github.com"
  ],
  "canonicalCheck": true,
  "userAgent": "default"
}`}
                  </pre>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Response</h3>
                  <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded block overflow-x-auto">
                    {`{
  "results": [
    {
      "url": "https://example.com",
      "status": 200,
      "statusText": "OK",
      "headers": { ... },
      "redirectChain": [ ... ],
      "canonicalUrl": "https://www.example.com"
    },
    {
      "url": "https://github.com",
      "status": 200,
      "statusText": "OK",
      "headers": { ... },
      "redirectChain": [ ... ]
    }
  ]
}`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="examples">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Example: Check URL Status</CardTitle>
                <CardDescription>Example of checking a URL's status using cURL</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded block overflow-x-auto">
                  {`curl -X POST https://your-domain.com/api/check-status \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: your_api_key_here" \\
  -d '{
    "url": "https://example.com",
    "canonicalCheck": true,
    "userAgent": "default"
  }'`}
                </pre>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Example: JavaScript Fetch</CardTitle>
                <CardDescription>Example of checking a URL's status using JavaScript Fetch API</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded block overflow-x-auto">
                  {`async function checkUrlStatus(url) {
  const response = await fetch('https://your-domain.com/api/check-status', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': 'your_api_key_here'
    },
    body: JSON.stringify({
      url: url,
      canonicalCheck: true,
      userAgent: 'default'
    })
  });
  
  return await response.json();
}

// Usage
checkUrlStatus('https://example.com')
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`}
                </pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Example: Python Requests</CardTitle>
                <CardDescription>Example of checking a URL's status using Python Requests library</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded block overflow-x-auto">
                  {`import requests
import json

def check_url_status(url):
    api_url = 'https://your-domain.com/api/check-status'
    headers = {
        'Content-Type': 'application/json',
        'X-API-Key': 'your_api_key_here'
    }
    payload = {
        'url': url,
        'canonicalCheck': True,
        'userAgent': 'default'
    }
    
    response = requests.post(api_url, headers=headers, json=payload)
    return response.json()

# Usage
result = check_url_status('https://example.com')
print(json.dumps(result, indent=2))`}
                </pre>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

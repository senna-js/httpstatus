import { ArrowRight, Filter, RotateCw, Server } from "lucide-react"

export default function Features() {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center mb-4">Easy-to-use features</h2>
      <p className="text-center text-muted-foreground mb-12">
        Quickly analyse and validate URLs with useful functionalities
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="flex flex-col items-center text-center p-6 rounded-lg border hover:shadow-md transition-shadow bg-card">
          <div className="bg-primary/10 p-3 rounded-full mb-4">
            <RotateCw className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Redirect checker</h3>
          <p className="text-muted-foreground">
            Track and analyze redirect chains to ensure proper URL forwarding and avoid SEO issues.
          </p>
        </div>

        <div className="flex flex-col items-center text-center p-6 rounded-lg border hover:shadow-md transition-shadow bg-card">
          <div className="bg-primary/10 p-3 rounded-full mb-4">
            <Server className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Request headers</h3>
          <p className="text-muted-foreground">
            Inspect HTTP headers to debug caching, security, and content negotiation issues.
          </p>
        </div>

        <div className="flex flex-col items-center text-center p-6 rounded-lg border hover:shadow-md transition-shadow bg-card">
          <div className="bg-primary/10 p-3 rounded-full mb-4">
            <Filter className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Filter options</h3>
          <p className="text-muted-foreground">
            Easily filter and sort results by status code categories to focus on specific issues.
          </p>
        </div>
      </div>

      <div className="mt-12 text-center">
        <a href="/status-codes" className="inline-flex items-center text-primary hover:underline">
          Learn more about HTTP status codes
          <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </div>
    </section>
  )
}

"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Search, Filter } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const { toast } = useToast()

  const handleFeatureClick = (feature: string) => {
    toast({
      title: "🚧 Coming Soon!",
      description: `${feature} will be available in the next update.`,
      duration: 4000,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Search Results</h1>
          <p className="text-muted-foreground">
            {query ? `Showing results for "${query}"` : "Enter a search term to find products"}
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-8 text-center">
          <Search className="h-12 w-12 text-blue-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Advanced Search Coming Soon!</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            We're building a powerful search engine with filters, sorting options, and intelligent product matching to
            help you find exactly what you're looking for.
          </p>
          <div className="flex justify-center space-x-4">
            <Button onClick={() => handleFeatureClick("Advanced Search")}>
              <Filter className="h-4 w-4 mr-2" />
              Get Notified
            </Button>
            <Button variant="outline" onClick={() => handleFeatureClick("Browse All Products")}>
              Browse All Products
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading search results...</div>}>
      <SearchResults />
    </Suspense>
  )
}

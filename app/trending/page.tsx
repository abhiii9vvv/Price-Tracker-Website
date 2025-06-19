"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Flame, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

export default function TrendingPage() {
  const { toast } = useToast()

  const handleFeatureClick = (feature: string) => {
    toast({
      title: "🚧 Coming Soon!",
      description: `${feature} will be available in the next update.`,
      duration: 4000,
    })
  }

  const trendingProducts = [
    { name: "iPhone 14 Pro", views: "12.5K", trend: "+25%", image: "/images/products/smartphone.jpg" },
    { name: "MacBook Air M2", views: "8.2K", trend: "+18%", image: "/images/products/laptop.jpg" },
    { name: "Sony WH-1000XM4", views: "6.8K", trend: "+15%", image: "/images/products/headphones.jpg" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center">
            <TrendingUp className="h-8 w-8 mr-3 text-green-500" />
            Trending Products
          </h1>
          <p className="text-muted-foreground">Discover what's popular and trending in the market right now.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {trendingProducts.map((product, index) => (
            <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={60}
                    height={60}
                    className="rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{product.name}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{product.views} views</span>
                      <Badge variant="secondary" className="text-green-600">
                        {product.trend}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-8 text-center">
          <Flame className="h-12 w-12 text-orange-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Trending Analytics Coming Soon!</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            We're building comprehensive trending analytics including real-time popularity tracking, price trend
            analysis, and personalized recommendations based on your interests.
          </p>
          <div className="flex justify-center space-x-4">
            <Button onClick={() => handleFeatureClick("Real-time Analytics")}>
              <TrendingUp className="h-4 w-4 mr-2" />
              Get Notified
            </Button>
            <Button variant="outline" onClick={() => handleFeatureClick("Browse Categories")}>
              Browse Categories
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

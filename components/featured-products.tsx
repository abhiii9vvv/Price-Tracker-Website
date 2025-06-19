"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, TrendingDown, ExternalLink, Bell } from "lucide-react"
import Link from "next/link"
import { getAllProducts } from "@/lib/product-data"

const featuredProducts = getAllProducts()

export function FeaturedProducts() {
  const [products, setProducts] = useState(featuredProducts)
  const [isLoading, setIsLoading] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the best deals on trending products. Track prices and get notified when they drop!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300">
              <div className="relative overflow-hidden">
                <img
                  src={product.imageUrl || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-red-500 hover:bg-red-600">
                    {Math.abs(
                      Math.round(((product.originalPrice - product.currentPrice) / product.originalPrice) * 100),
                    )}
                    % OFF
                  </Badge>
                </div>
                <div className="absolute top-3 right-3">
                  <Button variant="outline" size="sm" className="bg-white/90 hover:bg-white">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    {product.brand}
                  </Badge>
                  <div className="flex items-center text-green-600">
                    <TrendingDown className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">
                      {Math.abs(
                        Math.round(((product.originalPrice - product.currentPrice) / product.originalPrice) * 100),
                      )}
                      %
                    </span>
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight">{product.name}</CardTitle>
                <CardDescription className="text-sm">{product.description}</CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">{formatPrice(product.currentPrice)}</div>
                      <div className="text-sm text-muted-foreground line-through">
                        {formatPrice(product.originalPrice)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Best Price</div>
                      <div className="text-sm font-medium">{product.stores[0].name}</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">Available at:</div>
                    <div className="flex flex-wrap gap-2">
                      {product.stores.map((store, index) => (
                        <Button key={index} variant="outline" size="sm" className="text-xs">
                          {store.name} - {formatPrice(store.price)}
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button className="flex-1">
                      <Bell className="h-4 w-4 mr-2" />
                      Set Price Alert
                    </Button>
                    <Link href={`/products/${product.id}`}>
                      <Button variant="outline">View Details</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  )
}

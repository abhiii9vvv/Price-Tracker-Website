"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Bell, Plus, TrendingDown } from "lucide-react"

export function PriceTrackingSection() {
  const [productUrl, setProductUrl] = useState("")

  const handleAddProduct = () => {
    if (productUrl.trim()) {
      // Handle adding product for tracking
      console.log("Adding product:", productUrl)
      setProductUrl("")
    }
  }

  const mockTrackedProducts = [
    {
      id: "1",
      name: "Wireless Headphones",
      currentPrice: 8999,
      targetPrice: 7500,
      status: "tracking",
    },
    {
      id: "2",
      name: "Gaming Laptop",
      currentPrice: 89999,
      targetPrice: 80000,
      status: "tracking",
    },
  ]

  return (
    <section className="py-16 px-4 bg-muted/50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Track Any Product</h2>
          <p className="text-muted-foreground mb-8">Add products to your watchlist and get notified when prices drop</p>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add Product to Track
              </CardTitle>
              <CardDescription>Enter a product URL or search for a product to start tracking its price</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Enter product URL or name..."
                  value={productUrl}
                  onChange={(e) => setProductUrl(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleAddProduct}>
                  <Bell className="h-4 w-4 mr-2" />
                  Track
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold mb-6">Your Tracked Products</h3>
          <div className="grid gap-4">
            {mockTrackedProducts.map((product) => (
              <Card key={product.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium mb-2">{product.name}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Current: ₹{product.currentPrice.toLocaleString()}</span>
                        <span>Target: ₹{product.targetPrice.toLocaleString()}</span>
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <TrendingDown className="h-3 w-3" />
                          {product.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-primary">₹{product.currentPrice.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">
                        {(((product.currentPrice - product.targetPrice) / product.targetPrice) * 100).toFixed(1)}% above
                        target
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

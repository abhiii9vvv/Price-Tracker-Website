"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Trash2, ShoppingCart, AlertTriangle, Star } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

export default function WishlistPage() {
  const [wishlistItems] = useState([
    {
      id: 1,
      name: "Sony WH-1000XM4 Headphones",
      price: 299,
      originalPrice: 349,
      image: "/images/products/headphones.jpg",
      inStock: true,
      discount: 14,
    },
    {
      id: 2,
      name: "MacBook Air M2",
      price: 1199,
      originalPrice: 1299,
      image: "/images/products/laptop.jpg",
      inStock: true,
      discount: 8,
    },
    {
      id: 3,
      name: "iPhone 14 Pro",
      price: 999,
      originalPrice: 1099,
      image: "/images/products/smartphone.jpg",
      inStock: false,
      discount: 9,
    },
  ])

  const { toast } = useToast()

  const handleFeatureClick = (feature: string, item?: string) => {
    toast({
      title: "🚧 Coming Soon!",
      description: `${feature}${item ? ` for ${item}` : ""} will be available in the next update.`,
      duration: 4000,
    })
  }

  const totalSavings = wishlistItems.reduce((sum, item) => sum + (item.originalPrice - item.price), 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
            <p className="text-muted-foreground">Keep track of products you want and get notified of price drops.</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Total Potential Savings</p>
            <p className="text-2xl font-bold text-green-600">${totalSavings}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-red-500" />
                <div>
                  <p className="text-2xl font-bold">{wishlistItems.length}</p>
                  <p className="text-sm text-muted-foreground">Items</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="text-2xl font-bold">{wishlistItems.filter((item) => item.inStock).length}</p>
                  <p className="text-sm text-muted-foreground">In Stock</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <ShoppingCart className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">
                    ${Math.round(wishlistItems.reduce((sum, item) => sum + item.price, 0))}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Value</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">${totalSavings}</p>
                  <p className="text-sm text-muted-foreground">Savings</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="relative">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-2 right-2 bg-red-500">{item.discount}% OFF</Badge>
                {!item.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge variant="destructive">Out of Stock</Badge>
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium mb-2 line-clamp-2">{item.name}</h3>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-2xl font-bold">${item.price}</span>
                  <span className="text-sm text-muted-foreground line-through">${item.originalPrice}</span>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    className="flex-1"
                    disabled={!item.inStock}
                    onClick={() => handleFeatureClick("Add to Cart", item.name)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {item.inStock ? "Add to Cart" : "Notify Me"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleFeatureClick("Remove from Wishlist", item.name)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <Heart className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                Enhanced Wishlist Features Coming Soon
              </h3>
              <p className="text-blue-700 dark:text-blue-300 mb-4">
                We're working on advanced wishlist features including price drop notifications, stock alerts, and
                one-click purchasing.
              </p>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleFeatureClick("Enable Notifications")}>
                  Enable Notifications
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleFeatureClick("Share Wishlist")}>
                  Share Wishlist
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Flame, Clock, Star, Heart, TrendingDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const hotDeals = [
  {
    id: 1,
    name: "iPhone 14 Pro Max",
    brand: "Apple",
    image: "/images/products/smartphone.jpg",
    currentPrice: 999,
    originalPrice: 1299,
    discount: 23,
    timeLeft: "2h 45m",
    claimed: 67,
    totalStock: 100,
    rating: 4.8,
    isFlashDeal: true,
  },
  {
    id: 2,
    name: "Sony WH-1000XM5",
    brand: "Sony",
    image: "/images/products/headphones.jpg",
    currentPrice: 299,
    originalPrice: 399,
    discount: 25,
    timeLeft: "5h 12m",
    claimed: 89,
    totalStock: 150,
    rating: 4.9,
    isFlashDeal: true,
  },
  {
    id: 3,
    name: "MacBook Pro M2",
    brand: "Apple",
    image: "/images/products/laptop.jpg",
    currentPrice: 1899,
    originalPrice: 2299,
    discount: 17,
    timeLeft: "1d 3h",
    claimed: 34,
    totalStock: 50,
    rating: 4.9,
    isFlashDeal: false,
  },
]

const dailyDeals = [
  {
    id: 4,
    name: "Samsung Galaxy Watch 5",
    brand: "Samsung",
    image: "/images/products/smartwatch.jpg",
    currentPrice: 199,
    originalPrice: 279,
    discount: 29,
    rating: 4.6,
    reviews: 1234,
  },
  {
    id: 5,
    name: "JBL Charge 5",
    brand: "JBL",
    image: "/images/products/speaker.jpg",
    currentPrice: 129,
    originalPrice: 179,
    discount: 28,
    rating: 4.7,
    reviews: 892,
  },
  {
    id: 6,
    name: "iPad Air 5th Gen",
    brand: "Apple",
    image: "/images/products/tablet.jpg",
    currentPrice: 499,
    originalPrice: 599,
    discount: 17,
    rating: 4.8,
    reviews: 2156,
  },
]

export default function DealsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Flame className="h-8 w-8 text-orange-500" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Hot Deals
          </h1>
        </div>
        <p className="text-muted-foreground text-lg">Limited time offers - grab them before they're gone!</p>
      </div>

      {/* Flash Deals */}
      <div className="mb-12">
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <h2 className="text-2xl font-bold">⚡ Flash Deals</h2>
          <Badge variant="destructive" className="animate-pulse">
            ENDING SOON
          </Badge>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {hotDeals.map((deal) => (
            <Card
              key={deal.id}
              className="group hover:shadow-xl transition-all duration-300 border-2 border-red-200 hover:border-red-300"
            >
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={deal.image || "/placeholder.svg"}
                    alt={deal.name}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-2 left-2 bg-red-500 animate-pulse">-{deal.discount}% OFF</Badge>
                  {deal.isFlashDeal && <Badge className="absolute top-2 right-2 bg-orange-500">⚡ FLASH</Badge>}
                  <Button variant="ghost" size="sm" className="absolute bottom-2 right-2 bg-white/80 hover:bg-white">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{deal.brand}</Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{deal.rating}</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-lg">{deal.name}</h3>

                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-green-600">${deal.currentPrice}</span>
                    <span className="text-lg text-muted-foreground line-through">${deal.originalPrice}</span>
                    <Badge variant="destructive" className="text-xs">
                      SAVE ${deal.originalPrice - deal.currentPrice}
                    </Badge>
                  </div>

                  {deal.isFlashDeal && (
                    <>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center space-x-1">
                          <Clock className="h-4 w-4 text-red-500" />
                          <span className="font-medium text-red-500">{deal.timeLeft} left</span>
                        </span>
                        <span className="text-muted-foreground">
                          {deal.claimed}/{deal.totalStock} claimed
                        </span>
                      </div>
                      <Progress value={(deal.claimed / deal.totalStock) * 100} className="h-2" />
                    </>
                  )}

                  <div className="flex items-center space-x-2 pt-2">
                    <Button
                      asChild
                      className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                    >
                      <Link href={`/products/${deal.id}`}>Grab Deal Now!</Link>
                    </Button>
                    <Button variant="outline" size="sm">
                      <TrendingDown className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Daily Deals */}
      <div>
        <div className="flex items-center space-x-2 mb-6">
          <h2 className="text-2xl font-bold">🌟 Daily Deals</h2>
          <Badge variant="secondary">24 HOURS ONLY</Badge>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {dailyDeals.map((deal) => (
            <Card key={deal.id} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={deal.image || "/placeholder.svg"}
                    alt={deal.name}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-2 left-2 bg-blue-500">-{deal.discount}%</Badge>
                  <Button variant="ghost" size="sm" className="absolute top-2 right-2 bg-white/80 hover:bg-white">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{deal.brand}</Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{deal.rating}</span>
                      <span className="text-sm text-muted-foreground">({deal.reviews})</span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg">{deal.name}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-green-600">${deal.currentPrice}</span>
                    <span className="text-sm text-muted-foreground line-through">${deal.originalPrice}</span>
                  </div>
                  <div className="flex items-center space-x-2 pt-2">
                    <Button asChild className="flex-1">
                      <Link href={`/products/${deal.id}`}>View Deal</Link>
                    </Button>
                    <Button variant="outline" size="sm">
                      <TrendingDown className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <Card className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-2">Never Miss a Deal!</h3>
          <p className="text-muted-foreground mb-4">Subscribe to get notified about flash sales and exclusive offers</p>
          <div className="flex max-w-md mx-auto space-x-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md border border-input bg-background"
            />
            <Button>Subscribe</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

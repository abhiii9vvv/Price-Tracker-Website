"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Grid, List, Star, TrendingDown, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const products = [
  {
    id: 1,
    name: "iPhone 14 Pro",
    brand: "Apple",
    image: "/images/products/smartphone.jpg",
    currentPrice: 899,
    originalPrice: 1099,
    discount: 18,
    rating: 4.8,
    reviews: 2847,
    category: "Smartphones",
  },
  {
    id: 2,
    name: "MacBook Air M2",
    brand: "Apple",
    image: "/images/products/laptop.jpg",
    currentPrice: 1099,
    originalPrice: 1299,
    discount: 15,
    rating: 4.9,
    reviews: 1923,
    category: "Laptops",
  },
  {
    id: 3,
    name: "Sony WH-1000XM4",
    brand: "Sony",
    image: "/images/products/headphones.jpg",
    currentPrice: 249,
    originalPrice: 349,
    discount: 29,
    rating: 4.7,
    reviews: 5621,
    category: "Audio",
  },
  {
    id: 4,
    name: 'Samsung 55" 4K TV',
    brand: "Samsung",
    image: "/images/products/tv.jpg",
    currentPrice: 599,
    originalPrice: 799,
    discount: 25,
    rating: 4.6,
    reviews: 892,
    category: "TVs",
  },
  {
    id: 5,
    name: 'iPad Pro 11"',
    brand: "Apple",
    image: "/images/products/tablet.jpg",
    currentPrice: 749,
    originalPrice: 899,
    discount: 17,
    rating: 4.8,
    reviews: 1456,
    category: "Tablets",
  },
  {
    id: 6,
    name: "Canon EOS R6",
    brand: "Canon",
    image: "/images/products/camera.jpg",
    currentPrice: 1899,
    originalPrice: 2299,
    discount: 17,
    rating: 4.9,
    reviews: 743,
    category: "Cameras",
  },
]

export default function ElectronicsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("popularity")
  const [viewMode, setViewMode] = useState("grid")
  const [filteredProducts, setFilteredProducts] = useState(products)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.brand.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()),
    )
    setFilteredProducts(filtered)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Electronics</h1>
        <p className="text-muted-foreground">Discover the latest electronics with the best prices</p>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search electronics..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popularity">Popularity</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="discount">Highest Discount</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex items-center space-x-2">
          <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
            <Grid className="h-4 w-4" />
          </Button>
          <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Products Grid */}
      <div
        className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}
      >
        {filteredProducts.map((product) => (
          <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
            <CardHeader className="p-0">
              <div className="relative overflow-hidden rounded-t-lg">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-2 left-2 bg-red-500">-{product.discount}%</Badge>
                <Button variant="ghost" size="sm" className="absolute top-2 right-2 bg-white/80 hover:bg-white">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{product.category}</Badge>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{product.rating}</span>
                    <span className="text-sm text-muted-foreground">({product.reviews})</span>
                  </div>
                </div>
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-sm text-muted-foreground">{product.brand}</p>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-green-600">${product.currentPrice}</span>
                  <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                </div>
                <div className="flex items-center space-x-2 pt-2">
                  <Button asChild className="flex-1">
                    <Link href={`/products/${product.id}`}>View Details</Link>
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

      {/* Load More */}
      <div className="text-center mt-8">
        <Button variant="outline" size="lg">
          Load More Products
        </Button>
      </div>
    </div>
  )
}

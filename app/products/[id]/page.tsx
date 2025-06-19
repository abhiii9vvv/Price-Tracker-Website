import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Heart, Share2, Bell, ExternalLink, TrendingDown, Shield, Truck, RotateCcw } from "lucide-react"
import { PriceChart } from "@/components/price-chart"
import { PriceAlertDialog } from "@/components/price-alert-dialog"
import { getProductById } from "@/lib/product-data"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.id)

  if (!product) {
    notFound()
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const discountPercentage = Math.round(((product.originalPrice - product.currentPrice) / product.originalPrice) * 100)
  const savings = product.originalPrice - product.currentPrice

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <span>/</span>
          <Link href="/categories/electronics" className="hover:text-white">
            Electronics
          </Link>
          <span>/</span>
          <span className="text-white">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Product Image */}
          <div className="space-y-4">
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <div className="aspect-square relative overflow-hidden rounded-lg bg-white">
                  <Image
                    src={product.imageUrl || "/placeholder.svg?height=500&width=500"}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                  <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600">{discountPercentage}% OFF</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="border-blue-500 text-blue-400">
                  {product.brand}
                </Badge>
                <Badge variant="outline" className="border-gray-600 text-gray-300">
                  {product.category}
                </Badge>
              </div>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-medium">{product.rating}</span>
                <span className="text-gray-400">({product.reviews.toLocaleString()} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl font-bold text-green-400">{formatPrice(product.currentPrice)}</span>
                    <span className="text-xl text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingDown className="h-5 w-5 text-green-400" />
                    <span className="text-green-400 font-medium">
                      You save {formatPrice(savings)} ({discountPercentage}% off)
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <PriceAlertDialog product={product}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Bell className="mr-2 h-4 w-4" />
                    Set Price Alert
                  </Button>
                </PriceAlertDialog>
                <Button variant="outline" className="w-full border-gray-600 hover:bg-slate-800">
                  <Heart className="mr-2 h-4 w-4" />
                  Add to Wishlist
                </Button>
              </div>
              <Button variant="outline" className="w-full border-gray-600 hover:bg-slate-800">
                <Share2 className="mr-2 h-4 w-4" />
                Share Product
              </Button>
            </div>

            {/* Store Availability */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-lg">Available at these stores:</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {product.stores.map((store, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                        <span className="text-xs font-bold text-slate-900">{store.name.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="font-medium">{store.name}</div>
                        <div className="text-sm text-gray-400">
                          Rating: {store.rating}/5 • {store.availability}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">{formatPrice(store.price)}</div>
                      <Button size="sm" variant="outline" className="mt-1" asChild>
                        <a href={store.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Visit Store
                        </a>
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="price-history">Price History</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle>Product Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed mb-6">{product.description}</p>

                <h3 className="text-lg font-semibold mb-4">Key Features</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-300">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-4 text-center">
                  <Shield className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <h3 className="font-semibold">Secure Shopping</h3>
                  <p className="text-sm text-gray-400">Protected transactions</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-4 text-center">
                  <Truck className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <h3 className="font-semibold">Fast Delivery</h3>
                  <p className="text-sm text-gray-400">Quick shipping options</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-4 text-center">
                  <RotateCcw className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                  <h3 className="font-semibold">Easy Returns</h3>
                  <p className="text-sm text-gray-400">Hassle-free returns</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="specifications">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle>Technical Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-slate-700">
                      <span className="font-medium text-gray-300">{key}</span>
                      <span className="text-white">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="price-history">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle>Price History</CardTitle>
                <p className="text-gray-400">Track how the price has changed over time</p>
              </CardHeader>
              <CardContent>
                <PriceChart data={product.priceHistory} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle>Customer Reviews</CardTitle>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xl font-bold">{product.rating}</span>
                    <span className="text-gray-400">out of 5</span>
                  </div>
                  <span className="text-gray-400">({product.reviews.toLocaleString()} reviews)</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Sample reviews */}
                  <div className="border-b border-slate-700 pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="font-medium">Excellent product!</span>
                    </div>
                    <p className="text-gray-300 text-sm">Great quality and fast delivery. Highly recommended!</p>
                    <p className="text-gray-500 text-xs mt-2">- Verified Purchase</p>
                  </div>
                  <div className="border-b border-slate-700 pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[...Array(4)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                        <Star className="h-4 w-4 text-gray-600" />
                      </div>
                      <span className="font-medium">Good value for money</span>
                    </div>
                    <p className="text-gray-300 text-sm">Works as expected. Could be better but overall satisfied.</p>
                    <p className="text-gray-500 text-xs mt-2">- Verified Purchase</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

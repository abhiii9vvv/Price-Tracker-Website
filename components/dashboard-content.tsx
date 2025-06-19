"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bell,
  TrendingDown,
  TrendingUp,
  Heart,
  Settings,
  Trash2,
  Plus,
  Search,
  Filter,
  Eye,
  Target,
  DollarSign,
  BarChart3,
  ExternalLink,
  ShoppingCart,
} from "lucide-react"
import { ResponsiveContainer, Tooltip, XAxis, YAxis, AreaChart, Area } from "recharts"
import { useAuth } from "@/components/auth-context"

// Real product data with actual images
const mockAlerts = [
  {
    id: "1",
    productId: "1",
    targetPrice: 7500,
    isActive: true,
    createdAt: new Date(),
    product: {
      id: "1",
      name: "Sony WH-1000XM4 Wireless Headphones",
      currentPrice: 8999,
      originalPrice: 12999,
      imageUrl: "/images/products/headphones.jpg",
      category: "Electronics",
      brand: "Sony",
      description: "Industry-leading noise canceling with Dual Noise Sensor technology",
      stores: [
        { name: "Amazon", price: 8999, url: "https://amazon.in" },
        { name: "Flipkart", price: 9299, url: "https://flipkart.com" },
      ],
    },
  },
  {
    id: "2",
    productId: "2",
    targetPrice: 5000,
    isActive: true,
    createdAt: new Date(),
    product: {
      id: "2",
      name: "JBL Charge 5 Portable Speaker",
      currentPrice: 6499,
      originalPrice: 7999,
      imageUrl: "/images/products/speaker.jpg",
      category: "Electronics",
      brand: "JBL",
      description: "Waterproof portable Bluetooth speaker with powerbank feature",
      stores: [
        { name: "Amazon", price: 6499, url: "https://amazon.in" },
        { name: "Croma", price: 6799, url: "https://croma.com" },
      ],
    },
  },
  {
    id: "3",
    productId: "3",
    targetPrice: 40000,
    isActive: false,
    createdAt: new Date(),
    product: {
      id: "3",
      name: 'Samsung 55" 4K Smart TV',
      currentPrice: 45999,
      originalPrice: 54999,
      imageUrl: "/images/products/tv.jpg",
      category: "Electronics",
      brand: "Samsung",
      description: "Crystal UHD 4K Smart TV with HDR and built-in Alexa",
      stores: [
        { name: "Amazon", price: 45999, url: "https://amazon.in" },
        { name: "Reliance Digital", price: 46999, url: "https://reliancedigital.in" },
      ],
    },
  },
  {
    id: "4",
    productId: "4",
    targetPrice: 75000,
    isActive: true,
    createdAt: new Date(),
    product: {
      id: "4",
      name: "MacBook Air M2",
      currentPrice: 89999,
      originalPrice: 99999,
      imageUrl: "/images/products/laptop.jpg",
      category: "Electronics",
      brand: "Apple",
      description: "13-inch MacBook Air with M2 chip, 8GB RAM, 256GB SSD",
      stores: [
        { name: "Apple Store", price: 89999, url: "https://apple.com" },
        { name: "Amazon", price: 91999, url: "https://amazon.in" },
      ],
    },
  },
  {
    id: "5",
    productId: "5",
    targetPrice: 22000,
    isActive: true,
    createdAt: new Date(),
    product: {
      id: "5",
      name: "iPhone 14 128GB",
      currentPrice: 24999,
      originalPrice: 29999,
      imageUrl: "/images/products/smartphone.jpg",
      category: "Electronics",
      brand: "Apple",
      description: "iPhone 14 with A15 Bionic chip and advanced camera system",
      stores: [
        { name: "Apple Store", price: 24999, url: "https://apple.com" },
        { name: "Flipkart", price: 25499, url: "https://flipkart.com" },
      ],
    },
  },
  {
    id: "6",
    productId: "6",
    targetPrice: 10000,
    isActive: true,
    createdAt: new Date(),
    product: {
      id: "6",
      name: "Apple Watch Series 9",
      currentPrice: 12999,
      originalPrice: 15999,
      imageUrl: "/images/products/smartwatch.jpg",
      category: "Electronics",
      brand: "Apple",
      description: "GPS smartwatch with health monitoring and fitness tracking",
      stores: [
        { name: "Apple Store", price: 12999, url: "https://apple.com" },
        { name: "Amazon", price: 13299, url: "https://amazon.in" },
      ],
    },
  },
]

const mockFavorites = [
  {
    id: "f1",
    name: "AirPods Pro (2nd Gen)",
    currentPrice: 7999,
    originalPrice: 9999,
    imageUrl: "/images/products/earbuds.jpg",
    category: "Electronics",
    brand: "Apple",
    discount: 20,
  },
  {
    id: "f2",
    name: "Canon EOS R50",
    currentPrice: 54999,
    originalPrice: 64999,
    imageUrl: "/images/products/camera.jpg",
    category: "Electronics",
    brand: "Canon",
    discount: 15,
  },
  {
    id: "f3",
    name: "PlayStation 5",
    currentPrice: 49999,
    originalPrice: 54999,
    imageUrl: "/images/products/console.jpg",
    category: "Electronics",
    brand: "Sony",
    discount: 9,
  },
  {
    id: "f4",
    name: "iPad Air 5th Gen",
    currentPrice: 32999,
    originalPrice: 39999,
    imageUrl: "/images/products/tablet.jpg",
    category: "Electronics",
    brand: "Apple",
    discount: 17,
  },
]

const mockRecentActivity = [
  {
    id: 1,
    type: "price_drop",
    product: "Sony WH-1000XM4 Headphones",
    oldPrice: 9499,
    newPrice: 8999,
    time: "2 hours ago",
    savings: 500,
  },
  {
    id: 2,
    type: "alert_triggered",
    product: "MacBook Air M2",
    targetPrice: 75000,
    currentPrice: 89999,
    time: "1 day ago",
  },
  {
    id: 3,
    type: "new_tracking",
    product: "iPhone 14",
    time: "2 days ago",
  },
  {
    id: 4,
    type: "price_increase",
    product: "iPad Air",
    oldPrice: 32999,
    newPrice: 34999,
    time: "3 days ago",
  },
  {
    id: 5,
    type: "price_drop",
    product: "JBL Charge 5",
    oldPrice: 6999,
    newPrice: 6499,
    time: "4 days ago",
    savings: 500,
  },
]

const mockPriceData = [
  { date: "Jan", savings: 2400 },
  { date: "Feb", savings: 1398 },
  { date: "Mar", savings: 9800 },
  { date: "Apr", savings: 3908 },
  { date: "May", savings: 4800 },
  { date: "Jun", savings: 3800 },
]

export function DashboardContent() {
  const [alerts, setAlerts] = useState<any[]>(mockAlerts)
  const [favorites, setFavorites] = useState<any[]>(mockFavorites)
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const { user } = useAuth()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const filteredAlerts = alerts.filter((alert) => alert.product?.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const activeAlerts = alerts.filter((alert) => alert.isActive).length
  const totalSavings = 15400 // Mock total savings
  const productsTracked = alerts.length

  const calculateDiscount = (original: number, current: number) => {
    return Math.round(((original - current) / original) * 100)
  }

  return (
    <div className="space-y-8 p-6">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name || "User"}!</h1>
          <p className="text-muted-foreground mt-2">Here's what's happening with your price tracking today.</p>
        </div>
        <Button className="mt-4 md:mt-0">
          <Plus className="h-4 w-4 mr-2" />
          Track New Product
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeAlerts}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Savings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(totalSavings)}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products Tracked</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{productsTracked}</div>
            <p className="text-xs text-muted-foreground">+1 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Discount</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23%</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Savings Over Time</CardTitle>
            <CardDescription>Your monthly savings from price tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockPriceData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={(value) => [formatPrice(Number(value)), "Savings"]} />
                  <Area
                    type="monotone"
                    dataKey="savings"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates on your tracked products</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockRecentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {activity.type === "price_drop" && (
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                        <TrendingDown className="h-4 w-4 text-green-600" />
                      </div>
                    )}
                    {activity.type === "price_increase" && (
                      <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                        <TrendingUp className="h-4 w-4 text-red-600" />
                      </div>
                    )}
                    {activity.type === "alert_triggered" && (
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Bell className="h-4 w-4 text-blue-600" />
                      </div>
                    )}
                    {activity.type === "new_tracking" && (
                      <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                        <Plus className="h-4 w-4 text-purple-600" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{activity.product}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.type === "price_drop" &&
                        `Price dropped from ${formatPrice(activity.oldPrice!)} to ${formatPrice(activity.newPrice!)} (Save ₹${activity.savings})`}
                      {activity.type === "price_increase" &&
                        `Price increased from ${formatPrice(activity.oldPrice!)} to ${formatPrice(activity.newPrice!)}`}
                      {activity.type === "alert_triggered" &&
                        `Target price ${formatPrice(activity.targetPrice!)} reached`}
                      {activity.type === "new_tracking" && "Started tracking this product"}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">{activity.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="alerts" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="alerts">Price Alerts</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle>Your Price Alerts</CardTitle>
                  <CardDescription>Manage your active price alerts and notifications</CardDescription>
                </div>
                <div className="flex items-center space-x-2 mt-4 md:mt-0">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search alerts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8 w-[200px]"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {filteredAlerts.length === 0 ? (
                <div className="text-center py-12">
                  <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No price alerts found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm
                      ? "Try adjusting your search terms"
                      : "Start tracking products to get notified when prices drop"}
                  </p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Price Alert
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-shrink-0">
                        <img
                          src={alert.product?.imageUrl || "/placeholder.svg"}
                          alt={alert.product?.name}
                          className="h-20 w-20 rounded-lg object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-lg">{alert.product?.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {alert.product?.brand}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{alert.product?.description}</p>
                        <div className="flex items-center space-x-4 mb-2">
                          <div className="text-sm">
                            Current:{" "}
                            <span className="font-medium text-lg">{formatPrice(alert.product?.currentPrice || 0)}</span>
                            <span className="text-xs text-muted-foreground line-through ml-2">
                              {formatPrice(alert.product?.originalPrice || 0)}
                            </span>
                          </div>
                          <div className="text-sm">
                            Target: <span className="font-medium text-green-600">{formatPrice(alert.targetPrice)}</span>
                          </div>
                          <Badge variant={alert.isActive ? "default" : "secondary"}>
                            {alert.isActive ? "Active" : "Inactive"}
                          </Badge>
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            {calculateDiscount(alert.product?.originalPrice || 0, alert.product?.currentPrice || 0)}%
                            OFF
                          </Badge>
                        </div>
                        <div className="mb-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{
                                width: `${Math.min(100, (alert.targetPrice / (alert.product?.currentPrice || 1)) * 100)}%`,
                              }}
                            ></div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {alert.product?.currentPrice && alert.product.currentPrice > alert.targetPrice
                              ? `₹${alert.product.currentPrice - alert.targetPrice} above target`
                              : "🎉 Target reached!"}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {alert.product?.stores?.map((store: any, index: number) => (
                            <Button key={index} variant="outline" size="sm" className="text-xs">
                              {store.name} - {formatPrice(store.price)}
                              <ExternalLink className="h-3 w-3 ml-1" />
                            </Button>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col items-center space-y-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="favorites" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Favorite Products</CardTitle>
              <CardDescription>Quick access to your most tracked products</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {favorites.map((product) => (
                  <div key={product.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="relative mb-3">
                      <img
                        src={product.imageUrl || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <Badge className="absolute top-2 right-2 bg-red-500">{product.discount}% OFF</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-sm">{product.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {product.brand}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-lg">{formatPrice(product.currentPrice)}</span>
                        <span className="text-sm text-muted-foreground line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1">
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Track Price
                        </Button>
                        <Button variant="outline" size="sm">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure how you want to receive price alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-muted-foreground">Receive price alerts via email</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Push Notifications</h4>
                    <p className="text-sm text-muted-foreground">Get instant browser notifications</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Enable
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">SMS Alerts</h4>
                    <p className="text-sm text-muted-foreground">Receive urgent alerts via SMS</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Setup
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Profile Information</h4>
                    <p className="text-sm text-muted-foreground">Update your personal details</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Privacy Settings</h4>
                    <p className="text-sm text-muted-foreground">Control your data and privacy</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Export Data</h4>
                    <p className="text-sm text-muted-foreground">Download your tracking data</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

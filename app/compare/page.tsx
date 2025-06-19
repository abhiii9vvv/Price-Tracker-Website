"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Plus, X, CheckCircle, XCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

export default function ComparePage() {
  const [compareItems] = useState([
    {
      id: 1,
      name: "iPhone 14 Pro",
      price: 999,
      image: "/images/products/smartphone.jpg",
      specs: {
        Display: "6.1-inch Super Retina XDR",
        Processor: "A16 Bionic",
        Storage: "128GB",
        Camera: "48MP Main",
        Battery: "Up to 23 hours",
      },
      pros: ["Excellent camera", "Fast processor", "Premium build"],
      cons: ["Expensive", "No USB-C"],
    },
    {
      id: 2,
      name: "Samsung Galaxy S23",
      price: 899,
      image: "/images/products/smartphone.jpg",
      specs: {
        Display: "6.1-inch Dynamic AMOLED",
        Processor: "Snapdragon 8 Gen 2",
        Storage: "128GB",
        Camera: "50MP Main",
        Battery: "Up to 22 hours",
      },
      pros: ["Great display", "Good value", "Versatile camera"],
      cons: ["Shorter battery life", "Bloatware"],
    },
  ])

  const { toast } = useToast()

  const handleFeatureClick = (feature: string) => {
    toast({
      title: "🚧 Coming Soon!",
      description: `${feature} functionality will be available in the next update.`,
      duration: 4000,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Compare Products</h1>
            <p className="text-muted-foreground">Compare specifications, prices, and features side by side.</p>
          </div>
          <Button onClick={() => handleFeatureClick("Add Product to Compare")}>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>

        {compareItems.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Products to Compare</h3>
              <p className="text-muted-foreground mb-4">Add products to start comparing their features and prices.</p>
              <Button onClick={() => handleFeatureClick("Browse Products")}>Browse Products</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Product Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {compareItems.map((item) => (
                <Card key={item.id}>
                  <CardHeader className="relative">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 h-8 w-8 p-0"
                      onClick={() => handleFeatureClick("Remove from Comparison")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={300}
                      height={200}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-medium mb-2">{item.name}</h3>
                    <p className="text-2xl font-bold text-green-600 mb-4">${item.price}</p>
                    <Button className="w-full" onClick={() => handleFeatureClick("View Product Details")}>
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Specifications Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Specifications</CardTitle>
                <CardDescription>Compare key specifications side by side</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4 font-medium">Feature</th>
                        {compareItems.map((item) => (
                          <th key={item.id} className="text-left p-4 font-medium">
                            {item.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(compareItems[0]?.specs || {}).map((spec) => (
                        <tr key={spec} className="border-b">
                          <td className="p-4 font-medium">{spec}</td>
                          {compareItems.map((item) => (
                            <td key={item.id} className="p-4">
                              {item.specs[spec]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Pros and Cons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {compareItems.map((item) => (
                <Card key={item.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <CardDescription>Pros and Cons</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-green-600 mb-2 flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Pros
                      </h4>
                      <ul className="space-y-1">
                        {item.pros.map((pro, index) => (
                          <li key={index} className="text-sm flex items-center">
                            <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-red-600 mb-2 flex items-center">
                        <XCircle className="h-4 w-4 mr-2" />
                        Cons
                      </h4>
                      <ul className="space-y-1">
                        {item.cons.map((con, index) => (
                          <li key={index} className="text-sm flex items-center">
                            <XCircle className="h-3 w-3 text-red-500 mr-2" />
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400 mt-0.5" />
            <div>
              <h3 className="font-medium text-purple-800 dark:text-purple-200 mb-2">
                Advanced Comparison Features Coming Soon
              </h3>
              <p className="text-purple-700 dark:text-purple-300 mb-4">
                We're working on enhanced comparison features including price history charts, user reviews comparison,
                and AI-powered recommendations.
              </p>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleFeatureClick("Price History")}>
                  View Price History
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleFeatureClick("User Reviews")}>
                  Compare Reviews
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

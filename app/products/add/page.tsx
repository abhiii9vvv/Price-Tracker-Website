"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, LinkIcon, AlertCircle, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function AddProductPage() {
  const [productUrl, setProductUrl] = useState("")
  const [targetPrice, setTargetPrice] = useState("")
  const [notes, setNotes] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "🚧 Feature Coming Soon!",
        description: "Product tracking will be available in the next update. Your request has been saved.",
        duration: 5000,
      })

      // Reset form
      setProductUrl("")
      setTargetPrice("")
      setNotes("")
    }, 2000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Add Product to Track</h1>
          <p className="text-muted-foreground">
            Enter a product URL to start tracking its price and get notified when it drops.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>Track New Product</span>
            </CardTitle>
            <CardDescription>We'll monitor the price and send you alerts when it changes.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="productUrl">Product URL *</Label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="productUrl"
                    type="url"
                    placeholder="https://example.com/product-page"
                    value={productUrl}
                    onChange={(e) => setProductUrl(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
                <p className="text-sm text-muted-foreground">Supported sites: Amazon, Flipkart, eBay, and more</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetPrice">Target Price (Optional)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="targetPrice"
                    type="number"
                    placeholder="0.00"
                    value={targetPrice}
                    onChange={(e) => setTargetPrice(e.target.value)}
                    className="pl-8"
                    step="0.01"
                    min="0"
                  />
                </div>
                <p className="text-sm text-muted-foreground">Get notified when the price drops to this amount</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any notes about this product..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800 dark:text-yellow-200">Feature in Development</h4>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                      This feature is currently being developed. Your submission will be saved for when the feature
                      launches.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button type="submit" disabled={isLoading} className="flex-1">
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Adding Product...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Product
                    </>
                  )}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <h3 className="font-medium">Price Monitoring</h3>
              <p className="text-sm text-muted-foreground">24/7 price tracking</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <h3 className="font-medium">Instant Alerts</h3>
              <p className="text-sm text-muted-foreground">Email & push notifications</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <h3 className="font-medium">Price History</h3>
              <p className="text-sm text-muted-foreground">Track price trends</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

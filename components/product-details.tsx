"use client"

import { useState } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { PriceAlertDialog } from "@/components/price-alert-dialog"
import { ExternalLink, Bell, Share2, Heart } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { Product } from "@/lib/types"

interface ProductDetailsProps {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false)
  const { data: session } = useSession()
  const { toast } = useToast()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out this product: ${product.name}`,
          url: window.location.href,
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      // Fallback to clipboard
      await navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link copied!",
        description: "Product link has been copied to your clipboard.",
      })
    }
  }

  const handleSetAlert = () => {
    if (!session) {
      toast({
        title: "Sign in required",
        description: "Please sign in to set price alerts.",
        variant: "destructive",
      })
      return
    }
    setIsAlertDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={product.imageUrl || "/placeholder.svg?height=400&width=400"}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <CardTitle className="text-2xl mb-2">{product.name}</CardTitle>
            <Badge variant="secondary">{product.category}</Badge>
          </div>

          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">{formatPrice(product.currentPrice)}</div>

            {product.originalPrice && product.originalPrice > product.currentPrice && (
              <div className="flex items-center gap-2">
                <span className="text-lg text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
                <Badge variant="destructive">
                  {Math.round(((product.originalPrice - product.currentPrice) / product.originalPrice) * 100)}% OFF
                </Badge>
              </div>
            )}
          </div>

          {product.description && (
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>
          )}

          <Separator />

          <div className="space-y-3">
            <Button onClick={handleSetAlert} className="w-full" variant="default">
              <Bell className="mr-2 h-4 w-4" />
              Set Price Alert
            </Button>

            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button variant="outline">
                <Heart className="mr-2 h-4 w-4" />
                Save
              </Button>
            </div>
          </div>

          {product.stores && product.stores.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3">Available at:</h3>
              <div className="space-y-2">
                {product.stores.map((store, index) => (
                  <Button key={index} variant="outline" className="w-full justify-between" asChild>
                    <a href={store.url} target="_blank" rel="noopener noreferrer">
                      <span>{store.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{formatPrice(store.price)}</span>
                        <ExternalLink className="h-4 w-4" />
                      </div>
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <PriceAlertDialog product={product} open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen} />
    </div>
  )
}

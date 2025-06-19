"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Bell, Target } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PriceAlertDialogProps {
  product: {
    id: string
    name: string
    currentPrice: number
    imageUrl?: string
  }
  children?: React.ReactNode
}

export function PriceAlertDialog({ product, children }: PriceAlertDialogProps) {
  const [open, setOpen] = useState(false)
  const [targetPrice, setTargetPrice] = useState("")
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Price alert set!",
        description: `We'll notify you when ${product.name} drops to ${formatPrice(Number(targetPrice))} or below.`,
      })

      setOpen(false)
      setTargetPrice("")
      setEmail("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to set price alert. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button>
            <Bell className="mr-2 h-4 w-4" />
            Set Price Alert
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-slate-800 border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-400" />
            Set Price Alert
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Get notified when the price drops to your target price or below.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-slate-700 rounded-lg">
            <img
              src={product.imageUrl || "/placeholder.svg"}
              alt={product.name}
              className="w-12 h-12 object-cover rounded"
            />
            <div>
              <h4 className="font-medium text-sm">{product.name}</h4>
              <p className="text-sm text-gray-400">Current price: {formatPrice(product.currentPrice)}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="target-price">Target Price (₹)</Label>
            <Input
              id="target-price"
              type="number"
              placeholder="Enter your target price"
              value={targetPrice}
              onChange={(e) => setTargetPrice(e.target.value)}
              max={product.currentPrice - 1}
              required
              className="bg-slate-700 border-slate-600 text-white"
            />
            <p className="text-xs text-gray-400">
              Must be less than current price of {formatPrice(product.currentPrice)}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-slate-700 border-slate-600 text-white"
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-slate-600 hover:bg-slate-700"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
              {isLoading ? "Setting Alert..." : "Set Alert"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

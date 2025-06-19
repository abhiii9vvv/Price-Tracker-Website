"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, Settings, Plus, AlertTriangle, TrendingDown } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function AlertsPage() {
  const [alerts] = useState([
    {
      id: 1,
      product: "iPhone 14 Pro",
      currentPrice: 999,
      targetPrice: 899,
      status: "active",
      created: "2 days ago",
    },
    {
      id: 2,
      product: "MacBook Air M2",
      currentPrice: 1199,
      targetPrice: 999,
      status: "triggered",
      created: "1 week ago",
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
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Price Alerts</h1>
            <p className="text-muted-foreground">Manage your price tracking alerts and notifications.</p>
          </div>
          <Button onClick={() => handleFeatureClick("Create Alert")}>
            <Plus className="h-4 w-4 mr-2" />
            Create Alert
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-muted-foreground">Active Alerts</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <TrendingDown className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">1</p>
                  <p className="text-sm text-muted-foreground">Triggered Today</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">$156</p>
                  <p className="text-sm text-muted-foreground">Total Saved</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Alerts</CardTitle>
            <CardDescription>Monitor and manage your price tracking alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <Bell className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium">{alert.product}</h3>
                      <p className="text-sm text-muted-foreground">
                        Target: ${alert.targetPrice} • Current: ${alert.currentPrice}
                      </p>
                      <p className="text-xs text-muted-foreground">Created {alert.created}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={alert.status === "active" ? "default" : "secondary"}>{alert.status}</Badge>
                    <Button variant="ghost" size="sm" onClick={() => handleFeatureClick("Edit Alert")}>
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-400 mt-0.5" />
            <div>
              <h3 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Alert Management Coming Soon</h3>
              <p className="text-yellow-700 dark:text-yellow-300 mb-4">
                Full alert management features including editing, deleting, and advanced notification settings are
                currently in development.
              </p>
              <Button variant="outline" size="sm" asChild>
                <Link href="/products/add">Add New Product to Track</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

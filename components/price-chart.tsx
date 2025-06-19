"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import type { PriceHistory } from "@/lib/types"

interface PriceChartProps {
  data: PriceHistory[]
  productName: string
}

type TimeRange = "7d" | "30d" | "90d" | "1y"

export function PriceChart({ data, productName }: PriceChartProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>("30d")

  const filterDataByRange = (range: TimeRange) => {
    const now = new Date()
    const days = {
      "7d": 7,
      "30d": 30,
      "90d": 90,
      "1y": 365,
    }

    const cutoffDate = new Date(now.getTime() - days[range] * 24 * 60 * 60 * 1000)
    return data.filter((item) => new Date(item.date) >= cutoffDate)
  }

  const chartData = filterDataByRange(timeRange).map((item) => ({
    date: new Date(item.date).toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
    }),
    price: item.price,
    fullDate: item.date,
  }))

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{label}</p>
          <p className="text-primary font-semibold">{formatPrice(payload[0].value)}</p>
        </div>
      )
    }
    return null
  }

  const timeRangeButtons: { value: TimeRange; label: string }[] = [
    { value: "7d", label: "7 Days" },
    { value: "30d", label: "30 Days" },
    { value: "90d", label: "90 Days" },
    { value: "1y", label: "1 Year" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Price History - {productName}</CardTitle>
        <div className="flex flex-wrap gap-2">
          {timeRangeButtons.map((button) => (
            <Button
              key={button.value}
              variant={timeRange === button.value ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange(button.value)}
            >
              {button.label}
            </Button>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        {chartData.length > 0 ? (
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            No price history available for the selected time range.
          </div>
        )}
      </CardContent>
    </Card>
  )
}

import type { PriceAlert } from "@/lib/types"

// Mock data for demonstration - replace with actual database calls
const mockAlerts: PriceAlert[] = []

export async function createPriceAlert(data: {
  userId: string
  productId: string
  targetPrice: number
}): Promise<PriceAlert> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  const newAlert: PriceAlert = {
    id: Date.now().toString(),
    userId: data.userId,
    productId: data.productId,
    targetPrice: data.targetPrice,
    isActive: true,
    createdAt: new Date(),
  }

  mockAlerts.push(newAlert)
  return newAlert
}

export async function getUserPriceAlerts(userId: string): Promise<PriceAlert[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  return mockAlerts.filter((alert) => alert.userId === userId)
}

export async function updatePriceAlert(id: string, data: Partial<PriceAlert>): Promise<PriceAlert> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  const index = mockAlerts.findIndex((alert) => alert.id === id)
  if (index === -1) {
    throw new Error("Alert not found")
  }

  mockAlerts[index] = {
    ...mockAlerts[index],
    ...data,
  }

  return mockAlerts[index]
}

export async function deletePriceAlert(id: string): Promise<void> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  const index = mockAlerts.findIndex((alert) => alert.id === id)
  if (index === -1) {
    throw new Error("Alert not found")
  }

  mockAlerts.splice(index, 1)
}

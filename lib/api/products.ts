import type { Product, PriceHistory } from "@/lib/types"

// Mock data for demonstration - replace with actual database calls
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    category: "Electronics",
    currentPrice: 8999,
    originalPrice: 12999,
    priceChange: -15,
    imageUrl: "/placeholder.svg?height=300&width=300",
    stores: [
      { name: "Amazon", url: "https://amazon.in", price: 8999 },
      { name: "Flipkart", url: "https://flipkart.com", price: 9499 },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Bluetooth Speaker",
    description: "Portable Bluetooth speaker with excellent sound quality",
    category: "Electronics",
    currentPrice: 6499,
    originalPrice: 7999,
    priceChange: -8,
    imageUrl: "/placeholder.svg?height=300&width=300",
    stores: [{ name: "Amazon", url: "https://amazon.in", price: 6499 }],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // Add more mock products...
]

const mockPriceHistory: Record<string, PriceHistory[]> = {
  "1": [
    { id: "1", productId: "1", price: 12999, date: new Date("2024-01-01") },
    { id: "2", productId: "1", price: 11999, date: new Date("2024-01-15") },
    { id: "3", productId: "1", price: 10999, date: new Date("2024-02-01") },
    { id: "4", productId: "1", price: 9999, date: new Date("2024-02-15") },
    { id: "5", productId: "1", price: 8999, date: new Date("2024-03-01") },
  ],
}

interface GetProductsOptions {
  limit?: number
  search?: string
  category?: string
}

export async function getProducts(options: GetProductsOptions = {}): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  let filtered = mockProducts

  if (options.search) {
    filtered = filtered.filter(
      (product) =>
        product.name.toLowerCase().includes(options.search!.toLowerCase()) ||
        product.category.toLowerCase().includes(options.search!.toLowerCase()),
    )
  }

  if (options.category) {
    filtered = filtered.filter((product) => product.category.toLowerCase() === options.category!.toLowerCase())
  }

  if (options.limit) {
    filtered = filtered.slice(0, options.limit)
  }

  return filtered
}

export async function getProduct(id: string): Promise<Product | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  return mockProducts.find((product) => product.id === id) || null
}

export async function getProductPriceHistory(productId: string): Promise<PriceHistory[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  return mockPriceHistory[productId] || []
}

export async function createProduct(data: Partial<Product>): Promise<Product> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  const newProduct: Product = {
    id: Date.now().toString(),
    name: data.name || "",
    description: data.description,
    category: data.category || "",
    currentPrice: data.currentPrice || 0,
    originalPrice: data.originalPrice,
    priceChange: 0,
    imageUrl: data.imageUrl,
    stores: data.stores || [],
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  mockProducts.push(newProduct)
  return newProduct
}

export async function updateProduct(id: string, data: Partial<Product>): Promise<Product> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  const index = mockProducts.findIndex((product) => product.id === id)
  if (index === -1) {
    throw new Error("Product not found")
  }

  mockProducts[index] = {
    ...mockProducts[index],
    ...data,
    updatedAt: new Date(),
  }

  return mockProducts[index]
}

export async function deleteProduct(id: string): Promise<void> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  const index = mockProducts.findIndex((product) => product.id === id)
  if (index === -1) {
    throw new Error("Product not found")
  }

  mockProducts.splice(index, 1)
}

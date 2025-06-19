export interface Product {
  id: string
  name: string
  description?: string
  category: string
  currentPrice: number
  originalPrice?: number
  priceChange: number
  imageUrl?: string
  stores?: ProductStore[]
  createdAt: Date
  updatedAt: Date
}

export interface ProductStore {
  name: string
  url: string
  price: number
}

export interface PriceHistory {
  id: string
  productId: string
  price: number
  date: Date
  source?: string
}

export interface PriceAlert {
  id: string
  userId: string
  productId: string
  targetPrice: number
  isActive: boolean
  createdAt: Date
  product?: Product
}

export interface User {
  id: string
  name?: string
  email: string
  image?: string
  createdAt: Date
}

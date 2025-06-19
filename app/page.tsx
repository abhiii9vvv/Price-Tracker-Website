import { Hero } from "@/components/hero"
import { FeaturedProducts } from "@/components/featured-products"
import { PriceTrackingSection } from "@/components/price-tracking-section"
import { getProducts } from "@/lib/api/products"

export default async function HomePage() {
  const products = await getProducts({ limit: 12 })

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <FeaturedProducts products={products} />
      <PriceTrackingSection />
    </div>
  )
}

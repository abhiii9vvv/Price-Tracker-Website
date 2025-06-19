"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import {
  Search,
  Menu,
  X,
  User,
  LogOut,
  Bell,
  Heart,
  TrendingDown,
  Settings,
  HelpCircle,
  Plus,
  Filter,
  Star,
  BarChart3,
  Bookmark,
  Gift,
  Zap,
  ShoppingCart,
  Tag,
  Flame,
  TrendingUp,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/components/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

const categories = [
  { name: "Electronics", icon: Zap, href: "/categories/electronics", count: 1250 },
  { name: "Fashion", icon: Star, href: "/categories/fashion", count: 890 },
  { name: "Home & Garden", icon: Gift, href: "/categories/home", count: 650 },
  { name: "Sports", icon: TrendingDown, href: "/categories/sports", count: 420 },
  { name: "Books", icon: Bookmark, href: "/categories/books", count: 380 },
  { name: "Health", icon: Heart, href: "/categories/health", count: 290 },
]

const quickActions = [
  { name: "Add Product", icon: Plus, href: "/products/add", color: "bg-green-500", action: "add" },
  { name: "Price Alerts", icon: Bell, href: "/alerts", color: "bg-blue-500", action: "alerts" },
  { name: "Wishlist", icon: Heart, href: "/wishlist", color: "bg-red-500", action: "wishlist" },
  { name: "Compare", icon: BarChart3, href: "/compare", color: "bg-purple-500", action: "compare" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [notifications, setNotifications] = useState(3)
  const [wishlistCount, setWishlistCount] = useState(5)
  const [compareCount, setCompareCount] = useState(2)
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, signOut } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false)

  // Handle scroll effect for enhanced glass morphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      toast({
        title: "Searching...",
        description: `Looking for "${searchQuery}"`,
      })
    }
  }

  const handleQuickAction = (action: string, href: string) => {
    if (!user && action !== "add") {
      toast({
        title: "Sign in required",
        description: "Please sign in to access this feature",
        variant: "destructive",
      })
      router.push("/auth/signin")
      return
    }

    switch (action) {
      case "add":
        toast({
          title: "Add Product",
          description: "Enter a product URL to start tracking",
        })
        break
      case "alerts":
        toast({
          title: "Price Alerts",
          description: `You have ${notifications} active alerts`,
        })
        break
      case "wishlist":
        toast({
          title: "Wishlist",
          description: `${wishlistCount} items in your wishlist`,
        })
        break
      case "compare":
        toast({
          title: "Compare Products",
          description: `${compareCount} products ready to compare`,
        })
        break
    }
    router.push(href)
  }

  const handleCategoryClick = (categoryName: string, href: string) => {
    toast({
      title: `${categoryName} Category`,
      description: `Browsing ${categoryName.toLowerCase()} products`,
    })
    router.push(href)
  }

  const handleSignOut = () => {
    signOut()
    toast({
      title: "Signed out",
      description: "You have been successfully signed out",
    })
    router.push("/")
  }

  const clearNotifications = () => {
    setNotifications(0)
    toast({
      title: "Notifications cleared",
      description: "All notifications have been marked as read",
    })
  }

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        setNotifications((prev) => prev + 1)
      }
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header
      className={cn(
        "glass-navbar sticky top-0 z-50 w-full transition-all duration-500 ease-out",
        isScrolled ? "glass-navbar-scrolled" : "glass-navbar-top",
      )}
    >
      <div className="container mx-auto px-4 relative z-10">
        {/* Top Bar */}
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="flex items-center space-x-2">
              <div className="glass-logo-container group-hover:scale-105 transition-transform duration-300">
                <TrendingDown className="h-5 w-5 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">PriceTracker</div>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-6">
            <div className="relative w-full group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-4 w-4 group-focus-within:text-white transition-colors z-10" />
              <Input
                type="text"
                placeholder="Search products, brands, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="glass-search-input"
              />
              <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full"
                  onClick={() => toast({ title: "Filters", description: "Advanced search filters coming soon!" })}
                >
                  <Filter className="h-3.5 w-3.5 text-white" />
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  className="h-8 px-4 bg-white/15 hover:bg-white/25 text-white rounded-full"
                >
                  Search
                </Button>
              </div>
            </div>
          </form>

          {/* Action Buttons & User Menu */}
          <div className="flex items-center space-x-2">
            {/* Quick Actions - Desktop */}
            <div className="hidden lg:flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                className="glass-action-button"
                onClick={() => handleQuickAction("add", "/products/add")}
              >
                <Plus className="h-5 w-5 text-white" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="glass-action-button relative"
                onClick={() => handleQuickAction("alerts", "/alerts")}
              >
                <Bell className="h-5 w-5 text-white" />
                {notifications > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-red-500 text-white text-xs rounded-full"
                  >
                    {notifications}
                  </Badge>
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="glass-action-button relative"
                onClick={() => handleQuickAction("wishlist", "/wishlist")}
              >
                <Heart className="h-5 w-5 text-white" />
                {wishlistCount > 0 && (
                  <Badge
                    variant="secondary"
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-white/20 text-white text-xs rounded-full"
                  >
                    {wishlistCount}
                  </Badge>
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="glass-action-button relative"
                onClick={() => handleQuickAction("compare", "/compare")}
              >
                <BarChart3 className="h-5 w-5 text-white" />
                {compareCount > 0 && (
                  <Badge
                    variant="outline"
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-white/20 text-white text-xs rounded-full"
                  >
                    {compareCount}
                  </Badge>
                )}
              </Button>
            </div>

            <ThemeToggle />

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="glass-user-button">
                    <div className="glass-avatar">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <span className="hidden md:inline font-medium text-white">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="glass-dropdown">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/profile")}>
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/wishlist")}>
                    <Heart className="h-4 w-4 mr-2" />
                    Wishlist
                    <Badge variant="secondary" className="ml-auto">
                      {wishlistCount}
                    </Badge>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/alerts")}>
                    <Bell className="h-4 w-4 mr-2" />
                    Price Alerts
                    <Badge variant="destructive" className="ml-auto">
                      {notifications}
                    </Badge>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push("/settings")}>
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/help")}>
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Help & Support
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  onClick={() => router.push("/auth/signin")}
                  className="h-10 px-4 bg-white/10 hover:bg-white/20 text-white rounded-md"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => router.push("/auth/signup")}
                  className="h-10 px-4 bg-white/15 hover:bg-white/25 text-white rounded-md"
                >
                  Sign Up
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden glass-mobile-button flex items-center gap-1"
              onClick={() => {
                setIsMenuOpen(!isMenuOpen)
                setIsMobileMenuActive(!isMobileMenuActive)
              }}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 text-white" />
              ) : (
                <>
                  <Menu className="h-5 w-5 text-white" />
                  <ChevronDown className="h-4 w-4 text-white" />
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Secondary Navigation - Desktop */}
        <div className="hidden md:flex items-center justify-between py-3 border-t border-white/10">
          <NavigationMenu>
            <NavigationMenuList className="space-x-2">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="glass-nav-trigger flex items-center gap-1">
                  Categories <ChevronDown className="h-4 w-4" />
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="glass-mega-menu">
                    {categories.map((category) => (
                      <NavigationMenuLink key={category.name} asChild>
                        <button
                          onClick={() => handleCategoryClick(category.name, category.href)}
                          className="glass-category-item"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <category.icon className="h-4 w-4 text-white" />
                              <div className="text-sm font-medium leading-none text-white">{category.name}</div>
                            </div>
                            <Badge variant="outline" className="text-xs rounded-full glass-category-badge">
                              {category.count}
                            </Badge>
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-white/70 mt-1">
                            Browse {category.name.toLowerCase()} products and deals
                          </p>
                        </button>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <button
                    onClick={() => {
                      toast({ title: "🔥 Hot Deals", description: "Browsing today's hottest deals!" })
                      router.push("/deals")
                    }}
                    className="glass-nav-link flex items-center gap-1"
                  >
                    <Flame className="h-4 w-4 text-orange-300" />
                    Hot Deals
                  </button>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <button
                    onClick={() => {
                      toast({ title: "📈 Trending", description: "Checking out trending products!" })
                      router.push("/trending")
                    }}
                    className="glass-nav-link flex items-center gap-1"
                  >
                    <TrendingUp className="h-4 w-4 text-green-300" />
                    Trending
                  </button>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <button
                    onClick={() => handleQuickAction("compare", "/compare")}
                    className="glass-nav-link flex items-center gap-1"
                  >
                    <BarChart3 className="h-4 w-4 text-blue-300" />
                    Compare
                    {compareCount > 0 && (
                      <Badge variant="outline" className="ml-1 rounded-full glass-badge">
                        {compareCount}
                      </Badge>
                    )}
                  </button>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center space-x-6 text-sm text-white/70">
            <button onClick={() => router.push("/deals")} className="glass-promo-link flex items-center gap-1">
              <Tag className="h-3 w-3" />
              <span>Save up to 70% today</span>
            </button>
            <span className="text-white/30">•</span>
            <button
              onClick={() => toast({ title: "Free Shipping", description: "Free shipping on orders over $50!" })}
              className="glass-promo-link flex items-center gap-1"
            >
              <ShoppingCart className="h-3 w-3" />
              <span>Free shipping on orders $50+</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className={cn(
              "md:hidden border-t border-white/10 py-4 space-y-4 glass-mobile-menu",
              isMobileMenuActive && "active",
            )}
          >
            {/* Mobile Search */}
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="glass-search-input-mobile"
                />
              </div>
            </form>

            {/* Mobile Quick Actions */}
            {user && (
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action) => (
                  <Button
                    key={action.name}
                    variant="outline"
                    size="sm"
                    className="glass-mobile-action"
                    onClick={() => {
                      handleQuickAction(action.action, action.href)
                      setIsMenuOpen(false)
                    }}
                  >
                    <action.icon className="h-4 w-4 mr-2 text-white" />
                    <span className="text-white">{action.name}</span>
                  </Button>
                ))}
              </div>
            )}

            {/* Mobile Navigation */}
            <nav className="space-y-2">
              <div className="font-medium text-sm text-white/70 mb-2">Categories</div>
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => {
                    handleCategoryClick(category.name, category.href)
                    setIsMenuOpen(false)
                  }}
                  className="glass-mobile-nav-item"
                >
                  <div className="flex items-center space-x-2">
                    <category.icon className="h-4 w-4 text-white" />
                    <span className="text-white">{category.name}</span>
                  </div>
                  <Badge variant="outline" className="text-xs glass-category-badge">
                    {category.count}
                  </Badge>
                </button>
              ))}
              <div className="border-t border-white/10 pt-2 mt-2">
                <button
                  onClick={() => {
                    toast({ title: "🔥 Hot Deals", description: "Browsing today's hottest deals!" })
                    router.push("/deals")
                    setIsMenuOpen(false)
                  }}
                  className="glass-mobile-nav-item"
                >
                  <div className="flex items-center space-x-2">
                    <Flame className="h-4 w-4 text-orange-300" />
                    <span className="text-white">Hot Deals</span>
                  </div>
                </button>
                <button
                  onClick={() => {
                    toast({ title: "📈 Trending", description: "Checking out trending products!" })
                    router.push("/trending")
                    setIsMenuOpen(false)
                  }}
                  className="glass-mobile-nav-item"
                >
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-green-300" />
                    <span className="text-white">Trending</span>
                  </div>
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

"use client"

import type React from "react"
import Link from "next/link"
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, ShoppingCart, Users, AlertCircle, Truck, Wallet, MapPin, Smartphone, Phone, Bell, PiggyBank, HelpCircle, Plus, List, LogOut, X, FileText, Calculator, ChevronDown, Package, Gavel, BookOpen } from 'lucide-react'
import { cn } from "@vehiverze/shared-utils/cn"
import { Button } from "@vehiverze/ui/button"
import { useDeviceType } from "@/lib/device-detection"
import { logout } from "@/lib/auth"
import { ThemeToggle } from "@/components/theme-toggle"
import { useState } from "react"
import { Input } from "@vehiverze/ui/input"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@vehiverze/ui/collapsible"

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { name: "Leads", href: "/admin/leads", icon: Users },
  { name: "Failed", href: "/admin/failed", icon: AlertCircle },
  { name: "Vendors", href: "/admin/vendors", icon: Truck },
  { name: "Payments", href: "/admin/payments", icon: Wallet },
  { name: "Area", href: "/admin/area", icon: MapPin },
  {
    name: "Products",
    href: "/admin/products",
    icon: Smartphone,
    subItems: [
      { name: "Add Product", href: "/admin/products/add", icon: Plus },
      { name: "Manage Products", href: "/admin/products/manage", icon: List },
      { name: "300-Point Inspection", href: "/admin/products/inspection", icon: FileText },
      { name: "Inspection Manager", href: "/admin/products/inspection-manager", icon: Calculator },
    ],
  },
  { name: "Vendor Sell Requests", href: "/admin/vendor-sell-requests", icon: Package },
  { name: "Live Bidding Watch", href: "/admin/live-bidding", icon: Gavel },
  {
    name: "Blog",
    href: "/admin/blog",
    icon: BookOpen,
    subItems: [
      { name: "Dashboard", href: "/admin/blog", icon: LayoutDashboard },
      { name: "All Posts", href: "/admin/blog/manage", icon: List },
      { name: "Create Post", href: "/admin/blog/create", icon: Plus },
      { name: "Categories & Tags", href: "/admin/blog/categories", icon: FileText },
      { name: "Settings", href: "/admin/blog/settings", icon: Calculator },
    ],
  },
  { name: "Contact", href: "/admin/contact", icon: Phone },
  { name: "Push Notification", href: "/admin/notifications", icon: Bell },
  { name: "Credit Deduction", href: "/admin/credits", icon: PiggyBank },
  { name: "Help & Support", href: "/admin/support", icon: HelpCircle },
]

interface SidebarProps {
  onClose?: () => void
}

export function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const deviceType = useDeviceType()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authCredentials, setAuthCredentials] = useState({ id: "", password: "" })
  const [isDashboardAuthenticated, setIsDashboardAuthenticated] = useState(false)
  const [productsOpen, setProductsOpen] = useState(pathname.startsWith("/admin/products"))
  const [blogOpen, setBlogOpen] = useState(pathname.startsWith("/admin/blog"))

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const handleDashboardClick = (e: React.MouseEvent) => {
    if (!isDashboardAuthenticated) {
      e.preventDefault()
      setShowAuthModal(true)
    }
  }

  const handleAuth = () => {
    if (authCredentials.id === "KaifAnsari" && authCredentials.password === "Kaif123") {
      setIsDashboardAuthenticated(true)
      setShowAuthModal(false)
      setAuthCredentials({ id: "", password: "" })
      router.push("/admin")
    } else {
      alert("Invalid credentials!")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAuth()
    }
  }

  return (
    <>
      <div className={cn("bg-card border-r border-border flex flex-col h-full overflow-hidden shadow-lg", "w-64")}>
        {/* Logo Section */}
        <div className="p-4 sm:p-6 border-b border-border flex justify-between items-center flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-primary-foreground bg-gradient-to-br from-primary to-blue-600 flex-shrink-0 shadow-md">
              <span className="font-bold text-lg">V</span>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold truncate">Vehiverze</h1>
              <p className="text-xs text-muted-foreground"><br /></p>
            </div>
          </div>
          {deviceType !== "desktop" && (
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 flex-shrink-0">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto scroll-smooth">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.subItems && pathname.startsWith(item.href))
            const isDashboard = item.href === "/admin"

            if (item.subItems) {
              const isBlog = item.name === "Blog"
              const isOpen = isBlog ? blogOpen : productsOpen
              const setOpen = isBlog ? setBlogOpen : setProductsOpen

              return (
                <Collapsible key={item.name} open={isOpen} onOpenChange={setOpen}>
                  <CollapsibleTrigger asChild>
                    <button
                      className={cn(
                        "w-full flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-xs sm:text-sm font-medium transition-smooth",
                        isActive
                          ? "bg-primary/10 text-primary shadow-sm"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
                      )}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <item.icon className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{item.name}</span>
                      </div>
                      <ChevronDown
                        className={cn("h-4 w-4 transition-transform flex-shrink-0", isOpen && "rotate-180")}
                      />
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2 ml-6 space-y-1.5">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-xs sm:text-sm transition-smooth",
                          pathname === subItem.href
                            ? "bg-primary/10 text-primary font-medium shadow-sm"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
                        )}
                        onClick={deviceType !== "desktop" ? onClose : undefined}
                      >
                        <subItem.icon className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{subItem.name}</span>
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              )
            }

            if (isDashboard) {
              return (
                <button
                  key={item.name}
                  onClick={handleDashboardClick}
                  className={cn(
                    "w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs sm:text-sm font-medium transition-smooth",
                    isActive && isDashboardAuthenticated
                      ? "bg-primary/10 text-primary shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
                  )}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{item.name}</span>
                </button>
              )
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs sm:text-sm font-medium transition-smooth",
                  isActive
                    ? "bg-primary/10 text-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
                )}
                onClick={deviceType !== "desktop" ? onClose : undefined}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">{item.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* Footer Section */}
        <div className="p-3 border-t border-border space-y-2.5 flex-shrink-0">
          <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-accent/30">
            <span className="text-xs sm:text-sm font-medium text-muted-foreground">Theme</span>
            <ThemeToggle />
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start text-xs sm:text-sm text-muted-foreground hover:text-foreground hover:bg-destructive/10 hover:text-destructive transition-smooth"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-3 flex-shrink-0" />
            <span className="truncate">Logout</span>
          </Button>
        </div>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowAuthModal(false)} />
          <div className="relative bg-card border border-border rounded-2xl shadow-2xl max-w-sm w-full mx-auto p-6 sm:p-8 space-y-6">
            {/* Modal Header */}
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Dashboard Access</h2>
              <p className="text-sm text-muted-foreground">Enter your credentials to view profit & loss information</p>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground block">Admin ID</label>
                <Input
                  value={authCredentials.id}
                  onChange={(e) => setAuthCredentials((prev) => ({ ...prev, id: e.target.value }))}
                  placeholder="Enter your admin ID"
                  onKeyPress={handleKeyPress}
                  className="text-sm input-focus border-border h-10"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground block">Password</label>
                <Input
                  type="password"
                  value={authCredentials.password}
                  onChange={(e) => setAuthCredentials((prev) => ({ ...prev, password: e.target.value }))}
                  placeholder="Enter your password"
                  onKeyPress={handleKeyPress}
                  className="text-sm input-focus border-border h-10"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                onClick={handleAuth}
                className="flex-1 text-sm font-semibold h-10 transition-all duration-200 hover:shadow-lg"
              >
                Access Dashboard
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowAuthModal(false)
                  setAuthCredentials({ id: "", password: "" })
                }}
                className="flex-1 text-sm font-semibold h-10 transition-all duration-200"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}



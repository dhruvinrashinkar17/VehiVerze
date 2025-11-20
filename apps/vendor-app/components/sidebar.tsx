"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@vehiverze/shared-utils/cn"
import {
  Activity,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  History,
  CreditCard,
  Star,
  LogOut,
  ShoppingCart,
  FileText,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@vehiverze/ui/avatar"
import { Button } from "@vehiverze/ui/button"

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // Close sidebar when route changes on mobile
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const handleLogout = () => {
    // Add your logout logic here
    router.push("/")
  }

  const menuItems = [
    { title: "Sell Vehicle", icon: ShoppingCart, href: "/dashboard/sell" },
    { title: "Submission Status", icon: FileText, href: "/dashboard/sell/status" },
    { title: "Available", icon: Activity, count: 11, href: "/dashboard/available" },
    { title: "In Progress", icon: Clock, count: 10, href: "/dashboard/in-progress" },
    { title: "To Be Failed", icon: AlertTriangle, href: "/dashboard/to-be-failed" },
    { title: "Complete", icon: CheckCircle, href: "/dashboard/complete" },
    { title: "Failed", icon: XCircle, href: "/dashboard/failed" },
    { title: "Transaction History", icon: History, href: "/dashboard/transactions" },
    { title: "Buy Credits", icon: CreditCard, href: "/dashboard/credits" },
    { title: "Ratings Page", icon: Star, href: "/dashboard/ratings" },
  ]

  return (
    <>
      {/* Hamburger Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-3 bg-gradient-to-r from-gray-800 to-black rounded-lg shadow-lg md:hidden focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-all duration-300 hover:shadow-xl hover:scale-105"
        aria-label="Toggle Menu"
      >
        <div className="space-y-1.5">
          <span
            className={cn(
              "block h-0.5 w-6 bg-white transform transition-all duration-300 ease-in-out",
              isOpen && "rotate-45 translate-y-2",
            )}
          />
          <span
            className={cn(
              "block h-0.5 w-6 bg-white transition-all duration-300 ease-in-out",
              isOpen && "opacity-0 scale-0",
            )}
          />
          <span
            className={cn(
              "block h-0.5 w-6 bg-white transform transition-all duration-300 ease-in-out",
              isOpen && "-rotate-45 -translate-y-2",
            )}
          />
        </div>
      </button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-white transform transition-transform duration-300 ease-in-out md:translate-x-0 flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Profile Section */}
        <div className="p-6 text-white bg-blue-600">
          <div className="flex items-center gap-3">
            <Avatar className="h-16 w-16 border-2 border-white">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>DA</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <h2 className="font-semibold truncate">demo account</h2>
              <p className="text-sm text-green-100 truncate" title="vehiverzedemo@vehiverze.com">
                vehiverzedemo@vehiverze.com
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className={cn(
                "flex justify-between items-center p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200",
                pathname === item.href && "bg-gray-100",
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
              </div>
              {item.count && (
                <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-sm">{item.count}</span>
              )}
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-5 w-5" />
            Logout
          </Button>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsOpen(false)} />}
    </>
  )
}



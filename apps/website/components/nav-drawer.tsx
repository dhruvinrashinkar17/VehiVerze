"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@vehiverze/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@vehiverze/ui/sheet"

const navigationItems = [
  { name: "Buy", href: "/buy" },
  { name: "Sell", href: "/sell" },
  { name: "Garage Services", href: "/garage-services" },
  { name: "Insurance", href: "/insurance-services" },
  { name: "Scrap Vehicle", href: "/scrap" },
  { name: "About", href: "/about" },
  { name: "Log In", href: "/login" },
  { name: "EMI Calculator", href: "/emi-calculator" },
  { name: "Trade with Us", href: "/trade" },
  { name: "Become a Vehiverze Partner", href: "/partner" },
  { name: "FAQ", href: "/faq" },
]

export function NavDrawer() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className="mt-8">
          <ul className="space-y-4">
            {navigationItems.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="block py-2 text-lg hover:text-primary transition-colors">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  )
}



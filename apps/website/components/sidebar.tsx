"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Car, Truck, Wrench, Shield, HelpCircle, Info, Bike, Package2 } from "lucide-react"
import { cn } from "@vehiverze/shared-utils/cn"

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    {
      title: "2 Wheeler",
      icon: Bike,
      description: "Motorcycles, Scooters",
      path: "/2-wheeler",
    },
    {
      title: "3 Wheeler",
      icon: Package2,
      description: "Auto Rickshaws, Delivery Vans",
      path: "/3-wheeler",
    },
    {
      title: "4 Wheeler",
      icon: Car,
      description: "Cars, SUVs, Small Trucks",
      path: "/4-wheeler",
    },
    {
      title: "6 Wheeler",
      icon: Truck,
      description: "Medium Trucks, Mini Buses",
      path: "/6-wheeler",
    },
    {
      title: "8 Wheeler",
      icon: Truck,
      description: "Heavy Trucks, Buses",
      path: "/8-wheeler",
    },
    {
      title: "Garage Services",
      icon: Wrench,
      description: "Maintenance & Repairs",
      path: "/garage-services",
    },
    {
      title: "Insurance",
      icon: Shield,
      description: "Vehicle Insurance",
      path: "/insurance-services",
    },
    {
      title: "About",
      icon: Info,
      description: "About Us",
      path: "/about",
    },
    {
      title: "FAQ",
      icon: HelpCircle,
      description: "Frequently Asked Questions",
      path: "/faq",
    },
  ]

  return (
    <>
      {/* Hamburger Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-white text-black rounded-md lg:hidden shadow-md"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-gray-900 text-white transition-transform duration-300 ease-in-out z-40",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0",
        )}
      >
        <div className="p-4">
          <Link href="/" className="flex items-center space-x-2 mb-8">
            <Package2 className="h-8 w-8" />
            <span className="text-2xl font-bold">Vehiverze</span>
          </Link>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.title}
                href={item.path}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <item.icon className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="font-medium">{item.title}</div>
                  <div className="text-sm text-gray-400">{item.description}</div>
                </div>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setIsOpen(false)} />}
    </>
  )
}



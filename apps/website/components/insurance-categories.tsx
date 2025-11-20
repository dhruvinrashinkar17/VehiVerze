"use client"

import { Button } from "@vehiverze/ui/button"
import { Card } from "@vehiverze/ui/card"
import { BikeIcon as Motorcycle, Truck, Car, Bus, Heart } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    title: "2 Wheeler",
    description: "Motorcycles, Scooters",
    icon: Motorcycle,
    coverage: ["Third Party", "Comprehensive", "Zero Dep", "Personal Accident"],
    path: "/insurance/vehicle",
  },
  {
    title: "3 Wheeler",
    description: "Auto Rickshaws, Delivery Vans",
    icon: Truck,
    coverage: ["Commercial", "Passenger", "Goods Carrier", "Personal Accident"],
    path: "/insurance/vehicle",
  },
  {
    title: "4 Wheeler",
    description: "Cars, SUVs, Small Trucks",
    icon: Car,
    coverage: ["Comprehensive", "Third Party", "Zero Dep", "Engine Protection"],
    path: "/insurance/vehicle",
  },
  {
    title: "6 Wheeler",
    description: "Medium Trucks, Mini Buses",
    icon: Truck,
    coverage: ["Commercial", "Fleet", "Goods Transit", "Liability"],
    path: "/insurance/vehicle",
  },
  {
    title: "8 Wheeler",
    description: "Heavy Trucks, Buses",
    icon: Bus,
    coverage: ["Commercial", "Passenger", "Goods Carrier", "All Risk"],
    path: "/insurance/vehicle",
  },
  {
    title: "Health Insurance",
    description: "Individual & Family Coverage",
    icon: Heart,
    coverage: ["Individual", "Family Floater", "Critical Illness", "Senior Citizen"],
    path: "/insurance/health",
  },
]

export function InsuranceCategories() {
  return (
    <section className="py-16 container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center mb-12">Insurance Services</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {categories.map((category) => (
          <Card key={category.title} className="bg-gray-900/50 border-0">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold">{category.title}</h2>
                  <p className="text-gray-400">{category.description}</p>
                </div>
                <category.icon className="h-8 w-8 text-gray-400" />
              </div>

              <div className="space-y-2 mb-6">
                {category.coverage.map((item) => (
                  <div key={item} className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                    <span className="text-sm text-gray-300">{item}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Link href={category.path} className="w-full">
                  <Button variant="default" className="w-full bg-green-600 hover:bg-green-700">
                    Get Quote
                  </Button>
                </Link>
                <Link href="/insurance/compare" className="w-full">
                  <Button variant="outline" className="w-full">
                    Compare Plans
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}



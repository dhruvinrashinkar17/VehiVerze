"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@vehiverze/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@vehiverze/ui/card"

const vehicleCategories = [
  {
    id: "2w",
    name: "2 Wheelers",
    description: "Bikes, Scooters, Motorcycles",
    icon: "🏍️",
    subcategories: ["Bikes", "Scooters", "Motorcycles"],
  },
  {
    id: "3w",
    name: "3 Wheelers",
    description: "Auto Rickshaws, Tuk-Tuks",
    icon: "🛺",
    subcategories: ["Auto Rickshaws", "Tuk-Tuks"],
  },
  {
    id: "4w",
    name: "4 Wheelers",
    description: "Cars, SUVs, Sedans",
    icon: "🚗",
    subcategories: ["Cars", "Commercial Cars", "Trucks", "Buses"],
  },
  {
    id: "6w",
    name: "6 Wheelers",
    description: "Trucks, Buses, Cranes",
    icon: "🚚",
    subcategories: ["Trucks", "Buses", "Cranes", "Others"],
  },
  {
    id: "8w",
    name: "8+ Wheelers",
    description: "Heavy Commercial Vehicles",
    icon: "🚛",
    subcategories: ["Trucks", "Buses", "Cranes", "Others"],
  },
]

export default function SellVehiclePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
  }

  const handleProceed = () => {
    if (selectedCategory) {
      const category = vehicleCategories.find((c) => c.id === selectedCategory)
      // Navigate to vehicle details form with category info
      window.location.href = `/dashboard/sell/details?category=${selectedCategory}&categoryName=${category?.name}`
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="p-4 text-white bg-blue-600">
        <div className="flex items-center">
          <Link href="/dashboard" className="mr-4">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-2xl font-semibold">Sell Your Vehicle</h1>
        </div>
      </header>

      <main className="p-4">
        <div className="mx-auto max-w-4xl space-y-8">
          <section>
            <h2 className="mb-2 text-2xl font-bold">Step 1: Select Vehicle Category</h2>
            <p className="text-gray-600 mb-6">Choose the type of vehicle you want to sell</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {vehicleCategories.map((category) => (
                <Card
                  key={category.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedCategory === category.id ? "ring-2 ring-blue-600 shadow-lg" : "hover:shadow-md"
                  }`}
                  onClick={() => handleCategorySelect(category.id)}
                >
                  <CardHeader>
                    <div className="text-4xl mb-2">{category.icon}</div>
                    <CardTitle>{category.name}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-gray-700">Subcategories:</p>
                      <div className="flex flex-wrap gap-2">
                        {category.subcategories.map((sub) => (
                          <span key={sub} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 flex gap-4">
              <Link href="/dashboard" className="flex-1">
                <Button variant="outline" className="w-full py-6 text-lg bg-transparent">
                  Cancel
                </Button>
              </Link>
              <Button
                className={`flex-1 py-6 text-lg ${
                  selectedCategory
                    ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                    : "bg-gray-400 cursor-not-allowed opacity-50"
                }`}
                onClick={handleProceed}
                disabled={!selectedCategory}
              >
                Next: Vehicle Details
              </Button>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}



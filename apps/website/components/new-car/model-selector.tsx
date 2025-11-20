"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Input } from "@vehiverze/ui/input"
import { Search, ArrowLeft } from "lucide-react"
import { Button } from "@vehiverze/ui/button"

interface ModelProps {
  brandId: string
  brandName: string
}

interface CarModel {
  id: string
  name: string
  image: string
  price: string
  description: string
}

// This would typically come from an API based on the brand
const getCarModels = (brandId: string): CarModel[] => {
  // Sample data - in a real app, this would be fetched from an API
  const models: Record<string, CarModel[]> = {
    "maruti-suzuki": [
      {
        id: "swift",
        name: "Swift",
        image: "/placeholder.svg?height=200&width=300",
        price: "₹5.99 - 9.03 Lakh",
        description: "Hatchback with great fuel efficiency and compact design",
      },
      {
        id: "baleno",
        name: "Baleno",
        image: "/placeholder.svg?height=200&width=300",
        price: "₹6.61 - 9.88 Lakh",
        description: "Premium hatchback with spacious interiors and modern features",
      },
      {
        id: "dzire",
        name: "Dzire",
        image: "/placeholder.svg?height=200&width=300",
        price: "₹6.51 - 9.39 Lakh",
        description: "Compact sedan with elegant styling and comfortable ride",
      },
    ],
    hyundai: [
      {
        id: "i20",
        name: "i20",
        image: "/placeholder.svg?height=200&width=300",
        price: "₹7.19 - 11.83 Lakh",
        description: "Premium hatchback with bold design and advanced technology",
      },
      {
        id: "creta",
        name: "Creta",
        image: "/placeholder.svg?height=200&width=300",
        price: "₹10.87 - 19.20 Lakh",
        description: "Popular SUV with striking looks and powerful performance",
      },
      {
        id: "venue",
        name: "Venue",
        image: "/placeholder.svg?height=200&width=300",
        price: "₹7.77 - 13.33 Lakh",
        description: "Compact SUV with modern styling and feature-rich interior",
      },
    ],
    // Add more brands as needed
  }

  return models[brandId] || []
}

export function ModelSelector({ brandId, brandName }: ModelProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const models = getCarModels(brandId)

  const filteredModels = models.filter((model) => model.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center mb-8">
          <Link href="/buy/new-cars">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">{brandName} Models</h1>
        </div>

        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search for a model..."
            className="pl-10 py-3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredModels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredModels.map((model) => (
              <Link
                key={model.id}
                href={`/buy/new-cars/${brandId}/models/${model.id}/years`}
                className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative h-48 w-full">
                  <Image src={model.image || "/placeholder.svg"} alt={model.name} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-1">{model.name}</h3>
                  <p className="text-lg font-medium text-blue-600 mb-2">{model.price}</p>
                  <p className="text-gray-600">{model.description}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-lg text-gray-600">No models found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  )
}



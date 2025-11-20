"use client"

import Link from "next/link"
import { ArrowLeft, Check } from "lucide-react"
import { Button } from "@vehiverze/ui/button"

interface VariantSelectorProps {
  brandId: string
  modelId: string
  year: string
  brandName: string
  modelName: string
}

interface Variant {
  id: string
  name: string
  price: string
  features: string[]
}

// This would typically come from an API based on the model and year
const getVariants = (modelId: string, year: string): Variant[] => {
  // Sample data - in a real app, this would be fetched from an API
  return [
    {
      id: "base",
      name: "Base",
      price: "₹5.99 Lakh",
      features: ["Manual AC", "Power Windows (Front)", "Central Locking", "Basic Audio System", "Dual Airbags"],
    },
    {
      id: "mid",
      name: "Mid",
      price: "₹7.45 Lakh",
      features: [
        "Automatic Climate Control",
        "Power Windows (All)",
        "Keyless Entry",
        "Touchscreen Infotainment",
        "Reverse Parking Sensors",
        "Alloy Wheels",
      ],
    },
    {
      id: "top",
      name: "Top",
      price: "₹9.03 Lakh",
      features: [
        "Sunroof",
        "Leather Seats",
        "Advanced Infotainment with Navigation",
        "360° Camera",
        "6 Airbags",
        "Premium Sound System",
        "Cruise Control",
      ],
    },
  ]
}

export function VariantSelector({ brandId, modelId, year, brandName, modelName }: VariantSelectorProps) {
  const variants = getVariants(modelId, year)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Link href={`/buy/new-cars/${brandId}/models/${modelId}/years`}>
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">
              {brandName} {modelName} {year}
            </h1>
            <p className="text-gray-600 mt-1">Select Variant</p>
          </div>
        </div>

        <div className="space-y-6">
          {variants.map((variant) => (
            <Link
              key={variant.id}
              href={`/buy/new-cars/${brandId}/models/${modelId}/years/${year}/variants/${variant.id}/transmission`}
              className="block"
            >
              <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-semibold">{variant.name}</h3>
                  <p className="text-xl font-medium text-blue-600">{variant.price}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {variant.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}



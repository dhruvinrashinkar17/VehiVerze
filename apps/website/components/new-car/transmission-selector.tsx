"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@vehiverze/ui/button"

interface TransmissionSelectorProps {
  brandId: string
  modelId: string
  year: string
  variantId: string
  brandName: string
  modelName: string
  variantName: string
}

interface Transmission {
  id: string
  name: string
  price: string
  description: string
}

// This would typically come from an API based on the model, year, and variant
const getTransmissions = (modelId: string, variantId: string): Transmission[] => {
  // Sample data - in a real app, this would be fetched from an API
  return [
    {
      id: "manual",
      name: "Manual",
      price: "₹7.45 Lakh",
      description: "5-speed manual transmission with smooth gear shifts and better fuel efficiency",
    },
    {
      id: "automatic",
      name: "Automatic",
      price: "₹8.25 Lakh",
      description: "CVT automatic transmission for effortless driving experience in city traffic",
    },
  ]
}

export function TransmissionSelector({
  brandId,
  modelId,
  year,
  variantId,
  brandName,
  modelName,
  variantName,
}: TransmissionSelectorProps) {
  const transmissions = getTransmissions(modelId, variantId)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-8">
          <Link href={`/buy/new-cars/${brandId}/models/${modelId}/years/${year}/variants`}>
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">
              {brandName} {modelName}
            </h1>
            <p className="text-gray-600 mt-1">
              {year} {variantName} - Select Transmission
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {transmissions.map((transmission) => (
            <Link
              key={transmission.id}
              href={`/buy/new-cars/${brandId}/models/${modelId}/years/${year}/variants/${variantId}/transmission/${transmission.id}/checkout`}
              className="block"
            >
              <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-semibold">{transmission.name}</h3>
                  <p className="text-xl font-medium text-blue-600">{transmission.price}</p>
                </div>
                <p className="text-gray-600">{transmission.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}



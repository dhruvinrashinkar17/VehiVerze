"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@vehiverze/ui/button"

interface YearSelectorProps {
  brandId: string
  modelId: string
  brandName: string
  modelName: string
}

export function YearSelector({ brandId, modelId, brandName, modelName }: YearSelectorProps) {
  // Get current year and previous two years
  const currentYear = new Date().getFullYear()
  const years = [currentYear, currentYear - 1, currentYear - 2]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-8">
          <Link href={`/buy/new-cars/${brandId}/models`}>
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">
              {brandName} {modelName}
            </h1>
            <p className="text-gray-600 mt-1">Select Manufacturing Year</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {years.map((year) => (
            <Link
              key={year}
              href={`/buy/new-cars/${brandId}/models/${modelId}/years/${year}/variants`}
              className="block"
            >
              <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-2xl font-semibold text-center">{year}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}



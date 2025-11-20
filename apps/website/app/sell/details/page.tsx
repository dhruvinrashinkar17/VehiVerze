"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Button } from "@vehiverze/ui/button"
import { CitySelector } from "@/components/city-selector"
import { YearSelector } from "@/components/year-selector"
import { ModelSelector } from "@/components/model-selector"
import { FuelTypeSelector } from "@/components/fuel-type-selector"
import { VariantSelector } from "@/components/variant-selector"
import { KilometersSelector } from "@/components/kilometers-selector"
import { SellingTimelineSelector } from "@/components/selling-timeline-selector"
import { SellPageFAQs } from "@/components/sell-page-faqs"
import { SellFlowTitle } from "@/components/sell-flow-title"

export default function SellDetailsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [vehicleDetails, setVehicleDetails] = useState({
    type: "",
    brand: "",
    registration: "",
    city: "",
    year: "",
    model: "",
    fuelType: "",
    variant: "",
    kilometers: "",
    sellingTimeline: "",
  })

  useEffect(() => {
    // Get vehicle type and brand/registration from URL parameters
    const type = searchParams.get("type") || ""
    const brand = searchParams.get("brand") || ""
    const registration = searchParams.get("registration") || ""

    setVehicleDetails((prev) => ({
      ...prev,
      type,
      brand,
      registration,
    }))
  }, [searchParams])

  const handleCitySelect = (city: string) => {
    setVehicleDetails((prev) => ({ ...prev, city }))
    setCurrentStep(3)
  }

  const handleYearSelect = (year: string) => {
    setVehicleDetails((prev) => ({ ...prev, year }))
    setCurrentStep(4)
  }

  const handleModelSelect = (model: string) => {
    setVehicleDetails((prev) => ({ ...prev, model }))
    setCurrentStep(5)
  }

  const handleFuelTypeSelect = (fuelType: string) => {
    setVehicleDetails((prev) => ({ ...prev, fuelType }))
    setCurrentStep(6)
  }

  const handleVariantSelect = (variant: string) => {
    setVehicleDetails((prev) => ({ ...prev, variant }))
    setCurrentStep(7)
  }

  const handleKilometersSelect = (kilometers: string) => {
    setVehicleDetails((prev) => ({ ...prev, kilometers }))
    setCurrentStep(8)
  }

  const handleTimelineSelect = (sellingTimeline: string) => {
    setVehicleDetails((prev) => ({ ...prev, sellingTimeline }))
    // Proceed to contact form
    router.push("/sell/contact")
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    } else {
      // Go back to the vehicle type page
      router.push(`/sell/${vehicleDetails.type}`)
    }
  }

  // Format the vehicle type for display
  const formattedType = vehicleDetails.type.replace("-", " ")

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1E1E1E] to-[#2B4BA9]">
      <NavBar />

      {/* SEO-friendly title that appears between navigation and progress steps */}
      <SellFlowTitle
        vehicleType={vehicleDetails.type}
        brand={vehicleDetails.brand}
        model={vehicleDetails.model}
        year={vehicleDetails.year}
        variant={vehicleDetails.variant}
        fuelType={vehicleDetails.fuelType}
        kilometers={vehicleDetails.kilometers}
        step={currentStep}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress indicator */}
          <div className="mb-8 flex justify-between">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  i + 1 < currentStep
                    ? "bg-green-500 text-white"
                    : i + 1 === currentStep
                      ? "bg-blue-500 text-white"
                      : "bg-gray-700 text-gray-300"
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>

          {/* Current step content */}
          <div className="bg-black/30 p-6 rounded-lg">
            {currentStep === 1 && (
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-4">
                  Selling your {formattedType} {vehicleDetails.brand && `- ${vehicleDetails.brand}`}
                </h2>
                {vehicleDetails.registration && (
                  <p className="text-gray-300">Registration: {vehicleDetails.registration}</p>
                )}
                <Button onClick={() => setCurrentStep(2)} className="mt-4 bg-[#4ADE80] hover:bg-[#4ADE80]/90">
                  Continue
                </Button>
              </div>
            )}

            {currentStep === 2 && <CitySelector onSelect={handleCitySelect} onBack={handleBack} />}

            {currentStep === 3 && <YearSelector onSelect={handleYearSelect} onBack={handleBack} />}

            {currentStep === 4 && (
              <ModelSelector brand={vehicleDetails.brand} onSelect={handleModelSelect} onBack={handleBack} />
            )}

            {currentStep === 5 && <FuelTypeSelector onSelect={handleFuelTypeSelect} onBack={handleBack} />}

            {currentStep === 6 && <VariantSelector onSelect={handleVariantSelect} onBack={handleBack} />}

            {currentStep === 7 && <KilometersSelector onSelect={handleKilometersSelect} onBack={handleBack} />}

            {currentStep === 8 && <SellingTimelineSelector onSelect={handleTimelineSelect} onBack={handleBack} />}
          </div>
        </div>
      </div>
      <SellPageFAQs pageType="details" />
      <Footer />
    </main>
  )
}



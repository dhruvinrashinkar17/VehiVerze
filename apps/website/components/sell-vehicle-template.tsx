"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@vehiverze/ui/button"

// Define the props interface for the template
interface SellVehicleTemplateProps {
  vehicleType: string
  brands: { name: string; logo: string }[]
  examples: string
  icon: string
}

export function SellVehicleTemplate({ vehicleType, brands, examples, icon }: SellVehicleTemplateProps) {
  const [selectedBrand, setSelectedBrand] = useState("")
  const [registrationNumber, setRegistrationNumber] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // If a brand is selected, pass it to the next step
    if (selectedBrand) {
      router.push(`/sell/details?type=${vehicleType.toLowerCase().replace(" ", "-")}&brand=${selectedBrand}`)
    } else if (registrationNumber) {
      // If registration number is provided, use that instead
      router.push(
        `/sell/details?type=${vehicleType.toLowerCase().replace(" ", "-")}&registration=${registrationNumber}`,
      )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1E1E1E] to-[#2B4BA9]">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold">
            Sell your {vehicleType} <span className="text-[#4ADE80]">at the best price</span>
          </h1>
          <p className="text-xl text-gray-400">2x Faster Process</p>
          <p className="text-lg text-gray-300">
            {examples} <span className="text-2xl">{icon}</span>
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-8">
          <form onSubmit={handleSubmit}>
            <div className="relative mb-8">
              <input
                type="text"
                placeholder={`Enter your ${vehicleType} registration number`}
                className="w-full px-6 py-4 rounded-lg bg-black/50 text-white border-none focus:outline-none focus:ring-2 focus:ring-[#4ADE80]"
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
              />
              <Button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#4ADE80] hover:bg-[#4ADE80]/90"
              >
                Get Your {vehicleType} Price
              </Button>
            </div>
          </form>

          <div className="text-center">
            <p className="text-gray-400 mb-4">Or</p>
            <h2 className="text-xl mb-6">Select your {vehicleType} brand to get started</h2>

            <div className="car-brand-grid">
              {brands.map((brand) => (
                <button
                  key={brand.name}
                  onClick={() => setSelectedBrand(brand.name)}
                  className={`p-4 rounded-lg ${selectedBrand === brand.name ? "bg-[#4ADE80]/30" : "bg-black/30"} hover:bg-black/50 transition-colors`}
                >
                  <Image
                    src={brand.logo || "/placeholder.svg"}
                    alt={brand.name}
                    width={100}
                    height={50}
                    className="mx-auto mb-2"
                  />
                  <span className="text-sm">{brand.name}</span>
                </button>
              ))}
            </div>

            {selectedBrand && (
              <Button onClick={handleSubmit} className="mt-8 bg-[#4ADE80] hover:bg-[#4ADE80]/90">
                Continue with {selectedBrand}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}



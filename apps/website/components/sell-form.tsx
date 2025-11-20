"use client"

import Image from "next/image"
import { Button } from "@vehiverze/ui/button"

const carBrands = [
  { name: "Suzuki", logo: "/placeholder.svg?height=50&width=100" },
  { name: "Hyundai", logo: "/placeholder.svg?height=50&width=100" },
  { name: "Honda", logo: "/placeholder.svg?height=50&width=100" },
  { name: "Tata", logo: "/placeholder.svg?height=50&width=100" },
  { name: "Ford", logo: "/placeholder.svg?height=50&width=100" },
  { name: "Volkswagen", logo: "/placeholder.svg?height=50&width=100" },
  { name: "Mahindra", logo: "/placeholder.svg?height=50&width=100" },
  { name: "Kia", logo: "/placeholder.svg?height=50&width=100" },
  { name: "BMW", logo: "/placeholder.svg?height=50&width=100" },
  { name: "Mercedes", logo: "/placeholder.svg?height=50&width=100" },
]

export function SellForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold">
          Sell your car <span className="text-[#4ADE80]">at the best price</span>
        </h1>
        <p className="text-xl text-gray-400">2x Faster Process</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Enter your car registration number"
            className="w-full px-6 py-4 rounded-lg bg-black/50 text-white border-none focus:outline-none focus:ring-2 focus:ring-[#4ADE80]"
          />
          <Button
            onClick={() => onSubmit({})}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#4ADE80] hover:bg-[#4ADE80]/90"
          >
            Get Your Car Price
          </Button>
        </div>

        <div className="text-center">
          <p className="text-gray-400 mb-4">Or</p>
          <h2 className="text-xl mb-6">Select your car brand to get started</h2>

          <div className="car-brand-grid">
            {carBrands.map((brand) => (
              <button
                key={brand.name}
                onClick={() => onSubmit({ brand: brand.name })}
                className="p-4 rounded-lg bg-black/30 hover:bg-black/50 transition-colors"
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
        </div>
      </div>
    </div>
  )
}



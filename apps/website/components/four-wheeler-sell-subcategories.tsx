"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@vehiverze/ui/button"
import { Input } from "@vehiverze/ui/input"
import { Car, Truck } from "lucide-react"

export function FourWheelerSellSubcategories() {
  const router = useRouter()
  const [selectedType, setSelectedType] = useState<string | null>("car")
  const [registrationNumber, setRegistrationNumber] = useState("")

  const handleTypeSelect = (type: string) => {
    setSelectedType(type)
  }

  const handleGetPrice = () => {
    if (registrationNumber.trim()) {
      router.push(`/sell/details?registration=${registrationNumber}&type=${selectedType}`)
    }
  }

  const handleBrandSelect = (brand: string) => {
    router.push(`/sell/details?brand=${brand}&type=${selectedType}`)
  }

  const carBrands = [
    { name: "Maruti Suzuki", image: "/placeholder.svg?height=80&width=80" },
    { name: "Hyundai", image: "/placeholder.svg?height=80&width=80" },
    { name: "Tata", image: "/placeholder.svg?height=80&width=80" },
    { name: "Mahindra", image: "/placeholder.svg?height=80&width=80" },
    { name: "Honda", image: "/placeholder.svg?height=80&width=80" },
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Progress Steps */}
      <div className="flex justify-center mb-10">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-green-400 flex items-center justify-center text-white font-semibold">
            1
          </div>
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-semibold">
            2
          </div>
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-semibold">
            3
          </div>
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-semibold">
            4
          </div>
        </div>
      </div>

      {/* Main Heading */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">
          Sell your 4 Wheeler <span className="text-green-500">at the best price</span>
        </h1>
        <p className="text-gray-600 mt-2">2x Faster Process</p>
      </div>

      {/* Car Icon */}
      <div className="flex justify-center mb-8">
        <div className="w-16 h-16">
          <img src="/placeholder.svg?height=64&width=64" alt="Car" className="w-full h-full" />
        </div>
      </div>

      {/* Vehicle Type Selection */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-center mb-6">Select your 4 Wheeler type</h2>
        <div className="flex justify-center gap-4">
          <Button
            variant={selectedType === "car" ? "outline" : "ghost"}
            className={`h-16 px-6 border rounded-md ${
              selectedType === "car" ? "border-green-400 bg-green-50" : "border-gray-200 bg-white hover:bg-gray-50"
            }`}
            onClick={() => handleTypeSelect("car")}
          >
            <Car className="mr-2 h-5 w-5" />
            Car
          </Button>
          <Button
            variant={selectedType === "commercial" ? "outline" : "ghost"}
            className={`h-16 px-6 border rounded-md ${
              selectedType === "commercial"
                ? "border-green-400 bg-green-50"
                : "border-gray-200 bg-white hover:bg-gray-50"
            }`}
            onClick={() => handleTypeSelect("commercial")}
          >
            <Car className="mr-2 h-5 w-5" />
            Commercial Car
          </Button>
          <Button
            variant={selectedType === "truck" ? "outline" : "ghost"}
            className={`h-16 px-6 border rounded-md ${
              selectedType === "truck" ? "border-green-400 bg-green-50" : "border-gray-200 bg-white hover:bg-gray-50"
            }`}
            onClick={() => handleTypeSelect("truck")}
          >
            <Truck className="mr-2 h-5 w-5" />
            Truck
          </Button>
        </div>
      </div>

      {/* Registration Number Input */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Input
          type="text"
          placeholder="Enter your Car registration number"
          className="flex-grow h-14 text-center text-lg"
          value={registrationNumber}
          onChange={(e) => setRegistrationNumber(e.target.value)}
        />
        <Button
          className="h-14 px-6 bg-green-500 hover:bg-green-600 text-white font-medium text-lg"
          onClick={handleGetPrice}
        >
          Get Your Car Price
        </Button>
      </div>

      {/* Or Divider */}
      <div className="text-center mb-8">
        <p className="text-gray-500">Or</p>
      </div>

      {/* Brand Selection */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-center mb-6">Select your Car brand to get started</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {carBrands.map((brand, index) => (
            <div
              key={index}
              className="border border-gray-100 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleBrandSelect(brand.name.toLowerCase().replace(" ", "-"))}
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                <img src={brand.image || "/placeholder.svg"} alt={brand.name} className="w-12 h-12 object-contain" />
              </div>
              <p className="text-center font-medium">{brand.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}



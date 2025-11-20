"use client"

import type React from "react"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@vehiverze/ui/button"
import { Input } from "@vehiverze/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@vehiverze/ui/card"
import { Textarea } from "@vehiverze/ui/textarea"

const vehicleData = {
  "2w": {
    brands: ["Hero", "Honda", "Bajaj", "TVS", "Royal Enfield"],
    transmissions: ["Manual", "Automatic"],
    fuelTypes: ["Petrol", "Diesel", "Electric"],
  },
  "3w": {
    brands: ["Bajaj", "Piaggio", "TVS"],
    transmissions: ["Manual", "Automatic"],
    fuelTypes: ["Petrol", "CNG", "Electric"],
  },
  "4w": {
    brands: ["Maruti", "Hyundai", "Tata", "Mahindra", "Toyota", "Honda"],
    transmissions: ["Manual", "Automatic"],
    fuelTypes: ["Petrol", "Diesel", "CNG", "Hybrid", "Electric"],
  },
  "6w": {
    brands: ["Tata", "Ashok Leyland", "Mahindra", "Volvo"],
    transmissions: ["Manual", "Automatic"],
    fuelTypes: ["Diesel", "CNG"],
  },
  "8w": {
    brands: ["Tata", "Ashok Leyland", "Mahindra", "Volvo"],
    transmissions: ["Manual", "Automatic"],
    fuelTypes: ["Diesel"],
  },
}

export default function VehicleDetailsPage() {
  const searchParams = useSearchParams()
  const category = searchParams.get("category") || ""
  const categoryName = searchParams.get("categoryName") || ""

  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: new Date().getFullYear().toString(),
    variant: "",
    transmission: "",
    fuelType: "",
    price: "",
    location: "",
    description: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.brand) newErrors.brand = "Brand is required"
    if (!formData.model) newErrors.model = "Model is required"
    if (!formData.year) newErrors.year = "Year is required"
    if (!formData.transmission) newErrors.transmission = "Transmission is required"
    if (!formData.fuelType) newErrors.fuelType = "Fuel type is required"
    if (!formData.price) newErrors.price = "Price is required"
    if (!formData.location) newErrors.location = "Location is required"
    if (!formData.description) newErrors.description = "Description is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateForm()) {
      // Store form data in sessionStorage for next step
      sessionStorage.setItem("vehicleFormData", JSON.stringify(formData))
      window.location.href = `/dashboard/sell/photos?category=${category}`
    }
  }

  const categoryData = vehicleData[category as keyof typeof vehicleData] || vehicleData["4w"]
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="p-4 text-white bg-blue-600">
        <div className="flex items-center">
          <Link href={`/dashboard/sell?category=${category}`} className="mr-4">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-2xl font-semibold">Vehicle Details</h1>
        </div>
      </header>

      <main className="p-4">
        <div className="mx-auto max-w-2xl space-y-8">
          <section>
            <h2 className="mb-2 text-2xl font-bold">Step 2: Enter Vehicle Details</h2>
            <p className="text-gray-600 mb-6">Category: {categoryName}</p>

            <Card>
              <CardHeader>
                <CardTitle>Vehicle Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Brand */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Brand *</label>
                  <select
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="">Select Brand</option>
                    {categoryData.brands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                  {errors.brand && <p className="text-red-500 text-sm mt-1">{errors.brand}</p>}
                </div>

                {/* Model */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Model *</label>
                  <Input
                    type="text"
                    name="model"
                    placeholder="e.g., Swift, City, Fortuner"
                    value={formData.model}
                    onChange={handleInputChange}
                    className={errors.model ? "border-red-500" : ""}
                  />
                  {errors.model && <p className="text-red-500 text-sm mt-1">{errors.model}</p>}
                </div>

                {/* Year */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Year *</label>
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  {errors.year && <p className="text-red-500 text-sm mt-1">{errors.year}</p>}
                </div>

                {/* Variant */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Variant (Optional)</label>
                  <Input
                    type="text"
                    name="variant"
                    placeholder="e.g., LXi, VXi, ZXi"
                    value={formData.variant}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Transmission */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Transmission *</label>
                  <select
                    name="transmission"
                    value={formData.transmission}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="">Select Transmission</option>
                    {categoryData.transmissions.map((trans) => (
                      <option key={trans} value={trans}>
                        {trans}
                      </option>
                    ))}
                  </select>
                  {errors.transmission && <p className="text-red-500 text-sm mt-1">{errors.transmission}</p>}
                </div>

                {/* Fuel Type */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Fuel Type *</label>
                  <select
                    name="fuelType"
                    value={formData.fuelType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="">Select Fuel Type</option>
                    {categoryData.fuelTypes.map((fuel) => (
                      <option key={fuel} value={fuel}>
                        {fuel}
                      </option>
                    ))}
                  </select>
                  {errors.fuelType && <p className="text-red-500 text-sm mt-1">{errors.fuelType}</p>}
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Price (in INR) *</label>
                  <Input
                    type="number"
                    name="price"
                    placeholder="e.g., 500000"
                    value={formData.price}
                    onChange={handleInputChange}
                    className={errors.price ? "border-red-500" : ""}
                  />
                  {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Location *</label>
                  <Input
                    type="text"
                    name="location"
                    placeholder="e.g., Mumbai, Maharashtra"
                    value={formData.location}
                    onChange={handleInputChange}
                    className={errors.location ? "border-red-500" : ""}
                  />
                  {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Description / Additional Info *</label>
                  <Textarea
                    name="description"
                    placeholder="Describe the condition, features, maintenance history, etc."
                    value={formData.description}
                    onChange={handleInputChange}
                    className={`min-h-32 ${errors.description ? "border-red-500" : ""}`}
                  />
                  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>
              </CardContent>
            </Card>

            <div className="mt-8 flex gap-4">
              <Link href={`/dashboard/sell?category=${category}`} className="flex-1">
                <Button variant="outline" className="w-full py-6 text-lg bg-transparent">
                  Back
                </Button>
              </Link>
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700 py-6 text-lg" onClick={handleNext}>
                Next: Upload Photos
              </Button>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}



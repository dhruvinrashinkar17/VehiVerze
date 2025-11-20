"use client"
import Link from "next/link"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Button } from "@vehiverze/ui/button"
import { ArrowLeft, ShoppingCart, Heart } from "lucide-react"
import { useState } from "react"

interface VehicleModel {
  id: string
  name: string
  brand: string
  price: number
  originalPrice: number
  discount: number
  image: string
  year: number
  fuelType: string
  transmission: string
  mileage: string
  features: string[]
  rating: number
  reviews: number
  location: string
  verified: boolean
}

interface VehicleModelsDisplayProps {
  brand: string
  carType: string
  models: VehicleModel[]
  backLink: string
}

export function VehicleModelsDisplay({ brand, carType, models, backLink }: VehicleModelsDisplayProps) {
  const [favorites, setFavorites] = useState<string[]>([])

  const toggleFavorite = (modelId: string) => {
    setFavorites((prev) => (prev.includes(modelId) ? prev.filter((id) => id !== modelId) : [...prev, modelId]))
  }

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)} Cr`
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)} Lakh`
    }
    return `₹${price.toLocaleString()}`
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}>
        ★
      </span>
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href={backLink}>
            <Button variant="ghost" size="icon" className="mr-3">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              {brand} {carType}
            </h1>
            <p className="text-gray-600 mt-2">
              Explore {models.length} available {brand} {carType} models
            </p>
          </div>
        </div>

        {/* Models Grid */}
        {models.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {models.map((model) => (
              <div
                key={model.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Image Section */}
                <div className="relative h-48 bg-gray-200 overflow-hidden">
                  <img
                    src={model.image || "/placeholder.svg"}
                    alt={model.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                  {model.discount > 0 && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {model.discount}% off
                    </div>
                  )}
                  {model.verified && (
                    <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      ✓ Verified
                    </div>
                  )}
                  <button
                    onClick={() => toggleFavorite(model.id)}
                    className="absolute bottom-3 right-3 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        favorites.includes(model.id) ? "fill-red-500 text-red-500" : "text-gray-400"
                      }`}
                    />
                  </button>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  {/* Title and Rating */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{model.name}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex gap-0.5">{renderStars(model.rating)}</div>
                    <span className="text-sm text-gray-600">
                      {model.rating} ({model.reviews} reviews)
                    </span>
                  </div>

                  {/* Location */}
                  <p className="text-sm text-gray-600 mb-3">📍 {model.location}</p>

                  {/* Specs */}
                  <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="text-gray-600">Year</p>
                      <p className="font-semibold text-gray-900">{model.year}</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="text-gray-600">Fuel</p>
                      <p className="font-semibold text-gray-900">{model.fuelType}</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="text-gray-600">Transmission</p>
                      <p className="font-semibold text-gray-900">{model.transmission}</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="text-gray-600">Mileage</p>
                      <p className="font-semibold text-gray-900">{model.mileage}</p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {model.features.slice(0, 3).map((feature, idx) => (
                        <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                      {model.features.length > 3 && (
                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                          +{model.features.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <p className="text-gray-600 text-sm">Price</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-2xl font-bold text-green-600">{formatPrice(model.price)}</p>
                      <p className="text-sm text-gray-500 line-through">{formatPrice(model.originalPrice)}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Link
                      href={`/sell/checkout?vehicleId=${model.id}&vehicleName=${encodeURIComponent(model.name)}&vehiclePrice=${model.price}&vehicleType=${carType}`}
                      className="flex-1"
                    >
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2">
                        <ShoppingCart className="h-4 w-4" />
                        Buy Now
                      </Button>
                    </Link>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      Call
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No models found</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}



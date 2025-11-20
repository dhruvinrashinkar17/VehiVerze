"use client"

import { useState } from "react"
import Link from "next/link"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Button } from "@vehiverze/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@vehiverze/ui/tabs"
import { ArrowLeft, Star, Heart, Share2, Phone, MessageCircle } from "lucide-react"

interface NewVehicleModelDetailsProps {
  vehicleType: string
  category: string
  modelId: string
}

export function NewVehicleModelDetails({ vehicleType, category, modelId }: NewVehicleModelDetailsProps) {
  const [selectedColor, setSelectedColor] = useState("white")
  const [selectedVariant, setSelectedVariant] = useState(0)

  // Mock data - in real app, this would come from API
  const modelData = {
    id: modelId,
    name: "Honda City",
    brand: "Honda",
    rating: 4.5,
    reviews: 1250,
    price: "₹11.5 - 15.2 Lakh",
    variants: [
      { name: "SV MT", price: "₹11.50 Lakh", transmission: "Manual" },
      { name: "V MT", price: "₹12.75 Lakh", transmission: "Manual" },
      { name: "VX MT", price: "₹13.95 Lakh", transmission: "Manual" },
      { name: "ZX CVT", price: "₹15.20 Lakh", transmission: "CVT" },
    ],
    colors: [
      { name: "Platinum White Pearl", code: "white", hex: "#ffffff" },
      { name: "Meteoroid Gray Metallic", code: "gray", hex: "#6b7280" },
      { name: "Radiant Red Metallic", code: "red", hex: "#dc2626" },
      { name: "Golden Brown Metallic", code: "brown", hex: "#92400e" },
    ],
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    specifications: {
      engine: "1498 cc",
      power: "121 PS @ 6600 rpm",
      torque: "145 Nm @ 4300 rpm",
      fuelType: "Petrol",
      transmission: "Manual/CVT",
      mileage: "17.8 kmpl",
      seatingCapacity: "5",
      fuelTankCapacity: "40 Litres",
      bootSpace: "506 Litres",
    },
    features: [
      "Honda SENSING",
      "8-inch Touchscreen",
      "Wireless Phone Charger",
      "Automatic Climate Control",
      "LED Headlights",
      "Cruise Control",
      "6 Airbags",
      "Vehicle Stability Assist",
    ],
  }

  const formatCategoryName = (cat: string) => {
    return cat.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center mb-6 text-sm text-gray-600">
          <Link href={`/new-vehicles/${vehicleType}/${category}/models`} className="hover:text-blue-600">
            <ArrowLeft className="h-4 w-4 inline mr-1" />
            Back to {formatCategoryName(category)} Models
          </Link>
        </div>

        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{modelData.name}</h1>
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-4">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-1 font-semibold">{modelData.rating}</span>
                  <span className="ml-1 text-gray-600">({modelData.reviews} reviews)</span>
                </div>
                <span className="text-2xl font-bold text-blue-600">{modelData.price}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="mb-4">
                <img
                  src={modelData.images[0] || "/placeholder.svg"}
                  alt={modelData.name}
                  className="w-full h-80 object-cover rounded-lg"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {modelData.images.map((image, index) => (
                  <img
                    key={index}
                    src={image || "/placeholder.svg"}
                    alt={`${modelData.name} ${index + 1}`}
                    className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-75"
                  />
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">Choose Color</h3>
              <div className="flex gap-4">
                {modelData.colors.map((color) => (
                  <div
                    key={color.code}
                    className={`cursor-pointer p-2 rounded-lg border-2 ${
                      selectedColor === color.code ? "border-blue-500" : "border-gray-200"
                    }`}
                    onClick={() => setSelectedColor(color.code)}
                  >
                    <div className="w-8 h-8 rounded-full border" style={{ backgroundColor: color.hex }}></div>
                    <p className="text-xs mt-1 text-center">{color.name.split(" ")[0]}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <Tabs defaultValue="specifications" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="specifications">Specifications</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                <TabsContent value="specifications" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(modelData.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b">
                        <span className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                        <span>{value}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="features" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {modelData.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="reviews" className="mt-6">
                  <div className="space-y-4">
                    {[1, 2, 3].map((review) => (
                      <div key={review} className="border-b pb-4">
                        <div className="flex items-center mb-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          <span className="ml-2 font-medium">John Doe</span>
                        </div>
                        <p className="text-gray-600">
                          Great car with excellent features and smooth performance. Highly recommended!
                        </p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Variant Selection */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Select Variant</h3>
              <div className="space-y-3">
                {modelData.variants.map((variant, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border cursor-pointer ${
                      selectedVariant === index ? "border-blue-500 bg-blue-50" : "border-gray-200"
                    }`}
                    onClick={() => setSelectedVariant(index)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{variant.name}</p>
                        <p className="text-sm text-gray-600">{variant.transmission}</p>
                      </div>
                      <p className="font-bold text-blue-600">{variant.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="space-y-3">
                <Link href={`/new-vehicles/${vehicleType}/${category}/models/${modelId}/checkout`}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3">Buy Now</Button>
                </Link>
                <Button variant="outline" className="w-full text-lg py-3 bg-transparent">
                  Book Test Drive
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="flex items-center justify-center bg-transparent">
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </Button>
                  <Button variant="outline" className="flex items-center justify-center bg-transparent">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Chat
                  </Button>
                </div>
              </div>
            </div>

            {/* EMI Calculator */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">EMI Calculator</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Loan Amount</label>
                  <input type="text" className="w-full p-2 border rounded-md" placeholder="₹10,00,000" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tenure (Years)</label>
                  <select className="w-full p-2 border rounded-md">
                    <option value="3">3 Years</option>
                    <option value="5">5 Years</option>
                    <option value="7">7 Years</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate</label>
                  <input type="text" className="w-full p-2 border rounded-md" placeholder="8.5%" />
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Monthly EMI</p>
                  <p className="text-xl font-bold text-blue-600">₹18,500</p>
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  Get Detailed Quote
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}



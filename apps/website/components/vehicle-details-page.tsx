"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@vehiverze/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@vehiverze/ui/tabs"
import { Star, Check, MapPin, Calendar, Gauge, Heart, Share2 } from "lucide-react"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { CompactEmiCalculator } from "@/components/compact-emi-calculator"

// Mock vehicle data - in a real app, this would come from an API
const vehicleData = {
  "1": {
    id: "1",
    name: "Honda Activa 6G",
    type: "2-wheeler",
    price: 75000,
    year: 2023,
    km: 0,
    location: "Mumbai",
    rating: 4.5,
    description:
      "The Honda Activa 6G is a popular scooter known for its reliability and fuel efficiency. This model comes with the latest features including a silent start system and enhanced mileage.",
    features: [
      "110cc Engine",
      "Fuel Injection",
      "LED Headlamp",
      "Digital-Analog Meter",
      "External Fuel Lid",
      "ACG Silent Start",
    ],
    specifications: {
      engine: "110cc, 4-stroke",
      power: "7.79 PS @ 8000 rpm",
      torque: "8.79 Nm @ 5250 rpm",
      mileage: "60 kmpl",
      transmission: "Automatic",
      fuelCapacity: "5.3 liters",
    },
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    seller: {
      name: "Honda Showroom",
      rating: 4.8,
      verified: true,
      listings: 45,
      response: "Usually responds within 1 hour",
    },
  },
  "2": {
    id: "2",
    name: "Bajaj RE Auto Rickshaw",
    type: "3-wheeler",
    price: 250000,
    year: 2022,
    km: 10000,
    location: "Delhi",
    rating: 4.2,
    description:
      "The Bajaj RE Auto Rickshaw is a reliable three-wheeler designed for commercial use. It offers excellent mileage and low maintenance costs, making it ideal for city transportation.",
    features: [
      "CNG/LPG Option",
      "Digital Meter",
      "Comfortable Seating",
      "Durable Build",
      "Low Maintenance",
      "High Resale Value",
    ],
    specifications: {
      engine: "236cc, 4-stroke",
      power: "8.09 PS @ 5000 rpm",
      torque: "16.8 Nm @ 3000 rpm",
      mileage: "35 kmpl (Petrol) / 45 km/kg (CNG)",
      transmission: "4-speed Manual",
      fuelCapacity: "8 liters (Petrol) / 2 kg (CNG)",
    },
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    seller: {
      name: "Bajaj Authorized Dealer",
      rating: 4.5,
      verified: true,
      listings: 32,
      response: "Usually responds within 2 hours",
    },
  },
  "3": {
    id: "3",
    name: "Maruti Suzuki Swift",
    type: "4-wheeler",
    price: 700000,
    year: 2022,
    km: 15000,
    location: "Bangalore",
    rating: 4.7,
    description:
      "The Maruti Suzuki Swift is a popular hatchback known for its sporty design and excellent fuel efficiency. This model comes with a range of features for comfort and safety.",
    features: [
      "Touchscreen Infotainment",
      "Apple CarPlay & Android Auto",
      "Automatic Climate Control",
      "Keyless Entry",
      "Push Button Start",
      "Airbags",
    ],
    specifications: {
      engine: "1.2L K-Series Petrol",
      power: "82 PS @ 6000 rpm",
      torque: "113 Nm @ 4200 rpm",
      mileage: "23.2 kmpl",
      transmission: "5-speed Manual / AMT",
      fuelCapacity: "37 liters",
    },
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    seller: {
      name: "Maruti Suzuki True Value",
      rating: 4.6,
      verified: true,
      listings: 78,
      response: "Usually responds within 30 minutes",
    },
  },
  "4": {
    id: "4",
    name: "Tata 407",
    type: "6-wheeler",
    price: 1500000,
    year: 2022,
    km: 25000,
    location: "Chennai",
    rating: 4.3,
    description:
      "The Tata 407 is a reliable light commercial vehicle designed for various business needs. It offers excellent load capacity and fuel efficiency for commercial transportation.",
    features: [
      "Power Steering",
      "Adjustable Seats",
      "Radial Tires",
      "Parabolic Leaf Springs",
      "Tilt-able Steering",
      "Digital Cluster",
    ],
    specifications: {
      engine: "3.0L Turbocharged Diesel",
      power: "75 HP @ 2800 rpm",
      torque: "225 Nm @ 1500-2000 rpm",
      mileage: "10 kmpl",
      transmission: "5-speed Manual",
      loadCapacity: "2.25 tonnes",
    },
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    seller: {
      name: "Tata Commercial Vehicles",
      rating: 4.4,
      verified: true,
      listings: 56,
      response: "Usually responds within 3 hours",
    },
  },
  "5": {
    id: "5",
    name: "Tata Prima",
    type: "8-wheeler",
    price: 3500000,
    year: 2022,
    km: 40000,
    location: "Mumbai",
    rating: 4.4,
    description:
      "The Tata Prima is a heavy-duty truck designed for long-haul transportation. It offers superior comfort, safety, and efficiency for commercial logistics operations.",
    features: [
      "Air Conditioned Cabin",
      "Adjustable Air Suspension Seats",
      "Advanced Telematics",
      "Hill Start Aid",
      "Cruise Control",
      "Anti-lock Braking System",
    ],
    specifications: {
      engine: "5.9L Cummins Diesel",
      power: "280 HP @ 2500 rpm",
      torque: "970 Nm @ 1300-1700 rpm",
      mileage: "4.5 kmpl",
      transmission: "9-speed Manual",
      loadCapacity: "40 tonnes",
    },
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    seller: {
      name: "Tata Motors Commercial",
      rating: 4.7,
      verified: true,
      listings: 42,
      response: "Usually responds within 4 hours",
    },
  },
}

interface VehicleDetailsPageProps {
  vehicleId: string
}

export function VehicleDetailsPage({ vehicleId }: VehicleDetailsPageProps) {
  const router = useRouter()
  const [activeImage, setActiveImage] = useState(0)
  const [vehicle, setVehicle] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isClicked, setIsClicked] = useState(false)

  useEffect(() => {
    // In a real app, this would be an API call
    setLoading(true)
    setTimeout(() => {
      setVehicle(vehicleData[vehicleId as keyof typeof vehicleData] || vehicleData["1"])
      setLoading(false)
    }, 500)
  }, [vehicleId])

  const handleBuyNow = () => {
    setIsClicked(true)
    router.push(`/buy/checkout?vehicleId=${vehicleId}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <div className="container mx-auto px-4 py-16">
          <div className="flex justify-center items-center h-[60vh]">
            <div className="animate-pulse space-y-8 w-full max-w-4xl">
              <div className="h-64 bg-gray-200 rounded-lg w-full"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                <div className="h-6 bg-gray-200 rounded w-full"></div>
                <div className="h-6 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <div className="container mx-auto px-4 py-16">
          <div className="flex justify-center items-center h-[60vh]">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Vehicle Not Found</h2>
              <p className="mb-6">The vehicle you are looking for does not exist or has been removed.</p>
              <Button onClick={() => router.push("/buy")}>Browse Other Vehicles</Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          <span className="hover:underline cursor-pointer" onClick={() => router.push("/")}>
            Home
          </span>{" "}
          /{" "}
          <span className="hover:underline cursor-pointer" onClick={() => router.push("/buy")}>
            Buy
          </span>{" "}
          /{" "}
          <span className="hover:underline cursor-pointer" onClick={() => router.push(`/buy/${vehicle.type}`)}>
            {vehicle.type}
          </span>{" "}
          / <span className="text-gray-700">{vehicle.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative h-[300px] md:h-[400px]">
                <Image
                  src={vehicle.images[activeImage] || "/placeholder.svg"}
                  alt={vehicle.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 flex space-x-2 overflow-x-auto">
                {vehicle.images.map((image: string, index: number) => (
                  <div
                    key={index}
                    className={`relative h-16 w-24 flex-shrink-0 cursor-pointer border-2 rounded-md overflow-hidden ${
                      activeImage === index ? "border-blue-500" : "border-gray-200"
                    }`}
                    onClick={() => setActiveImage(index)}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${vehicle.name} view ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Vehicle Details Tabs */}
            <div className="mt-8 bg-white rounded-xl shadow-md p-6">
              <Tabs defaultValue="overview">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="specifications">Specifications</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                  <h3 className="text-xl font-semibold">Description</h3>
                  <p className="text-gray-700">{vehicle.description}</p>

                  <h3 className="text-xl font-semibold mt-6">Key Highlights</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-blue-500" />
                      <span>Year: {vehicle.year}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Gauge className="h-5 w-5 text-blue-500" />
                      <span>Odometer: {vehicle.km.toLocaleString()} km</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-blue-500" />
                      <span>Location: {vehicle.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-500" fill="currentColor" />
                      <span>Rating: {vehicle.rating}/5</span>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="specifications" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(vehicle.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                        <span className="font-medium">{value as string}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="features" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {vehicle.features.map((feature: string, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-green-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Right Column - Price and Actions */}
          <div>
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">₹{vehicle.price.toLocaleString()}</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                <Button
                  className="w-full text-lg py-6 border-2 border-gray-900 bg-white text-gray-900 hover:bg-gray-50 font-semibold rounded-lg"
                  onClick={handleBuyNow}
                >
                  [Buy Now]
                </Button>

                <CompactEmiCalculator vehiclePrice={vehicle.price} vehicleName={vehicle.name} />

                <div className="pt-4 border-t">
                  <h3 className="font-semibold mb-3">Seller Information</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium">{vehicle.seller.name}</span>
                    {vehicle.seller.verified && (
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full flex items-center">
                        <Check className="h-3 w-3 mr-1" /> Verified
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-sm mb-1">
                    <Star className="h-4 w-4 text-yellow-500" fill="currentColor" />
                    <span>{vehicle.seller.rating}/5 Rating</span>
                  </div>
                  <div className="text-sm text-gray-600 mb-1">{vehicle.seller.listings} listings</div>
                  <div className="text-sm text-gray-600">{vehicle.seller.response}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Vehicles */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Similar Vehicles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src="/placeholder.svg?height=200&width=300"
                    alt="Similar vehicle"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg">Similar {vehicle.name}</h3>
                  <p className="text-blue-600 font-bold mt-1">
                    ₹{(vehicle.price * 0.9).toLocaleString()} - ₹{(vehicle.price * 1.1).toLocaleString()}
                  </p>
                  <div className="flex justify-between mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/buy/vehicle-details/${Math.floor(Math.random() * 5) + 1}`)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}



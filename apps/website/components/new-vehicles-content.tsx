"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@vehiverze/ui/button"
import { Input } from "@vehiverze/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@vehiverze/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@vehiverze/ui/tabs"
import { Search, Filter, ChevronDown, Star, ShoppingCart } from "lucide-react"
import Image from "next/image"

const newVehicles = [
  // 2-Wheeler Vehicles
  {
    id: 1,
    name: "Royal Enfield Classic 350",
    category: "2-wheelers",
    type: "Cruiser",
    price: 193000,
    fuelType: "Petrol",
    mileage: "41.55 kmpl",
    engine: "349 cc",
    transmission: "Manual",
    rating: 4.4,
    image: "/royal-enfield-classic.jpg",
  },
  {
    id: 2,
    name: "Bajaj Pulsar NS200",
    category: "2-wheelers",
    type: "Sports",
    price: 139000,
    fuelType: "Petrol",
    mileage: "40.36 kmpl",
    engine: "199.5 cc",
    transmission: "Manual",
    rating: 4.1,
    image: "/bajaj-pulsar.jpg",
  },
  {
    id: 3,
    name: "Hero Splendor Plus",
    category: "2-wheelers",
    type: "Commuter",
    price: 65000,
    fuelType: "Petrol",
    mileage: "65 kmpl",
    engine: "97.2 cc",
    transmission: "Manual",
    rating: 4.2,
    image: "/hero-splendor.jpg",
  },
  {
    id: 4,
    name: "Honda CB Shine",
    category: "2-wheelers",
    type: "Commuter",
    price: 85000,
    fuelType: "Petrol",
    mileage: "60 kmpl",
    engine: "124.7 cc",
    transmission: "Manual",
    rating: 4.3,
    image: "/honda-cb-shine.jpg",
  },
  {
    id: 5,
    name: "TVS Apache RTR 160",
    category: "2-wheelers",
    type: "Sports",
    price: 95000,
    fuelType: "Petrol",
    mileage: "50 kmpl",
    engine: "159.7 cc",
    transmission: "Manual",
    rating: 4.0,
    image: "/tvs-apache.jpg",
  },
  {
    id: 6,
    name: "Yamaha FZ-S FI",
    category: "2-wheelers",
    type: "Sports",
    price: 115000,
    fuelType: "Petrol",
    mileage: "45 kmpl",
    engine: "149 cc",
    transmission: "Manual",
    rating: 4.2,
    image: "/yamaha-fz.jpg",
  },

  // 3-Wheeler Vehicles
  {
    id: 7,
    name: "Bajaj RE Compact Auto",
    category: "3-wheelers",
    type: "Auto Rickshaw",
    price: 280000,
    fuelType: "Petrol",
    mileage: "35 kmpl",
    engine: "199.6 cc",
    transmission: "Manual",
    rating: 4.1,
    image: "/bajaj-re-auto.jpg",
  },
  {
    id: 8,
    name: "Piaggio Ape City Plus",
    category: "3-wheelers",
    type: "Goods Carrier",
    price: 320000,
    fuelType: "Petrol",
    mileage: "32 kmpl",
    engine: "196.6 cc",
    transmission: "Manual",
    rating: 4.0,
    image: "/piaggio-ape.png",
  },
  {
    id: 9,
    name: "Mahindra Alfa Auto",
    category: "3-wheelers",
    type: "Auto Rickshaw",
    price: 300000,
    fuelType: "Petrol",
    mileage: "33 kmpl",
    engine: "200 cc",
    transmission: "Manual",
    rating: 4.2,
    image: "/mahindra-alfa.jpg",
  },
  {
    id: 10,
    name: "TVS King Auto",
    category: "3-wheelers",
    type: "Auto Rickshaw",
    price: 290000,
    fuelType: "Petrol",
    mileage: "34 kmpl",
    engine: "199.6 cc",
    transmission: "Manual",
    rating: 4.0,
    image: "/tvs-king-auto.jpg",
  },

  // 4-Wheeler Vehicles
  {
    id: 11,
    name: "Maruti Suzuki Fronx",
    category: "4-wheelers",
    type: "SUV",
    price: 799000,
    fuelType: "Petrol",
    mileage: "22.89 kmpl",
    engine: "1197 cc",
    transmission: "Manual/Automatic",
    rating: 4.5,
    image: "/maruti-fronx.jpg",
  },
  {
    id: 12,
    name: "Tata Nexon",
    category: "4-wheelers",
    type: "SUV",
    price: 799999,
    fuelType: "Petrol/Diesel",
    mileage: "24.07 kmpl",
    engine: "1199 cc",
    transmission: "Manual/Automatic",
    rating: 4.3,
    image: "/tata-nexon.jpg",
  },
  {
    id: 13,
    name: "Hyundai i20",
    category: "4-wheelers",
    type: "Hatchback",
    price: 729000,
    fuelType: "Petrol",
    mileage: "20.35 kmpl",
    engine: "1197 cc",
    transmission: "Manual/Automatic",
    rating: 4.2,
    image: "/hyundai-i20.jpg",
  },
  {
    id: 14,
    name: "Honda City",
    category: "4-wheelers",
    type: "Sedan",
    price: 1199000,
    fuelType: "Petrol/Hybrid",
    mileage: "26.5 kmpl",
    engine: "1498 cc",
    transmission: "Manual/Automatic",
    rating: 4.6,
    image: "/honda-city.jpg",
  },
  {
    id: 15,
    name: "Mahindra XUV700",
    category: "4-wheelers",
    type: "SUV",
    price: 1399000,
    fuelType: "Petrol/Diesel",
    mileage: "18.5 kmpl",
    engine: "2000 cc",
    transmission: "Automatic",
    rating: 4.4,
    image: "/mahindra-xuv700.png",
  },
  {
    id: 16,
    name: "Kia Seltos",
    category: "4-wheelers",
    type: "SUV",
    price: 999000,
    fuelType: "Petrol/Diesel",
    mileage: "20 kmpl",
    engine: "1597 cc",
    transmission: "Manual/Automatic",
    rating: 4.3,
    image: "/kia-seltos-urban.png",
  },
  {
    id: 25,
    name: "Tata Intra V10",
    category: "4-wheelers",
    type: "Pickup Truck",
    price: 599000,
    fuelType: "Diesel",
    mileage: "18 kmpl",
    engine: "1047 cc",
    transmission: "Manual",
    rating: 4.1,
    image: "/placeholder.svg?height=200&width=300&text=Tata+Intra",
  },
  {
    id: 26,
    name: "Mahindra Bolero Pik-Up",
    category: "4-wheelers",
    type: "Pickup Truck",
    price: 549000,
    fuelType: "Diesel",
    mileage: "16 kmpl",
    engine: "1596 cc",
    transmission: "Manual",
    rating: 4.0,
    image: "/placeholder.svg?height=200&width=300&text=Mahindra+Bolero",
  },
  {
    id: 27,
    name: "Force Traveller Trailer",
    category: "4-wheelers",
    type: "Trailer",
    price: 450000,
    fuelType: "Diesel",
    mileage: "20 kmpl",
    engine: "1596 cc",
    transmission: "Manual",
    rating: 3.9,
    image: "/placeholder.svg?height=200&width=300&text=Force+Traveller",
  },
  {
    id: 28,
    name: "Ashok Leyland Mini Truck",
    category: "4-wheelers",
    type: "Mini Truck",
    price: 520000,
    fuelType: "Diesel",
    mileage: "17 kmpl",
    engine: "1596 cc",
    transmission: "Manual",
    rating: 4.0,
    image: "/placeholder.svg?height=200&width=300&text=Ashok+Leyland",
  },

  // 6-Wheeler Vehicles
  {
    id: 17,
    name: "Tata LPT 1613",
    category: "6-wheelers",
    type: "Medium Truck",
    price: 899000,
    fuelType: "Diesel",
    mileage: "18.5 kmpl",
    engine: "1613 cc",
    transmission: "Manual",
    rating: 4.1,
    image: "/tata-lpt.jpg",
  },
  {
    id: 18,
    name: "Eicher Pro 3015",
    category: "6-wheelers",
    type: "Medium Truck",
    price: 950000,
    fuelType: "Diesel",
    mileage: "17.5 kmpl",
    engine: "3000 cc",
    transmission: "Manual",
    rating: 4.2,
    image: "/eicher-pro.jpg",
  },
  {
    id: 19,
    name: "BharatBenz 1617",
    category: "6-wheelers",
    type: "Medium Truck",
    price: 920000,
    fuelType: "Diesel",
    mileage: "18 kmpl",
    engine: "1617 cc",
    transmission: "Manual",
    rating: 4.0,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 20,
    name: "Ashok Leyland Boss 1616",
    category: "6-wheelers",
    type: "Medium Truck",
    price: 880000,
    fuelType: "Diesel",
    mileage: "19 kmpl",
    engine: "1616 cc",
    transmission: "Manual",
    rating: 4.1,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 29,
    name: "Tata 407 Tipper",
    category: "6-wheelers",
    type: "Tipper",
    price: 750000,
    fuelType: "Diesel",
    mileage: "16 kmpl",
    engine: "1596 cc",
    transmission: "Manual",
    rating: 4.0,
    image: "/placeholder.svg?height=200&width=300&text=Tata+407",
  },
  {
    id: 30,
    name: "Ashok Leyland Transit Mixer",
    category: "6-wheelers",
    type: "Transit Mixer",
    price: 1100000,
    fuelType: "Diesel",
    mileage: "14 kmpl",
    engine: "1900 cc",
    transmission: "Manual",
    rating: 4.1,
    image: "/placeholder.svg?height=200&width=300&text=Transit+Mixer",
  },

  // 8+ Wheeler Vehicles
  {
    id: 21,
    name: "Tata Signa 4225",
    category: "8-wheelers",
    type: "Heavy Truck",
    price: 1500000,
    fuelType: "Diesel",
    mileage: "12 kmpl",
    engine: "4250 cc",
    transmission: "Manual",
    rating: 4.3,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 22,
    name: "Volvo FM",
    category: "8-wheelers",
    type: "Heavy Truck",
    price: 1800000,
    fuelType: "Diesel",
    mileage: "11 kmpl",
    engine: "4500 cc",
    transmission: "Automatic",
    rating: 4.4,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 23,
    name: "Scania P410",
    category: "8-wheelers",
    type: "Heavy Truck",
    price: 1900000,
    fuelType: "Diesel",
    mileage: "10.5 kmpl",
    engine: "4100 cc",
    transmission: "Automatic",
    rating: 4.5,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 24,
    name: "Ashok Leyland 3118 IL",
    category: "8-wheelers",
    type: "Heavy Truck",
    price: 1400000,
    fuelType: "Diesel",
    mileage: "13 kmpl",
    engine: "3118 cc",
    transmission: "Manual",
    rating: 4.2,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 31,
    name: "Tata 10 Wheeler",
    category: "8-wheelers",
    type: "10 Wheeler",
    price: 1650000,
    fuelType: "Diesel",
    mileage: "11.5 kmpl",
    engine: "4250 cc",
    transmission: "Manual",
    rating: 4.2,
    image: "/placeholder.svg?height=200&width=300&text=10+Wheeler",
  },
  {
    id: 32,
    name: "Ashok Leyland 12 Wheeler",
    category: "8-wheelers",
    type: "12 Wheeler",
    price: 1800000,
    fuelType: "Diesel",
    mileage: "10.5 kmpl",
    engine: "4500 cc",
    transmission: "Manual",
    rating: 4.3,
    image: "/placeholder.svg?height=200&width=300&text=12+Wheeler",
  },
  {
    id: 33,
    name: "Volvo 14 Wheeler",
    category: "8-wheelers",
    type: "14 Wheeler",
    price: 2100000,
    fuelType: "Diesel",
    mileage: "9.5 kmpl",
    engine: "5000 cc",
    transmission: "Automatic",
    rating: 4.4,
    image: "/placeholder.svg?height=200&width=300&text=14+Wheeler",
  },
  {
    id: 34,
    name: "Scania 16 Wheeler",
    category: "8-wheelers",
    type: "16 Wheeler",
    price: 2300000,
    fuelType: "Diesel",
    mileage: "9 kmpl",
    engine: "5200 cc",
    transmission: "Automatic",
    rating: 4.5,
    image: "/placeholder.svg?height=200&width=300&text=16+Wheeler",
  },
  {
    id: 35,
    name: "Tata 18 Wheeler",
    category: "8-wheelers",
    type: "18 Wheeler",
    price: 2500000,
    fuelType: "Diesel",
    mileage: "8.5 kmpl",
    engine: "5500 cc",
    transmission: "Manual",
    rating: 4.3,
    image: "/placeholder.svg?height=200&width=300&text=18+Wheeler",
  },
  {
    id: 36,
    name: "Ashok Leyland 22 Wheeler",
    category: "8-wheelers",
    type: "22 Wheeler",
    price: 2800000,
    fuelType: "Diesel",
    mileage: "8 kmpl",
    engine: "6000 cc",
    transmission: "Manual",
    rating: 4.2,
    image: "/placeholder.svg?height=200&width=300&text=22+Wheeler",
  },
]

export function NewVehiclesContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000000])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedFuelTypes, setSelectedFuelTypes] = useState<string[]>([])

  const filteredVehicles = newVehicles.filter((vehicle) => {
    if (searchTerm && !vehicle.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false
    }

    if (selectedCategory !== "all" && vehicle.category !== selectedCategory) {
      return false
    }

    if (vehicle.price < priceRange[0] || vehicle.price > priceRange[1]) {
      return false
    }

    if (selectedTypes.length > 0 && !selectedTypes.includes(vehicle.type)) {
      return false
    }

    if (selectedFuelTypes.length > 0) {
      const vehicleFuelTypes = vehicle.fuelType.split("/")
      const hasMatchingFuelType = vehicleFuelTypes.some((fuel) => selectedFuelTypes.includes(fuel))
      if (!hasMatchingFuelType) {
        return false
      }
    }

    return true
  })

  function formatCurrency(value: number) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value)
  }

  const toggleType = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type))
    } else {
      setSelectedTypes([...selectedTypes, type])
    }
  }

  const toggleFuelType = (fuelType: string) => {
    if (selectedFuelTypes.includes(fuelType)) {
      setSelectedFuelTypes(selectedFuelTypes.filter((f) => f !== fuelType))
    } else {
      setSelectedFuelTypes([...selectedFuelTypes, fuelType])
    }
  }

  const getVehicleTypeForCheckout = (category: string) => {
    switch (category) {
      case "2-wheelers":
        return "2-wheeler"
      case "3-wheelers":
        return "3-wheeler"
      case "4-wheelers":
        return "4-wheeler"
      case "6-wheelers":
        return "6-wheeler"
      case "8-wheelers":
        return "8-wheeler"
      default:
        return "4-wheeler"
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Explore New Vehicles</h1>
          <p className="text-lg text-gray-600">
            Discover the latest vehicles with detailed specifications and features
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="w-full md:w-2/3 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search vehicles by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="w-full md:w-1/3">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex justify-between items-center"
            >
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
            </Button>
          </div>
        </div>

        {showFilters && (
          <Card className="mb-8 border border-gray-200">
            <CardHeader>
              <CardTitle>Filter Vehicles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Min: {formatCurrency(priceRange[0])}</span>
                      <span>Max: {formatCurrency(priceRange[1])}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="3000000"
                      step="50000"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number.parseInt(e.target.value), priceRange[1]])}
                      className="w-full"
                    />
                    <input
                      type="range"
                      min="0"
                      max="3000000"
                      step="50000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Vehicle Type</h3>
                  <div className="space-y-2">
                    {[
                      "Cruiser",
                      "Sports",
                      "Commuter",
                      "Auto Rickshaw",
                      "Goods Carrier",
                      "SUV",
                      "Sedan",
                      "Hatchback",
                      "Pickup Truck",
                      "Trailer",
                      "Mini Truck",
                      "Medium Truck",
                      "Tipper",
                      "Transit Mixer",
                      "Heavy Truck",
                      "10 Wheeler",
                      "12 Wheeler",
                      "14 Wheeler",
                      "16 Wheeler",
                      "18 Wheeler",
                      "22 Wheeler",
                    ].map((type) => (
                      <div key={type} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`type-${type}`}
                          checked={selectedTypes.includes(type)}
                          onChange={() => toggleType(type)}
                          className="mr-2"
                        />
                        <label htmlFor={`type-${type}`}>{type}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Fuel Type</h3>
                  <div className="space-y-2">
                    {["Petrol", "Diesel", "Hybrid", "Electric"].map((fuelType) => (
                      <div key={fuelType} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`fuel-${fuelType}`}
                          checked={selectedFuelTypes.includes(fuelType)}
                          onChange={() => toggleFuelType(fuelType)}
                          className="mr-2"
                        />
                        <label htmlFor={`fuel-${fuelType}`}>{fuelType}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t border-gray-100 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedTypes([])
                  setSelectedFuelTypes([])
                  setPriceRange([0, 3000000])
                }}
              >
                Reset Filters
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">Apply Filters</Button>
            </CardFooter>
          </Card>
        )}

        <Tabs defaultValue="all" onValueChange={setSelectedCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="2-wheelers">2-Wheelers</TabsTrigger>
            <TabsTrigger value="3-wheelers">3-Wheelers</TabsTrigger>
            <TabsTrigger value="4-wheelers">4-Wheelers</TabsTrigger>
            <TabsTrigger value="6-wheelers">6-Wheelers</TabsTrigger>
            <TabsTrigger value="8-wheelers">8+ Wheelers</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <VehicleGrid vehicles={filteredVehicles} getVehicleTypeForCheckout={getVehicleTypeForCheckout} />
          </TabsContent>

          <TabsContent value="2-wheelers" className="mt-0">
            <VehicleGrid
              vehicles={filteredVehicles.filter((v) => v.category === "2-wheelers")}
              getVehicleTypeForCheckout={getVehicleTypeForCheckout}
            />
          </TabsContent>

          <TabsContent value="3-wheelers" className="mt-0">
            <VehicleGrid
              vehicles={filteredVehicles.filter((v) => v.category === "3-wheelers")}
              getVehicleTypeForCheckout={getVehicleTypeForCheckout}
            />
          </TabsContent>

          <TabsContent value="4-wheelers" className="mt-0">
            <VehicleGrid
              vehicles={filteredVehicles.filter((v) => v.category === "4-wheelers")}
              getVehicleTypeForCheckout={getVehicleTypeForCheckout}
            />
          </TabsContent>

          <TabsContent value="6-wheelers" className="mt-0">
            <VehicleGrid
              vehicles={filteredVehicles.filter((v) => v.category === "6-wheelers")}
              getVehicleTypeForCheckout={getVehicleTypeForCheckout}
            />
          </TabsContent>

          <TabsContent value="8-wheelers" className="mt-0">
            <VehicleGrid
              vehicles={filteredVehicles.filter((v) => v.category === "8-wheelers")}
              getVehicleTypeForCheckout={getVehicleTypeForCheckout}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )

  function VehicleGrid({
    vehicles,
    getVehicleTypeForCheckout,
  }: {
    vehicles: typeof newVehicles
    getVehicleTypeForCheckout: (category: string) => string
  }) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <Card key={vehicle.id} className="border border-gray-200 hover:shadow-md transition-shadow flex flex-col">
            <div className="aspect-video relative overflow-hidden">
              <Image src={vehicle.image || "/placeholder.svg"} alt={vehicle.name} fill className="object-cover" />
            </div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{vehicle.name}</CardTitle>
                <div className="flex items-center bg-yellow-100 px-2 py-1 rounded text-sm">
                  <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                  <span>{vehicle.rating}</span>
                </div>
              </div>
              <p className="text-sm text-gray-500">{vehicle.type}</p>
            </CardHeader>
            <CardContent className="pb-2 flex-grow">
              <p className="text-xl font-bold text-blue-600 mb-3">{formatCurrency(vehicle.price)}</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-500">Fuel Type</p>
                  <p>{vehicle.fuelType}</p>
                </div>
                <div>
                  <p className="text-gray-500">Mileage</p>
                  <p>{vehicle.mileage}</p>
                </div>
                <div>
                  <p className="text-gray-500">Engine</p>
                  <p>{vehicle.engine}</p>
                </div>
                <div>
                  <p className="text-gray-500">Transmission</p>
                  <p>{vehicle.transmission}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-2 gap-2">
              <Button variant="outline" className="flex-1 bg-transparent">
                View Details
              </Button>
              <Link
                href={`/sell/checkout?type=${getVehicleTypeForCheckout(vehicle.category)}&vehicleId=${vehicle.id}&vehicleName=${encodeURIComponent(vehicle.name)}&vehiclePrice=${vehicle.price}`}
                className="flex-1"
              >
                <Button className="w-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  Buy Now
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}

        {vehicles.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-lg text-gray-600">No vehicles found matching your criteria.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setSelectedTypes([])
                setSelectedFuelTypes([])
                setPriceRange([0, 3000000])
                setSelectedCategory("all")
              }}
              className="mt-4"
            >
              Reset All Filters
            </Button>
          </div>
        )}
      </div>
    )
  }
}



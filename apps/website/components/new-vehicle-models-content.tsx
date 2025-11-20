"use client"

import { useState } from "react"
import Link from "next/link"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Button } from "@vehiverze/ui/button"
import { Input } from "@vehiverze/ui/input"
import { ArrowLeft, Filter, Search, ChevronDown, Star } from "lucide-react"

interface NewVehicleModelsContentProps {
  vehicleType: string
  category: string
}

export function NewVehicleModelsContent({ vehicleType, category }: NewVehicleModelsContentProps) {
  const [showFilters, setShowFilters] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  // Get models based on vehicle type and category
  const getModelsByCategory = () => {
    const modelsData: Record<string, any[]> = {
      // 2-wheeler models
      "2-wheeler-motorcycles": [
        {
          id: 1,
          name: "Honda CB350RS",
          brand: "Honda",
          price: "₹1.96 - 2.10 Lakh",
          image: "/honda-cb350rs.jpg",
          rating: 4.5,
          features: ["350cc Engine", "Manual Transmission", "ABS"],
          fuelType: "Petrol",
          mileage: "35 kmpl",
        },
        {
          id: 2,
          name: "Royal Enfield Classic 350",
          brand: "Royal Enfield",
          price: "₹1.84 - 2.15 Lakh",
          image: "/royal-enfield-classic.jpg",
          rating: 4.3,
          features: ["350cc Engine", "Manual Transmission", "Retro Design"],
          fuelType: "Petrol",
          mileage: "40 kmpl",
        },
        {
          id: 3,
          name: "Yamaha MT-15",
          brand: "Yamaha",
          price: "₹1.68 - 1.73 Lakh",
          image: "/yamaha-mt-15.jpg",
          rating: 4.4,
          features: ["155cc Engine", "6-Speed Manual", "LED Lights"],
          fuelType: "Petrol",
          mileage: "45 kmpl",
        },
      ],
      "2-wheeler-scooters": [
        {
          id: 4,
          name: "Honda Activa 6G",
          brand: "Honda",
          price: "₹74,536 - 78,815",
          image: "/honda-activa.jpg",
          rating: 4.6,
          features: ["110cc Engine", "CVT Automatic", "LED Headlight"],
          fuelType: "Petrol",
          mileage: "60 kmpl",
        },
        {
          id: 5,
          name: "TVS Jupiter",
          brand: "TVS",
          price: "₹73,400 - 87,250",
          image: "/tvs-jupiter.jpg",
          rating: 4.4,
          features: ["110cc Engine", "CVT Automatic", "Mobile Charger"],
          fuelType: "Petrol",
          mileage: "62 kmpl",
        },
      ],
      "3-wheeler-auto-rickshaw": [
        {
          id: 11,
          name: "Bajaj RE Auto",
          brand: "Bajaj",
          price: "₹3.5 - 4.2 Lakh",
          image: "/bajaj-re-auto.jpg",
          rating: 4.2,
          features: ["200cc Engine", "CNG/Petrol", "Spacious Interior"],
          fuelType: "CNG/Petrol",
          mileage: "25 kmpl",
        },
        {
          id: 12,
          name: "Piaggio Ape City",
          brand: "Piaggio",
          price: "₹3.8 - 4.5 Lakh",
          image: "/piaggio-ape.png",
          rating: 4.1,
          features: ["175cc Engine", "Petrol", "Comfortable Seating"],
          fuelType: "Petrol",
          mileage: "28 kmpl",
        },
        {
          id: 13,
          name: "Mahindra Alfa",
          brand: "Mahindra",
          price: "₹3.2 - 3.9 Lakh",
          image: "/mahindra-alfa.jpg",
          rating: 4.3,
          features: ["200cc Engine", "CNG/Petrol", "Modern Design"],
          fuelType: "CNG/Petrol",
          mileage: "26 kmpl",
        },
      ],
      "3-wheeler-goods-carrier": [
        {
          id: 14,
          name: "Bajaj RE Cargo",
          brand: "Bajaj",
          price: "₹3.8 - 4.5 Lakh",
          image: "/bajaj-cargo.jpg",
          rating: 4.0,
          features: ["200cc Engine", "Open Body", "Heavy Load Capacity"],
          fuelType: "Petrol",
          mileage: "24 kmpl",
        },
        {
          id: 15,
          name: "TVS King Cargo",
          brand: "TVS",
          price: "₹3.5 - 4.2 Lakh",
          image: "/tvs-king-cargo.jpg",
          rating: 4.1,
          features: ["150cc Engine", "Tipper Body", "Durable Frame"],
          fuelType: "Petrol",
          mileage: "25 kmpl",
        },
      ],
      // 4-wheeler car models
      "4-wheeler-cars-sedan": [
        {
          id: 6,
          name: "Honda City",
          brand: "Honda",
          price: "₹11.5 - 15.2 Lakh",
          image: "/honda-city.jpg",
          rating: 4.5,
          features: ["1.5L Engine", "CVT Automatic", "Honda SENSING"],
          fuelType: "Petrol",
          mileage: "17.8 kmpl",
        },
        {
          id: 7,
          name: "Hyundai Verna",
          brand: "Hyundai",
          price: "₹10.9 - 17.4 Lakh",
          image: "/hyundai-verna.jpg",
          rating: 4.4,
          features: ["1.5L Engine", "IVT/Manual", "BlueLink Connected"],
          fuelType: "Petrol/Diesel",
          mileage: "18.4 kmpl",
        },
        {
          id: 8,
          name: "Maruti Suzuki Ciaz",
          brand: "Maruti Suzuki",
          price: "₹8.9 - 11.9 Lakh",
          image: "/maruti-ciaz.jpg",
          rating: 4.2,
          features: ["1.5L Engine", "Manual/AT", "SmartPlay Studio"],
          fuelType: "Petrol",
          mileage: "20.04 kmpl",
        },
      ],
      "4-wheeler-cars-suv": [
        {
          id: 9,
          name: "Hyundai Creta",
          brand: "Hyundai",
          price: "₹10.44 - 18.24 Lakh",
          image: "/hyundai-creta.png",
          rating: 4.6,
          features: ["1.5L Engine", "Manual/AT", "Panoramic Sunroof"],
          fuelType: "Petrol/Diesel",
          mileage: "16.8 kmpl",
        },
        {
          id: 10,
          name: "Tata Nexon",
          brand: "Tata",
          price: "₹7.80 - 14.35 Lakh",
          image: "/tata-nexon.jpg",
          rating: 4.5,
          features: ["1.2L Turbo", "Manual/AMT", "5-Star Safety"],
          fuelType: "Petrol/Diesel",
          mileage: "17.57 kmpl",
        },
      ],
      "6-wheeler-medium-trucks": [
        {
          id: 16,
          name: "Tata LPT 1613",
          brand: "Tata",
          price: "₹18.5 - 22.3 Lakh",
          image: "/tata-lpt-truck.jpg",
          rating: 4.3,
          features: ["5.9L Engine", "Manual Transmission", "Cargo Body"],
          fuelType: "Diesel",
          mileage: "8 kmpl",
        },
        {
          id: 17,
          name: "Eicher Pro 1055",
          brand: "Eicher",
          price: "₹17.8 - 21.5 Lakh",
          image: "/eicher-pro-truck.jpg",
          rating: 4.2,
          features: ["5.2L Engine", "Manual Transmission", "Tipper Body"],
          fuelType: "Diesel",
          mileage: "8.5 kmpl",
        },
        {
          id: 18,
          name: "Mahindra Bolero Pik-Up",
          brand: "Mahindra",
          price: "₹16.2 - 19.8 Lakh",
          image: "/mahindra-bolero.jpg",
          rating: 4.1,
          features: ["2.2L Engine", "Manual Transmission", "Open Body"],
          fuelType: "Diesel",
          mileage: "12 kmpl",
        },
      ],
      "6-wheeler-buses": [
        {
          id: 19,
          name: "Tata Starbus",
          brand: "Tata",
          price: "₹22.5 - 28.3 Lakh",
          image: "/tata-starbus.jpg",
          rating: 4.4,
          features: ["5.9L Engine", "Manual Transmission", "Passenger Seating"],
          fuelType: "Diesel",
          mileage: "7.5 kmpl",
        },
        {
          id: 20,
          name: "Ashok Leyland Oyster",
          brand: "Ashok Leyland",
          price: "₹21.8 - 27.5 Lakh",
          image: "/ashok-leyland-bus.jpg",
          rating: 4.2,
          features: ["5.7L Engine", "Manual Transmission", "Comfortable Interior"],
          fuelType: "Diesel",
          mileage: "7.8 kmpl",
        },
      ],
      "more-than-8-wheeler-heavy-trucks": [
        {
          id: 21,
          name: "Tata Signa 5528.T",
          brand: "Tata",
          price: "₹35.5 - 42.3 Lakh",
          image: "/tata-signa-truck.jpg",
          rating: 4.5,
          features: ["10.3L Engine", "Manual Transmission", "Multi-Axle"],
          fuelType: "Diesel",
          mileage: "6.5 kmpl",
        },
        {
          id: 22,
          name: "Volvo FM 440",
          brand: "Volvo",
          price: "₹42.8 - 51.2 Lakh",
          image: "/volvo-fm-truck.jpg",
          rating: 4.6,
          features: ["12.8L Engine", "Automatic Transmission", "Advanced Safety"],
          fuelType: "Diesel",
          mileage: "5.8 kmpl",
        },
        {
          id: 23,
          name: "Scania P410",
          brand: "Scania",
          price: "₹45.5 - 54.8 Lakh",
          image: "/placeholder.svg?height=200&width=300",
          rating: 4.7,
          features: ["12.7L Engine", "Automatic Transmission", "Euro 5 Compliant"],
          fuelType: "Diesel",
          mileage: "5.5 kmpl",
        },
      ],
      "more-than-8-wheeler-specialized": [
        {
          id: 24,
          name: "Tata Signa Transit Mixer",
          brand: "Tata",
          price: "₹38.2 - 45.5 Lakh",
          image: "/placeholder.svg?height=200&width=300",
          rating: 4.4,
          features: ["10.3L Engine", "Manual Transmission", "Mixer Drum"],
          fuelType: "Diesel",
          mileage: "6 kmpl",
        },
        {
          id: 25,
          name: "Ashok Leyland Tanker",
          brand: "Ashok Leyland",
          price: "₹36.8 - 43.2 Lakh",
          image: "/placeholder.svg?height=200&width=300",
          rating: 4.3,
          features: ["9.4L Engine", "Manual Transmission", "Stainless Steel Tank"],
          fuelType: "Diesel",
          mileage: "6.2 kmpl",
        },
        {
          id: 26,
          name: "BharatBenz Crane Truck",
          brand: "BharatBenz",
          price: "₹41.5 - 49.8 Lakh",
          image: "/placeholder.svg?height=200&width=300",
          rating: 4.5,
          features: ["11.9L Engine", "Manual Transmission", "Hydraulic Crane"],
          fuelType: "Diesel",
          mileage: "5.9 kmpl",
        },
      ],
    }

    const key = `${vehicleType}-${category}`
    return modelsData[key] || []
  }

  const models = getModelsByCategory()
  const filteredModels = models.filter(
    (model) =>
      model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      model.brand.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const formatCategoryName = (cat: string) => {
    return cat.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="container mx-auto px-4 py-12">
        <div className="flex items-center mb-6">
          <Link href={`/new-vehicles/${vehicleType}`}>
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">New {formatCategoryName(category)} Models</h1>
            <p className="text-gray-600">
              Explore our selection of brand new {formatCategoryName(category).toLowerCase()} with latest features
            </p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder={`Search ${formatCategoryName(category)}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            className="flex items-center gap-2 bg-transparent"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-5 w-5" />
            <span>Filters</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </Button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-white rounded-lg mb-8 shadow-sm">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
              <select className="w-full p-2 border rounded-md">
                <option value="">All Brands</option>
                <option value="honda">Honda</option>
                <option value="hyundai">Hyundai</option>
                <option value="maruti">Maruti Suzuki</option>
                <option value="tata">Tata</option>
                <option value="yamaha">Yamaha</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
              <select className="w-full p-2 border rounded-md">
                <option value="">All Prices</option>
                <option value="under-5">Under ₹5 Lakh</option>
                <option value="5-10">₹5-10 Lakh</option>
                <option value="10-20">₹10-20 Lakh</option>
                <option value="above-20">Above ₹20 Lakh</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Type</label>
              <select className="w-full p-2 border rounded-md">
                <option value="">All Fuel Types</option>
                <option value="petrol">Petrol</option>
                <option value="diesel">Diesel</option>
                <option value="electric">Electric</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mileage</label>
              <select className="w-full p-2 border rounded-md">
                <option value="">All Mileage</option>
                <option value="above-20">Above 20 kmpl</option>
                <option value="15-20">15-20 kmpl</option>
                <option value="below-15">Below 15 kmpl</option>
              </select>
            </div>
          </div>
        )}

        {/* Models Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredModels.map((model) => (
            <Link key={model.id} href={`/new-vehicles/${vehicleType}/${category}/models/${model.id}/details`}>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:scale-105">
                <div className="relative h-48 w-full bg-gray-100">
                  <img
                    src={model.image || "/placeholder.svg"}
                    alt={model.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold">{model.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">{model.rating}</span>
                    </div>
                  </div>
                  <p className="text-blue-600 font-bold text-lg mb-3">{model.price}</p>
                  <div className="grid grid-cols-2 gap-2 mb-4 text-sm text-gray-600">
                    <div>Fuel: {model.fuelType}</div>
                    <div>Mileage: {model.mileage}</div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {model.features.slice(0, 2).map((feature: string, index: number) => (
                      <span key={index} className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">View Details</Button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredModels.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No models found matching your search criteria.</p>
            <Button className="mt-4 bg-transparent" variant="outline" onClick={() => setSearchTerm("")}>
              Clear Search
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}



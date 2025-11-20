"use client"
import Link from "next/link"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Button } from "@vehiverze/ui/button"
import { ArrowLeft, Car, Truck, Bike, Users } from "lucide-react"

interface NewVehicleTypeContentProps {
  vehicleType: string
}

export function NewVehicleTypeContent({ vehicleType }: NewVehicleTypeContentProps) {
  const getVehicleCategories = () => {
    const normalizedType = vehicleType.toLowerCase().replace("-", "")

    switch (normalizedType) {
      case "2wheeler":
      case "2wheelers":
        return [
          {
            name: "Motorcycles",
            icon: <Bike className="h-8 w-8" />,
            path: `/new-vehicles/2-wheeler/motorcycles`,
            description: "High-performance motorcycles for enthusiasts and daily riders",
            image: "/placeholder.svg?height=200&width=300&text=Motorcycles",
            subcategories: ["Sports", "Cruiser", "Adventure", "Naked"],
          },
          {
            name: "Scooters",
            icon: <Bike className="h-8 w-8" />,
            path: `/new-vehicles/2-wheeler/scooters`,
            description: "Convenient and fuel-efficient scooters for daily commute",
            image: "/placeholder.svg?height=200&width=300&text=Scooters",
            subcategories: ["Automatic", "Electric", "Premium"],
          },
          {
            name: "Electric Bikes",
            icon: <Bike className="h-8 w-8" />,
            path: `/new-vehicles/2-wheeler/electric`,
            description: "Eco-friendly electric two-wheelers for sustainable transport",
            image: "/placeholder.svg?height=200&width=300&text=Electric+Bikes",
            subcategories: ["E-Scooters", "E-Motorcycles"],
          },
        ]

      case "3wheeler":
      case "3wheelers":
        return [
          {
            name: "Auto Rickshaw",
            icon: <Car className="h-8 w-8" />,
            path: `/new-vehicles/3-wheeler/auto-rickshaw`,
            description: "Passenger auto rickshaws for commercial transportation",
            image: "/placeholder.svg?height=200&width=300&text=Auto+Rickshaw",
            subcategories: ["CNG", "Petrol", "Electric"],
          },
          {
            name: "Goods Carrier",
            icon: <Truck className="h-8 w-8" />,
            path: `/new-vehicles/3-wheeler/goods-carrier`,
            description: "Three-wheeler goods carriers for small businesses",
            image: "/placeholder.svg?height=200&width=300&text=Goods+Carrier",
            subcategories: ["Open Body", "Closed Body", "Tipper"],
          },
          {
            name: "E-Rickshaw",
            icon: <Car className="h-8 w-8" />,
            path: `/new-vehicles/3-wheeler/e-rickshaw`,
            description: "Electric rickshaws for eco-friendly passenger transport",
            image: "/placeholder.svg?height=200&width=300&text=E-Rickshaw",
            subcategories: ["Passenger", "Goods"],
          },
        ]

      case "4wheeler":
      case "4wheelers":
        return [
          {
            name: "Cars",
            icon: <Car className="h-8 w-8" />,
            path: `/new-vehicles/4-wheeler/cars`,
            description: "Personal cars for family and individual use",
            image: "/placeholder.svg?height=200&width=300&text=Cars",
            subcategories: ["Sedan", "SUV", "Hatchback", "Luxury"],
          },
          {
            name: "Pickup Trucks",
            icon: <Truck className="h-8 w-8" />,
            path: `/new-vehicles/4-wheeler/pickup-trucks`,
            description: "Pickup trucks for personal and commercial use",
            image: "/placeholder.svg?height=200&width=300&text=Pickup+Trucks",
            subcategories: ["Single Cab", "Double Cab", "Crew Cab"],
          },
        ]

      case "6wheeler":
      case "6wheelers":
        return [
          {
            name: "Medium Trucks",
            icon: <Truck className="h-8 w-8" />,
            path: `/new-vehicles/6-wheeler/medium-trucks`,
            description: "Medium-duty trucks for commercial transportation",
            image: "/placeholder.svg?height=200&width=300&text=Medium+Trucks",
            subcategories: ["Cargo", "Tipper", "Container"],
          },
          {
            name: "Buses",
            icon: <Users className="h-8 w-8" />,
            path: `/new-vehicles/6-wheeler/buses`,
            description: "Passenger buses for public and private transport",
            image: "/placeholder.svg?height=200&width=300&text=Buses",
            subcategories: ["City Bus", "School Bus", "Tourist Bus"],
          },
        ]

      case "morethan8wheeler":
      case "morethan8wheelers":
        return [
          {
            name: "Heavy Trucks",
            icon: <Truck className="h-8 w-8" />,
            path: `/new-vehicles/more-than-8-wheeler/heavy-trucks`,
            description: "Heavy-duty trucks for industrial transportation",
            image: "/placeholder.svg?height=200&width=300&text=Heavy+Trucks",
            subcategories: ["Multi-Axle", "Trailer", "Container Truck"],
          },
          {
            name: "Specialized Vehicles",
            icon: <Truck className="h-8 w-8" />,
            path: `/new-vehicles/more-than-8-wheeler/specialized`,
            description: "Specialized heavy vehicles for specific industries",
            image: "/placeholder.svg?height=200&width=300&text=Specialized+Vehicles",
            subcategories: ["Crane", "Mixer", "Tanker"],
          },
        ]

      default:
        return []
    }
  }

  const mainCategories = getVehicleCategories()

  const formatVehicleType = (type: string) => {
    return type.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="container mx-auto px-4 py-12">
        <div className="flex items-center mb-8">
          <Link href="/new-vehicles">
            <Button variant="ghost" size="icon" className="mr-3">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">New {formatVehicleType(vehicleType)}</h1>
            <p className="text-gray-600 mt-2">
              Explore our collection of brand new {vehicleType.toLowerCase().replace("-", " ")} with latest features and
              technology
            </p>
          </div>
        </div>

        {/* Main Categories */}
        {mainCategories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {mainCategories.map((category, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer">
                  <div className="relative h-48 w-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                    <div className="text-blue-600 group-hover:text-blue-700 transition-colors z-10">
                      {category.icon}
                    </div>
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{category.name}</h3>
                    <p className="text-gray-600 mb-4">{category.description}</p>

                    {/* Subcategories Preview */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {category.subcategories.slice(0, 3).map((sub, subIndex) => (
                        <span key={subIndex} className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                          {sub}
                        </span>
                      ))}
                      {category.subcategories.length > 3 && (
                        <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                          +{category.subcategories.length - 3} more
                        </span>
                      )}
                    </div>

                    <Link href={category.path}>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        Explore {category.name}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No vehicle categories found for {vehicleType}</p>
            <p className="text-gray-500 text-sm mt-2">Please check the vehicle type parameter</p>
          </div>
        )}

        {/* Why Choose Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose New {formatVehicleType(vehicleType)}?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Latest Technology</h3>
              <p className="text-gray-600">
                Get access to the newest features and technological advancements in the industry.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Warranty Coverage</h3>
              <p className="text-gray-600">Enjoy peace of mind with comprehensive manufacturer warranty and support.</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Flexible Financing</h3>
              <p className="text-gray-600">Take advantage of competitive financing rates and flexible payment plans.</p>
            </div>
          </div>
        </div>

        {/* Popular Brands Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-center mb-8">Popular Brands</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {getBrandsForVehicleType(vehicleType).map((brand, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="flex flex-col items-center">
                    <img
                      src={brand.logo || "/placeholder.svg"}
                      alt={brand.name}
                      className="w-16 h-16 object-contain mb-3 group-hover:scale-110 transition-transform"
                    />
                    <p className="text-sm font-medium text-gray-900 text-center">{brand.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

// Helper function to get brands based on vehicle type
function getBrandsForVehicleType(vehicleType: string) {
  const normalizedType = vehicleType.toLowerCase().replace("-", "")

  const brandsByType: Record<string, Array<{ name: string; logo: string; slug: string }>> = {
    "2wheeler": [
      { name: "Honda", logo: "/placeholder.svg?height=60&width=60&text=Honda", slug: "honda" },
      { name: "Yamaha", logo: "/placeholder.svg?height=60&width=60&text=Yamaha", slug: "yamaha" },
      { name: "Suzuki", logo: "/placeholder.svg?height=60&width=60&text=Suzuki", slug: "suzuki" },
      { name: "Bajaj", logo: "/placeholder.svg?height=60&width=60&text=Bajaj", slug: "bajaj" },
      { name: "TVS", logo: "/placeholder.svg?height=60&width=60&text=TVS", slug: "tvs" },
      { name: "Royal Enfield", logo: "/placeholder.svg?height=60&width=60&text=Royal+Enfield", slug: "royal-enfield" },
    ],
    "3wheeler": [
      { name: "Bajaj", logo: "/placeholder.svg?height=60&width=60&text=Bajaj", slug: "bajaj" },
      { name: "Mahindra", logo: "/placeholder.svg?height=60&width=60&text=Mahindra", slug: "mahindra" },
      { name: "Piaggio", logo: "/placeholder.svg?height=60&width=60&text=Piaggio", slug: "piaggio" },
      { name: "Force Motors", logo: "/placeholder.svg?height=60&width=60&text=Force+Motors", slug: "force-motors" },
      { name: "Atul Auto", logo: "/placeholder.svg?height=60&width=60&text=Atul+Auto", slug: "atul-auto" },
      { name: "Lohia Auto", logo: "/placeholder.svg?height=60&width=60&text=Lohia+Auto", slug: "lohia-auto" },
    ],
    "4wheeler": [
      { name: "Maruti Suzuki", logo: "/placeholder.svg?height=60&width=60&text=Maruti+Suzuki", slug: "maruti-suzuki" },
      { name: "Hyundai", logo: "/placeholder.svg?height=60&width=60&text=Hyundai", slug: "hyundai" },
      { name: "Tata", logo: "/placeholder.svg?height=60&width=60&text=Tata", slug: "tata" },
      { name: "Mahindra", logo: "/placeholder.svg?height=60&width=60&text=Mahindra", slug: "mahindra" },
      { name: "Honda", logo: "/placeholder.svg?height=60&width=60&text=Honda", slug: "honda" },
      { name: "Toyota", logo: "/placeholder.svg?height=60&width=60&text=Toyota", slug: "toyota" },
    ],
    "6wheeler": [
      { name: "Tata", logo: "/placeholder.svg?height=60&width=60&text=Tata", slug: "tata" },
      { name: "Ashok Leyland", logo: "/placeholder.svg?height=60&width=60&text=Ashok+Leyland", slug: "ashok-leyland" },
      { name: "Mahindra", logo: "/placeholder.svg?height=60&width=60&text=Mahindra", slug: "mahindra" },
      { name: "Eicher", logo: "/placeholder.svg?height=60&width=60&text=Eicher", slug: "eicher" },
      { name: "Force Motors", logo: "/placeholder.svg?height=60&width=60&text=Force+Motors", slug: "force-motors" },
      { name: "SML Isuzu", logo: "/placeholder.svg?height=60&width=60&text=SML+Isuzu", slug: "sml-isuzu" },
    ],
    morethan8wheeler: [
      { name: "Tata", logo: "/placeholder.svg?height=60&width=60&text=Tata", slug: "tata" },
      { name: "Ashok Leyland", logo: "/placeholder.svg?height=60&width=60&text=Ashok+Leyland", slug: "ashok-leyland" },
      { name: "Mahindra", logo: "/placeholder.svg?height=60&width=60&text=Mahindra", slug: "mahindra" },
      { name: "Volvo", logo: "/placeholder.svg?height=60&width=60&text=Volvo", slug: "volvo" },
      { name: "Scania", logo: "/placeholder.svg?height=60&width=60&text=Scania", slug: "scania" },
      { name: "BharatBenz", logo: "/placeholder.svg?height=60&width=60&text=BharatBenz", slug: "bharatbenz" },
    ],
  }

  return brandsByType[normalizedType] || []
}



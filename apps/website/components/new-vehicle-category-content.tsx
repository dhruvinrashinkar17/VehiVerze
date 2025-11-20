"use client"
import Link from "next/link"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Button } from "@vehiverze/ui/button"
import { ArrowLeft, Car, Truck, Crown } from "lucide-react"

interface NewVehicleCategoryContentProps {
  vehicleType: string
  category: string
}

export function NewVehicleCategoryContent({ vehicleType, category }: NewVehicleCategoryContentProps) {
  const getCarTypes = () => {
    if (vehicleType === "4-wheeler" && category === "cars") {
      return [
        {
          name: "Sedan",
          icon: <Car className="h-12 w-12" />,
          path: `/new-vehicles/4-wheeler/sedan/brands`,
          description: "Elegant and comfortable sedans perfect for family and business use",
          image: "/placeholder.svg?height=200&width=300&text=Sedan+Cars",
          features: ["4 Doors", "Spacious Interior", "Fuel Efficient", "Comfortable Ride"],
          priceRange: "₹8 - 25 Lakh",
          popularBrands: ["Honda", "Hyundai", "Maruti Suzuki", "Skoda"],
        },
        {
          name: "SUV",
          icon: <Truck className="h-12 w-12" />,
          path: `/new-vehicles/4-wheeler/suv/brands`,
          description: "Powerful SUVs for adventure, family trips and off-road experiences",
          image: "/placeholder.svg?height=200&width=300&text=SUV+Cars",
          features: ["High Ground Clearance", "7-8 Seater", "All Terrain", "Powerful Engine"],
          priceRange: "₹10 - 50 Lakh",
          popularBrands: ["Tata", "Mahindra", "Hyundai", "Kia"],
        },
        {
          name: "Hatchback",
          icon: <Car className="h-12 w-12" />,
          path: `/new-vehicles/4-wheeler/hatchback/brands`,
          description: "Compact and efficient hatchbacks perfect for city driving and daily commute",
          image: "/placeholder.svg?height=200&width=300&text=Hatchback+Cars",
          features: ["Compact Size", "Easy Parking", "Fuel Efficient", "Affordable"],
          priceRange: "₹4 - 12 Lakh",
          popularBrands: ["Maruti Suzuki", "Hyundai", "Tata", "Honda"],
        },
        {
          name: "Luxury",
          icon: <Crown className="h-12 w-12" />,
          path: `/new-vehicles/4-wheeler/luxury/brands`,
          description: "Premium luxury cars with cutting-edge technology and superior comfort",
          image: "/placeholder.svg?height=200&width=300&text=Luxury+Cars",
          features: ["Premium Interior", "Advanced Tech", "Superior Comfort", "High Performance"],
          priceRange: "₹30 Lakh - 2 Crore",
          popularBrands: ["BMW", "Mercedes", "Audi", "Jaguar"],
        },
      ]
    }
    return []
  }

  const carTypes = getCarTypes()

  const formatTitle = (type: string, cat: string) => {
    const formattedType = type.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())
    const formattedCat = cat.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())
    return `New ${formattedType} ${formattedCat}`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="container mx-auto px-4 py-12">
        <div className="flex items-center mb-8">
          <Link href={`/new-vehicles/${vehicleType.toLowerCase()}`}>
            <Button variant="ghost" size="icon" className="mr-3">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">{formatTitle(vehicleType, category)}</h1>
            <p className="text-gray-600 mt-2">Choose your preferred car type to explore available brands and models</p>
          </div>
        </div>

        {/* Car Types Grid */}
        {carTypes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {carTypes.map((carType, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer">
                  <div className="relative h-48 w-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                    <div className="text-blue-600 group-hover:text-blue-700 transition-colors z-10">{carType.icon}</div>
                    <img
                      src={carType.image || "/placeholder.svg"}
                      alt={carType.name}
                      className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{carType.name}</h3>
                    <p className="text-gray-600 mb-3">{carType.description}</p>
                    <p className="text-blue-600 font-semibold mb-4">{carType.priceRange}</p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {carType.features.slice(0, 3).map((feature, featureIndex) => (
                        <span key={featureIndex} className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                          {feature}
                        </span>
                      ))}
                      {carType.features.length > 3 && (
                        <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                          +{carType.features.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Popular Brands */}
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Popular Brands:</p>
                      <div className="flex flex-wrap gap-1">
                        {carType.popularBrands.slice(0, 3).map((brand, brandIndex) => (
                          <span key={brandIndex} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
                            {brand}
                          </span>
                        ))}
                        {carType.popularBrands.length > 3 && (
                          <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                            +{carType.popularBrands.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    <Link href={carType.path}>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Select {carType.name}</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No car types found for {category}</p>
            <p className="text-gray-500 text-sm mt-2">Please check back later for more options</p>
          </div>
        )}

        {/* Why Choose Cars Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose Cars from Vehiverze?</h2>
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
              <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
              <p className="text-gray-600">Choose from hundreds of car models across all segments and price ranges.</p>
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
              <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
              <p className="text-gray-600">
                Get competitive pricing with exclusive deals and flexible financing options.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick Delivery</h3>
              <p className="text-gray-600">Fast processing and delivery with complete documentation support.</p>
            </div>
          </div>
        </div>

        {/* All Car Brands */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-8">Available Car Brands</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {getAllCarBrands().map((brand, index) => (
              <div key={index} className="group">
                <div className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-all duration-300 hover:scale-105">
                  <div className="flex flex-col items-center">
                    <img
                      src={brand.logo || "/placeholder.svg"}
                      alt={brand.name}
                      className="w-12 h-12 object-contain mb-2 group-hover:scale-110 transition-transform"
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

// Helper function to get all car brands
function getAllCarBrands() {
  return [
    { name: "Maruti Suzuki", logo: "/placeholder.svg?height=48&width=48&text=Maruti" },
    { name: "Hyundai", logo: "/placeholder.svg?height=48&width=48&text=Hyundai" },
    { name: "Tata", logo: "/placeholder.svg?height=48&width=48&text=Tata" },
    { name: "Mahindra", logo: "/placeholder.svg?height=48&width=48&text=Mahindra" },
    { name: "Honda", logo: "/placeholder.svg?height=48&width=48&text=Honda" },
    { name: "Toyota", logo: "/placeholder.svg?height=48&width=48&text=Toyota" },
    { name: "Kia", logo: "/placeholder.svg?height=48&width=48&text=Kia" },
    { name: "Skoda", logo: "/placeholder.svg?height=48&width=48&text=Skoda" },
    { name: "Volkswagen", logo: "/placeholder.svg?height=48&width=48&text=VW" },
    { name: "BMW", logo: "/placeholder.svg?height=48&width=48&text=BMW" },
    { name: "Mercedes", logo: "/placeholder.svg?height=48&width=48&text=Mercedes" },
    { name: "Audi", logo: "/placeholder.svg?height=48&width=48&text=Audi" },
  ]
}



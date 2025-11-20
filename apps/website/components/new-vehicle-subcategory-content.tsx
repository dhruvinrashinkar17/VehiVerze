"use client"
import Link from "next/link"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Button } from "@vehiverze/ui/button"
import { ArrowLeft, Car, Truck, Crown } from "lucide-react"

interface NewVehicleSubcategoryContentProps {
  vehicleType: string
  category: string
}

export function NewVehicleSubcategoryContent({ vehicleType, category }: NewVehicleSubcategoryContentProps) {
  const getSubcategories = () => {
    if (vehicleType === "4-wheeler" && category === "cars") {
      return [
        {
          name: "Sedan",
          icon: <Car className="h-8 w-8" />,
          path: `/new-vehicles/4-wheeler/sedan`,
          description: "Elegant and comfortable sedans for family and business use",
          image: "/placeholder.svg?height=200&width=300&text=Sedan+Cars",
          features: ["4 Doors", "Spacious Interior", "Fuel Efficient", "Comfortable Ride"],
          popularModels: ["Honda City", "Hyundai Verna", "Maruti Ciaz"],
        },
        {
          name: "SUV",
          icon: <Truck className="h-8 w-8" />,
          path: `/new-vehicles/4-wheeler/suv`,
          description: "Powerful SUVs for adventure and family trips",
          image: "/placeholder.svg?height=200&width=300&text=SUV+Cars",
          features: ["High Ground Clearance", "7-8 Seater", "All Terrain", "Powerful Engine"],
          popularModels: ["Tata Harrier", "Mahindra XUV700", "Hyundai Creta"],
        },
        {
          name: "Hatchback",
          icon: <Car className="h-8 w-8" />,
          path: `/new-vehicles/4-wheeler/hatchback`,
          description: "Compact and efficient hatchbacks perfect for city driving",
          image: "/placeholder.svg?height=200&width=300&text=Hatchback+Cars",
          features: ["Compact Size", "Easy Parking", "Fuel Efficient", "Affordable"],
          popularModels: ["Maruti Swift", "Hyundai i20", "Tata Altroz"],
        },
        {
          name: "Luxury",
          icon: <Crown className="h-8 w-8" />,
          path: `/new-vehicles/4-wheeler/luxury`,
          description: "Premium luxury cars with advanced features and comfort",
          image: "/placeholder.svg?height=200&width=300&text=Luxury+Cars",
          features: ["Premium Interior", "Advanced Tech", "Superior Comfort", "High Performance"],
          popularModels: ["BMW 3 Series", "Mercedes C-Class", "Audi A4"],
        },
      ]
    }
    return []
  }

  const subcategories = getSubcategories()

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
          <Link href={`/new-vehicles/${vehicleType}`}>
            <Button variant="ghost" size="icon" className="mr-3">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">{formatTitle(vehicleType, category)}</h1>
            <p className="text-gray-600 mt-2">
              Choose from our wide range of {category.toLowerCase()} categories to find your perfect vehicle
            </p>
          </div>
        </div>

        {/* Subcategories Grid */}
        {subcategories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {subcategories.map((subcategory, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer">
                  <div className="relative h-48 w-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                    <div className="text-blue-600 group-hover:text-blue-700 transition-colors z-10">
                      {subcategory.icon}
                    </div>
                    <img
                      src={subcategory.image || "/placeholder.svg"}
                      alt={subcategory.name}
                      className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{subcategory.name}</h3>
                    <p className="text-gray-600 mb-4">{subcategory.description}</p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {subcategory.features.slice(0, 3).map((feature, featureIndex) => (
                        <span key={featureIndex} className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                          {feature}
                        </span>
                      ))}
                      {subcategory.features.length > 3 && (
                        <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                          +{subcategory.features.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Popular Models */}
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Popular Models:</p>
                      <div className="flex flex-wrap gap-1">
                        {subcategory.popularModels.slice(0, 2).map((model, modelIndex) => (
                          <span key={modelIndex} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                            {model}
                          </span>
                        ))}
                        {subcategory.popularModels.length > 2 && (
                          <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                            +{subcategory.popularModels.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>

                    <Link href={subcategory.path}>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        Explore {subcategory.name}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No subcategories found for {category}</p>
            <p className="text-gray-500 text-sm mt-2">Please check back later for more options</p>
          </div>
        )}

        {/* Why Choose This Category Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose {formatTitle(vehicleType, category)}?</h2>
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
              <p className="text-gray-600">
                Choose from a comprehensive range of models across all price segments and features.
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
              <h3 className="text-xl font-semibold mb-2">Guaranteed Quality</h3>
              <p className="text-gray-600">
                All vehicles come with manufacturer warranty and certified quality assurance.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
              <p className="text-gray-600">
                Get competitive pricing with flexible financing options and special offers.
              </p>
            </div>
          </div>
        </div>

        {/* Popular Brands for This Category */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-center mb-8">Popular Brands</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {getPopularBrands().map((brand, index) => (
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

// Helper function to get popular brands for cars
function getPopularBrands() {
  return [
    { name: "Maruti Suzuki", logo: "/placeholder.svg?height=60&width=60&text=Maruti+Suzuki" },
    { name: "Hyundai", logo: "/placeholder.svg?height=60&width=60&text=Hyundai" },
    { name: "Tata", logo: "/placeholder.svg?height=60&width=60&text=Tata" },
    { name: "Mahindra", logo: "/placeholder.svg?height=60&width=60&text=Mahindra" },
    { name: "Honda", logo: "/placeholder.svg?height=60&width=60&text=Honda" },
    { name: "Toyota", logo: "/placeholder.svg?height=60&width=60&text=Toyota" },
    { name: "Kia", logo: "/placeholder.svg?height=60&width=60&text=Kia" },
    { name: "Skoda", logo: "/placeholder.svg?height=60&width=60&text=Skoda" },
    { name: "Volkswagen", logo: "/placeholder.svg?height=60&width=60&text=Volkswagen" },
    { name: "BMW", logo: "/placeholder.svg?height=60&width=60&text=BMW" },
    { name: "Mercedes", logo: "/placeholder.svg?height=60&width=60&text=Mercedes" },
    { name: "Audi", logo: "/placeholder.svg?height=60&width=60&text=Audi" },
  ]
}



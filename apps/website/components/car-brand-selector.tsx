"use client"
import Link from "next/link"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Button } from "@vehiverze/ui/button"
import { ArrowLeft, Star, Award, Shield } from "lucide-react"

interface CarBrandSelectorProps {
  carType: string
}

export function CarBrandSelector({ carType }: CarBrandSelectorProps) {
  const getBrandsForCarType = () => {
    const allBrands = {
      sedan: [
        {
          name: "Honda",
          logo: "/placeholder.svg?height=80&width=80&text=Honda",
          description: "Reliable and fuel-efficient sedans with advanced safety features",
          popularModels: ["City", "Accord"],
          priceRange: "₹11 - 60 Lakh",
          rating: 4.5,
          path: `/new-vehicles/4-wheeler/sedan/honda/models`,
        },
        {
          name: "Hyundai",
          logo: "/placeholder.svg?height=80&width=80&text=Hyundai",
          description: "Feature-rich sedans with modern design and technology",
          popularModels: ["Verna", "Elantra"],
          priceRange: "₹10 - 25 Lakh",
          rating: 4.4,
          path: `/new-vehicles/4-wheeler/sedan/hyundai/models`,
        },
        {
          name: "Maruti Suzuki",
          logo: "/placeholder.svg?height=80&width=80&text=Maruti",
          description: "India's most trusted brand with excellent fuel efficiency",
          popularModels: ["Ciaz", "Dzire"],
          priceRange: "₹8 - 15 Lakh",
          rating: 4.3,
          path: `/new-vehicles/4-wheeler/sedan/maruti-suzuki/models`,
        },
        {
          name: "Skoda",
          logo: "/placeholder.svg?height=80&width=80&text=Skoda",
          description: "European engineering with premium build quality",
          popularModels: ["Octavia", "Superb"],
          priceRange: "₹25 - 40 Lakh",
          rating: 4.6,
          path: `/new-vehicles/4-wheeler/sedan/skoda/models`,
        },
        {
          name: "Volkswagen",
          logo: "/placeholder.svg?height=80&width=80&text=VW",
          description: "German precision with robust build and safety",
          popularModels: ["Virtus", "Passat"],
          priceRange: "₹15 - 35 Lakh",
          rating: 4.4,
          path: `/new-vehicles/4-wheeler/sedan/volkswagen/models`,
        },
        {
          name: "Toyota",
          logo: "/placeholder.svg?height=80&width=80&text=Toyota",
          description: "Legendary reliability with hybrid technology",
          popularModels: ["Camry", "Corolla"],
          priceRange: "₹40 - 50 Lakh",
          rating: 4.7,
          path: `/new-vehicles/4-wheeler/sedan/toyota/models`,
        },
      ],
      suv: [
        {
          name: "Tata",
          logo: "/placeholder.svg?height=80&width=80&text=Tata",
          description: "Robust SUVs with excellent safety ratings and features",
          popularModels: ["Harrier", "Safari", "Nexon"],
          priceRange: "₹8 - 25 Lakh",
          rating: 4.4,
          path: `/new-vehicles/4-wheeler/suv/tata/models`,
        },
        {
          name: "Mahindra",
          logo: "/placeholder.svg?height=80&width=80&text=Mahindra",
          description: "India's SUV specialist with powerful and rugged vehicles",
          popularModels: ["XUV700", "Scorpio", "Thar"],
          priceRange: "₹12 - 30 Lakh",
          rating: 4.3,
          path: `/new-vehicles/4-wheeler/suv/mahindra/models`,
        },
        {
          name: "Hyundai",
          logo: "/placeholder.svg?height=80&width=80&text=Hyundai",
          description: "Feature-loaded SUVs with modern design and comfort",
          popularModels: ["Creta", "Tucson", "Venue"],
          priceRange: "₹10 - 35 Lakh",
          rating: 4.5,
          path: `/new-vehicles/4-wheeler/suv/hyundai/models`,
        },
        {
          name: "Kia",
          logo: "/placeholder.svg?height=80&width=80&text=Kia",
          description: "Stylish SUVs with premium features and warranty",
          popularModels: ["Seltos", "Sonet", "Carens"],
          priceRange: "₹7 - 20 Lakh",
          rating: 4.4,
          path: `/new-vehicles/4-wheeler/suv/kia/models`,
        },
        {
          name: "Toyota",
          logo: "/placeholder.svg?height=80&width=80&text=Toyota",
          description: "Reliable SUVs with hybrid technology and durability",
          popularModels: ["Fortuner", "Urban Cruiser"],
          priceRange: "₹30 - 50 Lakh",
          rating: 4.6,
          path: `/new-vehicles/4-wheeler/suv/toyota/models`,
        },
        {
          name: "Honda",
          logo: "/placeholder.svg?height=80&width=80&text=Honda",
          description: "Refined SUVs with excellent build quality",
          popularModels: ["CR-V", "HR-V"],
          priceRange: "₹25 - 40 Lakh",
          rating: 4.5,
          path: `/new-vehicles/4-wheeler/suv/honda/models`,
        },
      ],
      hatchback: [
        {
          name: "Maruti Suzuki",
          logo: "/placeholder.svg?height=80&width=80&text=Maruti",
          description: "India's favorite hatchbacks with excellent fuel economy",
          popularModels: ["Swift", "Baleno", "WagonR"],
          priceRange: "₹4 - 10 Lakh",
          rating: 4.3,
          path: `/new-vehicles/4-wheeler/hatchback/maruti-suzuki/models`,
        },
        {
          name: "Hyundai",
          logo: "/placeholder.svg?height=80&width=80&text=Hyundai",
          description: "Feature-rich hatchbacks with modern styling",
          popularModels: ["i20", "Grand i10", "i10"],
          priceRange: "₹5 - 12 Lakh",
          rating: 4.4,
          path: `/new-vehicles/4-wheeler/hatchback/hyundai/models`,
        },
        {
          name: "Tata",
          logo: "/placeholder.svg?height=80&width=80&text=Tata",
          description: "Safe and stylish hatchbacks with premium features",
          popularModels: ["Altroz", "Tiago", "Punch"],
          priceRange: "₹5 - 10 Lakh",
          rating: 4.2,
          path: `/new-vehicles/4-wheeler/hatchback/tata/models`,
        },
        {
          name: "Honda",
          logo: "/placeholder.svg?height=80&width=80&text=Honda",
          description: "Refined hatchbacks with excellent build quality",
          popularModels: ["Jazz", "Brio"],
          priceRange: "₹7 - 12 Lakh",
          rating: 4.4,
          path: `/new-vehicles/4-wheeler/hatchback/honda/models`,
        },
        {
          name: "Nissan",
          logo: "/placeholder.svg?height=80&width=80&text=Nissan",
          description: "Reliable hatchbacks with good performance",
          popularModels: ["Micra", "Note"],
          priceRange: "₹6 - 10 Lakh",
          rating: 4.1,
          path: `/new-vehicles/4-wheeler/hatchback/nissan/models`,
        },
        {
          name: "Renault",
          logo: "/placeholder.svg?height=80&width=80&text=Renault",
          description: "European design with efficient engines",
          popularModels: ["Kwid", "Triber"],
          priceRange: "₹4 - 8 Lakh",
          rating: 4.0,
          path: `/new-vehicles/4-wheeler/hatchback/renault/models`,
        },
      ],
      luxury: [
        {
          name: "BMW",
          logo: "/placeholder.svg?height=80&width=80&text=BMW",
          description: "Ultimate driving machines with cutting-edge technology",
          popularModels: ["3 Series", "5 Series", "X3"],
          priceRange: "₹40 Lakh - 1.5 Crore",
          rating: 4.7,
          path: `/new-vehicles/4-wheeler/luxury/bmw/models`,
        },
        {
          name: "Mercedes-Benz",
          logo: "/placeholder.svg?height=80&width=80&text=Mercedes",
          description: "Luxury redefined with unmatched comfort and prestige",
          popularModels: ["C-Class", "E-Class", "GLC"],
          priceRange: "₹45 Lakh - 2 Crore",
          rating: 4.8,
          path: `/new-vehicles/4-wheeler/luxury/mercedes-benz/models`,
        },
        {
          name: "Audi",
          logo: "/placeholder.svg?height=80&width=80&text=Audi",
          description: "Vorsprung durch Technik - Progress through technology",
          popularModels: ["A4", "A6", "Q5"],
          priceRange: "₹40 Lakh - 1.8 Crore",
          rating: 4.6,
          path: `/new-vehicles/4-wheeler/luxury/audi/models`,
        },
        {
          name: "Jaguar",
          logo: "/placeholder.svg?height=80&width=80&text=Jaguar",
          description: "British luxury with distinctive design and performance",
          popularModels: ["XE", "XF", "F-Pace"],
          priceRange: "₹50 Lakh - 1.2 Crore",
          rating: 4.5,
          path: `/new-vehicles/4-wheeler/luxury/jaguar/models`,
        },
        {
          name: "Volvo",
          logo: "/placeholder.svg?height=80&width=80&text=Volvo",
          description: "Swedish luxury with world-class safety technology",
          popularModels: ["S60", "XC60", "XC90"],
          priceRange: "₹45 Lakh - 1.5 Crore",
          rating: 4.6,
          path: `/new-vehicles/4-wheeler/luxury/volvo/models`,
        },
        {
          name: "Lexus",
          logo: "/placeholder.svg?height=80&width=80&text=Lexus",
          description: "Japanese luxury with hybrid technology and reliability",
          popularModels: ["ES", "NX", "RX"],
          priceRange: "₹55 Lakh - 2.5 Crore",
          rating: 4.7,
          path: `/new-vehicles/4-wheeler/luxury/lexus/models`,
        },
      ],
    }

    return allBrands[carType as keyof typeof allBrands] || []
  }

  const brands = getBrandsForCarType()

  const formatCarType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="container mx-auto px-4 py-12">
        <div className="flex items-center mb-8">
          <Link href={`/new-vehicles/4-wheeler/cars`}>
            <Button variant="ghost" size="icon" className="mr-3">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Choose {formatCarType(carType)} Brand</h1>
            <p className="text-gray-600 mt-2">Select your preferred brand to explore available {carType} models</p>
          </div>
        </div>

        {/* Brands Grid */}
        {brands.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {brands.map((brand, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <img
                        src={brand.logo || "/placeholder.svg"}
                        alt={brand.name}
                        className="w-16 h-16 object-contain mr-4"
                      />
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{brand.name}</h3>
                        <div className="flex items-center mt-1">
                          {renderStars(brand.rating)}
                          <span className="ml-2 text-sm text-gray-600">({brand.rating})</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">{brand.description}</p>
                    <p className="text-blue-600 font-semibold mb-4">{brand.priceRange}</p>

                    {/* Popular Models */}
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Popular Models:</p>
                      <div className="flex flex-wrap gap-2">
                        {brand.popularModels.map((model, modelIndex) => (
                          <span key={modelIndex} className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                            {model}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-green-600">
                        <Shield className="h-4 w-4 mr-1" />
                        <span className="text-sm">Warranty</span>
                      </div>
                      <div className="flex items-center text-blue-600">
                        <Award className="h-4 w-4 mr-1" />
                        <span className="text-sm">Certified</span>
                      </div>
                    </div>

                    <Link href={brand.path}>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        View {brand.name} {formatCarType(carType)}s
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No brands found for {carType}</p>
            <p className="text-gray-500 text-sm mt-2">Please check back later for more options</p>
          </div>
        )}

        {/* Why Choose This Brand Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose Brand-Specific {formatCarType(carType)}s?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Brand Reliability</h3>
              <p className="text-gray-600">
                Each brand brings its unique strengths and proven track record in the automotive industry.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Specialized Features</h3>
              <p className="text-gray-600">
                Different brands excel in different areas - safety, fuel efficiency, performance, or luxury.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Service Network</h3>
              <p className="text-gray-600">
                Established brands offer extensive service networks and spare parts availability.
              </p>
            </div>
          </div>
        </div>

        {/* Brand Comparison Tips */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Tips for Choosing the Right Brand</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Consider Your Budget</h3>
              <p className="text-gray-600 text-sm">
                Different brands offer vehicles at various price points. Choose based on your budget and financing
                options.
              </p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Check Service Centers</h3>
              <p className="text-gray-600 text-sm">
                Ensure the brand has good service network in your area for easy maintenance and repairs.
              </p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Read Reviews</h3>
              <p className="text-gray-600 text-sm">
                Check customer reviews and ratings to understand real-world performance and reliability.
              </p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Compare Features</h3>
              <p className="text-gray-600 text-sm">
                Different brands offer different features. Compare what matters most to you - safety, fuel efficiency,
                or technology.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}



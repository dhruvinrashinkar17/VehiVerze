import Link from "next/link"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Button } from "@vehiverze/ui/button"
import { ArrowLeft, Car, Truck, Bike } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "New Vehicles | Latest Models & Best Prices | Vehiverze",
  description:
    "Explore the latest vehicle models across all categories - 2-wheelers, 3-wheelers, 4-wheelers, and commercial vehicles. Find your perfect vehicle with competitive prices and flexible financing.",
  keywords: [
    "new vehicles",
    "latest models",
    "buy vehicles",
    "vehicle prices",
    "2-wheeler",
    "3-wheeler",
    "4-wheeler",
    "commercial vehicles",
    "vehicle financing",
  ],
  openGraph: {
    title: "New Vehicles | Latest Models | Vehiverze",
    description: "Discover the latest vehicle models with cutting-edge technology and competitive pricing.",
    images: ["/images/new-vehicles-og.jpg"],
  },
}

export default function NewVehiclesPage() {
  const vehicleTypes = [
    {
      name: "2-Wheelers",
      icon: <Bike className="h-12 w-12" />,
      path: "/new-vehicles/2-wheeler",
      description: "Motorcycles, scooters, and electric bikes for daily commute and adventure",
      image: "/placeholder.svg?height=200&width=300&text=2-Wheelers",
      categories: ["Motorcycles", "Scooters", "Electric Bikes"],
    },
    {
      name: "3-Wheelers",
      icon: <Car className="h-12 w-12" />,
      path: "/new-vehicles/3-wheeler",
      description: "Auto rickshaws, goods carriers, and e-rickshaws for commercial use",
      image: "/placeholder.svg?height=200&width=300&text=3-Wheelers",
      categories: ["Auto Rickshaw", "Goods Carrier", "E-Rickshaw"],
    },
    {
      name: "4-Wheelers",
      icon: <Car className="h-12 w-12" />,
      path: "/new-vehicles/4-wheeler",
      description: "Cars, pickup trucks, and commercial vehicles for personal and business use",
      image: "/placeholder.svg?height=200&width=300&text=4-Wheelers",
      categories: ["Cars", "Pickup Trucks", "Commercial"],
    },
    {
      name: "6-Wheelers",
      icon: <Truck className="h-12 w-12" />,
      path: "/new-vehicles/6-wheeler",
      description: "Medium trucks and buses for commercial transportation",
      image: "/placeholder.svg?height=200&width=300&text=6-Wheelers",
      categories: ["Medium Trucks", "Buses"],
    },
    {
      name: "More than 8-Wheelers",
      icon: <Truck className="h-12 w-12" />,
      path: "/new-vehicles/more-than-8-wheeler",
      description: "Heavy trucks and specialized vehicles for industrial use",
      image: "/placeholder.svg?height=200&width=300&text=Heavy+Vehicles",
      categories: ["Heavy Trucks", "Specialized Vehicles"],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="container mx-auto px-4 py-12">
        <div className="flex items-center mb-8">
          <Link href="/">
            <Button variant="ghost" size="icon" className="mr-3">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">New Vehicles</h1>
            <p className="text-gray-600 mt-2">
              Explore our complete range of brand new vehicles with latest features and technology
            </p>
          </div>
        </div>

        {/* Vehicle Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {vehicleTypes.map((vehicleType, index) => (
            <div key={index} className="group">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer">
                <div className="relative h-48 w-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                  <div className="text-blue-600 group-hover:text-blue-700 transition-colors z-10">
                    {vehicleType.icon}
                  </div>
                  <img
                    src={vehicleType.image || "/placeholder.svg"}
                    alt={vehicleType.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{vehicleType.name}</h3>
                  <p className="text-gray-600 mb-4">{vehicleType.description}</p>

                  {/* Categories Preview */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {vehicleType.categories.map((category, categoryIndex) => (
                      <span key={categoryIndex} className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                        {category}
                      </span>
                    ))}
                  </div>

                  <Link href={vehicleType.path}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      Explore {vehicleType.name}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose New Vehicles?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
              <p className="text-gray-600">Get access to the newest features and technological advancements.</p>
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
              <p className="text-gray-600">Comprehensive manufacturer warranty and support.</p>
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
              <h3 className="text-xl font-semibold mb-2">Flexible Financing</h3>
              <p className="text-gray-600">Competitive financing rates and flexible payment plans.</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick delivery and hassle-free documentation process.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}



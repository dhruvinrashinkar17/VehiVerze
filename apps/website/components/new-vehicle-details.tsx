"use client"

import { useState } from "react"
import Link from "next/link"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Button } from "@vehiverze/ui/button"
import { ArrowLeft, Check, Star, Calendar, Fuel, Settings, Users } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@vehiverze/ui/tabs"

interface NewVehicleDetailsProps {
  vehicleType: string
  category: string
  vehicleId: string
}

export function NewVehicleDetails({ vehicleType, category, vehicleId }: NewVehicleDetailsProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  // Sample data - would come from an API in a real application
  const vehicle = {
    id: vehicleId,
    name: "Honda City",
    brand: "Honda",
    price: "₹11.5 - 15.2 Lakh",
    rating: 4.5,
    year: 2023,
    fuelType: "Petrol",
    transmission: "Automatic",
    seating: "5 Seater",
    mileage: "18.4 - 24.1 km/l",
    engine: "1498 cc",
    power: "119 bhp",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    colors: [
      { name: "Platinum White Pearl", hex: "#FFFFFF" },
      { name: "Radiant Red", hex: "#FF0000" },
      { name: "Lunar Silver", hex: "#C0C0C0" },
      { name: "Golden Brown", hex: "#996515" },
      { name: "Modern Steel", hex: "#808080" },
    ],
    features: [
      "Electric Sunroof",
      "Cruise Control",
      "Automatic Climate Control",
      "Wireless Charging",
      "Rear AC Vents",
      "Push Button Start",
      "Keyless Entry",
      "Touchscreen Infotainment",
      "Android Auto & Apple CarPlay",
      "6 Airbags",
      "ABS with EBD",
      "Electronic Stability Control",
      "Hill Start Assist",
      "Rear Parking Sensors",
      "Rear Camera",
    ],
    description:
      "The Honda City is a subcompact sedan known for its reliability, fuel efficiency, and comfortable ride. It features a sleek design, spacious interior, and comes equipped with modern technology and safety features. The latest generation offers improved performance, enhanced comfort, and a more premium feel compared to its predecessors.",
  }

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <main className="container mx-auto px-4 py-12">
        <div className="flex items-center mb-6">
          <Link href={`/new-vehicles/${vehicleType.toLowerCase()}/${category.toLowerCase()}`}>
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">{vehicle.name}</h1>
            <div className="flex items-center text-gray-600">
              <span>{vehicle.brand}</span>
              <span className="mx-2">•</span>
              <span>{category.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}</span>
              <span className="mx-2">•</span>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                <span>{vehicle.rating}/5</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Image Gallery */}
          <div className="lg:col-span-2">
            <div className="relative h-80 md:h-96 w-full bg-gray-200 rounded-lg overflow-hidden mb-4">
              <img
                src={vehicle.images[activeImageIndex] || "/placeholder.svg"}
                alt={vehicle.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {vehicle.images.map((image, index) => (
                <button
                  key={index}
                  className={`relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden border-2 ${
                    activeImageIndex === index ? "border-blue-600" : "border-transparent"
                  }`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${vehicle.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Vehicle Info */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="mb-4">
              <h2 className="text-2xl font-bold">{vehicle.price}</h2>
              <p className="text-gray-600 text-sm">Ex-showroom price</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                <div>
                  <p className="text-sm text-gray-600">Year</p>
                  <p className="font-medium">{vehicle.year}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Fuel className="h-5 w-5 text-blue-600 mr-2" />
                <div>
                  <p className="text-sm text-gray-600">Fuel</p>
                  <p className="font-medium">{vehicle.fuelType}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Settings className="h-5 w-5 text-blue-600 mr-2" />
                <div>
                  <p className="text-sm text-gray-600">Transmission</p>
                  <p className="font-medium">{vehicle.transmission}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 text-blue-600 mr-2" />
                <div>
                  <p className="text-sm text-gray-600">Seating</p>
                  <p className="font-medium">{vehicle.seating}</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Available Colors</h3>
              <div className="flex flex-wrap gap-2">
                {vehicle.colors.map((color, index) => (
                  <div key={index} className="text-center">
                    <div
                      className="w-8 h-8 rounded-full border border-gray-300 mx-auto"
                      style={{ backgroundColor: color.hex }}
                    ></div>
                    <p className="text-xs mt-1">{color.name.split(" ")[0]}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Book Test Drive</Button>
              <Link href={`/new-vehicles/${vehicleType.toLowerCase()}/${category.toLowerCase()}/checkout/${vehicleId}`}>
                <Button className="w-full">Proceed to Buy</Button>
              </Link>
              <Button variant="outline" className="w-full bg-transparent">
                Get Price Quotes
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs for Details */}
        <Tabs defaultValue="overview" className="mb-12">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="p-4 border rounded-lg mt-4">
            <h3 className="text-xl font-semibold mb-4">About {vehicle.name}</h3>
            <p className="text-gray-700 mb-4">{vehicle.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Engine & Performance</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>{vehicle.engine} Engine</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>{vehicle.power} Maximum Power</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>{vehicle.mileage} Mileage</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Comfort & Convenience</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>Automatic Climate Control</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>Keyless Entry & Push Button Start</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>Electric Sunroof</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Safety</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>6 Airbags</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>ABS with EBD</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>Electronic Stability Control</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="features" className="p-4 border rounded-lg mt-4">
            <h3 className="text-xl font-semibold mb-4">Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {vehicle.features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="specifications" className="p-4 border rounded-lg mt-4">
            <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Engine & Transmission</h4>
                <table className="w-full">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Engine Type</td>
                      <td className="py-2 font-medium">1.5L i-VTEC Petrol</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Displacement</td>
                      <td className="py-2 font-medium">{vehicle.engine}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Max Power</td>
                      <td className="py-2 font-medium">{vehicle.power}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Max Torque</td>
                      <td className="py-2 font-medium">145 Nm @ 4300 rpm</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Transmission</td>
                      <td className="py-2 font-medium">{vehicle.transmission}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Dimensions & Capacity</h4>
                <table className="w-full">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Length</td>
                      <td className="py-2 font-medium">4549 mm</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Width</td>
                      <td className="py-2 font-medium">1748 mm</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Height</td>
                      <td className="py-2 font-medium">1489 mm</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Wheelbase</td>
                      <td className="py-2 font-medium">2600 mm</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Fuel Tank Capacity</td>
                      <td className="py-2 font-medium">40 L</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="p-4 border rounded-lg mt-4">
            <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${star <= 5 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 font-medium">Excellent Performance</span>
                </div>
                <p className="text-gray-700 text-sm">
                  I've been driving the new Honda City for 3 months now and I'm extremely satisfied with its performance
                  and comfort. The mileage is great and the features are top-notch for this price range.
                </p>
                <p className="text-gray-500 text-xs mt-2">Rahul S. - 2 months ago</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="flex">
                    {[1, 2, 3, 4].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${star <= 4 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                      />
                    ))}
                    <Star className="h-4 w-4 text-gray-300" />
                  </div>
                  <span className="ml-2 font-medium">Great Value for Money</span>
                </div>
                <p className="text-gray-700 text-sm">
                  The Honda City offers great value for money with its premium features and reliable performance. The
                  only downside is the slightly firm ride quality on rough roads.
                </p>
                <p className="text-gray-500 text-xs mt-2">Priya M. - 1 month ago</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Similar Vehicles */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Similar Vehicles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                <div className="relative h-48 w-full bg-gray-200">
                  <img
                    src="/placeholder.svg?height=200&width=300"
                    alt="Similar vehicle"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1">Hyundai Verna</h3>
                  <p className="text-blue-600 font-medium mb-2">₹10.9 - 17.4 Lakh</p>
                  <Button variant="outline" className="w-full bg-transparent">
                    View Details
                  </Button>
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



import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Breadcrumb } from "@/components/breadcrumb"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@vehiverze/ui/button"
import { Card, CardContent } from "@vehiverze/ui/card"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "New SUV Cars | Vehiverze",
  description: "Explore the latest SUV models with best deals and financing options at Vehiverze.",
}

const suvCars = [
  {
    id: 1,
    name: "Hyundai Creta",
    image: "/placeholder.svg?height=200&width=300",
    price: "₹10.87 - 19.20 Lakh",
    mileage: "16.8 - 21.0 kmpl",
    engine: "1353 - 1497 cc",
    transmission: "Manual & Automatic",
    features: ["Panoramic Sunroof", "ADAS", "Ventilated Seats"],
  },
  {
    id: 2,
    name: "Tata Nexon",
    image: "/placeholder.svg?height=200&width=300",
    price: "₹8.10 - 15.50 Lakh",
    mileage: "17.01 - 24.08 kmpl",
    engine: "1199 - 1497 cc",
    transmission: "Manual & Automatic",
    features: ["5-Star Safety Rating", "Voice Assisted Sunroof", "Air Purifier"],
  },
  {
    id: 3,
    name: "Mahindra XUV700",
    image: "/placeholder.svg?height=200&width=300",
    price: "₹13.99 - 26.99 Lakh",
    mileage: "13.0 - 16.0 kmpl",
    engine: "1997 - 2184 cc",
    transmission: "Manual & Automatic",
    features: ["ADAS", "Panoramic Sunroof", "AdrenoX Connected Car"],
  },
  {
    id: 4,
    name: "Kia Seltos",
    image: "/placeholder.svg?height=200&width=300",
    price: "₹10.90 - 20.30 Lakh",
    mileage: "16.1 - 20.7 kmpl",
    engine: "1353 - 1497 cc",
    transmission: "Manual & Automatic",
    features: ["Panoramic Sunroof", "ADAS", "Ventilated Seats"],
  },
  {
    id: 5,
    name: "Maruti Suzuki Brezza",
    image: "/placeholder.svg?height=200&width=300",
    price: "₹8.29 - 14.14 Lakh",
    mileage: "17.38 - 25.51 kmpl",
    engine: "1462 cc",
    transmission: "Manual & Automatic",
    features: ["Electric Sunroof", "Wireless Charging", "Heads-Up Display"],
  },
  {
    id: 6,
    name: "Toyota Urban Cruiser Hyryder",
    image: "/placeholder.svg?height=200&width=300",
    price: "₹11.14 - 19.99 Lakh",
    mileage: "21.12 - 27.97 kmpl",
    engine: "1462 - 1490 cc",
    transmission: "Manual & Automatic",
    features: ["Strong Hybrid", "Panoramic Sunroof", "Ventilated Seats"],
  },
]

export default function SUVPage() {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "New Cars", href: "/buy/new-cars" },
            { label: "SUV", href: "/new-cars/suv" },
          ]}
        />

        <div className="flex flex-col space-y-6 mt-6">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold">New SUV Cars in India</h1>
            <p className="text-gray-600">
              Explore the latest SUV models with best deals and financing options at Vehiverze
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {suvCars.map((car) => (
              <Card key={car.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 w-full">
                  <Image src={car.image || "/placeholder.svg"} alt={car.name} fill className="object-cover" />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-xl font-semibold">{car.name}</h3>
                  <p className="text-lg font-bold text-gray-900 mt-1">{car.price}</p>

                  <div className="mt-3 space-y-1 text-sm text-gray-700">
                    <p>Mileage: {car.mileage}</p>
                    <p>Engine: {car.engine}</p>
                    <p>Transmission: {car.transmission}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {car.features.map((feature, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex justify-between">
                    <Link href={`/buy/new-cars/models/${car.name.toLowerCase().replace(/\s+/g, "-")}`}>
                      <Button size="sm">View Details</Button>
                    </Link>
                    <Link href={`/buy/new-cars/models/${car.name.toLowerCase().replace(/\s+/g, "-")}/checkout`}>
                      <Button size="sm" variant="outline">
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}



import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Breadcrumb } from "@/components/breadcrumb"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@vehiverze/ui/button"
import { Card, CardContent } from "@vehiverze/ui/card"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "New Hatchback Cars | Vehiverze",
  description: "Explore the latest hatchback models with best deals and financing options at Vehiverze.",
}

const hatchbackCars = [
  {
    id: 1,
    name: "Maruti Suzuki Swift",
    image: "/placeholder.svg?height=200&width=300",
    price: "₹6.00 - 9.10 Lakh",
    mileage: "22.38 - 30.90 kmpl",
    engine: "1197 cc",
    transmission: "Manual & Automatic",
    features: ["Push Button Start", "Touchscreen Infotainment", "LED Headlamps"],
  },
  {
    id: 2,
    name: "Hyundai i20",
    image: "/placeholder.svg?height=200&width=300",
    price: "₹7.04 - 11.21 Lakh",
    mileage: "19.65 - 25.2 kmpl",
    engine: "998 - 1197 cc",
    transmission: "Manual & Automatic",
    features: ["Sunroof", "Wireless Charging", "BlueLink Connected Car"],
  },
  {
    id: 3,
    name: "Tata Altroz",
    image: "/placeholder.svg?height=200&width=300",
    price: "₹6.35 - 10.25 Lakh",
    mileage: "19.05 - 26.2 kmpl",
    engine: "1199 - 1497 cc",
    transmission: "Manual & Automatic",
    features: ["5-Star Safety Rating", "Leatherette Seats", "Cruise Control"],
  },
  {
    id: 4,
    name: "Maruti Suzuki Baleno",
    image: "/placeholder.svg?height=200&width=300",
    price: "₹6.61 - 9.88 Lakh",
    mileage: "22.35 - 30.61 kmpl",
    engine: "1197 cc",
    transmission: "Manual & Automatic",
    features: ["Heads-Up Display", "360 View Camera", "6 Airbags"],
  },
  {
    id: 5,
    name: "Toyota Glanza",
    image: "/placeholder.svg?height=200&width=300",
    price: "₹6.86 - 10.00 Lakh",
    mileage: "22.35 - 30.61 kmpl",
    engine: "1197 cc",
    transmission: "Manual & Automatic",
    features: ["Heads-Up Display", "Toyota i-Connect", "Push Button Start"],
  },
  {
    id: 6,
    name: "Volkswagen Polo",
    image: "/placeholder.svg?height=200&width=300",
    price: "₹6.45 - 10.25 Lakh",
    mileage: "17.75 - 21.49 kmpl",
    engine: "999 cc",
    transmission: "Manual & Automatic",
    features: ["German Engineering", "Touchscreen Infotainment", "Rain Sensing Wipers"],
  },
]

export default function HatchbackPage() {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "New Cars", href: "/buy/new-cars" },
            { label: "Hatchback", href: "/new-cars/hatchback" },
          ]}
        />

        <div className="flex flex-col space-y-6 mt-6">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold">New Hatchback Cars in India</h1>
            <p className="text-gray-600">
              Explore the latest hatchback models with best deals and financing options at Vehiverze
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {hatchbackCars.map((car) => (
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



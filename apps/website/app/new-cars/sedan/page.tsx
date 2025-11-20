import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Breadcrumb } from "@/components/breadcrumb"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@vehiverze/ui/button"
import { Card, CardContent } from "@vehiverze/ui/card"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "New Sedan Cars | Vehiverze",
  description: "Explore the latest sedan models with best deals and financing options at Vehiverze.",
}

const sedanCars = [
  {
    id: 1,
    name: "Honda City",
    image: "/placeholder.svg?height=200&width=300",
    price: "₹11.49 - 15.97 Lakh",
    mileage: "18.4 - 24.1 kmpl",
    engine: "1498 cc",
    transmission: "Manual & Automatic",
    features: ["Sunroof", "Cruise Control", "Wireless Charging"],
  },
  {
    id: 2,
    name: "Hyundai Verna",
    image: "/placeholder.svg?height=200&width=300",
    price: "₹10.96 - 17.38 Lakh",
    mileage: "18.6 - 20.6 kmpl",
    engine: "1482 cc",
    transmission: "Manual & Automatic",
    features: ["Ventilated Seats", "ADAS", "Digital Cluster"],
  },
  {
    id: 3,
    name: "Maruti Suzuki Ciaz",
    image: "/placeholder.svg?height=200&width=300",
    price: "₹8.87 - 11.86 Lakh",
    mileage: "20.04 - 20.65 kmpl",
    engine: "1462 cc",
    transmission: "Manual & Automatic",
    features: ["Cruise Control", "Push Button Start", "Leather Seats"],
  },
  {
    id: 4,
    name: "Skoda Slavia",
    image: "/placeholder.svg?height=200&width=300",
    price: "₹10.69 - 18.69 Lakh",
    mileage: "18.07 - 20.64 kmpl",
    engine: "999 - 1498 cc",
    transmission: "Manual & Automatic",
    features: ["Sunroof", "Ventilated Seats", "6 Airbags"],
  },
  {
    id: 5,
    name: "Volkswagen Virtus",
    image: "/placeholder.svg?height=200&width=300",
    price: "₹11.56 - 19.41 Lakh",
    mileage: "18.12 - 19.76 kmpl",
    engine: "999 - 1498 cc",
    transmission: "Manual & Automatic",
    features: ["Electric Sunroof", "Ventilated Front Seats", "Digital Cockpit"],
  },
  {
    id: 6,
    name: "Toyota Camry",
    image: "/placeholder.svg?height=200&width=300",
    price: "₹46.17 Lakh",
    mileage: "19.16 kmpl",
    engine: "2487 cc",
    transmission: "Automatic",
    features: ["Hybrid Engine", "9 Speaker JBL Audio", "HUD Display"],
  },
]

export default function SedanPage() {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "New Cars", href: "/buy/new-cars" },
            { label: "Sedan", href: "/new-cars/sedan" },
          ]}
        />

        <div className="flex flex-col space-y-6 mt-6">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold">New Sedan Cars in India</h1>
            <p className="text-gray-600">
              Explore the latest sedan models with best deals and financing options at Vehiverze
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {sedanCars.map((car) => (
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



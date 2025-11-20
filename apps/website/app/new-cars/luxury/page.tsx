import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Breadcrumb } from "@/components/breadcrumb"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@vehiverze/ui/button"
import { Card, CardContent } from "@vehiverze/ui/card"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "New Luxury Cars | Vehiverze",
  description: "Explore the latest luxury car models with best deals and financing options at Vehiverze.",
}

const luxuryCars = [
  {
    id: 1,
    name: "Mercedes-Benz C-Class",
    image: "/placeholder.svg?height=200&width=300",
    price: "₹57.00 - 63.00 Lakh",
    mileage: "14.39 - 23.00 kmpl",
    engine: "1496 - 1993 cc",
    transmission: "Automatic",
    features: ["MBUX Infotainment", "64-Color Ambient Lighting", "Burmester Sound System"],
  },
  {
    id: 2,
    name: "BMW 3 Series",
    image: "/placeholder.svg?height=200&width=300",
    price: "₹59.00 - 65.00 Lakh",
    mileage: "16.13 - 20.37 kmpl",
    engine: "1995 - 1998 cc",
    transmission: "Automatic",
    features: ["BMW Live Cockpit", "Gesture Control", "Harman Kardon Surround Sound"],
  },
  {
    id: 3,
    name: "Audi A4",
    image: "/placeholder.svg?height=200&width=300",
    price: "₹43.85 - 51.85 Lakh",
    mileage: "17.42 kmpl",
    engine: "1984 cc",
    transmission: "Automatic",
    features: ["Audi Virtual Cockpit", "Bang & Olufsen Sound System", "Ambient Lighting"],
  },
  {
    id: 4,
    name: "Lexus ES",
    image: "/placeholder.svg?height=200&width=300",
    price: "₹59.71 - 65.81 Lakh",
    mileage: "16.78 - 22.37 kmpl",
    engine: "2487 cc",
    transmission: "Automatic",
    features: ["Hybrid Engine", "Mark Levinson Audio", "Heads-Up Display"],
  },
  {
    id: 5,
    name: "Volvo S90",
    image: "/placeholder.svg?height=200&width=300",
    price: "₹66.90 Lakh",
    mileage: "17.90 kmpl",
    engine: "1969 cc",
    transmission: "Automatic",
    features: ["Bowers & Wilkins Audio", "Air Suspension", "ADAS"],
  },
  {
    id: 6,
    name: "Jaguar XF",
    image: "/placeholder.svg?height=200&width=300",
    price: "₹71.60 - 76.00 Lakh",
    mileage: "13.12 - 19.33 kmpl",
    engine: "1997 cc",
    transmission: "Automatic",
    features: ["Meridian Sound System", "Interactive Driver Display", "ClearSight Interior Mirror"],
  },
]

export default function LuxuryPage() {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "New Cars", href: "/buy/new-cars" },
            { label: "Luxury", href: "/new-cars/luxury" },
          ]}
        />

        <div className="flex flex-col space-y-6 mt-6">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold">New Luxury Cars in India</h1>
            <p className="text-gray-600">
              Explore the latest luxury car models with best deals and financing options at Vehiverze
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {luxuryCars.map((car) => (
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



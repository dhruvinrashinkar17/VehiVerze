import { VehicleModelsDisplay } from "@/components/vehicle-models-display"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "New Honda Sedan Cars | Vehiverze",
  description: "Explore new Honda sedan models with latest features and competitive pricing.",
}

const hondaSedanModels = [
  {
    id: "honda-city-1",
    name: "Honda City 2024",
    brand: "Honda",
    price: 1150000,
    originalPrice: 1250000,
    discount: 8,
    image: "/honda-city-2024.jpg",
    year: 2024,
    fuelType: "Petrol",
    transmission: "Automatic",
    mileage: "18 km/l",
    features: ["Sunroof", "Touchscreen", "Cruise Control", "Rear Camera", "ABS"],
    rating: 4.5,
    reviews: 245,
    location: "Mumbai",
    verified: true,
  },
  {
    id: "honda-city-2",
    name: "Honda City 2023",
    brand: "Honda",
    price: 1050000,
    originalPrice: 1150000,
    discount: 9,
    image: "/honda-city-2023.jpg",
    year: 2023,
    fuelType: "Petrol",
    transmission: "Manual",
    mileage: "17 km/l",
    features: ["Touchscreen", "Power Steering", "ABS", "Airbags"],
    rating: 4.4,
    reviews: 189,
    location: "Delhi",
    verified: true,
  },
  {
    id: "honda-accord-1",
    name: "Honda Accord 2024",
    brand: "Honda",
    price: 3500000,
    originalPrice: 3800000,
    discount: 8,
    image: "/honda-accord-2024.jpg",
    year: 2024,
    fuelType: "Petrol",
    transmission: "Automatic",
    mileage: "15 km/l",
    features: ["Sunroof", "Leather Seats", "Touchscreen", "Cruise Control", "Panoramic Sunroof"],
    rating: 4.6,
    reviews: 156,
    location: "Bangalore",
    verified: true,
  },
  {
    id: "honda-accord-2",
    name: "Honda Accord 2022",
    brand: "Honda",
    price: 3200000,
    originalPrice: 3500000,
    discount: 9,
    image: "/honda-accord-2022.jpg",
    year: 2022,
    fuelType: "Petrol",
    transmission: "Automatic",
    mileage: "14 km/l",
    features: ["Leather Seats", "Touchscreen", "Cruise Control", "ABS"],
    rating: 4.5,
    reviews: 134,
    location: "Pune",
    verified: true,
  },
  {
    id: "honda-civic-1",
    name: "Honda Civic 2023",
    brand: "Honda",
    price: 1800000,
    originalPrice: 2000000,
    discount: 10,
    image: "/honda-civic-2023.jpg",
    year: 2023,
    fuelType: "Petrol",
    transmission: "Automatic",
    mileage: "16 km/l",
    features: ["Sunroof", "Touchscreen", "Cruise Control", "Rear Camera"],
    rating: 4.5,
    reviews: 198,
    location: "Hyderabad",
    verified: true,
  },
  {
    id: "honda-civic-2",
    name: "Honda Civic 2022",
    brand: "Honda",
    price: 1650000,
    originalPrice: 1850000,
    discount: 11,
    image: "/honda-civic-2022.jpg",
    year: 2022,
    fuelType: "Petrol",
    transmission: "Manual",
    mileage: "15 km/l",
    features: ["Touchscreen", "Power Steering", "ABS", "Airbags"],
    rating: 4.4,
    reviews: 167,
    location: "Chennai",
    verified: true,
  },
]

export default function HondaSedanModelsPage() {
  return (
    <VehicleModelsDisplay
      brand="Honda"
      carType="Sedan"
      models={hondaSedanModels}
      backLink="/new-vehicles/4-wheeler/sedan/brands"
    />
  )
}



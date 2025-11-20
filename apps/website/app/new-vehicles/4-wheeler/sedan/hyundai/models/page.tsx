import { VehicleModelsDisplay } from "@/components/vehicle-models-display"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "New Hyundai Sedan Cars | Vehiverze",
  description: "Explore new Hyundai sedan models with latest features and competitive pricing.",
}

const hyundaiSedanModels = [
  {
    id: "hyundai-verna-1",
    name: "Hyundai Verna 2024",
    brand: "Hyundai",
    price: 950000,
    originalPrice: 1050000,
    discount: 10,
    image: "/hyundai-verna-2024.jpg",
    year: 2024,
    fuelType: "Petrol",
    transmission: "Automatic",
    mileage: "19 km/l",
    features: ["Touchscreen", "Cruise Control", "Rear Camera", "ABS", "Airbags"],
    rating: 4.3,
    reviews: 312,
    location: "Mumbai",
    verified: true,
  },
  {
    id: "hyundai-verna-2",
    name: "Hyundai Verna 2023",
    brand: "Hyundai",
    price: 880000,
    originalPrice: 980000,
    discount: 10,
    image: "/hyundai-verna-2023.jpg",
    year: 2023,
    fuelType: "Diesel",
    transmission: "Manual",
    mileage: "23 km/l",
    features: ["Power Steering", "ABS", "Airbags"],
    rating: 4.2,
    reviews: 278,
    location: "Delhi",
    verified: true,
  },
  {
    id: "hyundai-elantra-1",
    name: "Hyundai Elantra 2024",
    brand: "Hyundai",
    price: 1650000,
    originalPrice: 1850000,
    discount: 11,
    image: "/hyundai-elantra-2024.jpg",
    year: 2024,
    fuelType: "Petrol",
    transmission: "Automatic",
    mileage: "17 km/l",
    features: ["Sunroof", "Touchscreen", "Cruise Control", "Rear Camera", "Panoramic Sunroof"],
    rating: 4.4,
    reviews: 201,
    location: "Bangalore",
    verified: true,
  },
  {
    id: "hyundai-elantra-2",
    name: "Hyundai Elantra 2023",
    brand: "Hyundai",
    price: 1550000,
    originalPrice: 1750000,
    discount: 11,
    image: "/hyundai-elantra-2023.jpg",
    year: 2023,
    fuelType: "Petrol",
    transmission: "Manual",
    mileage: "16 km/l",
    features: ["Touchscreen", "Cruise Control", "Rear Camera", "ABS"],
    rating: 4.3,
    reviews: 189,
    location: "Pune",
    verified: true,
  },
]

export default function HyundaiSedanModelsPage() {
  return (
    <VehicleModelsDisplay
      brand="Hyundai"
      carType="Sedan"
      models={hyundaiSedanModels}
      backLink="/new-vehicles/4-wheeler/sedan/brands"
    />
  )
}



import type { Metadata } from "next";
import { VehicleDetailsPage } from "@/components/vehicle-details-page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  // In a real app, fetch vehicle data from API
  const { id: vehicleId } = await params;
  const vehicleData: Record<string, any> = {
    "1": {
      name: "Honda Activa 6G",
      type: "2-wheeler",
      price: 75000,
      description: "Popular scooter with reliability and fuel efficiency",
    },
    "2": {
      name: "Bajaj RE Auto Rickshaw",
      type: "3-wheeler",
      price: 250000,
      description: "Reliable three-wheeler for commercial use",
    },
    "3": {
      name: "Maruti Suzuki Swift",
      type: "4-wheeler",
      price: 700000,
      description: "Popular hatchback with sporty design and fuel efficiency",
    },
    "4": {
      name: "Tata 407",
      type: "6-wheeler",
      price: 1500000,
      description: "Light commercial vehicle for business needs",
    },
    "5": {
      name: "Tata Prima",
      type: "8-wheeler",
      price: 3500000,
      description: "Heavy-duty truck for long-haul transportation",
    },
  };

  const vehicle = vehicleData[vehicleId] || vehicleData["1"];

  return {
    title: `Buy ${vehicle.name} | ₹${vehicle.price.toLocaleString()} | Vehiverze`,
    description: `${vehicle.description}. Buy ${vehicle.name} online with instant financing, free delivery, and hassle-free RC transfer. Verified seller, 7-day return policy.`,
    keywords: `buy ${vehicle.name}, ${vehicle.name} price, used ${vehicle.name}, ${vehicle.name} for sale, ${vehicle.type} for sale`,
    openGraph: {
      title: `Buy ${vehicle.name} | Vehiverze`,
      description: `${vehicle.description}. Buy with instant financing and free delivery.`,
      type: "website",
      url: `https://vehiverze.com/buy/vehicle-details/${vehicleId}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `Buy ${vehicle.name} | Vehiverze`,
      description: `${vehicle.description}. Instant financing available.`,
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://vehiverze.com/buy/vehicle-details/${vehicleId}`,
    },
  };
}

export default function VehicleDetails({ params }: { params: { id: string } }) {
  return <VehicleDetailsPage vehicleId={params.id} />;
}

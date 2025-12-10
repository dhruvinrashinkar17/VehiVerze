import { NewVehicleSubcategoryContent } from "@/components/new-vehicle-subcategory-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Hatchback Cars | 4-Wheeler Personal Vehicles | Vehiverze",
  description:
    "Explore our collection of brand new hatchback cars with great fuel efficiency and compact design.",
};

export default function NewHatchbackPage() {
  return (
    <NewVehicleSubcategoryContent vehicleType="4-wheeler" category="cars" />
  );
}

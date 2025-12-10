import { NewVehicleSubcategoryContent } from "@/components/new-vehicle-subcategory-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "New SUV Cars | 4-Wheeler Personal Vehicles | Vehiverze",
  description:
    "Explore our collection of brand new SUV cars with spacious interiors and powerful performance.",
};

export default function NewSUVPage() {
  return (
    <NewVehicleSubcategoryContent vehicleType="4-wheeler" category="cars" />
  );
}

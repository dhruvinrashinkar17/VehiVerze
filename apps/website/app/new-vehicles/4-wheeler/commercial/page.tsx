import { NewVehicleSubcategoryContent } from "@/components/new-vehicle-subcategory-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Commercial Vehicles | 4-Wheeler Business Vehicles | Vehiverze",
  description:
    "Explore our collection of brand new commercial vehicles including mini trucks, pickup trucks, vans, and buses.",
};

export default function NewCommercialPage() {
  return (
    <NewVehicleSubcategoryContent
      vehicleType="4-wheeler"
      category="commercial"
    />
  );
}

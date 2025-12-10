import type { InspectionResult } from "./inspection-questions";

export type VehicleType =
  | "2 Wheeler"
  | "3 Wheeler"
  | "4 Wheeler - Cars"
  | "4 Wheeler - Commercial Cars"
  | "4 Wheeler - Trucks"
  | "6 Wheeler"
  | "More Than 8 Wheelers";

export type FuelType = "Petrol" | "Diesel" | "CNG" | "Electric" | "Hybrid";

export type VehicleCondition =
  | "Excellent"
  | "Very Good"
  | "Good"
  | "Average"
  | "Poor";

export interface VehicleProduct {
  id: string;
  type: VehicleType;
  brand: string;
  model: string;
  variant: string;
  year: number;
  fuelType: FuelType;
  kilometers: number;
  location: string;
  basePrice: number;
  currentPrice: number;
  condition: VehicleCondition;
  inspectionScore: number;
  maxInspectionScore: number;
  description: string;
  images: string[];
  status: "active" | "inactive";
  serviceType?: "Buy" | "Sell" | "Garage Service" | "New Vehicle";
  inspectionDate?: string;
  inspectionResults?: InspectionResult[];
  createdAt: string;
  updatedAt: string;
}

export const vehicleBrands: Record<VehicleType, string[]> = {
  "2 Wheeler": [
    "Honda",
    "Hero",
    "Bajaj",
    "TVS",
    "Royal Enfield",
    "Yamaha",
    "Suzuki",
  ],
  "3 Wheeler": ["Bajaj", "Piaggio", "Mahindra", "TVS", "Atul"],
  "4 Wheeler - Cars": [
    "Maruti Suzuki",
    "Hyundai",
    "Tata",
    "Honda",
    "Toyota",
    "Kia",
  ],
  "4 Wheeler - Commercial Cars": [
    "Mahindra",
    "Tata",
    "Force",
    "Isuzu",
    "Ashok Leyland",
  ],
  "4 Wheeler - Trucks": [
    "Tata",
    "Mahindra",
    "Eicher",
    "BharatBenz",
    "Ashok Leyland",
  ],
  "6 Wheeler": ["Tata", "Ashok Leyland", "Eicher", "BharatBenz", "Mahindra"],
  "More Than 8 Wheelers": [
    "Tata",
    "Ashok Leyland",
    "BharatBenz",
    "Eicher",
    "Mahindra",
  ],
};

export const conditionColors: Record<VehicleCondition, string> = {
  Excellent:
    "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  "Very Good":
    "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  Good: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  Average:
    "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
  Poor: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
};

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@vehiverze/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@vehiverze/ui/card";
import { Input } from "@vehiverze/ui/input";
import { Label } from "@vehiverze/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@vehiverze/ui/select";
import { Badge } from "@vehiverze/ui/badge";
import { ArrowRight, Wrench, Clock, MapPin } from "lucide-react";
import { useCityStore } from "@/lib/city-store";

interface VehicleDetails {
  type: string;
  brand: string;
  model: string;
  year: string;
  variant: string;
  transmission: string;
  registrationNumber: string;
}

const vehicleTypes = [
  "2-Wheeler",
  "3-Wheeler",
  "4-Wheeler",
  "6-Wheeler",
  "8+ Wheeler",
];

const vehicleData = {
  "2-Wheeler": {
    brands: ["Honda", "Hero", "Bajaj", "TVS", "Yamaha", "Royal Enfield"],
    models: {
      Honda: ["Activa", "CB Shine", "Dio", "CBR"],
      Hero: ["Splendor", "Passion", "Xtreme", "Maestro"],
      Bajaj: ["Pulsar", "Avenger", "CT", "Platina"],
      TVS: ["Apache", "Jupiter", "Ntorq", "Radeon"],
      Yamaha: ["FZ", "R15", "MT", "Ray"],
      "Royal Enfield": ["Classic", "Bullet", "Himalayan", "Interceptor"],
    },
  },
  "3-Wheeler": {
    brands: ["Bajaj", "TVS", "Mahindra", "Piaggio"],
    models: {
      Bajaj: ["RE Compact", "RE Maxima", "Qute"],
      TVS: ["King", "King Deluxe"],
      Mahindra: ["Alfa", "Treo"],
      Piaggio: ["Ape", "Ape City"],
    },
  },
  "4-Wheeler": {
    brands: ["Maruti", "Hyundai", "Tata", "Honda", "Toyota", "Mahindra"],
    models: {
      Maruti: ["Swift", "Baleno", "Alto", "Wagon R", "Dzire"],
      Hyundai: ["i20", "Creta", "Verna", "Grand i10"],
      Tata: ["Nexon", "Harrier", "Altroz", "Tiago"],
      Honda: ["City", "Amaze", "Jazz", "WR-V"],
      Toyota: ["Innova", "Fortuner", "Glanza", "Urban Cruiser"],
      Mahindra: ["XUV700", "Scorpio", "Thar", "Bolero"],
    },
  },
  "6-Wheeler": {
    brands: ["Tata", "Ashok Leyland", "Mahindra", "Force"],
    models: {
      Tata: ["407", "709", "912"],
      "Ashok Leyland": ["Dost", "Partner", "Boss"],
      Mahindra: ["Bolero Pickup", "Supro"],
      Force: ["Traveller", "Trax"],
    },
  },
  "8+ Wheeler": {
    brands: ["Tata", "Ashok Leyland", "Mahindra", "BharatBenz"],
    models: {
      Tata: ["1613", "2518", "3118"],
      "Ashok Leyland": ["2518", "3118", "4923"],
      Mahindra: ["Blazo", "Furio"],
      BharatBenz: ["1617", "2523", "3528"],
    },
  },
};

const vehicleTypeIcons = {
  "2-Wheeler": "🏍️",
  "3-Wheeler": "🛺",
  "4-Wheeler": "🚗",
  "6-Wheeler": "🚚",
  "8+ Wheeler": "🚛",
};

export default function VehicleSelectionClient() {
  const router = useRouter();
  const { selectedCity } = useCityStore();
  const [vehicleDetails, setVehicleDetails] = useState<VehicleDetails>({
    type: "",
    brand: "",
    model: "",
    year: "",
    variant: "",
    transmission: "",
    registrationNumber: "",
  });

  const updateVehicleDetails = (field: keyof VehicleDetails, value: string) => {
    setVehicleDetails((prev) => ({
      ...prev,
      [field]: value,
      // Reset dependent fields
      ...(field === "type" && {
        brand: "",
        model: "",
        year: "",
        variant: "",
        transmission: "",
      }),
      ...(field === "brand" && {
        model: "",
        year: "",
        variant: "",
        transmission: "",
      }),
      ...(field === "model" && { year: "", variant: "", transmission: "" }),
    }));
  };

  const availableBrands = vehicleDetails.type
    ? vehicleData[vehicleDetails.type as keyof typeof vehicleData]?.brands || []
    : [];

  const availableModels = vehicleDetails.brand
    ? (
        vehicleData[vehicleDetails.type as keyof typeof vehicleData]
          ?.models as Record<string, string[]>
      )?.[vehicleDetails.brand] || []
    : [];

  const canProceed = () => {
    return (
      vehicleDetails.type &&
      vehicleDetails.brand &&
      vehicleDetails.model &&
      vehicleDetails.registrationNumber
    );
  };

  const handleNext = () => {
    if (canProceed()) {
      // Store vehicle details in localStorage for next page
      localStorage.setItem("vehicleDetails", JSON.stringify(vehicleDetails));
      router.push("/garage-services/service-selection");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <h1 className="text-4xl font-bold text-gray-900">
              Vehicle Details
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Tell us about your vehicle to get started
          </p>
          <div className="flex items-center justify-center gap-2 mt-2 text-sm text-gray-500">
            <MapPin className="h-4 w-4" />
            <span>Service available in {selectedCity}</span>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-[#1D4ED8] text-white rounded-full flex items-center justify-center text-sm font-medium">
                1
              </div>
              <span className="ml-2 text-sm font-medium text-[#1D4ED8]">
                Vehicle Details
              </span>
            </div>
            <div className="w-8 h-px bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center text-sm font-medium">
                2
              </div>
              <span className="ml-2 text-sm text-gray-500">
                Service Selection
              </span>
            </div>
            <div className="w-8 h-px bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center text-sm font-medium">
                3
              </div>
              <span className="ml-2 text-sm text-gray-500">
                Booking Details
              </span>
            </div>
            <div className="w-8 h-px bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center text-sm font-medium">
                4
              </div>
              <span className="ml-2 text-sm text-gray-500">Checkout</span>
            </div>
          </div>
        </div>

        {/* Vehicle Type Selection */}
        <Card className="mb-8 shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-[#1D4ED8] to-[#1e40af] text-white rounded-t-lg">
            <CardTitle className="text-xl">Select Your Vehicle Type</CardTitle>
            <CardDescription className="text-blue-100">
              Choose the category that best matches your vehicle
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {vehicleTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => updateVehicleDetails("type", type)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
                    vehicleDetails.type === type
                      ? "border-[#1D4ED8] bg-blue-50 shadow-md"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="text-3xl mb-2">
                    {vehicleTypeIcons[type as keyof typeof vehicleTypeIcons]}
                  </div>
                  <div className="text-sm font-medium text-center text-card">
                    {type}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Vehicle Details Form */}
        {vehicleDetails.type && (
          <Card className="mb-8 shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-[#1D4ED8] to-blue-700 text-white rounded-t-lg">
              <CardTitle className="text-xl">Vehicle Information</CardTitle>
              <CardDescription className="text-blue-100">
                Provide details about your {vehicleDetails.type}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="brand" className="text-sm font-medium">
                    Brand *
                  </Label>
                  <Select
                    value={vehicleDetails.brand}
                    onValueChange={(value) =>
                      updateVehicleDetails("brand", value)
                    }
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableBrands.map((brand) => (
                        <SelectItem key={brand} value={brand}>
                          {brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="model" className="text-sm font-medium">
                    Model *
                  </Label>
                  <Select
                    value={vehicleDetails.model}
                    onValueChange={(value) =>
                      updateVehicleDetails("model", value)
                    }
                    disabled={!vehicleDetails.brand}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableModels.map((model) => (
                        <SelectItem key={model} value={model}>
                          {model}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="year" className="text-sm font-medium">
                    Year
                  </Label>
                  <Select
                    value={vehicleDetails.year}
                    onValueChange={(value) =>
                      updateVehicleDetails("year", value)
                    }
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 25 }, (_, i) => 2024 - i).map(
                        (year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="transmission" className="text-sm font-medium">
                    Transmission
                  </Label>
                  <Select
                    value={vehicleDetails.transmission}
                    onValueChange={(value) =>
                      updateVehicleDetails("transmission", value)
                    }
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select transmission" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manual">Manual</SelectItem>
                      <SelectItem value="automatic">Automatic</SelectItem>
                      <SelectItem value="cvt">CVT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="variant" className="text-sm font-medium">
                    Variant
                  </Label>
                  <Input
                    placeholder="e.g., VXi, ZXi, LXi"
                    value={vehicleDetails.variant}
                    onChange={(e) =>
                      updateVehicleDetails("variant", e.target.value)
                    }
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="registrationNumber"
                    className="text-sm font-medium"
                  >
                    Registration Number *
                  </Label>
                  <Input
                    placeholder="e.g., DL01AB1234"
                    value={vehicleDetails.registrationNumber}
                    onChange={(e) =>
                      updateVehicleDetails(
                        "registrationNumber",
                        e.target.value.toUpperCase()
                      )
                    }
                    className="uppercase h-12 font-mono"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Service Preview */}
        {vehicleDetails.type && (
          <Card className="mb-8 shadow-lg border-0 bg-gradient-to-r from-green-50 to-emerald-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Wrench className="h-6 w-6 text-[#1D4ED8]" />
                <h3 className="text-lg font-semibold text-[#1D4ED8]">
                  Available Services
                </h3>
              </div>
              <p className="mb-4 text-[#1D4ED8]">
                Great choice! We offer comprehensive services for{" "}
                {vehicleDetails.type}s including:
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800"
                >
                  <Clock className="h-3 w-3 mr-1" />
                  Quick Service
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-[#1D4ED8]"
                >
                  Professional Technicians
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-purple-100 text-purple-800"
                >
                  Genuine Parts
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-orange-100 text-orange-800"
                >
                  Warranty Included
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => router.push("/")}
            className="px-6 py-3"
          >
            Back to Home
          </Button>

          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="px-8 py-3 bg-gradient-to-r from-[#1D4ED8] to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white font-medium"
          >
            Continue to Services
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

"use client";

import type React from "react";

import { useState } from "react";
import { useEffect } from "react";
import { CheckCircle, Shield, Settings, Car, Truck } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@vehiverze/ui/button";
import { Input } from "@vehiverze/ui/input";
import { Label } from "@vehiverze/ui/label";
import { CitySelector } from "@/components/city-selector";
import { YearSelector } from "@/components/year-selector";
import { ModelSelector } from "@/components/model-selector";
import { FuelTypeSelector } from "@/components/fuel-type-selector";
import { VariantSelector } from "@/components/variant-selector";
import { KilometersSelector } from "@/components/kilometers-selector";
import { SellingTimelineSelector } from "@/components/selling-timeline-selector";
import { OtpVerificationFlow } from "@/components/otp-verification-flow";

type VehicleType =
  | "2-wheeler"
  | "3-wheeler"
  | "4-wheeler"
  | "6-wheeler"
  | "8-wheeler";
type VehicleSubType = "car" | "commercial" | "truck" | null;

type Step =
  | "registration"
  | "brand"
  | "model"
  | "year"
  | "variant"
  | "fuel"
  | "kilometers"
  | "city"
  | "timeline"
  | "contact"
  | "otp"
  | "summary";

interface Brand {
  name: string;
  logo: string;
}

interface UnifiedSellFlowProps {
  vehicleType: VehicleType;
  brands: Brand[];
  vehicleTypeName: string;
  icon: string;
}

export function UnifiedSellFlow({
  vehicleType,
  brands,
  vehicleTypeName,
  icon,
}: UnifiedSellFlowProps) {
  const [step, setStep] = useState<Step>("registration");
  const [vehicleSubType, setVehicleSubType] = useState<VehicleSubType>(
    vehicleType === "4-wheeler" ? "car" : null
  );
  const [formData, setFormData] = useState({
    registrationNumber: "",
    brand: "",
    model: "",
    year: "",
    variant: "",
    fuelType: "",
    kilometers: "",
    city: "",
    timeline: "",
    phone: "",
    name: "",
    email: "",
  });
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const router = useRouter();

  // Define truck brands
  const truckBrands = [
    { name: "Tata", logo: "/placeholder.svg" },
    { name: "Ashok Leyland", logo: "/placeholder.svg" },
    { name: "Eicher", logo: "/placeholder.svg" },
    { name: "BharatBenz", logo: "/placeholder.svg" },
    { name: "Mahindra", logo: "/placeholder.svg" },
    { name: "Force", logo: "/placeholder.svg" },
  ];

  // Get current brands based on vehicle subtype
  const getCurrentBrands = () => {
    if (vehicleType === "4-wheeler" && vehicleSubType === "truck") {
      return truckBrands;
    }
    return brands;
  };

  const updateFormData = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleRegistrationSubmit = () => {
    if (formData.registrationNumber) {
      // In a real app, we would fetch vehicle details based on registration number
      // For now, we'll just move to the next step
      setStep("city");
    }
  };

  const handleBrandSelect = (brandName: string) => {
    updateFormData("brand", brandName);
    setStep("model");
  };

  const handleModelSelect = (model: string) => {
    updateFormData("model", model);
    setStep("year");
  };

  const handleYearSelect = (year: string) => {
    updateFormData("year", year);
    setStep("variant");
  };

  const handleVariantSelect = (variant: string) => {
    updateFormData("variant", variant);
    setStep("fuel");
  };

  const handleFuelTypeSelect = (fuelType: string) => {
    updateFormData("fuelType", fuelType);
    setStep("kilometers");
  };

  const handleKilometersSelect = (kilometers: string) => {
    updateFormData("kilometers", kilometers);
    setStep("city");
  };

  const handleCitySelect = (city: string) => {
    updateFormData("city", city);
    setStep("timeline");
  };

  const handleTimelineSelect = (timeline: string) => {
    updateFormData("timeline", timeline);
    setStep("contact");
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("otp");
  };

  const handleOtpVerified = () => {
    setIsOtpVerified(true);
    setStep("summary");
  };

  const handleSubmitSummary = () => {
    // In a real app, we would submit all data to the backend
    router.push(`/sell/checkout?type=${vehicleType}`);
  };

  const renderStepIndicator = () => {
    const steps = [
      { id: "registration", label: "Vehicle Info" },
      { id: "city", label: "Location" },
      { id: "contact", label: "Contact" },
      { id: "summary", label: "Summary" },
    ];

    const getCurrentStepIndex = () => {
      if (
        [
          "registration",
          "brand",
          "model",
          "year",
          "variant",
          "fuel",
          "kilometers",
        ].includes(step)
      ) {
        return 0;
      } else if (["city", "timeline"].includes(step)) {
        return 1;
      } else if (["contact", "otp"].includes(step)) {
        return 2;
      } else {
        return 3;
      }
    };

    const currentIndex = getCurrentStepIndex();

    return (
      <div className="flex justify-between mb-8 px-4">
        {steps.map((s, index) => (
          <div key={s.id} className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                index <= currentIndex
                  ? "bg-[#4ADE80] text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              {index + 1}
            </div>
            <span
              className={index <= currentIndex ? "text-black" : "text-gray-400"}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const PriceEstimateSection = () => {
    const [selectedCondition, setSelectedCondition] = useState("excellent");
    const [animatePrice, setAnimatePrice] = useState(false);

    // Price ranges for different conditions
    const priceRanges = {
      fair: { min: "₹5,84,280", max: "₹6,63,981" },
      good: { min: "₹6,55,442", max: "₹7,89,227" },
      veryGood: { min: "₹7,83,534", max: "₹8,54,696" },
      excellent: { min: "₹8,40,464", max: "₹8,68,929" },
    };

    // Animate price on condition change
    useEffect(() => {
      setAnimatePrice(true);
      const timer = setTimeout(() => setAnimatePrice(false), 500);
      return () => clearTimeout(timer);
    }, [selectedCondition]);

    // Get current price range based on selected condition
    const getCurrentPriceRange = () => {
      return priceRanges[selectedCondition];
    };

    // Benefits data
    const benefits = [
      {
        icon: <CheckCircle className="text-green-500" />,
        text: "Free home inspection",
      },
      {
        icon: <Shield className="text-blue-500" />,
        text: "Secure payment guarantee",
      },
      {
        icon: <Settings className="text-orange-500" />,
        text: "Professional evaluation",
      },
    ];

    // Condition options
    const conditionOptions = [
      { value: "fair", label: "Fair" },
      { value: "good", label: "Good" },
      { value: "veryGood", label: "Very Good" },
      { value: "excellent", label: "Excellent" },
    ];

    return (
      <div className="bg-black text-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-2">Price Estimate</h1>
        <p className="mb-6">
          Get an instant estimate based on your vehicle condition
        </p>

        {/* Condition selector */}
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            {conditionOptions.map((option) => (
              <div key={option.value} className="w-1/4 text-center">
                <button
                  onClick={() => setSelectedCondition(option.value)}
                  className={`w-full py-2 transition-all duration-300 ${selectedCondition === option.value ? "border-b-2 border-orange-500 font-bold" : "hover:text-gray-400"}`}
                >
                  {option.label}
                </button>
              </div>
            ))}
          </div>

          {/* Slider visualization */}
          <div className="relative h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full mb-8">
            {/* Slider markers */}
            {conditionOptions.map((option, index) => (
              <div
                key={option.value}
                className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white bg-blue-500"
                style={{
                  left:
                    index === 0
                      ? "0%"
                      : index === 1
                        ? "33.3%"
                        : index === 2
                          ? "66.6%"
                          : "100%",
                  marginLeft: index === 3 ? "-4px" : "0",
                }}
              ></div>
            ))}

            {/* Position marker based on selected condition */}
            <div
              className={`absolute top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full bg-orange-500 border-2 border-white shadow-lg z-10 transition-all duration-500 ${animatePrice ? "scale-125" : ""}`}
              style={{
                left:
                  selectedCondition === "fair"
                    ? "0%"
                    : selectedCondition === "good"
                      ? "33.3%"
                      : selectedCondition === "veryGood"
                        ? "66.6%"
                        : "100%",
                marginLeft:
                  selectedCondition === "excellent" ? "-12px" : "-6px",
              }}
            ></div>
          </div>
        </div>

        {/* Price range */}
        <div
          className={`bg-gray-800 p-6 rounded-lg mb-8 border border-gray-600 transition-all duration-300 ${
            animatePrice ? "scale-105" : ""
          }`}
        >
          <h3 className="text-3xl font-bold mb-3 flex items-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
              {getCurrentPriceRange().min} - {getCurrentPriceRange().max}
            </span>
            <span className="ml-2 text-green-400 text-lg font-normal">
              Best Value
            </span>
          </h3>
          <p className="flex items-center">
            <CheckCircle size={16} className="text-green-400 mr-2" />
            You may get a better price upon inspection
          </p>
        </div>

        {/* Benefits section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-900 p-3 rounded-lg"
            >
              <div className="mr-3">{benefit.icon}</div>
              <p className="text-sm font-medium">{benefit.text}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
      {renderStepIndicator()}

      {step === "registration" && (
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-black">
              Sell your {vehicleTypeName}{" "}
              <span className="text-green-600">at the best price</span>
            </h1>
            <p className="text-xl text-gray-600">2x Faster Process</p>
            <div className="text-6xl flex justify-center">
              {typeof icon === "string" ? (
                icon
              ) : (
                <img
                  src="/placeholder.svg?height=80&width=80"
                  alt="Vehicle icon"
                  className="h-20 w-auto"
                />
              )}
            </div>
          </div>

          {vehicleType === "4-wheeler" && (
            <div className="max-w-2xl mx-auto space-y-4">
              <h2 className="text-xl font-medium text-center">
                Select your 4 Wheeler type
              </h2>
              <div className="flex justify-center gap-4 flex-wrap">
                <button
                  onClick={() => setVehicleSubType("car")}
                  className={`flex items-center px-6 py-3 rounded-lg ${
                    vehicleSubType === "car"
                      ? "bg-green-100 border border-green-500 text-green-700"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                  }`}
                >
                  <Car className="mr-2 h-5 w-5" />
                  Car
                </button>
                <button
                  onClick={() => setVehicleSubType("commercial")}
                  className={`flex items-center px-6 py-3 rounded-lg ${
                    vehicleSubType === "commercial"
                      ? "bg-green-100 border border-green-500 text-green-700"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                  }`}
                >
                  <Car className="mr-2 h-5 w-5" />
                  Commercial Car
                </button>
                <button
                  onClick={() => setVehicleSubType("truck")}
                  className={`flex items-center px-6 py-3 rounded-lg ${
                    vehicleSubType === "truck"
                      ? "bg-green-100 border border-green-500 text-green-700"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                  }`}
                >
                  <Truck className="mr-2 h-5 w-5" />
                  Truck
                </button>
              </div>
            </div>
          )}

          <div className="max-w-2xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row gap-2">
              <input
                type="text"
                placeholder={`Enter your ${vehicleTypeName} registration number`}
                value={formData.registrationNumber}
                onChange={(e) =>
                  updateFormData("registrationNumber", e.target.value)
                }
                className="flex-grow px-6 py-4 rounded-lg bg-gray-100 text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <Button
                onClick={handleRegistrationSubmit}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-4 h-auto"
              >
                Get Your {vehicleTypeName} Price
              </Button>
            </div>

            <div className="text-center">
              <p className="text-gray-600 mb-4">Or</p>
              <h2 className="text-xl mb-6 text-black">
                Select your {vehicleTypeName} brand to get started
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {getCurrentBrands().map((brand) => (
                  <button
                    key={brand.name}
                    onClick={() => handleBrandSelect(brand.name)}
                    className="p-4 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-black"
                  >
                    <Image
                      src={brand.logo || "/placeholder.svg"}
                      alt={brand.name}
                      width={100}
                      height={50}
                      className="mx-auto mb-2"
                    />
                    <span className="text-sm">{brand.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {step === "model" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">
            Select {vehicleTypeName} Model
          </h2>
          <ModelSelector
            brand={formData.brand}
            onSelect={handleModelSelect}
            vehicleType={vehicleType}
          />
          <Button
            onClick={() => setStep("registration")}
            variant="outline"
            className="mt-4"
          >
            Back
          </Button>
        </div>
      )}

      {step === "year" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">
            Select Manufacturing Year
          </h2>
          <YearSelector onSelect={handleYearSelect} />
          <Button
            onClick={() => setStep("model")}
            variant="outline"
            className="mt-4"
          >
            Back
          </Button>
        </div>
      )}

      {step === "variant" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Select Variant</h2>
          <VariantSelector
            model={formData.model}
            onSelect={handleVariantSelect}
          />
          <Button
            onClick={() => setStep("year")}
            variant="outline"
            className="mt-4"
          >
            Back
          </Button>
        </div>
      )}

      {step === "fuel" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Select Fuel Type</h2>
          <FuelTypeSelector onSelect={handleFuelTypeSelect} />
          <Button
            onClick={() => setStep("variant")}
            variant="outline"
            className="mt-4"
          >
            Back
          </Button>
        </div>
      )}

      {step === "kilometers" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">
            Enter Kilometers Driven
          </h2>
          <KilometersSelector onSelect={handleKilometersSelect} />
          <Button
            onClick={() => setStep("fuel")}
            variant="outline"
            className="mt-4"
          >
            Back
          </Button>
        </div>
      )}

      {step === "city" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Select Your City</h2>
          <CitySelector onSelect={handleCitySelect} />
          <Button
            onClick={() =>
              setStep(
                formData.registrationNumber ? "registration" : "kilometers"
              )
            }
            variant="outline"
            className="mt-4"
          >
            Back
          </Button>
        </div>
      )}

      {step === "timeline" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">
            When are you planning to sell?
          </h2>
          <SellingTimelineSelector onSelect={handleTimelineSelect} />
          <Button
            onClick={() => setStep("city")}
            variant="outline"
            className="mt-4"
          >
            Back
          </Button>
        </div>
      )}

      {step === "contact" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">
            Your Contact Information
          </h2>
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => updateFormData("name", e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
                placeholder="Enter your email address"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => updateFormData("phone", e.target.value)}
                placeholder="Enter your phone number"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Continue
            </Button>
          </form>
          <Button
            onClick={() => setStep("timeline")}
            variant="outline"
            className="mt-4"
          >
            Back
          </Button>
        </div>
      )}

      {step === "otp" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">
            Verify Your Phone Number
          </h2>
          <OtpVerificationFlow
            phone={formData.phone}
            onVerified={handleOtpVerified}
          />
          <Button
            onClick={() => setStep("contact")}
            variant="outline"
            className="mt-4"
          >
            Back
          </Button>
        </div>
      )}

      {step === "summary" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Vehicle Summary</h2>
          <div className="bg-black/20 p-6 rounded-lg space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400">Vehicle Type</p>
                <p className="font-semibold">{vehicleTypeName}</p>
              </div>
              {vehicleType === "4-wheeler" && vehicleSubType && (
                <div>
                  <p className="text-gray-400">Vehicle Subtype</p>
                  <p className="font-semibold">
                    {vehicleSubType === "car"
                      ? "Car"
                      : vehicleSubType === "commercial"
                        ? "Commercial Car"
                        : "Truck"}
                  </p>
                </div>
              )}
              {formData.brand && (
                <div>
                  <p className="text-gray-400">Brand</p>
                  <p className="font-semibold">{formData.brand}</p>
                </div>
              )}
              {formData.model && (
                <div>
                  <p className="text-gray-400">Model</p>
                  <p className="font-semibold">{formData.model}</p>
                </div>
              )}
              {formData.year && (
                <div>
                  <p className="text-gray-400">Year</p>
                  <p className="font-semibold">{formData.year}</p>
                </div>
              )}
              {formData.variant && (
                <div>
                  <p className="text-gray-400">Variant</p>
                  <p className="font-semibold">{formData.variant}</p>
                </div>
              )}
              {formData.fuelType && (
                <div>
                  <p className="text-gray-400">Fuel Type</p>
                  <p className="font-semibold">{formData.fuelType}</p>
                </div>
              )}
              {formData.kilometers && (
                <div>
                  <p className="text-gray-400">Kilometers</p>
                  <p className="font-semibold">{formData.kilometers}</p>
                </div>
              )}
              {formData.city && (
                <div>
                  <p className="text-gray-400">City</p>
                  <p className="font-semibold">{formData.city}</p>
                </div>
              )}
              {formData.timeline && (
                <div>
                  <p className="text-gray-400">Selling Timeline</p>
                  <p className="font-semibold">{formData.timeline}</p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-gray-600">
              <h3 className="text-xl font-semibold mb-4">
                Contact Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400">Name</p>
                  <p className="font-semibold">{formData.name}</p>
                </div>
                <div>
                  <p className="text-gray-400">Phone</p>
                  <p className="font-semibold">{formData.phone}</p>
                </div>
                <div>
                  <p className="text-gray-400">Email</p>
                  <p className="font-semibold">{formData.email}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-600">
              <PriceEstimateSection />
            </div>
          </div>

          <div className="flex justify-between">
            <Button onClick={() => setStep("otp")} variant="outline">
              Back
            </Button>
            <Button
              onClick={handleSubmitSummary}
              className="bg-[#4ADE80] hover:bg-[#4ADE80]/90"
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

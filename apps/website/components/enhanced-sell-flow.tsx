"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  CheckCircle,
  Shield,
  Settings,
  Car,
  Truck,
  ChevronRight,
  ArrowRight,
  Search,
  Clock,
  MapPin,
  Calendar,
  Phone,
  Users,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@vehiverze/ui/button";
import { Input } from "@vehiverze/ui/input";
import { cn } from "@vehiverze/shared-utils/cn";

// Define types
type VehicleType =
  | "2-wheeler"
  | "3-wheeler"
  | "4-wheeler"
  | "6-wheeler"
  | "8-wheeler";
type VehicleSubType = "car" | "commercial" | "truck" | "bus" | null;
type Step =
  | "brand"
  | "model"
  | "year"
  | "variant"
  | "ownership"
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
  popular?: boolean;
}

interface EnhancedSellFlowProps {
  vehicleType: VehicleType;
  brands: Brand[];
  vehicleTypeName: string;
  icon?: string;
}

export function EnhancedSellFlow({
  vehicleType,
  brands,
  vehicleTypeName,
  icon = "🚗",
}: EnhancedSellFlowProps) {
  const [step, setStep] = useState<Step>("brand");
  const [vehicleSubType, setVehicleSubType] = useState<VehicleSubType>(
    vehicleType === "4-wheeler" ? "car" : null
  );
  const [formData, setFormData] = useState({
    registrationNumber: "",
    brand: "",
    model: "",
    year: "",
    variant: "",
    ownership: "",
    fuelType: "",
    kilometers: "",
    city: "",
    timeline: "",
    phone: "",
    name: "",
    email: "",
    otp: "",
  });
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [progress, setProgress] = useState(0);
  const [animatePrice, setAnimatePrice] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState("excellent");
  const router = useRouter();

  // Create refs for OTP input fields
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Update progress bar based on current step
  useEffect(() => {
    const stepValues: Record<Step, number> = {
      brand: 9,
      model: 18,
      year: 27,
      variant: 36,
      ownership: 45,
      fuel: 54,
      kilometers: 63,
      city: 72,
      timeline: 81,
      contact: 90,
      otp: 95,
      summary: 100,
    };

    setProgress(stepValues[step]);
  }, [step]);

  // Initialize OTP refs when step changes to OTP
  useEffect(() => {
    if (step === "otp") {
      // Reset OTP refs array
      otpRefs.current = Array(4).fill(null);

      // Focus the first input when the OTP step is shown
      setTimeout(() => {
        if (otpRefs.current[0]) {
          otpRefs.current[0].focus();
        }
      }, 300);
    }
  }, [step]);

  // Animate price on condition change
  useEffect(() => {
    setAnimatePrice(true);
    const timer = setTimeout(() => setAnimatePrice(false), 500);
    return () => clearTimeout(timer);
  }, [selectedCondition]);

  // Price ranges for different conditions
  const priceRanges = {
    fair: { min: "₹5,84,280", max: "₹6,63,981" },
    good: { min: "₹6,55,442", max: "₹7,89,227" },
    veryGood: { min: "₹7,83,534", max: "₹8,54,696" },
    excellent: { min: "₹8,40,464", max: "₹8,68,929" },
  };

  // Get current price range based on selected condition
  const getCurrentPriceRange = () => {
    return (
      priceRanges[selectedCondition as keyof typeof priceRanges] ||
      priceRanges.excellent
    );
  };

  // Update form data
  const updateFormData = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // Handle brand selection
  const handleBrandSelect = (brandName: string) => {
    updateFormData("brand", brandName);
    setStep("model");
  };

  // Handle model selection
  const handleModelSelect = (model: string) => {
    updateFormData("model", model);
    setStep("year");
  };

  // Handle year selection
  const handleYearSelect = (year: string) => {
    updateFormData("year", year);
    setStep("variant");
  };

  // Handle variant selection
  const handleVariantSelect = (variant: string) => {
    updateFormData("variant", variant);
    setStep("ownership");
  };

  // Handle ownership selection
  const handleOwnershipSelect = (ownership: string) => {
    updateFormData("ownership", ownership);
    setStep("fuel");
  };

  // Handle fuel type selection
  const handleFuelTypeSelect = (fuelType: string) => {
    updateFormData("fuelType", fuelType);
    setStep("kilometers");
  };

  // Handle kilometers selection
  const handleKilometersSelect = (kilometers: string) => {
    updateFormData("kilometers", kilometers);
    setStep("city");
  };

  // Handle city selection
  const handleCitySelect = (city: string) => {
    updateFormData("city", city);
    setStep("timeline");
  };

  // Handle timeline selection
  const handleTimelineSelect = (timeline: string) => {
    updateFormData("timeline", timeline);
    setStep("contact");
  };

  // Handle contact form submission
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.phone && formData.email) {
      setStep("otp");
    }
  };

  // Handle OTP input change
  const handleOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;

    // Only allow digits
    if (value && !/^\d+$/.test(value)) {
      return;
    }

    // Update OTP in form data
    const otp = formData.otp.split("");
    otp[index] = value;
    updateFormData("otp", otp.join(""));

    // Auto-focus next input if value is entered
    if (value && index < 3) {
      if (otpRefs.current[index + 1]) {
        otpRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle key down in OTP input
  const handleOtpKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    // Handle backspace to go to previous input
    if (e.key === "Backspace" && !formData.otp[index] && index > 0) {
      if (otpRefs.current[index - 1]) {
        otpRefs.current[index - 1]?.focus();
      }
    }

    // Handle arrow keys for navigation
    if (e.key === "ArrowLeft" && index > 0) {
      if (otpRefs.current[index - 1]) {
        otpRefs.current[index - 1]?.focus();
      }
    }

    if (e.key === "ArrowRight" && index < 3) {
      if (otpRefs.current[index + 1]) {
        otpRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle paste event for OTP
  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();

    // Check if pasted content is a 4-digit number
    if (/^\d{4}$/.test(pastedData)) {
      updateFormData("otp", pastedData);

      // Fill all inputs with respective digits
      for (let i = 0; i < 4; i++) {
        if (otpRefs.current[i]) {
          otpRefs.current[i]!.value = pastedData[i]!;
        }
      }

      // Focus the last input
      if (otpRefs.current[3]) {
        otpRefs.current[3]?.focus();
      }
    }
  };

  // Handle OTP verification
  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.otp.length === 4) {
      setIsOtpVerified(true);
      setStep("summary");
    }
  };

  // Handle final submission
  const handleSubmitSummary = () => {
    // Save data to sessionStorage for use in other components
    try {
      window.sessionStorage.setItem(
        "sellFlowData",
        JSON.stringify({
          vehicleType,
          brand: formData.brand,
          model: formData.model,
          year: formData.year,
          variant: formData.variant,
          ownership: formData.ownership,
          fuelType: formData.fuelType,
          kilometers: formData.kilometers,
          city: formData.city,
        })
      );
    } catch (e) {
      console.error("Error saving sell flow data:", e);
    }

    router.push(`/sell/final-checkout?type=${vehicleType}`);
  };

  // Get vehicle icon
  const getVehicleIcon = () => {
    switch (vehicleType) {
      case "2-wheeler":
        return "🏍️";
      case "3-wheeler":
        return "🛺";
      case "4-wheeler":
        return "🚗";
      case "6-wheeler":
        return "🚚";
      case "8-wheeler":
        return "🚛";
      default:
        return icon;
    }
  };

  // Get formatted vehicle type
  const getFormattedVehicleType = () => {
    switch (vehicleType) {
      case "2-wheeler":
        return "Bike";
      case "3-wheeler":
        return "Auto";
      case "4-wheeler":
        return vehicleSubType === "car"
          ? "Car"
          : vehicleSubType === "commercial"
            ? "Commercial Vehicle"
            : vehicleSubType === "truck"
              ? "Truck"
              : vehicleSubType === "bus"
                ? "Bus"
                : "Vehicle";
      case "6-wheeler":
        return "Medium Truck";
      case "8-wheeler":
        return "Heavy Truck";
      default:
        return vehicleTypeName;
    }
  };

  // Sample models based on brand
  const getModels = (brand: string) => {
    const modelsByBrand: Record<string, string[]> = {
      "Maruti Suzuki": [
        "Swift",
        "Baleno",
        "Dzire",
        "Alto",
        "Wagon R",
        "Ertiga",
        "Brezza",
        "Celerio",
      ],
      Hyundai: [
        "i10",
        "i20",
        "Venue",
        "Creta",
        "Verna",
        "Aura",
        "Alcazar",
        "Tucson",
      ],
      Tata: [
        "Tiago",
        "Nexon",
        "Altroz",
        "Harrier",
        "Safari",
        "Punch",
        "Tigor",
        "Hexa",
      ],
      Mahindra: [
        "XUV700",
        "Thar",
        "Scorpio",
        "XUV300",
        "Bolero",
        "Marazzo",
        "KUV100",
        "TUV300",
      ],
      Honda: [
        "City",
        "Amaze",
        "Jazz",
        "WR-V",
        "Civic",
        "CR-V",
        "Accord",
        "BR-V",
      ],
      Toyota: [
        "Innova",
        "Fortuner",
        "Glanza",
        "Urban Cruiser",
        "Camry",
        "Vellfire",
        "Yaris",
        "Etios",
      ],
      Hero: [
        "Splendor",
        "HF Deluxe",
        "Passion",
        "Glamour",
        "Xtreme",
        "Xpulse",
        "Pleasure",
        "Destini",
      ],
      Bajaj: [
        "Pulsar",
        "Platina",
        "CT",
        "Avenger",
        "Dominar",
        "V",
        "Discover",
        "Chetak",
      ],
      TVS: [
        "Apache",
        "Jupiter",
        "XL",
        "Ntorq",
        "Sport",
        "Star City",
        "Radeon",
        "iQube",
      ],
      "Royal Enfield": [
        "Classic 350",
        "Bullet 350",
        "Meteor",
        "Himalayan",
        "Continental GT",
        "Interceptor",
        "Hunter",
        "Scram",
      ],
      Yamaha: [
        "FZ",
        "R15",
        "MT",
        "Fascino",
        "Ray ZR",
        "FZ-X",
        "Aerox",
        "RayZR",
      ],
      Suzuki: [
        "Access",
        "Burgman",
        "Gixxer",
        "Intruder",
        "Hayabusa",
        "V-Strom",
        "Avenis",
        "Katana",
      ],
      Piaggio: ["Ape", "Porter", "Vespa", "Aprilia"],
      Atul: ["Gem", "Shakti", "Smart", "Elite"],
      "Ashok Leyland": [
        "Dost",
        "Partner",
        "Bada Dost",
        "AVTR",
        "Boss",
        "Captain",
        "Ecomet",
        "Guru",
      ],
      BharatBenz: [
        "1015R",
        "1217C",
        "2823R",
        "3528CM",
        "4023T",
        "4928T",
        "5528TT",
        "5528TT",
      ],
      Eicher: [
        "Pro 1000",
        "Pro 2000",
        "Pro 3000",
        "Pro 5000",
        "Pro 6000",
        "Pro 8000",
      ],
      Force: ["Traveller", "Trax", "Gurkha", "Trump"],
      Scania: ["P Series", "G Series", "R Series", "S Series"],
      Volvo: ["FH", "FM", "FMX", "FE", "FL"],
      KTM: [
        "Duke 125",
        "Duke 200",
        "Duke 390",
        "RC 125",
        "RC 200",
        "RC 390",
        "Adventure 390",
        "Adventure 250",
      ],
    };

    return modelsByBrand[brand] || ["Model 1", "Model 2", "Model 3", "Model 4"];
  };

  // Sample variants based on model
  const getVariants = (model: string) => {
    const variantsByModel: Record<string, string[]> = {
      Swift: ["LXi", "VXi", "ZXi", "ZXi+", "LDi", "VDi", "ZDi", "ZDi+"],
      Baleno: ["Sigma", "Delta", "Zeta", "Alpha"],
      Creta: ["E", "EX", "S", "S+", "SX", "SX(O)"],
      Nexon: ["XE", "XM", "XZ", "XZ+", "XMA", "XZA", "XZA+"],
      Splendor: ["Plus", "Pro", "iSmart", "Black and Accent", "Plus i3s"],
      Pulsar: ["125", "150", "180", "220F", "NS160", "NS200", "RS200", "N250"],
      "Classic 350": ["Redditch", "Halcyon", "Signals", "Dark", "Chrome"],
      Access: ["125", "125 Special Edition", "125 Ride Connect Edition"],
      Ape: ["City", "Auto DX", "Auto LDX", "Auto+"],
    };

    return (
      variantsByModel[model] || [
        "Variant 1",
        "Variant 2",
        "Variant 3",
        "Variant 4",
      ]
    );
  };

  // Ownership options
  const ownershipOptions = [
    "1st Owner",
    "2nd Owner",
    "3rd Owner",
    "4th Owner or more",
  ];

  // Sample fuel types based on vehicle type
  const getFuelTypes = () => {
    if (vehicleType === "2-wheeler") {
      return ["Petrol", "Electric"];
    } else if (vehicleType === "3-wheeler") {
      return ["Petrol", "CNG", "Electric"];
    } else {
      return ["Petrol", "Diesel", "CNG", "Electric", "Hybrid"];
    }
  };

  // Kilometer ranges
  const kilometerRanges = [
    "0 Km - 10,000 Km",
    "10,000 Km - 20,000 Km",
    "20,000 Km - 30,000 Km",
    "30,000 Km - 40,000 Km",
    "40,000 Km - 50,000 Km",
    "50,000 Km - 60,000 Km",
    "60,000 Km - 70,000 Km",
    "70,000 Km - 80,000 Km",
    "80,000 Km - 90,000 Km",
    "90,000 Km - 1,00,000 Km",
    "1,00,000 Km - 1,25,000 Km",
    "1,25,000 Km - 1,50,000 Km",
    "1,50,000 Km - 1,75,000 Km",
    "1,75,000 Km - 2,00,000 Km",
    "2,00,000 Km - 2,25,000 Km",
    "2,25,000 Km - 2,50,000 Km",
    "2,50,000 Km or more",
  ];

  // Sample cities
  const cities = [
    "Delhi",
    "Mumbai",
    "Bangalore",
    "Hyderabad",
    "Chennai",
    "Kolkata",
    "Pune",
    "Ahmedabad",
    "Jaipur",
    "Lucknow",
    "Chandigarh",
    "Kochi",
    "Indore",
    "Bhopal",
    "Nagpur",
  ];

  // Sample timelines
  const timelines = [
    "Immediately",
    "Within a week",
    "Within a month",
    "After 1-2 months",
  ];

  // Animation variants for page transitions
  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -100 },
  };

  // Animation variants for items
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut" as const,
      },
    }),
  };

  // Condition options
  const conditionOptions = [
    { value: "fair", label: "Fair" },
    { value: "good", label: "Good" },
    { value: "veryGood", label: "Very Good" },
    { value: "excellent", label: "Excellent" },
  ];

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

  // Get step number for progress display
  const getStepNumber = (currentStep: Step): number => {
    const steps: Step[] = [
      "brand",
      "model",
      "year",
      "variant",
      "ownership",
      "fuel",
      "kilometers",
      "city",
      "timeline",
      "contact",
      "otp",
      "summary",
    ];
    return steps.indexOf(currentStep) + 1;
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Dynamic Title */}
      <div className="mb-6 text-center px-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
          {formData.brand
            ? `Sell Your ${formData.brand} ${getFormattedVehicleType()} for Instant Cash – Vehiverze`
            : formData.model
              ? `Sell Your ${formData.brand} ${formData.model} for Instant Cash – Vehiverze`
              : formData.year
                ? `Sell Your ${formData.year} ${formData.brand} ${formData.model} for Instant Cash – Vehiverze`
                : `Sell Your Used ${getFormattedVehicleType()} for Instant Cash – Vehiverze`}
        </h1>
        <p className="text-gray-500 mt-2">
          Get the best price with our 2x faster process
        </p>
      </div>

      {/* Progress bar */}
      <div className="mb-8 px-4">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            <span className="text-blue-600 font-bold">
              {Math.round(progress)}%
            </span>{" "}
            Complete
          </span>
          <span className="text-sm font-medium text-gray-700">
            Step {getStepNumber(step)} of 12
          </span>
        </div>
        <div className="relative h-3 w-full bg-gray-100 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-2">
          {[
            "brand",
            "model",
            "year",
            "variant",
            "ownership",
            "fuel",
            "kilometers",
            "city",
            "timeline",
            "contact",
            "otp",
            "summary",
          ].map((stepName, index) => (
            <div
              key={stepName}
              className={`w-2 h-2 rounded-full ${
                getStepNumber(stepName as Step) <= getStepNumber(step)
                  ? "bg-blue-600"
                  : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={{ type: "tween", duration: 0.3 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Brand selection step */}
          {step === "brand" && (
            <div className="p-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-8"
              >
                <div className="inline-block p-4 bg-gradient-to-br from-blue-50 to-green-50 rounded-full mb-4">
                  <div className="text-6xl">{getVehicleIcon()}</div>
                </div>
              </motion.div>

              {vehicleType === "4-wheeler" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="mb-8"
                >
                  <h2 className="text-lg font-medium text-center mb-4">
                    Select your 4 Wheeler type
                  </h2>
                  <div className="flex justify-center gap-4 flex-wrap">
                    <Button
                      onClick={() => setVehicleSubType("car")}
                      className={cn(
                        "flex items-center gap-2 px-6 py-6 rounded-xl transition-all duration-300",
                        vehicleSubType === "car"
                          ? "bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg shadow-blue-200"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                      )}
                    >
                      <Car className="h-5 w-5" />
                      Car
                    </Button>
                    <Button
                      onClick={() => setVehicleSubType("commercial")}
                      className={cn(
                        "flex items-center gap-2 px-6 py-6 rounded-xl transition-all duration-300",
                        vehicleSubType === "commercial"
                          ? "bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg shadow-blue-200"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                      )}
                    >
                      <Car className="h-5 w-5" />
                      Commercial Car
                    </Button>
                    <Button
                      onClick={() => setVehicleSubType("truck")}
                      className={cn(
                        "flex items-center gap-2 px-6 py-6 rounded-xl transition-all duration-300",
                        vehicleSubType === "truck"
                          ? "bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg shadow-blue-200"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                      )}
                    >
                      <Truck className="h-5 w-5" />
                      Truck
                    </Button>
                    <Button
                      onClick={() => setVehicleSubType("bus")}
                      className={cn(
                        "flex items-center gap-2 px-6 py-6 rounded-xl transition-all duration-300",
                        vehicleSubType === "bus"
                          ? "bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg shadow-blue-200"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                      )}
                    >
                      <Truck className="h-5 w-5" />
                      Bus
                    </Button>
                  </div>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <h2 className="text-xl font-semibold text-center mb-6">
                  Select your {getFormattedVehicleType()} brand to get started
                </h2>

                <div className="relative mb-6">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder={`Search ${getFormattedVehicleType()} brands`}
                    className="pl-12 py-6 h-auto text-lg rounded-xl bg-gray-50 border-gray-200"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {brands.map((brand, index) => (
                    <motion.button
                      key={brand.name}
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      variants={itemVariants}
                      onClick={() => handleBrandSelect(brand.name)}
                      className="group p-6 rounded-xl bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-green-50 transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:shadow-lg"
                      whileHover={{ y: -5 }}
                    >
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 mb-4 relative">
                          <Image
                            src={brand.logo || "/placeholder.svg"}
                            alt={brand.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <span className="text-gray-800 group-hover:text-blue-600 font-medium">
                          {brand.name}
                        </span>
                        {brand.popular && (
                          <span className="mt-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                            Popular
                          </span>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>
          )}

          {/* Model selection step */}
          {step === "model" && (
            <div className="p-8">
              <div className="flex items-center gap-4 mb-8">
                <Button
                  variant="ghost"
                  onClick={() => setStep("brand")}
                  className="rounded-full w-10 h-10 p-0"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <h2 className="text-2xl font-bold">
                  Select the model of your {formData.brand}{" "}
                  {getFormattedVehicleType()}
                </h2>
              </div>

              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder={`Search ${formData.brand} models`}
                  className="pl-12 py-6 h-auto text-lg rounded-xl bg-gray-50 border-gray-200"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {getModels(formData.brand).map((model, index) => (
                  <motion.div
                    key={model}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={itemVariants}
                    onClick={() => handleModelSelect(model)}
                    className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100"
                    whileHover={{ y: -5 }}
                  >
                    <div className="relative h-40 w-full bg-gray-50">
                      <Image
                        src={`/ceholder-svg-height-160-width-240-text-.jpg?height=160&width=240&text=${formData.brand}+${model}`}
                        alt={`${formData.brand} ${model}`}
                        fill
                        className="object-contain p-4"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="text-lg font-medium text-gray-800">
                        {model}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">
                        {formData.brand}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Year selection step */}
          {step === "year" && (
            <div className="p-8">
              <div className="flex items-center gap-4 mb-8">
                <Button
                  variant="ghost"
                  onClick={() => setStep("model")}
                  className="rounded-full w-10 h-10 p-0"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <h2 className="text-2xl font-bold">
                  Select the manufacturing year
                </h2>
              </div>

              <div className="text-center mb-8">
                <div className="inline-flex items-center bg-blue-50 px-4 py-2 rounded-lg">
                  <Calendar className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-blue-700">
                    {formData.brand} {formData.model}
                  </span>
                </div>
              </div>

              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
              >
                {Array.from({ length: 18 }, (_, i) =>
                  (new Date().getFullYear() - i).toString()
                ).map((year, index) => (
                  <motion.button
                    key={year}
                    custom={index}
                    whileHover={{ y: -5 }}
                    onClick={() => handleYearSelect(year)}
                    className="p-6 rounded-xl bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-green-50 transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:shadow-lg text-center"
                  >
                    <span className="text-2xl font-medium text-gray-800">
                      {year}
                    </span>
                  </motion.button>
                ))}
              </motion.div>
            </div>
          )}

          {/* Variant selection step */}
          {step === "variant" && (
            <div className="p-8">
              <div className="flex items-center gap-4 mb-8">
                <Button
                  variant="ghost"
                  onClick={() => setStep("year")}
                  className="rounded-full w-10 h-10 p-0"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <h2 className="text-2xl font-bold">Select the variant</h2>
              </div>

              <div className="text-center mb-8">
                <div className="inline-flex items-center bg-blue-50 px-4 py-2 rounded-lg">
                  <Car className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-blue-700">
                    {formData.brand} {formData.model} {formData.year}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {getVariants(formData.model).map((variant, index) => (
                  <motion.button
                    key={variant}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={itemVariants}
                    onClick={() => handleVariantSelect(variant)}
                    className="flex items-center justify-between p-6 rounded-xl bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-green-50 transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:shadow-lg"
                    whileHover={{ y: -3 }}
                  >
                    <span className="text-lg font-medium text-gray-800">
                      {variant}
                    </span>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Ownership history step */}
          {step === "ownership" && (
            <div className="p-8">
              <div className="flex items-center gap-4 mb-8">
                <Button
                  variant="ghost"
                  onClick={() => setStep("variant")}
                  className="rounded-full w-10 h-10 p-0"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <h2 className="text-2xl font-bold">
                  Select the ownership history of your car
                </h2>
              </div>

              <div className="text-center mb-8">
                <div className="inline-flex items-center bg-blue-50 px-4 py-2 rounded-lg">
                  <Car className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-blue-700">
                    {formData.brand} {formData.model} {formData.variant}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {ownershipOptions.map((ownership, index) => (
                  <motion.button
                    key={ownership}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={itemVariants}
                    onClick={() => handleOwnershipSelect(ownership)}
                    className="flex items-center justify-between p-6 rounded-xl bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-green-50 transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:shadow-lg"
                    whileHover={{ y: -3 }}
                  >
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-blue-500 mr-3" />
                      <span className="text-lg font-medium text-gray-800">
                        {ownership}
                      </span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Fuel type selection step */}
          {step === "fuel" && (
            <div className="p-8">
              <div className="flex items-center gap-4 mb-8">
                <Button
                  variant="ghost"
                  onClick={() => setStep("ownership")}
                  className="rounded-full w-10 h-10 p-0"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <h2 className="text-2xl font-bold">Select the fuel type</h2>
              </div>

              <div className="text-center mb-8">
                <div className="inline-flex items-center bg-blue-50 px-4 py-2 rounded-lg">
                  <Car className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-blue-700">
                    {formData.brand} {formData.model} {formData.variant} (
                    {formData.ownership})
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {getFuelTypes().map((fuelType, index) => (
                  <motion.button
                    key={fuelType}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={itemVariants}
                    onClick={() => handleFuelTypeSelect(fuelType)}
                    className="flex flex-col items-center p-8 rounded-xl bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-green-50 transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:shadow-lg"
                    whileHover={{ y: -5 }}
                  >
                    <div className="text-4xl mb-4">
                      {fuelType === "Petrol" && "⛽"}
                      {fuelType === "Diesel" && "🛢️"}
                      {fuelType === "CNG" && "🔋"}
                      {fuelType === "Electric" && "⚡"}
                      {fuelType === "Hybrid" && "🔋⚡"}
                    </div>
                    <span className="text-xl font-medium text-gray-800">
                      {fuelType}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Kilometers driven step */}
          {step === "kilometers" && (
            <div className="p-8">
              <div className="flex items-center gap-4 mb-8">
                <Button
                  variant="ghost"
                  onClick={() => setStep("fuel")}
                  className="rounded-full w-10 h-10 p-0"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <h2 className="text-2xl font-bold">
                  Select the kilometers driven by your car
                </h2>
              </div>

              <div className="text-center mb-8">
                <div className="inline-flex items-center bg-blue-50 px-4 py-2 rounded-lg">
                  <Car className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-blue-700">
                    {formData.brand} {formData.model} {formData.year}{" "}
                    {formData.fuelType}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-2">
                {kilometerRanges.map((range, index) => (
                  <motion.button
                    key={range}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={itemVariants}
                    onClick={() => handleKilometersSelect(range)}
                    className="flex items-center justify-between p-6 rounded-xl bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-green-50 transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:shadow-lg"
                    whileHover={{ y: -3 }}
                  >
                    <span className="text-lg font-medium text-gray-800">
                      {range}
                    </span>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* City selection step */}
          {step === "city" && (
            <div className="p-8">
              <div className="flex items-center gap-4 mb-8">
                <Button
                  variant="ghost"
                  onClick={() => setStep("kilometers")}
                  className="rounded-full w-10 h-10 p-0"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <h2 className="text-2xl font-bold">Select your city</h2>
              </div>

              <div className="text-center mb-8">
                <div className="inline-flex items-center bg-blue-50 px-4 py-2 rounded-lg">
                  <Car className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-blue-700">
                    {formData.brand} {formData.model} {formData.kilometers}
                  </span>
                </div>
              </div>

              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search your city"
                  className="pl-12 py-6 h-auto text-lg rounded-xl bg-gray-50 border-gray-200"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {cities.map((city, index) => (
                  <motion.button
                    key={city}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={itemVariants}
                    onClick={() => handleCitySelect(city)}
                    className="flex items-center justify-center gap-2 p-4 rounded-xl bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-green-50 transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:shadow-lg"
                    whileHover={{ y: -3 }}
                  >
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-800">{city}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Timeline selection step */}
          {step === "timeline" && (
            <div className="p-8">
              <div className="flex items-center gap-4 mb-8">
                <Button
                  variant="ghost"
                  onClick={() => setStep("city")}
                  className="rounded-full w-10 h-10 p-0"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <h2 className="text-2xl font-bold">
                  When are you planning to sell?
                </h2>
              </div>

              <div className="text-center mb-8"></div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {timelines.map((timeline, index) => (
                  <motion.button
                    key={timeline}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={itemVariants}
                    onClick={() => handleTimelineSelect(timeline)}
                    className="flex items-center justify-between p-6 rounded-xl bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-green-50 transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:shadow-lg"
                    whileHover={{ y: -3 }}
                  >
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-blue-500 mr-3" />
                      <span className="text-lg font-medium text-gray-800">
                        {timeline}
                      </span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Contact information step */}
          {step === "contact" && (
            <div className="p-8">
              <div className="flex items-center gap-4 mb-8">
                <Button
                  variant="ghost"
                  onClick={() => setStep("timeline")}
                  className="rounded-full w-10 h-10 p-0"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <h2 className="text-2xl font-bold">Your contact information</h2>
              </div>

              <div className="text-center mb-8">
                <div className="inline-flex items-center bg-blue-50 px-4 py-2 rounded-lg">
                  <Clock className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-blue-700">
                    Selling {formData.timeline.toLowerCase()}
                  </span>
                </div>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => updateFormData("name", e.target.value)}
                    className="px-4 py-3 rounded-xl bg-gray-50 text-black border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                      +91
                    </span>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) => updateFormData("phone", e.target.value)}
                      className="pl-12 px-4 py-3 rounded-xl bg-gray-50 text-black border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    className="px-4 py-3 rounded-xl bg-gray-50 text-black border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white px-6 py-4 rounded-xl h-auto text-lg font-medium transition-all duration-300 shadow-lg shadow-blue-200/50"
                >
                  Continue
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </div>
          )}

          {/* OTP verification step */}
          {step === "otp" && (
            <div className="p-8">
              <div className="flex items-center gap-4 mb-8">
                <Button
                  variant="ghost"
                  onClick={() => setStep("contact")}
                  className="rounded-full w-10 h-10 p-0"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <h2 className="text-2xl font-bold">Verify your phone number</h2>
              </div>

              <div className="text-center mb-8">
                <div className="inline-flex items-center bg-blue-50 px-4 py-2 rounded-lg">
                  <Phone className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-blue-700">+91 {formData.phone}</span>
                </div>
              </div>

              <form onSubmit={handleOtpSubmit} className="space-y-6">
                <div>
                  <p className="text-sm text-gray-500 mb-4">
                    We've sent a 4-digit verification code to your phone number.
                    Please enter it below.
                  </p>
                  <div className="flex justify-center gap-2">
                    {[0, 1, 2, 3].map((index) => (
                      <input
                        key={index}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={1}
                        ref={(el) => {
                          otpRefs.current[index] = el;
                        }}
                        className="w-14 h-14 text-center text-xl font-bold rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                        onChange={(e) => handleOtpChange(e, index)}
                        onKeyDown={(e) => handleOtpKeyDown(e, index)}
                        onPaste={index === 0 ? handleOtpPaste : undefined}
                      />
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-500">
                    Didn't receive the code?{" "}
                    <button type="button" className="text-blue-600 font-medium">
                      Resend
                    </button>
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white px-6 py-4 rounded-xl h-auto text-lg font-medium transition-all duration-300 shadow-lg shadow-blue-200/50"
                  disabled={formData.otp.length !== 4}
                >
                  Verify & Continue
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </div>
          )}

          {/* Summary step */}
          {step === "summary" && (
            <div className="p-8">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-2xl font-bold text-center mb-6"
              >
                Your Vehicle Summary
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-xl space-y-6"
                >
                  <h3 className="text-xl font-semibold border-b border-gray-200 pb-2">
                    Vehicle Details
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Vehicle Type</p>
                      <p className="font-medium">{vehicleTypeName}</p>
                    </div>
                    {vehicleType === "4-wheeler" && vehicleSubType && (
                      <div>
                        <p className="text-sm text-gray-500">Vehicle Subtype</p>
                        <p className="font-medium">
                          {vehicleSubType === "car"
                            ? "Car"
                            : vehicleSubType === "commercial"
                              ? "Commercial Car"
                              : vehicleSubType === "truck"
                                ? "Truck"
                                : vehicleSubType === "bus"
                                  ? "Bus"
                                  : "Vehicle"}
                        </p>
                      </div>
                    )}
                    {formData.brand && (
                      <div>
                        <p className="text-sm text-gray-500">Brand</p>
                        <p className="font-medium">{formData.brand}</p>
                      </div>
                    )}
                    {formData.model && (
                      <div>
                        <p className="text-sm text-gray-500">Model</p>
                        <p className="font-medium">{formData.model}</p>
                      </div>
                    )}
                    {formData.year && (
                      <div>
                        <p className="text-sm text-gray-500">Year</p>
                        <p className="font-medium">{formData.year}</p>
                      </div>
                    )}
                    {formData.variant && (
                      <div>
                        <p className="text-sm text-gray-500">Variant</p>
                        <p className="font-medium">{formData.variant}</p>
                      </div>
                    )}
                    {formData.ownership && (
                      <div>
                        <p className="text-sm text-gray-500">Ownership</p>
                        <p className="font-medium">{formData.ownership}</p>
                      </div>
                    )}
                    {formData.fuelType && (
                      <div>
                        <p className="text-sm text-gray-500">Fuel Type</p>
                        <p className="font-medium">{formData.fuelType}</p>
                      </div>
                    )}
                    {formData.kilometers && (
                      <div>
                        <p className="text-sm text-gray-500">Kilometers</p>
                        <p className="font-medium">{formData.kilometers}</p>
                      </div>
                    )}
                    {formData.city && (
                      <div>
                        <p className="text-sm text-gray-500">City</p>
                        <p className="font-medium">{formData.city}</p>
                      </div>
                    )}
                    {formData.timeline && (
                      <div>
                        <p className="text-sm text-gray-500">
                          Selling Timeline
                        </p>
                        <p className="font-medium">{formData.timeline}</p>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-lg font-semibold mb-4">
                      Contact Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Name</p>
                        <p className="font-medium">{formData.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium">{formData.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{formData.email}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gradient-to-br from-gray-900 to-blue-900 text-white p-6 rounded-xl"
                >
                  <h3 className="text-xl font-semibold mb-4">Price Estimate</h3>

                  {/* Condition selector */}
                  <div className="mb-6">
                    <div className="flex justify-between mb-4">
                      {conditionOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setSelectedCondition(option.value)}
                          className={`px-2 py-1 transition-all duration-300 ${
                            selectedCondition === option.value
                              ? "border-b-2 border-green-400 font-bold"
                              : "text-gray-400 hover:text-gray-200"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>

                    {/* Slider visualization */}
                    <div className="relative h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full mb-8">
                      {/* Position marker based on selected condition */}
                      <div
                        className={`absolute top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full bg-white border-2 border-green-400 shadow-lg z-10 transition-all duration-500 ${
                          animatePrice ? "scale-125" : ""
                        }`}
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
                            selectedCondition === "excellent"
                              ? "-12px"
                              : "-6px",
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Price range */}
                  <motion.div
                    animate={animatePrice ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ duration: 0.5 }}
                    className="bg-gray-800 p-6 rounded-lg mb-8 border border-gray-700"
                  >
                    <h3 className="text-3xl font-bold mb-3 flex items-center">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                        {getCurrentPriceRange().min} -{" "}
                        {getCurrentPriceRange().max}
                      </span>
                    </h3>
                    <div className="inline-block bg-green-900 text-green-400 text-xs font-medium px-2 py-1 rounded mb-3">
                      Best Value
                    </div>
                    <p className="flex items-center text-sm">
                      <CheckCircle size={16} className="text-green-400 mr-2" />
                      You may get a better price upon inspection
                    </p>
                  </motion.div>

                  {/* Benefits section */}
                  <div className="space-y-3 mb-6">
                    {benefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="flex items-center bg-gray-800 p-3 rounded-xl"
                      >
                        {benefit.icon}
                        <span className="ml-3 text-gray-300">
                          {benefit.text}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <Button
                    onClick={handleSubmitSummary}
                    className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white px-6 py-4 rounded-xl h-auto text-lg font-medium transition-all duration-300 shadow-lg shadow-green-200/50"
                  >
                    Continue to Checkout
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

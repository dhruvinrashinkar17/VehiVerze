"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Search, ArrowLeft } from "lucide-react";
import { Button } from "@vehiverze/ui/button";
import { Input } from "@vehiverze/ui/input";

interface Model {
  name: string;
  image: string;
  popular?: boolean;
}

interface PremiumModelSelectorProps {
  brand: string;
  vehicleType?: string;
  onSelect: (model: string) => void;
  onBack?: () => void;
}

export function PremiumModelSelector({
  brand,
  vehicleType = "4-wheeler",
  onSelect,
  onBack,
}: PremiumModelSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);

  // Sample models - in a real app, these would be fetched based on the brand
  const popularModels = {
    "4-wheeler": [
      {
        name: "Baleno",
        image: "/placeholder.svg?height=100&width=200",
        popular: true,
      },
      {
        name: "Swift",
        image: "/placeholder.svg?height=100&width=200",
        popular: true,
      },
      {
        name: "Wagon R 1.0",
        image: "/placeholder.svg?height=100&width=200",
        popular: true,
      },
      {
        name: "Alto 800",
        image: "/placeholder.svg?height=100&width=200",
        popular: true,
      },
    ],
    "2-wheeler": [
      {
        name: "Splendor",
        image: "/placeholder.svg?height=100&width=200",
        popular: true,
      },
      {
        name: "Activa",
        image: "/placeholder.svg?height=100&width=200",
        popular: true,
      },
      {
        name: "Pulsar",
        image: "/placeholder.svg?height=100&width=200",
        popular: true,
      },
      {
        name: "Classic 350",
        image: "/placeholder.svg?height=100&width=200",
        popular: true,
      },
    ],
  };

  const otherModels = {
    "4-wheeler": [
      { name: "Alto K10", image: "/placeholder.svg?height=100&width=200" },
      { name: "Brezza", image: "/placeholder.svg?height=100&width=200" },
      { name: "Celerio", image: "/placeholder.svg?height=100&width=200" },
      { name: "Ciaz", image: "/placeholder.svg?height=100&width=200" },
      { name: "Dzire", image: "/placeholder.svg?height=100&width=200" },
      { name: "Eeco", image: "/placeholder.svg?height=100&width=200" },
      { name: "Fronx", image: "/placeholder.svg?height=100&width=200" },
      { name: "Grand Vitara", image: "/placeholder.svg?height=100&width=200" },
    ],
    "2-wheeler": [
      { name: "Passion", image: "/placeholder.svg?height=100&width=200" },
      { name: "Shine", image: "/placeholder.svg?height=100&width=200" },
      { name: "Unicorn", image: "/placeholder.svg?height=100&width=200" },
      { name: "Access", image: "/placeholder.svg?height=100&width=200" },
      { name: "Jupiter", image: "/placeholder.svg?height=100&width=200" },
      { name: "Apache", image: "/placeholder.svg?height=100&width=200" },
      { name: "Bullet", image: "/placeholder.svg?height=100&width=200" },
      { name: "FZ", image: "/placeholder.svg?height=100&width=200" },
    ],
  };

  // Combine models
  const allModels = [
    ...(popularModels[vehicleType as keyof typeof popularModels] || []),
    ...(otherModels[vehicleType as keyof typeof otherModels] || []),
  ];

  // Filter models based on search term
  const [filteredModels, setFilteredModels] = useState<Model[]>(allModels);

  useEffect(() => {
    const updatedFilteredModels = searchTerm
      ? allModels.filter((model) =>
          model.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : allModels;
    setFilteredModels(updatedFilteredModels);
  }, [searchTerm, allModels]);

  // Format vehicle type for display
  const getFormattedVehicleType = () => {
    switch (vehicleType) {
      case "2-wheeler":
        return "Bike";
      case "3-wheeler":
        return "Auto Rickshaw";
      case "4-wheeler":
        return "Car";
      case "6-wheeler":
        return "Medium Truck";
      case "8-wheeler":
        return "Heavy Truck";
      default:
        return "Vehicle";
    }
  };

  // Handle model selection with animation
  const handleModelSelect = (model: string) => {
    setSelectedModel(model);
    setIsSelecting(true);

    // Delay to show animation
    setTimeout(() => {
      onSelect(model);
      setIsSelecting(false);
    }, 600);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const cardVariants = {
    hidden: itemVariants.hidden,
    visible: itemVariants.visible,
    selected: {
      ...itemVariants.visible,
      scale: 1.05,
      boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)",
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={onBack}
          className="rounded-full w-10 h-10 p-0"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-2xl font-bold">
          Select the model of your {brand} {getFormattedVehicleType()}
        </h2>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          type="text"
          placeholder={`Search your ${getFormattedVehicleType()} model`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-6 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-lg h-auto"
        />
      </div>

      {/* Popular models */}
      {popularModels[vehicleType as keyof typeof popularModels]?.length > 0 &&
        !searchTerm && (
          <div>
            <h3 className="text-xl font-semibold mb-6">
              POPULAR {brand.toUpperCase()} MODELS
            </h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
            >
              {popularModels[vehicleType as keyof typeof popularModels].map(
                (model) => (
                  <motion.div
                    key={model.name}
                    variants={cardVariants}
                    whileHover={{ y: -5 }}
                    animate={
                      selectedModel === model.name ? "selected" : "visible"
                    }
                    onClick={() => handleModelSelect(model.name)}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100"
                  >
                    <div className="relative h-32 w-full bg-gray-50">
                      <Image
                        src={model.image || "/placeholder.svg"}
                        alt={`${brand} ${model.name}`}
                        fill
                        className="object-contain p-4"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="text-lg font-medium text-gray-800">
                        {model.name}
                      </h4>
                    </div>
                  </motion.div>
                )
              )}
            </motion.div>
          </div>
        )}

      {/* All/filtered models */}
      <div>
        <h3 className="text-xl font-semibold mb-6">
          {searchTerm ? "SEARCH RESULTS" : "ALL MODELS"}
        </h3>
        {filteredModels.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
          >
            {filteredModels.map((model) => (
              <motion.div
                key={model.name}
                variants={cardVariants}
                whileHover={{ y: -5 }}
                animate={selectedModel === model.name ? "selected" : "visible"}
                onClick={() => handleModelSelect(model.name)}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100"
              >
                <div className="relative h-32 w-full bg-gray-50">
                  <Image
                    src={model.image || "/placeholder.svg"}
                    alt={`${brand} ${model.name}`}
                    fill
                    className="object-contain p-4"
                  />
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-medium text-gray-800">
                    {model.name}
                  </h4>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <p className="text-gray-500">
              No models found matching "{searchTerm}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

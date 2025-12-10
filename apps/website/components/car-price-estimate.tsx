"use client";

import { useState } from "react";
import { Button } from "@vehiverze/ui/button";
import { Input } from "@vehiverze/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@vehiverze/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@vehiverze/ui/card";
import { Calculator, Car, IndianRupee } from "lucide-react";

interface PriceRange {
  min: number;
  max: number;
}

const conditionMultipliers: Record<string, { min: number; max: number }> = {
  excellent: { min: 0.85, max: 0.95 },
  "very-good": { min: 0.75, max: 0.85 },
  good: { min: 0.65, max: 0.75 },
  fair: { min: 0.5, max: 0.65 },
};

const baseYearPrices: Record<string, number> = {
  "2024": 1000000,
  "2023": 900000,
  "2022": 800000,
  "2021": 700000,
  "2020": 600000,
  "2019": 500000,
  "2018": 450000,
  "2017": 400000,
  "2016": 350000,
  "2015": 300000,
};

export default function CarPriceEstimate() {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    condition: "",
    kilometers: "",
  });
  const [priceRange, setPriceRange] = useState<PriceRange | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setPriceRange(null);
  };

  const calculatePrice = () => {
    if (!formData.year || !formData.condition) return;

    setIsCalculating(true);

    setTimeout(() => {
      const basePrice = baseYearPrices[formData.year] || 250000;
      const multiplier = conditionMultipliers[formData.condition] || {
        min: 0.5,
        max: 0.65,
      };

      // Adjust for kilometers driven
      const kmValue = parseInt(formData.kilometers.replace(/,/g, "")) || 50000;
      const kmAdjustment = Math.max(0.7, 1 - kmValue / 500000);

      const minPrice = Math.round(basePrice * multiplier.min * kmAdjustment);
      const maxPrice = Math.round(basePrice * multiplier.max * kmAdjustment);

      setPriceRange({ min: minPrice, max: maxPrice });
      setIsCalculating(false);
    }, 800);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const canCalculate = formData.year && formData.condition;

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <Card className="border-0 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-green-500 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Calculator className="h-6 w-6" />
            Car Price Estimator
          </CardTitle>
          <p className="text-blue-100">
            Get an instant estimate for your car's value
          </p>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Brand
              </label>
              <Input
                placeholder="e.g., Maruti Suzuki"
                value={formData.brand}
                onChange={(e) => handleInputChange("brand", e.target.value)}
                className="rounded-xl"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Model
              </label>
              <Input
                placeholder="e.g., Swift VXI"
                value={formData.model}
                onChange={(e) => handleInputChange("model", e.target.value)}
                className="rounded-xl"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year
              </label>
              <Select
                value={formData.year}
                onValueChange={(value) => handleInputChange("year", value)}
              >
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(baseYearPrices).map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Condition
              </label>
              <Select
                value={formData.condition}
                onValueChange={(value) => handleInputChange("condition", value)}
              >
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excellent">Excellent</SelectItem>
                  <SelectItem value="very-good">Very Good</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="fair">Fair</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kilometers Driven
              </label>
              <Input
                placeholder="e.g., 50,000"
                value={formData.kilometers}
                onChange={(e) =>
                  handleInputChange("kilometers", e.target.value)
                }
                className="rounded-xl"
              />
            </div>
          </div>

          <Button
            onClick={calculatePrice}
            disabled={!canCalculate || isCalculating}
            className="w-full bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white py-6 rounded-xl text-lg font-medium"
          >
            {isCalculating ? "Calculating..." : "Get Price Estimate"}
          </Button>

          {priceRange && (
            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl border border-blue-100">
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <Car className="h-5 w-5" />
                  <span>Estimated Price Range</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-3xl font-bold text-gray-800">
                  <IndianRupee className="h-7 w-7" />
                  <span>
                    {formatCurrency(priceRange.min).replace("₹", "")} -{" "}
                    {formatCurrency(priceRange.max)}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  This is an estimated price range. The final price will be
                  determined after physical inspection.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

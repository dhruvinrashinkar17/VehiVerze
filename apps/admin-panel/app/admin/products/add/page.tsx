"use client";

import { ProductForm } from "@/components/products/product-form";
import { Card, CardContent, CardHeader, CardTitle } from "@vehiverze/ui/card";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddProductPage() {
  const router = useRouter();
  const [serviceType, setServiceType] = useState("Buy");

  const handleSuccess = () => {
    router.push("/admin/products/manage");
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Add New Vehicle</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Service Type</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {["Buy", "Sell", "Garage Services", "New Cars"].map((type) => (
                <div
                  key={type}
                  className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer hover:border-primary hover:bg-accent transition-colors ${
                    serviceType === type
                      ? "border-primary bg-accent text-primary font-bold"
                      : ""
                  }`}
                  onClick={() => setServiceType(type)}
                >
                  <div className="text-center">{type}</div>
                </div>
              ))}
            </div>
          </div>

          {serviceType === "Garage Services" && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Service Category</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  "Periodic Services",
                  "AC Service & Repair",
                  "Batteries Tyres & Wheel Care",
                  "Denting & Painting",
                  "Detailing Services",
                  "Car Spa & Cleaning",
                  "Car Inspections",
                  "Windshields & Lights",
                ].map((category) => (
                  <div
                    key={category}
                    className="flex items-center p-3 border rounded-lg cursor-pointer hover:border-primary hover:bg-accent"
                  >
                    <input
                      type="radio"
                      id={category}
                      name="serviceCategory"
                      className="mr-2"
                    />
                    <label
                      htmlFor={category}
                      className="text-sm cursor-pointer"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {serviceType === "New Cars" && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Car Type</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {["Sedan", "Hatchback", "SUV", "Luxury"].map((carType) => (
                  <div
                    key={carType}
                    className="flex items-center p-3 border rounded-lg cursor-pointer hover:border-primary hover:bg-accent"
                  >
                    <input
                      type="radio"
                      id={carType}
                      name="carType"
                      className="mr-2"
                    />
                    <label htmlFor={carType} className="text-sm cursor-pointer">
                      {carType}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Show inspection info only for Sell service type */}
          {serviceType === "Sell" && (
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                📋 300-Point Vehicle Inspection Available
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                For vehicles being sold, you can perform a comprehensive
                300-point inspection to determine the exact condition and get
                accurate pricing based on the vehicle&apos;s current state.
              </p>
            </div>
          )}
        </div>

        <ProductForm
          onSuccess={handleSuccess}
          serviceType={serviceType}
          maxImages={serviceType === "Buy" ? 50 : 5}
        />
      </CardContent>
    </Card>
  );
}

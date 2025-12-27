"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Check, CreditCard, Landmark, Truck } from "lucide-react";
import { Button } from "@vehiverze/ui/button";
import { Input } from "@vehiverze/ui/input";
import { Label } from "@vehiverze/ui/label";
import { RadioGroup, RadioGroupItem } from "@vehiverze/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@vehiverze/ui/tabs";

interface CheckoutProps {
  brandId: string;
  modelId: string;
  year: string;
  variantId: string;
  transmissionId: string;
  brandName: string;
  modelName: string;
  variantName: string;
  transmissionName: string;
}

interface CarColor {
  id: string;
  name: string;
  hex: string;
}

const carColors: CarColor[] = [
  { id: "white", name: "Pearl White", hex: "#FFFFFF" },
  { id: "silver", name: "Silver", hex: "#C0C0C0" },
  { id: "gray", name: "Granite Gray", hex: "#808080" },
  { id: "black", name: "Midnight Black", hex: "#000000" },
  { id: "red", name: "Racing Red", hex: "#FF0000" },
  { id: "blue", name: "Ocean Blue", hex: "#0000FF" },
];

export function Checkout({
  brandId,
  modelId,
  year,
  variantId,
  transmissionId,
  brandName,
  modelName,
  variantName,
  transmissionName,
}: CheckoutProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [selectedColor, setSelectedColor] = useState(carColors[0]);
  const [paymentMethod, setPaymentMethod] = useState("full");

  // Car details - in a real app, this would be fetched from an API
  const carDetails = {
    name: `${brandName} ${modelName} ${year}`,
    variant: variantName,
    transmission: transmissionName,
    basePrice: 745000, // ₹7.45 Lakh in rupees
    image: "/placeholder.svg?height=300&width=500",
  };

  // Calculate total price
  const taxes = carDetails.basePrice * 0.18; // 18% GST
  const registrationFee = 15000;
  const insuranceCost = 35000;
  const totalPrice =
    carDetails.basePrice + taxes + registrationFee + insuranceCost;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleNext = () => {
    if (activeStep < 3) {
      setActiveStep(activeStep + 1);
    } else {
      // Submit order
      window.location.href = "/buy/new-cars/order-success";
    }
  };

  const handleBack = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <Link
            href={`/buy/new-cars/${brandId}/models/${modelId}/years/${year}/variants/${variantId}/transmission`}
          >
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">
            Complete Your Purchase
          </h1>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${activeStep >= 1 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
              >
                1
              </div>
              <span className="mt-2 text-sm">Car Details</span>
            </div>
            <div className="flex-1 h-1 mx-2 bg-gray-200">
              <div
                className={`h-full ${activeStep >= 2 ? "bg-blue-600" : "bg-gray-200"}`}
                style={{ width: activeStep >= 2 ? "100%" : "0%" }}
              ></div>
            </div>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${activeStep >= 2 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
              >
                2
              </div>
              <span className="mt-2 text-sm">Personal Info</span>
            </div>
            <div className="flex-1 h-1 mx-2 bg-gray-200">
              <div
                className={`h-full ${activeStep >= 3 ? "bg-blue-600" : "bg-gray-200"}`}
                style={{ width: activeStep >= 3 ? "100%" : "0%" }}
              ></div>
            </div>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${activeStep >= 3 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
              >
                3
              </div>
              <span className="mt-2 text-sm">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2">
            {/* Step 1: Car Details */}
            {activeStep === 1 && (
              <div className="bg-white p-6 rounded-lg border">
                <h2 className="text-2xl font-semibold mb-6">Select Color</h2>
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {carColors.map((color) => (
                    <button
                      key={color.id}
                      className={`p-4 rounded-lg border ${selectedColor?.id === color.id ? "border-blue-600 ring-2 ring-blue-200" : "border-gray-200"}`}
                      onClick={() => setSelectedColor(color)}
                    >
                      <div
                        className="w-full h-12 rounded-md mb-2"
                        style={{
                          backgroundColor: color.hex,
                          border:
                            color.id === "white" ? "1px solid #e5e7eb" : "none",
                        }}
                      ></div>
                      <p className="text-sm font-medium">{color.name}</p>
                    </button>
                  ))}
                </div>

                <div className="relative h-48 w-full mb-6">
                  <Image
                    src={carDetails.image || "/placeholder.svg"}
                    alt={carDetails.name}
                    fill
                    className="object-contain"
                  />
                </div>

                <h3 className="text-xl font-semibold mb-4">
                  Car Specifications
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-gray-600">Brand</p>
                    <p className="font-medium">{brandName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Model</p>
                    <p className="font-medium">{modelName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Year</p>
                    <p className="font-medium">{year}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Variant</p>
                    <p className="font-medium">{variantName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Transmission</p>
                    <p className="font-medium">{transmissionName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Color</p>
                    <p className="font-medium">{selectedColor?.name}</p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={handleNext}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Continue to Personal Info
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Personal Information */}
            {activeStep === 2 && (
              <div className="bg-white p-6 rounded-lg border">
                <h2 className="text-2xl font-semibold mb-6">
                  Personal Information
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Enter your last name" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="Enter your phone number" />
                  </div>

                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="Enter your address" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="City" />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input id="state" placeholder="State" />
                    </div>
                    <div>
                      <Label htmlFor="pincode">Pincode</Label>
                      <Input id="pincode" placeholder="Pincode" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handleBack}>
                    Back
                  </Button>
                  <Button
                    onClick={handleNext}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Continue to Payment
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {activeStep === 3 && (
              <div className="bg-white p-6 rounded-lg border">
                <h2 className="text-2xl font-semibold mb-6">Payment Method</h2>

                <Tabs defaultValue="payment" className="mb-6">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="payment">Full Payment</TabsTrigger>
                    <TabsTrigger value="loan">Car Loan</TabsTrigger>
                    <TabsTrigger value="lease">Lease</TabsTrigger>
                  </TabsList>

                  <TabsContent value="payment" className="pt-4">
                    <RadioGroup defaultValue="card" className="space-y-4">
                      <div className="flex items-center space-x-2 border rounded-lg p-4">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex items-center">
                          <CreditCard className="h-5 w-5 mr-2" />
                          Credit/Debit Card
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-4">
                        <RadioGroupItem value="bank" id="bank" />
                        <Label htmlFor="bank" className="flex items-center">
                          <Landmark className="h-5 w-5 mr-2" />
                          Net Banking
                        </Label>
                      </div>
                    </RadioGroup>
                  </TabsContent>

                  <TabsContent value="loan" className="pt-4">
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <h3 className="font-semibold mb-2">
                          Bank Financing Options
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Choose from our partner banks for the best interest
                          rates
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          <div className="border rounded p-3 text-center">
                            HDFC Bank
                          </div>
                          <div className="border rounded p-3 text-center">
                            ICICI Bank
                          </div>
                          <div className="border rounded p-3 text-center">
                            SBI
                          </div>
                          <div className="border rounded p-3 text-center">
                            Axis Bank
                          </div>
                          <div className="border rounded p-3 text-center">
                            Kotak Bank
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="lease" className="pt-4">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-2">Leasing Options</h3>
                      <p className="text-gray-600 mb-4">
                        Flexible leasing terms available
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Check className="h-5 w-5 text-green-500 mr-2" />
                          <span>24 month lease</span>
                        </div>
                        <div className="flex items-center">
                          <Check className="h-5 w-5 text-green-500 mr-2" />
                          <span>36 month lease</span>
                        </div>
                        <div className="flex items-center">
                          <Check className="h-5 w-5 text-green-500 mr-2" />
                          <span>48 month lease</span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handleBack}>
                    Back
                  </Button>
                  <Button
                    onClick={handleNext}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Complete Purchase
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 rounded-lg border h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Base Price</span>
                <span>{formatPrice(carDetails.basePrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">GST (18%)</span>
                <span>{formatPrice(taxes)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Registration Fee</span>
                <span>{formatPrice(registrationFee)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Insurance</span>
                <span>{formatPrice(insuranceCost)}</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-semibold">
                <span>Total</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Truck className="h-5 w-5 text-blue-600 mr-2" />
                <span className="font-medium">Estimated Delivery</span>
              </div>
              <p className="text-gray-600">
                Your vehicle will be ready for delivery within 2-3 weeks from
                the date of purchase.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

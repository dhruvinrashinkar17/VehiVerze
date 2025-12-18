"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  CheckCircle,
  ArrowRight,
  CreditCard,
  Wallet,
  Ban as Bank,
  Loader2,
} from "lucide-react";
import { Button } from "@vehiverze/ui/button";
import { Input } from "@vehiverze/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@vehiverze/ui/select";
import { CelebrationAnimation } from "@/components/celebration-animation";
import { toast } from "sonner";

interface SellFinalCheckoutProps {
  vehicleType: string;
}

interface SellFlowData {
  vehicleType: string;
  brand: string;
  model: string;
  year: string;
  variant: string;
  ownership: string;
  fuelType: string;
  kilometers: string;
  city: string;
}

export function SellFinalCheckout({ vehicleType }: SellFinalCheckoutProps) {
  const router = useRouter();
  const [sellFlowData, setSellFlowData] = useState<SellFlowData | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    bankAccount: "",
    ifscCode: "",
    paymentMethod: "bank_transfer",
    inspectionDate: "",
    inspectionTime: "",
  });
  const [selectedCondition, setSelectedCondition] = useState<string>("good");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load sell flow data from sessionStorage
  useEffect(() => {
    try {
      const storedData = window.sessionStorage.getItem("sellFlowData");
      if (storedData) {
        setSellFlowData(JSON.parse(storedData));
      }
    } catch (e) {
      console.error("Error loading sell flow data:", e);
    }
  }, []);

  // Price ranges based on condition (hardcoded for now - can be made dynamic later)
  const priceRanges = {
    fair: { min: "5,84,280", max: "6,63,981" },
    good: { min: "6,55,442", max: "7,89,227" },
    veryGood: { min: "7,83,534", max: "8,54,696" },
    excellent: { min: "8,40,464", max: "8,68,929" },
  } as const;

  type ConditionKey = keyof typeof priceRanges;
  const getConditionKey = (condition: string): ConditionKey => {
    if (condition in priceRanges) {
      return condition as ConditionKey;
    }
    return "good";
  };

  const currentPriceRange = priceRanges[getConditionKey(selectedCondition)];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Validation
    if (
      !formData.fullName ||
      !formData.phone ||
      !formData.inspectionDate ||
      !formData.inspectionTime
    ) {
      toast.error("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    try {
      // Build the request payload with all vehicle data
      const payload = {
        // Vehicle data from previous steps
        vehicleType: sellFlowData?.vehicleType || vehicleType,
        brand: sellFlowData?.brand || "Unknown",
        model: sellFlowData?.model || "Unknown",
        variant: sellFlowData?.variant || null,
        year: sellFlowData?.year
          ? parseInt(sellFlowData.year)
          : new Date().getFullYear(),
        kilometers: sellFlowData?.kilometers
          ? parseInt(sellFlowData.kilometers.replace(/[^0-9]/g, "")) || 0
          : 0,
        condition: selectedCondition,
        registrationNo: "", // Not collected in current flow
        location: sellFlowData?.city || "",

        // Seller info
        sellerName: formData.fullName,
        sellerEmail: formData.email || null,
        sellerPhone: formData.phone,
        sellerAddress: formData.address || null,

        // Inspection scheduling
        inspectionDate: formData.inspectionDate,
        inspectionTime: formData.inspectionTime,
        inspectionAddress: formData.address || null,

        // Price estimates
        estimatedPriceMin: currentPriceRange.min,
        estimatedPriceMax: currentPriceRange.max,
      };

      const response = await fetch("/api/sell-orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.id) {
        toast.success("Sale request submitted successfully!");

        // Store order details for confirmation page
        const formattedDate = formData.inspectionDate
          ? new Date(formData.inspectionDate).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : "";

        if (typeof window !== "undefined") {
          localStorage.setItem(
            "inspectionDetails",
            JSON.stringify({
              date: formattedDate,
              time: formData.inspectionTime,
              orderId: result.id,
            })
          );
          // Clear the sell flow data from sessionStorage
          sessionStorage.removeItem("sellFlowData");
        }

        setShowCelebration(true);
      } else {
        setError(result.error || "Failed to submit sale request");
        toast.error(result.error || "Failed to submit sale request");
      }
    } catch (err) {
      console.error("Sell order submission error:", err);
      setError(
        "An error occurred while processing your request. Please try again."
      );
      toast.error("Error submitting sale request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseCelebration = () => {
    setShowCelebration(false);
    router.push("/sell/confirmation");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Parse price string to number for display
  const parsePrice = (priceStr: string): number => {
    return parseInt(priceStr.replace(/,/g, "")) || 0;
  };

  const agreedPrice = parsePrice(currentPriceRange.max);
  const serviceFee = 5000;
  const totalPayout = agreedPrice - serviceFee;

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
      >
        <div className="bg-gradient-to-r from-blue-600 to-green-500 p-6 text-white">
          <h1 className="text-2xl font-bold">
            Complete Your {sellFlowData?.brand || vehicleType.replace("-", " ")}{" "}
            Sale
          </h1>
          <p className="text-blue-100">
            {sellFlowData?.brand && sellFlowData?.model
              ? `${sellFlowData.brand} ${sellFlowData.model} (${sellFlowData.year})`
              : "Please provide your details to finalize the sale"}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mx-8 mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Schedule Inspection
                  </h3>
                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <p className="text-sm text-blue-800">
                      <span className="font-medium">Note:</span> Our expert will
                      visit your location to inspect the vehicle on your
                      selected date and time.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label
                        htmlFor="inspectionDate"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Preferred Date *
                      </label>
                      <Input
                        id="inspectionDate"
                        name="inspectionDate"
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        max={
                          new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                            .toISOString()
                            .split("T")[0]
                        }
                        value={formData.inspectionDate || ""}
                        onChange={handleInputChange}
                        className="px-4 py-3 rounded-xl bg-gray-50 text-black border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="inspectionTime"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Preferred Time *
                      </label>
                      <Select
                        value={formData.inspectionTime || ""}
                        onValueChange={(value) =>
                          handleSelectChange("inspectionTime", value)
                        }
                      >
                        <SelectTrigger className="px-4 py-3 rounded-xl bg-gray-50 text-black border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
                          <SelectValue placeholder="Select time slot" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="09:00-11:00">
                            09:00 AM - 11:00 AM
                          </SelectItem>
                          <SelectItem value="11:00-13:00">
                            11:00 AM - 01:00 PM
                          </SelectItem>
                          <SelectItem value="14:00-16:00">
                            02:00 PM - 04:00 PM
                          </SelectItem>
                          <SelectItem value="16:00-18:00">
                            04:00 PM - 06:00 PM
                          </SelectItem>
                          <SelectItem value="18:00-20:00">
                            06:00 PM - 08:00 PM
                          </SelectItem>
                          <SelectItem value="20:00-22:00">
                            08:00 PM - 10:00 PM
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Vehicle Condition */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Vehicle Condition
                    </label>
                    <Select
                      value={selectedCondition}
                      onValueChange={setSelectedCondition}
                    >
                      <SelectTrigger className="px-4 py-3 rounded-xl bg-gray-50 text-black border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fair">
                          Fair - Minor issues
                        </SelectItem>
                        <SelectItem value="good">
                          Good - Well maintained
                        </SelectItem>
                        <SelectItem value="veryGood">
                          Very Good - Excellent condition
                        </SelectItem>
                        <SelectItem value="excellent">
                          Excellent - Like new
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Your Details
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Full Name *
                      </label>
                      <Input
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="px-4 py-3 rounded-xl bg-gray-50 text-black border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="px-4 py-3 rounded-xl bg-gray-50 text-black border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Phone Number *
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                          +91
                        </span>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="Enter your phone number"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="pl-12 px-4 py-3 rounded-xl bg-gray-50 text-black border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Address (for inspection)
                      </label>
                      <Input
                        id="address"
                        name="address"
                        type="text"
                        placeholder="Enter your address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="px-4 py-3 rounded-xl bg-gray-50 text-black border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Payment Details (Optional)
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    You can provide bank details now or after inspection is
                    complete.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="bankAccount"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Bank Account Number
                      </label>
                      <Input
                        id="bankAccount"
                        name="bankAccount"
                        type="text"
                        placeholder="Enter your bank account number"
                        value={formData.bankAccount}
                        onChange={handleInputChange}
                        className="px-4 py-3 rounded-xl bg-gray-50 text-black border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="ifscCode"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        IFSC Code
                      </label>
                      <Input
                        id="ifscCode"
                        name="ifscCode"
                        type="text"
                        placeholder="Enter your bank's IFSC code"
                        value={formData.ifscCode}
                        onChange={handleInputChange}
                        className="px-4 py-3 rounded-xl bg-gray-50 text-black border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="paymentMethod"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Preferred Payment Method
                      </label>
                      <Select
                        value={formData.paymentMethod}
                        onValueChange={(value) =>
                          handleSelectChange("paymentMethod", value)
                        }
                      >
                        <SelectTrigger className="px-4 py-3 rounded-xl bg-gray-50 text-black border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bank_transfer">
                            <div className="flex items-center">
                              <Bank className="h-4 w-4 mr-2" />
                              <span>Bank Transfer</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="upi">
                            <div className="flex items-center">
                              <Wallet className="h-4 w-4 mr-2" />
                              <span>UPI</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="cheque">
                            <div className="flex items-center">
                              <CreditCard className="h-4 w-4 mr-2" />
                              <span>Cheque</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-6 bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white px-6 py-4 rounded-xl h-auto text-lg font-medium transition-all duration-300 shadow-lg shadow-blue-200/50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Submit Sale Request
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>

            <div className="md:col-span-2">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 sticky top-8">
                <h2 className="text-xl font-semibold mb-4">Sale Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Vehicle:</span>
                    <span className="font-medium text-right">
                      {sellFlowData?.brand && sellFlowData?.model
                        ? `${sellFlowData.brand} ${sellFlowData.model}`
                        : vehicleType.replace("-", " ")}{" "}
                      ({sellFlowData?.year || "N/A"})
                    </span>
                  </div>
                  {sellFlowData?.kilometers && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Kilometers:</span>
                      <span className="font-medium">
                        {sellFlowData.kilometers}
                      </span>
                    </div>
                  )}
                  {sellFlowData?.city && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium">{sellFlowData.city}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Condition:</span>
                    <span className="font-medium capitalize">
                      {selectedCondition.replace("veryGood", "Very Good")}
                    </span>
                  </div>
                  <div className="h-px bg-gray-200 my-2"></div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estimated Price:</span>
                    <span className="font-medium">
                      ₹{currentPriceRange.min} - ₹{currentPriceRange.max}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service Fee:</span>
                    <span className="font-medium">
                      {formatCurrency(serviceFee)}
                    </span>
                  </div>
                  <div className="h-px bg-gray-200 my-2"></div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Est. Payout:</span>
                    <span className="text-green-600">
                      {formatCurrency(totalPayout)}
                    </span>
                  </div>
                </div>

                <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <div className="flex">
                    <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">Inspection Details:</p>
                      {formData.inspectionDate && formData.inspectionTime ? (
                        <p>
                          {new Date(formData.inspectionDate).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}{" "}
                          | {formData.inspectionTime.replace("-", " - ")}
                        </p>
                      ) : (
                        <p>
                          Please select your preferred inspection date and time.
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-4 bg-green-50 p-4 rounded-lg border border-green-100">
                  <div className="flex">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <div className="text-sm text-green-800">
                      <p className="font-medium">What happens next?</p>
                      <ol className="mt-2 space-y-1 list-decimal list-inside text-xs">
                        <li>Our expert will visit for inspection</li>
                        <li>Get final offer based on inspection</li>
                        <li>Accept offer and receive payment</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <CelebrationAnimation
        isOpen={showCelebration}
        onClose={handleCloseCelebration}
        title="Sale Request Submitted!"
        message="Your vehicle sale request has been successfully submitted. Our team will contact you shortly to confirm the inspection."
        actionText="View Sale Details"
        actionLink="/sell/confirmation"
      />
    </div>
  );
}

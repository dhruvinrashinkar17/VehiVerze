"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  CheckCircle,
  ArrowRight,
  CreditCard,
  Wallet,
  Ban as Bank,
  Car,
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

export function FinalCheckout() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    bankAccount: "",
    ifscCode: "",
    paymentMethod: "bank_transfer",
    inspectionDate: "",
    inspectionTime: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // Vehicle details (would normally come from context or state management)
  const vehicleDetails = {
    type: "Car",
    year: "2020",
    agreedPrice: 375000,
    serviceFee: 5000,
    totalPayout: 370000,
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Format the date for display
    const formattedDate = formData.inspectionDate
      ? new Date(formData.inspectionDate).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "";

    // Store inspection details in localStorage for the confirmation page
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "inspectionDetails",
        JSON.stringify({
          date: formattedDate,
          time: formData.inspectionTime,
        })
      );
    }

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowCelebration(true);
    }, 1500);
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

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
      >
        <div className="bg-gradient-to-r from-blue-600 to-green-500 p-6 text-white">
          <div className="flex items-center gap-3">
            <Car className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-bold">Complete Your Vehicle Sale</h1>
              <p className="text-blue-100">
                Please provide your payment details to finalize the sale
              </p>
            </div>
          </div>
        </div>

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
                        Preferred Date
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
                        Preferred Time
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
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Payment Details
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Full Name
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
                        required
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
                        required
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
                    {isSubmitting ? "Processing..." : "Complete Sale"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </form>
            </div>

            <div className="md:col-span-2">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 sticky top-4">
                <h2 className="text-xl font-semibold mb-4">Sale Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Vehicle:</span>
                    <span className="font-medium">
                      {vehicleDetails.type} ({vehicleDetails.year} Model)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Agreed Price:</span>
                    <span className="font-medium">
                      {formatCurrency(vehicleDetails.agreedPrice)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service Fee:</span>
                    <span className="font-medium">
                      {formatCurrency(vehicleDetails.serviceFee)}
                    </span>
                  </div>
                  <div className="h-px bg-gray-200 my-2"></div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Payout:</span>
                    <span className="text-green-600">
                      {formatCurrency(vehicleDetails.totalPayout)}
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
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <CelebrationAnimation
        isOpen={showCelebration}
        onClose={handleCloseCelebration}
        title="Sale Request Submitted!"
        message="Your vehicle sale request has been successfully submitted. Our team will contact you shortly to schedule an inspection."
        actionText="View Sale Details"
        actionLink="/sell/confirmation"
      />
    </div>
  );
}

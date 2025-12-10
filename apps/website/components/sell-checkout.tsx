"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@vehiverze/ui/button";
import { Input } from "@vehiverze/ui/input";
import { Label } from "@vehiverze/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@vehiverze/ui/select";
import { CelebrationAnimation } from "@/components/celebration-animation";
import Image from "next/image";

export function SellCheckout() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showCelebration, setShowCelebration] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission here
    setShowCelebration(true);
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">
          Complete Your Vehicle Sale
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="full-name">Full Name</Label>
                <Input
                  id="full-name"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div>
                <Label htmlFor="bank-account">Bank Account Number</Label>
                <Input
                  id="bank-account"
                  placeholder="Enter your bank account number"
                  required
                />
              </div>

              <div>
                <Label htmlFor="ifsc-code">IFSC Code</Label>
                <Input
                  id="ifsc-code"
                  placeholder="Enter your bank's IFSC code"
                  required
                />
              </div>

              <div>
                <Label htmlFor="payment-method">Preferred Payment Method</Label>
                <Select onValueChange={setPaymentMethod} required>
                  <SelectTrigger id="payment-method">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                    <SelectItem value="check">Check</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4 border-t border-gray-300">
                <h3 className="text-xl font-semibold mb-2">Sale Summary</h3>
                <p>Vehicle: 2020 Model ABC</p>
                <p>Agreed Price: ₹20,000</p>
                <p>Service Fee: ₹500</p>
                <p className="text-xl font-semibold mt-2">
                  Total Payout: ₹19,500
                </p>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Complete Sale
              </Button>

              <div className="max-w-4xl mx-auto mt-12 p-6 bg-gray-50 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-4">What's Next?</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-100 rounded-full p-2 mr-4">
                      <span className="font-bold text-blue-600">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Vehicle Inspection</h3>
                      <p className="text-gray-600">
                        Our expert will visit your location to inspect the
                        vehicle and verify all details.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-100 rounded-full p-2 mr-4">
                      <span className="font-bold text-blue-600">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Price Confirmation</h3>
                      <p className="text-gray-600">
                        After inspection, we'll confirm the final price based on
                        the vehicle's condition.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-100 rounded-full p-2 mr-4">
                      <span className="font-bold text-blue-600">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Documentation</h3>
                      <p className="text-gray-600">
                        We'll help you with all the paperwork and documentation
                        required for the transfer.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-100 rounded-full p-2 mr-4">
                      <span className="font-bold text-blue-600">4</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Payment Processing</h3>
                      <p className="text-gray-600">
                        Once everything is verified, we'll process the payment
                        directly to your bank account.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">
                Your Vehicle Details
              </h2>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=96&width=96"
                    alt="Vehicle"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">2020 Model ABC</h3>
                  <p className="text-gray-500">Petrol | 30,000 KM</p>
                  <p className="text-gray-500">Registration: DL-01-AB-1234</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Condition</span>
                  <span>Very Good</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Inspection Date</span>
                  <span>15 Mar 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Inspection Location</span>
                  <span>Mumbai</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">
                Why Sell with Vehiverze?
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="bg-green-100 p-1 rounded-full mt-1">
                    <svg
                      className="h-4 w-4 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700">
                    Best market price guaranteed
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-green-100 p-1 rounded-full mt-1">
                    <svg
                      className="h-4 w-4 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700">Hassle-free paperwork</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-green-100 p-1 rounded-full mt-1">
                    <svg
                      className="h-4 w-4 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700">Instant payment</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-green-100 p-1 rounded-full mt-1">
                    <svg
                      className="h-4 w-4 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700">Secure transactions</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 rounded-lg shadow-lg text-white">
              <h2 className="text-xl font-semibold mb-4">Need Help?</h2>
              <p className="mb-4">
                Our support team is available 24/7 to assist you with any
                questions.
              </p>
              <div className="flex items-center gap-3 mb-2">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>+91 9876543210</span>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>support@vehiverze.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CelebrationAnimation
        isOpen={showCelebration}
        onClose={() => setShowCelebration(false)}
        title="Sell Completed Successfully!"
        message="Congratulations! Your vehicle sale has been processed. You will receive payment within 24 hours."
        actionText="View Transaction Details"
        actionLink="/dashboard/transactions"
      />
    </section>
  );
}

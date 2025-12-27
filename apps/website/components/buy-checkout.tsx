"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@vehiverze/ui/button";
import { Input } from "@vehiverze/ui/input";
import { Label } from "@vehiverze/ui/label";
import { Separator } from "@vehiverze/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@vehiverze/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@vehiverze/ui/radio-group";
import { CelebrationAnimation } from "@/components/celebration-animation";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import { ArrowLeft } from "lucide-react";

interface BuyCheckoutProps {
  vehicleId?: string;
}

export function BuyCheckout({ vehicleId: propVehicleId }: BuyCheckoutProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("details");
  const [showCelebration, setShowCelebration] = useState(false);
  const [vehicle, setVehicle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [vehicleId, setVehicleId] = useState<string | null>(
    propVehicleId ?? null
  );
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "card",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  useEffect(() => {
    // Get vehicleId from sessionStorage if not provided as prop
    if (!vehicleId) {
      const storedId =
        typeof window !== "undefined"
          ? sessionStorage.getItem("buyVehicleId")
          : null;
      if (storedId) {
        setVehicleId(storedId);
        return;
      }
      setLoading(false);
      return;
    }

    // Simulate fetching vehicle data
    const fetchVehicle = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        // For now, we'll simulate with some sample data
        setTimeout(() => {
          const vehicleData = {
            id: vehicleId,
            name: "Maruti Suzuki Swift",
            price: 700000,
            year: 2022,
            km: 15000,
            location: "Mumbai",
            image: "/placeholder.svg?height=300&width=500",
            rating: 4.5,
            type: "4 Wheeler",
            color: "Red",
            fuelType: "Petrol",
            transmission: "Manual",
            engineCapacity: "1197 cc",
            mileage: "23.2 kmpl",
            seatingCapacity: 5,
            description:
              "Well maintained Maruti Suzuki Swift with all service records. Single owner vehicle with no accidents.",
          };
          setVehicle(vehicleData);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching vehicle:", error);
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [vehicleId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, paymentMethod: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process payment and show celebration
    setShowCelebration(true);

    // In a real app, you would submit the form data to your backend
    console.log("Form submitted:", formData);
  };

  const handleContinue = () => {
    if (activeTab === "details") {
      setActiveTab("payment");
    } else if (activeTab === "payment") {
      handleSubmit({ preventDefault: () => {} } as React.FormEvent);
    }
  };

  const handleCloseCelebration = () => {
    setShowCelebration(false);
    router.push("/buy/order-success");
  };

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-lg text-gray-600">
              Loading vehicle details...
            </p>
          </div>
        </div>
      </>
    );
  }

  if (!vehicle) {
    return (
      <>
        <NavBar />
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Vehicle Not Found
            </h2>
            <p className="text-gray-600 mb-8">
              The vehicle you are looking for could not be found.
            </p>
            <Button
              onClick={() => router.push("/buy")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Browse Vehicles
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />

      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </button>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Complete Your Purchase
        </h1>

        {showCelebration && (
          <CelebrationAnimation
            isOpen={showCelebration}
            onClose={handleCloseCelebration}
            title="Congratulations!"
            message="Your vehicle purchase has been confirmed. Our team will contact you shortly with next steps."
            actionText="View Order Details"
            actionLink="/buy/order-success"
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="details">Personal Details</TabsTrigger>
                <TabsTrigger value="payment">Payment</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="9876543210"
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="123 Main St"
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Mumbai"
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="Maharashtra"
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="pincode">Pincode</Label>
                    <Input
                      id="pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      placeholder="400001"
                      className="mt-1"
                      required
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    onClick={handleContinue}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Continue to Payment
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="payment" className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Select Payment Method
                  </h3>
                  <RadioGroup
                    value={formData.paymentMethod}
                    onValueChange={handleRadioChange}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-3 border p-4 rounded-md">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex-1 cursor-pointer">
                        Credit/Debit Card
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 border p-4 rounded-md">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi" className="flex-1 cursor-pointer">
                        UPI
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 border p-4 rounded-md">
                      <RadioGroupItem value="netbanking" id="netbanking" />
                      <Label
                        htmlFor="netbanking"
                        className="flex-1 cursor-pointer"
                      >
                        Net Banking
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {formData.paymentMethod === "card" && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="mt-1"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          className="mt-1"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          className="mt-1"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {formData.paymentMethod === "upi" && (
                  <div>
                    <Label htmlFor="upiId">UPI ID</Label>
                    <Input
                      id="upiId"
                      placeholder="yourname@upi"
                      className="mt-1"
                      required
                    />
                  </div>
                )}

                {formData.paymentMethod === "netbanking" && (
                  <div>
                    <Label htmlFor="bank">Select Bank</Label>
                    <select
                      id="bank"
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                      required
                    >
                      <option value="">Select your bank</option>
                      <option value="sbi">State Bank of India</option>
                      <option value="hdfc">HDFC Bank</option>
                      <option value="icici">ICICI Bank</option>
                      <option value="axis">Axis Bank</option>
                      <option value="kotak">Kotak Mahindra Bank</option>
                    </select>
                  </div>
                )}

                <div className="pt-4">
                  <Button
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Complete Purchase
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl h-fit">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

            <div className="flex items-center space-x-4 mb-6">
              <img
                src={vehicle.image || "/placeholder.svg"}
                alt={vehicle.name}
                className="w-24 h-24 object-cover rounded-md"
              />
              <div>
                <h4 className="font-medium">{vehicle.name}</h4>
                <p className="text-sm text-gray-500">
                  {vehicle.year} • {vehicle.km.toLocaleString()} km
                </p>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Vehicle Price</span>
                <span>₹{vehicle.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Registration Transfer</span>
                <span>₹5,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Service Fee</span>
                <span>₹2,500</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Insurance</span>
                <span>₹15,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">GST (18%)</span>
                <span>
                  ₹{Math.round(vehicle.price * 0.18).toLocaleString()}
                </span>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>
                ₹
                {(
                  vehicle.price +
                  5000 +
                  2500 +
                  15000 +
                  Math.round(vehicle.price * 0.18)
                ).toLocaleString()}
              </span>
            </div>

            <div className="mt-6 bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">
                Delivery Information
              </h4>
              <p className="text-sm text-blue-700">
                Your vehicle will be delivered within 7 working days after
                payment confirmation. Our team will contact you to schedule the
                delivery.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

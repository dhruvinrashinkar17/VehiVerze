"use client";

import type React from "react";
import { useState } from "react";
import { Smartphone, ArrowRight } from "lucide-react";
import { Button } from "@vehiverze/ui/button";
import { Input } from "@vehiverze/ui/input";
import { Label } from "@vehiverze/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@vehiverze/ui/tabs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export function LoginContent() {
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [phone, setPhone] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Redirect or update state after successful registration
      window.location.href = "/";
    }, 1500);
  };

  const handleSendOTP = async () => {
    setIsLoading(true);

    try {
      await authClient.phoneNumber.sendOtp({
        phoneNumber: phone.startsWith("+") ? phone : `+91${phone}`,
      });
      setOtpSent(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setIsLoading(true);

    try {
      const code = otp.join("");
      await authClient.phoneNumber.verify({
        phoneNumber: phone.startsWith("+") ? phone : `+91${phone}`,
        code,
      });

      const previousPath = sessionStorage.getItem("previousPath") || "/";
      router.push(previousPath);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(0, 1);
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left side - Login form */}
            <div className="w-full md:w-1/2 p-8 md:p-12">
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <div className="space-y-6">
                    <div className="text-center">
                      <h2 className="text-2xl font-bold text-gray-900">
                        Welcome Back!
                      </h2>
                      <p className="text-gray-600 mt-1">
                        Login to access your account
                      </p>
                    </div>

                    {!otpSent ? (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <div className="relative">
                            <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <Input
                              id="phone"
                              type="tel"
                              placeholder="Enter your phone number"
                              className="pl-10"
                              required
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                            />
                          </div>
                        </div>

                        <Button
                          onClick={handleSendOTP}
                          className="w-full bg-blue-600 hover:bg-blue-700"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <div className="flex items-center justify-center">
                              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                              Sending OTP...
                            </div>
                          ) : (
                            "Send OTP"
                          )}
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="text-center">
                          <p className="text-gray-600">
                            Enter the 4-digit code sent to your phone
                          </p>
                        </div>

                        <div className="flex justify-center gap-3">
                          {otp.map((digit, index) => (
                            <Input
                              key={index}
                              id={`otp-${index}`}
                              type="text"
                              inputMode="numeric"
                              pattern="[0-9]*"
                              maxLength={1}
                              value={digit}
                              onChange={(e) =>
                                handleOtpChange(index, e.target.value)
                              }
                              className="w-12 h-12 text-center text-xl font-bold"
                            />
                          ))}
                        </div>

                        <div className="text-center">
                          <button className="text-blue-600 text-sm hover:underline">
                            Resend OTP
                          </button>
                        </div>

                        <Button
                          onClick={handleVerifyOTP}
                          className="w-full bg-blue-600 hover:bg-blue-700"
                          disabled={isLoading || otp.some((digit) => !digit)}
                        >
                          {isLoading ? (
                            <div className="flex items-center justify-center">
                              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                              Verifying...
                            </div>
                          ) : (
                            "Verify & Login"
                          )}
                        </Button>
                      </div>
                    )}

                    <div className="relative flex items-center justify-center">
                      <div className="border-t border-gray-300 w-full"></div>
                      <div className="bg-white px-3 text-sm text-gray-500 absolute">
                        or continue with
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <button className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg p-2 hover:bg-gray-50">
                        <Image
                          src="/placeholder.svg"
                          alt="Google"
                          width={24}
                          height={24}
                        />
                        Google
                      </button>
                      <button className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg p-2 hover:bg-gray-50">
                        <Image
                          src="/placeholder.svg"
                          alt="Facebook"
                          width={24}
                          height={24}
                        />
                        Facebook
                      </button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="register">
                  <div className="space-y-6">
                    <div className="text-center">
                      <h2 className="text-2xl font-bold text-gray-900">
                        Create Account
                      </h2>
                      <p className="text-gray-600 mt-1">Join Vehiverze today</p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="register-name">Full Name</Label>
                        <Input
                          id="register-name"
                          type="text"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="register-phone">Phone Number</Label>
                        <div className="relative">
                          <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <Input
                            id="register-phone"
                            type="tel"
                            placeholder="Enter your phone number"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="terms"
                          className="rounded text-blue-600"
                          required
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm text-gray-600"
                        >
                          I agree to the{" "}
                          <a
                            href="/terms"
                            className="text-blue-600 hover:underline"
                          >
                            Terms of Service
                          </a>{" "}
                          and{" "}
                          <a
                            href="/privacy"
                            className="text-blue-600 hover:underline"
                          >
                            Privacy Policy
                          </a>
                        </label>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center">
                            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Creating account...
                          </div>
                        ) : (
                          "Create Account"
                        )}
                      </Button>
                    </form>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Right side - Image and benefits */}
            <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 md:p-12 text-white flex flex-col justify-center">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4">
                  Join the Vehiverze Community
                </h2>
                <p className="text-lg opacity-90 mb-6">
                  Create an account to access exclusive features and benefits.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <div className="bg-white/20 p-2 rounded-full mt-1">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl">
                      Track Your Transactions
                    </h3>
                    <p className="opacity-80">
                      Monitor all your vehicle transactions in one place
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-white/20 p-2 rounded-full mt-1">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl">Exclusive Offers</h3>
                    <p className="opacity-80">
                      Get access to member-only deals and discounts
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-white/20 p-2 rounded-full mt-1">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl">Faster Checkout</h3>
                    <p className="opacity-80">
                      Save your details for quicker transactions
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-8">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-4">
                    <Image
                      src="/placeholder.svg"
                      alt="User"
                      width={48}
                      height={48}
                      className="rounded-full border-2 border-white"
                    />
                    <Image
                      src="/placeholder.svg"
                      alt="User"
                      width={48}
                      height={48}
                      className="rounded-full border-2 border-white"
                    />
                    <Image
                      src="/placeholder.svg"
                      alt="User"
                      width={48}
                      height={48}
                      className="rounded-full border-2 border-white"
                    />
                  </div>
                  <div>
                    <p className="font-medium">Join 10,000+ users</p>
                    <p className="text-sm opacity-80">
                      who trust Vehiverze for their vehicle needs
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

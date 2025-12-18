"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@vehiverze/ui/card";
import { Input } from "@vehiverze/ui/input";
import { Button } from "@vehiverze/ui/button";
import { Label } from "@vehiverze/ui/label";
import { Smartphone, Shield, AlertCircle } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await authClient.phoneNumber.sendOtp({
        phoneNumber: phone.startsWith("+") ? phone : `+91${phone}`,
      });
      setOtpSent(true);
    } catch {
      setError("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setIsLoading(true);
    setError("");

    try {
      const code = otp.join("");
      await authClient.phoneNumber.verify({
        phoneNumber: phone.startsWith("+") ? phone : `+91${phone}`,
        code,
      });

      // After login, check if user has staff/admin role
      const baseUrl =
        process.env.NEXT_PUBLIC_WEBSITE_URL || "http://localhost:3000";
      const response = await fetch(`${baseUrl}/api/auth/me`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to verify permissions");
      }

      const data = await response.json();

      if (data.role !== "staff" && data.role !== "admin") {
        // Sign out and show error
        await authClient.signOut();
        setError(
          "Access denied. You do not have staff or admin permissions to access the admin panel."
        );
        setOtpSent(false);
        setOtp(["", "", "", ""]);
        return;
      }

      // Success - redirect to admin dashboard
      router.push("/admin");
    } catch {
      setError("Invalid OTP. Please try again.");
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

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Handle backspace to move to previous input
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#121212]">
      <Card className="w-[400px] bg-[#1a1a1a] border-[#2a2a2a]">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-blue-500/10">
              <Shield className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          <CardTitle className="text-xl text-gray-100">
            Admin Panel Login
          </CardTitle>
          <p className="text-sm text-gray-400 mt-1">
            Enter your phone number to continue
          </p>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="flex items-center gap-2 p-3 mb-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {!otpSent ? (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="phone"
                  className="text-sm font-medium text-gray-200"
                >
                  Phone Number
                </Label>
                <div className="relative">
                  <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    className="pl-10 bg-[#2a2a2a] border-[#3a3a3a] text-gray-100 placeholder:text-gray-500"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Only staff and admin users can access this panel.
                </p>
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isLoading || !phone}
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
            </form>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-gray-400 text-sm">
                  Enter the 4-digit code sent to
                </p>
                <p className="text-gray-200 font-medium">
                  {phone.startsWith("+") ? phone : `+91${phone}`}
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
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-xl font-bold bg-[#2a2a2a] border-[#3a3a3a] text-gray-100"
                  />
                ))}
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setOtpSent(false);
                    setOtp(["", "", "", ""]);
                    setError("");
                  }}
                  className="text-blue-500 text-sm hover:underline"
                >
                  Change phone number
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
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@vehiverze/ui/button";
import { Input } from "@vehiverze/ui/input";
import { Checkbox } from "@vehiverze/ui/checkbox";
import { PhoneIcon as WhatsappIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function VerificationForm() {
  const [phone, setPhone] = useState("");
  const [whatsappUpdates, setWhatsappUpdates] = useState(true);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOTP] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const phoneNumber = phone.startsWith("+") ? phone : `+91${phone}`;

    if (!showOTP) {
      await (await import("@/lib/auth-client")).authClient.phoneNumber.sendOtp({
        phoneNumber,
      });
      setShowOTP(true);
    } else {
      await (await import("@/lib/auth-client")).authClient.phoneNumber.verify({
        phoneNumber,
        code: otp,
      });
      router.push("/evaluation");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          {showOTP ? "Enter verification code" : "Enter your phone number"}
        </h2>
        <p className="text-gray-500">
          {showOTP
            ? "We've sent a code to your phone"
            : "We will save the offer for you"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {!showOTP ? (
          <>
            <div className="relative">
              <Input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="pl-16"
                placeholder="9870947889"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                +91
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Checkbox
                id="whatsapp"
                checked={whatsappUpdates}
                onCheckedChange={(checked) =>
                  setWhatsappUpdates(checked as boolean)
                }
              />
              <div className="flex items-center gap-2">
                <WhatsappIcon className="w-5 h-5 text-green-500" />
                <label htmlFor="whatsapp" className="text-sm text-gray-600">
                  Get instant updates on WhatsApp
                </label>
              </div>
            </div>
          </>
        ) : (
          <Input
            type="text"
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
            className="text-center text-2xl tracking-wider"
            maxLength={4}
            placeholder="• • • •"
          />
        )}

        <Button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600"
        >
          {showOTP ? "Verify Code" : "Get Car Price"}
        </Button>
      </form>

      <p className="text-xs text-gray-500 text-center">
        By continuing you agree to our{" "}
        <Link href="/privacy" className="text-blue-600">
          Privacy Policy
        </Link>
        ,{" "}
        <Link href="/terms" className="text-blue-600">
          Terms of Use
        </Link>{" "}
        and{" "}
        <Link href="/terms" className="text-blue-600">
          T&C of Marketplace
        </Link>
      </p>

      <p className="text-sm text-gray-500 text-center">
        We respect your privacy and your information is secure with us
      </p>
    </div>
  );
}

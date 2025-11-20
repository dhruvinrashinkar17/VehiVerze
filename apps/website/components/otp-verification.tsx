"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@vehiverze/ui/button"
import { Input } from "@vehiverze/ui/input"

export function OtpVerification({ phoneNumber = "09876543210" }) {
  const router = useRouter()
  const [otp, setOtp] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)

  const handleVerify = (e) => {
    e.preventDefault()
    setIsVerifying(true)

    // Simulate verification
    setTimeout(() => {
      setIsVerifying(false)
      router.push("/sell/confirmation") // Navigate to confirmation page
    }, 1500)
  }

  const handleResendOtp = () => {
    // Resend OTP logic
    alert("New OTP sent!")
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Verify Your Phone Number</h2>

      <p className="text-gray-500 mb-6 text-center">We've sent a verification code to {phoneNumber}</p>

      <form onSubmit={handleVerify} className="space-y-6">
        <Input
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="text-center text-xl py-6"
          required
        />

        <div className="text-center">
          <button type="button" onClick={handleResendOtp} className="text-blue-600 hover:underline">
            Resend OTP
          </button>
        </div>

        <div className="flex justify-between pt-4">
          <Button variant="outline" type="button" onClick={() => router.back()}>
            Back
          </Button>
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white"
            disabled={isVerifying || otp.length < 4}
          >
            {isVerifying ? "Verifying..." : "Continue"}
          </Button>
        </div>
      </form>
    </div>
  )
}



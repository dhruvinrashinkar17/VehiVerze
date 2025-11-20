"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@vehiverze/ui/button"
import { Input } from "@vehiverze/ui/input"
import { SellFlowHeader } from "./sell-flow-header"

interface OtpVerificationWithBreadcrumbProps {
  phone: string
  onVerified: () => void
  onBack: () => void
}

export function OtpVerificationWithBreadcrumb({ phone, onVerified, onBack }: OtpVerificationWithBreadcrumbProps) {
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    if (otp.length !== 4) {
      setError("Please enter a valid 4-digit OTP")
      return
    }

    setLoading(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      onVerified()
    } catch (err) {
      setError("Failed to verify OTP. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    alert("OTP resent successfully!")
    setLoading(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <SellFlowHeader step={3} title="Verify Your Phone Number" />

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="max-w-md mx-auto">
          <h2 className="text-xl font-semibold mb-2">Verify Your Phone Number</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">We've sent a verification code to {phone}</p>

          <form onSubmit={handleVerify} className="space-y-6">
            <Input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
              maxLength={4}
              placeholder="Enter 4-digit OTP"
              className="text-center text-2xl tracking-wider"
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-800"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={handleResend}
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
                disabled={loading}
              >
                Resend OTP
              </button>
            </div>
          </form>

          <div className="mt-6">
            <Button variant="outline" onClick={onBack} className="w-full">
              Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}



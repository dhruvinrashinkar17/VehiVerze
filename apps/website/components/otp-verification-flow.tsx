"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@vehiverze/ui/button"
import { Input } from "@vehiverze/ui/input"

interface OtpVerificationFlowProps {
  phone: string
  onVerified: () => void
}

export function OtpVerificationFlow({ phone, onVerified }: OtpVerificationFlowProps) {
  const [otp, setOtp] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // In a real app, we would verify the OTP with the backend
      // For demo purposes, we'll just simulate a successful verification
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Demo verification - any 4-digit code works
      if (otp.length === 4) {
        onVerified()
      } else {
        throw new Error("Invalid OTP. Please enter a 4-digit code.")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed")
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    setLoading(true)
    setError("")

    try {
      // In a real app, we would resend the OTP
      // For demo purposes, we'll just simulate a successful resend
      await new Promise((resolve) => setTimeout(resolve, 1000))
      alert("Demo OTP: 1234")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send OTP")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Verify Your Phone Number</h2>
        <p className="text-gray-500 dark:text-gray-400">We've sent a verification code to {phone}</p>
      </div>

      <form onSubmit={handleVerify} className="space-y-6">
        <div>
          <Input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="text-center text-2xl tracking-wider"
            maxLength={4}
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

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
    </div>
  )
}



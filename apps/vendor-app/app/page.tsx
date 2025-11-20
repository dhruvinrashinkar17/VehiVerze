"use client"

import { useState } from "react"
import { Button } from "@vehiverze/ui/button"
import { Input } from "@vehiverze/ui/input"
import { Card, CardContent } from "@vehiverze/ui/card"
import Link from "next/link"

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [showOTP, setShowOTP] = useState(false)
  const [otp, setOTP] = useState("")

  const handleLogin = () => {
    if (phoneNumber === "9870947889" && otp === "4321") {
      window.location.href = "/dashboard"
    } else {
      alert("Invalid credentials")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <img src="/placeholder.svg" alt="Login" className="mx-auto h-48 w-48" />
        </div>

        <Card>
          <CardContent className="pt-6 space-y-4">
            {!showOTP ? (
              <div className="space-y-4">
                <Input
                  type="tel"
                  placeholder="Enter Registered Mobile"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="text-center text-lg"
                />
                <Button
                  className="w-full hover:bg-blue-600 text-lg py-6 bg-blue-600"
                  onClick={() => setShowOTP(true)}
                >
                  Get OTP
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOTP(e.target.value)}
                  className="text-center text-lg"
                  maxLength={4}
                />
                <Button className="w-full hover:bg-blue-600 text-lg py-6 bg-blue-600" onClick={handleLogin}>
                  Login
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center">
          <Link href="/onboard/personal" className="text-blue-600 hover:text-blue-700">
            <p className="text-base text-blue-600">Don&apos;t Have an account?</p>
            <p className="text-lg font-medium text-blue-600">To Partner with Us! Click Here</p>
          </Link>
        </div>
      </div>
    </div>
  )
}



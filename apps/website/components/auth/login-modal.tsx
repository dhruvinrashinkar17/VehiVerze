"use client"

import type React from "react"

import { useState } from "react"
import { X, Eye, EyeOff, Mail, Lock, User, Smartphone } from "lucide-react"
import { Button } from "@vehiverze/ui/button"
import { Input } from "@vehiverze/ui/input"
import { Label } from "@vehiverze/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@vehiverze/ui/tabs"
import Image from "next/image"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email")
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState(["", "", "", ""])

  if (!isOpen) return null

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Redirect or update state after successful login
      onClose()
      // Show success message
      alert("Login successful!")
    }, 1500)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Redirect or update state after successful registration
      onClose()
      // Show success message
      alert("Registration successful!")
    }, 1500)
  }

  const handleSendOTP = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setOtpSent(true)
    }, 1500)
  }

  const handleVerifyOTP = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      onClose()
      // Show success message
      alert("Login successful!")
    }, 1500)
  }

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(0, 1)
    }

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      if (nextInput) {
        nextInput.focus()
      }
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X className="h-6 w-6" />
        </button>

        <div className="flex">
          {/* Left side - Login form */}
          <div className="w-full p-8">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Welcome Back!</h2>
                    <p className="text-gray-600 mt-1">Login to access your account</p>
                  </div>

                  {!otpSent ? (
                    <>
                      <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
                        <button
                          className={`flex-1 py-2 rounded-md text-sm font-medium ${loginMethod === "email" ? "bg-white shadow-sm" : "text-gray-600"}`}
                          onClick={() => setLoginMethod("email")}
                        >
                          Email
                        </button>
                        <button
                          className={`flex-1 py-2 rounded-md text-sm font-medium ${loginMethod === "phone" ? "bg-white shadow-sm" : "text-gray-600"}`}
                          onClick={() => setLoginMethod("phone")}
                        >
                          Phone
                        </button>
                      </div>

                      {loginMethod === "email" ? (
                        <form onSubmit={handleLogin} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                              <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                className="pl-10"
                                required
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <Label htmlFor="password">Password</Label>
                              <a href="#" className="text-sm text-blue-600 hover:underline">
                                Forgot password?
                              </a>
                            </div>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                              <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="pl-10 pr-10"
                                required
                              />
                              <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                              </button>
                            </div>
                          </div>

                          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                            {isLoading ? (
                              <div className="flex items-center justify-center">
                                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                Logging in...
                              </div>
                            ) : (
                              "Login"
                            )}
                          </Button>
                        </form>
                      ) : (
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
                      )}
                    </>
                  ) : (
                    <div className="space-y-6">
                      <div className="text-center">
                        <p className="text-gray-600">Enter the 4-digit code sent to your phone</p>
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
                            className="w-12 h-12 text-center text-xl font-bold"
                          />
                        ))}
                      </div>

                      <div className="text-center">
                        <button className="text-blue-600 text-sm hover:underline">Resend OTP</button>
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
                    <div className="bg-white px-3 text-sm text-gray-500 absolute">or continue with</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg p-2 hover:bg-gray-50">
                      <Image src="/placeholder.svg?height=24&width=24" alt="Google" width={24} height={24} />
                      Google
                    </button>
                    <button className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg p-2 hover:bg-gray-50">
                      <Image src="/placeholder.svg?height=24&width=24" alt="Facebook" width={24} height={24} />
                      Facebook
                    </button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="register">
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
                    <p className="text-gray-600 mt-1">Join Vehiverze today</p>
                  </div>

                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                          id="register-name"
                          type="text"
                          placeholder="Enter your full name"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                          id="register-email"
                          type="email"
                          placeholder="Enter your email"
                          className="pl-10"
                          required
                        />
                      </div>
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

                    <div className="space-y-2">
                      <Label htmlFor="register-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                          id="register-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
                          className="pl-10 pr-10"
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="terms" className="rounded text-blue-600" required />
                      <label htmlFor="terms" className="text-sm text-gray-600">
                        I agree to the{" "}
                        <a href="/terms" className="text-blue-600 hover:underline">
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="/privacy" className="text-blue-600 hover:underline">
                          Privacy Policy
                        </a>
                      </label>
                    </div>

                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
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
        </div>
      </div>
    </div>
  )
}



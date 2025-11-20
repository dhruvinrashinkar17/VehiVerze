"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@vehiverze/ui/button"
import { Input } from "@vehiverze/ui/input"

export default function PersonalDetails() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    shopName: "",
    phoneNumber: "",
    email: "",
    shopAddress: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.shopName.trim()) newErrors.shopName = "Shop name is required"
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Please enter a valid email"
    if (!formData.shopAddress.trim()) newErrors.shopAddress = "Shop address is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isFormValid = () => {
    return (
      formData.firstName.trim() &&
      formData.lastName.trim() &&
      formData.shopName.trim() &&
      formData.phoneNumber.trim() &&
      formData.email.trim() &&
      /\S+@\S+\.\S+/.test(formData.email) &&
      formData.shopAddress.trim()
    )
  }

  const handleNext = () => {
    if (validateForm()) {
      // Form is valid, proceed to next step
      window.location.href = "/onboard/devices"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="p-4 text-white bg-blue-600">
        <div className="flex items-center">
          <Link href="/" className="mr-4">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-2xl font-semibold">Vendor OnBoard</h1>
        </div>
      </header>

      <main className="p-4">
        <div className="mx-auto max-w-md space-y-6">
          <h2 className="text-3xl font-bold text-blue-600">Personal Details</h2>

          <form className="space-y-4">
            <div className="space-y-2">
              <label className="text-xl font-semibold">First Name</label>
              <Input
                placeholder="Enter your first name"
                className="rounded-xl bg-white p-6 text-lg"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
              />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-xl font-semibold">Last Name</label>
              <Input
                placeholder="Enter your last name"
                className="rounded-xl bg-white p-6 text-lg"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
              />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-xl font-semibold">Shop Name</label>
              <Input
                placeholder="Enter your shop name"
                className="rounded-xl bg-white p-6 text-lg"
                value={formData.shopName}
                onChange={(e) => handleInputChange("shopName", e.target.value)}
              />
              {errors.shopName && <p className="text-red-500 text-sm">{errors.shopName}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-xl font-semibold">Phone Number</label>
              <Input
                type="tel"
                placeholder="Enter your phone number"
                className="rounded-xl bg-white p-6 text-lg"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              />
              {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-xl font-semibold">Email</label>
              <Input
                type="email"
                placeholder="Enter your email"
                className="rounded-xl bg-white p-6 text-lg"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-xl font-semibold">Shop Address</label>
              <Input
                placeholder="Enter your shop address"
                className="rounded-xl bg-white p-6 text-lg"
                value={formData.shopAddress}
                onChange={(e) => handleInputChange("shopAddress", e.target.value)}
              />
              {errors.shopAddress && <p className="text-red-500 text-sm">{errors.shopAddress}</p>}
            </div>

            <Button
              type="button"
              className={`mt-6 w-full rounded-xl p-6 text-lg font-semibold transition-all duration-200 ${
                isFormValid()
                  ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                  : "bg-gray-400 cursor-not-allowed opacity-50"
              }`}
              onClick={handleNext}
              disabled={!isFormValid()}
            >
              Next
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}



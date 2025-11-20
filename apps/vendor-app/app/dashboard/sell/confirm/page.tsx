"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, CheckCircle, Clock } from "lucide-react"
import { Button } from "@vehiverze/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@vehiverze/ui/card"

export default function ConfirmSubmissionPage() {
  const searchParams = useSearchParams()
  const category = searchParams.get("category") || ""

  const [formData, setFormData] = useState<any>(null)
  const [photoCount, setPhotoCount] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [referenceId, setReferenceId] = useState("")

  useEffect(() => {
    // Retrieve form data from sessionStorage
    const storedFormData = sessionStorage.getItem("vehicleFormData")
    const storedPhotos = sessionStorage.getItem("vehiclePhotos")

    if (storedFormData) {
      setFormData(JSON.parse(storedFormData))
    }

    if (storedPhotos) {
      const photos = JSON.parse(storedPhotos)
      setPhotoCount(photos.length)
    }
  }, [])

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const refId = `VV-SELL-${Date.now().toString().slice(-8)}`
    setReferenceId(refId)
    setSubmitted(true)

    // Clear sessionStorage
    sessionStorage.removeItem("vehicleFormData")
    sessionStorage.removeItem("vehiclePhotos")

    setIsSubmitting(false)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <CheckCircle className="h-20 w-20 text-green-500" />
              <div className="absolute -top-1 -right-1">
                <Clock className="h-8 w-8 text-blue-500 animate-pulse" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-gray-800">Vehicle Submitted Successfully!</h1>
            <p className="text-gray-600 leading-relaxed">
              Your vehicle listing has been submitted for admin review. We will verify all details and photos before
              publishing it on Vehiverze.com.
            </p>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 space-y-3">
            <h3 className="font-semibold text-blue-800">What happens next?</h3>
            <div className="space-y-2 text-sm text-blue-700">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Admin verification (1-2 business days)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Quality check and photo validation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Approval and live publishing</span>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-green-700">
              <strong>Reference ID:</strong> {referenceId}
            </p>
            <p className="text-xs text-green-600 mt-1">Please save this reference ID for future communication</p>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-gray-500">
              You can track the status of your listing in the dashboard. We will notify you via email and SMS once
              approved or rejected.
            </p>

            <div className="flex gap-3">
              <Link href="/dashboard" className="flex-1">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3">
                  Back to Dashboard
                </Button>
              </Link>
              <Link href="/dashboard/sell" className="flex-1">
                <Button
                  variant="outline"
                  className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 rounded-xl py-3 bg-transparent"
                >
                  Sell Another
                </Button>
              </Link>
            </div>
          </div>

          <div className="text-xs text-gray-400 border-t pt-4">
            Need help? Contact us at support@vehiverze.com or call +91-XXXX-XXXX-XX
          </div>
        </div>
      </div>
    )
  }

  if (!formData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="p-4 text-white bg-blue-600">
        <div className="flex items-center">
          <Link href={`/dashboard/sell/photos?category=${category}`} className="mr-4">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-2xl font-semibold">Review & Submit</h1>
        </div>
      </header>

      <main className="p-4">
        <div className="mx-auto max-w-2xl space-y-8">
          <section>
            <h2 className="mb-2 text-2xl font-bold">Step 4: Review Your Listing</h2>
            <p className="text-gray-600 mb-6">Please review all details before submitting for approval</p>

            {/* Vehicle Details Summary */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Vehicle Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Brand</p>
                    <p className="font-semibold">{formData.brand}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Model</p>
                    <p className="font-semibold">{formData.model}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Year</p>
                    <p className="font-semibold">{formData.year}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Variant</p>
                    <p className="font-semibold">{formData.variant || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Transmission</p>
                    <p className="font-semibold">{formData.transmission}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Fuel Type</p>
                    <p className="font-semibold">{formData.fuelType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Price</p>
                    <p className="font-semibold">₹{Number.parseInt(formData.price).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-semibold">{formData.location}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-gray-600 mb-2">Description</p>
                  <p className="text-gray-700">{formData.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Photos Summary */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Photos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 border border-blue-200 px-4 py-3 rounded-lg">
                  <p className="text-blue-700">
                    <strong>{photoCount}</strong> photos uploaded and ready for review
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Important Notes */}
            <Card className="mb-6 border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="text-orange-900">Important Notes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-orange-800">
                <p>
                  Your listing will be reviewed by our admin team within 1-2 business days. Please ensure all
                  information is accurate and photos are clear.
                </p>
                <p>
                  If any information is incorrect or photos are unclear, your listing may be rejected. You can then
                  resubmit with corrections.
                </p>
                <p>Once approved, your vehicle will be live on Vehiverze.com and visible to potential buyers.</p>
              </CardContent>
            </Card>

            <div className="mt-8 flex gap-4">
              <Link href={`/dashboard/sell/photos?category=${category}`} className="flex-1">
                <Button variant="outline" className="w-full py-6 text-lg bg-transparent">
                  Back
                </Button>
              </Link>
              <Button
                className="flex-1 bg-green-600 hover:bg-green-700 py-6 text-lg"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit for Approval"}
              </Button>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}



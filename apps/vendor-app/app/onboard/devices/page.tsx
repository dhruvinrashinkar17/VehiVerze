"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { ArrowLeft, CheckCircle, Clock } from "lucide-react"
import Link from "next/link"
import { Button } from "@vehiverze/ui/button"
import { ImagePlus } from "lucide-react"

const deviceTypes = ["2-Wheelers", "3-Wheelers", "4-Wheelers", "6-Wheelers", "More-Than-8-Wheelers"]

const serviceTypes = [
  { name: "Buying", color: "bg-green-600 hover:bg-green-700", description: "Vehicle purchasing services" },
  { name: "Selling", color: "bg-blue-600 hover:bg-blue-700", description: "Vehicle selling services" },
  { name: "Garage Services", color: "bg-orange-600 hover:bg-orange-700", description: "Vehicle maintenance & repair" },
]

export default function DeviceSelection() {
  const [selectedVehicleTypes, setSelectedVehicleTypes] = useState<string[]>([])
  const [selectedServiceType, setSelectedServiceType] = useState<string>("")
  const [showPanCardOptions, setShowPanCardOptions] = useState(false)
  const [showAadharFrontOptions, setShowAadharFrontOptions] = useState(false)
  const [showAadharBackOptions, setShowAadharBackOptions] = useState(false)
  const [showShopPhotoOptions, setShowShopPhotoOptions] = useState(false)
  const [showVerificationUI, setShowVerificationUI] = useState(false)

  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File | null>>({
    panCard: null,
    aadharFront: null,
    aadharBack: null,
    shopPhoto: null,
  })

  const containerRef = useRef<HTMLDivElement>(null)

  const handleVehicleTypeToggle = (vehicleType: string) => {
    setSelectedVehicleTypes((prev) => {
      if (prev.includes(vehicleType)) {
        return prev.filter((type) => type !== vehicleType)
      } else {
        return [...prev, vehicleType]
      }
    })
  }

  const handleUploadOption = async (type: string, document: string) => {
    console.log(`Selected ${type} for ${document}`)

    // Check if we're in the browser environment
    if (typeof window === "undefined") {
      console.error("This function can only be called in the browser")
      return
    }

    if (type === "camera") {
      // Check if device supports camera
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          // Request camera access
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" }, // Use rear camera
          })

          // Create video element to show camera feed
          const video = window.document.createElement("video")
          video.srcObject = stream
          video.autoplay = true
          video.style.position = "fixed"
          video.style.top = "0"
          video.style.left = "0"
          video.style.width = "100vw"
          video.style.height = "100vh"
          video.style.objectFit = "cover"
          video.style.zIndex = "9999"
          video.style.backgroundColor = "black"

          // Create capture button
          const captureBtn = window.document.createElement("button")
          captureBtn.innerHTML = "📷 Capture"
          captureBtn.style.position = "fixed"
          captureBtn.style.bottom = "20px"
          captureBtn.style.left = "50%"
          captureBtn.style.transform = "translateX(-50%)"
          captureBtn.style.padding = "15px 30px"
          captureBtn.style.fontSize = "18px"
          captureBtn.style.backgroundColor = "#3b82f6"
          captureBtn.style.color = "white"
          captureBtn.style.border = "none"
          captureBtn.style.borderRadius = "25px"
          captureBtn.style.zIndex = "10000"
          captureBtn.style.cursor = "pointer"

          // Create close button
          const closeBtn = window.document.createElement("button")
          closeBtn.innerHTML = "✕"
          closeBtn.style.position = "fixed"
          closeBtn.style.top = "20px"
          closeBtn.style.right = "20px"
          closeBtn.style.padding = "10px 15px"
          closeBtn.style.fontSize = "20px"
          closeBtn.style.backgroundColor = "rgba(0,0,0,0.5)"
          closeBtn.style.color = "white"
          closeBtn.style.border = "none"
          closeBtn.style.borderRadius = "50%"
          closeBtn.style.zIndex = "10000"
          closeBtn.style.cursor = "pointer"

          window.document.body.appendChild(video)
          window.document.body.appendChild(captureBtn)
          window.document.body.appendChild(closeBtn)

          // Handle capture
          captureBtn.onclick = () => {
            const canvas = window.document.createElement("canvas")
            canvas.width = video.videoWidth
            canvas.height = video.videoHeight
            const ctx = canvas.getContext("2d")
            ctx?.drawImage(video, 0, 0)

            canvas.toBlob(
              (blob) => {
                if (blob) {
                  const file = new File([blob], `${document}_camera.jpg`, { type: "image/jpeg" })
                  console.log(`Camera photo captured for ${document}:`, file)
                  setUploadedFiles((prev) => ({ ...prev, [document]: file }))
                }
              },
              "image/jpeg",
              0.8,
            )

            // Clean up
            stream.getTracks().forEach((track) => track.stop())
            window.document.body.removeChild(video)
            window.document.body.removeChild(captureBtn)
            window.document.body.removeChild(closeBtn)
          }

          // Handle close
          closeBtn.onclick = () => {
            stream.getTracks().forEach((track) => track.stop())
            window.document.body.removeChild(video)
            window.document.body.removeChild(captureBtn)
            window.document.body.removeChild(closeBtn)
          }
        } catch (error) {
          console.error("Camera access denied:", error)
          alert("Camera access denied. Please allow camera permission or use gallery option.")
          // Fallback to file input with camera capture
          const input = window.document.createElement("input")
          input.type = "file"
          input.accept = "image/*"
          input.capture = "environment"
          input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0]
            if (file) {
              console.log(`Camera photo selected for ${document}:`, file)
              setUploadedFiles((prev) => ({ ...prev, [document]: file }))
            }
          }
          input.click()
        }
      } else {
        // Fallback for devices without camera API
        const input = window.document.createElement("input")
        input.type = "file"
        input.accept = "image/*"
        input.capture = "environment"
        input.onchange = (e) => {
          const file = (e.target as HTMLInputElement).files?.[0]
          if (file) {
            console.log(`Camera photo selected for ${document}:`, file)
            setUploadedFiles((prev) => ({ ...prev, [document]: file }))
          }
        }
        input.click()
      }
    } else if (type === "gallery") {
      // Open gallery/image picker
      const input = window.document.createElement("input")
      input.type = "file"
      input.accept = "image/*"
      input.multiple = false
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0]
        if (file) {
          // Validate file type
          if (!file.type.startsWith("image/")) {
            alert("Please select an image file.")
            return
          }
          // Validate file size (max 5MB)
          if (file.size > 5 * 1024 * 1024) {
            alert("File size should be less than 5MB.")
            return
          }
          console.log(`Gallery image selected for ${document}:`, file)
          setUploadedFiles((prev) => ({ ...prev, [document]: file }))
        }
      }
      input.click()
    } else if (type === "files") {
      // Open file picker (supports more file types)
      const input = window.document.createElement("input")
      input.type = "file"
      input.accept = "image/*,application/pdf,.doc,.docx"
      input.multiple = false
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0]
        if (file) {
          // Validate file size (max 10MB)
          if (file.size > 10 * 1024 * 1024) {
            alert("File size should be less than 10MB.")
            return
          }
          // Validate file type
          const allowedTypes = [
            "image/",
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          ]
          const isValidType = allowedTypes.some((type) => file.type.startsWith(type) || file.type === type)
          if (!isValidType) {
            alert("Please select an image, PDF, or Word document.")
            return
          }
          console.log(`File selected for ${document}:`, file)
          setUploadedFiles((prev) => ({ ...prev, [document]: file }))
        }
      }
      input.click()
    }

    // Close the options dropdown
    if (document === "panCard") setShowPanCardOptions(false)
    if (document === "aadharFront") setShowAadharFrontOptions(false)
    if (document === "aadharBack") setShowAadharBackOptions(false)
    if (document === "shopPhoto") setShowShopPhotoOptions(false)
  }

  // Handle clicking outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowPanCardOptions(false)
        setShowAadharFrontOptions(false)
        setShowAadharBackOptions(false)
        setShowShopPhotoOptions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handlePanCardClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowPanCardOptions(!showPanCardOptions)
    // Close other dropdowns
    setShowAadharFrontOptions(false)
    setShowAadharBackOptions(false)
    setShowShopPhotoOptions(false)
  }

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const isFormValid = () => {
    const hasSelectedServiceType = selectedServiceType !== ""
    const hasSelectedVehicleTypes = selectedVehicleTypes.length > 0
    const hasAllDocuments =
      uploadedFiles.panCard && uploadedFiles.aadharFront && uploadedFiles.aadharBack && uploadedFiles.shopPhoto
    return hasSelectedServiceType && hasSelectedVehicleTypes && hasAllDocuments
  }

  const handleSubmit = () => {
    if (isFormValid()) {
      setShowVerificationUI(true)
    }
  }

  // Add this check at the beginning of the component render
  if (!isMounted) {
    return <div>Loading...</div>
  }

  if (showVerificationUI) {
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
            <h1 className="text-2xl font-bold text-gray-800">Application Submitted Successfully!</h1>
            <p className="text-gray-600 leading-relaxed">
              Thank you for your interest in partnering with VehiVerze. We have received your application and all
              required documents.
            </p>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 space-y-3">
            <h3 className="font-semibold text-blue-800">What happens next?</h3>
            <div className="space-y-2 text-sm text-blue-700">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Document verification (1-2 business days)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Background check and approval process</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Account activation and onboarding</span>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-green-700">
              <strong>Reference ID:</strong> VV-{Date.now().toString().slice(-8)}
            </p>
            <p className="text-xs text-green-600 mt-1">Please save this reference ID for future communication</p>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-gray-500">
              We will notify you via email and SMS once your application is reviewed. This typically takes 2-3 business
              days.
            </p>

            <div className="flex gap-3">
              <Button
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3"
                onClick={() => (window.location.href = "/")}
              >
                Back to Login
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-xl py-3 bg-transparent"
                onClick={() => {
                  const phoneNumber = "1234567890" // Replace with actual support number
                  window.open(`tel:${phoneNumber}`)
                }}
              >
                Contact Support
              </Button>
            </div>
          </div>

          <div className="text-xs text-gray-400 border-t pt-4">
            Need help? Contact us at support@vehiverze.com or call +91-XXXX-XXXX-XX
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="p-4 text-white bg-blue-600">
        <div className="flex items-center">
          <Link href="/onboard/personal" className="mr-4">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-2xl font-semibold">Vendor OnBoard</h1>
        </div>
      </header>

      <main className="p-4">
        <div className="mx-auto max-w-md space-y-8" ref={containerRef}>
          <section>
            <h2 className="mb-4 text-2xl font-bold">Select Service Type</h2>
            <div className="space-y-3">
              {serviceTypes.map((service) => (
                <Button
                  key={service.name}
                  variant={selectedServiceType === service.name ? "default" : "outline"}
                  className={`w-full p-6 text-left transition-all duration-200 ${
                    selectedServiceType === service.name
                      ? `${service.color} text-white`
                      : "bg-white hover:bg-gray-50 border-2"
                  }`}
                  onClick={() => setSelectedServiceType(service.name)}
                >
                  <div className="flex flex-col">
                    <span className="text-lg font-semibold">{service.name}</span>
                    <span
                      className={`text-sm ${selectedServiceType === service.name ? "text-white/80" : "text-gray-600"}`}
                    >
                      {service.description}
                    </span>
                  </div>
                </Button>
              ))}
            </div>
            {selectedServiceType === "" && <p className="text-red-500 text-sm mt-2">Please select a service type</p>}
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold">Select Vehicle Types</h2>
            <div className="flex flex-wrap gap-2">
              {deviceTypes.map((device) => (
                <Button
                  key={device}
                  variant={selectedVehicleTypes.includes(device) ? "default" : "outline"}
                  className={`rounded-full px-6 py-2 text-lg transition-all duration-200 ${
                    selectedVehicleTypes.includes(device)
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-white hover:bg-blue-50"
                  }`}
                  onClick={() => handleVehicleTypeToggle(device)}
                >
                  {device}
                </Button>
              ))}
            </div>
            {selectedVehicleTypes.length === 0 && (
              <p className="text-red-500 text-sm mt-2">Please select at least one vehicle type</p>
            )}
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Required Documents</h2>

            <div className="space-y-4">
              <div className="rounded-xl bg-white p-6">
                <h3 className="mb-4 text-xl font-semibold flex items-center gap-2">
                  Pan Card
                  {uploadedFiles.panCard && <CheckCircle className="h-5 w-5 text-green-500" />}
                </h3>
                <div className="relative">
                  <Button variant="outline" className="w-full py-8 bg-transparent" onClick={handlePanCardClick}>
                    <ImagePlus className="mr-2 h-6 w-6" />
                    {uploadedFiles.panCard ? uploadedFiles.panCard.name : "Upload Pan Card"}
                  </Button>

                  {showPanCardOptions && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                      <button
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 border-b"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleUploadOption("camera", "panCard")
                        }}
                      >
                        <span className="text-xl">📷</span>
                        Take Photo with Camera
                      </button>
                      <button
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 border-b"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleUploadOption("gallery", "panCard")
                        }}
                      >
                        <span className="text-xl">🖼️</span>
                        Select from Gallery
                      </button>
                      <button
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleUploadOption("files", "panCard")
                        }}
                      >
                        <span className="text-xl">📁</span>
                        Choose from Files
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-xl bg-white p-6">
                <h3 className="mb-4 text-xl font-semibold flex items-center gap-2">
                  Aadhar Card Front
                  {uploadedFiles.aadharFront && <CheckCircle className="h-5 w-5 text-green-500" />}
                </h3>
                <div className="relative">
                  <Button
                    variant="outline"
                    className="w-full py-8 bg-transparent"
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowAadharFrontOptions(!showAadharFrontOptions)
                      setShowPanCardOptions(false)
                      setShowAadharBackOptions(false)
                      setShowShopPhotoOptions(false)
                    }}
                  >
                    <ImagePlus className="mr-2 h-6 w-6" />
                    {uploadedFiles.aadharFront ? uploadedFiles.aadharFront.name : "Upload Aadhar Card Front"}
                  </Button>

                  {showAadharFrontOptions && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                      <button
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 border-b"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleUploadOption("camera", "aadharFront")
                        }}
                      >
                        <span className="text-xl">📷</span>
                        Take Photo with Camera
                      </button>
                      <button
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 border-b"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleUploadOption("gallery", "aadharFront")
                        }}
                      >
                        <span className="text-xl">🖼️</span>
                        Select from Gallery
                      </button>
                      <button
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleUploadOption("files", "aadharFront")
                        }}
                      >
                        <span className="text-xl">📁</span>
                        Choose from Files
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-xl bg-white p-6">
                <h3 className="mb-4 text-xl font-semibold flex items-center gap-2">
                  Aadhar Card Back
                  {uploadedFiles.aadharBack && <CheckCircle className="h-5 w-5 text-green-500" />}
                </h3>
                <div className="relative">
                  <Button
                    variant="outline"
                    className="w-full py-8 bg-transparent"
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowAadharBackOptions(!showAadharBackOptions)
                      setShowPanCardOptions(false)
                      setShowAadharFrontOptions(false)
                      setShowShopPhotoOptions(false)
                    }}
                  >
                    <ImagePlus className="mr-2 h-6 w-6" />
                    {uploadedFiles.aadharBack ? uploadedFiles.aadharBack.name : "Upload Aadhar Card Back"}
                  </Button>

                  {showAadharBackOptions && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                      <button
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 border-b"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleUploadOption("camera", "aadharBack")
                        }}
                      >
                        <span className="text-xl">📷</span>
                        Take Photo with Camera
                      </button>
                      <button
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 border-b"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleUploadOption("gallery", "aadharBack")
                        }}
                      >
                        <span className="text-xl">🖼️</span>
                        Select from Gallery
                      </button>
                      <button
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleUploadOption("files", "aadharBack")
                        }}
                      >
                        <span className="text-xl">📁</span>
                        Choose from Files
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-xl bg-white p-6">
                <h3 className="mb-4 text-xl font-semibold flex items-center gap-2">
                  Shop Photo
                  {uploadedFiles.shopPhoto && <CheckCircle className="h-5 w-5 text-green-500" />}
                </h3>
                <div className="relative">
                  <Button
                    variant="outline"
                    className="w-full py-8 bg-transparent"
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowShopPhotoOptions(!showShopPhotoOptions)
                      setShowPanCardOptions(false)
                      setShowAadharFrontOptions(false)
                      setShowAadharBackOptions(false)
                    }}
                  >
                    <ImagePlus className="mr-2 h-6 w-6" />
                    {uploadedFiles.shopPhoto ? uploadedFiles.shopPhoto.name : "Upload Shop Photo"}
                  </Button>

                  {showShopPhotoOptions && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                      <button
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 border-b"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleUploadOption("camera", "shopPhoto")
                        }}
                      >
                        <span className="text-xl">📷</span>
                        Take Photo with Camera
                      </button>
                      <button
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 border-b"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleUploadOption("gallery", "shopPhoto")
                        }}
                      >
                        <span className="text-xl">🖼️</span>
                        Select from Gallery
                      </button>
                      <button
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleUploadOption("files", "shopPhoto")
                        }}
                      >
                        <span className="text-xl">📁</span>
                        Choose from Files
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Button
                type="button"
                className={`w-full rounded-xl p-6 text-lg font-semibold transition-all duration-200 ${
                  isFormValid()
                    ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                    : "bg-gray-400 cursor-not-allowed opacity-50"
                }`}
                onClick={handleSubmit}
                disabled={!isFormValid()}
              >
                Submit Application
              </Button>
              {!isFormValid() && (
                <p className="text-red-500 text-sm text-center">
                  Please select service type, vehicle types and upload all required documents
                </p>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}



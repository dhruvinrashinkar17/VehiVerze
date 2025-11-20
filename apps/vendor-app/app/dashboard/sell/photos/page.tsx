"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Upload, X } from "lucide-react"
import { Button } from "@vehiverze/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@vehiverze/ui/card"

export default function PhotoUploadPage() {
  const searchParams = useSearchParams()
  const category = searchParams.get("category") || ""
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [uploadedPhotos, setUploadedPhotos] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [errors, setErrors] = useState<string>("")

  const MIN_PHOTOS = 3
  const MAX_PHOTOS = 10

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    handleFiles(files)
  }

  const handleSelectPhotosClick = () => {
    fileInputRef.current?.click()
  }

  const handleFiles = (files: File[]) => {
    setErrors("")

    // Filter image files
    const imageFiles = files.filter((file) => file.type.startsWith("image/"))

    if (imageFiles.length === 0) {
      setErrors("Please select image files only")
      return
    }

    // Check total count
    if (uploadedPhotos.length + imageFiles.length > MAX_PHOTOS) {
      setErrors(`Maximum ${MAX_PHOTOS} photos allowed. You can upload ${MAX_PHOTOS - uploadedPhotos.length} more.`)
      return
    }

    // Check file sizes
    const validFiles = imageFiles.filter((file) => {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(`File ${file.name} is too large. Maximum 5MB allowed.`)
        return false
      }
      return true
    })

    if (validFiles.length === 0) return

    // Create previews
    validFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviews((prev) => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    })

    setUploadedPhotos((prev) => [...prev, ...validFiles])
  }

  const removePhoto = (index: number) => {
    setUploadedPhotos((prev) => prev.filter((_, i) => i !== index))
    setPreviews((prev) => prev.filter((_, i) => i !== index))
    setErrors("")
  }

  const handleSubmit = () => {
    if (uploadedPhotos.length < MIN_PHOTOS) {
      setErrors(`Please upload at least ${MIN_PHOTOS} photos`)
      return
    }

    // Store photos in sessionStorage (in real app, would upload to server)
    const photoData = uploadedPhotos.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
    }))

    sessionStorage.setItem("vehiclePhotos", JSON.stringify(photoData))
    window.location.href = `/dashboard/sell/confirm?category=${category}`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="p-4 text-white bg-blue-600">
        <div className="flex items-center">
          <Link href={`/dashboard/sell/details?category=${category}`} className="mr-4">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-2xl font-semibold">Upload Vehicle Photos</h1>
        </div>
      </header>

      <main className="p-4">
        <div className="mx-auto max-w-2xl space-y-8">
          <section>
            <h2 className="mb-2 text-2xl font-bold">Step 3: Upload Photos</h2>
            <p className="text-gray-600 mb-6">
              Upload {MIN_PHOTOS}-{MAX_PHOTOS} high-quality photos of your vehicle
            </p>

            <Card>
              <CardHeader>
                <CardTitle>Photo Upload</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Drag and Drop Area */}
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive ? "border-blue-600 bg-blue-50" : "border-gray-300 bg-gray-50"
                  }`}
                >
                  <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-semibold mb-2">Drag and drop photos here</p>
                  <p className="text-gray-600 mb-4">or</p>
                  <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSelectPhotosClick}>
                    Select Photos
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileInput}
                    className="hidden"
                  />
                  <p className="text-sm text-gray-500 mt-4">
                    Maximum {MAX_PHOTOS} photos, 5MB each. Supported formats: JPG, PNG, WebP
                  </p>
                </div>

                {/* Error Message */}
                {errors && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{errors}</div>
                )}

                {/* Photo Count */}
                <div className="bg-blue-50 border border-blue-200 px-4 py-3 rounded-lg">
                  <p className="text-blue-700">
                    Photos uploaded: <strong>{uploadedPhotos.length}</strong> / {MAX_PHOTOS}
                    {uploadedPhotos.length >= MIN_PHOTOS && (
                      <span className="ml-2 text-green-600">✓ Minimum requirement met</span>
                    )}
                  </p>
                </div>

                {/* Photo Previews */}
                {previews.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-4">Uploaded Photos</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {previews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={preview || "/placeholder.svg"}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => removePhoto(index)}
                            className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-4 w-4" />
                          </button>
                          <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                            {index + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="mt-8 flex gap-4">
              <Link href={`/dashboard/sell/details?category=${category}`} className="flex-1">
                <Button variant="outline" className="w-full py-6 text-lg bg-transparent">
                  Back
                </Button>
              </Link>
              <Button
                className={`flex-1 py-6 text-lg ${
                  uploadedPhotos.length >= MIN_PHOTOS
                    ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                    : "bg-gray-400 cursor-not-allowed opacity-50"
                }`}
                onClick={handleSubmit}
                disabled={uploadedPhotos.length < MIN_PHOTOS}
              >
                Next: Review & Submit
              </Button>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}



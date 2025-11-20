"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@vehiverze/ui/button"
import { Input } from "@vehiverze/ui/input"
import { Label } from "@vehiverze/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@vehiverze/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@vehiverze/ui/card"
import { Check, AlertCircle, ArrowRight } from "lucide-react"

export function VehicleValuationContent() {
  const [step, setStep] = useState(1)
  const [vehicleType, setVehicleType] = useState("")
  const [registrationNumber, setRegistrationNumber] = useState("")
  const [brand, setBrand] = useState("")
  const [model, setModel] = useState("")
  const [year, setYear] = useState("")
  const [variant, setVariant] = useState("")
  const [kilometers, setKilometers] = useState("")
  const [showResult, setShowResult] = useState(false)
  const [valuationAmount, setValuationAmount] = useState(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Calculate a random valuation amount between 2,00,000 and 15,00,000
    const randomValuation = Math.floor(Math.random() * (1500000 - 200000 + 1)) + 200000
    setValuationAmount(randomValuation)
    setShowResult(true)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Vehicle Valuation</h1>
          <p className="text-lg text-gray-600">
            Get an accurate estimate of your vehicle's market value in just a few steps
          </p>
        </div>

        {!showResult ? (
          <Card className="border border-gray-200">
            <CardHeader className="border-b border-gray-100 bg-gray-50">
              <div className="flex justify-between items-center">
                <CardTitle>Vehicle Details</CardTitle>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                  >
                    1
                  </span>
                  <span className="w-8 h-0.5 bg-gray-200"></span>
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                  >
                    2
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {step === 1 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="vehicle-type">Vehicle Type</Label>
                    <Select value={vehicleType} onValueChange={setVehicleType}>
                      <SelectTrigger id="vehicle-type">
                        <SelectValue placeholder="Select vehicle type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2-wheeler">2 Wheeler</SelectItem>
                        <SelectItem value="3-wheeler">3 Wheeler</SelectItem>
                        <SelectItem value="4-wheeler">4 Wheeler</SelectItem>
                        <SelectItem value="6-wheeler">6 Wheeler</SelectItem>
                        <SelectItem value="8-wheeler">8 Wheeler</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="registration-number">Registration Number</Label>
                    <Input
                      id="registration-number"
                      placeholder="Enter registration number (e.g., DL01AB1234)"
                      value={registrationNumber}
                      onChange={(e) => setRegistrationNumber(e.target.value)}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onClick={() => setStep(2)}
                      disabled={!vehicleType || !registrationNumber}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Next <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="brand">Brand</Label>
                      <Select value={brand} onValueChange={setBrand}>
                        <SelectTrigger id="brand">
                          <SelectValue placeholder="Select brand" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="maruti">Maruti Suzuki</SelectItem>
                          <SelectItem value="hyundai">Hyundai</SelectItem>
                          <SelectItem value="tata">Tata</SelectItem>
                          <SelectItem value="mahindra">Mahindra</SelectItem>
                          <SelectItem value="honda">Honda</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="model">Model</Label>
                      <Select value={model} onValueChange={setModel}>
                        <SelectTrigger id="model">
                          <SelectValue placeholder="Select model" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="swift">Swift</SelectItem>
                          <SelectItem value="i20">i20</SelectItem>
                          <SelectItem value="nexon">Nexon</SelectItem>
                          <SelectItem value="xuv300">XUV300</SelectItem>
                          <SelectItem value="city">City</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="year">Year</Label>
                      <Select value={year} onValueChange={setYear}>
                        <SelectTrigger id="year">
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2023">2023</SelectItem>
                          <SelectItem value="2022">2022</SelectItem>
                          <SelectItem value="2021">2021</SelectItem>
                          <SelectItem value="2020">2020</SelectItem>
                          <SelectItem value="2019">2019</SelectItem>
                          <SelectItem value="2018">2018</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="variant">Variant</Label>
                      <Select value={variant} onValueChange={setVariant}>
                        <SelectTrigger id="variant">
                          <SelectValue placeholder="Select variant" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="petrol">Petrol</SelectItem>
                          <SelectItem value="diesel">Diesel</SelectItem>
                          <SelectItem value="cng">CNG</SelectItem>
                          <SelectItem value="electric">Electric</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="kilometers">Kilometers Driven</Label>
                    <Input
                      id="kilometers"
                      type="number"
                      placeholder="Enter kilometers driven"
                      value={kilometers}
                      onChange={(e) => setKilometers(e.target.value)}
                    />
                  </div>

                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700"
                      disabled={!brand || !model || !year || !variant || !kilometers}
                    >
                      Get Valuation
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            <Card className="border border-green-200 bg-green-50">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Valuation Complete</h2>
                  <p className="text-gray-600 mb-6">Based on your vehicle details and current market conditions</p>
                  <div className="bg-white p-6 rounded-lg shadow-sm w-full max-w-md mb-6">
                    <p className="text-gray-600 mb-2">Estimated Market Value</p>
                    <p className="text-4xl font-bold text-green-600">{formatCurrency(valuationAmount)}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowResult(false)
                        setStep(1)
                      }}
                    >
                      Start New Valuation
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700">Sell Your Vehicle</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Valuation Factors</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Vehicle Age</h4>
                    <p className="text-sm text-gray-600">Newer vehicles typically have higher valuations</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Kilometers Driven</h4>
                    <p className="text-sm text-gray-600">Lower mileage vehicles command higher prices</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Brand & Model</h4>
                    <p className="text-sm text-gray-600">Popular brands and models retain value better</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Market Demand</h4>
                    <p className="text-sm text-gray-600">Current market trends affect vehicle valuation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Accurate Valuation</h3>
            <p className="text-gray-600">Our advanced algorithm considers multiple factors for precise valuation</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Market Insights</h3>
            <p className="text-gray-600">Get real-time market data to make informed decisions</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ArrowRight className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Instant Results</h3>
            <p className="text-gray-600">Get your vehicle's valuation in seconds, not days</p>
          </div>
        </div>
      </div>
    </div>
  )
}



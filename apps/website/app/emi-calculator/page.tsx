"use client"

import { useState, useEffect } from "react"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Slider } from "@vehiverze/ui/slider"
import { Label } from "@vehiverze/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@vehiverze/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@vehiverze/ui/card"

export default function EmiCalculatorPage() {
  const [vehicleType, setVehicleType] = useState("4-wheeler")
  const [loanAmount, setLoanAmount] = useState(500000)
  const [interestRate, setInterestRate] = useState(9.5)
  const [loanTenure, setLoanTenure] = useState(36)
  const [emi, setEmi] = useState(0)
  const [totalInterest, setTotalInterest] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)

  useEffect(() => {
    calculateEMI()
  }, [loanAmount, interestRate, loanTenure])

  const calculateEMI = () => {
    const principal = loanAmount
    const ratePerMonth = interestRate / 12 / 100
    const time = loanTenure

    // EMI calculation formula: P * r * (1+r)^n / ((1+r)^n - 1)
    const emiValue =
      (principal * ratePerMonth * Math.pow(1 + ratePerMonth, time)) / (Math.pow(1 + ratePerMonth, time) - 1)

    setEmi(Math.round(emiValue))
    setTotalAmount(Math.round(emiValue * time))
    setTotalInterest(Math.round(emiValue * time - principal))
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <NavBar />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-12">EMI Calculator</h1>

        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 mb-8 text-white">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Calculate Your EMI</h2>
                <p className="text-blue-100 text-lg">
                  Get instant EMI calculations for your dream vehicle with our smart calculator
                </p>
              </div>
              <div className="text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-4xl font-bold text-yellow-300">₹{emi.toLocaleString()}</div>
                  <div className="text-blue-100">Monthly EMI</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Calculator Inputs */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-bold">1</span>
                    </div>
                    Vehicle & Loan Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <Label htmlFor="vehicle-type" className="text-sm font-semibold text-gray-700 mb-2 block">
                      Vehicle Type
                    </Label>
                    <Select value={vehicleType} onValueChange={setVehicleType}>
                      <SelectTrigger id="vehicle-type" className="h-12 border-2 border-gray-200 focus:border-blue-500">
                        <SelectValue placeholder="Select vehicle type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2-wheeler">🏍️ 2 Wheeler</SelectItem>
                        <SelectItem value="3-wheeler">🛺 3 Wheeler</SelectItem>
                        <SelectItem value="4-wheeler">🚗 4 Wheeler</SelectItem>
                        <SelectItem value="6-wheeler">🚚 6 Wheeler</SelectItem>
                        <SelectItem value="8-wheeler">🚛 8 Wheeler</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <Label className="text-sm font-semibold text-gray-700">Loan Amount</Label>
                      <div className="bg-blue-50 px-3 py-1 rounded-lg">
                        <span className="text-blue-700 font-bold">{formatCurrency(loanAmount)}</span>
                      </div>
                    </div>
                    <Slider
                      min={100000}
                      max={10000000}
                      step={10000}
                      value={[loanAmount]}
                      onValueChange={(value) => setLoanAmount(value[0])}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>₹1L</span>
                      <span>₹1Cr</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <Label className="text-sm font-semibold text-gray-700">Interest Rate</Label>
                      <div className="bg-green-50 px-3 py-1 rounded-lg">
                        <span className="text-green-700 font-bold">{interestRate}% p.a.</span>
                      </div>
                    </div>
                    <Slider
                      min={5}
                      max={20}
                      step={0.1}
                      value={[interestRate]}
                      onValueChange={(value) => setInterestRate(value[0])}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>5%</span>
                      <span>20%</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <Label className="text-sm font-semibold text-gray-700">Loan Tenure</Label>
                      <div className="bg-purple-50 px-3 py-1 rounded-lg">
                        <span className="text-purple-700 font-bold">{loanTenure} months</span>
                      </div>
                    </div>
                    <Slider
                      min={12}
                      max={84}
                      step={1}
                      value={[loanTenure]}
                      onValueChange={(value) => setLoanTenure(value[0])}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>1 year</span>
                      <span>7 years</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Results */}
            <div className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b">
                  <CardTitle className="text-center text-gray-800">EMI Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-blue-600 mb-1">{formatCurrency(emi)}</div>
                    <div className="text-gray-600">Monthly Payment</div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Principal Amount</span>
                      <span className="font-semibold">{formatCurrency(loanAmount)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                      <span className="text-gray-600">Total Interest</span>
                      <span className="font-semibold text-orange-600">{formatCurrency(totalInterest)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-gray-600">Total Amount</span>
                      <span className="font-semibold text-green-600">{formatCurrency(totalAmount)}</span>
                    </div>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="mt-6">
                    <div className="text-sm text-gray-600 mb-2">Principal vs Interest</div>
                    <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full flex">
                        <div className="bg-blue-500" style={{ width: `${(loanAmount / totalAmount) * 100}%` }}></div>
                        <div
                          className="bg-orange-500"
                          style={{ width: `${(totalInterest / totalAmount) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Principal ({Math.round((loanAmount / totalAmount) * 100)}%)</span>
                      <span>Interest ({Math.round((totalInterest / totalAmount) * 100)}%)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 border-b">
                  <CardTitle className="text-center text-gray-800">Payment Schedule</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">First EMI</span>
                    <span className="font-semibold text-black">Apr 10, 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last EMI</span>
                    <span className="font-semibold text-black">Mar 10, {2025 + Math.floor(loanTenure / 12)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total EMIs</span>
                    <span className="font-semibold text-black">{loanTenure}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">EMI Calculator FAQs</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-800">What is EMI?</h3>
              <p className="text-gray-600">
                EMI (Equated Monthly Installment) is the fixed amount that you pay to the lender each month until the
                loan is fully paid off. It consists of the interest on loan as well as part of the principal amount to
                be repaid.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800">How is EMI calculated?</h3>
              <p className="text-gray-600">
                EMI is calculated using the formula: P × r × (1 + r)^n / ((1 + r)^n - 1) where P is the loan amount, r
                is the interest rate per month, and n is the number of monthly installments.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800">What factors affect my EMI?</h3>
              <p className="text-gray-600">
                The main factors that affect your EMI are the loan amount, interest rate, and loan tenure. A higher loan
                amount or interest rate will increase your EMI, while a longer loan tenure will decrease it.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}



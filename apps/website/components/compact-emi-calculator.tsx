"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@vehiverze/ui/button"
import { Slider } from "@vehiverze/ui/slider"
import { Label } from "@vehiverze/ui/label"

interface CompactEmiCalculatorProps {
  vehiclePrice: number
  vehicleName: string
}

export function CompactEmiCalculator({ vehiclePrice, vehicleName }: CompactEmiCalculatorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [loanAmount, setLoanAmount] = useState(vehiclePrice)
  const [interestRate, setInterestRate] = useState(9.5)
  const [loanTenure, setLoanTenure] = useState(36)

  const calculateEMI = () => {
    const principal = loanAmount
    const ratePerMonth = interestRate / 12 / 100
    const time = loanTenure

    const emiValue =
      (principal * ratePerMonth * Math.pow(1 + ratePerMonth, time)) / (Math.pow(1 + ratePerMonth, time) - 1)

    return Math.round(emiValue)
  }

  const emi = calculateEMI()
  const totalAmount = emi * loanTenure
  const totalInterest = totalAmount - loanAmount

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between font-semibold text-gray-900 hover:text-blue-600 transition-colors"
      >
        <span>EMI Calculator</span>
        <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="mt-4 space-y-4 pt-4 border-t border-blue-200">
          {/* Loan Amount */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <Label className="text-xs font-semibold text-gray-700">Loan Amount</Label>
              <span className="text-sm font-bold text-blue-600">{formatCurrency(loanAmount)}</span>
            </div>
            <Slider
              min={vehiclePrice * 0.5}
              max={vehiclePrice}
              step={10000}
              value={[loanAmount]}
              onValueChange={(value) => setLoanAmount(value[0])}
              className="mb-1"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>{formatCurrency(vehiclePrice * 0.5)}</span>
              <span>{formatCurrency(vehiclePrice)}</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <Label className="text-xs font-semibold text-gray-700">Interest Rate</Label>
              <span className="text-sm font-bold text-green-600">{interestRate}% p.a.</span>
            </div>
            <Slider
              min={5}
              max={20}
              step={0.1}
              value={[interestRate]}
              onValueChange={(value) => setInterestRate(value[0])}
              className="mb-1"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>5%</span>
              <span>20%</span>
            </div>
          </div>

          {/* Loan Tenure */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <Label className="text-xs font-semibold text-gray-700">Loan Tenure</Label>
              <span className="text-sm font-bold text-purple-600">{loanTenure} months</span>
            </div>
            <Slider
              min={12}
              max={84}
              step={1}
              value={[loanTenure]}
              onValueChange={(value) => setLoanTenure(value[0])}
              className="mb-1"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>1 year</span>
              <span>7 years</span>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white rounded-lg p-3 space-y-2 mt-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Monthly EMI</span>
              <span className="text-lg font-bold text-blue-600">{formatCurrency(emi)}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-600">Total Interest</span>
              <span className="text-orange-600 font-semibold">{formatCurrency(totalInterest)}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-600">Total Amount</span>
              <span className="text-green-600 font-semibold">{formatCurrency(totalAmount)}</span>
            </div>
          </div>

          <Button className="w-full text-sm bg-blue-600 hover:bg-blue-700" asChild>
            <a href="/emi-calculator">View Detailed Calculator</a>
          </Button>
        </div>
      )}
    </div>
  )
}



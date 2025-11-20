"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@vehiverze/ui/card"
import { Input } from "@vehiverze/ui/input"
import { Button } from "@vehiverze/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@vehiverze/ui/select"
import { vendorsDb } from "@/lib/mock-data/stores"

export default function CreditDeductionPage() {
  const [loading, setLoading] = useState(false)
  const vendors = vendorsDb.getAll()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setLoading(false)
  }

  return (
    <Card className="max-w-2xl mx-auto bg-[#1A1A1A] border-[#2A2A2A]">
      <CardHeader>
        <CardTitle>Credit Deduction</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Customer Name</label>
            <Input placeholder="Enter customer name" className="bg-[#2A2A2A] border-[#3A3A3A]" />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Customer Number</label>
            <Input placeholder="Enter customer number" className="bg-[#2A2A2A] border-[#3A3A3A]" />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Device Name</label>
            <Input placeholder="Enter device name" className="bg-[#2A2A2A] border-[#3A3A3A]" />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Device Type</label>
            <Select>
              <SelectTrigger className="bg-[#2A2A2A] border-[#3A3A3A]">
                <SelectValue placeholder="Select device type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mobile">Mobile</SelectItem>
                <SelectItem value="tablet">Tablet</SelectItem>
                <SelectItem value="laptop">Laptop</SelectItem>
                <SelectItem value="watch">Watch</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">IMEI</label>
            <Input placeholder="Enter IMEI number" className="bg-[#2A2A2A] border-[#3A3A3A]" />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Price</label>
            <Input type="number" placeholder="Enter price" className="bg-[#2A2A2A] border-[#3A3A3A]" />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Vendor</label>
            <Select>
              <SelectTrigger className="bg-[#2A2A2A] border-[#3A3A3A]">
                <SelectValue placeholder="Select vendor" />
              </SelectTrigger>
              <SelectContent>
                {vendors.map((vendor) => (
                  <SelectItem key={vendor.id} value={vendor.id}>
                    {vendor.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Credit Amount</label>
            <Input type="number" placeholder="Enter credit amount" className="bg-[#2A2A2A] border-[#3A3A3A]" />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Processing..." : "Submit"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}



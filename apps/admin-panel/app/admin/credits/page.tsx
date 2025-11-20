"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@vehiverze/ui/card"
import { Input } from "@vehiverze/ui/input"
import { Button } from "@vehiverze/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@vehiverze/ui/select"
import { vendorsDb } from "@/lib/mock-data/stores"

type CreditForm = {
  customerName: string
  customerNumber: string
  deviceName: string
  deviceType: string
  imei: string
  price: string
  vendorId: string
  creditAmount: string
}

export default function CreditDeductionPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const vendors = vendorsDb.getAll()

  const [form, setForm] = useState<CreditForm>({
    customerName: "",
    customerNumber: "",
    deviceName: "",
    deviceType: "",
    imei: "",
    price: "",
    vendorId: "",
    creditAmount: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Credit deduction submitted:", form)

      // Reset form
      setForm({
        customerName: "",
        customerNumber: "",
        deviceName: "",
        deviceType: "",
        imei: "",
        price: "",
        vendorId: "",
        creditAmount: "",
      })
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <Card className="card-container max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Credit Deduction</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-foreground">Customer Name</label>
            <Input
              name="customerName"
              value={form.customerName}
              onChange={handleChange}
              placeholder="Enter customer name"
              className="form-input"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-foreground">Customer Number</label>
            <Input
              name="customerNumber"
              value={form.customerNumber}
              onChange={handleChange}
              placeholder="Enter customer number"
              className="form-input"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-foreground">Device Name</label>
            <Input
              name="deviceName"
              value={form.deviceName}
              onChange={handleChange}
              placeholder="Enter device name"
              className="form-input"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-foreground">Device Type</label>
            <Select
              value={form.deviceType}
              onValueChange={(value) => setForm((prev) => ({ ...prev, deviceType: value }))}
            >
              <SelectTrigger className="form-select">
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
            <label className="text-sm text-foreground">IMEI</label>
            <Input
              name="imei"
              value={form.imei}
              onChange={handleChange}
              placeholder="Enter IMEI number"
              className="form-input"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-foreground">Price</label>
            <Input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              placeholder="Enter price"
              className="form-input"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-foreground">Vendor</label>
            <Select value={form.vendorId} onValueChange={(value) => setForm((prev) => ({ ...prev, vendorId: value }))}>
              <SelectTrigger className="form-select">
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
            <label className="text-sm text-foreground">Credit Amount</label>
            <Input
              name="creditAmount"
              type="number"
              value={form.creditAmount}
              onChange={handleChange}
              placeholder="Enter credit amount"
              className="form-input"
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Processing..." : "Submit"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}



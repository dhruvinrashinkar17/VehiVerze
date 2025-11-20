"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@vehiverze/ui/card"
import { Input } from "@vehiverze/ui/input"
import { Button } from "@vehiverze/ui/button"
import { Textarea } from "@vehiverze/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@vehiverze/ui/select"

type ContactForm = {
  name: string
  email: string
  phone: string
  subject: string
  type: string
  message: string
}

export default function ContactPage() {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    type: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Form submitted:", form)

      // Reset form
      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        type: "",
        message: "",
      })
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="card-container">
        <CardHeader>
          <CardTitle>Contact Support</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-foreground">Name</label>
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="form-input"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-foreground">Email</label>
              <Input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="form-input"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-foreground">Phone</label>
              <Input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="form-input"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-foreground">Subject</label>
              <Input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Enter subject"
                className="form-input"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-foreground">Type</label>
              <Select value={form.type} onValueChange={(value) => setForm((prev) => ({ ...prev, type: value }))}>
                <SelectTrigger className="form-select">
                  <SelectValue placeholder="Select issue type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technical">Technical Issue</SelectItem>
                  <SelectItem value="billing">Billing Issue</SelectItem>
                  <SelectItem value="account">Account Issue</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-foreground">Message</label>
              <Textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Enter your message"
                className="form-input min-h-[150px]"
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}



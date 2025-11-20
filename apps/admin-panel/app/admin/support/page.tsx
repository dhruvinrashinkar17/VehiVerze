"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@vehiverze/ui/card"
import { Input } from "@vehiverze/ui/input"
import { Button } from "@vehiverze/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@vehiverze/ui/accordion"

const faqs = [
  {
    question: "How do I assign an order to a vendor?",
    answer:
      "To assign an order to a vendor, go to the order details page and click the 'Assign' button. Select a vendor from the list and confirm the assignment. The vendor will be notified automatically.",
  },
  {
    question: "What should I do if a customer cancels an order?",
    answer:
      "If a customer cancels an order, navigate to the order details and click 'Cancel Order'. Select 'Cancelled by Customer' as the reason and provide any additional notes. The order will be moved to the Failed Orders section.",
  },
  {
    question: "How do I process credit deductions?",
    answer:
      "To process credit deductions, go to the Credit Deduction page, fill in all required information including customer details, device information, and credit amount. Submit the form and the system will automatically process the deduction.",
  },
  {
    question: "How can I add new serviceable areas?",
    answer:
      "Navigate to the Area Management section, click 'Add Pincode', and fill in the required details including pincode, city, and supported services. The new area will be active immediately after adding.",
  },
]

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card className="card-container">
        <CardHeader>
          <CardTitle>Help & Support</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Input
              placeholder="Search help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
            />
          </div>

          <Accordion type="single" collapsible className="w-full">
            {filteredFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-8 p-4 bg-accent text-accent-foreground rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Need more help?</h3>
            <p className="text-muted-foreground mb-4">
              Our support team is available 24/7 to assist you with any questions or issues.
            </p>
            <div className="flex gap-4">
              <Button variant="default">Contact Support</Button>
              <Button variant="outline">View Documentation</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="card-container">
        <CardHeader>
          <CardTitle>Quick Links</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="justify-start h-auto p-4"
              onClick={() => window.open("/admin/contact", "_blank")}
            >
              <div className="text-left">
                <div className="font-semibold">Contact Support</div>
                <div className="text-sm text-muted-foreground">Get in touch with our support team</div>
              </div>
            </Button>
            <Button
              variant="outline"
              className="justify-start h-auto p-4"
              onClick={() => window.open("https://docs.vehiverze.com", "_blank")}
            >
              <div className="text-left">
                <div className="font-semibold">Documentation</div>
                <div className="text-sm text-muted-foreground">Read our detailed documentation</div>
              </div>
            </Button>
            <Button
              variant="outline"
              className="justify-start h-auto p-4"
              onClick={() => window.open("/admin/training", "_blank")}
            >
              <div className="text-left">
                <div className="font-semibold">Training Videos</div>
                <div className="text-sm text-muted-foreground">Watch our training materials</div>
              </div>
            </Button>
            <Button
              variant="outline"
              className="justify-start h-auto p-4"
              onClick={() => window.open("/admin/faq", "_blank")}
            >
              <div className="text-left">
                <div className="font-semibold">FAQ</div>
                <div className="text-sm text-muted-foreground">Browse frequently asked questions</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}



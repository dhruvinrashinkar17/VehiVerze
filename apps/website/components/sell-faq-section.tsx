"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@vehiverze/ui/accordion"

const sellFaqs = [
  {
    question: "How is the price of my vehicle determined?",
    answer:
      "We use advanced data analytics and current market trends to provide an instant estimated price. This is followed by a thorough inspection to determine the final price based on your vehicle's condition, age, mileage, and market demand.",
  },
  {
    question: "What documents do I need to sell my vehicle?",
    answer:
      "You'll need your vehicle's Registration Certificate (RC), insurance documents, PUC certificate, service records (if available), and a valid ID proof. Our team will guide you through the documentation process.",
  },
  {
    question: "How long does it take to sell a vehicle on Vehiverze?",
    answer:
      "The process can be as quick as 24 hours. After listing your vehicle, you'll receive offers from verified vendors. Once you accept an offer, the pickup and payment can be arranged within a day.",
  },
  {
    question: "Is there any fee for selling my vehicle on Vehiverze?",
    answer:
      "No, there are no upfront fees for selling your vehicle. We charge a small service fee only after your vehicle is successfully sold, which is deducted from the final selling price.",
  },
  {
    question: "Can I sell a vehicle with an existing loan?",
    answer:
      "Yes, you can sell a vehicle with an existing loan. We'll help you settle the loan amount with the bank and transfer the remaining amount to you.",
  },
  {
    question: "How is the ownership transfer handled?",
    answer:
      "We facilitate the entire ownership transfer process, including all necessary documentation. This ensures a smooth and legal transfer for both buyers and sellers.",
  },
  {
    question: "Will you pick up the vehicle from my location?",
    answer: "Yes, we offer free pickup services from your location once the deal is finalized.",
  },
  {
    question: "How quickly will I receive payment after selling my vehicle?",
    answer:
      "You'll receive payment immediately after the inspection and paperwork are completed. We offer multiple payment options including bank transfers, checks, and digital payments.",
  },
  {
    question: "What if my vehicle has minor damages or scratches?",
    answer:
      "Minor damages or scratches are normal wear and tear. While they might affect the valuation slightly, we still offer competitive prices. Be transparent about the condition during the initial assessment.",
  },
  {
    question: "Can I sell a modified vehicle?",
    answer:
      "Yes, you can sell modified vehicles. However, please note that modifications may affect the valuation. It's important to disclose all modifications during the initial assessment.",
  },
  {
    question: "What happens if I'm not satisfied with the offer?",
    answer:
      "If you're not satisfied with our offer, you're under no obligation to sell. You can decline the offer without any penalties or fees.",
  },
  {
    question: "Do you buy vehicles that are not in running condition?",
    answer:
      "Yes, we buy vehicles that are not in running condition. The price will be determined based on the salvage value and parts that can be reused or recycled.",
  },
  {
    question: "Is there a warranty on the vehicles I buy from Vehiverze?",
    answer:
      "All vehicles sold through Vehiverze undergo a thorough inspection. We offer a limited warranty on most vehicles, and the specific terms are provided with each listing.",
  },
  {
    question: "Can I test drive a vehicle before buying?",
    answer:
      "Yes, you can schedule a test drive at the vendor's location for any vehicle you're interested in purchasing.",
  },
  {
    question: "Do you offer financing options for vehicle purchases?",
    answer:
      "Yes, we partner with several financial institutions to offer competitive loan options. You can use our EMI calculator to estimate your monthly payments.",
  },
  {
    question: "How do I know the history of a vehicle I'm interested in buying?",
    answer:
      "We provide a detailed vehicle history report for each listing, which includes information about previous ownership, accident history, and service records where available.",
  },
  {
    question: "What payment methods are accepted on Vehiverze?",
    answer:
      "We accept various payment methods including bank transfers, select credit/debit cards, and approved loan disbursements for vehicle purchases.",
  },
  {
    question: "How does Vehiverze ensure the quality of vehicles sold on the platform?",
    answer:
      "All vehicles undergo a comprehensive inspection before being listed. We check for mechanical issues, body condition, and verify documentation to ensure only quality vehicles are sold on our platform.",
  },
  {
    question: "What should I do if I encounter a problem with a vehicle shortly after purchase?",
    answer:
      "Contact our customer support immediately. Depending on the nature of the issue and the warranty terms, we'll guide you through the resolution process, which may include repairs or other remedies.",
  },
  {
    question: "Can I sell commercial vehicles on Vehiverze?",
    answer: "Yes, we buy and sell all types of commercial vehicles including taxis, trucks, and delivery vans.",
  },
  {
    question: "Do you buy vehicles with insurance claims or accidents?",
    answer:
      "Yes, we buy vehicles with insurance claims or accident history. The valuation will depend on the extent of damage and repairs done.",
  },
  {
    question: "How do I prepare my vehicle for inspection?",
    answer:
      "Clean your vehicle inside and out, gather all service records and documentation, and ensure all personal belongings are removed. This helps in getting an accurate valuation.",
  },
  {
    question: "Can I sell my vehicle if the RC is from another state?",
    answer:
      "Yes, you can sell vehicles with RC from any state. We'll handle the interstate transfer process as part of our service.",
  },
  {
    question: "What happens to my vehicle after I sell it to Vehiverze?",
    answer:
      "Depending on the condition, your vehicle may be refurbished and resold, or if it's beyond economical repair, it will be sent for eco-friendly scrapping.",
  },
  {
    question: "Do you offer any additional services when I sell my vehicle?",
    answer:
      "Yes, we offer complimentary services including RC transfer, loan settlement assistance, and free pickup from your location.",
  },
]

export function SellFAQSection() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredFAQs = sellFaqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-black">Frequently Asked Questions About Selling</h2>

        <div className="max-w-3xl mx-auto">
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-8"
          />

          <Accordion type="single" collapsible className="bg-white rounded-lg shadow-sm">
            {filteredFAQs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200">
                <AccordionTrigger className="text-left px-6 py-4 text-black hover:bg-gray-50">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 text-gray-600">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}



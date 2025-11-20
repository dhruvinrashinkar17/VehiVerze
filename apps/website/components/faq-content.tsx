"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@vehiverze/ui/accordion"

const faqs = [
  {
    question: "What types of vehicles can I buy or sell on Vehiverze?",
    answer:
      "Vehiverze supports transactions for 2-wheelers, 3-wheelers, 4-wheelers, 6-wheelers, and 8-wheelers. This includes motorcycles, cars, trucks, and commercial vehicles.",
  },
  {
    question: "How is the price of my vehicle determined when I want to sell?",
    answer:
      "We use advanced data analytics and current market trends to provide an instant estimated price. This is followed by a thorough inspection to determine the final price.",
  },
  {
    question: "Can I get my vehicle inspected before selling?",
    answer:
      "Yes, you can schedule an inspection either online or at one of our partner locations. This helps in getting a more accurate valuation of your vehicle.",
  },
  {
    question: "How long does it take to sell a vehicle on Vehiverze?",
    answer:
      "The process can be as quick as 24 hours. After listing your vehicle, you'll receive offers from verified vendors. Once you accept an offer, the pickup and payment can be arranged within a day.",
  },
  {
    question: "Is there a guarantee on the vehicles I buy from Vehiverze?",
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
    question: "How is the ownership transfer handled when buying or selling a vehicle?",
    answer:
      "We facilitate the entire ownership transfer process, including all necessary documentation. This ensures a smooth and legal transfer for both buyers and sellers.",
  },
  {
    question: "What types of insurance do you offer?",
    answer:
      "We offer various insurance types including Third-Party Liability, Comprehensive Coverage, Zero Depreciation Cover, and more. You can customize your plan with additional add-ons.",
  },
  {
    question: "How quickly can I get my vehicle insured?",
    answer: "With our digital process, you can get your e-policy issued instantly after completing the payment.",
  },
  {
    question: "What garage services do you provide?",
    answer:
      "We offer a wide range of services including regular maintenance, repairs, accidental repairs, and custom modifications. These are provided through our network of verified partner garages.",
  },
  {
    question: "Can I get garage services at my doorstep?",
    answer:
      "Yes, for many services we offer doorstep repairs. Alternatively, you can opt for pickup and drop-off services.",
  },
  {
    question: "How are the partner garages verified?",
    answer:
      "All our partner garages undergo a strict vetting process, checking their equipment, expertise, and service quality. We also continuously monitor customer feedback.",
  },
  {
    question: "What happens if I'm not satisfied with a garage service?",
    answer:
      "Customer satisfaction is our priority. If you're not satisfied, please contact our customer support, and we'll work to resolve the issue promptly.",
  },
  {
    question: "Are the prices for vehicles on Vehiverze negotiable?",
    answer:
      "Prices listed by sellers are generally their best offer. However, you can always make a reasonable offer through our platform, and the seller may choose to accept or counter.",
  },
  {
    question: "How do I know the history of a vehicle I'm interested in buying?",
    answer:
      "We provide a detailed vehicle history report for each listing, which includes information about previous ownership, accident history, and service records where available.",
  },
  {
    question: "What payment methods are accepted on Vehiverze?",
    answer:
      "We accept various payment methods including bank transfers, select credit/debit cards, and approved loan disbursements for vehicle purchases. For services and insurance, we also accept popular digital payment methods.",
  },
  {
    question: "Can I list a vehicle with existing loans for sale?",
    answer:
      "Yes, you can list a vehicle with an existing loan. However, you must disclose this information, and the loan must be settled as part of the sale process.",
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
    question: "Is it possible to cancel a service booking or insurance purchase?",
    answer:
      "Yes, you can cancel a service booking with advance notice. For insurance, cancellation policies vary by provider and are detailed in the policy documents.",
  },
  {
    question: "How often should I service my vehicle?",
    answer:
      "Service intervals depend on your vehicle type and usage. Generally, we recommend servicing every 5,000-10,000 km or every 6 months, whichever comes first. Always refer to your vehicle's manual for specific recommendations.",
  },
  {
    question: "Do you offer services for electric vehicles?",
    answer:
      "Yes, we cater to electric vehicles for buying, selling, insuring, and servicing. Our partner garages are equipped to handle the unique needs of electric vehicles.",
  },
  {
    question: "Can I track the status of my vehicle service or repair?",
    answer:
      "Yes, you can track the status of your service or repair through our app or website. We provide real-time updates on the progress of the work.",
  },
  {
    question: "What measures does Vehiverze take to prevent fraud?",
    answer:
      "We implement strict verification processes for all users, especially sellers. We also secure all transactions, mediate between parties, and only release payments once all conditions of the sale are met.",
  },
]

export function FAQContent() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 bg-white text-black">
        <h1 className="text-4xl font-bold text-center mb-8">Frequently Asked Questions</h1>

        <div className="max-w-2xl mx-auto mb-8">
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-[#000000] text-black bg-slate-200"
          />
        </div>

        <Accordion type="single" collapsible className="max-w-2xl mx-auto">
          {filteredFAQs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}



"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

type FAQItem = {
  question: string
  answer: string
}

type FAQSectionProps = {
  title: string
  faqs: FAQItem[]
}

// FAQ Item Component
const FAQItem = ({ question, answer }: FAQItem) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex w-full justify-between items-center text-left font-medium text-gray-900"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        {isOpen ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
      </button>
      {isOpen && (
        <div className="mt-2 text-gray-600">
          <p>{answer}</p>
        </div>
      )}
    </div>
  )
}

// FAQ Section Component
const FAQSection = ({ title, faqs }: FAQSectionProps) => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="bg-white rounded-lg shadow-sm p-4">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  )
}

// Main Vehicle Type FAQs (2-wheeler, 3-wheeler, 4-wheeler, etc.)
export const VehicleTypeFAQs = ({ vehicleType }: { vehicleType: string }) => {
  const vehicleTypeLabel = vehicleType.replace("-", " ")

  const generalFaqs: FAQItem[] = [
    {
      question: `How does selling my ${vehicleTypeLabel} on Vehiverze work?`,
      answer: `Selling your ${vehicleTypeLabel} on Vehiverze is simple. Enter your vehicle details, get an instant price estimate, schedule a free inspection, and receive payment directly to your bank account after the deal is finalized.`,
    },
    {
      question: `What documents do I need to sell my ${vehicleTypeLabel}?`,
      answer: `You'll need your vehicle's Registration Certificate (RC), insurance policy, PUC certificate, service records, and a valid ID proof like Aadhar or PAN card. Additional documents may be required based on your specific situation.`,
    },
    {
      question: `How is the price of my ${vehicleTypeLabel} determined?`,
      answer: `We determine your ${vehicleTypeLabel}'s price based on factors like make, model, year, condition, mileage, service history, market demand, and current market value. Our algorithm provides an instant estimate, which is finalized after physical inspection.`,
    },
    {
      question: `Is the inspection really free?`,
      answer: `Yes, the inspection is completely free with no obligations. Our expert evaluators will visit your location at your convenience to assess your vehicle's condition.`,
    },
    {
      question: `How long does the entire selling process take?`,
      answer: `The entire process typically takes 24-48 hours from initial submission to payment. However, this can vary based on document verification and inspection scheduling.`,
    },
  ]

  // Vehicle-specific FAQs
  const vehicleSpecificFaqs: Record<string, FAQItem[]> = {
    "2-wheeler": [
      {
        question: "Do you buy motorcycles with modifications?",
        answer:
          "Yes, we buy modified motorcycles, but modifications may affect the valuation. Our inspectors will evaluate any modifications during the inspection process.",
      },
      {
        question: "What if my bike has minor scratches or dents?",
        answer:
          "Minor scratches and dents are normal wear and tear and will be factored into the evaluation. Be transparent about the condition to get the most accurate estimate.",
      },
    ],
    "3-wheeler": [
      {
        question: "Do you purchase commercial three-wheelers?",
        answer:
          "Yes, we buy both commercial and personal three-wheelers. The commercial permit status will be considered during valuation.",
      },
      {
        question: "What if my auto-rickshaw has a CNG/LPG kit installed?",
        answer:
          "We do purchase vehicles with CNG/LPG kits. Make sure the kit is properly installed with valid documentation, as this affects the valuation.",
      },
    ],
    "4-wheeler": [
      {
        question: "How do you handle cars with existing loans?",
        answer:
          "We can help settle your existing loan. Provide your loan account details, and we'll coordinate with your bank to clear the loan and pay you the remaining amount.",
      },
      {
        question: "Do you buy luxury or premium cars?",
        answer:
          "Yes, we purchase all types of cars including luxury and premium models. Our experts are trained to evaluate high-end vehicles accurately.",
      },
    ],
    "6-wheeler": [
      {
        question: "Do you buy commercial vehicles with national permits?",
        answer:
          "Yes, we purchase commercial vehicles with all types of permits. The permit type and validity will be considered during valuation.",
      },
      {
        question: "What if my commercial vehicle has been retrofitted?",
        answer:
          "We do buy retrofitted commercial vehicles. All modifications should be properly documented and legally compliant for the best valuation.",
      },
    ],
    "8-wheeler": [
      {
        question: "How do you evaluate heavy commercial vehicles?",
        answer:
          "Our evaluation for heavy commercial vehicles includes mechanical condition, body condition, tire condition, permit validity, and service history. We also consider market demand for specific models.",
      },
      {
        question: "Do you purchase vehicles with specialized equipment?",
        answer:
          "Yes, we buy specialized heavy vehicles like concrete mixers, tankers, etc. The specialized equipment condition will be factored into the valuation.",
      },
    ],
  }

  // Combine general FAQs with vehicle-specific FAQs
  const combinedFaqs = [...generalFaqs, ...(vehicleSpecificFaqs[vehicleType] || [])]

  return (
    <div className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          <FAQSection title={`About Selling Your ${vehicleTypeLabel}`} faqs={combinedFaqs} />
        </div>
      </div>
    </div>
  )
}

// Details Page FAQs
export const DetailsPageFAQs = () => {
  const faqs: FAQItem[] = [
    {
      question: "Why do you need my vehicle details?",
      answer:
        "We need your vehicle details to provide an accurate price estimate. Information like make, model, year, and condition helps us determine the current market value of your vehicle.",
    },
    {
      question: "Can I edit my vehicle information later?",
      answer:
        "Yes, you can edit your vehicle information at any point before the inspection. Simply contact our customer support team to make changes.",
    },
    {
      question: "How accurate is the price estimate based on these details?",
      answer:
        "Our initial estimate is based on market data and the details you provide. The final offer may vary after physical inspection, but we strive to provide estimates that are as accurate as possible.",
    },
    {
      question: "What if I don't know some details about my vehicle?",
      answer:
        "You can check your vehicle's Registration Certificate (RC) for most details. If you're still unsure, provide your best estimate and our inspection team will verify the details later.",
    },
    {
      question: "Is my personal and vehicle information secure?",
      answer:
        "Yes, we take data security seriously. All your personal and vehicle information is encrypted and stored securely in compliance with data protection regulations.",
    },
  ]

  return <FAQSection title="About Vehicle Details" faqs={faqs} />
}

// Contact Page FAQs
export const ContactPageFAQs = () => {
  const faqs: FAQItem[] = [
    {
      question: "Why do you need my contact information?",
      answer:
        "We need your contact information to communicate with you about your vehicle sale, schedule inspections, and provide updates on the process.",
    },
    {
      question: "Will I receive spam calls or messages?",
      answer:
        "No, we respect your privacy. Your contact information will only be used for communication related to your vehicle sale and will not be shared with third parties for marketing purposes.",
    },
    {
      question: "How will you verify my phone number?",
      answer:
        "We verify your phone number through a one-time password (OTP) sent to your mobile number to ensure the security of your account.",
    },
    {
      question: "Can I change my contact information later?",
      answer:
        "Yes, you can update your contact information at any time through your account settings or by contacting our customer support team.",
    },
    {
      question: "What if I'm not available at the contact number provided?",
      answer:
        "You can provide alternative contact methods or specify preferred contact times. Our team will accommodate your preferences.",
    },
  ]

  return <FAQSection title="About Contact Information" faqs={faqs} />
}

// Condition Page FAQs
export const ConditionPageFAQs = () => {
  const faqs: FAQItem[] = [
    {
      question: "How does the condition of my vehicle affect its value?",
      answer:
        "Vehicle condition is a major factor in determining value. Better condition vehicles typically receive higher offers. We consider exterior, interior, mechanical condition, and service history.",
    },
    {
      question: "What if I'm not sure about my vehicle's condition?",
      answer:
        "Choose your best estimate. Our inspection team will perform a thorough assessment and provide a final evaluation based on industry standards.",
    },
    {
      question: "Will minor scratches or dents significantly reduce my vehicle's value?",
      answer:
        "Minor scratches and dents are considered normal wear and tear and typically don't significantly impact value. Major damage or mechanical issues will have a greater effect.",
    },
    {
      question: "How do you evaluate mechanical condition?",
      answer:
        "Our inspectors check engine performance, transmission, brakes, suspension, electrical systems, and other mechanical components to assess overall mechanical condition.",
    },
    {
      question: "Can I improve my vehicle's condition before inspection?",
      answer:
        "Yes, basic cleaning and minor repairs can improve your vehicle's condition rating. However, we recommend being transparent about any known issues.",
    },
  ]

  return <FAQSection title="About Vehicle Condition" faqs={faqs} />
}

// Inspection Booking FAQs
export const InspectionBookingFAQs = () => {
  const faqs: FAQItem[] = [
    {
      question: "What happens during the inspection?",
      answer:
        "Our expert evaluator will examine your vehicle's exterior, interior, mechanical components, and take it for a short test drive. They'll document the condition with photos and provide a detailed assessment.",
    },
    {
      question: "How long does the inspection take?",
      answer: "A typical inspection takes 30-45 minutes, depending on the vehicle type and condition.",
    },
    {
      question: "Do I need to be present during the inspection?",
      answer:
        "Yes, the vehicle owner or an authorized representative should be present during the inspection with the necessary documents.",
    },
    {
      question: "What documents should I have ready for the inspection?",
      answer:
        "Please have your vehicle's Registration Certificate (RC), insurance policy, PUC certificate, service records, and a valid ID proof ready for verification.",
    },
    {
      question: "Can I reschedule my inspection appointment?",
      answer:
        "Yes, you can reschedule your appointment through our customer support team at least 24 hours before the scheduled time.",
    },
    {
      question: "Is there any cost for the inspection?",
      answer: "No, the inspection is completely free with no obligations.",
    },
  ]

  return <FAQSection title="About Vehicle Inspection" faqs={faqs} />
}

// Checkout FAQs
export const CheckoutFAQs = () => {
  const faqs: FAQItem[] = [
    {
      question: "How is the final price determined?",
      answer:
        "The final price is determined after the physical inspection based on the actual condition of your vehicle, market demand, and current market rates.",
    },
    {
      question: "Can I negotiate the offered price?",
      answer:
        "Our offers are based on comprehensive market analysis and vehicle condition. While there's limited room for negotiation, we ensure our offers are competitive and fair.",
    },
    {
      question: "How will I receive payment for my vehicle?",
      answer:
        "Payment is made directly to your bank account via NEFT/RTGS/IMPS transfer. We also offer other payment options like demand draft if preferred.",
    },
    {
      question: "How long does it take to receive payment?",
      answer:
        "Once all documents are verified and the sale is finalized, payment is typically processed within 24-48 hours.",
    },
    {
      question: "What happens to my vehicle after I sell it?",
      answer:
        "After the sale, we handle the transfer of ownership. Your vehicle may be refurbished and sold through our certified pre-owned program or through our dealer network.",
    },
    {
      question: "What if I have an existing loan on my vehicle?",
      answer:
        "We can help settle your existing loan. We'll coordinate with your bank to clear the loan and pay you the remaining amount.",
    },
  ]

  return <FAQSection title="About Selling Process" faqs={faqs} />
}

// Confirmation Page FAQs
export const ConfirmationFAQs = () => {
  const faqs: FAQItem[] = [
    {
      question: "What happens next after my sale is confirmed?",
      answer:
        "Our team will contact you within 24 hours to schedule an inspection. After inspection and price confirmation, we'll process the payment and handle all paperwork for ownership transfer.",
    },
    {
      question: "How can I track the status of my sale?",
      answer:
        "You can track the status of your sale through your Vehiverze account dashboard or by contacting our customer support team with your sale reference number.",
    },
    {
      question: "When will the ownership transfer be completed?",
      answer:
        "The ownership transfer process typically takes 7-14 working days, depending on your location and RTO processing times.",
    },
    {
      question: "Do I need to visit the RTO for ownership transfer?",
      answer:
        "No, we handle all the RTO formalities for ownership transfer. You just need to provide the necessary signed documents.",
    },
    {
      question: "What if I change my mind after confirming the sale?",
      answer:
        "You can cancel the sale before the inspection or before signing the final sale agreement without any penalty. Please contact our customer support team as soon as possible.",
    },
    {
      question: "Will I receive a sale certificate or receipt?",
      answer:
        "Yes, you'll receive a digital sale certificate and payment receipt via email. Physical copies can be provided upon request.",
    },
  ]

  return <FAQSection title="What's Next" faqs={faqs} />
}

// Export a combined component for pages that need multiple FAQ sections
export const SellPageFAQs = ({
  pageType,
}: { pageType: "details" | "contact" | "condition" | "inspection" | "checkout" | "confirmation" }) => {
  return (
    <div className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          {pageType === "details" && <DetailsPageFAQs />}
          {pageType === "contact" && <ContactPageFAQs />}
          {pageType === "condition" && <ConditionPageFAQs />}
          {pageType === "inspection" && <InspectionBookingFAQs />}
          {pageType === "checkout" && <CheckoutFAQs />}
          {pageType === "confirmation" && <ConfirmationFAQs />}
        </div>
      </div>
    </div>
  )
}



"use client"

import { useState } from "react"
import { Button } from "@vehiverze/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@vehiverze/ui/accordion"
import { MapPin, Phone, Clock, Car, Upload } from "lucide-react"

export function ConfirmationContent() {
  const [documents, setDocuments] = useState({
    rc: null,
    insurance: null,
  })

  const handleFileUpload = (type: "rc" | "insurance", file: File) => {
    setDocuments((prev) => ({
      ...prev,
      [type]: file,
    }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-purple-500">Sell</span>
          <span className="text-green-500">Right</span>
          <span className="text-purple-500">by Spinny</span>
        </div>
        <div className="text-gray-300">
          Estimated Price Range <span className="text-xl font-bold">₹43,000 - ₹55,000</span>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-12">
        <div className="flex items-center">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">✓</div>
            <span className="text-sm mt-2">Evaluation Requested</span>
          </div>
          <div className="w-16 h-1 bg-green-500 mx-2"></div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">✓</div>
            <span className="text-sm mt-2">Evaluation Scheduled</span>
          </div>
          <div className="w-16 h-1 bg-gray-600 mx-2"></div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">3</div>
            <span className="text-sm mt-2">Evaluation Completed</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto bg-gray-900 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Hub evaluation request has been confirmed</h2>
        <p className="text-gray-400 mb-8">Please reach on time for a smoother process</p>

        {/* Car Evaluator */}
        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
            <div>
              <h3 className="font-semibold">Car Evaluator</h3>
              <p className="text-gray-400">Prasad Mane</p>
            </div>
          </div>
          <Button variant="outline" className="bg-transparent border-purple-500 text-purple-500">
            <Phone className="w-4 h-4 mr-2" />
            Call Evaluator
          </Button>
        </div>

        {/* Evaluation Details */}
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2 flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Evaluation Details
            </h3>
            <p className="text-gray-400">Friday, Feb 28th, 2025 between 11 am - 12 pm</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Spinny hub address
            </h3>
            <p className="text-gray-400">
              Unit 1B, 1st floor, West wing, Kohinoor square, opposite Sena bhavan, Dadar - West Mumbai, 400028
            </p>
            <Button variant="link" className="text-purple-500 p-0 mt-2">
              View location
            </Button>
          </div>

          <div>
            <h3 className="font-semibold mb-2 flex items-center">
              <Car className="w-5 h-5 mr-2" />
              Car Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400">2002 Hyundai Sonata GLS</p>
                <Button variant="link" className="text-purple-500 p-0">
                  ADD DETAILS
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <p className="text-gray-400">Fuel</p>
                  <p>Petrol</p>
                </div>
                <div>
                  <p className="text-gray-400">Transmission</p>
                  <p>Manual</p>
                </div>
                <div>
                  <p className="text-gray-400">Mileage</p>
                  <p>20k-30k KMs</p>
                </div>
              </div>
            </div>
          </div>

          {/* Document Upload */}
          <div>
            <h3 className="font-semibold mb-4">Upload Required Documents</h3>
            <p className="text-gray-400 mb-4">Documents needed before the evaluation</p>

            <div className="space-y-4">
              <div className="p-4 border border-gray-700 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">RC Registration Certificate</h4>
                    <p className="text-gray-400 text-sm">Please update the PDF/Clear Photo of your Car's RC.</p>
                  </div>
                  <Button variant="outline" className="bg-transparent border-purple-500 text-purple-500">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </Button>
                </div>
              </div>

              <div className="p-4 border border-gray-700 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">Insurance Copy</h4>
                    <p className="text-gray-400 text-sm">
                      Please update the PDF/Clear Photo of your previous Insurance.
                    </p>
                  </div>
                  <Button variant="outline" className="bg-transparent border-purple-500 text-purple-500">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <Button variant="outline" className="flex-1">
            CANCEL
          </Button>
          <Button className="flex-1 bg-purple-500 hover:bg-purple-600">RESCHEDULE</Button>
        </div>

        {/* Exchange Offer */}
        <div className="mt-8 p-6 bg-gradient-to-r from-red-900/50 to-yellow-900/50 rounded-lg">
          <h3 className="font-semibold mb-4">Exchange Offer</h3>
          <p className="text-gray-300 mb-4">
            Get a Spinny Assured car in exchange for your Hyundai Sonata GLS.{" "}
            <Button variant="link" className="text-purple-500 p-0">
              Learn more
            </Button>
          </p>
          <ul className="space-y-2 mb-4">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              Pay the difference
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              Get a bonus of upto ₹20,000
            </li>
          </ul>
          <Button className="w-full bg-purple-500 hover:bg-purple-600">SELECT A CAR</Button>
        </div>

        {/* Help Section */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-400">Need help?</h3>
            <Button variant="outline" className="bg-transparent border-purple-500 text-purple-500">
              GET A CALL BACK
            </Button>
          </div>

          <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>
          <Accordion type="single" collapsible className="space-y-2">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is Spinny SellRight?</AccordionTrigger>
              <AccordionContent>
                Spinny SellRight is our hassle-free car selling service that ensures you get the best price for your
                vehicle through our thorough evaluation process.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How do I sell my car to Spinny?</AccordionTrigger>
              <AccordionContent>
                Simply book an evaluation, bring your car to our hub, get it inspected, and receive an instant offer. If
                you accept, we handle all the paperwork.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How does Spinny guarantee the best price for my car?</AccordionTrigger>
              <AccordionContent>
                We use advanced pricing algorithms and real-time market data to ensure you get the most competitive
                price for your vehicle.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  )
}



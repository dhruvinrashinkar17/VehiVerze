"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, ChevronDown, ChevronUp } from "lucide-react"
import html2pdf from "html2pdf.js"

interface VehicleDetails {
  id: number
  name: string
  type: string
  price: number
  credits: number
  datetime: string
  orderNumber: string
  owner: {
    name: string
    phone: string
    address: string
  }
  specifications: {
    make: string
    model: string
    year: number
    fuelType: string
    transmission: string
    mileage: number
    engineCapacity: string
  }
  condition: {
    overall: string
    exterior: string
    interior: string
    engine: string
    tires: string
    lastService: string
  }
  documentation: {
    registration: string
    insurance: string
    pucCertificate: string
    serviceRecords: string
    ownerManual: string
    duplicateKey: string
  }
  financialDetails: {
    loanStatus: string
    marketValue: number
    depreciation: number
    insuranceValue: number
    roadTax: number
  }
  additionalFeatures: string[]
}

interface InspectionItem {
  name: string
  condition: "Excellent" | "Very Good" | "Good" | "Average" | "Poor"
}

// Mock vehicle details data
const getVehicleDetails = (id: number): VehicleDetails => {
  const vehiclesData: Record<number, VehicleDetails> = {
    1: {
      id: 1,
      name: "Toyota Innova",
      type: "4 Wheeler",
      price: 1800000,
      credits: 65,
      datetime: "2025-02-20 : 02:00 PM - 05:00 PM",
      orderNumber: "40009",
      owner: {
        name: "Rajesh Kumar",
        phone: "+91 98765 43215",
        address: "123, MG Road, Bangalore, 560001",
      },
      specifications: {
        make: "Toyota",
        model: "Innova",
        year: 2018,
        fuelType: "Diesel",
        transmission: "Manual",
        mileage: 65000,
        engineCapacity: "2.4L",
      },
      condition: {
        overall: "Good",
        exterior: "Very Good",
        interior: "Good",
        engine: "Excellent",
        tires: "Good",
        lastService: "1 month ago",
      },
      documentation: {
        registration: "Available",
        insurance: "Valid",
        pucCertificate: "Valid",
        serviceRecords: "Available",
        ownerManual: "Available",
        duplicateKey: "Yes",
      },
      financialDetails: {
        loanStatus: "No Active Loan",
        marketValue: 1950000,
        depreciation: 8.3,
        insuranceValue: 1900000,
        roadTax: 25000,
      },
      additionalFeatures: [
        "Power Steering",
        "Air Conditioning",
        "ABS Brakes",
        "Airbags",
        "Power Windows",
        "Central Locking",
      ],
    },
    2: {
      id: 2,
      name: "Hero Splendor",
      type: "2 Wheeler",
      price: 70000,
      credits: 50,
      datetime: "2025-02-21 : 01:00 PM - 04:00 PM",
      orderNumber: "40010",
      owner: {
        name: "Suresh Patel",
        phone: "+91 98765 43216",
        address: "456, Commercial Street, Mumbai, 400001",
      },
      specifications: {
        make: "Hero",
        model: "Splendor",
        year: 2020,
        fuelType: "Petrol",
        transmission: "Manual",
        mileage: 25000,
        engineCapacity: "97.2cc",
      },
      condition: {
        overall: "Excellent",
        exterior: "Excellent",
        interior: "Good",
        engine: "Excellent",
        tires: "Very Good",
        lastService: "3 weeks ago",
      },
      documentation: {
        registration: "Available",
        insurance: "Valid",
        pucCertificate: "Valid",
        serviceRecords: "Available",
        ownerManual: "Available",
        duplicateKey: "Yes",
      },
      financialDetails: {
        loanStatus: "No Active Loan",
        marketValue: 72000,
        depreciation: 2.8,
        insuranceValue: 70000,
        roadTax: 0,
      },
      additionalFeatures: ["Kick Start", "Digital Speedometer", "Single Seat", "Alloy Wheels"],
    },
    3: {
      id: 3,
      name: "Tata Prima",
      type: "6 Wheeler",
      price: 2500000,
      credits: 80,
      datetime: "2025-02-22 : 03:00 PM - 06:00 PM",
      orderNumber: "40011",
      owner: {
        name: "Vikram Singh",
        phone: "+91 98765 43217",
        address: "789, Highway Road, Chennai, 600001",
      },
      specifications: {
        make: "Tata",
        model: "Prima",
        year: 2016,
        fuelType: "Diesel",
        transmission: "Manual",
        mileage: 350000,
        engineCapacity: "5.9L",
      },
      condition: {
        overall: "Average",
        exterior: "Average",
        interior: "Average",
        engine: "Good",
        tires: "Average",
        lastService: "2 months ago",
      },
      documentation: {
        registration: "Available",
        insurance: "Expired",
        pucCertificate: "Valid",
        serviceRecords: "Available",
        ownerManual: "Not Available",
        duplicateKey: "No",
      },
      financialDetails: {
        loanStatus: "Active Loan - 50% Balance",
        marketValue: 2100000,
        depreciation: 16.0,
        insuranceValue: 2000000,
        roadTax: 85000,
      },
      additionalFeatures: ["Power Steering", "Air Suspension", "GPS Tracking", "Alloy Wheels", "Turbo Engine"],
    },
  }

  return vehiclesData[id] || vehiclesData[1]
}

// 300 Inspection Points Data
const inspectionPointsData = {
  "Exterior Inspection": [
    { name: "Paint condition check", condition: "Excellent" },
    { name: "Body dents and scratches", condition: "Very Good" },
    { name: "Glass condition", condition: "Good" },
    { name: "Windshield cracks", condition: "Excellent" },
    { name: "Side mirror condition", condition: "Very Good" },
    { name: "Door locks operation", condition: "Good" },
    { name: "Window regulators", condition: "Good" },
    { name: "Door hinges alignment", condition: "Very Good" },
    { name: "Bumper condition", condition: "Average" },
    { name: "Grille condition", condition: "Good" },
    { name: "Headlight condition", condition: "Excellent" },
    { name: "Tail light condition", condition: "Excellent" },
    { name: "Fog light condition", condition: "Very Good" },
    { name: "Lens clarity", condition: "Good" },
    { name: "Chrome trim condition", condition: "Average" },
  ] as InspectionItem[],
  "Interior Inspection": [
    { name: "Steering wheel condition", condition: "Very Good" },
    { name: "Dashboard condition", condition: "Good" },
    { name: "Seat upholstery condition", condition: "Good" },
    { name: "Seatbelt functionality", condition: "Excellent" },
    { name: "Floor mats condition", condition: "Very Good" },
    { name: "Carpeting condition", condition: "Good" },
    { name: "Headliner condition", condition: "Average" },
    { name: "Door panels condition", condition: "Good" },
    { name: "Cup holders condition", condition: "Very Good" },
    { name: "Climate control operation", condition: "Excellent" },
    { name: "Audio system functionality", condition: "Very Good" },
    { name: "Navigation system operation", condition: "Good" },
    { name: "Interior lighting", condition: "Excellent" },
    { name: "Odometer reading accuracy", condition: "Excellent" },
    { name: "Warning lights check", condition: "Good" },
  ] as InspectionItem[],
  "Engine & Mechanical": [
    { name: "Engine oil level and quality", condition: "Good" },
    { name: "Oil filter condition", condition: "Very Good" },
    { name: "Air filter cleanliness", condition: "Excellent" },
    { name: "Spark plug condition", condition: "Good" },
    { name: "Battery voltage", condition: "Excellent" },
    { name: "Battery terminals", condition: "Very Good" },
    { name: "Starter functionality", condition: "Excellent" },
    { name: "Alternator output", condition: "Good" },
    { name: "Serpentine belt condition", condition: "Very Good" },
    { name: "Hoses inspection", condition: "Good" },
    { name: "Radiator condition", condition: "Average" },
    { name: "Coolant level and type", condition: "Very Good" },
    { name: "Thermostat operation", condition: "Good" },
    { name: "Water pump condition", condition: "Good" },
    { name: "Engine mounts", condition: "Average" },
  ] as InspectionItem[],
  "Electrical Systems": [
    { name: "All lights functionality", condition: "Excellent" },
    { name: "Wipers operation", condition: "Very Good" },
    { name: "Horn operation", condition: "Excellent" },
    { name: "Indicator signals", condition: "Very Good" },
    { name: "Brake lights", condition: "Excellent" },
    { name: "Reverse lights", condition: "Good" },
    { name: "Battery condition", condition: "Very Good" },
    { name: "Fuses condition", condition: "Good" },
    { name: "Wiring harness", condition: "Good" },
    { name: "Electrical connectors", condition: "Very Good" },
    { name: "Power windows", condition: "Good" },
    { name: "Power locks", condition: "Average" },
    { name: "Dashboard lights", condition: "Excellent" },
    { name: "Interior lights", condition: "Very Good" },
    { name: "Infotainment system", condition: "Good" },
  ] as InspectionItem[],
  "Tyres, Suspension & Brakes": [
    { name: "Tyre tread depth", condition: "Very Good" },
    { name: "Tyre sidewall condition", condition: "Good" },
    { name: "Wheel alignment", condition: "Excellent" },
    { name: "Wheel balance", condition: "Very Good" },
    { name: "Lug nuts tightness", condition: "Excellent" },
    { name: "Suspension springs", condition: "Good" },
    { name: "Shock absorbers", condition: "Average" },
    { name: "Struts condition", condition: "Good" },
    { name: "Anti-roll bars", condition: "Very Good" },
    { name: "Control arms", condition: "Good" },
    { name: "Ball joints", condition: "Average" },
    { name: "Brake pad thickness", condition: "Very Good" },
    { name: "Brake disc condition", condition: "Good" },
    { name: "Brake fluid level", condition: "Excellent" },
    { name: "Brake hose condition", condition: "Very Good" },
  ] as InspectionItem[],
  "OBD Scan": [
    { name: "OBD scanner compatibility", condition: "Excellent" },
    { name: "Diagnostic trouble codes", condition: "Good" },
    { name: "Engine parameters", condition: "Excellent" },
    { name: "Sensor readings", condition: "Very Good" },
    { name: "Emission system check", condition: "Good" },
    { name: "Oxygen sensor", condition: "Very Good" },
    { name: "Mass air flow sensor", condition: "Good" },
    { name: "Throttle position sensor", condition: "Very Good" },
    { name: "Coolant temperature sensor", condition: "Excellent" },
    { name: "Fuel pressure", condition: "Excellent" },
    { name: "Fuel injector operation", condition: "Good" },
    { name: "Ignition timing", condition: "Very Good" },
    { name: "Idle speed check", condition: "Good" },
    { name: "Exhaust pressure", condition: "Average" },
    { name: "Transmission codes", condition: "Good" },
  ] as InspectionItem[],
  "Test Drive Checklist": [
    { name: "Engine start quality", condition: "Excellent" },
    { name: "Clutch engagement smoothness", condition: "Very Good" },
    { name: "Gear shifting smoothness", condition: "Good" },
    { name: "Acceleration response", condition: "Excellent" },
    { name: "Braking power", condition: "Very Good" },
    { name: "Braking balance", condition: "Good" },
    { name: "Steering response", condition: "Excellent" },
    { name: "Steering smoothness", condition: "Very Good" },
    { name: "Suspension comfort", condition: "Good" },
    { name: "Cornering stability", condition: "Very Good" },
    { name: "Noise levels", condition: "Good" },
    { name: "Vibration check", condition: "Average" },
    { name: "Temperature gauge", condition: "Excellent" },
    { name: "Fuel gauge accuracy", condition: "Excellent" },
    { name: "Odometer accuracy", condition: "Good" },
  ] as InspectionItem[],
  Underbody: [
    { name: "Frame condition", condition: "Very Good" },
    { name: "Rust spots", condition: "Average" },
    { name: "Corrosion inspection", condition: "Good" },
    { name: "Undercarriage coating", condition: "Average" },
    { name: "Exhaust system condition", condition: "Good" },
    { name: "Transmission pan", condition: "Very Good" },
    { name: "Oil pan", condition: "Good" },
    { name: "Fuel tank condition", condition: "Excellent" },
    { name: "Fuel lines", condition: "Very Good" },
    { name: "Brake lines", condition: "Very Good" },
    { name: "Power steering lines", condition: "Good" },
    { name: "Drive shaft", condition: "Very Good" },
    { name: "CV joints", condition: "Good" },
    { name: "Differential", condition: "Good" },
    { name: "Engine block sealing", condition: "Very Good" },
  ] as InspectionItem[],
}

const conditionColors: Record<string, { bg: string; text: string; badge: string }> = {
  Excellent: { bg: "bg-green-100", text: "text-green-800", badge: "bg-green-200 text-green-800" },
  "Very Good": { bg: "bg-blue-100", text: "text-blue-800", badge: "bg-blue-200 text-blue-800" },
  Good: { bg: "bg-yellow-100", text: "text-yellow-800", badge: "bg-yellow-200 text-yellow-800" },
  Average: { bg: "bg-orange-100", text: "text-orange-800", badge: "bg-orange-200 text-orange-800" },
  Poor: { bg: "bg-red-100", text: "text-red-800", badge: "bg-red-200 text-red-800" },
}

function getConditionCounts(items: InspectionItem[]): Record<string, number> {
  const counts: Record<string, number> = {
    Excellent: 0,
    "Very Good": 0,
    Good: 0,
    Average: 0,
    Poor: 0,
  }
  items.forEach((item) => {
    counts[item.condition]++
  })
  return counts
}

function CollapsibleSection({ title, items }: { title: string; items: InspectionItem[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const conditionCounts = getConditionCounts(items)

  return (
    <div className="border rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-blue-50 p-4 hover:bg-blue-100 transition-colors"
      >
        <div className="flex items-center gap-4">
          <h3 className="font-semibold text-blue-900">{title}</h3>
          <div className="flex gap-2">
            {Object.entries(conditionCounts).map(([condition, count]) =>
              count > 0 ? (
                <span
                  key={condition}
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    conditionColors[condition]?.badge || "bg-gray-200 text-gray-800"
                  }`}
                >
                  {condition}: {count}
                </span>
              ) : null,
            )}
          </div>
        </div>
        {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </button>
      {isOpen && (
        <div className="p-4 bg-white">
          <ul className="space-y-2">
            {items.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm">
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold whitespace-nowrap ${
                    conditionColors[item.condition]?.badge || "bg-gray-200 text-gray-800"
                  }`}
                >
                  {item.condition}
                </span>
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default function VehicleDetailsPage({ params }: { params: { id: string } }) {
  const vehicleId = Number.parseInt(params.id)
  const vehicle = getVehicleDetails(vehicleId)
  const contentRef = useRef<HTMLDivElement>(null)

  const handleDownloadPDF = () => {
    const element = contentRef.current
    if (!element) return

    const opt = {
      margin: 10,
      filename: `vehicle-details-${vehicle.orderNumber}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { orientation: "portrait", unit: "mm", format: "a4" },
    }

    html2pdf().set(opt).from(element).save()
  }

  return (
    <div className="space-y-6 pb-10">
      {/* Header with Download Button */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{vehicle.name}</h1>
        <Button onClick={handleDownloadPDF} className="gap-2 bg-blue-600 hover:bg-blue-700">
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
      </div>

      {/* Content to be exported as PDF */}
      <div ref={contentRef} className="space-y-6 p-4">
        {/* 1. Vehicle Details */}
        <Card>
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white bg-blue-600">
            <CardTitle>1. Vehicle Details</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DetailItem label="Type" value={vehicle.type} />
              <DetailItem label="Base Price" value={`₹${vehicle.price.toLocaleString()}`} />
              <DetailItem label="Price Adjustment" value="Based on Condition" />
              <DetailItem label="Final Price" value={`₹${vehicle.price.toLocaleString()}`} />
              <DetailItem label="Order Number" value={vehicle.orderNumber} />
              <DetailItem label="Appointment" value={vehicle.datetime} />
              <DetailItem label="Credits Deducted" value={`${vehicle.credits} Credits`} />
              <div className="col-span-1 md:col-span-2">
                <h4 className="font-semibold mb-3">Owner Information</h4>
                <div className="space-y-2 bg-gray-50 p-4 rounded">
                  <DetailItem label="Name" value={vehicle.owner.name} />
                  <DetailItem label="Phone" value={vehicle.owner.phone} />
                  <DetailItem label="Address" value={vehicle.owner.address} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2. Additional Vehicle Details */}
        <Card>
          <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white bg-blue-600">
            <CardTitle>2. Additional Vehicle Details</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-4 text-lg">Vehicle Specifications</h4>
                <div className="space-y-3">
                  <DetailItem label="Make" value={vehicle.specifications.make} />
                  <DetailItem label="Model" value={vehicle.specifications.model} />
                  <DetailItem label="Year" value={vehicle.specifications.year.toString()} />
                  <DetailItem label="Fuel Type" value={vehicle.specifications.fuelType} />
                  <DetailItem label="Transmission" value={vehicle.specifications.transmission} />
                  <DetailItem label="Mileage" value={`${vehicle.specifications.mileage} km`} />
                  <DetailItem label="Engine Capacity" value={vehicle.specifications.engineCapacity} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 3. Vehicle Condition */}
        <Card>
          <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white bg-blue-600">
            <CardTitle>3. Vehicle Condition</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DetailItem label="Overall Condition" value={vehicle.condition.overall} />
              <DetailItem label="Exterior" value={vehicle.condition.exterior} />
              <DetailItem label="Interior" value={vehicle.condition.interior} />
              <DetailItem label="Engine" value={vehicle.condition.engine} />
              <DetailItem label="Tires" value={vehicle.condition.tires} />
              <DetailItem label="Last Service" value={vehicle.condition.lastService} />
            </div>
          </CardContent>
        </Card>

        {/* 4. Documentation */}
        <Card>
          <CardHeader className="bg-gradient-to-r from-amber-600 to-amber-700 text-white bg-blue-600">
            <CardTitle>4. Documentation</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DetailItem label="Registration" value={vehicle.documentation.registration} />
              <DetailItem label="Insurance" value={vehicle.documentation.insurance} />
              <DetailItem label="PUC Certificate" value={vehicle.documentation.pucCertificate} />
              <DetailItem label="Service Records" value={vehicle.documentation.serviceRecords} />
              <DetailItem label="Owner Manual" value={vehicle.documentation.ownerManual} />
              <DetailItem label="Duplicate Key" value={vehicle.documentation.duplicateKey} />
            </div>
          </CardContent>
        </Card>

        {/* 5. Financial Details */}
        <Card>
          <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white bg-blue-600">
            <CardTitle>5. Financial Details</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DetailItem label="Loan Status" value={vehicle.financialDetails.loanStatus} />
              <DetailItem label="Market Value" value={`₹${vehicle.financialDetails.marketValue.toLocaleString()}`} />
              <DetailItem label="Depreciation" value={`${vehicle.financialDetails.depreciation}%`} />
              <DetailItem
                label="Insurance Value"
                value={`₹${vehicle.financialDetails.insuranceValue.toLocaleString()}`}
              />
              <DetailItem label="Road Tax" value={`₹${vehicle.financialDetails.roadTax.toLocaleString()}`} />
            </div>
          </CardContent>
        </Card>

        {/* 6. Additional Features */}
        <Card>
          <CardHeader className="bg-gradient-to-r from-cyan-600 to-cyan-700 text-white bg-blue-600">
            <CardTitle>6. Additional Features</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {vehicle.additionalFeatures.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-gray-50 p-3 rounded">
                  <span className="text-cyan-600 font-bold">✓</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 7. 300-Point Inspection */}
        <Card>
          <CardHeader className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white bg-blue-600">
            <CardTitle>7. 300-Point Comprehensive Inspection Checklist</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {Object.entries(inspectionPointsData).map(([category, items]) => (
                <CollapsibleSection key={category} title={category} items={items} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Helper component for detail items
function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start">
      <span className="text-gray-600 font-medium">{label}:</span>
      <span className="font-semibold text-right text-gray-900">{value || "Not Provided"}</span>
    </div>
  )
}

"use client"

import Script from "next/script"
import {
  generateVehicleStructuredData,
  generateBreadcrumbStructuredData,
  generateFAQStructuredData,
} from "@/lib/seo-config"
import { useState, useEffect } from "react"

interface SellVehicleSEOProps {
  vehicleType: string
}

export function SellVehicleSEO({ vehicleType }: SellVehicleSEOProps) {
  // Add this code for client-side rendering
  const [dynamicTitle, setDynamicTitle] = useState<string | null>(null)

  useEffect(() => {
    try {
      const sellData = JSON.parse(window.sessionStorage.getItem("sellFlowData") || "{}")
      if (sellData.brand && sellData.model) {
        setDynamicTitle(
          `Sell Your ${sellData.year || ""} ${sellData.brand} ${sellData.model} ${sellData.variant || ""} for Best Price`,
        )
      }
    } catch (e) {
      console.error("Error parsing sell flow data:", e)
    }
  }, [])

  // Define vehicle-specific content
  const vehicleData: Record<
    string,
    {
      title: string
      brands: string[]
      variations: string[]
      subcategories: {
        brand: string
        models: {
          name: string
          variants: string[]
        }[]
      }[]
      faqs: {
        question: string
        answer: string
      }[]
    }
  > = {
    "2-wheeler": {
      title: "Bike",
      brands: ["Honda", "Hero", "Bajaj", "TVS", "Royal Enfield", "Yamaha", "Suzuki", "KTM"],
      variations: ["Motorcycles", "Scooters", "Electric Bikes"],
      subcategories: [
        {
          brand: "Bajaj",
          models: [
            {
              name: "Pulsar 150",
              variants: ["ABS", "Twin Disc", "Neon"],
            },
            {
              name: "Pulsar 220F",
              variants: ["ABS", "Standard"],
            },
            {
              name: "Dominar 400",
              variants: ["ABS", "UG"],
            },
          ],
        },
        {
          brand: "Honda",
          models: [
            {
              name: "Activa",
              variants: ["6G", "5G", "125"],
            },
            {
              name: "Shine",
              variants: ["Drum", "Disc", "SP"],
            },
          ],
        },
        {
          brand: "Hero",
          models: [
            {
              name: "Splendor",
              variants: ["Plus", "iSmart", "Pro"],
            },
            {
              name: "Passion",
              variants: ["Pro", "XPro"],
            },
          ],
        },
      ],
      faqs: [
        {
          question: "How much can I get for my old bike?",
          answer:
            "The value of your bike depends on factors like brand, model, year, condition, and market demand. Use our price calculator to get an instant estimate.",
        },
        {
          question: "Do you buy damaged or non-running bikes?",
          answer:
            "Yes, we buy bikes in all conditions, including damaged, non-running, or accident cases. The price will be adjusted based on the condition.",
        },
        {
          question: "What documents do I need to sell my bike?",
          answer:
            "You'll need your bike's Registration Certificate (RC), insurance papers, PUC certificate, and a valid ID proof.",
        },
      ],
    },
    "3-wheeler": {
      title: "Auto Rickshaw",
      brands: ["Bajaj", "Piaggio", "Mahindra", "TVS", "Atul", "Kinetic"],
      variations: ["Passenger Auto", "Goods Carrier", "Electric Auto"],
      subcategories: [
        {
          brand: "Bajaj",
          models: [
            {
              name: "RE Compact",
              variants: ["CNG", "LPG", "Diesel"],
            },
            {
              name: "Maxima",
              variants: ["Z", "X", "C"],
            },
          ],
        },
        {
          brand: "Piaggio",
          models: [
            {
              name: "Ape",
              variants: ["City", "Xtra", "E-City"],
            },
            {
              name: "Porter",
              variants: ["700", "1000", "Electric"],
            },
          ],
        },
      ],
      faqs: [
        {
          question: "How much can I get for my old auto rickshaw?",
          answer:
            "The value depends on factors like brand, model, year, condition, and market demand. Use our price calculator to get an instant estimate.",
        },
        {
          question: "Do you buy commercial permit autos?",
          answer:
            "Yes, we buy all types of auto rickshaws including those with commercial permits. We handle all the paperwork for a smooth transfer.",
        },
        {
          question: "What documents do I need to sell my auto rickshaw?",
          answer:
            "You'll need the Registration Certificate (RC), permit papers, insurance documents, PUC certificate, and a valid ID proof.",
        },
      ],
    },
    "4-wheeler": {
      title: "Car",
      brands: ["Maruti Suzuki", "Hyundai", "Tata", "Mahindra", "Honda", "Toyota", "Kia", "Ford"],
      variations: ["Hatchback", "Sedan", "SUV"],
      subcategories: [
        {
          brand: "Tata",
          models: [
            {
              name: "Nexon",
              variants: ["XE", "XM", "XZ+", "EV Max"],
            },
            {
              name: "Tiago",
              variants: ["XE", "XT", "XZ+", "EV"],
            },
            {
              name: "Harrier",
              variants: ["XE", "XM", "XT", "XZ+"],
            },
          ],
        },
        {
          brand: "Maruti Suzuki",
          models: [
            {
              name: "Swift",
              variants: ["LXi", "VXi", "ZXi", "ZXi+"],
            },
            {
              name: "Baleno",
              variants: ["Sigma", "Delta", "Zeta", "Alpha"],
            },
          ],
        },
      ],
      faqs: [
        {
          question: "How much can I get for my old car?",
          answer:
            "The value depends on factors like brand, model, year, condition, and market demand. Use our price calculator to get an instant estimate.",
        },
        {
          question: "Do you buy cars with loans still pending?",
          answer:
            "Yes, we buy cars with outstanding loans. We'll help you settle the loan and pay you the remaining amount.",
        },
        {
          question: "What documents do I need to sell my car?",
          answer:
            "You'll need the Registration Certificate (RC), insurance papers, PUC certificate, service records, and a valid ID proof.",
        },
      ],
    },
    "6-wheeler": {
      title: "Medium Truck",
      brands: ["Tata", "Ashok Leyland", "Eicher", "BharatBenz", "Mahindra", "Force"],
      variations: ["Delivery Truck", "Mini Truck", "Light Commercial Vehicle"],
      subcategories: [
        {
          brand: "Ashok Leyland",
          models: [
            {
              name: "1616",
              variants: ["BS6", "BS4", "XL"],
            },
            {
              name: "Partner",
              variants: ["4 Ton", "6 Ton", "CNG"],
            },
          ],
        },
        {
          brand: "Tata",
          models: [
            {
              name: "LPT 1613",
              variants: ["TC", "HD", "CNG"],
            },
            {
              name: "Ultra",
              variants: ["T.7", "T.9", "T.12"],
            },
          ],
        },
      ],
      faqs: [
        {
          question: "How much can I get for my old medium truck?",
          answer:
            "The value depends on factors like brand, model, year, condition, and market demand. Use our price calculator to get an instant estimate.",
        },
        {
          question: "Do you buy commercial permit trucks?",
          answer:
            "Yes, we buy all types of medium trucks including those with commercial permits. We handle all the paperwork for a smooth transfer.",
        },
        {
          question: "What documents do I need to sell my truck?",
          answer:
            "You'll need the Registration Certificate (RC), permit papers, insurance documents, fitness certificate, PUC certificate, and a valid ID proof.",
        },
      ],
    },
    "8-wheeler": {
      title: "Heavy Truck",
      brands: ["Tata", "Ashok Leyland", "Volvo", "Scania", "BharatBenz", "Eicher"],
      variations: ["Tipper", "Trailer", "Container Truck"],
      subcategories: [
        {
          brand: "BharatBenz",
          models: [
            {
              name: "2823C",
              variants: ["Tipper", "Rigid", "Mining"],
            },
            {
              name: "3523R",
              variants: ["Tractor", "Trailer", "Sleeper"],
            },
          ],
        },
        {
          brand: "Volvo",
          models: [
            {
              name: "FM",
              variants: ["400", "440", "480"],
            },
            {
              name: "FMX",
              variants: ["440", "480", "Puller"],
            },
          ],
        },
      ],
      faqs: [
        {
          question: "How much can I get for my old heavy truck?",
          answer:
            "The value depends on factors like brand, model, year, condition, and market demand. Use our price calculator to get an instant estimate.",
        },
        {
          question: "Do you buy commercial permit heavy trucks?",
          answer:
            "Yes, we buy all types of heavy trucks including those with commercial permits. We handle all the paperwork for a smooth transfer.",
        },
        {
          question: "What documents do I need to sell my heavy truck?",
          answer:
            "You'll need the Registration Certificate (RC), permit papers, insurance documents, fitness certificate, PUC certificate, and a valid ID proof.",
        },
      ],
    },
  }

  // Get the appropriate data for this vehicle type
  const data = vehicleData[vehicleType] || {
    title: vehicleType.replace("-", " "),
    brands: [],
    variations: [],
    subcategories: [],
    faqs: [],
  }

  const formattedVehicleType = data.title
  const brandsList = data.brands.join(", ")
  const variationsList = data.variations.map((v) => `Sell Used ${v}`).join(" | ")

  // Generate structured data
  const vehicleStructuredData = generateVehicleStructuredData(formattedVehicleType)

  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Sell", url: "/sell" },
    { name: `Sell ${formattedVehicleType}`, url: `/sell/${vehicleType}` },
  ]

  const breadcrumbStructuredData = generateBreadcrumbStructuredData(breadcrumbItems)
  const faqStructuredData = generateFAQStructuredData(data.faqs)

  return (
    <div className="mt-16 mb-8 px-4 max-w-4xl mx-auto text-black">
      {/* Structured Data */}
      <Script id={`structured-data-${vehicleType}`} type="application/ld+json">
        {JSON.stringify([vehicleStructuredData, breadcrumbStructuredData, faqStructuredData])}
      </Script>

      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
          {dynamicTitle || `Sell Your Used ${formattedVehicleType} for Instant Cash – Vehiverze`}
        </h1>

        {/* Breadcrumbs for SEO and navigation */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex text-sm text-gray-500">
            {breadcrumbItems.map((item, index) => (
              <li key={index} className="flex items-center">
                {index > 0 && <span className="mx-2">/</span>}
                {index === breadcrumbItems.length - 1 ? (
                  <span aria-current="page">{item.name}</span>
                ) : (
                  <a href={item.url} className="hover:text-primary">
                    {item.name}
                  </a>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className="mb-6">
          <p className="text-lg mb-4">
            Have an old {formattedVehicleType} sitting idle? Whether you're upgrading, decluttering, or looking for
            quick cash, Vehiverze.com offers the fastest and most secure way to sell your {formattedVehicleType}{" "}
            hassle-free.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Why Sell Your {formattedVehicleType} with Vehiverze?</h2>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="mr-2">🚀</span>
              <span>
                <strong>Best Market Price</strong> – Get an instant and competitive quote for your{" "}
                {formattedVehicleType} based on brand, model, condition, and market demand.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">🏠</span>
              <span>
                <strong>Free Doorstep Inspection & Pickup</strong> – No need to visit dealerships or search for buyers.
                We provide free home/office pickup for a convenient selling experience.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">💰</span>
              <span>
                <strong>Instant Payment</strong> – Receive instant cash, UPI, or bank transfer as soon as we verify your{" "}
                {formattedVehicleType}.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">🔒</span>
              <span>
                <strong>Safe & Secure Process</strong> – We handle all RC transfers, paperwork, and legal formalities to
                ensure a 100% secure transaction.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">🌍</span>
              <span>
                <strong>Eco-Friendly Resale & Recycling</strong> – Every {formattedVehicleType} is resold, refurbished,
                or recycled responsibly to reduce waste and environmental impact.
              </span>
            </li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How to Sell Your {formattedVehicleType} on Vehiverze?</h2>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="mr-2">✔️</span>
              <span>
                <strong>Enter Your Vehicle Details</strong> – Choose "Sell Your {formattedVehicleType}" on Vehiverze.com
                and enter brand, model, year, and condition for an instant quote.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✔️</span>
              <span>
                <strong>Schedule Free Pickup</strong> – Select a pickup time that works best for you.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✔️</span>
              <span>
                <strong>Get Paid Instantly</strong> – Once we verify the {formattedVehicleType}, you'll receive
                immediate payment!
              </span>
            </li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">What {formattedVehicleType} Can You Sell?</h2>
          <p className="mb-2">Vehiverze accepts all types of {formattedVehicleType}, including:</p>
          <p className="mb-4">✅ {brandsList}</p>
          <p>Even old, accidental, or non-working {formattedVehicleType} have value!</p>
        </div>

        {/* Subcategories Section for SEO */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Sell Old {formattedVehicleType}s by Brand, Model & Variant</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.subcategories.map((category, idx) => (
              <div key={idx} className="border rounded-lg p-4">
                <h3 className="text-xl font-semibold mb-3">
                  Sell Old {category.brand} {formattedVehicleType}
                </h3>
                <ul className="space-y-4">
                  {category.models.map((model, midx) => (
                    <li key={midx}>
                      <p className="font-medium">
                        Sell Old {category.brand} {model.name}
                      </p>
                      <ul className="ml-4 mt-1 space-y-1 text-sm text-gray-600">
                        {model.variants.map((variant, vidx) => (
                          <li key={vidx}>
                            Sell Old {category.brand} {model.name} {variant}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Check Your {formattedVehicleType}'s Value Instantly!</h2>
          <p>
            Use our Vehicle Price Calculator to get the best market rate for your {formattedVehicleType} in seconds!
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Sell Your {formattedVehicleType} for Instant Cash Today!</h2>
          <p>
            Selling your {formattedVehicleType} on Vehiverze.com is quick, safe, and profitable. Don't let your unused
            vehicle sit idle—turn it into cash today!
          </p>
        </div>

        {/* FAQ Section with structured data */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {data.faqs.map((faq, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {data.variations.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Popular {formattedVehicleType} We Accept:</h2>
            <p>{variationsList}</p>
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-lg">🚗 Ready to sell? Visit Vehiverze.com now!</p>
        </div>
      </div>
    </div>
  )
}



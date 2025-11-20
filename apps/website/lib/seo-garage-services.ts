export const garageServicesSeo = {
  mainTitle: "Car Service & Repair | Professional Garage Services - Vehiverze",
  mainDescription:
    "Book professional car service & repair at Vehiverze. Doorstep pickup & drop, certified technicians, genuine parts. Save up to 40% on car maintenance.",

  // Service categories with SEO data
  services: {
    periodic: {
      title: "Periodic Car Service | Regular Car Maintenance - Vehiverze",
      description:
        "Book periodic car service with Vehiverze. Basic, Standard & Comprehensive packages available. Free pickup & drop, certified technicians, genuine parts.",
      keywords: "periodic car service, regular car maintenance, car service packages, doorstep car service",
      benefits: [
        "Free doorstep pickup and drop service",
        "Certified and experienced technicians",
        "Genuine parts and high-quality oils",
        "Transparent pricing with no hidden charges",
        "1000 Kms or 1 Month warranty on all services",
        "Real-time service updates and notifications",
      ],
    },
    ac: {
      title: "Car AC Service & Repair | Air Conditioning Service - Vehiverze",
      description:
        "Professional car AC service & repair. AC gas refill, compressor repair, cooling coil cleaning. Expert technicians, doorstep service available.",
      keywords: "car ac service, car air conditioning repair, ac gas refill, car cooling service",
      benefits: [
        "Complete AC system diagnosis",
        "AC gas refill and leak detection",
        "Compressor and condenser repair",
        "Cooling coil cleaning and maintenance",
        "Cabin filter replacement",
        "90-day warranty on AC repairs",
      ],
    },
    batteries: {
      title: "Car Battery Service | Battery Replacement & Check - Vehiverze",
      description:
        "Car battery service, replacement & health check. Genuine batteries, free installation, doorstep service. Get your car battery serviced today.",
      keywords: "car battery service, car battery replacement, battery health check, car battery repair",
      benefits: [
        "Free battery health check and diagnosis",
        "Genuine branded batteries available",
        "Free installation and old battery disposal",
        "24/7 emergency battery service",
        "Battery terminal cleaning and maintenance",
        "Up to 2 years warranty on new batteries",
      ],
    },
    tyres: {
      title: "Tyre Service | Wheel Alignment & Balancing - Vehiverze",
      description:
        "Professional tyre service, wheel alignment, balancing & rotation. Premium tyre brands, expert fitting, doorstep service available.",
      keywords: "tyre service, wheel alignment, wheel balancing, tyre rotation, tyre replacement",
      benefits: [
        "Premium tyre brands available",
        "Professional wheel alignment and balancing",
        "Tyre rotation and pressure check",
        "Free tyre health inspection",
        "Expert fitting and installation",
        "Competitive pricing on all tyre brands",
      ],
    },
    denting: {
      title: "Car Denting & Painting | Body Repair Service - Vehiverze",
      description:
        "Professional car denting & painting service. Scratch removal, dent repair, full body painting. Expert technicians, quality finish guaranteed.",
      keywords: "car denting painting, car body repair, scratch removal, dent repair, car painting service",
      benefits: [
        "Expert dent removal and body repair",
        "High-quality automotive paints",
        "Color matching and blending",
        "Scratch and scuff removal",
        "Rust treatment and prevention",
        "6-month warranty on painting work",
      ],
    },
    detailing: {
      title: "Car Detailing Service | Interior & Exterior Cleaning - Vehiverze",
      description:
        "Professional car detailing service. Interior cleaning, exterior polishing, paint protection, ceramic coating. Make your car look brand new.",
      keywords: "car detailing, car cleaning service, interior detailing, exterior polishing, ceramic coating",
      benefits: [
        "Complete interior and exterior detailing",
        "Paint correction and protection",
        "Ceramic coating and wax application",
        "Leather conditioning and fabric cleaning",
        "Engine bay cleaning and detailing",
        "UV protection and paint enhancement",
      ],
    },
  },

  // FAQ data
  faqs: [
    {
      question: "What types of vehicles do you service?",
      answer:
        "We service all types of vehicles including 2-wheelers (bikes, scooters), 3-wheelers (autos), 4-wheelers (cars, SUVs), and commercial vehicles (trucks, buses). Our technicians are trained to work on all major brands and models.",
    },
    {
      question: "Do you provide doorstep service?",
      answer:
        "Yes, we provide free doorstep pickup and drop service for all our garage services. Our executive will pick up your vehicle from your location and deliver it back after the service is completed.",
    },
    {
      question: "What is included in a basic car service?",
      answer:
        "Our basic car service includes engine oil replacement, oil filter replacement, air filter cleaning, wiper fluid top-up, battery water top-up, car wash, interior vacuuming, and a general inspection of your vehicle.",
    },
    {
      question: "How often should I service my vehicle?",
      answer:
        "For cars, we recommend service every 5,000-10,000 kms or 3-6 months. For bikes, every 3,000-5,000 kms or 3 months. For commercial vehicles, follow manufacturer guidelines or every 10,000-15,000 kms.",
    },
    {
      question: "Do you use genuine parts and oils?",
      answer:
        "Yes, we only use genuine parts and high-quality engine oils that are recommended by vehicle manufacturers. We ensure all parts and materials meet OEM standards for optimal performance.",
    },
    {
      question: "What warranty do you provide on services?",
      answer:
        "We provide a standard warranty of 1000 kms or 1 month on all our services, whichever comes first. For specific repairs like AC service or battery replacement, extended warranties may apply.",
    },
  ],

  // Structured data generators
  generateServiceStructuredData: (serviceType: string, serviceName: string) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    description: `Professional ${serviceName.toLowerCase()} for all vehicle types`,
    provider: {
      "@type": "Organization",
      name: "Vehiverze",
      url: "https://vehiverze.com",
    },
    serviceType: serviceType,
    areaServed: "India",
  }),

  generateFaqStructuredData: () => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: garageServicesSeo.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }),

  generateBreadcrumbStructuredData: (items: Array<{ name: string; url: string }>) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://vehiverze.com${item.url}`,
    })),
  }),
}



// SEO configuration for the website
export const siteConfig = {
  name: "Vehiverze",
  url: "https://vehiverze.com",
  ogImage: "/images/og-image.jpg",
  description: "Your one-stop solution for all vehicle needs. Buy, sell, service, and insure your vehicles with ease.",
  links: {
    twitter: "https://twitter.com/vehiverze",
    facebook: "https://facebook.com/vehiverze",
    instagram: "https://instagram.com/vehiverze",
  },
}

// Generate canonical URL
export function getCanonicalUrl(path: string): string {
  return `${siteConfig.url}${path}`
}

// Generate structured data for different page types
export function generateVehicleStructuredData(vehicleType: string, brand?: string, model?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: brand && model ? `${brand} ${model}` : brand ? `${brand} ${vehicleType}` : `Used ${vehicleType}`,
    description: `Sell your used ${vehicleType} for instant cash with Vehiverze. Get the best price for your vehicle with free inspection and pickup.`,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      highPrice: "5000000",
      lowPrice: "5000",
    },
    brand: brand
      ? {
          "@type": "Brand",
          name: brand,
        }
      : undefined,
  }
}

// Generate breadcrumb structured data
export function generateBreadcrumbStructuredData(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  }
}

// Generate FAQ structured data
export function generateFAQStructuredData(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}



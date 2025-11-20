import { Inter } from "next/font/google"
import "./globals.css"
import type React from "react"
import type { Metadata } from "next"
import { MobileNav } from "@/components/mobile-nav"
import { siteConfig } from "@/lib/seo-config"
import Script from "next/script"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Vehiverze - Buy, Sell, Service, Insure Vehicles",
    template: "%s | Vehiverze",
  },
  description: "Your one-stop solution for all vehicle needs. Buy, sell, service, and insure your vehicles with ease.",
  keywords: [
    "buy vehicle",
    "sell vehicle",
    "vehicle service",
    "vehicle insurance",
    "car",
    "truck",
    "motorcycle",
    "auto rickshaw",
    "commercial vehicle",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    title: "Vehiverze - Buy, Sell, Service, Insure Vehicles",
    description: "Your one-stop solution for all vehicle needs. Buy, sell, service your vehicles with ease.",
    siteName: "Vehiverze",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vehiverze - Buy, Sell, Service Vehicles",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vehiverze - Buy, Sell, Service Vehicles",
    description:
      "Your one-stop solution for all vehicle needs. Buy, sell, service, and insure your vehicles with ease.",
    images: ["/og-image.jpg"],
    creator: "@vehiverze",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "/",
  },
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        <Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" strategy="afterInteractive" async />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />

        <link
          rel="preload"
          href="https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHAPMtMaq7OIllsB1JL7nTyx95w_0U.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.className} bg-white text-gray-900`}>
        <ThemeProvider>
          <MobileNav />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



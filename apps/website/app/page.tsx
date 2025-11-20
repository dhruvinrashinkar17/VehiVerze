"use client"

import { NavBar } from "@/components/navbar"
import { VehicleCategories } from "@/components/vehicle-categories"
import { Services } from "@/components/services"
import { WhyChooseUs } from "@/components/why-choose-us"
import { Banner } from "@/components/banner"
import { Footer } from "@/components/footer"
import { OffersSection } from "@/components/offers-section"
import { BrandsShowcase } from "@/components/brands-showcase"
import { ChatSupport } from "@/components/chat-support"
import { TechStack } from "@/components/tech-stack"
import { BannerCarousel } from "@/components/banner-carousel"
import { CitySelector } from "@/components/city-selector"
import { Button } from "@vehiverze/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <>
      <main className="site-main bg-white text-black">
        <NavBar />
        <BannerCarousel />

        {/* City Selection Section */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            
          </div>
        </section>

        <VehicleCategories />
        <OffersSection />
        <Banner
          image="/placeholder.svg"
          title="Special Offer: Get Extra ₹10,000 on Your Vehicle Value"
          description="Limited time offer for all models. T&C Apply."
          link="/sell"
          className="mx-4 my-12"
        />
        <Services />
        <BrandsShowcase />
        <Banner
          image="/placeholder.svg"
          title="Need Quick Cash? Sell Your Vehicle in 24 Hours"
          description="Instant payment, hassle-free process"
          link="/sell"
          className="mx-4 my-12"
        />
        <WhyChooseUs />
        <TechStack />

        {/* Login CTA Section instead of FAQ */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Join Vehiverze Today</h2>
              <p className="text-xl mb-8">
                Create an account to access exclusive features, track your transactions, and get personalized
                recommendations.
              </p>
              <Link href="/login">
                <Button className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-3 text-lg font-medium">
                  Create Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <ChatSupport />
        <Footer />
      </main>

      <style jsx>{`
        .site-main {
          min-height: 100vh;
        }
      `}</style>
    </>
  )
}



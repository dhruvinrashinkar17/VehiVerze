"use client"

import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"
import { SellPageFAQs } from "@/components/sell-page-faqs"

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1E1E1E] to-[#2B4BA9]">
      <NavBar />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <ContactForm onSubmit={(data) => console.log(data)} onBack={() => window.history.back()} />
        </div>
      </div>
      <SellPageFAQs pageType="contact" />
      <Footer />
    </main>
  )
}



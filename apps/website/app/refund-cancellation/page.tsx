import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | Vehiverze",
  description:
    "Read Vehiverze’s Refund and Cancellation policy for bookings, services, and vehicle transactions conducted on our platform.",
}

export default function RefundCancellationPolicy() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1E1E1E] to-[#2B4BA9] text-white">
      <NavBar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-black/30 rounded-lg p-8">
          <h1 className="text-4xl font-bold mb-6">Refund & Cancellation Policy</h1>
          <p className="text-gray-300 mb-8">
            This policy outlines the terms under which you may cancel a booking or request a refund on Vehiverze.
          </p>

          <section className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">1. Scope</h2>
              <p className="text-gray-300">
                Applies to inspection bookings, service bookings, and other paid transactions facilitated via Vehiverze.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">2. Cancellations</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-300">
                <li>Free cancellation up to 24 hours before the scheduled slot.</li>
                <li>Within 24 hours, a nominal convenience fee may apply.</li>
                <li>Missed appointments may be marked as “no-show” and are non-refundable.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">3. Refunds</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-300">
                <li>Eligible refunds are processed to the original payment method within 5-7 business days.</li>
                <li>Platform fees and third-party charges are non-refundable unless legally required.</li>
                <li>For partial service fulfillment, proportional refunds may be issued at our discretion.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">4. Non-Refundable Items</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-300">
                <li>Government fees, taxes, and statutory payments</li>
                <li>Completed inspections or services</li>
                <li>Customized or special-order requests already in progress</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">5. How to Request</h2>
              <p className="text-gray-300">
                To request a cancellation or refund, please reach out via the Contact page with your order/booking ID
                and reason for the request.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">6. Changes to this Policy</h2>
              <p className="text-gray-300">Updates will be posted here and are effective upon publication.</p>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  )
}



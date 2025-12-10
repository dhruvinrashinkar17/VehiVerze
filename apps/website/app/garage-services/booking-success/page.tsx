import type { Metadata } from "next";
import { Suspense } from "react";
import { NavBar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import BookingSuccessClient from "./BookingSuccessClient";

export const metadata: Metadata = {
  title: "Booking Confirmed | Your Garage Service Appointment | Vehiverze",
  description:
    "Your garage service booking is confirmed. Track your appointment and manage your bookings.",
  keywords: [
    "booking confirmation",
    "service confirmation",
    "appointment confirmed",
    "vehiverze garage",
  ],
  openGraph: {
    title: "Your Garage Service is Booked | Vehiverze",
    description:
      "Congratulations! Your garage service appointment is confirmed. Track it on Vehiverze.",
    type: "website",
    url: "https://vehiverze.com/garage-services/booking-success",
  },
  twitter: {
    card: "summary_large_image",
    title: "Booking Confirmed | Vehiverze",
    description:
      "Your garage service appointment has been successfully booked.",
  },
};

function BookingSuccessFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
      <div className="text-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent mx-auto mb-2" />
        <p className="text-gray-600">Loading booking details...</p>
      </div>
    </div>
  );
}

export default function GarageBookingSuccessPage() {
  return (
    <>
      <NavBar />
      <Suspense fallback={<BookingSuccessFallback />}>
        <BookingSuccessClient />
      </Suspense>
      <Footer />
    </>
  );
}

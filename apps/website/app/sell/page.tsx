"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"

export default function SellPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to 4-wheeler by default
    // This maintains backward compatibility with existing links
    router.push("/sell/4-wheeler")
  }, [router])

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1E1E1E] to-[#2B4BA9]">
      <NavBar />
      <div className="py-8 flex justify-center items-center">
        <p>Redirecting to sell page...</p>
      </div>
      <Footer />
    </main>
  )
}



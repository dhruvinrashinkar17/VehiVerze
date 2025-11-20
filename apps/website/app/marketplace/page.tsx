"use client"

import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import Marketplace from "@/components/marketplace"
import { MobileNav } from "@/components/mobile-nav"

export default function MarketplacePage() {
  return (
    <>
      <NavBar />
      <MobileNav />
      <Marketplace />
      <Footer />
    </>
  )
}



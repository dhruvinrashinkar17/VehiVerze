import { NavBar } from "@/components/nav-bar"
import { SellOrdersTable } from "@/components/sell-orders-table"

export default async function SellOrdersDashboard() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1E1E1E] to-[#2B4BA9]">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Sell Orders Dashboard</h1>
        <SellOrdersTable />
      </div>
    </main>
  )
}



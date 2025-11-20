import type React from "react"
import { Sidebar } from "@/components/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1 ml-0 md:ml-64 p-4 sm:p-6 lg:p-8 pt-16 md:pt-6 max-w-full overflow-x-hidden">
        {children}
      </div>
    </div>
  )
}



import Link from "next/link"
import { Shield, Wrench } from "lucide-react"
import { Button } from "@vehiverze/ui/button"

export function ServiceCategories() {
  return (
    <div className="min-h-screen bg-[#1e2756] p-8">
      <div className="container mx-auto grid gap-8 md:grid-cols-2">
        <div className="rounded-lg bg-[#1a1f3c] p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="mb-2 text-3xl font-bold text-white">Garage Services</h2>
              <p className="text-lg text-gray-300">Professional maintenance and repair services</p>
            </div>
            <Wrench className="h-8 w-8 text-gray-400" />
          </div>

          <ul className="mb-8 space-y-4">
            <li className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-[#4ADE80]" />
              <span className="text-lg text-gray-200">Scheduled Maintenance</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-[#4ADE80]" />
              <span className="text-lg text-gray-200">Repairs & Diagnostics</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-[#4ADE80]" />
              <span className="text-lg text-gray-200">Body Work</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-[#4ADE80]" />
              <span className="text-lg text-gray-200">Performance Upgrades</span>
            </li>
          </ul>

          <Button asChild className="w-full bg-[#4ADE80] text-lg font-medium hover:bg-[#4ADE80]/90">
            <Link href="/garage-services">Learn More</Link>
          </Button>
        </div>

        <div className="rounded-lg bg-[#1a1f3c] p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="mb-2 text-3xl font-bold text-white">Insurance Services</h2>
              <p className="text-lg text-gray-300">Comprehensive insurance solutions</p>
            </div>
            <Shield className="h-8 w-8 text-gray-400" />
          </div>

          <ul className="mb-8 space-y-4">
            <li className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-[#4ADE80]" />
              <span className="text-lg text-gray-200">All Vehicle Types</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-[#4ADE80]" />
              <span className="text-lg text-gray-200">Third Party & Comprehensive</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-[#4ADE80]" />
              <span className="text-lg text-gray-200">Quick Claims</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-[#4ADE80]" />
              <span className="text-lg text-gray-200">Renewal Services</span>
            </li>
          </ul>

          <Button asChild className="w-full bg-[#4ADE80] text-lg font-medium hover:bg-[#4ADE80]/90">
            <Link href="/insurance-services">Learn More</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}



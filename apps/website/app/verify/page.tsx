import { VerificationForm } from "@/components/verification-form"
import Image from "next/image"

export default function VerifyPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-md mx-auto p-6">
        <button className="mb-6">
          <Image src="/placeholder.svg" alt="Close" width={24} height={24} />
        </button>

        <div className="flex items-center gap-4 mb-8">
          <Image src="/placeholder.svg" alt="Mahindra" width={64} height={64} className="rounded-full" />
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Mahindra , AX (O) HT Diesel MT 4WD</h1>
            <p className="text-gray-500">2025 | Diesel | DL-03</p>
          </div>
        </div>

        <VerificationForm />
      </div>
    </main>
  )
}



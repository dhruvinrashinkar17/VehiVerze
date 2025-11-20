import { ScrapSection } from "@/components/scrap-section"
import { EvaluationForm } from "@/components/evaluation-form"
import { PriceEstimate } from "@/components/price-estimate"

export default function EvaluationPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <ScrapSection />
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          <EvaluationForm />
          <PriceEstimate />
        </div>
      </div>
    </main>
  )
}



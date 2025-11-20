import Link from "next/link"

export function AdditionalFeatures() {
  return (
    <section className="py-12 bg-white text-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Additional Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link
            href="/emi-calculator"
            className="p-6 rounded-lg border border-gray-200 hover:border-blue-500 transition-colors text-center hover:shadow-md"
          >
            <h3 className="text-xl font-semibold mb-2">EMI Calculator</h3>
            <p className="text-gray-600">Calculate your monthly installments for vehicle financing</p>
          </Link>

          <Link
            href="/trade"
            className="p-6 rounded-lg border border-gray-200 hover:border-blue-500 transition-colors text-center hover:shadow-md"
          >
            <h3 className="text-xl font-semibold mb-2">Trade with Us</h3>
            <p className="text-gray-600">Exchange your old vehicle for a new one with added benefits</p>
          </Link>

          <Link
            href="/partner"
            className="p-6 rounded-lg border border-gray-200 hover:border-blue-500 transition-colors text-center hover:shadow-md"
          >
            <h3 className="text-xl font-semibold mb-2">Become a Vehiverze Partner</h3>
            <p className="text-gray-600">Join our network of dealers and service providers</p>
          </Link>
        </div>
      </div>
    </section>
  )
}



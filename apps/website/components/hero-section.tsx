export function HeroSection() {
  return (
    <section className="bg-white py-20 border-b">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black">Your One-Stop Solution for All Vehicle Needs</h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-700">BUY • SELL • SERVICE • INSURE</p>
        <p className="text-lg md:text-xl mb-12 text-gray-600">From 2 Wheelers to 8 Wheelers - We've Got You Covered</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/sell/4-wheeler"
            className="bg-secondary hover:bg-secondary/90 text-black px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
          >
            Sell Your Vehicle
          </a>
          <a
            href="/buy"
            className="bg-gray-200 hover:bg-gray-300 text-black px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
          >
            Browse Vehicles
          </a>
        </div>
      </div>
    </section>
  )
}



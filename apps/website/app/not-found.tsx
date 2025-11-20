import Link from "next/link"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-grow flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full text-center">
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
          </p>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">You might want to check:</h3>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/" className="block p-4 bg-white border rounded-lg hover:shadow-md transition-shadow">
                <span className="font-medium">Home</span>
              </Link>
              <Link href="/sell" className="block p-4 bg-white border rounded-lg hover:shadow-md transition-shadow">
                <span className="font-medium">Sell Vehicle</span>
              </Link>
              <Link href="/buy" className="block p-4 bg-white border rounded-lg hover:shadow-md transition-shadow">
                <span className="font-medium">Buy Vehicle</span>
              </Link>
              <Link href="/services" className="block p-4 bg-white border rounded-lg hover:shadow-md transition-shadow">
                <span className="font-medium">Services</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}



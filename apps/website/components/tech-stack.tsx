import { Code, Server, Database } from "lucide-react"

export function TechStack() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Sell Your Vehicle Hassle-Free with Vehiverze</h2>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Our platform is built using cutting-edge technologies to ensure a fast, secure, and seamless experience for
          all users.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Code className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Doorstep Inspection</h3>
            <p className="text-gray-600 mb-4">Our expert evaluates your vehicle at your home or nearby center.</p>
            <div className="flex justify-center space-x-4">
              <div className="flex items-center">
                <img src="/placeholder.svg?height=32&width=32" alt="Inspection" className="h-8 w-8 mr-2" />
                <span>Book Inspection</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Server className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Instant Payment & RC Transfer</h3>
            <p className="text-gray-600 mb-4">Sell your vehicle with quick payment & hassle-free ownership transfer.</p>
            <div className="flex justify-center">
              <div className="flex items-center">
                <img src="/placeholder.svg?height=32&width=32" alt="Payment" className="h-8 w-8 mr-2" />
                <span>Sell Now</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="bg-purple-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Database className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Best Price Guarantee</h3>
            <p className="text-gray-600 mb-4">
              Get the best market value for your vehicle with our price match guarantee
            </p>
            <div className="flex justify-center">
              <div className="flex items-center">
                <img src="/placeholder.svg?height=32&width=32" alt="Price" className="h-8 w-8 mr-2" />
                <span>Get Quote</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}



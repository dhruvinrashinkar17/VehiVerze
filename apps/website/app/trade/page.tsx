import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Button } from "@vehiverze/ui/button"
import { Input } from "@vehiverze/ui/input"
import { Textarea } from "@vehiverze/ui/textarea"
import { Label } from "@vehiverze/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@vehiverze/ui/card"
import { CheckCircle, TrendingUp, Shield, Clock, Users } from "lucide-react"

export default function TradeWithUsPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <NavBar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Trade With Us</h1>
          <p className="text-xl text-black-300">
            Join our network of trusted trading partners and grow your business with Vehiverze
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-6">Why Partner With Us?</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-300" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Increased Business Volume</h3>
                  <p className="text-black-300">
                    Access our large customer base and increase your trading volume significantly.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-900 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-green-300" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Secure Transactions</h3>
                  <p className="text-black-300">
                    Our platform ensures all transactions are secure and transparent for all parties.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-900 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-purple-300" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Quick Settlement</h3>
                  <p className="text-black-300">Enjoy fast payment processing and settlement for all your trades.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-900 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-orange-300" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Dedicated Support</h3>
                  <p className="text-black-300">
                    Get access to our dedicated partner support team for any assistance you need.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Apply to Become a Trading Partner</CardTitle>
                <CardDescription className="text-gray-400">
                  Fill out the form below to start the application process
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="business-name" className="text-gray-300">
                        Business Name
                      </Label>
                      <Input
                        id="business-name"
                        placeholder="Your business name"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="business-type" className="text-gray-300">
                        Business Type
                      </Label>
                      <Input
                        id="business-type"
                        placeholder="e.g., Dealership, Garage"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="business-address" className="text-gray-300">
                      Business Address
                    </Label>
                    <Textarea
                      id="business-address"
                      placeholder="Your business address"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contact-name" className="text-gray-300">
                        Contact Person
                      </Label>
                      <Input
                        id="contact-name"
                        placeholder="Full name"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-position" className="text-gray-300">
                        Position
                      </Label>
                      <Input
                        id="contact-position"
                        placeholder="Your position"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contact-email" className="text-gray-300">
                        Email
                      </Label>
                      <Input
                        id="contact-email"
                        type="email"
                        placeholder="Your email"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-phone" className="text-gray-300">
                        Phone
                      </Label>
                      <Input
                        id="contact-phone"
                        placeholder="Your phone number"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="business-experience" className="text-gray-300">
                      Years of Experience
                    </Label>
                    <Input
                      id="business-experience"
                      type="number"
                      placeholder="Years in business"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="business-description" className="text-gray-300">
                      Tell us about your business
                    </Label>
                    <Textarea
                      id="business-description"
                      placeholder="Brief description of your business and trading experience"
                      className="bg-gray-800 border-gray-700 text-white"
                      rows={4}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    Submit Application
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Our Trading Partner Network</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Vehicle Dealerships</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-300">New and used car dealerships</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-300">Motorcycle showrooms</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-300">Commercial vehicle dealers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-300">Luxury vehicle specialists</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Service Providers</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-300">Authorized service centers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-300">Independent garages</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-300">Spare parts suppliers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-300">Vehicle customization shops</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Financial Partners</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-300">Banks and NBFCs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-300">Insurance providers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-300">Leasing companies</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-300">Vehicle financing specialists</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-white">Ready to Join Our Network?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto text-white">
            Become a Vehiverze trading partner today and unlock new opportunities for your business.
          </p>
          <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
            Apply Now
          </Button>
        </div>
      </div>
      <Footer />
    </main>
  )
}



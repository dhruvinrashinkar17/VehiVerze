import { CheckCircle, Clock, Shield, Truck } from "lucide-react"

const features = [
  {
    icon: Clock,
    title: "Quick Process",
    description: "Complete transactions within hours, not days",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Verified sellers and buyers with secure transactions",
  },
  {
    icon: CheckCircle,
    title: "Best Value",
    description: "Competitive pricing and best market rates",
  },
  {
    icon: Truck,
    title: "All Vehicle Types",
    description: "From two-wheelers to heavy commercial vehicles",
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-black">Why Choose Vehiverze</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                <feature.icon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-black">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}



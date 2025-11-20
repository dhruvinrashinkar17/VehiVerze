import { ContactForm } from "@/components/contact-form"
import { ContactInfo } from "@/components/contact-info"
import { Mail, MapPin, Phone } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="contact-hero py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">Get in Touch</h1>
          <p className="text-lg md:text-xl text-muted-foreground text-balance">
            Have a question or want to work together? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="order-2 md:order-1">
              <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
              <ContactForm />
            </div>

            {/* Contact Information */}
            <div className="order-1 md:order-2">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-6">
                <ContactInfo
                  icon={<Mail className="h-5 w-5" />}
                  title="Email"
                  description="Our team will respond within 24 hours"
                  contact="hello@example.com"
                />
                <ContactInfo
                  icon={<Phone className="h-5 w-5" />}
                  title="Phone"
                  description="Mon-Fri from 9am to 6pm"
                  contact="+1 (555) 123-4567"
                />
                <ContactInfo
                  icon={<MapPin className="h-5 w-5" />}
                  title="Office"
                  description="Visit us at our headquarters"
                  contact="123 Business St, Suite 100, San Francisco, CA 94105"
                />
              </div>

              {/* Additional Info Card */}
              <div className="mt-8 p-6 rounded-lg bg-primary/5 border border-primary/10">
                <h3 className="font-semibold mb-2">Looking for support?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Check out our help center for quick answers to common questions.
                </p>
                <a href="#" className="text-sm font-medium text-primary hover:underline">
                  Visit Help Center →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}



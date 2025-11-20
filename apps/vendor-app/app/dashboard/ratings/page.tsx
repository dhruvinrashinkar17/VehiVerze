import Image from "next/image"
import { Card } from "@vehiverze/ui/card"

export default function RatingsPage() {
  return (
    <div className="max-w-md mx-auto p-4">
      <Card className="p-6 space-y-8">
        <h1 className="text-3xl font-bold text-center">Enjoy Using Our Vehiverze App</h1>
        <h2 className="text-2xl font-semibold text-center">Rate Us Now !</h2>

        <div className="space-y-6">
          <a
            href="#"
            className="block text-center p-4 rounded-lg hover:bg-gray-50"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/google.svg" alt="Google" width={48} height={48} className="mx-auto mb-2" />
            <span className="text-xl font-semibold">Rate Us on Google!</span>
          </a>

          <a
            href="#"
            className="block text-center p-4 rounded-lg hover:bg-gray-50"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/play-store.svg" alt="Play Store" width={48} height={48} className="mx-auto mb-2" />
            <span className="text-xl font-semibold">Rate Us on Play Store!</span>
          </a>

          <a
            href="#"
            className="block text-center p-4 rounded-lg hover:bg-gray-50"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/app-store.svg" alt="App Store" width={48} height={48} className="mx-auto mb-2" />
            <span className="text-xl font-semibold">Rate Us on App Store!</span>
          </a>

          <div className="text-center p-4">
            <Image src="/trustpilot.svg" alt="Trustpilot" width={120} height={30} className="mx-auto" />
          </div>
        </div>
      </Card>
    </div>
  )
}



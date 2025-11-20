import Image from "next/image"

export function ScrapSection() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold text-[#4ADE80]">Drive the change</h2>
          <h1 className="text-6xl font-bold text-gray-900">Scrap, save & sustain</h1>

          <div className="relative h-[400px] mt-8">
            <Image
              src="/images/design-mode/image.png"
              alt="Eco-friendly car illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}



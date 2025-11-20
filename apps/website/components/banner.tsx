import Image from "next/image"
import Link from "next/link"

interface BannerProps {
  image: string
  title: string
  description?: string
  link?: string
  className?: string
}

export function Banner({ image, title, description, link, className = "" }: BannerProps) {
  // Helper function to handle sell links
  const getFormattedLink = (link: string) => {
    if (link === "/sell") {
      // Default to 4-wheeler for generic sell links
      return "/sell/4-wheeler"
    }
    return link
  }

  const Content = () => (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      <Image
        src={image || "/placeholder.svg"}
        alt={title}
        width={1200}
        height={400}
        className="w-full h-[400px] object-cover"
      />
      <div className="absolute inset-0 bg-black/50 flex flex-col justify-center px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
        {description && <p className="text-lg text-white/90">{description}</p>}
      </div>
    </div>
  )

  if (link) {
    return (
      <Link href={getFormattedLink(link)}>
        <Content />
      </Link>
    )
  }

  return <Content />
}



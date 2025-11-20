import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface BreadcrumbItem {
  name: string
  url: string
}

interface GarageServicesBreadcrumbProps {
  items: BreadcrumbItem[]
}

export function GarageServicesBreadcrumb({ items }: GarageServicesBreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600">
      <Link href="/" className="hover:text-blue-600 transition-colors">
        Home
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <ChevronRight className="h-4 w-4 text-gray-400" />
          {index === items.length - 1 ? (
            <span className="text-gray-900 font-medium">{item.name}</span>
          ) : (
            <Link href={item.url} className="hover:text-blue-600 transition-colors">
              {item.name}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}



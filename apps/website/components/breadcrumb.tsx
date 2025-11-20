"use client"

import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  title?: string
}

export function Breadcrumb({ items, title }: BreadcrumbProps) {
  return (
    <div className="mb-8">
      {title && <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>}
      <nav className="flex items-center text-gray-500">
        <Link href="/" className="flex items-center hover:text-gray-900 dark:hover:text-gray-100">
          <Home className="h-4 w-4 mr-1" />
          <span>Home</span>
        </Link>

        {items.map((item, index) => (
          <div key={index} className="flex items-center">
            <ChevronRight className="h-4 w-4 mx-2" />
            {item.href ? (
              <Link href={item.href} className="hover:text-gray-900 dark:hover:text-gray-100">
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-900 dark:text-gray-100">{item.label}</span>
            )}
          </div>
        ))}
      </nav>
    </div>
  )
}



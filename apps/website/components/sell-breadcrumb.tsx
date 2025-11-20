import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface SellBreadcrumbProps {
  steps: {
    label: string
    href?: string
    active?: boolean
  }[]
}

export function SellBreadcrumb({ steps }: SellBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center text-sm text-gray-400">
        {steps.map((step, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <ChevronRight className="mx-2 h-4 w-4" />}
            {step.href && !step.active ? (
              <Link href={step.href} className="hover:text-blue-500 transition-colors">
                {step.label}
              </Link>
            ) : (
              <span className={step.active ? "font-medium text-blue-500" : ""}>{step.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}



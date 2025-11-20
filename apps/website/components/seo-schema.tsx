import Script from "next/script"

interface SeoSchemaProps {
  data: Record<string, any>
}

export function SeoSchema({ data }: SeoSchemaProps) {
  return (
    <Script
      id="schema-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      strategy="afterInteractive"
    />
  )
}



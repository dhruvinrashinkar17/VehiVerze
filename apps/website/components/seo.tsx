import Head from "next/head"
import { getCanonicalUrl, siteConfig } from "@/lib/seo-config"

interface SEOProps {
  title: string
  description?: string
  canonical?: string
  ogType?: string
  ogImage?: string
  structuredData?: Record<string, any>[]
}

export function SEO({
  title,
  description = siteConfig.description,
  canonical,
  ogType = "website",
  ogImage = siteConfig.ogImage,
  structuredData = [],
}: SEOProps) {
  const fullTitle = `${title} | ${siteConfig.name}`
  const canonicalUrl = canonical ? getCanonicalUrl(canonical) : undefined

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl || siteConfig.url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteConfig.url}${ogImage}`} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl || siteConfig.url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteConfig.url}${ogImage}`} />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Structured Data */}
      {structuredData.map((data, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
      ))}
    </Head>
  )
}



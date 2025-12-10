import { getCanonicalUrl, siteConfig } from "@/lib/seo-config";

interface SEOProps {
  title: string;
  description?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  structuredData?: Record<string, any>[];
}

/**
 * SEO component for App Router.
 * Note: In App Router, metadata is handled via the `metadata` export in page files.
 * This component is kept for structured data injection only.
 * For client components, structured data should be handled differently.
 */
export function SEO({
  title,
  description = siteConfig.description,
  canonical,
  ogType = "website",
  ogImage = siteConfig.ogImage,
  structuredData = [],
}: SEOProps) {
  // In App Router, metadata is handled by the page's metadata export
  // This component only handles structured data for client components
  if (structuredData.length === 0) {
    return null;
  }

  return (
    <>
      {structuredData.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </>
  );
}

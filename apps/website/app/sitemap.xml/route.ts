import { NextResponse } from "next/server"
import { siteConfig } from "@/lib/seo-config"

export async function GET() {
  // Define all the URLs for the sitemap
  const urls = [
    "",
    "/about",
    "/buy",
    "/sell",
    "/sell/2-wheeler",
    "/sell/3-wheeler",
    "/sell/4-wheeler",
    "/sell/6-wheeler",
    "/sell/8-wheeler",
    "/scrap",
    "/services",
    "/garage-services",
    "/insurance-services",
    "/emi-calculator",
    "/trade",
    "/partner",
    "/faq",
    "/privacy",
    "/terms",
    "/careers",
  ]

  // Generate the XML content
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      (url) => `
  <url>
    <loc>${siteConfig.url}${url}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url === "" ? "1.0" : "0.8"}</priority>
  </url>
  `,
    )
    .join("")}
</urlset>`

  // Return the XML with the correct content type
  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  })
}



import { NextResponse } from "next/server"
import { siteConfig } from "@/lib/seo-config"

export async function GET() {
  const robotsTxt = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

Sitemap: ${siteConfig.url}/sitemap.xml`

  return new NextResponse(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
    },
  })
}



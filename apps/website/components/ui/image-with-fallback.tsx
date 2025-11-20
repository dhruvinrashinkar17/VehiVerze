"use client"

import Image from "next/image"
import { useState } from "react"

interface ImageWithFallbackProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  fallback?: string
}

export function ImageWithFallback({
  src,
  alt,
  width = 400,
  height = 300,
  className = "",
  fallback = "/placeholder.svg",
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false)

  return (
    <Image
      src={error ? fallback : src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading="lazy"
      onError={() => setError(true)}
    />
  )
}



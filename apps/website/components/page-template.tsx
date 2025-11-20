"use client"

import type React from "react"

interface PageTemplateProps {
  title: string
  children: React.ReactNode
}

export function PageTemplate({ title, children }: PageTemplateProps) {
  return (
    <div className="page-container">
      <h1 className="page-title">{title}</h1>
      <div className="page-content">{children}</div>

      <style jsx>{`
        .page-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }
        
        .page-title {
          font-size: 2.25rem;
          font-weight: 700;
          margin-bottom: 2rem;
          text-align: center;
        }
        
        .page-content {
          background-color: white;
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          padding: 2rem;
        }
      `}</style>
    </div>
  )
}



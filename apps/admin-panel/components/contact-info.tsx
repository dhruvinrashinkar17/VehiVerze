import type React from "react"
import { Card } from "@vehiverze/ui/card"

interface ContactInfoProps {
  icon: React.ReactNode
  title: string
  description: string
  contact: string
}

export function ContactInfo({ icon, title, description, contact }: ContactInfoProps) {
  return (
    <Card className="p-6 contact-info-card">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-primary/10 text-primary">{icon}</div>
        <div className="flex-1">
          <h3 className="font-semibold mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground mb-2">{description}</p>
          <p className="text-sm font-medium">{contact}</p>
        </div>
      </div>
    </Card>
  )
}



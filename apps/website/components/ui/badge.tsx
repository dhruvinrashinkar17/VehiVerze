import type * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@vehiverze/shared-utils/cn"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-black bg-primary text-primary-foreground hover:bg-primary/80", // added black border
        secondary: "border-black bg-secondary text-secondary-foreground hover:bg-secondary/80", // black border
        destructive: "border-black bg-destructive text-destructive-foreground hover:bg-destructive/80", // black border
        outline: "border border-black text-black hover:bg-gray-100", // now clearly visible
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }



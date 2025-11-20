import * as React from "react"

import { cn } from "@vehiverze/shared-utils/cn"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  prefix?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, prefix, ...props }, ref) => {
  if (prefix) {
    return (
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">{prefix}</span>
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            prefix && "pl-[calc(0.75rem+1ch*" + prefix.length + ")]",
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }

  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-card",
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input }



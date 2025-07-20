import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-smooth focus-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-blue-primary text-white hover:bg-blue-hover hover-lift shadow-soft",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 hover-lift shadow-soft",
        outline:
          "border border-slate-200 dark:border-slate-700 bg-transparent text-slate-900 dark:text-slate-50 hover:bg-slate-100 dark:hover:bg-slate-800 hover-lift",
        secondary:
          "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-50 hover:bg-slate-200 dark:hover:bg-slate-700 hover-lift",
        ghost: "text-slate-900 dark:text-slate-50 hover:bg-slate-100 dark:hover:bg-slate-800 hover-lift",
        link: "text-blue-primary underline-offset-4 hover:underline hover:text-blue-hover",
        gradient: "bg-gradient-primary text-white hover-lift shadow-blue",
        success: "bg-green-500 text-white hover:bg-green-600 hover-lift shadow-green",
        warning: "bg-orange-500 text-white hover:bg-orange-600 hover-lift shadow-orange",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-lg px-6 text-base",
        icon: "h-10 w-10",
        xs: "h-6 rounded px-2 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

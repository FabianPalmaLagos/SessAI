"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  checkedIcon?: React.ReactNode
  uncheckedIcon?: React.ReactNode
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, checkedIcon, uncheckedIcon, checked, defaultChecked, ...props }, ref) => {
  const [isChecked, setIsChecked] = React.useState(defaultChecked || false)
  const currentChecked = checked !== undefined ? checked : isChecked

  return (
    <SwitchPrimitives.Root
      className={cn(
        "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-800 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-teal-500 data-[state=unchecked]:bg-slate-200 dark:data-[state=unchecked]:bg-slate-700",
        className
      )}
      checked={checked}
      defaultChecked={defaultChecked}
      onCheckedChange={(checkedValue) => {
        setIsChecked(checkedValue)
        if (props.onCheckedChange) {
          props.onCheckedChange(checkedValue)
        }
      }}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none relative block h-5 w-5 rounded-full bg-white dark:bg-slate-200 shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
        )}
      >
        {checkedIcon && (
          <div 
            className={cn(
              "absolute inset-0 flex items-center justify-center transition-opacity",
              currentChecked ? "opacity-100" : "opacity-0"
            )}
          >
            {checkedIcon}
          </div>
        )}
        {uncheckedIcon && (
          <div 
            className={cn(
              "absolute inset-0 flex items-center justify-center transition-opacity",
              currentChecked ? "opacity-0" : "opacity-100"
            )}
          >
            {uncheckedIcon}
          </div>
        )}
      </SwitchPrimitives.Thumb>
    </SwitchPrimitives.Root>
  )
})
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }

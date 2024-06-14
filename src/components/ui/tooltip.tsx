"use client"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "~/lib/utils"

// Wrap your page with this provider, to use the tooltip
const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}
const TooltipContent = ({children, ...props}: TooltipProps) => {
  return (
    <TooltipPrimitive.Content {...props} className={cn("rounded-sm bg-[#121212c0] text-white p-2 border-b-2 box-border border-b-[#121212]", props.className)}>
      {children}
    </TooltipPrimitive.Content>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }

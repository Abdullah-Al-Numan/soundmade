"use client"

import React, { useState, useRef, ReactNode } from "react"
import { cn } from "@/lib/utils"

interface PopoverProps {
  children: ReactNode
  className?: string
}

export const Popover = ({ children, className }: PopoverProps) => {
  return <div className={cn("relative", className)}>{children}</div>
}

interface PopoverTriggerProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export const PopoverTrigger = ({ children, className, onClick }: PopoverTriggerProps) => {
  return (
    <button
      className={cn("focus:outline-none", className)}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

interface PopoverContentProps {
  children: ReactNode
  className?: string
}

export const PopoverContent = ({ children, className }: PopoverContentProps) => {
  const [open, setOpen] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)

  return (
    <div className="relative">
      <PopoverTrigger onClick={() => setOpen(!open)}>
        Open Popover
      </PopoverTrigger>
      {open && (
        <div
          ref={popoverRef}
          className={cn(
            "absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 mt-2 rounded-md border bg-white p-4 shadow-md",
            className
          )}
        >
          {children}
        </div>
      )}
    </div>
  )
}

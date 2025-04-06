"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const Drawer = ({
  isOpen,
  onClose,
  children,
  className,
  ...props
}: {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-end sm:items-center justify-center",
        isOpen ? "visible" : "invisible",
        className
      )}
      aria-hidden={!isOpen}
      {...props}
    >
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/80"
        onClick={onClose}
      />

      {/* Drawer Content */}
      <div
        className={cn(
          "relative w-full sm:w-auto bg-background rounded-t-lg sm:rounded-lg shadow-lg",
          "transition-transform transform",
          isOpen ? "translate-y-0 sm:translate-y-0" : "translate-y-full sm:translate-y-0"
        )}
      >
        {children}
      </div>
    </div>
  )
}

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("p-4 text-center sm:text-left font-semibold", className)}
    {...props}
  />
)

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("p-4 border-t border-gray-200", className)}
    {...props}
  />
)

const DrawerClose = ({
  onClick,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    onClick={onClick}
    className={cn("absolute top-4 right-4 text-gray-500 hover:text-gray-700", className)}
    {...props}
  >
    ✕
  </button>
)

export { Drawer, DrawerHeader, DrawerFooter, DrawerClose }

"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, type ReactNode } from "react"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  distance?: number
  duration?: number
  once?: boolean
  threshold?: number
}

export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 30,
  duration = 0.7,
  once = true,
  threshold = 0.3,
}: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: threshold })

  // Set initial animation properties based on direction
  let initial = { opacity: 0 }

  if (direction === "up") initial = { ...initial, y: distance }
  if (direction === "down") initial = { ...initial, y: -distance }
  if (direction === "left") initial = { ...initial, x: distance }
  if (direction === "right") initial = { ...initial, x: -distance }

  // Set animate properties
  let animate = { opacity: 1 }

  if (direction === "up" || direction === "down") animate = { ...animate, y: 0 }
  if (direction === "left" || direction === "right") animate = { ...animate, x: 0 }

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? animate : initial}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

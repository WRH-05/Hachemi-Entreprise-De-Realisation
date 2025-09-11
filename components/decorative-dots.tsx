"use client"

import { motion } from "framer-motion"

interface DecorativeDotsProps {
  className?: string
  color?: string
  size?: number
  gap?: number
  rows?: number
  cols?: number
}

export function DecorativeDots({
  className = "",
  color = "currentColor",
  size = 4,
  gap = 8,
  rows = 5,
  cols = 5,
}: DecorativeDotsProps) {
  // Create array of dots
  const dots = Array.from({ length: rows * cols }, (_, i) => {
    const row = Math.floor(i / cols)
    const col = i % cols

    return {
      id: i,
      x: col * (size + gap),
      y: row * (size + gap),
      delay: (row + col) * 0.05,
    }
  })

  return (
    <div className={`relative ${className}`}>
      <svg
        width={(size + gap) * cols - gap}
        height={(size + gap) * rows - gap}
        viewBox={`0 0 ${(size + gap) * cols - gap} ${(size + gap) * rows - gap}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {dots.map((dot) => (
          <motion.circle
            key={dot.id}
            cx={dot.x}
            cy={dot.y}
            r={size / 2}
            fill={color}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.5, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: dot.delay,
              ease: "easeOut",
            }}
          />
        ))}
      </svg>
    </div>
  )
}

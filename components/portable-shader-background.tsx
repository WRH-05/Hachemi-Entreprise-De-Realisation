"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { MeshGradient } from "@paper-design/shaders-react"

interface PortableShaderBackgroundProps {
  children: React.ReactNode
  className?: string
  colors?: string[]
  speed?: number
}

export default function PortableShaderBackground({
  children,
  className = "",
  colors = ["#000000", "#8b5cf6", "#ffffff", "#1e1b4b", "#4c1d95"],
  speed = 0.3,
}: PortableShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const handleMouseEnter = () => setIsActive(true)
    const handleMouseLeave = () => setIsActive(false)

    const container = containerRef.current
    if (container) {
      container.addEventListener("mouseenter", handleMouseEnter)
      container.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter)
        container.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* SVG Filters for glass and gooey effects */}
      <svg className="absolute inset-0 w-0 h-0 pointer-events-none">
        <defs>
          <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.02
                      0 1 0 0 0.02
                      0 0 1 0 0.05
                      0 0 0 0.9 0"
              result="tint"
            />
          </filter>
          <filter id="gooey-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Shader background layers - behind everything */}
      <div className="absolute inset-0 w-full h-full z-0">
        {/* Fallback solid background */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple-900/20 to-blue-900/20" />
        
        {/* Primary animated background layer */}
        <MeshGradient
          className="absolute inset-0 w-full h-full"
          colors={colors}
          speed={speed}
        />

        {/* Secondary overlay layer with reduced opacity */}
        <MeshGradient
          className="absolute inset-0 w-full h-full opacity-30"
          colors={[colors[1], colors[3], colors[2], colors[0]]}
          speed={speed * 0.5}
        />
      </div>

      {/* Content layer - in front of shaders */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

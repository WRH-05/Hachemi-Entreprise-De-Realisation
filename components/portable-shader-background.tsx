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
  const [showShaders, setShowShaders] = useState(false)

  useEffect(() => {
    // Add a small delay to show shaders after component mounts
    const timer = setTimeout(() => setShowShaders(true), 100)
    
    const handleMouseEnter = () => setIsActive(true)
    const handleMouseLeave = () => setIsActive(false)

    const container = containerRef.current
    if (container) {
      container.addEventListener("mouseenter", handleMouseEnter)
      container.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      clearTimeout(timer)
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter)
        container.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* Shader background layers - behind everything */}
      <div className="absolute inset-0 w-full h-full z-0">
        {/* Always visible fallback background - make it more obvious */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple-600/30 via-blue-600/30 to-indigo-600/30" />
        
        {/* Test div to make sure the background layer is working */}
        <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 text-xs rounded z-20">
          Shader Background Active
        </div>
        
        {/* Only show shaders if they're supported and loaded */}
        {showShaders && (
          <>
            <MeshGradient
              className="absolute inset-0 w-full h-full"
              colors={colors}
              speed={speed}
            />

            <MeshGradient
              className="absolute inset-0 w-full h-full opacity-30"
              colors={[colors[1], colors[3], colors[2], colors[0]]}
              speed={speed * 0.5}
            />
          </>
        )}
      </div>

      {/* Content layer - in front of shaders */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

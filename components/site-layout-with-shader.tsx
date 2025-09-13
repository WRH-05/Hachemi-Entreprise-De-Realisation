"use client"

import type React from "react"
import PortableShaderBackground from "./portable-shader-background"

interface SiteLayoutWithShaderProps {
  children: React.ReactNode
  colors?: string[]
  speed?: number
}

export default function SiteLayoutWithShader({ children, colors, speed }: SiteLayoutWithShaderProps) {
  return (
    <PortableShaderBackground className="min-h-screen" colors={colors} speed={speed}>
      {children}
    </PortableShaderBackground>
  )
}

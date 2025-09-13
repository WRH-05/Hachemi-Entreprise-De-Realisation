"use client"

import { PulsingBorder } from "@paper-design/shaders-react"
import { motion } from "framer-motion"

interface PortablePulsingCircleProps {
  text?: string
  colors?: string[]
  size?: number
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left" | "center"
  className?: string
}

export default function PortablePulsingCircle({
  text = "Your Brand • Your Message • Your Brand • Your Message •",
  colors = ["#BEECFF", "#E77EDC", "#FF4C3E", "#00FF88", "#FFD700", "#FF6B35", "#8A2BE2"],
  size = 80,
  position = "bottom-right",
  className = "",
}: PortablePulsingCircleProps) {
  const positionClasses = {
    "bottom-right": "bottom-8 right-8",
    "bottom-left": "bottom-8 left-8",
    "top-right": "top-8 right-8",
    "top-left": "top-8 left-8",
    center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  }

  return (
    <div className={`absolute ${positionClasses[position]} z-30 ${className}`}>
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        {/* Pulsing Border Circle */}
        <PulsingBorder
          colors={colors}
          colorBack="#00000000"
          speed={1.5}
          roundness={1}
          thickness={0.1}
          softness={0.2}
          intensity={5}
          spotsPerColor={5}
          spotSize={0.1}
          pulse={0.1}
          smoke={0.5}
          smokeSize={4}
          scale={0.65}
          rotation={0}
          frame={9161408.251009725}
          style={{
            width: `${size * 0.75}px`,
            height: `${size * 0.75}px`,
            borderRadius: "50%",
          }}
        />

        {/* Rotating Text Around the Circle */}
        <motion.svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          style={{ transform: "scale(1.6)" }}
        >
          <defs>
            <path id="circle-path" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
          </defs>
          <text className="text-sm fill-white/80" style={{ fontFamily: "system-ui, sans-serif" }}>
            <textPath href="#circle-path" startOffset="0%">
              {text}
            </textPath>
          </text>
        </motion.svg>
      </div>
    </div>
  )
}

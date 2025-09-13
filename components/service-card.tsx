"use client"

import { Building, PenToolIcon as Tool, Hammer, Construction } from "lucide-react"
import { motion } from "framer-motion"

const icons = {
  building: Building,
  tool: Tool,
  hammer: Hammer,
  construction: Construction,
}

interface ServiceCardProps {
  title: string
  description: string
  icon: keyof typeof icons
}

export function ServiceCard({ title, description, icon }: ServiceCardProps) {
  const Icon = icons[icon]

  return (
    <motion.div whileHover={{ y: -10 }} className="p-6 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg transition-shadow hover:shadow-xl">
      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  )
}

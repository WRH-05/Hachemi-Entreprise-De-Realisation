"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"

export function Timeline() {
  const { translations: t } = useLanguage()

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background geometric elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary transform rotate-45" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-primary transform -rotate-12" />
        <div className="absolute bottom-32 left-1/4 w-16 h-16 bg-primary transform rotate-45" />
        <div className="absolute bottom-20 right-1/3 w-20 h-20 bg-primary transform -rotate-30" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"
          >
            {t.timeline.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto"
          >
            {t.timeline.subtitle}
          </motion.p>
        </div>

        {/* Non-linear timeline layout */}
        <div className="relative max-w-7xl mx-auto">
          {/* Desktop zigzag connection lines */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 1000 800" fill="none">
              <path
                d="M 150 100 Q 300 50 450 150 T 750 100 Q 850 150 900 200"
                stroke="url(#gradient)"
                strokeWidth="3"
                fill="none"
                strokeDasharray="10,10"
                className="opacity-30"
              />
              <path
                d="M 900 200 Q 800 300 650 350 T 350 400 Q 200 450 150 500"
                stroke="url(#gradient)"
                strokeWidth="3"
                fill="none"
                strokeDasharray="10,10"
                className="opacity-30"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#153276', stopOpacity: 0.8 }} />
                  <stop offset="100%" style={{ stopColor: '#2563eb', stopOpacity: 0.4 }} />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Timeline events in a non-linear grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {t.timeline.events.map((event, index) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100
                }}
                className={`relative group ${
                  // Staggered positioning for visual interest
                  index === 0 ? 'lg:mt-0' :
                  index === 1 ? 'lg:mt-12' :
                  index === 2 ? 'lg:mt-6' :
                  index === 3 ? 'lg:mt-16' :
                  'lg:mt-8'
                }`}
              >
                {/* Sharp, modern card design */}
                <div className="relative bg-white border-l-4 border-primary shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-2">
                  {/* Angular top corner accent */}
                  <div className="absolute top-0 right-0 w-0 h-0 border-l-[50px] border-l-transparent border-t-[50px] border-t-primary opacity-10" />
                  
                  {/* Year badge - sharp design */}
                  <div className="absolute -left-2 top-6 bg-primary text-white px-4 py-2 font-bold text-lg clip-path-hexagon shadow-lg">
                    {event.year}
                  </div>
                  
                  <div className="p-6 md:p-8 pt-12 md:pt-16">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                      {event.description}
                    </p>
                    
                    {/* Progress indicator */}
                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <div 
                            key={i}
                            className={`w-2 h-2 transform rotate-45 ${
                              i <= index ? 'bg-primary' : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-gray-400 font-medium">
                        {String(index + 1).padStart(2, '0')} / 05
                      </div>
                    </div>
                  </div>
                  
                  {/* Sharp bottom accent */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-blue-600" />
                </div>

                {/* Floating geometric accent */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary transform rotate-45 opacity-20 group-hover:opacity-40 group-hover:scale-125 transition-all duration-300" />
              </motion.div>
            ))}
          </div>

          {/* Sharp decorative elements */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-2">
              <div className="w-4 h-4 bg-primary transform rotate-45" />
              <div className="w-4 h-4 bg-blue-500 transform rotate-45" />
              <div className="w-4 h-4 bg-primary transform rotate-45" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .clip-path-hexagon {
          clip-path: polygon(0% 25%, 0% 75%, 50% 100%, 100% 75%, 100% 25%, 50% 0%);
        }
      `}</style>
    </section>
  )
}

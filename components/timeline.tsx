"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"

export function Timeline() {
  const { translations: t } = useLanguage()

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Swiss-style header with minimal typography */}
        <div className="mb-20 md:mb-24">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="grid grid-cols-12 gap-6"
          >
            <div className="col-span-12 md:col-span-8 md:col-start-3">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-gray-900 mb-6 leading-none">
                {t.timeline.title}
              </h2>
              <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed">
                {t.timeline.subtitle}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Swiss grid-based timeline */}
        <div className="relative">
          {/* Minimal connecting line */}
          <div className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-gray-200" />
          
          {/* Timeline events in clean grid */}
          <div className="space-y-16 md:space-y-20">
            {t.timeline.events.map((event, index) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                className="relative"
              >
                <div className="grid grid-cols-12 gap-6 items-start">
                  {/* Year column - Swiss typography */}
                  <div className="col-span-12 md:col-span-2">
                    <div className="relative">
                      {/* Minimal timeline dot */}
                      <div className="hidden md:block absolute -left-6 top-2 w-2 h-2 bg-gray-900 rounded-full" />
                      <span className="text-2xl md:text-3xl font-light text-gray-900 tabular-nums">
                        {event.year}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content column */}
                  <div className="col-span-12 md:col-span-8 md:col-start-4">
                    <div className="space-y-4">
                      <h3 className="text-xl md:text-2xl font-medium text-gray-900 leading-tight">
                        {event.title}
                      </h3>
                      <p className="text-base md:text-lg text-gray-600 font-light leading-relaxed max-w-2xl">
                        {event.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Minimal progress indicator */}
                  <div className="col-span-12 md:col-span-2 md:col-start-11 flex md:justify-end">
                    <div className="flex items-center space-x-1">
                      <span className="text-xs text-gray-400 font-mono tabular-nums">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="w-8 h-px bg-gray-200">
                        <div 
                          className="h-full bg-gray-900 transition-all duration-1000 ease-out"
                          style={{ 
                            width: `${((index + 1) / t.timeline.events.length) * 100}%` 
                          }}
                        />
                      </div>
                      <span className="text-xs text-gray-400 font-mono tabular-nums">
                        {String(t.timeline.events.length).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Swiss-style footer element */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 pt-12 border-t border-gray-200"
        >
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-6">
              <p className="text-sm text-gray-500 font-light">
                Established in Bab El Oued, Algiers
              </p>
            </div>
            <div className="col-span-12 md:col-span-6 md:text-right">
              <p className="text-sm text-gray-500 font-light">
                25+ Years of Excellence
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"

export function Timeline() {
  const { translations: t } = useLanguage()

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 text-white">{t.timeline.title}</h2>
          <p className="text-base md:text-lg text-gray-200">{t.timeline.subtitle}</p>
        </div>

        <div className="relative">
          {/* Timeline line - hidden on mobile, visible on md and up */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-primary/20" />

          {/* Timeline events */}
          <div className="space-y-10 md:space-y-20">
            {t.timeline.events.map((event, index) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`relative flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? "md:justify-start" : "md:justify-end"
                } md:justify-around`}
              >
                {/* Year bubble - centered on mobile, positioned on timeline for desktop */}
                <div className="mb-4 md:mb-0 md:absolute md:left-1/2 md:transform md:-translate-x-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full" />
                </div>

                {/* Year label for mobile */}
                <div className="text-xl font-bold text-primary mb-2 md:hidden">{event.year}</div>

                {/* Content */}
                <div
                  className={`w-full md:w-5/12 md:w-[calc(50%-4rem)] ${
                    index % 2 === 0 ? "md:text-right md:pr-8" : "md:text-left md:pl-8"
                  }`}
                >
                  <div className="bg-white/95 backdrop-blur-sm p-4 md:p-6 rounded-lg shadow-lg">
                    <span className="hidden md:block text-2xl font-bold text-primary">{event.year}</span>
                    <h3 className="text-lg md:text-xl font-semibold mt-0 md:mt-2">{event.title}</h3>
                    <p className="text-gray-600 mt-2">{event.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

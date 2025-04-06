"use client"

import { useLanguage } from "@/contexts/language-context"
import { Quote } from "lucide-react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Testimonials() {
  const { translations: t } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % t.testimonials.items.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [t.testimonials.items.length])

  return (
    <section className="py-12 md:py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">{t.testimonials.title}</h2>
          <p className="text-base md:text-lg text-gray-600">{t.testimonials.subtitle}</p>
        </div>

        <div className="relative h-[350px] md:h-[300px] max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 text-center h-full flex flex-col justify-center items-center">
                <Quote className="h-10 w-10 md:h-12 md:w-12 text-primary mb-4 md:mb-6" />
                <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-4 md:mb-6">
                  {t.testimonials.items[currentIndex].text}
                </p>
                <div>
                  <div className="font-semibold text-base md:text-lg">{t.testimonials.items[currentIndex].author}</div>
                  <div className="text-gray-500">{t.testimonials.items[currentIndex].position}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {t.testimonials.items.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index ? "bg-primary w-4" : "bg-primary/30"
                }`}
              >
                <span className="sr-only">Go to slide {index + 1}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


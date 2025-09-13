"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Building, Target, Users, Award, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { getRandomImage } from "@/utils/random-image"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
// Add imports for the new components
import { AnimatedSection } from "@/components/animated-section"
import { DecorativeDots } from "@/components/decorative-dots"
// Add import for ScrollToTop
import { ScrollToTop } from "@/components/scroll-to-top"

export default function AboutPage() {
  const { translations: t } = useLanguage()
  const [heroImage, setHeroImage] = useState({
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/istockphoto-1783208765-612x612.jpg-0eQ246c3K3RiDl0EumEUxhajKOOPh1.jpeg",
    alt: "White domed mosque overlooking the Mediterranean coastline with palm tree",
  })

  // Set a random hero image on component mount
  useEffect(() => {
    setHeroImage(getRandomImage())
  }, [])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  // Refs for scroll animations
  const foundedRef = useRef(null)
  const visionRef = useRef(null)
  const missionRef = useRef(null)
  const whyChooseUsRef = useRef(null)
  const ctaRef = useRef(null)

  const foundedInView = useInView(foundedRef, { once: true, amount: 0.3 })
  const visionInView = useInView(visionRef, { once: true, amount: 0.3 })
  const missionInView = useInView(missionRef, { once: true, amount: 0.3 })
  const whyChooseUsInView = useInView(whyChooseUsRef, { once: true, amount: 0.3 })
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.5 })

  // Company stats
  const stats = [
    { icon: Building, value: "25+", label: "Years Experience" },
    { icon: Target, value: "500+", label: "Projects Completed" },
    { icon: Users, value: "100+", label: "Team Members" },
    { icon: Award, value: "98%", label: "Client Satisfaction" },
  ]

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Hero Section with Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative rounded-2xl overflow-hidden mb-16"
        >
          <Image
            src={heroImage.url || "/placeholder.svg"}
            alt={heroImage.alt}
            width={1200}
            height={400}
            className="w-full h-[300px] md:h-[400px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 flex items-center">
            <div className="container mx-auto px-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-2xl"
              >
                {t.about.title}
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "100px" }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="h-1 bg-primary mt-4 mb-4"
              ></motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.8 }}
                className="text-white/90 text-lg max-w-xl"
              >
                Building excellence since 1995
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16 bg-white p-6 rounded-xl shadow-md"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div key={index} whileHover={{ y: -5 }} className="flex flex-col items-center text-center p-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Content Sections */}
        <div className="grid gap-16 max-w-4xl mx-auto">
          {/* Founded Section */}
          <motion.section
            ref={foundedRef}
            initial={{ opacity: 0, y: 30 }}
            animate={foundedInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="h-0.5 w-6 bg-primary"></div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary">{t.about.founded.title}</h2>
            </div>
            <p className="text-gray-600 leading-relaxed text-base md:text-lg">{t.about.founded.description}</p>
          </motion.section>

          {/* Vision & Mission */}
          <div className="grid md:grid-cols-2 gap-8 relative">
            <DecorativeDots
              className="absolute -top-10 -left-16 opacity-20 hidden md:block"
              color="#153276"
              rows={3}
              cols={3}
            />

            <AnimatedSection
              direction="left"
              delay={0.2}
              className="bg-white p-6 md:p-8 rounded-lg shadow-lg border-t-4 border-primary relative z-10"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-primary mb-4">{t.about.vision.title}</h2>
              <p className="text-gray-600 leading-relaxed">{t.about.vision.description}</p>
            </AnimatedSection>

            <AnimatedSection
              direction="right"
              delay={0.4}
              className="bg-white p-6 md:p-8 rounded-lg shadow-lg border-t-4 border-primary relative z-10"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Building className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-primary mb-4">{t.about.mission.title}</h2>
              <p className="text-gray-600 leading-relaxed">{t.about.mission.description}</p>
            </AnimatedSection>

            <DecorativeDots
              className="absolute -bottom-10 -right-16 opacity-20 hidden md:block"
              color="#153276"
              rows={3}
              cols={3}
            />
          </div>

          {/* Why Choose Us */}
          <motion.section
            ref={whyChooseUsRef}
            initial={{ opacity: 0, y: 30 }}
            animate={whyChooseUsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7 }}
            className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-lg p-6 md:p-8 shadow-xl"
          >
            <h2 className="text-xl md:text-2xl font-bold mb-6">{t.about.whyChooseUs.title}</h2>
            <motion.ul
              variants={containerVariants}
              initial="hidden"
              animate={whyChooseUsInView ? "visible" : "hidden"}
              className="grid gap-4"
            >
              {t.about.whyChooseUs.benefits.map((benefit, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  className="flex items-center gap-3 bg-white/10 p-3 rounded-lg backdrop-blur-sm"
                >
                  <CheckCircle2 className="h-5 w-5 md:h-6 md:w-6 flex-shrink-0" />
                  <span>{benefit}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.section>

          {/* Contact CTA */}
          <motion.section
            ref={ctaRef}
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7 }}
            className="text-center space-y-6 bg-white p-8 rounded-xl shadow-lg"
          >
            <h3 className="text-2xl font-bold text-primary">Ready to Start Your Project?</h3>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">{t.about.contact.description}</p>
            <p className="text-base md:text-lg font-medium">{t.about.contact.cta}</p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 px-8 group">
                <Link href="/contact" className="flex items-center gap-2">
                  Contact Us
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </motion.section>
        </div>
      </div>
      <ScrollToTop />
    </div>
  )
}

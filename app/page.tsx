"use client"

import { Button } from "@/components/ui/button"
import { ServiceCard } from "@/components/service-card"
import { Timeline } from "@/components/timeline"
import { Statistics } from "@/components/statistics"
import { Testimonials } from "@/components/testimonials"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"
import { useEffect, useState } from "react"
import { getRandomImage } from "@/utils/random-image"
import PortablePulsingCircle from "@/components/portable-pulsing-circle"

export default function Home() {
  const { translations: t } = useLanguage()
  const [backgroundImage, setBackgroundImage] = useState({
    url: "/landing/hani-ryad-imo78jwOpT8-unsplash.jpg",
    alt: "Beautiful sunset view of Algiers with traditional white buildings and mosque minaret",
  })
  const [nextImage, setNextImage] = useState<{ url: string; alt: string } | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Set a random background image on component mount with smooth transition
  useEffect(() => {
    const randomImg = getRandomImage()
    
    // Only transition if it's a different image
    if (randomImg.url !== backgroundImage.url) {
      // Preload the next image for smoother transition
      const img = document.createElement('img')
      img.onload = () => {
        setNextImage(randomImg)
        setIsTransitioning(true)
        
        // After transition completes, swap the images
        setTimeout(() => {
          setBackgroundImage(randomImg)
          setIsTransitioning(false)
          setNextImage(null)
        }, 1200) // Slightly longer for smoother effect
      }
      img.src = randomImg.url
    }
  }, [])

  return (
    <div className="relative">
      <section className="relative h-[90vh] md:h-screen flex items-center justify-center overflow-hidden">
        {/* Base background image */}
        <Image
          src={backgroundImage.url || "/placeholder.svg"}
          alt={backgroundImage.alt}
          fill
          className="object-cover transition-opacity duration-[1200ms] ease-in-out"
          priority
          quality={100}
        />
        
        {/* Transitioning image overlay */}
        {nextImage && (
          <Image
            src={nextImage.url}
            alt={nextImage.alt}
            fill
            className={`object-cover transition-opacity duration-[1200ms] ease-in-out ${
              isTransitioning ? 'opacity-100' : 'opacity-0'
            }`}
            quality={100}
          />
        )}
        
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative container mx-auto px-4 text-center text-white">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6">{t.hero.title}</h1>
          <p className="text-base md:text-lg lg:text-xl mb-6 md:mb-8 max-w-2xl mx-auto">{t.hero.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="bg-white/10 text-white border-white hover:bg-white/30 backdrop-blur-sm w-full sm:w-auto"
            >
              <Link href="/cost-calculator">Cost Calculator</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12">{t.services.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <ServiceCard
              title={t.services.construction}
              description={t.services.descriptions.construction}
              icon="building"
            />
            <ServiceCard title={t.services.renovation} description={t.services.descriptions.renovation} icon="tool" />
            <ServiceCard title={t.services.demolition} description={t.services.descriptions.demolition} icon="hammer" />
            <ServiceCard
              title={t.services.concreteWorks}
              description={t.services.descriptions.concreteWorks}
              icon="construction"
            />
          </div>
        </div>
      </section>

      <Timeline />
      <Statistics />
      <Testimonials />

      {/* Animated Pulsing Circle - Home page only */}
      <PortablePulsingCircle 
        position="bottom-right"
        size={100}
      />
    </div>
  )
}

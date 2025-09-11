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

export default function Home() {
  const { translations: t } = useLanguage()
  const [backgroundImage, setBackgroundImage] = useState({
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/istockphoto-1221185618-612x612.jpg-xr3qR0w0plqKGkNSHFYlUp0sW8Hkll.jpeg",
    alt: "Beautiful sunset view of Algiers with traditional white buildings and mosque minaret",
  })

  // Set a random background image on component mount
  useEffect(() => {
    setBackgroundImage(getRandomImage())
  }, [])

  return (
    <>
      <section className="relative h-[90vh] md:h-screen flex items-center justify-center overflow-hidden">
        <Image
          src={backgroundImage.url || "/placeholder.svg"}
          alt={backgroundImage.alt}
          fill
          className="object-cover"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative container mx-auto px-4 text-center text-white">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6">{t.hero.title}</h1>
          <p className="text-base md:text-lg lg:text-xl mb-6 md:mb-8 max-w-2xl mx-auto">{t.hero.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
              <Link href="/services">{t.hero.services}</Link>
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
    </>
  )
}

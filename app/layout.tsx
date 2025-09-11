import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingContact } from "@/components/floating-contact"
import { ImagePreloader } from "@/components/image-preloader"
import type React from "react"
import { LanguageProvider } from "@/contexts/language-context"
import { inter, omar } from "./fonts"

export const metadata = {
  title: "HER - Hachemi Entreprise de Réalisation",
  description: "Professional construction, renovation, and demolition services",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${omar.variable} font-sans`}>
        <LanguageProvider>
          <ImagePreloader />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <FloatingContact />
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}

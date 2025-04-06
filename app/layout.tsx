import "./globals.css"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { FloatingContact } from "@/components/layout/floating-contact"
import { ImagePreloader } from "@/components/shared/image-preloader"
import type React from "react"
import { LanguageProvider } from "@/lib/contexts/language-context"
import { Inter } from "next/font/google"
import localFont from "next/font/local"
import { ScrollToTop } from "@/components/layout/scroll-to-top"

// Define fonts directly in the layout file
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const omar = localFont({
  src: "../public/fonts/Omar-Bold.woff2",
  variable: "--font-omar",
  display: "swap",
})

export const metadata = {
  title: "HER - Hachemi Entreprise de Réalisation",
  description: "Professional construction, renovation, and demolition services",
    generator: 'v0.dev'
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
          <ScrollToTop />
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}



import './globals.css'
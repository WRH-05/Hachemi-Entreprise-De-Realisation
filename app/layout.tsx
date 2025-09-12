import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ImagePreloader } from "@/components/image-preloader"
import type React from "react"
import { LanguageProvider } from "@/contexts/language-context"
import { helvetica, omar } from "./fonts"

export const metadata = {
  title: "HER - Hachemi Entreprise de Réalisation",
  description: "Professional construction, renovation, and demolition services",
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/her-transparent.webp', sizes: '32x32', type: 'image/webp' },
      { url: '/her-transparent.webp', sizes: '16x16', type: 'image/webp' },
      { url: '/her-transparent.webp', sizes: '48x48', type: 'image/webp' },
      { url: '/her-transparent.webp', sizes: '64x64', type: 'image/webp' },
      { url: '/her-transparent.webp', sizes: '128x128', type: 'image/webp' },
    ],
    shortcut: '/her-transparent.webp',
    apple: [
      { url: '/her-transparent.webp', sizes: '180x180', type: 'image/webp' },
      { url: '/her-transparent.webp', sizes: '152x152', type: 'image/webp' },
      { url: '/her-transparent.webp', sizes: '120x120', type: 'image/webp' },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${helvetica.variable} ${omar.variable} font-sans`}>
        <LanguageProvider>
          <ImagePreloader />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}

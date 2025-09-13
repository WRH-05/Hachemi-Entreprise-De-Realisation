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
      { url: '/her-white.png', sizes: '32x32', type: 'image/png' },
      { url: '/her-white.png', sizes: '16x16', type: 'image/png' },
      { url: '/her-white.png', sizes: '48x48', type: 'image/png' },
      { url: '/her-white.png', sizes: '64x64', type: 'image/png' },
      { url: '/her-white.png', sizes: '128x128', type: 'image/png' },
    ],
    shortcut: '/her-white.png',
    apple: [
      { url: '/her-white.png', sizes: '180x180', type: 'image/png' },
      { url: '/her-white.png', sizes: '152x152', type: 'image/png' },
      { url: '/her-white.png', sizes: '120x120', type: 'image/png' },
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

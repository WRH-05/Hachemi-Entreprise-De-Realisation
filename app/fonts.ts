import localFont from "next/font/local"

// Use local Helvetica font for Latin text (French and English)
export const helvetica = localFont({
  src: [
    {
      path: "../public/fonts/Helvetica.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/helvetica-light.ttf", 
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-helvetica",
  display: "swap",
})

// Use local font for Arabic
export const omar = localFont({
  src: [
    {
      path: "../public/fonts/halveticArabic.woff2",
      weight: "700", 
      style: "normal",
    },
  ],
  variable: "--font-halvetic-arabic",
  display: "swap",
})

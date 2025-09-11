import { Inter } from "next/font/google"
import localFont from "next/font/local"

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

// Use local font for Omar Bold
export const omar = localFont({
  src: [
    {
      path: "../public/fonts/Omar-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-omar",
  display: "swap",
})

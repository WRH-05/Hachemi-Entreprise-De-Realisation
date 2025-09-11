"use client"

import { useEffect } from "react"
import { constructionImages } from "@/utils/random-image"

export function ImagePreloader() {
  useEffect(() => {
    // Preload all background images
    constructionImages.forEach((image) => {
      const img = new Image()
      img.src = image.url
    })
  }, [])

  return null // This component doesn't render anything
}

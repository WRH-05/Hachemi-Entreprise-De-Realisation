// Update the exports to maintain compatibility
export const algerianImages = [
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/istockphoto-1221185618-612x612.jpg-xr3qR0w0plqKGkNSHFYlUp0sW8Hkll.jpeg",
    alt: "Beautiful sunset view of Algiers with traditional white buildings and mosque minaret",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/istockphoto-1783208765-612x612.jpg-0eQ246c3K3RiDl0EumEUxhajKOOPh1.jpeg",
    alt: "White domed mosque overlooking the Mediterranean coastline with palm tree",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/istockphoto-1213689999-612x612.jpg-sFFD0IErukW0fpG3ugqiVSLSl6wqlq.jpeg",
    alt: "Sunset view of Algiers showing modern and traditional architecture with domed buildings",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/istockphoto-168618063-612x612.jpg-9f7rWL6AtvY2sWcDnAT0eZl8JMW9T0.jpeg",
    alt: "Coastal view of Algerian city with white buildings along hillside and beautiful blue bay",
  },
]

// Export as constructionImages for backward compatibility
export const constructionImages = algerianImages

export function getRandomImage() {
  const randomIndex = Math.floor(Math.random() * algerianImages.length)
  return algerianImages[randomIndex]
}

export function getAllImages() {
  return algerianImages
}

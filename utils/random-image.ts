// Update the exports to maintain compatibility
export const algerianImages = [
  {
    url: "/landing/hani-ryad-imo78jwOpT8-unsplash.jpg",
    alt: "Beautiful sunset view of Algiers with traditional white buildings and mosque minaret",
  },
  {
    url: "/landing/ondrej-bocek-RWkcaF9GUsw-unsplash.jpg",
    alt: "White domed mosque overlooking the Mediterranean coastline with palm tree",
  },
  {
    url: "/landing/sid-ahmed-saoud-RCsOlTBX5Tw-unsplash.jpg",
    alt: "Sunset view of Algiers showing modern and traditional architecture with domed buildings",
  },
  {
    url: "/landing/walid-amghar-8Bw3FnqPmp8-unsplash.jpg",
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

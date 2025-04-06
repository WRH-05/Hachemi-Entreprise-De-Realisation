// Array of construction images
export const constructionImages = [
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-tatiana-fet-420381-1105766.jpg-kmA5YWi0NLC8h4kwjEqbyHBwsDSWMy.jpeg",
    alt: "Aerial view of city skyline with skyscrapers",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-pixabay-532079.jpg-iK4tGgawbeP7sAhzJuH7p5tmxgdrIf.jpeg",
    alt: "Yellow construction crane hook against blue sky",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-khebab-salaheddine-453713386-19762840.jpg-M5iCs3l4c9PYNXtegxo5DCmuLzZG7P.jpeg",
    alt: "Modern minaret tower with glass top section",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-houssam-benamara-542776584-18233267.jpg-4beJxGsiuvh6NyQndOlLF3eTtPMpmx.jpeg",
    alt: "White mosque with minaret and Algerian flag",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-zachtheshoota-1838640.jpg-JS2VpJz5n9VuiZ843KvNIqfdzfhULG.jpeg",
    alt: "Modern white building with palm trees",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-sevenstormphotography-439416.jpg-XUauYW6XWJghfwuO2KCNnaX7tGM9Rg.jpeg",
    alt: "Construction site with multiple cranes working on high-rise building",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mosquee-hassan-pasha-oran-algerie-afrique-du-nord_261932-16769.jpg-vcvOBdrZSfGxcfqslzokiDhfN4vH8B.jpeg",
    alt: "Street view of the Hassan Pasha Mosque in Oran, Algeria",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-mohamed-guerss-324310444-13744467.jpg-SxpsqFkupMAClkdpBCdyD3LrZtOWeF.jpeg",
    alt: "High-angle view of Algiers, Algeria, featuring a mosque with a clock tower",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-nadas-18314361.jpg-qhYhTYFscj0RI0pjUd02SsmDGCy9be.jpeg",
    alt: "Scenic view of Constantine, Algeria, showcasing the city's unique landscape",
  },
]

// Function to get a random image from the array
export function getRandomImage() {
  const randomIndex = Math.floor(Math.random() * constructionImages.length)
  return constructionImages[randomIndex]
}


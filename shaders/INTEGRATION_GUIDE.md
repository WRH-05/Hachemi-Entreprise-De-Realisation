# Shader Components Integration Guide

## Prerequisites

Install the required dependencies:

\`\`\`bash
npm install @paper-design/shaders-react framer-motion
\`\`\`

## 1. Site-wide Animated Background

### Option A: Layout Wrapper (Recommended)
Wrap your entire app in the shader background:

\`\`\`tsx
// In your root layout or _app.tsx
import SiteLayoutWithShader from './components/site-layout-with-shader'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SiteLayoutWithShader>
          {children}
        </SiteLayoutWithShader>
      </body>
    </html>
  )
}
\`\`\`

### Option B: Individual Page Wrapper
Apply to specific pages:

\`\`\`tsx
// In any page component
import PortableShaderBackground from './components/portable-shader-background'

export default function HomePage() {
  return (
    <PortableShaderBackground className="min-h-screen">
      <YourPageContent />
    </PortableShaderBackground>
  )
}
\`\`\`

## 2. Animated Circle (Home Page Only)

Add to your home page component:

\`\`\`tsx
// In your home page component
import PortablePulsingCircle from './components/portable-pulsing-circle'

export default function HomePage() {
  return (
    <div className="relative">
      <YourHomePageContent />
      
      <PortablePulsingCircle 
        text="Welcome • Explore • Discover • Welcome •"
        position="bottom-right"
        size={100}
      />
    </div>
  )
}
\`\`\`

## Customization Options

### Background Colors
\`\`\`tsx
// Custom brand colors
const brandColors = ["#000000", "#your-primary", "#ffffff", "#your-secondary", "#your-accent"]

<PortableShaderBackground colors={brandColors} speed={0.4}>
  {children}
</PortableShaderBackground>
\`\`\`

### Circle Customization
\`\`\`tsx
<PortablePulsingCircle 
  text="Your Brand • Your Message •"
  colors={["#ff0000", "#00ff00", "#0000ff"]} // Custom colors
  size={120} // Larger circle
  position="bottom-left" // Different position
/>
\`\`\`

## Performance Notes

- The shader background uses WebGL and may impact performance on older devices
- Consider adding a reduced motion preference check
- Test on mobile devices and adjust parameters as needed
- The components are optimized with proper cleanup and event handling

## Browser Support

- Modern browsers with WebGL support
- Fallback: Components will render without shaders on unsupported browsers
- Consider adding a CSS fallback background for older browsers

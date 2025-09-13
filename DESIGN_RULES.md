# HER Construction - Design System & Rules

## Overview

This document outlines the design principles, guidelines, and current state of the HER Construction website. The site is transitioning from a rounded, soft design language to a **Swiss Design (International Typographic Style)** approach that emphasizes functionality, clarity, and minimal aesthetics.

---

## 🇨🇭 Swiss Design Principles (Primary Guidelines)

### 1. **Typography First**
- **Hierarchy**: Clear, functional text hierarchy using font weights and sizes
- **Typefaces**: System fonts preferred (`font-light`, `font-medium`, `font-semibold`)
- **Spacing**: Generous line-height and letter-spacing for readability
- **Alignment**: Left-aligned text, right-aligned secondary content
- **Numbers**: Use `tabular-nums` class for consistent number alignment

### 2. **Grid-Based Layout**
- **12-Column Grid**: All layouts use CSS Grid with 12 columns
- **Consistent Spacing**: Use grid gaps (6, 8, 12) for systematic spacing
- **Asymmetrical Balance**: Content doesn't need to be centered; asymmetry is encouraged
- **Responsive**: Maintain grid integrity across all breakpoints

### 3. **Minimal Color Palette**
- **Primary Colors**: 
  - Primary Blue: `#153276`
  - Black: `#000000`
  - White: `#FFFFFF`
- **Grayscale**: Various gray tones (`gray-50` to `gray-900`)
- **Usage**: Color used functionally, not decoratively
- **Contrast**: High contrast for accessibility

### 4. **Clean Visual Elements**
- **No Gradients**: Avoid complex gradients; use solid colors
- **Minimal Shadows**: Subtle shadows only where functionally necessary
- **Sharp Edges**: Move away from rounded corners to sharp, clean lines
- **Geometric Elements**: Simple lines, dots, and rectangles

### 5. **Functional Animation**
- **Subtle Movements**: Short durations (0.3s-0.8s)
- **Purpose-Driven**: Animations should guide user attention or provide feedback
- **Easing**: Use `ease-out` for natural, professional feel
- **Reduced Motion**: Respect user preferences for reduced motion

---

## 🎯 Current Website State

### **Completed Components (Swiss Design)**
- ✅ **Timeline Component**: Full Swiss redesign implemented
  - Clean typography hierarchy
  - 12-column grid layout
  - Minimal animations
  - Monochromatic color scheme

### **Partially Updated Components**
- 🔄 **Navbar**: Has backdrop blur and modern styling, needs typography review
- 🔄 **Language Switcher**: Updated with scroll-based color logic

### **Components Needing Swiss Design Update**
- ❌ **Hero Section**: Still uses gradients and complex animations
- ❌ **Service Cards**: Round corners and heavy shadows
- ❌ **Statistics Section**: Needs cleaner typography and layout
- ❌ **Testimonials**: Requires grid-based redesign
- ❌ **Footer**: Needs systematic spacing and typography
- ❌ **Contact Forms**: Requires clean, functional styling
- ❌ **Cost Calculator**: Complex UI needs simplification

---

## 📐 Layout Guidelines

### **Spacing System**
```css
/* Use consistent spacing values */
Gap: 4, 6, 8, 12, 16, 20, 24
Padding: py-6, py-12, py-16, py-20, py-24, py-32
Margin: mb-4, mb-6, mb-8, mb-12, mb-16, mb-20
```

### **Typography Scale**
```css
/* Headings */
h1: text-4xl md:text-5xl lg:text-6xl font-light
h2: text-3xl md:text-4xl lg:text-5xl font-light  
h3: text-xl md:text-2xl font-medium
h4: text-lg md:text-xl font-medium

/* Body Text */
Large: text-lg md:text-xl font-light
Regular: text-base md:text-lg font-light
Small: text-sm font-light
```

### **Grid Structure**
```html
<!-- Standard layout -->
<div className="grid grid-cols-12 gap-6">
  <div className="col-span-12 md:col-span-8 md:col-start-3">
    <!-- Centered content, 8 columns wide on desktop -->
  </div>
</div>

<!-- Asymmetrical layout -->
<div className="grid grid-cols-12 gap-6">
  <div className="col-span-12 md:col-span-6">Content</div>
  <div className="col-span-12 md:col-span-4 md:col-start-9">Sidebar</div>
</div>
```

---

## 🎨 Visual Language

### **What to AVOID**
- ❌ Rounded corners (`rounded-lg`, `rounded-xl`)
- ❌ Heavy drop shadows and glows
- ❌ Gradient backgrounds
- ❌ Complex animations (spring, bounce effects)
- ❌ Decorative elements without function
- ❌ Multiple bright colors
- ❌ Heavy font weights (`font-bold`, `font-black`)

### **What to EMBRACE**
- ✅ Sharp, clean edges (no border-radius)
- ✅ Subtle shadows for depth only
- ✅ Solid color backgrounds
- ✅ Simple fade and slide animations
- ✅ Functional visual elements
- ✅ Monochromatic + single accent color
- ✅ Light to medium font weights

---

## 📱 Responsive Design

### **Breakpoints**
- **Mobile**: < 768px (col-span-12)
- **Tablet**: 768px - 1024px (col-span-6-8)
- **Desktop**: > 1024px (full grid flexibility)

### **Mobile-First Approach**
Always design for mobile first, then enhance for larger screens:
```css
<!-- Mobile: full width, Desktop: 8 columns centered -->
<div className="col-span-12 md:col-span-8 md:col-start-3">
```

---

## 🔧 Implementation Guidelines

### **Component Structure**
1. **Container**: `container mx-auto px-6 max-w-6xl`
2. **Grid**: `grid grid-cols-12 gap-6`
3. **Content**: Appropriate column spans
4. **Typography**: Following the scale above
5. **Animations**: Minimal, functional only

### **Code Standards**
- Use semantic HTML structure
- Implement proper ARIA labels
- Maintain consistent class naming
- Follow responsive-first approach
- Test with reduced motion preferences

---

## 🎯 Migration Priority

### **Phase 1: Critical Components**
1. Hero Section - Remove gradients, simplify
2. Service Cards - Sharp edges, minimal shadows
3. Navigation - Typography review

### **Phase 2: Content Sections**  
1. Statistics - Clean grid layout
2. Testimonials - Swiss typography
3. Footer - Systematic spacing

### **Phase 3: Interactive Elements**
1. Forms - Clean, functional styling
2. Buttons - Consistent, minimal design
3. Cost Calculator - Simplified interface

---

## 📋 Quality Checklist

Before considering a component "Swiss Design Complete":

- [ ] Uses 12-column grid system
- [ ] Typography follows established scale
- [ ] Animations are subtle (< 0.8s duration)
- [ ] Color palette is minimal (black, white, gray, primary)
- [ ] No rounded corners or heavy shadows
- [ ] Responsive across all breakpoints
- [ ] Accessible (proper contrast, ARIA labels)
- [ ] Fast loading (optimized assets)

---

## 📚 Reference Resources

- **Swiss Design Examples**: [swissted.com](https://swissted.com)
- **Typography**: [Practical Typography](https://practicaltypography.com)
- **Grid Systems**: [CSS Grid Garden](https://cssgridgarden.com)
- **Accessibility**: [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

*Last Updated: September 13, 2025*  
*Version: 1.0*
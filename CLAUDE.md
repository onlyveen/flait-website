# Flait Website - Design System Rules for Figma Integration

This document provides comprehensive guidelines for integrating Figma designs into the Flait website codebase using the Model Context Protocol (MCP).

---

## 1. Design System Structure

### Design Tokens

**Location**: `src/app/globals.css` (lines 7-21)

Design tokens are defined using Tailwind CSS v4's `@theme` directive with CSS custom properties:

```css
@theme {
  /* Custom Colors */
  --color-primary: #0640AD;      /* Main brand blue */
  --color-accent: #FFE34F;       /* Yellow accent */
  --color-text: #1E1E1E;         /* Dark text */
  --color-secondary: #254582;    /* Secondary blue */
  --color-white: #FFFFFF;        /* White */
  --color-placeholder: #142141;  /* Placeholder text */
  --color-border: #BBBBBB;       /* Border color */
  --color-bg-color: #F3FAFF;     /* Light blue background */

  /* Custom Fonts */
  --font-excon: "Excon-Variable", "Excon-Regular", "Space Grotesk", "Inter", system-ui, sans-serif;
  --font-satoshi: "Satoshi-Variable", "Satoshi-Regular", "Inter", "Roboto", "Helvetica Neue", "Arial", sans-serif;
}
```

**Token Usage Pattern**:
- Colors: Use `var(--color-[name])` in className attributes
- Fonts: Use `font-excon` or `font-satoshi` Tailwind utilities
- Example: `className="text-[var(--color-primary)] font-excon"`

**Token Transformation**: None - tokens are used directly as CSS custom properties

---

## 2. Typography System

### Font Families

**Primary Fonts**:
1. **Excon** - Display/Heading font (from Fontshare)
   - Location: `src/app/styles/Excon_WEB/`
   - Variable font support: `Excon-Variable` (weight range: 100-900)
   - Static weights: Thin (100), Light (300), Regular (400), Medium (500), Bold (700), Black (900)
   - Usage: Headlines, titles, feature headings

2. **Satoshi** - Body/UI font (from Fontshare)
   - Location: `src/app/styles/Satoshi_WEB/`
   - Variable font support: `Satoshi-Variable` (weight range: 300-900)
   - Static weights: Light (300), Regular (400), Medium (500), Bold (700), Black (900)
   - Italic variants available for all weights
   - Usage: Body text, buttons, form labels

### Responsive Typography Classes

**Location**: `src/app/styles/text-styles.css`

Pre-defined responsive text styles using `@layer components`:

```css
/* H1 - Primary Headline */
.h-1 {
  font-family: var(--font-family-excon);
  font-weight: 700;
  font-size: 36px;        /* mobile */
  font-size: 48px;        /* md: 768px+ */
  font-size: 64px;        /* lg: 1024px+ */
  line-height: 1.2;
}

/* H2 - Secondary Headline */
.h-2 {
  font-family: "Excon Variable", var(--font-family-excon);
  font-weight: 700;
  font-size: 28px;        /* mobile */
  font-size: 36px;        /* md: 768px+ */
  font-size: 48px;        /* lg: 1024px+ */
  line-height: 1.2;
}

/* H4 - Tertiary Headline */
.h-4 {
  font-family: var(--font-family-excon);
  font-weight: 500;
  font-size: 18px;        /* mobile */
  font-size: 20px;        /* md: 768px+ */
  font-size: 24px;        /* lg: 1024px+ */
  line-height: 1.2;
}

/* Body X Large */
.body-xl {
  font-family: var(--font-family-satoshi);
  font-weight: 500;
  font-size: 18px;        /* mobile */
  font-size: 20px;        /* md: 768px+ */
  font-size: 24px;        /* lg: 1024px+ */
  line-height: 1.4;
  letter-spacing: -0.02em;
}

/* Body Large */
.body-lg {
  font-family: var(--font-family-satoshi);
  font-weight: 500;
  font-size: 16px;        /* mobile */
  font-size: 18px;        /* md: 768px+ */
  font-size: 20px;        /* lg: 1024px+ */
  line-height: 1.45;
}

/* Body Regular */
.body-regular {
  font-family: var(--font-family-satoshi);
  font-weight: 500;
  font-size: 14px;        /* mobile */
  font-size: 16px;        /* md: 768px+ */
  font-size: 18px;        /* lg: 1024px+ */
  line-height: 1.5;
  letter-spacing: -0.02em;
}
```

**Typography Usage Pattern**:
```jsx
// Inline Tailwind approach (preferred)
<h1 className="font-excon font-bold text-5xl lg:text-7xl">
  Your AI Travel Manager
</h1>

// Pre-defined class approach
<h1 className="h-1">Your AI Travel Manager</h1>
```

---

## 3. Component Library

### Component Architecture

**Framework**: React 19.2.0 with Next.js 16.0.4 (App Router)

**Location**: `src/components/`

**Component Structure**:
```
src/
├── components/
│   ├── Navbar.js          # Navigation component
│   ├── Hero.js            # Hero section with form
│   ├── HowItWorks.js      # Process steps
│   ├── Features.js        # Feature grid
│   ├── Trust.js           # Trust indicators
│   └── Footer.js          # Footer links
├── app/
│   ├── layout.js          # Root layout
│   ├── page.js            # Home page composition
│   └── globals.css        # Global styles
```

### Component Patterns

**Functional Components with Default Export**:
```jsx
// Component template
export default function ComponentName() {
  return (
    <section className="py-20 bg-white">
      {/* Component content */}
    </section>
  );
}
```

**Data-driven Components**:
```jsx
// Example: Features.js (lines 2-28)
export default function Features() {
  const features = [
    {
      number: "1",
      title: "WhatsApp-first convenience",
      description: "Gate changes. Delays. Boarding calls..."
    },
    // ... more features
  ];

  return (
    <section className="py-20 bg-[var(--color-bg-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl">
              {/* Feature card content */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Key Component Characteristics**:
- Server components by default (Next.js App Router)
- No client-side state management yet
- Data defined inline within components
- Semantic HTML structure
- Accessibility considerations (proper heading hierarchy)

---

## 4. Frameworks & Libraries

### Core Stack

```json
{
  "dependencies": {
    "next": "16.0.4",           // React framework
    "react": "19.2.0",          // UI library
    "react-dom": "19.2.0"       // React DOM renderer
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",  // PostCSS plugin
    "tailwindcss": "^4"            // Utility-first CSS
  }
}
```

### Build System

**Next.js 16** with App Router architecture:
- File-based routing
- Server Components by default
- Built-in optimization (images, fonts, code splitting)
- Configuration: `next.config.mjs` (currently minimal)

**Build Commands**:
```bash
npm run dev      # Development server (http://localhost:3000)
npm run build    # Production build
npm run start    # Production server
```

### Styling Framework

**Tailwind CSS v4** with PostCSS:
- Configuration: `tailwind.config.js` and `postcss.config.mjs`
- Content paths: `src/**/*.{js,ts,jsx,tsx}`
- Custom theme defined in `globals.css` using `@theme` directive
- No custom plugins configured

**PostCSS Setup** (`postcss.config.mjs`):
```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

---

## 5. Asset Management

### Image Assets

**Location**: `public/` directory

**Current Assets**:
- `file.svg` - File icon
- `globe.svg` - Globe icon
- `next.svg` - Next.js logo
- `vercel.svg` - Vercel logo
- `window.svg` - Window icon

**Asset Usage Pattern**:
```jsx
import Image from 'next/image';

<Image
  src="/next.svg"
  alt="Next.js logo"
  width={180}
  height={38}
  priority  // For above-the-fold images
/>
```

**Next.js Image Optimization**:
- Automatic optimization (WebP/AVIF formats)
- Lazy loading by default
- Responsive images with `srcSet`
- No CDN configuration yet

**Font Assets**:
- Location: `src/app/styles/Excon_WEB/fonts/` and `src/app/styles/Satoshi_WEB/fonts/`
- Formats: WOFF2 (preferred), WOFF, TTF (fallback)
- Loading: `font-display: swap` for better performance

---

## 6. Icon System

### Current Approach

**Inline SVG** - Icons are embedded directly in components:

```jsx
// Example: Navbar.js (lines 31-34)
<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16" />
</svg>
```

**Emoji Icons** - Used in some components:
```jsx
// Example: HowItWorks.js (lines 6, 11, 16)
icon: "✈️"  // Plane
icon: "🔔"  // Bell
icon: "⏰"  // Clock
```

**Static SVG Files** - Basic icons stored in `public/`:
- Loaded via Next.js `Image` component
- Used for logos and branding elements

### Recommended Pattern for Figma Integration

When integrating Figma icons:

1. **Export as SVG** from Figma
2. **Place in** `public/icons/` directory
3. **Use Next.js Image** for static icons or **inline SVG** for styled icons
4. **Apply Tailwind classes** for sizing and colors:
   ```jsx
   <svg className="w-6 h-6 text-[var(--color-primary)]">
     {/* SVG paths */}
   </svg>
   ```

**Icon Naming Convention** (proposed):
- `icon-name-variant.svg`
- Examples: `check-circle-filled.svg`, `arrow-right-outline.svg`

---

## 7. Styling Approach

### CSS Methodology

**Utility-First with Tailwind CSS** - Primary styling approach:

```jsx
// Example: Hero.js (lines 25-26)
<div className="bg-white p-6 rounded-2xl shadow-xl shadow-[var(--color-primary)]/5
                border border-[var(--color-border)]/20 max-w-md mx-auto lg:mx-0">
```

**Key Patterns**:

1. **Responsive Design** - Mobile-first with breakpoint modifiers:
   ```jsx
   className="text-center lg:text-left"  // Center on mobile, left on desktop
   className="hidden md:flex"            // Hidden on mobile, flex on tablet+
   className="px-4 sm:px-6 lg:px-8"     // Progressive spacing
   ```

2. **Color Variables** - CSS custom properties in Tailwind:
   ```jsx
   className="text-[var(--color-primary)]"
   className="bg-[var(--color-bg-color)]"
   className="border-[var(--color-border)]/20"  // With opacity
   ```

3. **Typography Utilities**:
   ```jsx
   className="font-excon font-bold text-5xl lg:text-7xl"
   className="font-satoshi text-lg text-gray-600"
   ```

4. **Spacing System** - Using Tailwind's default scale:
   - `p-4`, `p-6`, `p-8` - Padding
   - `gap-4`, `gap-8`, `gap-12` - Grid/flex gaps
   - `mb-4`, `mb-6`, `mb-10` - Margins

5. **Interactive States**:
   ```jsx
   className="hover:bg-[var(--color-secondary)] transition-colors"
   className="focus:border-[var(--color-primary)] focus:ring-2"
   className="group-hover:scale-110 transition-transform duration-300"
   ```

### Global Styles

**Location**: `src/app/globals.css`

```css
@import "tailwindcss";

/* Font Imports */
@import "./styles/Excon_WEB/css/excon.css";
@import "./styles/Satoshi_WEB/css/satoshi.css";

@theme {
  /* Design tokens defined here */
}

@import "./styles/text-styles.css";
```

**Global Classes**:
- `.h-1`, `.h-2`, `.h-4` - Heading styles
- `.body-xl`, `.body-lg`, `.body-regular` - Body text styles
- Applied in Root Layout: `antialiased` for font smoothing

### Component-Scoped Styling

**No CSS Modules or Styled Components** - All styling is done via Tailwind utilities inline.

**Advantages**:
- No style naming conflicts
- Co-located styles with markup
- Easier to maintain responsive designs
- Smaller CSS bundle (unused styles purged)

---

## 8. Responsive Design

### Breakpoint System

Using Tailwind's default breakpoints:

```
sm:  640px   // Small devices (large phones)
md:  768px   // Tablets
lg:  1024px  // Laptops
xl:  1280px  // Desktops
2xl: 1536px  // Large desktops
```

### Layout Container Pattern

**Max-width container with responsive padding**:
```jsx
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  {/* Content */}
</div>
```

- **Max-width**: `7xl` (1280px) - standard across all sections
- **Horizontal margins**: `mx-auto` - centers container
- **Responsive padding**: Progressive from mobile to desktop

### Grid Patterns

**Responsive Column Grids**:
```jsx
// 1 column mobile → 2 columns tablet → 3 columns desktop
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

// 1 column mobile → 2 columns desktop
<div className="grid lg:grid-cols-2 gap-12">
```

### Typography Responsiveness

**Approach 1** - Inline responsive utilities (preferred):
```jsx
<h1 className="text-5xl lg:text-7xl">
```

**Approach 2** - Pre-defined responsive classes:
```jsx
<h1 className="h-1">  // Responsive sizing built-in
```

---

## 9. Project Structure

### File Organization

```
flait-website/
├── public/                    # Static assets
│   ├── *.svg                 # Icon files
│   └── [images]              # Future image assets
│
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── layout.js        # Root layout (metadata, fonts)
│   │   ├── page.js          # Home page (default Next.js template - NOT IN USE)
│   │   ├── globals.css      # Global styles & theme tokens
│   │   └── styles/          # Font files & text utilities
│   │       ├── Excon_WEB/
│   │       │   ├── css/excon.css
│   │       │   └── fonts/
│   │       ├── Satoshi_WEB/
│   │       │   ├── css/satoshi.css
│   │       │   └── fonts/
│   │       └── text-styles.css
│   │
│   └── components/           # React components
│       ├── Navbar.js
│       ├── Hero.js
│       ├── HowItWorks.js
│       ├── Features.js
│       ├── Trust.js
│       └── Footer.js
│
├── next.config.mjs           # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── postcss.config.mjs        # PostCSS configuration
├── jsconfig.json            # Path aliases (@/*)
└── package.json             # Dependencies
```

### Path Aliases

**Configuration** (`jsconfig.json`):
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**Usage**:
```jsx
import Navbar from '@/components/Navbar';
import '@/app/globals.css';
```

---

## 10. Figma Integration Guidelines

### When Converting Figma Designs to Code

#### Color Extraction
1. **Check existing tokens** in `src/app/globals.css` before adding new colors
2. **Map Figma colors** to existing CSS variables:
   - Primary blue → `var(--color-primary)`
   - Accent yellow → `var(--color-accent)`
   - Background → `var(--color-bg-color)`
3. **Add new tokens** only if color doesn't exist:
   ```css
   @theme {
     --color-new-token: #HEXCODE;
   }
   ```
4. **Use with Tailwind** arbitrary values:
   ```jsx
   className="text-[var(--color-new-token)]"
   ```

#### Typography Mapping
1. **Map Figma text styles** to existing classes:
   - Large headlines → `.h-1` or `text-5xl lg:text-7xl`
   - Section titles → `.h-2` or `text-4xl`
   - Body text → `text-lg` or `.body-lg`
2. **Font selection**:
   - Headings/Display → `font-excon`
   - Body/UI → `font-satoshi`
3. **Respect responsive scaling** - use responsive utilities or pre-defined classes

#### Component Creation
1. **Create new component** in `src/components/`
2. **Use functional component** pattern:
   ```jsx
   export default function ComponentName() {
     return (
       <section className="py-20">
         {/* Component content */}
       </section>
     );
   }
   ```
3. **Extract repeating data** into arrays (see `Features.js` pattern)
4. **Follow semantic HTML** structure
5. **Include accessibility** attributes (alt text, aria-labels)

#### Layout Patterns
1. **Use container pattern**:
   ```jsx
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
   ```
2. **Section spacing**: `py-20` standard vertical padding
3. **Grid layouts**: `grid md:grid-cols-2 lg:grid-cols-3 gap-8`
4. **Responsive visibility**: `hidden md:block`, `md:flex`

#### Asset Handling
1. **Export images** from Figma as:
   - PNG/JPG for photos (2x resolution)
   - SVG for icons and illustrations
2. **Place in** `public/` directory
3. **Use Next.js Image**:
   ```jsx
   import Image from 'next/image';

   <Image
     src="/image-name.png"
     alt="Description"
     width={600}
     height={400}
   />
   ```
4. **Optimize** images before committing (compress, appropriate format)

#### Spacing & Sizing
1. **Use Tailwind scale**: `4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64`
2. **Border radius**: `rounded-lg` (8px), `rounded-xl` (12px), `rounded-2xl` (16px), `rounded-full` (9999px)
3. **Shadows**: `shadow-sm`, `shadow`, `shadow-lg`, `shadow-xl`, `shadow-2xl`
4. **Custom shadows**: `shadow-[var(--color-primary)]/20` for colored shadows

#### Interactive Elements
1. **Buttons**:
   ```jsx
   <button className="bg-[var(--color-primary)] text-white font-satoshi
                      font-bold py-3 px-6 rounded-full
                      hover:bg-[var(--color-secondary)] transition-colors
                      shadow-lg shadow-[var(--color-primary)]/20">
     Button Text
   </button>
   ```
2. **Form inputs**:
   ```jsx
   <input
     className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200
                focus:border-[var(--color-primary)] focus:ring-2
                focus:ring-[var(--color-primary)]/20 outline-none
                transition-all font-satoshi"
   />
   ```
3. **Links**:
   ```jsx
   import Link from 'next/link';

   <Link href="/path" className="hover:text-[var(--color-primary)] transition-colors">
     Link Text
   </Link>
   ```

#### Testing Responsive Design
1. **Test at breakpoints**: 375px (mobile), 768px (tablet), 1024px (laptop), 1440px (desktop)
2. **Check typography scaling** across devices
3. **Verify touch targets** (min 44x44px on mobile)
4. **Test navigation** on mobile vs desktop

---

## 11. Common Component Patterns

### Section Container
```jsx
<section className="py-20 bg-[var(--color-bg-color)]">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Section content */}
  </div>
</section>
```

### Card Component
```jsx
<div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md
                transition-shadow border border-[var(--color-border)]/10">
  {/* Card content */}
</div>
```

### Feature Grid
```jsx
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
  {items.map((item, index) => (
    <div key={index} className="...">
      {/* Item content */}
    </div>
  ))}
</div>
```

### Icon Badge
```jsx
<div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/10
                text-[var(--color-primary)] flex items-center
                justify-center">
  {icon}
</div>
```

### Navbar Pattern
```jsx
<nav className="fixed top-0 left-0 right-0 z-50
                bg-white/80 backdrop-blur-md
                border-b border-[var(--color-border)]/20">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-20">
      {/* Nav content */}
    </div>
  </div>
</nav>
```

---

## 12. Best Practices

### Component Development
- ✅ Use server components by default (no 'use client' unless necessary)
- ✅ Extract repeated data into arrays/objects
- ✅ Keep components focused and single-purpose
- ✅ Use semantic HTML (section, nav, footer, article)
- ✅ Include proper alt text for images
- ✅ Use Next.js `Link` for internal navigation
- ✅ Use Next.js `Image` for images

### Styling
- ✅ Use Tailwind utilities over custom CSS
- ✅ Reference design tokens via `var(--color-*)`
- ✅ Apply mobile-first responsive design
- ✅ Use opacity modifiers: `/20`, `/50`, `/80`
- ✅ Group related utilities (layout → spacing → colors → typography)
- ✅ Use `transition-*` utilities for smooth interactions

### Performance
- ✅ Optimize images before adding to project
- ✅ Use `priority` prop for above-the-fold images
- ✅ Use variable fonts (`Excon-Variable`, `Satoshi-Variable`)
- ✅ Leverage Next.js automatic code splitting
- ✅ Keep component file sizes reasonable (<500 lines)

### Accessibility
- ✅ Maintain proper heading hierarchy (h1 → h2 → h3)
- ✅ Provide alt text for images
- ✅ Ensure sufficient color contrast
- ✅ Use semantic HTML elements
- ✅ Make interactive elements keyboard-accessible
- ✅ Test with screen readers

---

## 13. Quick Reference

### Color Tokens
```
--color-primary: #0640AD       (Main blue)
--color-secondary: #254582     (Dark blue)
--color-accent: #FFE34F        (Yellow)
--color-text: #1E1E1E          (Dark gray)
--color-bg-color: #F3FAFF      (Light blue)
--color-border: #BBBBBB        (Gray)
```

### Font Utilities
```
font-excon     → Excon-Variable font family
font-satoshi   → Satoshi-Variable font family
font-bold      → font-weight: 700
font-medium    → font-weight: 500
```

### Responsive Breakpoints
```
sm:  640px
md:  768px  ← Tablet
lg:  1024px ← Desktop
xl:  1280px
```

### Common Spacing
```
p-4   → padding: 1rem (16px)
p-6   → padding: 1.5rem (24px)
p-8   → padding: 2rem (32px)
gap-8 → gap: 2rem (32px)
```

### Border Radius
```
rounded-lg   → 0.5rem (8px)
rounded-xl   → 0.75rem (12px)
rounded-2xl  → 1rem (16px)
rounded-full → 9999px
```

---

## Conclusion

This design system provides a solid foundation for translating Figma designs into production-ready code. The utility-first approach with Tailwind CSS, combined with semantic CSS custom properties, ensures consistency and maintainability. All new components should follow these established patterns to maintain design system integrity.

For questions or clarifications, refer to the actual component implementations in `src/components/` for real-world examples.

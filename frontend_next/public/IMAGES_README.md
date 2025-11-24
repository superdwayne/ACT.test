# Mainline Template Images

All images from the Mainline template have been copied to this directory.

## 📁 Directory Structure

```
public/
├── hero.webp                    # Main hero image
├── logo.svg                     # Company logo
├── footer.svg                   # Footer graphic
├── og-image.jpg                 # Open Graph image for social sharing
│
├── about/                       # About page images
│   ├── 1.webp
│   ├── 2.webp
│   ├── 3.webp
│   └── 4.webp
│
├── features/                    # Feature showcase images
│   ├── overview-card.svg
│   ├── triage-card.svg
│   └── cycle-card.svg
│
├── logos/                       # Company/partner logos
│   ├── arc.svg
│   ├── asana.svg
│   ├── claude.svg
│   ├── confluence.svg
│   ├── descript.svg
│   ├── drive.svg
│   ├── excel.svg
│   ├── jira.svg
│   ├── mercury.svg
│   ├── monday.svg
│   ├── monzo.svg
│   ├── notion.svg
│   ├── openai.svg
│   ├── perplexity.svg
│   ├── ramp.svg
│   ├── raycast.svg
│   ├── retool.svg
│   ├── watershed.svg
│   └── word.svg
│
├── testimonials/                # Customer testimonial photos
│   ├── amy-chase.webp
│   ├── jonas-kotara.webp
│   ├── kevin-yam.webp
│   └── kundo-marta.webp
│
├── investors/                   # Investor photos
│   ├── 1.webp
│   ├── 2.webp
│   ├── 3.webp
│   ├── 4.webp
│   └── 5.webp
│
├── resource-allocation/         # Resource allocation feature images
│   ├── discussions.webp
│   ├── graveyard.webp
│   ├── notifications.webp
│   └── templates.webp
│
└── favicon/                     # Favicon files
    ├── favicon.ico
    ├── favicon.svg
    ├── favicon-96x96.png
    ├── apple-touch-icon.png
    ├── web-app-manifest-192x192.png
    ├── web-app-manifest-512x512.png
    └── site.webmanifest
```

## 🎯 Usage in Components

### Hero Image
```tsx
<Image
  src="/hero.webp"
  alt="hero"
  fill
  className="rounded-2xl object-cover"
/>
```

### Logo
```tsx
<Image
  src="/logo.svg"
  alt="logo"
  width={94}
  height={18}
  className="dark:invert"
/>
```

### Company Logos (Marquee)
```tsx
<Image
  src="/logos/notion.svg"
  alt="Notion logo"
  width={120}
  height={40}
/>
```

### Testimonials
```tsx
<Image
  src="/testimonials/amy-chase.webp"
  alt="Amy Chase"
  fill
  className="object-cover"
/>
```

### Features
```tsx
<Image
  src="/features/overview-card.svg"
  alt="Overview interface"
  fill
  className="object-cover"
/>
```

## 🔄 Replacing Images

To use your own images:

1. **Replace existing files** with the same name
2. **Or update the component** to point to your new image:

```tsx
// In the component file
const companies = [
  {
    name: "Your Company",
    logo: "/logos/your-company.svg", // Update this path
    width: 120,
    height: 40,
  },
];
```

## 📐 Image Specifications

### Hero Image
- **Format:** WebP
- **Dimensions:** ~1920x1080 (16:9 aspect ratio)
- **Usage:** Main landing page hero

### Logos
- **Format:** SVG (scalable)
- **Recommended size:** 120x40 to 150x50
- **Usage:** Partner/company showcase

### Testimonials
- **Format:** WebP
- **Dimensions:** Square or portrait
- **Usage:** Customer testimonial cards

### Features
- **Format:** SVG or WebP
- **Usage:** Feature showcase cards

## 🎨 Customization Tips

### 1. Update Logo
Replace `/public/logo.svg` with your company logo

### 2. Update Hero Image
Replace `/public/hero.webp` with your hero image

### 3. Update Partner Logos
Replace files in `/public/logos/` with your partners

### 4. Update Testimonials
Replace files in `/public/testimonials/` with your customers

## 🖼️ Image Optimization

All images are already optimized:
- **WebP format** for photos (smaller file size)
- **SVG format** for logos (scalable, crisp at any size)
- **Next.js Image component** handles automatic optimization

## 📝 Notes

- Images are served from `/public` directory
- Next.js automatically optimizes images on request
- SVG files work great for logos (scalable, small file size)
- WebP provides better compression than JPEG/PNG

---

**Source:** Mainline Next.js Template  
**License:** Check original template for license details

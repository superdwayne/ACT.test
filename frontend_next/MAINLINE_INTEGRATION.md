# Mainline Template Integration

Successfully integrated components from the [Mainline Next.js Template](https://github.com/shadcnblocks/mainline-nextjs-template) into your project.

## 🎯 What Was Integrated

### ✅ Dependencies Installed

```bash
npm install motion embla-carousel-react react-fast-marquee next-safe-action react-icons @radix-ui/react-switch @mdx-js/loader @mdx-js/react @next/mdx @types/mdx
```

**New Libraries:**
- `motion` - Animation library (Framer Motion successor)
- `embla-carousel-react` - Carousel/slider component
- `react-fast-marquee` - Animated marquee component
- `next-safe-action` - Type-safe server actions
- `react-icons` - Icon library
- `@radix-ui/react-switch` - Switch/toggle component
- `@mdx-js/*` - MDX support for content pages

### ✅ Components Added

**Location:** `/src/components/mainline/`

#### Utility Components
- `dashed-line.tsx` - Decorative dashed line (horizontal/vertical)
- `background.tsx` - Gradient background wrapper

#### UI Components (via shadcn)
- `carousel.tsx` - Carousel component
- `switch.tsx` - Toggle switch component
- `form.tsx` - Form component (already existed)

#### Block Components (`/blocks/`)
All production-ready, customizable sections:

1. **`hero.tsx`** - Landing page hero section
2. **`features.tsx`** - Feature showcase grid
3. **`logos.tsx`** - Animated logo marquee
4. **`testimonials.tsx`** - Customer testimonials carousel
5. **`pricing.tsx`** - Pricing section
6. **`pricing-table.tsx`** - Detailed pricing comparison table
7. **`faq.tsx`** - FAQ accordion
8. **`footer.tsx`** - Site footer with links
9. **`navbar.tsx`** - Navigation bar with dropdowns
10. **`resource-allocation.tsx`** - Interactive resource management
11. **`investors.tsx`** - Investor showcase
12. **`about.tsx`** - About section
13. **`about-hero.tsx`** - About page hero
14. **`contact.tsx`** - Contact page layout
15. **`contact-form.tsx`** - Contact form with validation

---

## 🚀 Usage

### Import Components

```tsx
// Import individual blocks
import { Hero, Features, Pricing } from "@/components/mainline";

// Or import specific blocks
import { Hero } from "@/components/mainline/blocks/hero";
import { DashedLine } from "@/components/mainline/dashed-line";
```

### Basic Page Example

```tsx
import { Hero, Features, Testimonials, Footer } from "@/components/mainline";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Features />
      <Testimonials />
      <Footer />
    </>
  );
}
```

---

## 📄 Demo Pages

### 1. Full Landing Page Demo
**URL:** `/mainline-demo`

Complete landing page with all major blocks:
- Hero section
- Logo marquee
- Features
- Testimonials
- Pricing
- FAQ
- Footer

### 2. Block Showcase
**URL:** `/mainline-blocks`

Individual blocks displayed separately for easy preview and testing.

---

## 🎨 Available Blocks

### Hero
Landing page hero with title, description, CTA buttons, and feature list.

```tsx
import { Hero } from "@/components/mainline";

<Hero />
```

**Features:**
- Responsive layout (2-column on desktop)
- Feature icons with descriptions
- CTA buttons
- Hero image

---

### Features
Product features showcase with icons and descriptions.

```tsx
import { Features } from "@/components/mainline";

<Features />
```

**Features:**
- Grid layout
- Icon support
- Responsive design

---

### Logos
Animated logo marquee for showcasing partners/clients.

```tsx
import { Logos } from "@/components/mainline";

<Logos />
```

**Features:**
- Auto-scrolling animation
- Pause on hover
- Customizable speed

---

### Testimonials
Customer testimonials in a carousel.

```tsx
import { Testimonials } from "@/components/mainline";

<Testimonials />
```

**Features:**
- Embla carousel
- Navigation arrows
- Responsive cards
- Avatar images

---

### Pricing
Pricing section with plans.

```tsx
import { Pricing } from "@/components/mainline";

<Pricing />
```

**Features:**
- Multiple pricing tiers
- Feature lists
- CTA buttons
- Highlighted "popular" plan

---

### PricingTable
Detailed pricing comparison table.

```tsx
import { PricingTable } from "@/components/mainline";

<PricingTable />
```

**Features:**
- Feature comparison grid
- Checkmarks for included features
- Responsive table layout

---

### FAQ
Frequently asked questions with accordion.

```tsx
import { FAQ } from "@/components/mainline";

<FAQ />
```

**Features:**
- Radix UI Accordion
- Expandable questions
- Smooth animations

---

### Footer
Complete site footer with links and social icons.

```tsx
import { Footer } from "@/components/mainline";

<Footer />
```

**Features:**
- Multi-column layout
- Social media links
- Newsletter signup
- Copyright info

---

### Navbar
Navigation bar with dropdown menus.

```tsx
import { Navbar } from "@/components/mainline";

<Navbar />
```

**Features:**
- Responsive (mobile menu)
- Dropdown navigation
- Theme toggle
- Active link highlighting

---

### ResourceAllocation
Interactive resource management visualization.

```tsx
import { ResourceAllocation } from "@/components/mainline";

<ResourceAllocation />
```

**Features:**
- Interactive sliders
- Real-time updates
- Visual feedback

---

### ContactForm
Contact form with validation.

```tsx
import { ContactForm } from "@/components/mainline";

<ContactForm />
```

**Features:**
- React Hook Form
- Zod validation
- Server actions integration
- Error handling

---

## 🛠️ Customization

### Modify Content

All blocks use inline data that you can easily customize:

```tsx
// Example: Customizing features in hero.tsx
const features = [
  {
    title: "Your Feature",
    description: "Your description",
    icon: YourIcon,
  },
  // Add more...
];
```

### Styling

All components use Tailwind CSS and respect your theme:
- Colors: Uses CSS variables (`--foreground`, `--background`, etc.)
- Dark mode: Automatically supported via `next-themes`
- Responsive: Mobile-first breakpoints

### Replace Images

Update image paths in components:

```tsx
// In hero.tsx
<Image
  src="/your-hero-image.webp"  // Change this
  alt="hero"
  fill
  className="rounded-2xl object-cover"
/>
```

---

## 🎯 Best Practices

### 1. **Use as Templates**
These blocks are meant to be customized. Copy and modify them for your specific needs.

### 2. **Extract Data**
Move hardcoded data to separate files or CMS:

```tsx
// data/features.ts
export const features = [
  { title: "Feature 1", description: "..." },
  // ...
];

// In component
import { features } from "@/data/features";
```

### 3. **Server Actions**
The ContactForm uses `next-safe-action`. Create your server actions:

```tsx
// actions/contact.ts
"use server";

import { action } from "@/lib/safe-action";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(10),
});

export const submitContact = action(contactSchema, async (data) => {
  // Handle form submission
  console.log(data);
  return { success: true };
});
```

### 4. **Images**
Add your images to `/public/` directory:
- `/public/hero.webp`
- `/public/logos/` (for logo marquee)
- `/public/testimonials/` (for avatars)

---

## 🔧 Configuration

### MDX Support (Optional)

If you want to use MDX for content pages, update `next.config.ts`:

```typescript
import createMDX from "@next/mdx";

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
};

export default withMDX(nextConfig);
```

### Tailwind Config

The components use some custom Tailwind utilities. Ensure your `tailwind.config.ts` includes:

```typescript
{
  theme: {
    extend: {
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
}
```

---

## 📚 Component Structure

```
src/components/mainline/
├── index.ts                 # Main exports
├── dashed-line.tsx          # Utility: Decorative line
├── background.tsx           # Utility: Gradient background
└── blocks/
    ├── index.ts             # Block exports
    ├── hero.tsx
    ├── features.tsx
    ├── logos.tsx
    ├── testimonials.tsx
    ├── pricing.tsx
    ├── pricing-table.tsx
    ├── faq.tsx
    ├── footer.tsx
    ├── navbar.tsx
    ├── resource-allocation.tsx
    ├── investors.tsx
    ├── about.tsx
    ├── about-hero.tsx
    ├── contact.tsx
    └── contact-form.tsx
```

---

## 🐛 Troubleshooting

### Images Not Loading
Ensure images exist in `/public/` directory:
```bash
/public/hero.webp
/public/logos/*.svg
```

### Import Errors
Make sure all dependencies are installed:
```bash
npm install
```

### Styling Issues
Check that your Tailwind config includes all necessary utilities and the components use your theme variables.

### TypeScript Errors
Ensure `@types/mdx` is installed if using MDX:
```bash
npm install -D @types/mdx
```

---

## 🔗 Resources

- **Original Template:** https://github.com/shadcnblocks/mainline-nextjs-template
- **Live Demo:** https://mainline-nextjs-template.vercel.app/
- **Documentation:** https://docs.shadcnblocks.com/templates/getting-started
- **Figma Design:** [View in Figma](https://www.figma.com/design/cFCLMj7DFv0sK7EVsqKeTa/Mainline)

---

## 📝 License

The Mainline template is open-source. Check the [original repository](https://github.com/shadcnblocks/mainline-nextjs-template) for license details.

---

## 🎉 Next Steps

1. **Customize Content** - Update text, images, and data in each block
2. **Add Your Branding** - Replace logos and colors
3. **Connect Backend** - Integrate contact form with your email service
4. **Deploy** - Push to Vercel or your preferred hosting

Enjoy building with Mainline blocks! 🚀

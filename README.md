# Solid Ground Concrete — Marketing Website

A production-ready marketing website for a concrete services company. Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev
# → Open http://localhost:3000

# 3. Build for production
npm run build
npm start
```

---

## Project Structure

```
src/
├── app/
│   ├── api/quote/route.ts      # Mock quote submission API
│   ├── projects/[slug]/        # Project detail page
│   ├── quote/                  # Quote request page
│   ├── layout.tsx              # Root layout + fonts + metadata
│   ├── page.tsx                # Homepage
│   ├── sitemap.ts              # Auto-generated sitemap
│   └── robots.ts               # robots.txt
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Sticky nav with mobile menu
│   │   └── Footer.tsx          # Full footer with CTA strip
│   ├── sections/
│   │   ├── HeroSection.tsx     # Full-screen hero with stats
│   │   ├── ServicesSection.tsx # 6-service grid
│   │   ├── FeaturedWorkSection.tsx  # Auto-play carousel ⭐
│   │   ├── AboutSection.tsx    # Company story + values
│   │   ├── TestimonialsSection.tsx  # 4-up testimonials
│   │   └── ContactSection.tsx  # Contact info + quick-facts
│   └── ui/
│       ├── EstimateModule.tsx  # Interactive cost calculator
│       └── QuoteForm.tsx       # Validated quote request form
├── data/
│   └── projects.ts             # ← Edit projects here
├── lib/
│   └── utils.ts                # cn(), formatCurrency(), formatDate()
└── types/
    └── index.ts                # Project, QuoteFormData interfaces
```

---

## How to Edit Content

### Add or edit projects

Open `src/data/projects.ts` and modify the `projects` array. Each entry follows the `Project` interface:

```ts
{
  id: '9',
  slug: 'my-new-project',            // URL: /projects/my-new-project
  title: 'My Project Title',
  shortDescription: '1–2 sentence summary shown in carousel hover',
  description: 'Full paragraph for the detail page',
  coverImage: '/images/projects/my-project-cover.jpg',
  images: [
    '/images/projects/my-project-1.jpg',
    '/images/projects/my-project-2.jpg',
    '/images/projects/my-project-3.jpg',
  ],
  location: 'Los Angeles, CA',
  date: '2024-06-01',
  concreteType: 'Normal Ready-Mix',
  strength: '4000 PSI / 28 MPa',
  volumeM3: 120,
  pricePerM3: 185,            // ← Change price per m³ here
  tags: ['commercial', 'slab'],
}
```

### Replace placeholder images

1. Copy your images to `public/images/projects/`
2. Update the `coverImage` and `images[]` paths in `src/data/projects.ts` to `/images/projects/your-image.jpg`
3. Next/Image handles optimization automatically.

### Change pricing

- Per-project price: edit `pricePerM3` in each project entry in `src/data/projects.ts`
- The estimate module on the detail page will reflect the new price immediately.

### Update company contact details

Search for `(323) 555-0188` and `info@solidgroundconcrete.com` across the codebase and replace with your real details. Main locations:
- `src/components/layout/Header.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/sections/ContactSection.tsx`
- `src/app/sitemap.ts` (update the base URL)
- `src/app/layout.tsx` (metadataBase URL)

---

## Quote Calculator (Budget Simulator)

### Route
`/calculator` — live cost estimator with full breakdown.

### Architecture

```
src/config/pricing.ts                     ← All monetary constants (edit to update prices)
src/lib/pricing.ts                        ← Pure calculateQuote() engine + types
src/lib/projectPricingBridge.ts           ← Maps project text fields → calculator types
src/components/quote/QuoteCalculator.tsx  ← Full UI component
src/app/calculator/page.tsx               ← Route page
```

### `calculateQuote(input)`

```ts
import { calculateQuote } from '@/lib/pricing'
const result = calculateQuote({
  volumeM3: 50, concreteType: 'HighStrength', strengthMPa: 350,
  deliveryDistanceKm: 20, needsPump: true, pumpHours: 6,
  taxPercent: 9.5,
})
// result.total, result.costPerM3, result.lineItems, result.subtotal, result.taxAmount
```

### Smoke tests (no framework needed)
```bash
npx ts-node --project tsconfig.json src/lib/pricing.examples.ts
```

### Prefill chain
```
Project detail → /calculator?volumeM3=...&concreteType=...&strengthMPa=...
Calculator     → /quote?volumeM3=...&concreteType=...&notes=...
Quote form     → reads all params, notes field pre-populated
```

---

## Quote API

The `/api/quote` route is a **mock endpoint** that logs submissions to the server console and returns `{ success: true }`.

To wire up real email delivery:
- Integrate [Resend](https://resend.com), [SendGrid](https://sendgrid.com), or similar in `src/app/api/quote/route.ts`
- Or forward to a CRM webhook / Slack webhook

---

## SEO

- Per-page `metadata` with title templates, descriptions, and Open Graph
- `sitemap.ts` auto-generates from `projects.ts`
- `robots.ts` disallows `/api/`
- Semantic HTML: `<main>`, `<section>`, `<nav>`, `<address>`, `<article>`, heading hierarchy

---

## Accessibility

- All interactive elements have `focus-visible` styles
- Images have descriptive `alt` text
- Carousel has `aria-label` on controls and `role="tablist"` on dots
- `aria-expanded` on mobile menu toggle
- Keyboard navigable throughout

---

## Performance Notes

- `next/image` with `priority` on above-fold images
- Google Fonts loaded via `next/font` (no layout shift)
- Framer Motion `whileInView` with `once: true` (no re-animation)
- Carousel uses `AnimatePresence` with `initial={false}` to avoid mount animation

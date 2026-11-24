# Frameworks and System Architecture

## Selected Stack
- **Framework:** Next.js 15 (App Router, React 19, TypeScript strict mode)
- **Styling:** Tailwind CSS v4 with CSS custom properties for dark/editorial contrast
- **Animation Engine:** `motion` (Framer Motion v12+) for spring physics, scroll-linked parallax, and `AnimatePresence` + `lenis` for inertia scrolling
- **Validation & Security:** `zod` for payload validation + custom sliding-window rate limiter + strict CSP headers

## Architecture Overview
- **Server Layer (`src/app/page.tsx`, `layout.tsx`):** Renders semantic HTML, Open Graph tags, and JSON-LD structured data on the server for instant search engine indexing.
- **Motion Client Islands (`src/components/motion/*`):** Isolated interactive wrappers (`MagneticButton`, `SpotlightTiltCard`, `ScrollTimeline`, `KineticHero`) hydrated on the client without blocking initial HTML paint.
- **API Route (`src/app/api/contact/route.ts`):** Validates JSON input via Zod, checks a hidden honeypot field, enforces IP rate limits, and dispatches inquiries.

## Repository Structure
├── .github/workflows/ci.yml
├── docs/
│   ├── FEASIBILITY_AND_NEEDS.md
│   └── FRAMEWORKS_AND_ARCHITECTURE.md
├── src/
│   ├── app/
│   │   ├── api/contact/route.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── manifest.ts
│   │   ├── page.tsx
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── components/
│   │   ├── motion/
│   │   │   ├── KineticHero.tsx
│   │   │   ├── MagneticButton.tsx
│   │   │   ├── MotionProvider.tsx
│   │   │   ├── ScrollTimeline.tsx
│   │   │   └── SpotlightTiltCard.tsx
│   │   ├── ContactSection.tsx
│   │   └── PresentationClient.tsx
│   └── lib/
│       ├── content.ts
│       └── rate-limit.ts
├── .env.example
├── .gitignore
├── Dockerfile
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── README.md
└── tsconfig.json

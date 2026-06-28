# Rohan Thakur — Portfolio

A world-class, immersive personal portfolio.
**Founder's Office Executive | AI Engineer | Business Analyst | Builder**

## Stack

- **Next.js 15** (App Router) + **TypeScript**
- **TailwindCSS** (dark-luxury design system)
- **Framer Motion** — page motion, reveals, magnetic UI
- **Three.js / React Three Fiber + drei** — 3D particle universe & neural core
- **GSAP** — available for advanced timeline work
- **Lenis** — momentum smooth scrolling
- **Lucide** icons

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Build for production:

```bash
npm run build && npm start
```

Type-check:

```bash
npm run typecheck
```

## Project structure

```
app/
  layout.tsx        # fonts, metadata/SEO, global effects mount
  page.tsx          # section composition
  globals.css       # design tokens, glass utilities, a11y
components/
  providers/        # SmoothScroll (Lenis)
  effects/          # Background, Scene (R3F), Cursor, MouseGlow, ScrollProgress, LoadingScreen
  layout/           # Navbar, Footer
  ui/               # MagneticButton, Reveal, Counter, SectionHeading
  sections/         # Hero, About, Experience, Skills, Playbook, Projects, Achievements, Contact
  AIAssistant.tsx   # scroll-aware AI guide
lib/
  data.ts           # ⭐ single source of truth — ALL content lives here
  utils.ts          # cn() helper
```

## Customise

Everything you'd want to edit lives in **`lib/data.ts`** — copy, metrics, skills,
experience, projects, achievements and links.

### TODO before going live

- [ ] Add real GitHub repo URLs to the 3 projects (`projects[].href`)
- [ ] Add LinkedIn / GitHub URLs (`socials`)
- [ ] Drop your CV at `public/resume.pdf`
- [ ] Set your live domain in `app/layout.tsx` (`SITE`) for SEO/OG
- [ ] (Optional) add an OG share image at `public/og.png`

## Performance / quality

- 3D canvas loaded client-only via `dynamic(ssr:false)` — no SSR cost
- `prefers-reduced-motion` respected (Lenis, animations, scene)
- Semantic HTML, labelled form fields & icon buttons, focus-safe
- Fonts via `next/font` (no layout shift)

---

Built by Rohan Thakur with AI, Data & Creativity.

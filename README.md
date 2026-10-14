# Jagmohan Das — Portfolio

A single-page portfolio built with **Vite, React 19, TypeScript (strict), Tailwind CSS v4 and Framer Motion**.
Dark mode by default with a light theme, accessible navigation, and a data-driven content layer.

## Quick start

```bash
npm install
cp .env.example .env.local   # Windows PowerShell: Copy-Item .env.example .env.local
npm run dev
```

Open the URL printed by Vite (usually http://localhost:5173).

## Scripts

| Command           | Purpose                                      |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Start the dev server                         |
| `npm run build`   | Type-check (`tsc -b`) and build to `dist/`   |
| `npm run preview` | Serve the production build locally           |
| `npm run lint`    | Run oxlint                                   |

## Environment variables

Copy `.env.example` to `.env.local`.

| Variable                 | Required | Description |
| ------------------------ | -------- | ----------- |
| `VITE_FORMSPREE_ID`      | No       | Formspree form ID (the part after `/f/`). When empty, the contact form shows a "not configured" notice and falls back to `mailto:`. Nothing is claimed as sent until this is set. |
| `VITE_CONTACT_EMAIL`     | No       | Email used for the mailto fallback and the copy button. Defaults to the address in `src/data/site.ts`. |
| `VITE_BLOOD450_LIVE_URL` | No       | Override the Blood450 live demo URL. |
| `VITE_PROMS_GITHUB_URL`  | No       | Public ProMS repository URL. The GitHub button is hidden while empty. |

All `VITE_*` values are embedded in the client bundle — never put secrets in them.

### Setting up the contact form (Formspree)

1. Create a form at <https://formspree.io> and copy its ID.
2. Set `VITE_FORMSPREE_ID=<id>` in `.env.local` (and in your host's environment variables for production).
3. Restart the dev server / rebuild. The form now POSTs JSON to `https://formspree.io/f/<id>`.

## Editing content

All copy lives in `src/data/` — components render whatever the data says.

| File                      | Contents |
| ------------------------- | -------- |
| `site.ts`                 | Profile, nav, socials, verified stats, runtime config, availability toggle |
| `experience.ts`           | Roles and workstreams |
| `skills.ts`               | Skill categories with proficiency **labels** (no percentages) |
| `projects.ts`             | Projects, filters, case-study fields, workflow diagram definitions |
| `aiLab.ts`, `studio.ts`, `engineering.ts` | AI Lab, Interactive Studio and Engineering Showcase |

- **Availability:** change `personal.availability.open` in `site.ts`.
- **Publish a draft project:** set `published: true` in `projects.ts` and fill in its fields.
- **Resume:** replace `public/resume.pdf`.
- Professional work marked `sanitized: true` is shown in a public-safe form — keep confidential names out of it.

## Project structure

```
src/
  components/
    layout/    Navbar, Footer, ScrollProgress, BackToTop
    sections/  Hero, About, Experience, Skills, Projects, EngineeringShowcase, AILab, InteractiveStudio, Contact
    ui/        Button, Tag, Modal, SectionHeader, AnimatedSection, BrandIcons
    visual/    HeroVisual (CSS/SVG), WorkflowDiagram
  context/     ThemeContext
  data/        Content (see above)
  hooks/       useActiveSection, useReducedMotion, useDialogBehavior
  lib/         utils (cn, helpers)
```

Navigation section IDs: `home`, `about`, `experience`, `skills`, `projects`, `ai-lab`, `studio`, `contact`
(the Engineering Showcase sits between Projects and AI Lab as an in-page block).

## Accessibility & motion

- Skip link, visible focus rings, semantic landmarks, `aria-current` on the active nav item.
- Mobile menu and project modals: Escape to close, focus trap, focus restored on close, scroll lock.
- All Framer Motion and CSS animation respects `prefers-reduced-motion`; the hero renders as a static illustration.

## Build & deploy

```bash
npm run build     # outputs static files to dist/
npm run preview   # sanity-check the build
```

The output is a static site — deploy `dist/` anywhere.

**Vercel** — import the repo; framework preset *Vite*; build command `npm run build`; output directory `dist`.
Add `VITE_FORMSPREE_ID` (and any other variables) under *Project Settings → Environment Variables*.

**Netlify** — build command `npm run build`, publish directory `dist`. Set the same environment variables in site settings.

**GitHub Pages / other static hosts** — upload `dist/`. Because the site is a single page with hash links, no rewrite rules are required.

Before going live, consider adding a canonical URL and an absolute `og:image` to `index.html` once the production domain is known.

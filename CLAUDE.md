# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Dev server (Turbopack) at http://localhost:3000
npm run build    # Static export → ./out (this is what Netlify runs)
npm run start    # Serve a production build
npm run lint     # ESLint (next/core-web-vitals + next/typescript)
```

There is no test suite. Verify changes by running `npm run dev` and viewing the page, or `npm run build` to confirm the static export still succeeds.

## Architecture

Single-developer portfolio site. **Next.js 16 App Router, statically exported** (`output: "export"` in [next.config.ts](next.config.ts)) and deployed to Netlify (`publish = "out"`, Node 22 — see [netlify.toml](netlify.toml)). Because the site is fully static:

- **No server components do data fetching, no API routes, no SSR.** Everything renders client-side or at build time.
- `next/image` runs with `images.unoptimized: true` — images are served as-is from `public/`.
- All page assets (images, videos, PDFs) live in `public/` and are referenced by absolute path (e.g. `/naviguih.png`, `/pub/navMarket2.mp4`). The committed `out/` directory is build output, not source.

### Page structure

- `/` ([src/app/page.tsx](src/app/page.tsx)) composes the portfolio from section components in [src/components/](src/components/): `Navbar, Hero, About, Experience, WorkExperience, Projects, Contact, Footer`.
- `/details?id=<slug>` ([src/app/details/page.tsx](src/app/details/page.tsx)) — project deep-dive pages.
- `/backend?id=blog-1`, `/flutter?id=blog-1` — tutorial/blog articles.
- `/tutorials/isolate` — standalone bilingual (EN/AR) tutorial.

### Content lives in code, not a CMS

Page content is hardcoded as typed data structures inside the components/pages that render them:

- Project cards: `projects` array in [src/components/Projects.tsx](src/components/Projects.tsx).
- Project detail content: `projectsData` (keyed by slug) in [src/app/details/page.tsx](src/app/details/page.tsx).
- Work history: `workEntries` array in [src/components/WorkExperience.tsx](src/components/WorkExperience.tsx).

To add/edit a project or job, edit the relevant data structure rather than looking for content files. A project's card (`detailsId`) links to its `projectsData` entry by matching slug.

### Query-param routing pattern (important for static export)

Detail and blog pages select their content via a `?id=<slug>` query string read with `useSearchParams()`. Next.js requires any component using `useSearchParams()` to be wrapped in `<Suspense>` for static export — every such page already does this, with the suspense boundary at the bottom of the file wrapping the inner content component. Preserve this pattern when adding new query-param-driven pages, or the build will fail.

### Dark mode

Tailwind `dark:` variant driven by a `.dark` class on `<html>`:

- **FOUC prevention**: an inline `<script>` in [src/app/layout.tsx](src/app/layout.tsx) `<head>` sets the `.dark` class from `localStorage`/`prefers-color-scheme` *before* paint. Don't remove it.
- [src/components/ThemeProvider.tsx](src/components/ThemeProvider.tsx) provides the `useTheme()` context (`theme` + `toggle`) and keeps `localStorage` and the `.dark` class in sync. The Navbar toggle button calls `toggle()`.
- Tailwind v4 wires the variant via `@variant dark (&:is(.dark *));` in [src/app/globals.css](src/app/globals.css) — not a `tailwind.config` file (there is none). Color convention: light = `gray-50`/white, dark = `gray-950`/`900`/`800`.

### Third-party libs loaded via CDN, not npm

Font Awesome 6, Lottie Player, and SweetAlert2 are loaded by `<link>`/`<script>` tags (in [src/app/layout.tsx](src/app/layout.tsx) head and via `next/script` in pages), **not** installed as dependencies. `window.Swal` is `declare`d in TS where used. When adding icons/animations/alerts, use these globals rather than reaching for an npm package.

### Computed work durations

[src/components/WorkExperience.tsx](src/components/WorkExperience.tsx) stores dates as `"MMM YYYY"` strings (e.g. `"Dec 2025"`) or `"Present"`, and computes per-role and total tenure durations at render time (`calcDuration` / `calcTotalDuration`). Edit the `startDate`/`endDate` strings; never hardcode duration text — it's derived.

## Conventions

- Tailwind utility classes only; custom CSS (hamburger animation, toggle button, SweetAlert theming) lives in [src/app/globals.css](src/app/globals.css).
- `@/` path alias maps to `src/`.
- Section components that use hooks/handlers are `"use client"`.
- Font is Poppins via `next/font/google` (loaded in [src/app/layout.tsx](src/app/layout.tsx)).

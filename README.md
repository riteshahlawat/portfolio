# the stacks — ahlawat.dev

Personal site of Ritesh Ahlawat. A library of essays with a bookshelf that
fills itself, a 7-egg easter-egg hunt, and a site-wide cat mode.

Live @ [ahlawat.dev](https://ahlawat.dev/)

## Stack

- **Next.js** (App Router, Turbopack) + React 19 + TypeScript
- **Tailwind CSS v4** (config-based, arbitrary values everywhere)
- **contentlayer2** — posts are markdown in `blogs/*.md`
- **Framer Motion** (`motion`) + **Lenis** smooth scroll
- **Turso** (libSQL) — deduplicated view counts via `/api/views/[slug]`
- Fonts: Newsreader, Literata, Instrument Sans, IBM Plex Mono (next/font)

## Develop

```bash
pnpm install
pnpm dev        # contentlayer watch + next dev on :3000
pnpm build      # production build
pnpm lint       # eslint
pnpm typecheck  # contentlayer build + tsc
pnpm db:migrate # apply migrations (.env.local for TURSO_* vars)
```

## Writing a post

Drop a markdown file in `blogs/`:

```yaml
---
title: The Title
shortTitle: short name        # used in prev/next links
date: Aug 3, 2026
image: /images/blog/cover.png # cover + OG image
description: One line.
tags: [philosophy]            # first tag shows in the library
dropCap: true                 # optional, default true
quoteAccent: purple           # or gold
---
```

Everything else is automatic: library row, index number, bookshelf spine
(width/height/color/lean are hashed from the slug; a new shelf plank
appears every 8 books), read time, view counter, prev/next.

## Map

```
blogs/                  markdown posts
src/app/
  page.tsx              the library (home)
  blog/[slug]/          essays
  blog/000/             unlisted entry nº 000
  about/                about + polaroid
  quotes/  el-dorado/   egg pages
  not-found.tsx         404 (also an egg)
  _stacks/              egg system, cat mode, drawer, nav/footer, view count
  _components/          markdown renderer, bookshelf, lightbox
```

See [DESIGN.md](DESIGN.md) for the design system, copy tone, and the
gotchas that will bite you if you skip it.

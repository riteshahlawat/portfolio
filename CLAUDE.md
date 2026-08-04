# CLAUDE.md

Personal portfolio/blog ("The Stacks") at ahlawat.dev. Next.js App Router +
Tailwind v4 + contentlayer2 + motion/Lenis + Turso view counts.

**Read [DESIGN.md](DESIGN.md) before any UI or copy change.** It defines
tokens, type roles, motion rules, copy tone (lowercase UI, no em dashes),
and the egg system. High-fidelity theme; don't freelance colors or fonts.

## Commands

- `pnpm dev` — contentlayer watch + next dev (:3000). The owner usually
  has this running already; don't kill port 3000.
- `pnpm build` / `pnpm lint` / `pnpm typecheck`
- Always run lint + typecheck after changes; eslint is strict
  (react-hooks/set-state-in-effect, refs-in-render, nullish coalescing).

## Architecture

- Posts: `blogs/*.md` via contentlayer2 (`contentlayer.config.ts` defines
  frontmatter: title, shortTitle, date, image, description, tags,
  dropCap, quoteAccent). Slug = filename. Index nº = chronological
  position, computed, zero-padded.
- `src/app/_stacks/providers.tsx` — `StacksProvider`: eggs, cat mode,
  drawer, toast. localStorage keys: `stacks-eggs`, `stacks-cat`,
  `stacks-spoiled`. Egg definitions live in `_stacks/eggs.ts` (id, icon,
  name, hint, spoiler, href, toastLabel).
- `src/app/_components/post-markdown.tsx` — themed react-markdown
  renderer. Egg hooks (gold "El Dorado" link, dashed "here" link) are
  injected by string replacement in `blog/[slug]/page.tsx` for the
  paradise post only.
- View counts: `/api/views/[slug]` (GET read, POST increment with
  visitorId dedup, Turso). `ViewCount` client component; only post pages
  increment.
- `/blog` redirects to `/`. `/blog/000`, `/quotes`, `/el-dorado` are
  noindex. Unknown routes hit `not-found.tsx` (grants the 404 egg).

## Gotchas (violating these breaks things silently)

1. Page bg lives on `html` only. A `body` background paints over the
   negative-z cat backdrop.
2. Fixed-position overlays must portal to `document.body` (`ImageLightbox`
   does). Transformed ancestors (rotated polaroid) break `fixed`.
3. Overlay backdrops ignore clicks for 350ms after opening (mobile tap's
   synthesized click would close them instantly).
4. `grant()` in providers merges with localStorage directly because child
   effects can grant before the provider hydrates. Keep it that way.
5. Markdown h1–h6 must render as real heading elements; the drop cap CSS
   targets `.post-dropcap > p:first-of-type`.
6. Bookshelf spines are hashed from slug — never hardcode books; adding a
   post must require zero code changes.
7. All motion respects `prefers-reduced-motion` with static fallbacks.

## Newer features

- Lamp: 7/7 sets `stacks-lamp`, renders `LampGlow`, footer gains `· lit`.
- Card catalog: `/` opens fuzzy post nav (layout passes posts in).
- Book-opening transition: clicking a shelf spine animates a portal clone
  then routes after ~430ms (skipped for reduced motion / cmd-click).
- Per-post OG images: `blog/[slug]/opengraph-image.tsx` renders the same
  deterministic spine via `_components/spine-data.ts`.
- Cat mode on touch: triple-tap the footer copyright line.

## Testing changes

Verify in the browser (owner's dev server on :3000). Egg flows are easiest
to test by seeding localStorage (`stacks-eggs`, `stacks-cat`) and
reloading. `:3` toggles cat mode; Esc closes the drawer.

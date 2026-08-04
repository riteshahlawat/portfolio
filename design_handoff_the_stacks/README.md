# Handoff: "The Stacks" — ahlawat.dev redesign

## Overview
Full redesign of Ritesh Ahlawat's portfolio (currently Next.js at github.com/riteshahlawat/portfolio). Concept: **a personal library**. The homepage IS the blog — a year-grouped archive of essays with tag filters and a "start here" shelf of book spines. Secondary pages: About, three post pages, and a 7-part easter-egg hunt (including a site-wide "cat mode") tracked in localStorage.

## About the Design Files
`The Stacks.dc.html` is a **design reference prototype built in HTML** — it shows intended look and behavior, it is not production code. The task is to **recreate this design in the existing Next.js codebase** (App Router, Tailwind v4, contentlayer, existing view-count API) using the libraries below. Keep the existing content pipeline (`blogs/*.md` via contentlayer) and the existing `/api/views/[slug]` view-count system — the prototype's view numbers are mocked.

## Fidelity
**High-fidelity.** Colors, type, spacing, and copy are final unless noted. Recreate pixel-perfectly.

## Design Tokens
Colors:
- Background: `#0e0e10` (site-wide; no other page backgrounds)
- Panel / cards: `#141416`; subtle panel border: `rgba(255,255,255,.07)`
- Row dividers: `rgba(255,255,255,.06)`
- Text body: `#b5b2aa` · secondary: `#7a7770` · muted/meta: `#57544e` · near-invisible (egg links): `#2e2d31`
- Headings / emphasis: `#f2efe8` (h1) and `#e8e5dd` (titles in lists)
- Accent purple: `#8b7cf8` (links, active nav, active filter chip, egg counter number); hover-lighter `#a89bff`; code text `#c4b5fd`
- Gold (shrine/El Dorado): `#c9a55e`; deep gold `#8a6d3b`; bright gold `#e8c87a`/`#f0d38a`
- Selection: `rgba(139,124,248,.4)`
- Book spines: purple book `linear-gradient(160deg,#231c3d,#3a2d68)`, grey book `linear-gradient(160deg,#1d1d20,#2c2c31)`, gold book `linear-gradient(160deg,#1f1a15,#2e2418)`

Typography (Google Fonts via next/font):
- **Newsreader** (italic serif) — h1s, post titles in lists, blockquotes, drop caps. h1: italic 400, 38–42px, line-height 1.2. List titles: italic 400 20px.
- **Instrument Sans** — body. 15–16px / 1.8 in essays, 13–15px UI.
- **IBM Plex Mono** — all meta/labels: nav brand, dates, section labels (`letter-spacing:.14em`, 11px, uppercase), essay section headers (lowercase, 14px, purple), filter chips, footer.

Layout: max-width 1000px (library/nav/footer), 720px (post pages), 760px (about), 640px (egg pages); horizontal padding 32px. Essay measure ~65ch, 16px/1.8.

Radii: chips pill `100px`; cards 6–8px; drawer modal 14px. Shadows: modal `0 30px 80px rgba(0,0,0,.6)`; polaroid `0 6px 20px rgba(0,0,0,.5)`.

## Screens

### 1. Library (home, `/`)
- Nav (all pages): left `ritesh ahlawat` (mono 13px, `#f2efe8`, links home). Right: `library` / `about` (13px, active = purple). When cat mode is on, a pill chip `🐾 :3 on` appears (gold border, toggles off).
- Hero row (padding 64px 0 36px, space-between, baseline-end aligned): h1 italic Newsreader 42px "A library of things I couldn't say out loud." (max 20ch); right-aligned 13px `engineer @ mercury · i run aranova` — mercury plain `#c9c6bf` link to mercury.com, aranova purple underlined link to https://aranova.io/.
- Filter chips (mono 12px pills): `all · N`, `philosophy`, `practical` (derive tags from frontmatter). Active: purple bg, `#0e0e10` text. Inactive: transparent, `#a5a29a` text, `rgba(255,255,255,.14)` border. Filtering is instant client-side.
- Archive: grouped by year (label = mono 11px `#57544e`, tracking .14em). Row: flex baseline, gap 16px, padding 16px 0, bottom divider — `idx` (mono 12px, zero-padded, width 36px) · title (italic Newsreader 20px `#e8e5dd`, flex 1) · tag (11.5px purple) · `date · views` (mono 12px, right-aligned, nowrap). Row hover: `background:rgba(139,124,248,.05)`. Entire row clicks to post.
- "START HERE — THE SHELF": 3 book spines (staggered heights 200/172/184px, flex-end aligned, gap 14px, max 760px) + one thin **untitled spine** (46px wide, dashed purple border, vertical text "untitled") → routes to `/quotes` (egg #2). Book hover: `translateY(-6px)` (spring). Cat mode adds a 🐈‍⬛ sitting at the shelf end.
- Footer (all pages): left `© mmxxvi · built at night`; right `🥚 N/7 found` (opens the drawer).

### 2. Post pages (`/blog/[slug]`)
- Breadcrumb: `library / nº 003` (mono 12px).
- h1 italic Newsreader 38px; meta row `date · N min · N views` 12.5px `#7a7770` with `·` separators in `#3a3a3e`.
- Body: 16px/1.8 `#b5b2aa`. Section headers = lowercase mono 14px purple (matches the markdown `##` style). Drop cap on first paragraph: italic Newsreader 58px `#f2efe8`, float left.
- Blockquotes: 2px left border (`rgba(139,124,248,.5)`, or full purple for the Berserk quote; gold `rgba(201,165,94,.5)` in the quotes post), italic Newsreader 17–19px `#d6d3cd`, attribution as mono 11px `#57544e` block below.
- Bottom nav: divider, then prev/next links 13px `#7a7770`, hover purple.
- **Egg hooks in content** (implement as MDX components or rehype transforms):
  - In the paradise post, the words "El Dorado" in "El Dorado is not real." render gold (`#c9a55e`) and link to `/el-dorado` (egg #4).
  - Final word "here" in "…build here?" gets `border-bottom:1px dashed rgba(139,124,248,.5)` and links to `/here` → 404 (egg #6).
  - On post nº 001 only, the prev slot reads "← there is nothing before the first post" in `#2e2d31` (near-invisible; hover `#57544e`) → `/blog/000` (egg #5).
- Wire real view counts to the existing `/api/views/[slug]`.

### 3. About (`/about`)
- `about` label (mono purple) + h1 "hi, i'm ritesh."
- Two-col: copy (see prototype for exact text — mentions Mercury, Commure, Aranova link, Toronto→Bay, oly lifting, chess, cats) + **polaroid** (170px, rotate 2deg, dark frame `#1a1a1d`, caption "somewhere warm, after dark", photo = `uploads/DSC06419.jpg`). Press-and-hold ~850ms flips it (3D flip, see Animations) to a paper back reading "for the plot. — r, 2026" (egg #7).
- EXPERIENCE: rows `dates (mono, 118px) | role · company (600, #e8e5dd) + bullets (13px #8f8c85)`. Full bullet text is in the prototype (Mercury, Commure ×3, BlueCat, TMU, interns).
- "BUILT ALONG THE WAY" one-liner (Thia AI + this site), then social text links (github / linkedin / instagram), hover purple.

### 4. Egg pages
- `/quotes` (shrine): centered flickering 🕯️ (click = blow out: candle greys, quote list dims to opacity .25, line "some things you keep lit." appears; relights after ~2.6s — egg #3), label `THE SHRINE · 2022` (gold, tracking .3em), 5 quotes as gold-left-border blocks (first bright gold + `#e8e5dd`, rest 40%-gold border + `#c9c6bf`).
- `/el-dorado`: twinkling gold starfield (see Animations), `YOU FOUND IT` (mono, tracking .35em, `#8a6d3b`), h1 "El Dorado" italic Newsreader 58px with animated gold gradient shimmer, `POPULATION: YOU` (cat mode: `YOU + 1 CAT`), short copy block, exit line "close the map. go build something. →".
- `/blog/000` (unlisted): `ENTRY Nº 000 — UNLISTED`, h1 "the post before the first post", note card (`#141416`, italic Newsreader 16px/1.9) with the note-to-self copy, footer "arrays start at zero. so did i."
- 404 (`not-found.tsx`): ghost "404" (italic Newsreader 120px `#1c1c1f`), h1 "there is no page for you to escape to.", two short paragraphs, "← go home". This is a real page, not an error screen — any unknown route lands here (egg #6 grants on visit).

### 5. The Drawer (egg tracker overlay)
Click the footer 🥚 counter → modal (520px, `#141416`, purple border 25%, backdrop `rgba(8,8,10,.78)` + blur 3px; closes on backdrop click or Esc). Header `THE DRAWER · N/7` (gold mono) + `esc ✕`. Seven rows: icon (unfound = ❓ at 35% opacity) · name (found: `#c4b5fd`; unfound: `???` in `#3a3a3e`) · hint (italic 12px `#57544e`, always shown). When 7/7: shimmer-gold line "all seven. the lamp is yours, night owl." Bottom-right: tiny "reset the hunt" (`#3a3a3e`, hover purple) clears storage.

## The Egg System
localStorage keys: `stacks-eggs` = `{"cat":true,...}`, `stacks-cat` = `"1"|"0"`.
IDs + triggers: `cat` (toggle cat mode) · `shrine` (visit /quotes) · `candle` (blow out candle) · `eldorado` (visit /el-dorado) · `zero` (visit /blog/000) · `notfound` (hit 404) · `polaroid` (hold photo). Granting an egg fires a **toast**: bottom-center pill (`#1c1a26`, purple border, mono 12.5px) reading `🥚 N/7 found — <name>`, auto-dismiss 3.2s. Implement as a small context/provider (`EggProvider`) so any page can grant; grant is idempotent.

## Cat Mode (site-wide)
Triggers: typing `:3` anywhere, or the Konami code (↑↑↓↓←→←→BA). Toggle + persist (`stacks-cat`); grants egg `cat` on first activation.
Effects while on: document.title → `ritesh ahlawat :3`; nav brand, home h1, footer, view counts, and about "cats" line get a ` :3` suffix; nav shows the `🐾 :3 on` chip (click = off); 🐈‍⬛ appears on the shelf; El Dorado population changes; **paw trail**: on mousemove, spawn a 🐾 (13px, random ±30° rotation) at the cursor every ~72px of travel, fading out over 0.9s (`opacity .8→0, scale 1→.6, translateY -6px`). Render paws into a fixed portal layer, `pointer-events:none`, cleanup after 950ms. Skip on touch devices / `prefers-reduced-motion`.

## Interactions & Animations (Framer Motion + Lenis)
Stack: `framer-motion` (aka `motion`), `lenis` (smooth scroll). Lottie **not required** — nothing in this design needs it; the candle/paws/shimmer are cheaper as CSS/JS. Add it only if a custom cat animation is wanted later.

- **Lenis**: root smooth scroll, `lerp: 0.1`, respect `prefers-reduced-motion` (disable). Anchor scrolls duration 0.8, easeOutQuart.
- **Page transitions**: wrap routes in `AnimatePresence`; enter = `opacity 0→1, y 10→0`, 0.4s, `[0.22,1,0.36,1]` (prototype's `fadeUp`). Exit = opacity 0, 0.15s.
- **Library rows**: stagger-in on first load (`staggerChildren: 0.04`, same fadeUp). Filter changes animate with `layout` on rows + `AnimatePresence` for removed rows (exit opacity/height).
- **Filter chips**: active pill background can be a shared `layoutId="chip"` element sliding between chips.
- **Book spines**: `whileHover={{ y: -6 }}` spring `{ stiffness: 400, damping: 24 }`; untitled spine border-color transition to purple.
- **Polaroid flip**: `rotateY 0→180` 0.5s with `transformPerspective: 800`; front/back faces `backface-visibility:hidden`. Hold detection: pointerdown + 850ms timer, cancel on pointerup/leave; flip back 1.8s after release.
- **Candle**: CSS `flicker` keyframes (scale 1→1.1→.92, rotate ±2°, 1.6s infinite). Blow-out: grayscale+brightness(.5) on the glyph, quotes wrapper animates to opacity .25 (0.4s), relight after 2.6s reverses.
- **El Dorado shimmer**: text gradient `90deg #8a6d3b→#f0d38a→#8a6d3b`, `background-size:200%`, background-position 0→200% loop 4s linear (CSS). Starfield: layered radial-gradients, whole layer `opacity .35↔1` 3.5s ease-in-out infinite.
- **Toast**: `y 14→0, opacity 0→1` 0.3s; exit fade.
- **Drawer modal**: backdrop fade + panel fadeUp 0.25s.
- **Post reading**: optional `scaleX` reading-progress bar (2px, purple, fixed top) via `useScroll` — tasteful addition, matches system.
- Respect `prefers-reduced-motion` globally (Framer's `useReducedMotion`): drop paw trail, stagger, and smooth scroll.

## State Management
- `EggProvider` (context): `{eggs, grant(id), reset()}`, hydrate from localStorage on mount (render 0/7 SSR-safe, then hydrate).
- `CatModeProvider`: `{on, toggle}` + global key listener (`:3` buffer of last 2 printable keys; 10-key Konami buffer). Esc closes the drawer.
- Local state: `filter` (library), `drawerOpen`, `candleOut`, `polaroidBack`, `toast`.
- Data: posts from contentlayer (`title, date, tags, readTimeMinutes, slug`), index number = chronological position (001-based, zero-padded). Views: existing API.

## Routes (Next.js App Router)
`/` library · `/blog/[slug]` posts · `/blog/000` unlisted note (exclude from the library list & sitemap, `robots: noindex`) · `/about` · `/quotes` · `/el-dorado` · `not-found.tsx` for everything else. Keep old `/blog` URL redirecting to `/`. Add `noindex` to egg pages.

## Assets
- `uploads/DSC06419.jpg` — the about-page polaroid photo (crop/quality as-is; it's meant to look candid).
- Existing repo images: `public/images/blog/*` (post covers stay for OG images; the library list is text-only by design).
- No icon library needed; the few glyphs are emoji by design (🥚 🐾 🕯️ 🐈‍⬛ ❓).

## Files in this bundle
- `The Stacks.dc.html` — the full working prototype (single-file: template + logic). Open in a browser; hash routes (`#/`, `#/post/paradise`, `#/about`, `#/quotes`, `#/el-dorado`, `#/000`, anything else → 404).
- `DSC06419.jpg` — about-page photo.

## Notes / open items
- View counts in the prototype are mocked (2.4k / 11.2k / 1.9k) — wire real ones.
- The TN-visa and quotes posts are excerpted in the prototype; migrate full markdown as-is.
- Entry 000's note copy is a draft in Ritesh's voice — he may want to rewrite it.
- The 7/7 reward is currently just the drawer line; a future idea (not built): persistent gold accent for finishers.

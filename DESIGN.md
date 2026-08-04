# DESIGN.md — The Stacks

The design system for ahlawat.dev. Read this before touching any UI or copy.

## The concept

The site is a **personal library at night**. The homepage IS the blog — a
year-grouped archive of essays, with a bookshelf that fills as posts are
written. Everything follows from that metaphor: dark room, warm paper-toned
type, mono labels like catalog cards, small hidden things for people who
wander. It is a quiet site that rewards attention.

## Who Ritesh is (write and design for this person)

- Engineer at Mercury; previously healthcare payments at Commure. Runs
  Aranova (marketing agency) at night. Full-stack + deep learning.
- Toronto → Bay Area. Olympic weightlifting, chess, two cats.
- Core belief: **agency** — nobody hands you the life you want, you build it.
  Drawn to long feedback loops: barbells, chess, companies. Slow is fine;
  quitting is not.
- Writing is deliberate practice; he considers himself a beginner at it and
  says so. The site is self-aware, never self-important.

## Tone of copy

- **Lowercase by default** in UI chrome (nav, labels, footers, buttons,
  egg copy). Sentence case in essay/bio prose. Title case almost never.
- Plain declaratives. Short sentences. Fragments are fine.
- **No em dashes.** Use colons, periods, commas. (Strong personal
  preference — em dashes read as AI slop to him.)
- Wry, self-deprecating, never cutesy or "whimsical." One joke per surface,
  maximum. Examples of the register:
  - "maybe one day i'll be good at writing."
  - "there is nothing before the first post" (which is itself a link)
  - "disappointing." (after the user insists on spoiling the eggs)
  - "© mmxxvi · built at night"
- Never explain the joke. Never explain the eggs. Hints stay cryptic;
  the drawer's reveal flow exists for quitters and it judges them gently.
- Serious ideas get plain words: coherence, inheritance, agency. No
  motivation-poster phrasing.

## Color tokens

Backgrounds:

| Token | Value | Use |
|---|---|---|
| bg | `#0e0e10` | page background — lives on `html`, NOT `body` (see gotchas) |
| panel | `#141416` | cards, note card, drawer, modals |
| panel-borders | `rgba(255,255,255,.07)` | panel border |
| dividers | `rgba(255,255,255,.06)` | row dividers |
| inline-code bg | `#1c1c1f` | code chips |

Text:

| Token | Value | Use |
|---|---|---|
| heading | `#f2efe8` | h1s, drop caps |
| title | `#e8e5dd` | list titles, spine titles, emphasis |
| quote | `#d6d3cd` | blockquote text, riddle card |
| body (essays) | `#c6c3bb` | Literata post body |
| body (UI) | `#b5b2aa` | default body |
| secondary | `#7a7770` | meta rows, nav inactive |
| muted | `#57544e` | labels, dates, hints, captions |
| ghost | `#3a3a3e` / `#2e2d31` | near-invisible (egg links, "???") |

Accents:

| Token | Value | Use |
|---|---|---|
| purple | `#8b7cf8` | links, active nav/chip, egg counter, section headers |
| purple hover | `#a89bff` | hover state |
| purple soft | `#c4b5fd` | inline code text, found egg names |
| gold | `#c9a55e` | shrine, El Dorado, third book |
| gold deep / bright | `#8a6d3b` / `#e8c87a`–`#f0d38a` | El Dorado gradient shimmer |
| selection | `rgba(139,124,248,.4)` | ::selection |

Rule: purple is the site's voice, gold is reserved for the El Dorado /
shrine mythology. Don't mix them on one element. New accent colors only
inside the bookshelf spine palette.

## Typography

Four families, four jobs. Don't add a fifth.

| Family | Var | Job |
|---|---|---|
| Newsreader (italic serif) | `--font-serif` / `font-serif` | h1s, titles, blockquotes, drop caps, book spines. Almost always italic 400. |
| Literata | `--font-book` / `font-book` | essay body only. 17.5px / 1.75, `#c6c3bb`. |
| Instrument Sans | `--font-sans` / `font-sans` | UI prose, bio, meta rows. 13–15px. |
| IBM Plex Mono | `--font-mono` / `font-mono` | ALL labels: nav brand, dates, section labels (11px, tracking `.14em`, UPPERCASE), essay section headers (lowercase, purple), chips, footer, captions, attributions. |

Markdown heading scale (post-markdown.tsx): h1 26px serif italic · h2 17px
mono lowercase purple · h3 20px serif italic · h4 15px mono lowercase ·
h5 15.5px sans semibold · h6 12.5px mono uppercase tracked.

Blockquotes: 2px left border (purple `.5`; gold `.5` when frontmatter
`quoteAccent: gold`; solid purple for the Berserk quote), serif italic
18px. Attribution = any paragraph after the first inside a blockquote
(`> quote`, blank `>` line, `> — name`); renders 12px mono muted
automatically.

## Layout

- Max widths: 1000px (library/nav/footer), 720px (posts), 760px (about),
  640px (egg pages). Horizontal padding 32px.
- Essay measure ~65ch. Paragraph gap 22px.
- Radii: pills `100px`, cards 6–10px, drawer modal 14px, spines 3px.
- Shadows: modal `0 30px 80px rgba(0,0,0,.6)`, polaroid
  `0 6px 20px rgba(0,0,0,.5)`.

## Motion

Framer Motion (`motion/react`) + Lenis smooth scroll (`lerp: 0.1`).

- House ease: `[0.22, 1, 0.36, 1]` ("fadeUp": opacity 0→1, y 10→0, 0.4s).
- Page transitions in `template.tsx` (enter only).
- Library rows stagger 0.04s; filter changes use `layout` + exit.
- Filter chip pill slides between chips via shared `layoutId`.
- Books: hover pulls up (`y: -10`, spring 400/24) and straightens leaners.
- Reveals prefer **blur-in** (`filter: blur(...)→0`) over plain fades —
  the answer materializing is a house signature (000 riddle answer,
  drawer spoilers, lightbox).
- Sequential text: reveal word-by-word or block-by-block at reading pace
  (000 riddle writes itself in ~90ms/word).
- **Everything respects `prefers-reduced-motion`**: no paw trail, no
  parallax, no stagger, no smooth scroll, static fallbacks with content
  intact. Non-negotiable.

## The egg system

Seven eggs, tracked in localStorage (`stacks-eggs`, `stacks-cat`,
`stacks-spoiled`). Toast on grant. The drawer (footer 🥚 counter) lists
them: cryptic hints always, real names when found, spoilers only after a
six-step guilt-trip reveal ("disappointing."). Found/revealed eggs get
`visit →` / `turn on` actions.

Principles: eggs are **earned** (revealing never grants), idempotent,
SSR-safe (render 0/7 then hydrate), reset clears everything. New hidden
things should feel like marginalia in a library — a near-invisible link, a
word in the wrong color — never a banner.

Cat mode: `:3` typed anywhere or Konami code. Suffixes ` :3` onto brand,
h1, footer, view counts, cats line; paw trail follows the cursor; parallax
cat herd fills the page edges (edge-biased distribution, dimmer toward
center, three depth layers).

## Earned light

At 7/7 the lamp comes on (`stacks-lamp`): a faint warm radial from the
top-left corner and `· lit` in the footer. Reset extinguishes it ("the
lamp goes out too."). Once the shrine egg is found, the untitled spine
gets its catalog label (`the shrine · 2022`, gold).

## Components worth reusing

- `ImageLightbox` / `ExpandableImage` — click-to-expand images (portals to
  body; see gotchas).
- `PostMarkdown` — themed markdown renderer with egg hooks.
- `Bookshelf` — deterministic spines from slug hash; 8 books per shelf,
  new plank auto-renders; leaners every ~4th book.
- `ViewCount` — `compact` ("2.4k") for lists, `full` ("2,418 views") for
  posts; only post pages increment.
- `CardCatalog` — press `/` anywhere for index-card fuzzy nav.
- `BookmarkRibbon` — reading progress as a ribbon in the post gutter
  (≥1100px only).
- `CopyCitation` — copying 40+ words from an essay appends a citation.
- `spine-data.ts` — the deterministic spine hash shared by the shelf and
  the per-post OG images. Change it in one place or previews drift from
  the shelf.

## Hard-won gotchas

1. **Page background lives on `html`, never `body`.** A body background
   paints OVER negative-z fixed/absolute layers (cat backdrop). If the
   cats disappear, someone re-added a body bg.
2. **Never put `position: fixed` UI inside a transformed ancestor** (the
   rotated polaroid). Transform hijacks fixed positioning. Overlays must
   portal to `document.body` — `ImageLightbox` already does.
3. Mobile taps: a tap's synthesized `click` fires after `pointerup` and
   can land on a just-opened overlay and close it. Backdrops ignore
   clicks for ~350ms after opening.
4. Drop caps are CSS (`.post-dropcap > p:first-of-type::first-letter`) —
   markdown h2s must render as `<h2>` elements (not `<p>`) or the drop
   cap lands on the wrong element. `dropCap: false` frontmatter opts out.
5. Filter chips need `isolate` — the sliding pill is `-z-10`.
6. Egg grants can fire from child effects before the provider hydrates;
   `grant()` merges with localStorage directly. Don't "simplify" that.

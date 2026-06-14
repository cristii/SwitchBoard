# Switchboard AI Systems — Design System

The brand system for **Switchboard AI Systems**, the practice of Cristi Șatcovschi, who builds AI chatbots and automation for small businesses — assistants that answer visitor questions, qualify leads, and book calls. The product *is* a one-page marketing website whose centerpiece is a **live, working assistant in the hero** ("Don't read about my service. Chat with it.").

The visual identity is a warm **"paper & ink"** aesthetic: recycled-paper backgrounds with a faint grid and grain, deep pine-green ink, a single burnt-orange accent, hand-drawn underlines, and **hard, blur-free offset shadows**. It reads handmade and confident — a craftsperson's site, not a SaaS template.

## Sources
- **Codebase:** `switchboard/switchboard.html` — a single self-contained marketing site (attached read-only). Every token, component, and the UI kit are derived from it.
- No Figma, brand book, or decks were provided.

---

## CONTENT FUNDAMENTALS — how Switchboard writes

**Voice: first-person singular, direct, plainspoken.** Cristi speaks as "I" and addresses the reader as "you." It is personal and a little blunt — *"I build it. You scale it."* / *"It answers and books — so you don't."*

- **Tone:** confident, warm, anti-fluff. Sells outcomes (leads, booked calls), never features for their own sake. Mildly contrarian about marketing clichés (*"Why 'results' isn't just a word"*).
- **Casing:** sentence case for body and headings. UPPERCASE only for eyebrows, buttons, tags, and the footer tagline (always Bricolage, with wide tracking).
- **Punctuation:** em dashes for asides; the **↳ glyph** prefixes hand-written marginalia (*"↳ it's live — type a real question"*). Uses the `→` arrow in CTAs and flow sequences.
- **Sentence length:** short. Headlines fragment across lines for rhythm (*"Don't read / about my service. / Chat with it."*).
- **Numbers:** Euro pricing, "from €399"; honest stats only — the assistant's own system prompt says *never invent fake statistics or name specific past clients*. Sample testimonials are explicitly labelled as placeholders to swap.
- **Emoji:** none. Ever. Personality comes from the Caveat hand, the ↳ glyph, and hand-drawn underlines — not emoji.
- **Vibe words:** practical, instant, qualified, booked, "without me," "single script tag," "free demo."
- **Signature lines:** *"Don't read about my service. Chat with it." · "It build it. You scale it." · "that's the whole system."*

---

## VISUAL FOUNDATIONS

**Color.** A flat printed palette, no gradients as identity. Background is recycled paper (`#E9E8DF`) with two darker paper steps for alternating sections and wells. Text and all borders are pine ink (`#15211F`); dark bands (hero chat head, proof band, footer) use near-black `#11201E`. The lone accent is **burnt orange `#B45309`** — CTAs, links, numbers, the hand-drawn underline. Amber `#FBBF24` substitutes for the eyebrow on dark surfaces. A muted green `#3F7A4E` marks success/checks; violet appears *only* on the "Advanced" tag. Tag tints pair a ~12% wash with the saturated foreground.

**Type.** Three families, three jobs. **Bricolage Grotesque** (700–800, letter-spacing −0.02em, line-height 1.04) for all headings, eyebrows, buttons and tags — heavy and tight. **Inter** (400–600, line-height 1.55) for running text and inputs. **Caveat** for hand-written marginalia and the sticky-note. Headlines use `clamp()` and break across lines deliberately.

**Spacing & layout.** 8px base scale; 1180px max content width with 24px gutters; ~62px section rhythm. Grid-driven (`display:grid`/`gap`) two- and three-column layouts that collapse to one column under 980px.

**Backgrounds.** Never flat: the page layers a 32px faint ink **grid** (0.022 alpha) over a fractal-noise **grain** SVG over paper. Dark sections are solid ink. No photographic hero, no big gradients.

**Borders & corners.** The signature is a **1.5–2px solid ink outline** on nearly every surface. Radii: 9px (inputs/chips), 14px (cards), 18px (chat widget), 20px (pills/tags). Buttons use 2px borders and 10px radius.

**Shadows.** **Hard, zero-blur offset shadows** — solid blocks, not soft glows. Cards `4px 4px 0` ink@10%; raised `6px 6px`; the chat widget `8px 8px`; buttons `3px 3px 0` solid ink; the featured pricing plan switches to `5px 5px 0` **orange**. This is the most important and most easily-broken rule: never add blur.

**Motion.** Restrained. Buttons **lift** `translateY(-2px)` and their shadow grows on hover (120ms). Messages **pop** in (opacity + 6px rise, 250ms). Sections fade up on scroll (600ms). A typing indicator blinks. `prefers-reduced-motion` disables all of it.

**Hover / press.** Hover = lift + larger hard shadow (buttons), or color shift to orange (nav links, quick-replies, FAQ). No opacity-dimming, no scale-down press state except the play button (scale 1.08 on hover).

**Transparency & blur.** Used sparingly and deliberately: the sticky header is `rgba(paper, .82)` with `backdrop-filter: blur(6px)`; quote cards on the dark band use a 6% paper wash with a 16% paper hairline. Elsewhere surfaces are opaque.

**Imagery.** The site ships with *placeholders*, not photos — a portrait slot and a video slot, both explicitly marked "[ your photo here ]". When real imagery arrives it should feel warm and grounded, matching the paper palette. Cards are: opaque fill + ink outline + hard offset shadow + 14px radius.

---

## ICONOGRAPHY

Icons are **hand-drawn-feel line icons**: `stroke-width` ~1.7–1.8, **round line caps and joins**, no fills (except tiny dot pupils on the assistant face). They are drawn inline as SVG in the source and sit in ink by default, orange for emphasis. There is **no icon font and no third-party icon library** — the set is bespoke and small.

For this system the inline icons have been extracted to `assets/icons/*.svg`, authored with `stroke="currentColor"` so they tint via CSS. Because external SVGs loaded through `<img>` don't inherit `currentColor`, tint them with a CSS **mask** (`mask: url(icon.svg); background: var(--orange)`) — that's the pattern used throughout the cards and UI kit. Emoji and unicode-glyph icons are **not** used; the only glyphs in running text are `→` and the hand-drawn `↳`.

Available icons: `assistant, check, funnel, workflow, target, send, play, lightbulb, chart, refresh, storefront, people, cart, mail, search, calendar, screen, link`.

---

## INDEX — what's in this project

**Foundations**
- `styles.css` — the single entry point consumers link. `@import`s the four token files.
- `tokens/colors.css` · `tokens/typography.css` · `tokens/spacing.css` · `tokens/fonts.css`

**Assets** (`assets/`)
- `logo.svg` (horizontal wordmark lockup) · `mark.svg` (standalone assistant mark) · `grain.svg` (paper texture) · `icons/` (18 line icons) · `fonts/` (self-hosted woff2).

**Components** (`window.SwitchboardDesignSystem_2b7957`)
- `core/` — `Button`, `Eyebrow`, `HandUnderline`, `Badge`, `Pill`
- `surfaces/` — `Card`, `StickyNote`
- `chat/` — `ChatBubble`
- `data/` — `Stat`
- Each has a `.jsx`, `.d.ts`, `.prompt.md`, and the group's `*.card.html` specimen.

**UI kit** (`ui_kits/website/`)
- Interactive recreation of the marketing site (`index.html` + section JSX: Header, Hero, ChatWidget, Proof, Services, SampleBuilds, Process, Pricing, About, FAQ, FooterCTA). See its `README.md`.

**Template** (`templates/marketing-site/`)
- `MarketingSite.dc.html` — a copy-ready one-page landing scaffold that consumes the components via `<x-import>`; editable headings/copy, real DS primitives. Loads the system through `ds-base.js`.

**Specimen cards** (`guidelines/`) — the foundation cards shown in the Design System tab (Type, Colors, Spacing, Brand).

**Meta** — `SKILL.md` (Agent-Skill manifest for download/Claude Code use).

### Fonts note
All three families — **Bricolage Grotesque, Caveat, Inter** — are genuine Google Fonts, **self-hosted** as woff2 binaries in `assets/fonts/` (latin subset, sourced from the Fontsource distributions). `tokens/fonts.css` declares the `@font-face` rules; no CDN dependency, no visual substitution. Weights shipped: Bricolage 500/600/700/800, Inter 400/500/600, Caveat 500/600/700.

# THE GENESIS website

The website for THE GENESIS (the brand) and Genesis Art Tech (its first offering, Permanent Recognition). Domain: thegenesis.art.

## Where things are

- `index.html`: the designed homepage. Plain HTML + CSS, no build step. Open it in a browser to see it.
- `styles/tokens.css`: every colour, font, spacing and radius as CSS variables. Two themes: `data-theme="night"` (default) and `data-theme="vellum"`.
- `styles/components.css`: component classes (`g-btn`, `g-eyebrow`, `g-art`, `g-wstatus`, `g-wrecord`, `g-chip`, `g-deeper`, `g-rcard`, `g-turn`, `g-wordmark`).
- `assets/`: the emblem (light, ink, brass PNGs) and the reference artwork (Recognition 2620050a, Endless).
- `design-system/`: the rules. Read `README.md` first, then `components.md`, `1-voice.md`.
- `design-system/2-website-the-genesis.md` and `3-website-genesis-art-tech.md`: the approved copy and structure for every page. Build pages from these.
- `../THE_GENESIS_Spine_Suite/`: the source of truth behind the copy (Foundational Spine, GTM Narrative Kit, Moment Finder spec, Art Tech narrative). If copy and the spine disagree, the spine wins.

## Rules

- Use the CSS variables from `tokens.css`. Never hard-code a hex value, font or spacing in a page.
- UI is monochrome plus brass, with two manuscript pigments for named jobs only (`--rubric` on vellum, `--lapis` behind instruments). Colour otherwise belongs to the artwork. The only glow is `--glow-brass` behind the astrolabe and the seal; the only shadow is `--shadow-art`. See the README's "Timeless" section.
- One line per screen on brand pages; one primary (`g-btn--primary`) button per screen, and on the brand site it is always "Find your moment".
- Night ground for brand pages, the reveal, the witness and the collection. Vellum for the Moment Finder, manifesto and gifting.
- Copy: follow `design-system/1-voice.md`. Never write "NFT", "investment", "forever", "blockchain proves your story", "life-defining moment", "trauma", "hero". The witness attests a declaration; it never verifies the story.
- Don't redraw the emblem; use the PNGs in `assets/`.
- Pages must work at phone width (16px side gutter, no horizontal scroll) and meet WCAG AA contrast. Respect `prefers-reduced-motion`.

## Pages

`index.html` · `manifesto.html` · `deeper.html` · `begin.html` (Moment Finder) · `art-tech.html` · `witness.html` · `verify.html` (sample record) · `collection.html` · `gift.html`. Each page repeats the same header and footer markup; change all of them together.

- `styles/site.css`: page layout shared by every page (header, menu, footer, sections, reveals). `styles/ornament.css`: the timeless layer (texture, astrolabe, seal, folio, glyphs, colophon). `styles/finder.css`: the Moment Finder only.
- `scripts/site.js`: menu, ink reveals, glyph sprite, Roman-numeral dates, `Genesis.chips()`. `scripts/seed.js`: shared seeded randomness. `scripts/sky.js`: star field and astrolabe. `scripts/seal.js`: seals drawn from an ID's hash. `scripts/finder.js`: the finder flow. `scripts/endless-sketch.js`: a browser preview sketch seeded from the answers; it is a stand-in, not the Genesis engine.
- Prototype stubs: payment, the gift form and the verify lookup aren't connected. No privacy page yet.
- Preview: `python -m http.server 4173` (also in `.claude/launch.json`).

## Open decisions (ask before writing copy that depends on them)

Payment placement (preview before pay?), uniqueness definition, engine description, the reason for 2,212, physical piece, US vs UK spelling.

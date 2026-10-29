THE GENESIS recognises transformation. Its first offering, **Genesis Art Tech**, gives one transformation a form you own and a witness that can't be altered. This system is the visual and verbal language for both, built for thegenesis.art.

> **Transformation, recognised.**
> The world recognises what you built. Genesis recognises who you became.

Read this page for the rules. The further sections hold the language: **Voice and language**, **Website narrative: THE GENESIS**, **Website narrative: Genesis Art Tech**, and **The language shift** (what changes from the current site, cards and certificates).

## The idea the design carries

For most of human history, transformation came with a **rite, a mark and a witness**. Modern life kept the trophies and lost the marks. Every surface in this system plays one of those three parts:

| Part | On the site | Ground | What it looks like |
|---|---|---|---|
| **The rite** | The four turns, the Moment Finder | `vellum` for the ritual, `night` for the turns | One line, then silence. Choices before free text. |
| **The mark** | The generative artwork | Always `art-ground`, framed | The only colour on the page. |
| **The witness** | Signed, anchored, stored | `night` | Mono records, plain words, nothing decorative. |

Three design principles follow from the brand's beliefs:

1. **The frame is quiet; the art carries the colour.** UI is monochrome plus one accent, `brass`. The Endless palette (`art-verdant`, `art-cyan`, `art-violet`) lives only inside or beside artwork. Never colour a button, badge or heading with an art token.
2. **One line, then silence.** Brand pages give one thought per screen in `turn`, separated by `space-10`. Space is the rite's pause; do not fill it.
3. **Name the gap, leave it open.** THE GENESIS pages end on a question or an open line and hand over to *Find your moment*. They never resolve the feeling. Genesis Art Tech pages close it.

## Timeless: the old instruments of witness, rebuilt

The visual language joins the ancient and the modern. Three ancient tools carry the three parts of the brand, each paired with its modern counterpart:

| Ancient tool | Part | Modern counterpart | Where it appears |
|---|---|---|---|
| **The astrolabe**, which reads the sky | The rite | The scroll and the date | Home hero, the Moment Finder threshold and pause, the star field on night |
| **The manuscript**, which records in your own words | The mark | Generative art | Vellum pages: folio margins, rubric initials, sidenotes, ruled ground, the colophon |
| **The seal**, which attests | The witness | The signature hash | Verify, the witness, *Recognised.*, the manifesto sign-off, the invitation |

Three ancient worlds are blended: **sky and instruments** frame the night pages, **manuscript and inscription** shape the reading pages, and **Sanskrit** appears where the philosophy is named (*प्रत्यभिज्ञा*, the sacred thread). Every ornament must belong to one of the three tools. Nothing is decoration for its own sake.

## Two grounds, one threshold

The two themes are not "light mode / dark mode". They are two rooms.

- **Night** (`night`, the first theme): THE GENESIS brand pages, the reveal, the witness, the Founders Collection, share cards. It is the night sky the emblem's constellation sits in, and the canvas the Endless engine draws on (`surface` = `art-ground` family).
- **Vellum** (`vellum`): where the person writes: the Moment Finder, the manifesto, certificates, gift invitations, print. Warm paper, black ink, deepened brass.

**The journey moves Night → Vellum → Night.** The home page is night. Stepping into the Moment Finder turns the lights up to vellum: the person is now writing in their own hand. At the pause before the reveal the page dims back to night, and the artwork arrives as the only light. Use the theme switch as a scene change, with a slow 600ms cross-fade; never flip themes on a toggle within a page.

## Colour

- Page: `ground`. Panels and cards: `surface`. Selected and hover: `surface-raised`.
- Text: `ink` for anything a person must read; `ink-muted` for ledes and support; `ink-faint` for captions and metadata only.
- Accent: `brass` for eyebrows, dates, short 48px rules, links and focus. `brass-fill` with `on-brass` text for the **single** primary action per screen. Never white text on brass.
- Lines: `hairline` for dividers that mean nothing; `hairline-strong` for control borders.
- Witness status: `witness-valid` and `witness-pending`, always with the word (*Signed*, *Anchored*, *Stored*, *Pending*) and a mark. Colour is never the only signal.
- Art tokens: only for process diagrams (seed → process → form) and art-adjacent motifs.
- **Pigments.** Two manuscript pigments join brass, each with one job. `rubric` (vermilion) marks rubricated initials, marginal reference marks and the wax seal on vellum. `lapis` (deep sky blue) is the ground of the astrolabe and star charts, with `lapis-line` for lines drawn on it. Neither ever colours a button or a heading.
- **Seal ink.** `seal-ink` is brass on night and rubric on vellum, so a seal on paper reads as wax.
- **The one glow.** `glow-brass` is a soft radial halo behind the astrolabe and the seal, and nowhere else. No other gradients, glows or nebula backgrounds in UI.
- **Texture.** A fixed grain sits behind content at `grain-opacity`: paper fibre and faint ruling lines on vellum, star dust on night. It never sits on top of an artwork.

All text pairs above meet 4.5:1 on `ground`, `surface` and `surface-raised` in both themes. The prototype's brass `#9C7A3C` reads only 3.5:1 on cream, which is why `vellum` uses `#7A5C26` for `brass`.

## Type

Four families, each with one job:

| Family | Role | Styles |
|---|---|---|
| **Cormorant Garamond** (`display`) | The voice of the brand: the turns, titles, the wordmark | `turn`, `display-l`, `display-m`, `display-italic`, `wordmark` |
| **Lora** (`serif`) | The person's words and our explanations | `lede`, `body`, `body-s` |
| **Jost** (`label`) | Labels and actions, matching the brand card's tracked caps | `eyebrow`, `button`, `caption` |
| **IBM Plex Mono** (`mono`) | The witness: hashes, keys, IDs | `record` |
| **Cormorant SC** (`inscription`) | Carved capitals: dates in Roman numerals, running heads, turn numerals, plate and folio numbers | `inscription` |
| **Tiro Devanagari Sanskrit** (`devanagari`) | Sanskrit words in their own script, always beside the transliteration | — |

- Set display text in sentence case. The only all-caps display text is the `wordmark`.
- `eyebrow` and `button` are uppercase and tracked; keep them to four words.
- The person's own words appear in `lede` (italic), in quotation marks, never edited.
- Fonts are hosted by Google Fonts; load Cormorant Garamond 300/400/500 + italic 300/400, Cormorant SC 400/500, Tiro Devanagari Sanskrit 400, Lora 400/400 italic, Jost 400/500, IBM Plex Mono 400.
- Dates on records and reveals may be inscribed in Roman numerals (`V · V · MMXXV`) but always with the plain date beside them.
- The previous site used DM Serif Display + Inter, and the prototype Lora + Inter. Inter is retired: it is the default of every template and says nothing about a rite.

## Space, shape and light

- Spacing runs `space-1` (4px) to `space-10` (160px). Mobile gutter `space-4`; desktop `space-7`. Sections breathe with `space-8` (mobile) / `space-9` (desktop); home-page turns with `space-10`.
- Text measure: `measure-text` for prose, `measure-turn` for turns.
- Corners are nearly square, like printed card stock: `radius-xs` for buttons and chips, `radius-md` for cards, `radius-lg` for the artwork frame, `radius-xl` only for a share card's outer edge.
- No shadows except `shadow-art` beneath an artwork. Separate things with ground, hairlines and ornamental rules, not elevation.
- **Ornamental rules.** Between major sections use the *limb* (a graduated tick scale, like an astrolabe's rim) or the *orbit* (a hairline with a small orbital node at its centre). Lines are `line-hair` or `line-fine`.
- **Folio layout.** Reading pages on vellum use a wide outer margin for sidenotes, a running head, and Roman folio numbers.
- Focus: 2px solid `focus`, 3px offset, on every interactive element.

## Imagery

- **The artwork is the only picture.** No stock photography, no founders' faces, no hands holding phones, no kintsugi bowls, no planets.
- **Instruments are drawn, not pictured.** The astrolabe, star field, seal and glyphs are line drawings made in code from the emblem's geometry (circle, orbit, six nodes) in brass, lapis and hairlines. They are never illustrations, and never stand in for the artwork.
- Show artwork on `art-ground` inside a `radius-lg` frame with `shadow-art`, at full colour, never cropped into a circle, never tinted.
- Never caption a piece with what it "depicts". Caption with the title the owner gave, the date, the engine (*Endless*) and the collection.
- Use a real owner's piece only with their consent. The founder's own piece, Recognition 2620050a (*Endless*, 5 May 2025), is the reference artwork in `assets/Artwork`.

## Motion

- Slow and few: 600–1200ms, ease-out. Nothing slides in from the side. The whole motion vocabulary is four movements:
  - **Ink.** Titles and turn lines are written in from left to right (a clip wipe that sharpens from a slight blur).
  - **The sky turns.** The astrolabe's rete turns at a slow sidereal pace; the alidade follows the scroll.
  - **The thread.** A brass thread is drawn down the home page as you scroll, with a knot lit at each turn.
  - **The seal presses.** On *Recognised.* the seal settles in, once.
- The **pause** before the reveal is a designed 3–5 second stillness on night ground with a single brass hairline drawing across. Then the artwork fades up.
- Respect `prefers-reduced-motion`: cut to the end state.

## Iconography and the mark

- **The emblem** is the orbital constellation globe from the brand card: a circle crossed by orbit lines with six nodes. Use the supplied raster files only (`assets/Logos`); a vector master has not been made yet, so never redraw it.
- **The lockup** is the emblem above the `wordmark`, centred, as on the business card. Use the Wordmark component.
- Icons are rare. Witness status uses a small filled circle (confirmed) or ring (pending) beside the word. No emoji, ever.
- **Glyphs.** A small set of line glyphs (threshold, seed, seal, ending, in-between, afterwards, silence, one word, shared, thread), drawn on a 24px grid in one stroke weight. One glyph per idea, beside its eyebrow or card number.

## Components

Each component lives under *Components* with a live preview and guidelines: **Wordmark**, **Eyebrow**, **Button**, **TurnScreen**, **ChoiceChip**, **ArtworkFrame**, **RecognitionCard**, **WitnessStatus**, **WitnessRecord**, **DeeperCard**, and the timeless set: **Astrolabe**, **StarField**, **Seal**, **Folio**, **Initial**, **Sidenote**, **Colophon**, **Thread**, **InscriptionDate**, **Glyph**. They are plain HTML and CSS: link `tokens.css` and `components/bundle.css`, set `data-theme` on the root, and use the class names documented in each guideline.

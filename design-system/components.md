# Components

Plain HTML + CSS classes from `styles/components.css`. Each section: guidelines, then the reference markup.

## Wordmark

The emblem-and-name lockup, as on the brand card: the orbital constellation above THE GENESIS in tracked capitals, with the signature line beneath.

**Markup.** `<a class="g-wordmark">` containing both emblem images (`.g-emblem.g-emblem--light` and `.g-emblem.g-emblem--ink`; the theme shows the right one), `.g-wordmark__name`, and optionally `.g-wordmark__line`. Add `.g-wordmark--inline` for the header (emblem left, name right, no line).

**The consumer provides** the link target and an `aria-label` of "THE GENESIS"; the emblem images carry empty `alt`.

**Do**
- Use the stacked lockup on covers, certificates, share cards and the footer; the inline one in the header.
- Give it clear space of at least the emblem's height on every side.
- Write the name in the markup as "The Genesis"; the style uppercases it.

**Don't**
- Redraw, recolour or rotate the emblem; use only the files in `assets/Logos`.
- Set the name in another face, or untracked.
- Put the lockup on artwork or on `brass`.

```html
<div class="g-root" style="display:flex;gap:64px;align-items:center;flex-wrap:wrap">
  <a class="g-wordmark" href="#" aria-label="THE GENESIS"><img class="g-emblem g-emblem--light" src="assets/genesis-emblem-light.png" alt=""><img class="g-emblem g-emblem--ink" src="assets/genesis-emblem-ink.png" alt=""><span class="g-wordmark__name">The Genesis</span><span class="g-wordmark__line">Transformation, recognised.</span></a>
  <a class="g-wordmark g-wordmark--inline" href="#" aria-label="THE GENESIS"><img class="g-emblem g-emblem--light" src="assets/genesis-emblem-light.png" alt=""><img class="g-emblem g-emblem--ink" src="assets/genesis-emblem-ink.png" alt=""><span class="g-wordmark__name">The Genesis</span></a>
</div>
```

## Eyebrow

A short uppercase label in `brass` that names the room a title sits in, plus the 48px brass rule used to close a title block.

**Markup.** `<span class="g-eyebrow">Permanent recognition</span>` above a title; `<hr class="g-rule">` after a title block.

**The consumer provides** two to four words in sentence case; the style uppercases them.

**Do**
- Use one eyebrow per section, directly above its title, `space-2` apart.
- Use it to say which house speaks: *Genesis Art Tech*, *The witness*, *Recognise someone*.

**Don't**
- Stack two eyebrows, or use one as a button.
- Use the rule as a divider between paragraphs; use `hairline` for that.

```html
<div class="g-root">
  <span class="g-eyebrow">Permanent recognition</span>
  <div class="display-l" style="margin:0">Your transformation, given a form you own.</div>
  <hr class="g-rule">
</div>
```

## Button

Actions. **Primary** (`.g-btn--primary`, `brass-fill` with `on-brass` text) is for the one action a screen exists for; **Quiet** (`.g-btn--quiet`) for secondary paths; **Link** (`.g-btn--link`, brass with an arrow) for go-deeper links.

**Markup.** `<a class="g-btn g-btn--primary">` or `<button class="g-btn …">`; an optional `.g-btn__note` beneath for microcopy.

**The consumer provides** the label in sentence case (uppercased by the style) and the target.

**Do**
- Use exactly one primary per screen. On the brand site it is always *Find your moment*.
- Put reassurance under it in `.g-btn__note`, not inside it.
- Keep the 48px minimum height for touch.

**Don't**
- Write *Buy now*, *Create yours*, *Claim*, *Unlock* or *Mint*.
- Put white text on brass, or colour a button with an art token.
- Use a primary button inside the four turns before the handoff screen.

```html
<div class="g-root" style="display:flex;gap:32px;flex-wrap:wrap;align-items:flex-start">
  <div><a class="g-btn g-btn--primary" href="#">Find your moment</a><span class="g-btn__note">Four small choices. About five minutes.</span></div>
  <a class="g-btn g-btn--quiet" href="#">The witness</a>
  <a class="g-btn g-btn--link" href="#">Why it begins with an ending</a>
  <button class="g-btn g-btn--quiet" disabled>Continue</button>
</div>
```

## TurnScreen

One screen of the home page's four turns: a single line in `turn`, an optional italic lede, and an optional go-deeper link.

**Markup.** `<section class="g-turn">` with `<p class="g-turn__line">` (add `.g-turn__line--soft` for a quieter answering line), optional `<p class="g-turn__lede">`, optional `<div class="g-turn__deeper">` holding a `.g-btn--link`.

**The consumer provides** the line (≤14 words) from *Website narrative: THE GENESIS*, and controls the scroll reveal (fade in, 700ms, ease-out; reduced motion shows it at once).

**Do**
- Separate turns by `space-10`. Let one turn fill most of a viewport.
- End the sequence on the handoff: *Only you can name yours.* and the primary button.
- Keep night ground for the whole sequence.

**Don't**
- Show artwork, prices or product names before the handoff.
- Put two turn lines on one screen, or resolve the feeling (*You deserve this*).

```html
<div class="g-root">
  <section class="g-turn" style="padding:24px 0 56px">
    <p class="g-turn__line">Every transformation begins with something ending.</p>
    <p class="g-turn__lede">A role. A belief. A version of you.</p>
    <div class="g-turn__deeper"><a class="g-btn g-btn--link" href="#">Why it begins with an ending</a></div>
  </section>
</div>
```

## ChoiceChip

A selectable answer in the Moment Finder. Choices come before free text, so nobody faces a blank page.

**Markup.** A `<div class="g-chips" role="group" aria-label="…">` of `<button class="g-chip" aria-pressed="false">`. Add `data-multi` to the group for multi-select. Call `Genesis.chips()` once to wire selection, or manage `aria-pressed` yourself.

**The consumer provides** four to six options written as plain nouns from the Moment Finder spec, plus *Something else*, which opens a text field.

**Do**
- Use on vellum ground, one question per screen.
- Keep the selected state's dot and brass border: the state is never colour alone.

**Don't**
- Offer options about pain (*trauma*, *loss of everything*), or pre-fill a choice for a gift recipient.
- Use chips for navigation.

```html
<div class="g-root">
  <span class="g-eyebrow">What ended?</span>
  <div class="display-m" style="margin:0 0 24px">Something had to end. What was it?</div>
  <div class="g-chips" role="group" aria-label="What ended">
    <button class="g-chip" aria-pressed="true">A role I held</button>
    <button class="g-chip" aria-pressed="false">A belief about myself</button>
    <button class="g-chip" aria-pressed="false">A place I called home</button>
    <button class="g-chip" aria-pressed="false">A relationship</button>
    <button class="g-chip" aria-pressed="false">Something else</button>
  </div>
</div>
<script>window.Genesis && window.Genesis.chips();</script>
```

## ArtworkFrame

How a generative artwork is shown: on `art-ground`, in a `radius-lg` frame with the one shadow in the system, `shadow-art`, and a caption of facts only.

**Markup.** `<figure class="g-art">` with `<span class="g-art__frame"><img …></span>` and `<figcaption class="g-art__cap">` holding an optional `.g-art__title`.

**The consumer provides** the image, a descriptive `alt` that describes the forms (not their "meaning"), and the caption: the owner's title, the date it ended, the engine, the collection.

**Do**
- Show the piece whole and square, at full colour. It is the only colour on the page.
- Use only real owners' pieces, with consent.

**Don't**
- Crop to a circle, tint, blur into a background, or overlay text.
- Caption with what the art "depicts" or "captures".

```html
<div class="g-root">
  <figure class="g-art" style="width:300px">
    <span class="g-art__frame"><img src="assets/endless-2620050a.jpg" alt="Endless artwork for Recognition 2620050a: dense pale-green, cyan and violet filaments forming a rotated square around a small central ring"></span>
    <figcaption class="g-art__cap"><span class="g-art__title">The day I took the risk that changed my life</span>5 May 2025 · Endless · Open Collection</figcaption>
  </figure>
</div>
```

## RecognitionCard

The owner's share card: what someone posts or prints after *Recognised.* It is always night, whatever the page around it.

**Markup.** `<article class="g-rcard">` inside an element with `data-theme="night"`: eyebrow *Recognised*, `.g-rcard__title`, `.g-rcard__date`, an `.g-art__frame`, `.g-rcard__note`, `.g-rcard__sig`, `.g-rcard__line`. A QR for the verify page may follow the note, on a white tile with its quiet zone intact.

**The consumer provides** the owner's own title (unedited), the date it ended and the artwork. The story is shown only if the owner chose *The full story*.

**Do**
- Offer three sharing levels: art only, art and title, the full story. Nothing posts automatically.
- Keep the note to *Made from the day something ended.*

**Don't**
- Write the owner's meaning for them, or add *life-defining moment*.
- Add prices, collection rank or "only N left".

```html
<div class="g-root" data-theme="night" style="display:flex;justify-content:center">
  <article class="g-rcard">
    <span class="g-eyebrow" style="margin:0">Recognised</span>
    <h2 class="g-rcard__title">The day I took the risk that changed my life</h2>
    <div class="g-rcard__date">5 May 2025</div>
    <span class="g-art__frame"><img src="assets/endless-2620050a.jpg" alt="Endless artwork for Recognition 2620050a"></span>
    <p class="g-rcard__note">Made from the day something ended.</p>
    <div class="g-rcard__sig">The Genesis</div>
    <div class="g-rcard__line">Transformation, recognised.</div>
  </article>
</div>
```

## WitnessStatus

The three parts of the witness, each with its real state: **Signed**, **Anchored**, **Stored**, or **Pending**.

**Markup.** `<div class="g-wstatus" role="list">` of `<span class="g-wstatus__item" role="listitem">Signed</span>`; add `.g-wstatus__item--pending` and the word *Pending* for an unconfirmed proof; an optional `.g-wstatus__sub` names the mechanism.

**The consumer provides** each proof's actual state from the record. Show what is true for this record, not what is usually true.

**Do**
- Always pair the dot or ring with the word; colour is never the only signal.
- Link the row to `/witness` for what each part proves and doesn't.

**Don't**
- Say *Verified*, *Authenticated*, *VALID* or *Bitcoin-verified*.
- Show *Anchored* before the OpenTimestamps proof is confirmed.

```html
<div class="g-root" style="display:grid;gap:20px">
  <div class="g-wstatus" role="list">
    <span class="g-wstatus__item" role="listitem">Signed<span class="g-wstatus__sub">Ed25519</span></span>
    <span class="g-wstatus__item" role="listitem">Anchored<span class="g-wstatus__sub">Bitcoin · OpenTimestamps</span></span>
    <span class="g-wstatus__item" role="listitem">Stored<span class="g-wstatus__sub">Arweave</span></span>
  </div>
  <div class="g-wstatus" role="list">
    <span class="g-wstatus__item" role="listitem">Signed</span>
    <span class="g-wstatus__item g-wstatus__item--pending" role="listitem">Pending<span class="g-wstatus__sub">Bitcoin anchor awaiting confirmation</span></span>
    <span class="g-wstatus__item" role="listitem">Stored</span>
  </div>
</div>
```

## WitnessRecord

The public record on a verify page: labelled rows in plain words, identifiers in mono, and the honesty line at the foot.

**Markup.** `<dl class="g-wrecord">` of `<div class="g-wrecord__row"><dt>…</dt><dd>…</dd></div>`; add `.g-mono` to a `dd` holding a hash, key or ID; close with `<p class="g-wrecord__foot">`.

**The consumer provides** the record's fields, in this order: Recognition ID, The day it ended, Engine & collection, Recognised by, Declared on, then signature, Bitcoin and Arweave references.

**Do**
- Use the labels from *The language shift*.
- Always include the foot line.

**Don't**
- Show payment IDs or prices on a public record.
- Put the owner's private story here; only a public story, in its own section above.

```html
<div class="g-root">
  <span class="g-eyebrow">The record</span>
  <dl class="g-wrecord">
    <div class="g-wrecord__row"><dt>Recognition ID</dt><dd class="g-mono">2620050a-3eb0-42ae-b734-efa4e9855504</dd></div>
    <div class="g-wrecord__row"><dt>The day it ended</dt><dd>5 May 2025</dd></div>
    <div class="g-wrecord__row"><dt>Engine &amp; collection</dt><dd>Endless · Open Collection</dd></div>
    <div class="g-wrecord__row"><dt>Recognised by</dt><dd>Praveen Shahi</dd></div>
    <div class="g-wrecord__row"><dt>Stored on Arweave</dt><dd class="g-mono">GFo2R9YkaAO5Pmetp0-6L54GVO20-1jwzncNhDjGgzo</dd></div>
    <p class="g-wrecord__foot">A witness attests that a declaration was made. It doesn't verify the story.</p>
  </dl>
</div>
```

## DeeperCard

A Layer 2 concept card on the *Go deeper* page: one idea, two or three sentences, one source.

**Markup.** `<article class="g-deeper">` with `.g-deeper__num`, `.g-deeper__title`, `.g-deeper__body`, `.g-deeper__src`.

**The consumer provides** the card text from *Website narrative: THE GENESIS* and the source from the Foundational Spine's register.

**Do**
- Keep each card to one idea and one source.
- Link cards from the turns and the manifesto.

**Don't**
- Place cards on the purchase path (Moment Finder, checkout, *Permanent Recognition*).
- Use a card to sell; the closing line is always *Only you can name yours.*

```html
<div class="g-root">
  <article class="g-deeper">
    <div class="g-deeper__num">06</div>
    <h3 class="g-deeper__title">Two traditions, one word</h3>
    <p class="g-deeper__body">In Sanskrit, <em>pratyabhijñā</em>; in Latin, <em>re-cognoscere</em>. Both mean to know again. Kashmir Shaiva philosophy holds that the deepest realisation is recognising what was already true.</p>
    <p class="g-deeper__src">Source: Internet Encyclopedia of Philosophy, Kashmiri Shaivism</p>
  </article>
</div>
```

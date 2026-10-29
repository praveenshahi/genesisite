# Website narrative: THE GENESIS

The brand half of thegenesis.art. Its one job: **name the gap and leave it open**, then hand over to *Find your moment*. It owns arc stages 1–7 (imprint → ending → heat → in-between → new form → afterwards → recognition).

## Site architecture

One domain, two houses, one threshold between them.

| House | Page | Path | Ground | Job |
|---|---|---|---|---|
| **THE GENESIS** | Home | `/` | night | The four turns → the handoff |
| | Manifesto | `/manifesto` | vellum | The founding insight and the six beliefs |
| | Go deeper | `/deeper` | night | Eight concept cards, one idea and one source each |
| *Threshold* | Find your moment | `/begin` | vellum → night | The Moment Finder (the rite) |
| **Genesis Art Tech** | Permanent Recognition | `/art-tech` | night | The offering, the mark, the price |
| | The witness | `/witness` | night | Provenance in plain words |
| | The Founders Collection | `/collection` | night | The first 2,212, shown with consent |
| | Recognise someone | `/gift` | vellum | Invitations for firms and people |
| | Verify | `/verify/:id` | night | Each recognition's public record |

**Navigation** (top, `caption`, `ink-muted`): emblem + wordmark at left; *Manifesto · Permanent Recognition · The witness · Recognise someone* at right; one brass `Find your moment` button. On mobile: emblem, then a single menu. Never a cart icon.

**Footer** (night, `caption`): *THE GENESIS. Transformation, recognised.* · Manifesto · Go deeper · Verify a recognition · Privacy · © Genesis Art Tech, Inc.

## Home: the four turns

One line per screen. No product imagery and no artwork until the handoff. Every line set in `turn` on night ground, centred left at `measure-turn`, with `space-10` between. Go-deeper links are `caption` in `brass`, arriving one beat after their line.

> **Screen 1** · `turn`
> You can tell anyone what you built.

> **Screen 2** · `turn`, `ink-muted`
> Can you tell them who you became?

> **Screen 3 — Turn 1: it begins with an ending** · `turn` + `lede`
> Every transformation begins with something ending.
> *A role. A belief. A version of you.*
> → Why it begins with an ending

> **Screen 4 — the in-between** · `display-l`
> Then a stretch where you're no longer who you were, and not yet who you'd be.

> **Screen 5 — Turn 2: only afterwards** · `turn`
> You only see it afterwards.
> *By then, no one thinks to ask. Often not even you.*
> → Why you can't see it until after

> **Screen 6** · `display-m`, `ink-muted`
> Most people who go through it tell almost no one.

> **Screen 7 — the founding insight** · `eyebrow` + `display-l`
> FOR THOUSANDS OF YEARS
> Transformation came with a rite, a mark and a witness.
> Modern life kept the trophies and lost the marks.
> → What every civilisation knew

> **Screen 8 — Turn 3: recognition** · `display-italic`
> There is an old word for what completes it.
> *Recognition: to know again what was already true.*
> → Two traditions, one word

> **Screen 9 — the handoff** · `display-l` + Button
> Only you can name yours.
> **[ Find your moment ]**
> *Four small choices. About five minutes.* ¹

¹ Add *"You'll see it before you decide."* only if the tested flow shows the piece before payment.

**After the handoff, for those who scroll on** (first artwork appears here, in an ArtworkFrame):

> EYEBROW: GENESIS ART TECH
> ## A form you own. A witness that can't be altered.
> Name what ended and what emerged, in your own words. The Genesis engine makes an artwork from the day it ended, your words and a unique seed. Genesis signs the record, anchors it to Bitcoin and stores it on Arweave.
> [ Permanent Recognition ] [ The witness ] [ The Founders Collection ]

**Page metadata.** Title: *THE GENESIS — Transformation, recognised.* Description: *The world recognises what you built. Genesis recognises who you became, and gives you something to own that only you could have earned.*

## Manifesto

Vellum ground. `display-l` title, `body` paragraphs at `measure-text`, beliefs as a numbered list in `display-m` numerals (`brass`) with `body` text.

> # The world sees what you built. Few ever see who you became.
>
> Every transformation begins with something ending. Then comes the heat, the doubt, the stretch where you're no longer who you were and not yet who you'd be. You only see it afterwards, and by then, no one thinks to ask.
>
> For thousands of years, people marked these crossings with a rite, a mark and a witness. A second birth was marked with a thread worn next to the skin. A community stood witness.
>
> Modern life kept the trophies — the rings, the diplomas, the medals — and lost the marks for the change inside.
>
> We're bringing them back.
>
> **What we believe**
> 1. Every transformation begins with an ending.
> 2. You only see it afterwards, so it is rarely named.
> 3. The cost is part of the meaning.
> 4. Only you can name your transformation. We witness it; we never judge or author it.
> 5. Recognition is knowing again what was already true.
> 6. The personal can be shared without being exposed.
>
> **Why we exist.** To restore what modern life lost: a mark and a witness for the transformations that make us who we are.
>
> **Where we're going.** A world where who people become is honoured as surely as what they achieve.
>
> THE GENESIS. Transformation, recognised.
>
> [ Find your moment ]

## Go deeper

Night ground, a grid of DeeperCards (one column on mobile, two on desktop). Intro: *For the curious and the sceptical. One idea, one source each.* Cards, in order:

1. **What every civilisation knew** — the sacred thread of the twice-born; rites of passage; the modern "liminoid". *Dvija; Turner.*
2. **Why it begins with an ending** — Bridges: every transition starts with letting go. *Bridges, What Is Transition?*
3. **The in-between** — no longer, not yet: where the change actually happens. *van Gennep; Turner.*
4. **Why you can't see it until after** — L. A. Paul's transformative experiences; *metanoia* as afterthought. *L. A. Paul; Etymonline.*
5. **The silent transformations** — people who changed most told almost no one. *Miller & C'de Baca.*
6. **Two traditions, one word** — *re-cognoscere* and *pratyabhijñā*: to know again. *IEP, Kashmiri Shaivism.*
7. **Why generative art** — the oil is already in the seed; a seed unfolds into a form no one could see in advance. *Sāṃkhya.*
8. **Shared without being exposed** — *sādhāraṇīkaraṇa*: the form can be seen while the story stays yours. *Abhinavagupta on rasa.*

Each card ends with the handoff line, never a sales line: *Only you can name yours.*

## Find your moment (the threshold)

The Moment Finder is specified in its own document. The design system's part:

- **Screen 0, Threshold** (night, fading to vellum): *This isn't about what you built. It's about who you became.* [ Begin ]
- **Screens 1–6** (vellum): one question per screen in `display-m`; ChoiceChips before any free text; progress as a thin brass line, never a percentage. Questions: *What ended?* · *The in-between (optional)* · *What emerged?* · *When did it end?* · *In your own words* · *Private or shared*.
- **Screen 7, the pause** (fade to night): no words for three seconds, then *Recognising.* in `caption`.
- **Screen 8, the reveal** (night): the artwork alone, then the title and date. The page's only colour arrives here.
- **Screens 9–11** hand over to Genesis Art Tech language: the witness, the price, *Recognised.*

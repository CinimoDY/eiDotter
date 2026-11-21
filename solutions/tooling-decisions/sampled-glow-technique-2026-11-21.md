---
title: "Sampled glow on the web: SVG filter on the html element (spike and decision record)"
date: 2026-11-21
category: tooling-decisions
module: RetroEffects
problem_type: design_decision
component: RetroEffects
severity: medium
applies_when:
  - "Choosing or changing how RetroEffects glowMode=\"sampled\" draws the phosphor glow"
  - "A site considers opting in to the sampled glow"
  - "Any filter or backdrop-filter is proposed on a page container"
tags: [retroeffects, glow, svg-filter, backdrop-filter, performance, dmnc-1643]
---

# Sampled glow on the web: spike and decision record (DMNC-1643, PR B)

**For:** Dom (gate G2, the glow technique). **Date:** 2026-11-21. **Status:** prepared, not waited on: the pick below is built as an opt-in (`RetroEffects glowMode="sampled"`, default off), so choosing another candidate later changes one component and one CSS rule, not any consumer.

## The question

Dom's principle (2026-11-20): glow is sampled per pixel from the rendered picture wherever the platform allows. The DOS-86 terminal theme's shader does it by sampling a ring of pixels around every pixel at two radii (tight 1.6px at 0.35, halation 4.5px at 0.22) and adding the result to the picture. A web page cannot read its own rendered pixels from script or canvas, so the candidates are the mechanisms the browser itself applies to rendered content.

## The three candidates

| | Candidate | How |
|---|---|---|
| A | SVG filter on the page | `<filter>`: `feGaussianBlur` at 1.6 and at 4.5, each scaled by its strength (`feComponentTransfer`), each screened back over the source (`feBlend mode="screen"`). Applied with `filter: url(#...)`. Tried on the html element (A) and on body (A-body) |
| B | Fixed overlay with `backdrop-filter` | Two full-viewport fixed layers, `backdrop-filter: blur(1.6px)` and `blur(4.5px)`, `mix-blend-mode: screen`, opacity 0.35 and 0.22, `pointer-events: none` |
| C | Per-element `text-shadow`, retuned (baseline) | Every element: `text-shadow: 0 0 3.2px color-mix(in srgb, currentColor 35%, transparent), 0 0 9px color-mix(in srgb, currentColor 22%, transparent)` (a text-shadow blur is two standard deviations, so 3.2px and 9px match the 1.6 and 4.5 of A and B) |

All candidates ran over `RetroEffects preset="long-reading"` (scanlines, grille, vignette), in Storybook only, on two pages: a long text page (160 paragraphs in the body face, a heading every ten, about 25 screens at 1440 wide) and a dense component page (Cards, Buttons, Badges, Alert, Input, Checkbox, a `position: fixed` status bar, and buttons that open DosDialog, Lightbox and CmdPalette).

## Method

- **Browser:** Chromium 148 (Playwright). WebKit is not installed in this environment, so **Safari was not measured**. Firefox was not measured.
- **Rasteriser:** the only GL available was SwiftShader (software), headless and in a headed window alike. Every scroll number below is therefore a software-raster number. It shows the relative cost class reliably; absolute frame rates on a machine with GPU rasterisation will be much better for all candidates. **Needs confirmation on real hardware** (Chrome and Safari on a Mac, a phone).
- **Captures:** 390x844 and 1440x900, both pages, every candidate. Kept local, not committed.
- **Text sharpness:** luminance measured on a crop of the first paragraph and of the h1 at 1440, against the no-glow capture of the same layout. Edge energy = mean luminance gradient (lower is softer). Glyph core = mean luminance of the pixels that are text in the no-glow capture. Halo = mean luminance of ground pixels within 3px of a glyph.
- **Scroll:** on the long page at 1440x900, a `requestAnimationFrame` loop scrolls 12px per frame for 5 seconds; frames dropped = sum over frame intervals of (round(interval / 16.7ms) - 1). Three runs each.
- **What breaks:** on the dense page, scrolled 400px, at 390 and 1440: is the fixed bar still at the viewport bottom; does `elementFromPoint` at a button's centre hit the button; is the focus ring drawn (2px outline, `:focus-visible`); do DosDialog, Lightbox and CmdPalette open inside the viewport with their controls hit-testable and focus inside, close on Escape; does a real mouse click on the dialog's OK button close it.

## Results

### Text sharpness (1440, first paragraph; h1 in brackets)

| | Edge energy vs no glow | Glyph core luminance | Halo luminance | Reading |
|---|---|---|---|---|
| No glow | 1.00 | 0.415 (0.477) | 0.0023 (0.0018) | reference |
| A, SVG filter on html | **1.04** (1.05) | 0.430 (0.504) | 0.0040 (0.0038) | sharp; glyph cores slightly brighter, soft light around them |
| A-body, SVG filter on body | 1.03 (1.02) | 0.424 (0.489) | 0.0039 (0.0037) | same look as A |
| B, backdrop-filter overlay | **0.44** (0.58) | **0.176** (0.273) | 0.0071 (0.0096) | **fails**: text visibly dimmer and softer |
| C, text-shadow retuned | 1.04 (0.99) | 0.424 (0.477) | 0.0066 (0.0095) | sharp; a wider, stronger halo around text only |

B fails because Chromium does not screen the backdrop-filtered layer over the page: the blurred copy is mixed in at the layer's opacity, so it replaces part of the sharp text instead of adding light. Text contrast against its surroundings fell from 8.9:1 to 4.0:1 in the measured crop.

### Scroll performance (long page, 1440x900, 5 s scripted scroll, frames dropped / frames drawn, three runs)

| | Headless, software raster | Headed window, software raster |
|---|---|---|
| No glow | 26/277, 66/236, 57/245 | 28/274, 33/268, 34/268 |
| A, SVG filter on html | **253/54, 246/57, 251/52** | **235/67, 234/69, 236/66** |
| A-body | 263/44, 263/36, 267/35 | not run (breaks fixed positioning) |
| B, backdrop-filter | 266/39, 265/36, 270/31 | 254/50, 251/53, 254/51 |
| C, text-shadow | 47/255, 45/257, 31/271 | 26/276, 39/263, 64/238 |

The shipped implementation of A, measured again from the component itself: 249/54, 250/53, 248/54 (no glow in the same run: 41/261, 41/261, 26/276). In software, A runs at about a fifth of the frame rate (p95 frame 117-133ms against 33ms). C costs nothing measurable.

### What breaks (390 and 1440, page scrolled 400px)

| | Fixed bar | Hit-testing | Focus ring | DosDialog | Lightbox | CmdPalette |
|---|---|---|---|---|---|---|
| A, html | stays | ok | drawn, glows | ok | ok | ok |
| A-body | **pinned to the document** (bottom at 2096 in a 900 viewport) | ok | drawn | **opens off-screen** (top at 1166) | **off-screen** | ok |
| B | stays | ok | drawn, dimmed like text | ok | ok | ok |
| C | stays | ok | not glowed (outline, not text) | ok | ok | ok |

- A-body shows the documented rule: a filter on any element other than the root becomes the containing block for its `position: fixed` descendants. The root element is exempt, which is why A goes on html.
- With A and B, overlays close more slowly in software raster because their exit animations run at the reduced frame rate (Lightbox Escape to closed: 540-620ms against about 300ms without glow). One check per candidate missed its 400ms window for that reason; rechecked with a longer wait, they all close.
- A also glows things C cannot: borders, focus rings, icons, images, the brand mark, all in their own colour. C glows text only, and applied globally it replaces the components' own heading glows.

### Under `dos-86` with the long-reading preset (after PR D)

The combination that is planned to become the default. The SampledGlow story (long-reading preset), `dos-86` theme, at 390 and 1440, element vs sampled: the filter applies (the ground is dark, so the light-ground off switch does not trigger), and on the first paragraph edge energy is 1.04 of the element path, glyph core luminance 0.427 vs 0.411, halo 0.0048 vs 0.0030: the same character as under `pure-amber`.

## Decision (taken on Dom's behalf, by the brief's order: sharp and readable, then nothing interactive breaks, then scroll performance)

1. **Sharp and readable:** A and C pass. B fails (text dimmed by more than half). A-body passes this one.
2. **Nothing interactive breaks:** A and C pass. A-body fails (fixed bar and dialogs pinned to the document).
3. **Scroll performance:** C is free; A is expensive in software raster.

**Pick: A, the SVG filter on the html element**, because it passes the first two and it is the only candidate that is actually sampled from the picture (C is per-element glow, the fallback the principle names). It is built opt-in and default off: `RetroEffects glowMode="sampled"`. Nothing a consumer renders changes until a site passes the prop.

**What Dom should check before any site opts in:** scroll on real hardware, Chrome and Safari, on the longest page of the site that would use it. If it stutters there, the call is C (see below), or A only on short pages.

## How the pick is built

- `glowMode?: 'element' | 'sampled'` on RetroEffects, default `'element'` (renders exactly the markup it rendered before; a test pins it).
- `sampled`: RetroEffects renders the `<filter id="eidotter-retro-glow-filter">` inside its own overlay root and, after mount, sets `data-eidotter-glow="sampled"` on the html element; `RetroEffects.css` has `:root[data-eidotter-glow="sampled"] { filter: url(#eidotter-retro-glow-filter); }`.
- Radii and strengths are tokens: `--effect-phosphor-sampled-tight-radius` 1.6px, `-tight-intensity` 0.35, `-halo-radius` 4.5px, `-halo-intensity` 0.22, also in the long-reading preset. The component reads them from its own root, so a preset on it or an ancestor applies.
- Element path (no filter) on the server and the first client render (no hydration mismatch), under `prefers-reduced-transparency: reduce` and `prefers-contrast: more` (checked in script and guarded in CSS), when the feature check fails (`CSS.supports('filter', 'url(#...)')` and `SVGFEGaussianBlurElement`), on the light grounds (`light`, `amber-paper` set both strengths to 0: a screen glow would lighten dark ink), and while powered off. It re-checks when a preference, the theme or the preset changes.

## How to switch later

- **To C (text-shadow):** keep the `glowMode` prop and the html attribute. In `RetroEffects.tsx` stop rendering the `<filter>` (render nothing for the sampled state). In `RetroEffects.css` replace the `filter: url(...)` rule with a rule on `:root[data-eidotter-glow="sampled"] body *` that sets the two `text-shadow`s from the same four tokens (blur = 2 x radius, colour `color-mix(in srgb, currentColor <intensity>, transparent)`). Decide whether it should replace or add to the components' own heading glows.
- **To B (backdrop-filter):** not recommended in Chromium today (dims text). If a browser screens backdrop-filtered layers correctly later, it would be two fixed layers rendered outside the RetroEffects root (the root is its own stacking context, so a blend inside it cannot reach the page).
- **Tuning A:** change the four tokens, or set them per preset or theme. Removing the halo pass (strength 0) does not remove its cost; drop the pass in the component if a cheaper variant is wanted.

## Not measured

- Safari / WebKit (not installed here), Firefox.
- Any GPU-rasterised Chromium: all frame numbers are software raster.
- Pages with large images or video under A.
- Phones (only the 390 viewport in desktop Chromium).

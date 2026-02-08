# OKLCH Color Format Decision: Eidotter Design System

**Linear issue:** DMNC-371
**Date:** 2026-02-08
**Status:** Research complete
**Recommendation:** REJECT for token source files. DEFER for CSS output format.

---

## Context

The design-craft skill flags OKLCH as `INTERIM` with the note:

> "Eidotter's source of truth stays hex (CGA specification). Use OKLCH when designing new theme variants or extending the color system."

This document evaluates whether eidotter should formally adopt OKLCH as a color format in its token pipeline, and if so, where in the pipeline it belongs.

---

## Research Findings

### 1. Style Dictionary OKLCH Transform Support

**Finding: No built-in OKLCH transform exists.**

Eidotter uses Style Dictionary **v5.2.0** (installed as of Feb 2026). The built-in color transforms remain:

| Transform | Output |
|-----------|--------|
| `color/rgb` | `rgb()` string |
| `color/hsl` | `hsl()` / `hsla()` string |
| `color/hsl-4` | `hsl()` space-separated syntax |
| `color/hex` | 6-digit hex |
| `color/hex8` | 8-digit hex (deprecated) |
| `color/css` | hex or rgba depending on alpha |

No `color/oklch` transform ships with Style Dictionary v4 or v5. Adding OKLCH output requires a custom transform, typically using [Color.js](https://colorjs.io/) for conversion:

```js
import Color from 'colorjs.io';

StyleDictionary.registerTransform({
  name: 'color/oklch',
  type: 'value',
  filter: (token) => token.$type === 'color',
  transform: (token) => {
    const color = new Color(token.$value);
    const [L, C, H] = color.oklch;
    return `oklch(${L.toFixed(4)} ${C.toFixed(4)} ${H?.toFixed(2) ?? 'none'})`;
  }
});
```

**Effort estimate:** ~30 lines of code + `colorjs.io` dependency (~40KB). Not trivial, not difficult. However, it adds a build dependency and a conversion step that introduces rounding differences from the source hex values.

**Sources:**
- [Style Dictionary built-in transforms](https://styledictionary.com/reference/hooks/transforms/predefined/)
- [Color.js library](https://colorjs.io/)

### 2. Figma Variables API OKLCH Support

**Finding: Figma has no native OKLCH support.**

The Figma Variables REST API accepts and returns color values exclusively as **RGBA objects** with float components (0-1 range):

```json
{ "r": 1.0, "g": 0.69, "b": 0.0, "a": 1.0 }
```

There is no OKLCH input or output path. The Figma Plugin API similarly uses RGB/RGBA objects. An active [feature request](https://forum.figma.com/suggest-a-feature-11/support-oklab-and-oklch-8257) exists on the Figma forum but has no official timeline.

Community workarounds include plugins like "Derek's OKLCH Variables" and "OkColor" that let designers pick colors in OKLCH space within Figma, but these convert to RGB internally before storing.

**Impact for eidotter:** The `sync-to-figma.ts` script pushes variables via the REST API. Switching token source to OKLCH would require a hex-to-RGBA conversion step anyway. OKLCH values would be silently converted and potentially shift due to gamut mapping.

**Sources:**
- [Figma RGB/RGBA Plugin API](https://www.figma.com/plugin-docs/api/RGB/)
- [Figma forum: Support OKLab and OKLCH](https://forum.figma.com/suggest-a-feature-11/support-oklab-and-oklch-8257)
- [Figma Variables REST API](https://developers.figma.com/docs/rest-api/variables/)

### 3. Browser Support for oklch()

**Finding: Excellent support (~93%) in 2026.**

| Browser | Version | Date |
|---------|---------|------|
| Chrome | 111+ | March 2023 |
| Edge | 111+ | March 2023 |
| Firefox | 113+ | May 2023 |
| Safari | 15.4+ | March 2022 |

Global support is approximately **88-93%** depending on the measurement methodology. The remaining gap is primarily older mobile browsers and enterprise-locked desktop versions.

Relative OKLCH syntax (`oklch(from var(--base) ...)`) has narrower support but is not relevant to eidotter's use case of static token values.

**Assessment:** Browser support is not a blocker. If eidotter chose to output `oklch()` values in CSS, virtually all target users would see them correctly.

**Sources:**
- [Can I use: oklch()](https://caniuse.com/mdn-css_types_color_oklch)
- [MDN: oklch()](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch)

### 4. Eidotter's Color Inventory

**Finding: 20 primitive colors + ~30 semantic aliases + ~10 effect colors across 5 themes.**

The token files define:

**base.tokens.json (default amber mono theme):**
- 16 CGA slot colors (mapped to amber monochrome shades)
- 4 amber-specific colors (amber, amberBright, amberDim, amberGlow)
- 20 semantic aliases (background, text, border, link, status, alert)
- 10 effect colors (scanlines, vignette, phosphor glow, bloom)

**Theme overrides:**
- `theme.cga-amber.tokens.json` - Restores original 16 CGA hex values + amber accents
- `theme.cga-mode4-p0.tokens.json` - 4-color CGA palette (green/red/yellow/black)
- `theme.cga-mode4-p1.tokens.json` - 4-color CGA palette (cyan/magenta/white/black)
- `theme.cga-mode5.tokens.json` - 4-color CGA palette (cyan/red/white/black)
- `theme.amber-mono.tokens.json` - Semantic-only overrides

**Total unique hex values across all themes:** Approximately 30-35 distinct colors.

All CGA colors are specified by the IBM Color Graphics Adapter hardware standard. These are exact hex values documented in the CGA specification, not designer-chosen colors.

### 5. Does OKLCH Add Value for a Fixed 16-Color CGA Palette?

**Finding: Minimal practical value for the core palette. Some value for theme extension workflows.**

OKLCH's primary benefits are:

| Benefit | Applies to Eidotter? | Why / Why Not |
|---------|----------------------|---------------|
| Perceptual uniformity across hues | **No** | CGA colors are hardware-specified. We do not choose or adjust them for perceptual balance. |
| Consistent lightness ramps | **No** | We have no shade ramps. Each CGA color is a single fixed value. |
| Predictable chroma/saturation | **No** | No programmatic color generation from base values. |
| Better gradient interpolation | **Marginal** | Could improve amber glow gradients slightly, but CSS `color-mix()` with `in oklch` handles this at usage time without changing token format. |
| Gamut-safe P3 colors | **Marginal** | The amber phosphor colors (#FFB000) are within sRGB. No P3-only values exist in the palette. |
| Human readability of token values | **Worse** | `#55FFFF` is immediately recognizable as "bright cyan" to anyone familiar with CGA. `oklch(0.9054 0.1546 194.77)` is not. |
| Future dynamic palette generation | **Possible** | If eidotter ever generates shade ramps or new themes programmatically, OKLCH would be the right color space. But this is speculative. |

**Key insight:** OKLCH solves the problem of *designing* with color -- choosing harmonious palettes, creating consistent lightness scales, ensuring accessibility across programmatically generated schemes. Eidotter's CGA palette is *already designed* by IBM's hardware engineers in the 1980s. The hex values are not opinions to be refined; they are specifications to be preserved.

The amber monochrome theme in `base.tokens.json` does include non-CGA-standard colors that were manually chosen (the amber shade ramps mapped to CGA slot names). Even for these, the values were hand-tuned for CRT phosphor authenticity rather than derived from a perceptual color model.

---

## Evaluation of Options

### Option A: Adopt OKLCH as Source of Truth

Replace hex values in `*.tokens.json` with OKLCH notation.

**Pros:**
- Future-proofs token files for CSS Color Level 4 ecosystem
- Makes lightness/chroma relationships explicit

**Cons:**
- Breaks the direct link to CGA hardware specification (hex IS the spec)
- Requires conversion for Figma sync (API only accepts RGBA)
- Style Dictionary needs a custom transform (no built-in support)
- Reduces readability for CGA-familiar developers
- Introduces rounding: hex -> OKLCH -> hex round-trip may not be lossless
- No practical benefit for 20 fixed colors that never change

**Verdict: REJECT.** The costs outweigh the benefits for a fixed palette.

### Option B: Add OKLCH as a CSS Output Format

Keep hex as source, add a `color/oklch` custom transform to output `oklch()` values in `tokens.css`.

**Pros:**
- Browsers can do perceptually-correct interpolation when mixing token colors
- Aligns with CSS Color Level 4 direction

**Cons:**
- Adds `colorjs.io` build dependency
- CSS custom properties already work fine with hex values
- `color-mix(in oklch, ...)` works regardless of whether the inputs are hex or oklch
- No visual difference for static color values -- only matters during interpolation
- Requires updating all downstream consumers that parse token values

**Verdict: DEFER.** No current need. Revisit when relative color syntax or `color-mix()` becomes a core part of eidotter's component CSS.

### Option C: Use OKLCH Only for Theme Extension (Current Position)

Keep hex as source of truth. Recommend OKLCH for *designing* new theme variants and generating shade ramps, but do not embed it in the token pipeline.

**Pros:**
- Zero changes to existing infrastructure
- Preserves CGA spec fidelity
- OKLCH available as a design tool when needed (via oklch.fyi, Color.js)
- No build dependencies added
- No Figma sync complications

**Cons:**
- OKLCH knowledge stays informal rather than codified in the pipeline

**Verdict: This is the correct position.**

---

## Recommendation

**REJECT** adopting OKLCH in eidotter's token source files or build pipeline.

**Maintain** the current INTERIM positioning in the design-craft skill, with one refinement: change `INTERIM` to a clearer label that communicates the decision is made, not pending.

### Suggested design-craft skill update:

```markdown
### OKLCH (Design-Time Tool -- Not in Pipeline)

Eidotter's source of truth is hex (CGA specification). OKLCH is recommended
as a design-time tool when creating new theme variants or extending the color
system beyond the original 16 CGA colors. Its perceptual uniformity makes it
ideal for generating consistent shade ramps from a CGA base color.

OKLCH is NOT used in:
- Token source files (hex only)
- Style Dictionary transforms (hex/rgb output)
- Figma variable sync (RGBA only)

OKLCH IS useful for:
- Designing new non-CGA theme colors (amber phosphor shades, alert backgrounds)
- Evaluating perceived contrast between palette entries
- Future dynamic palette generation (if ever needed)
```

### Conditions to revisit this decision:

1. **Style Dictionary ships a built-in `color/oklch` transform** -- lowers adoption cost significantly
2. **Figma Variables API adds OKLCH support** -- removes the conversion penalty
3. **Eidotter adds dynamic palette generation** -- OKLCH becomes essential for perceptual uniformity
4. **Downstream projects need oklch() output** -- practical demand from consumers

None of these conditions are met as of February 2026.

---

## Appendix: CGA Palette in OKLCH (Reference)

For reference, here are the 16 standard CGA colors expressed in OKLCH. Note how irregular the chroma and lightness values are -- this is expected because the CGA palette was designed around 6-bit RGBI hardware constraints, not perceptual uniformity.

| CGA Name | Hex | OKLCH (approximate) | Notes |
|----------|-----|---------------------|-------|
| Black | `#000000` | `oklch(0 0 none)` | Zero lightness |
| Blue | `#0000AA` | `oklch(0.31 0.17 264)` | Low L, high C |
| Green | `#00AA00` | `oklch(0.59 0.18 142)` | Mid L |
| Cyan | `#00AAAA` | `oklch(0.64 0.10 208)` | Mid L, low C |
| Red | `#AA0000` | `oklch(0.40 0.16 29)` | Low-mid L |
| Magenta | `#AA00AA` | `oklch(0.44 0.22 328)` | Low-mid L, high C |
| Brown | `#AA5500` | `oklch(0.51 0.13 62)` | Mid L |
| Light Gray | `#AAAAAA` | `oklch(0.74 0 none)` | Achromatic |
| Dark Gray | `#555555` | `oklch(0.44 0 none)` | Achromatic |
| Bright Blue | `#5555FF` | `oklch(0.52 0.22 264)` | |
| Bright Green | `#55FF55` | `oklch(0.87 0.25 142)` | High L |
| Bright Cyan | `#55FFFF` | `oklch(0.91 0.15 194)` | Very high L |
| Bright Red | `#FF5555` | `oklch(0.67 0.20 25)` | |
| Bright Magenta | `#FF55FF` | `oklch(0.72 0.25 328)` | |
| Yellow | `#FFFF55` | `oklch(0.96 0.17 109)` | Near-max L |
| White | `#FFFFFF` | `oklch(1 0 none)` | Max lightness |

**Observation:** The lightness values range from 0.31 (blue) to 0.96 (yellow). In a perceptually uniform system, you would typically want status colors at similar lightness. But CGA's palette was never designed for perceptual uniformity -- it was designed for RGBI pin combinations on a 4-bit bus. Forcing OKLCH uniformity onto this palette would mean changing the colors, which defeats the purpose of a CGA-authentic design system.

---

## Sources

- [Style Dictionary built-in transforms](https://styledictionary.com/reference/hooks/transforms/predefined/)
- [Style Dictionary custom transforms](https://styledictionary.com/reference/hooks/transforms/)
- [Color.js library](https://colorjs.io/)
- [Can I use: oklch()](https://caniuse.com/mdn-css_types_color_oklch)
- [MDN: oklch()](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch)
- [Figma Variables REST API](https://developers.figma.com/docs/rest-api/variables/)
- [Figma forum: Support OKLab and OKLCH](https://forum.figma.com/suggest-a-feature-11/support-oklab-and-oklch-8257)
- [Figma RGB/RGBA Plugin API](https://www.figma.com/plugin-docs/api/RGB/)
- [Evil Martians: OKLCH in CSS](https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl)
- [Evil Martians: Exploring the OKLCH ecosystem](https://evilmartians.com/chronicles/exploring-the-oklch-ecosystem-and-its-tools)
- [CSS-Tricks: oklch()](https://css-tricks.com/almanac/functions/o/oklch/)
- [oklch.fyi](https://oklch.fyi/)

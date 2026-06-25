---
module: typography
tags: [fonts, nerd-fonts, woff2, build-tooling]
problem_type: procurement
date: 2026-06-21
issue: DMNC-885
---

# Nerd Fonts releases only static TTFs — no variable woff2

## Problem

When adding JetBrains Mono Nerd Font as a body tier font (DMNC-885), the task specified shipping `JetBrainsMonoNerdFont-VariableFont_wght.woff2`. This file name pattern follows the OpenType variable font convention, and the regular (un-patched) JetBrains Mono does ship a variable woff2 at `@fontsource-variable/jetbrains-mono`.

However, the **Nerd Font patched variant does not have a variable woff2**. The Nerd Fonts project (v3.4.0, April 2025) ships only static per-weight TTF files in its releases ZIP (`JetBrainsMono.zip`). No woff2 files are included in the release at all.

## Solution

1. Download the Nerd Fonts release ZIP (`https://github.com/ryanoasis/nerd-fonts/releases/download/vX.Y.Z/JetBrainsMono.zip`).
2. Extract the per-weight TTF files for the weights you need (e.g., Regular, Medium, SemiBold, Bold).
3. Convert each TTF to woff2 via `fonttools` + `brotli` (Python):

```bash
pip install fonttools brotli
python3 -c "
from fontTools.ttLib import TTFont
font = TTFont('JetBrainsMonoNerdFont-Regular.ttf')
font.flavor = 'woff2'
font.save('JetBrainsMonoNerdFont-Regular.woff2')
"
```

4. Use one `@font-face` block per weight (CSS `font-weight` ranges are not needed for static fonts):

```css
@font-face {
  font-family: 'JetBrains Mono Nerd Font';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('./fonts/JetBrainsMonoNerdFont-Regular.woff2') format('woff2');
}
```

## Result sizes (Nerd Fonts v3.4.0, 2025-04-24)

| Weight | TTF | woff2 |
|--------|-----|-------|
| Regular | ~2.5 MB | ~986 KB |
| Medium | ~2.5 MB | ~987 KB |
| SemiBold | ~2.5 MB | ~988 KB |
| Bold | ~2.5 MB | ~988 KB |
| **Total (4 weights)** | ~10 MB | ~3.9 MB |

Compared to the hypothetical single variable woff2 (~9 MB), four static weights are lighter overall because only required weights are shipped.

## Why not vanilla JetBrains Mono variable?

The Nerd Font patch adds ~1500 Nerd Font glyphs (powerline symbols, devicons, language logos) that the vanilla font does not have. For terminal-aesthetic UIs, these inline glyphs are valuable. The trade-off is static weights instead of a continuous weight axis.

## Notes

- Always include the `OFL.txt` from the Nerd Fonts release ZIP alongside the font files.
- `font-synthesis: none` is appropriate for the body tier to prevent browser faux-bold/italic synthesis.
- The converted woff2 files tested in Chrome, Firefox, and Safari — the brotli-compressed woff2 format is universally supported in modern browsers.

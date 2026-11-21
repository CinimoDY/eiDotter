# Terminal target

Terminals are an official output of the token pipeline, next to CSS, Tailwind, Swift and Figma. The pipeline writes one JSON file per DOS theme: the colours a terminal needs, resolved to hex, and nothing else.

## What it produces

`npm run build-tokens` (and `npm run build`) writes `dist/terminal/<theme>.json` for the themes with a full 16-colour palette: `cga-amber`, `cga-mode4-p0`, `cga-mode4-p1` and `cga-mode5`. `pure-amber` (Pure Amber, formerly `amber-mono`) and `amber-paper` get no file (nor does the `amber-mono` alias): they collapse the palette to one phosphor, so their ANSI green and cyan are dark browns and the lighter signal steps are fixed colours that do not belong to them, which does not make a usable terminal palette (a terminal file that fails contrast is worse than none). The modern `light` theme is not a terminal theme. A deliberate monochrome terminal variant would need its own mapping and is an open design question. The `dos-86` theme (DMNC-1643) gets a file because it is in the `themes` list; its 15 roles and 16 ANSI slots equal the DOS-86 terminal theme's, screen #050300 included. The files ship in the package; import them as `eidotter/terminal/<theme>.json`.

```jsonc
{
  "name": "eiDotter cga-amber",
  "roles": { "screen": "#050300", "text": "#FFB000", /* 15 roles */ },
  "ansi":  { "black": "#050300", "red": "#FF5555", /* 16 slots, in ANSI order */ },
  "effects": { "scanline": { "intensity": 0.6 }, /* the shared-core effect tokens */ }
}
```

- **`roles`** say what each colour is for: `screen`, `text`, `textDim`, `textStrong`, `decoration`, `cursor`, `selection`, `raised`, `error`, `success`, `warning`, `prompt`, `info`, `addedFill`, `removedFill`. A target maps from roles, never from raw colours.
- **`ansi`** holds the 16 terminal slots: `black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`, then the same eight with a `bright` prefix.
- **`effects`** is every shared-core `effect.*` token (scanlines, phosphor, vignette, flicker) at the values eiDotter's web effects use. The web-only extension (`effect.web.*`) is left out, as it is for Swift.

## Where it comes from

`src/tokens/terminal.tokens.json` holds the role layer and the ANSI slots as references into eiDotter's own colour tokens. `style-dictionary.config.mjs` resolves it once per theme, layered over the base tokens and that theme, so a role lands on whatever the theme says. Adding a DOS theme to the `themes` list there is enough to get its terminal file.

Two kinds of value:

- **References** to `color.cga.*` and the alert surfaces. These follow the theme's palette.
- **Fixed values**, the same in every theme: the tint (`#1A1000`) and four lighter signal steps (`#FF8888`, `#FFFF99`, `#9999FF`, `#FF9AFF`). They are not CGA colours; they exist so the bright ANSI row has a step above each normal colour.

## Two departures from ANSI convention

Both are deliberate, so a program that prints in these slots stays readable on the phosphor.

1. **`white` is emphasis, not white.** The slot holds the strong amber (`textStrong`), so it stays in the phosphor. Pure white is `brightWhite`.
2. **`brightBlack` is readable.** Programs print secondary text (comments, hints, dimmed output) in the slot that convention makes near-invisible dark grey. Here it holds the soft secondary text colour (`textDim`).

## Contrast

`text`, `textDim`, `error`, `success`, `warning`, `prompt` and `info` are tested at 4.5:1 against `screen` for every emitted theme, with no exceptions (`src/styles/terminal.test.ts`). The test also asserts that `pure-amber`, its alias `amber-mono`, `amber-paper` and `light` are not emitted, so adding one back is a deliberate act.

## What is not here

Application files (Windows Terminal, iTerm2, Ghostty, kitty, Alacritty, VS Code, Claude Code and the rest) are not generated in this repo. They are generated from these JSON files in the DOS-86 terminal theme's own repository, which reads `eidotter/terminal/<theme>.json` when eiDotter is installed.

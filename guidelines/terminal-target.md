# Terminal target

Terminals are an official output of the token pipeline, next to CSS, Tailwind, Swift and Figma. The pipeline writes one JSON file per DOS theme: the colours a terminal needs, resolved to hex, and nothing else.

## What it produces

`npm run build-tokens` (and `npm run build`) writes `dist/terminal/<theme>.json` for every DOS theme: `amber-mono`, `cga-amber`, `cga-mode4-p0`, `cga-mode4-p1`, `cga-mode5` and `amber-paper`. The modern `light` theme is not a terminal theme and gets no file. The files ship in the package; import them as `eidotter/terminal/<theme>.json`.

```jsonc
{
  "name": "eiDotter amber-mono",
  "roles": { "screen": "#020003", "text": "#FFB000", /* 15 roles */ },
  "ansi":  { "black": "#020003", "red": "#DCA934", /* 16 slots, in ANSI order */ },
  "effects": { "scanline": { "intensity": 0.6 }, /* the shared-core effect tokens */ }
}
```

- **`roles`** say what each colour is for: `screen`, `text`, `textDim`, `textStrong`, `decoration`, `cursor`, `selection`, `raised`, `error`, `success`, `warning`, `prompt`, `info`, `addedFill`, `removedFill`. A target maps from roles, never from raw colours.
- **`ansi`** holds the 16 terminal slots: `black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`, then the same eight with a `bright` prefix.
- **`effects`** is every shared-core `effect.*` token (scanlines, phosphor, vignette, flicker) at the values eiDotter's web effects use. The web-only extension (`effect.web.*`) is left out, as it is for Swift.

## Where it comes from

`src/tokens/terminal.tokens.json` holds the role layer and the ANSI slots as references into eiDotter's own colour tokens. `style-dictionary.config.mjs` resolves it once per theme, layered over the base tokens and that theme, so a role lands on whatever the theme says. Adding a DOS theme to the `themes` list there is enough to get its terminal file.

Two kinds of value:

- **References** to `color.cga.*` and the alert surfaces. These follow the theme. A theme that pins its functional colours to amber (`amber-mono`, `amber-paper`) gets amber for error, success and warning; the terminal target does not invent honest colours for it.
- **Fixed values**, the same in every theme: the tint (`#1A1000`) and four lighter signal steps (`#FF8888`, `#FFFF99`, `#9999FF`, `#FF9AFF`). They are not CGA colours; they exist so the bright ANSI row has a step above each normal colour.

## Two departures from ANSI convention

Both are deliberate, so a program that prints in these slots stays readable on the phosphor.

1. **`white` is emphasis, not white.** The slot holds the strong amber (`textStrong`), so it stays in the phosphor. Pure white is `brightWhite`.
2. **`brightBlack` is readable.** Programs print secondary text (comments, hints, dimmed output) in the slot that convention makes near-invisible dark grey. Here it holds the soft secondary text colour (`textDim`).

## Contrast

`text`, `textDim`, `error`, `success`, `warning`, `prompt` and `info` are tested at 4.5:1 against `screen` for every theme (`src/styles/terminal.test.ts`). Two pairs are known gaps and listed in that test with their reason until they are resolved.

## What is not here

Application files (Windows Terminal, iTerm2, Ghostty, kitty, Alacritty, VS Code, Claude Code and the rest) are not generated in this repo. They are generated from these JSON files in the DOS-86 terminal theme's own repository, which reads `eidotter/terminal/<theme>.json` when eiDotter is installed.

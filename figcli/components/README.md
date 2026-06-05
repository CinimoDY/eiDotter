# DOS-custom component specs (figcli render dialect)

Track-A inputs for the DOSBTS Figma design system (DMNC-976 · U7). These `.jsx` files
are **figcli render specs**, not React — primitives (`<Frame>`, `<Text>`, `<Rectangle>`,
`<Icon>`, `<SVG>`) with layout props and `var:token` bindings. They are rendered into
`DOSBTS_fig` locally in Track B, then turned into Figma components.

> **Dialect caveat:** the exact figcli JSX prop set (e.g. `glow`, `padding`, `var:` font
> sizing) is **pinned against figcli `src/` in U1** before the first render. Treat these
> specs as faithful intent; adjust prop names to the pinned dialect when rendering.

## Render workflow (Track B, local, Windows — Figma Desktop open on `DOSBTS_fig`)

For each spec file:

```bash
node /path/to/figma-cli/src/index.js render figcli/components/<file>.jsx
node /path/to/figma-cli/src/index.js node to-component "<frame-id>"   # per named frame
node /path/to/figma-cli/src/index.js component combine ...            # into one variant set
node /path/to/figma-cli/src/index.js sizes "<id>" --base md           # where size variants apply
```

## `var:` token reference (created by U5 from `figcli/DOSBTS.design.md`)

| Token | Value | Use |
|---|---|---|
| `var:bg` | `#0A0A0A` | screen background |
| `var:card` | `#1B1917` | card / surface |
| `var:amber` | `#FFB000` | primary accent / data |
| `var:amber-dark` | `#CC8C00` | secondary / pressed |
| `var:muted` | `#594F47` | borders, disabled, captions |
| `var:success` | `#00AA00` | **in-range glucose** |
| `var:error` | `#AA0000` | **out-of-range glucose** |
| `var:info` | `#00AAAA` | sensor / insulin / info |

## Component → state matrix (R8: every component carries its real states)

| Spec file | Component | States / variants |
|---|---|---|
| `glucose-hero.jsx` | Glucose Hero (60pt) | in-range · low · high · critical-low · critical-high · **stale** |
| `dos-button.jsx` | DOS Button | variant primary/ghost × state default/pressed/disabled/loading |
| `stat.jsx` | Stat | trend up/down/neutral × size sm/md/lg + no-data |
| `cards-feedback.jsx` | CRT Card (`.dosCard` variant), Badge, TIR bars, Alert | success/error/info status states |
| `timeline.jsx` | Event Marker Lane, IOB chip, Stale indicator | empty/single/grouped · zero/active/predicted · warn/error |

**Glow floor:** Glucose Hero and primary DOS Button MUST carry the 3-layer CRT phosphor
glow (radius 2@0.6 / 6@0.3 / 12@0.15). Chart bodies / event lane may be static.

**Medical values:** glucose threshold numbers in `glucose-hero.jsx` are placeholders —
confirm the real in-range/low/high/critical thresholds from DOSBTS `AmberTheme.swift` /
state code before the final render. Do not invent.

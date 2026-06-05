# DOSBTS — eiDotter Amber `DESIGN.md`

**Generated** by `scripts/figcli/export-design-md.ts` — do not hand-edit. Re-run
`npm run export-figcli-design-md` after changing DOSBTS AmberTheme values.

Source: `DOSBTS / eiDotter Amber` · figcli variable-collection name.

## How figcli consumes this

With Figma Desktop open on `DOSBTS_fig` and figcli connected in **Safe mode** (never Yolo):

```bash
node /path/to/figma-cli/src/index.js tokens import-design-md figcli/DOSBTS.design.md
```

This creates color/radius/typography variables. **Spacing is not created by figcli's
import** — add the spacing variables via the figma-console MCP (`figma_batch_create_variables`)
from the same block. See `figcli/README.md`.

Glucose-status colors are **literal CGA** (`success #00AA00` in-range, `error #AA0000`
out-of-range, `info #00AAAA` sensor) — sourced from the DOSBTS override map, because
eidotter's own CGA primitives are amber-monochromed.

## Machine-readable tokens

```json design-tokens
{
  "meta": {
    "source": "DOSBTS / eiDotter Amber",
    "generated": "2026-06-05T22:15:48.958Z"
  },
  "color": {
    "bg": "#0A0A0A",
    "card": "#1B1917",
    "amber": "#FFB000",
    "amber-dark": "#CC8C00",
    "amber-light": "#FFD580",
    "muted": "#594F47",
    "border": "#594F47",
    "text-primary": "#FFB000",
    "text-secondary": "#CC8C00",
    "text-muted": "#594F47",
    "white": "#AAAAAA",
    "success": "#00AA00",
    "error": "#AA0000",
    "info": "#00AAAA"
  },
  "radius": {
    "none": "0px",
    "sm": "2px",
    "base": "4px"
  },
  "typography": {
    "fontFamily": "SF Mono, ui-monospace, monospace",
    "size": {
      "hero": 60,
      "title": 28,
      "header": 22,
      "body": 17,
      "body-small": 15,
      "button": 15,
      "caption": 13,
      "data": 17
    }
  },
  "spacing": {
    "0": "0px",
    "1": "4px",
    "2": "8px",
    "3": "12px",
    "4": "16px",
    "5": "20px",
    "6": "24px",
    "8": "32px",
    "10": "40px",
    "12": "48px",
    "16": "64px"
  }
}
```

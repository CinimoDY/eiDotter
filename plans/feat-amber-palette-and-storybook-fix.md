# feat: Add Amber Token & Fix Storybook

## Overview

Add the amber color used by EatThisDie to eidotter tokens and fix Storybook to show all components.

## Problem Statement

1. **EatThisDie uses `#FFBF00`** but it's not in eidotter's token system
2. **Storybook only shows 3/8 components** - the config manually lists paths instead of using a glob

## Proposed Solution

### Phase 1: Add Amber Token

Add single amber color to `src/tokens/colors.json`:

```json
{
  "color": {
    "cga": {
      // ... existing 16 colors ...
      "amber": { "value": "#FFBF00" }
    }
  }
}
```

### Phase 2: Fix Storybook Glob

Replace manual component list with single glob in `.storybook/main.js`:

```javascript
stories: [
  "../src/components/**/*.stories.@(js|jsx|ts|tsx)"
]
```

### Phase 3: Rebuild & Verify

```bash
npx style-dictionary build
npm run storybook
```

## Acceptance Criteria

- [ ] `--color-cga-amber: #FFBF00` exists in `tokens.css`
- [ ] Storybook shows all 8 components
- [ ] Build succeeds: `npm run build`

## Files Modified

| File | Change |
|------|--------|
| `src/tokens/colors.json` | +1 amber token |
| `.storybook/main.js` | Replace 3 paths with 1 glob |
| `src/styles/tokens.css` | Regenerated |

## MVP Implementation

### colors.json

```json
{
  "color": {
    "cga": {
      "black": { "value": "#000000" },
      "blue": { "value": "#0000AA" },
      "green": { "value": "#00AA00" },
      "cyan": { "value": "#00AAAA" },
      "red": { "value": "#AA0000" },
      "magenta": { "value": "#AA00AA" },
      "brown": { "value": "#AA5500" },
      "lightGray": { "value": "#AAAAAA" },
      "darkGray": { "value": "#555555" },
      "brightBlue": { "value": "#5555FF" },
      "brightGreen": { "value": "#55FF55" },
      "brightCyan": { "value": "#55FFFF" },
      "brightRed": { "value": "#FF5555" },
      "brightMagenta": { "value": "#FF55FF" },
      "yellow": { "value": "#FFFF55" },
      "white": { "value": "#FFFFFF" },
      "amber": { "value": "#FFBF00" }
    },
    "background": {
      "primary": { "value": "{color.cga.blue.value}" },
      "secondary": { "value": "{color.cga.black.value}" }
    },
    "text": {
      "primary": { "value": "{color.cga.lightGray.value}" },
      "secondary": { "value": "{color.cga.white.value}" },
      "accent": { "value": "{color.cga.yellow.value}" }
    }
  }
}
```

### .storybook/main.js

```javascript
stories: [
  "../src/components/**/*.stories.@(js|jsx|ts|tsx)"
]
```

## References

- EatThisDie AmberTheme: `/mnt/d/Coding/eatthisidie/src/EatThisDie/DesignSystem/Colors/AmberTheme.swift`
- Eidotter tokens: `/mnt/d/Coding/eidotter/src/tokens/colors.json`
- Storybook config: `/mnt/d/Coding/eidotter/.storybook/main.js`

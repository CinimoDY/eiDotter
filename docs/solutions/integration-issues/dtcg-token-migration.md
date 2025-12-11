---
title: "Migrating Design Tokens to DTCG Format with Style Dictionary v4"
date: 2025-12-11
category: integration-issues
tags:
  - tokens
  - style-dictionary
  - dtcg
  - theming
  - design-system
severity: medium
component: design-system
status: resolved
---

# Migrating Design Tokens to DTCG Format

## Problem

The eidotter design system had a legacy token format that:
- Lacked theming support (no way to create amber theme for EatThisDie)
- Used inconsistent format (mixed DTCG and legacy syntax)
- Had no semantic token layer for easy customization
- Used CommonJS Style Dictionary config (limiting extensibility)

## Symptoms

- Amber color missing from token palette
- Unable to create theme variants without duplicating entire token set
- Token references using old `.value` syntax instead of DTCG `$value`
- Style Dictionary v3 config couldn't handle composite types (shadow, fontFamily)

## Root Cause

Legacy token system used Style Dictionary v3 with mixed token formats:
- `colors.json` used old format: `{ "value": "#000000" }`
- `semantic.json` mixed DTCG and legacy references
- No separation between base tokens and theme-specific tokens

## Solution

Migrated to DTCG (Design Tokens Community Group) format with Style Dictionary v4.

### 1. DTCG Token Structure

**Base tokens** (`src/tokens/base.tokens.json`):

```json
{
  "$description": "Eidotter Design System - Base Tokens (DTCG Format)",
  "color": {
    "cga": {
      "$type": "color",
      "black": { "$value": "#000000" },
      "amber": { "$value": "#FFBF00", "$description": "Amber monitor extension" }
    },
    "semantic": {
      "$type": "color",
      "background": {
        "primary": { "$value": "{color.cga.black}" }
      },
      "text": {
        "accent": { "$value": "{color.cga.yellow}" }
      }
    }
  }
}
```

### 2. Theme Overrides

**Theme file** (`src/tokens/theme.dos-amber.tokens.json`):

```json
{
  "$description": "DOS Amber Theme - amber-on-black terminal aesthetic",
  "color": {
    "semantic": {
      "$type": "color",
      "text": {
        "primary": { "$value": "{color.cga.amber}" }
      }
    }
  }
}
```

Theme files only override what changes - base tokens are inherited.

### 3. Style Dictionary v4 ESM Config

**Config** (`style-dictionary.config.mjs`):

```javascript
import StyleDictionary from 'style-dictionary';

// Custom transform for shadow composite tokens
StyleDictionary.registerTransform({
  name: 'shadow/css',
  type: 'value',
  transitive: true,
  filter: (token) => token.$type === 'shadow',
  transform: (token) => {
    const v = token.value || token.$value;
    if (!v) return 'none';
    return `${v.offsetX} ${v.offsetY} ${v.blur} ${v.spread} ${v.color}`;
  }
});

// Build base tokens
const baseConfig = {
  source: ['src/tokens/base.tokens.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      transforms: ['shadow/css', 'fontFamily/css'],
      buildPath: 'src/styles/',
      files: [{
        destination: 'tokens.css',
        format: 'css/variables',
        options: { outputReferences: true }
      }]
    }
  }
};

// Build theme with custom selector
const dosAmberConfig = {
  source: [
    'src/tokens/base.tokens.json',
    'src/tokens/theme.dos-amber.tokens.json'
  ],
  platforms: {
    css: {
      files: [{
        destination: 'theme.dos-amber.css',
        format: 'css/variables',
        options: {
          outputReferences: true,
          selector: '[data-theme="dos-amber"], .theme-dos-amber'
        }
      }]
    }
  }
};
```

### 4. Usage

```html
<!-- Default theme -->
<div>Uses base CGA colors</div>

<!-- Amber theme -->
<div data-theme="dos-amber">
  Uses amber-on-black aesthetic
</div>
```

## Files Changed

| Action | File | Purpose |
|--------|------|---------|
| Created | `src/tokens/base.tokens.json` | DTCG base tokens |
| Created | `src/tokens/theme.dos-amber.tokens.json` | Amber theme overrides |
| Created | `style-dictionary.config.mjs` | Style Dictionary v4 ESM config |
| Created | `src/styles/theme.dos-amber.css` | Generated theme CSS |
| Deleted | `src/tokens/colors.json` | Merged into base.tokens.json |
| Deleted | `src/tokens/semantic.json` | Merged into base.tokens.json |
| Deleted | `style-dictionary.config.js` | Replaced by ESM config |
| Modified | `package.json` | Updated build-tokens script |

## Prevention

1. **Use DTCG format from the start** for new design systems
2. **Separate base and theme tokens** to enable customization
3. **Use ESM config** for better extensibility with Style Dictionary v4
4. **Document token naming conventions** in ADOPTION_STRATEGY.md

## Related

- GitHub Issue #5: Shadow transform outputs incorrect values
- GitHub Issue #6: Storybook may not reflect token changes
- Commit `57f38b9`: feat(tokens): restructure to DTCG format with amber theme
- Commit `2b0f3b5`: docs: add amber theme usage to README

## References

- [DTCG Specification](https://design-tokens.github.io/community-group/format/)
- [Style Dictionary v4 Docs](https://styledictionary.com/)
- `/mnt/d/Coding/eidotter/ADOPTION_STRATEGY.md`

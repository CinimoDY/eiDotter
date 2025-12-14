---
module: Eidotter Design System
date: 2025-12-14
problem_type: build_pattern
component: tailwind_integration
symptoms:
  - "Overengineered plan with Style Dictionary custom transforms"
  - "5-phase implementation for a simple config file"
  - "RGB channel transforms and CSS vars plugins for minimal benefit"
root_cause: over_abstraction
severity: minor
resolution_time: 30min
tags: [tailwind, preset, simplicity, design-system]
---

# Simple Tailwind Preset Over Style Dictionary Generation

## Problem

Initial plan for Eidotter Tailwind preset included:
- Custom Style Dictionary transforms for RGB channels
- CSS variable injection via Tailwind plugin
- Template generation system
- 5 implementation phases
- TypeScript type definitions

Three reviewers (DHH, Kieran, Simplicity) all concluded: **overengineered by 10x**.

## Root Cause

Treating a ~80-line config file like a framework. Tailwind presets are just JavaScript objects that export theme configuration.

## Solution

**Just write the preset by hand:**

```javascript
// tailwind.preset.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'cga-black': '#000000',
        'cga-yellow': '#ffff55',
        // ... remaining colors
      },
      fontFamily: {
        'dos': ['"Perfect DOS VGA 437"', 'Consolas', 'Monaco', 'monospace'],
      },
      fontSize: {
        'dos-base': '16px',
        // ... remaining sizes
      },
    },
  },
};
```

**Package.json exports:**
```json
{
  "exports": {
    "./tailwind.preset": "./tailwind.preset.js",
    "./tokens.css": "./src/styles/tokens.css"
  }
}
```

**Consumer usage:**
```javascript
// tailwind.config.js
module.exports = {
  presets: [require('eidotter/tailwind.preset')],
};
```

## What Was Eliminated

| Removed | Reason |
|---------|--------|
| RGB channel transform | Opacity modifiers are YAGNI for DOS aesthetic |
| CSS vars plugin | Users can import tokens.css separately |
| Template generation | Static file, no generation needed |
| TypeScript definitions | Tailwind provides its own types |
| 5-phase plan | One phase: write the file |

## Prevention

When building design system distribution:

1. **Ask:** Can this be a static file?
2. **Check:** Do I actually need runtime features (themes, opacity)?
3. **Simplify:** The "simplest thing that could possibly work" usually is

## Key Takeaway

> "This is a 100-line JavaScript config file that maps your tokens to Tailwind's theme object. That's it. One file. One phase."
> — DHH Review

## Cross-References

- Plan file: `plans/feat-tailwind-preset.md`
- Final implementation: `/tailwind.preset.js`
- Adoption strategy: `ADOPTION_STRATEGY.md`

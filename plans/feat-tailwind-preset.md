# feat: Create Tailwind CSS Preset for Eidotter Design System

## Overview

Create a Tailwind preset file (`tailwind.preset.js`) that exports Eidotter's design tokens (CGA colors, typography, spacing, etc.) as a consumable preset for projects using Tailwind CSS. This enables consistent DOS-themed styling across the Timeline OS portfolio without requiring React component imports.

## Problem Statement

Currently, projects wanting to use Eidotter's design tokens must either:
1. Import the full React component library
2. Manually copy CSS variables from tokens.css
3. Manually configure Tailwind theme values

This creates friction for adoption and leads to token drift across projects like Pomodoke Calendar, Tracker, and Remixer.

## Proposed Solution

Add a `tailwind` platform to the existing Style Dictionary build that generates:
1. A complete Tailwind preset with theme extensions
2. RGB channel color values for opacity modifier support (`bg-cga-yellow/50`)
3. CSS variable injection via Tailwind plugin
4. Theme variant support via data attributes

### Consumer Usage

```javascript
// tailwind.config.js
module.exports = {
  presets: [require('eidotter/tailwind.preset')],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
};
```

```jsx
// Component usage
<div className="bg-cga-black text-cga-yellow p-4 font-primary">
  DOS terminal content
</div>

<div className="bg-background-primary text-accent/80">
  Semantic tokens with opacity
</div>
```

---

## Technical Approach

### Token Naming Convention

| Token Category | Source Path | Tailwind Class | Example |
|----------------|-------------|----------------|---------|
| CGA Colors | `color.cga.*` | `cga-{name}` | `bg-cga-yellow`, `text-cga-black` |
| Semantic Colors | `color.semantic.*` | `{group}-{name}` | `bg-background-primary`, `text-accent` |
| Spacing | `spacing.*` | Numeric scale | `p-4`, `m-8` (aligns with Tailwind defaults) |
| Typography | `typography.fontSize.*` | `text-{size}` | `text-base`, `text-lg` |
| Font Family | `typography.fontFamily.*` | `font-{name}` | `font-primary` |
| Border Radius | `borderRadius.*` | `rounded-{size}` | `rounded-none`, `rounded-sm` |
| Shadows | `shadow.*` | `shadow-{name}` | `shadow-drop`, `shadow-glow` |
| Durations | `duration.*` | `duration-{name}` | `duration-fast`, `duration-normal` |

### RGB Channel Transformation

Add custom transform to convert hex colors to RGB channels for opacity modifiers:

```javascript
// style-dictionary.config.mjs
StyleDictionary.registerTransform({
  name: 'color/rgb-channels',
  type: 'value',
  filter: (token) => token.$type === 'color' && !token.$value.includes('var('),
  transform: (token) => {
    const hex = token.$value.replace('#', '');
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return `${r} ${g} ${b}`;
  }
});
```

### Build Output Structure

```
dist/
├── index.es.js          # React components (existing)
├── style.css            # Component styles (existing)
├── tokens.css           # CSS variables (NEW - copy from src/styles)
├── tailwind.preset.js   # Tailwind preset (NEW)
└── tailwind.preset.d.ts # TypeScript types (NEW)
```

### Preset File Structure

Single-file approach for simplicity:

```javascript
// dist/tailwind.preset.js
const plugin = require('tailwindcss/plugin');

const cgaColors = {
  'cga-black': 'rgb(var(--cga-black) / <alpha-value>)',
  'cga-yellow': 'rgb(var(--cga-yellow) / <alpha-value>)',
  // ... all 19 CGA + amber colors
};

const semanticColors = {
  'background-primary': 'rgb(var(--background-primary) / <alpha-value>)',
  'text-accent': 'rgb(var(--text-accent) / <alpha-value>)',
  // ... all semantic tokens
};

const cssVarsPlugin = plugin(({ addBase }) => {
  addBase({
    ':root': {
      '--cga-black': '0 0 0',
      '--cga-yellow': '255 255 85',
      // ... all RGB channel values
    },
    '[data-theme="dos-amber"], .theme-dos-amber': {
      // Amber theme overrides
    }
  });
});

module.exports = {
  theme: {
    extend: {
      colors: { ...cgaColors, ...semanticColors },
      fontFamily: {
        primary: ['Perfect DOS VGA 437', 'Consolas', 'Monaco', 'monospace'],
        fallback: ['Consolas', 'Monaco', 'Courier New', 'monospace'],
      },
      fontSize: {
        xs: '12px',
        sm: '14px',
        base: '16px',
        lg: '18px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '30px',
        '4xl': '36px',
      },
      lineHeight: {
        tight: '1.2',
        normal: '1.5',
        loose: '1.8',
      },
      spacing: {
        // Eidotter's 8px grid aligns with Tailwind defaults
        // Only add non-standard values if needed
      },
      borderRadius: {
        none: '0px',
        sm: '2px',
        DEFAULT: '4px',
      },
      boxShadow: {
        drop: '2px 2px 0px 0px #000000',
        glow: '0px 0px 8px 0px rgba(255, 191, 0, 0.5)',
      },
      transitionDuration: {
        instant: '0ms',
        fast: '100ms',
        normal: '200ms',
        slow: '400ms',
      },
    },
  },
  plugins: [cssVarsPlugin],
};
```

---

## Implementation Phases

### Phase 1: Style Dictionary Configuration

**Files to modify:**
- `style-dictionary.config.mjs` - Add tailwind platform and transforms

**Tasks:**
1. Register `color/rgb-channels` custom transform
2. Register `tailwind/preset` custom format
3. Add `tailwind` platform configuration
4. Update `npm run build-tokens` output

### Phase 2: Preset Generation

**Files to create:**
- `src/tailwind/preset.template.js` - Template for preset generation
- Generated: `dist/tailwind.preset.js`

**Tasks:**
1. Create format function that generates complete preset
2. Include CSS variables plugin inline
3. Map all token categories to Tailwind theme
4. Handle shadow token composition

### Phase 3: Package Distribution

**Files to modify:**
- `package.json` - Add exports field
- `vite.config.ts` - Copy preset to dist

**Tasks:**
1. Add `./tailwind.preset` export path
2. Add `./tokens.css` export path
3. Add `tailwindcss` as peer dependency (`^3.0.0`)
4. Copy generated files to dist during build

### Phase 4: TypeScript Support

**Files to create:**
- `dist/tailwind.preset.d.ts`

**Tasks:**
1. Export Tailwind Config type
2. Ensure IntelliSense works in consumer projects

### Phase 5: Documentation

**Files to modify:**
- `README.md` - Add Tailwind usage section

**Tasks:**
1. Document installation and setup
2. List all available token classes
3. Explain theme switching with data-theme
4. Add migration guide from custom tokens

---

## Acceptance Criteria

### Functional Requirements
- [ ] Preset exports valid Tailwind configuration
- [ ] All 19 CGA + amber colors available as `bg-cga-*`, `text-cga-*`
- [ ] All semantic colors available (`bg-background-primary`, etc.)
- [ ] Opacity modifiers work (`bg-cga-yellow/50`)
- [ ] Typography tokens available (`font-primary`, `text-base`)
- [ ] Spacing tokens available (numeric scale)
- [ ] Theme switching works via `data-theme="dos-amber"`
- [ ] Works with Tailwind v3.0+

### Non-Functional Requirements
- [ ] Preset file under 10KB
- [ ] Build adds < 1s to token generation
- [ ] Works with Next.js (ESM + CJS)
- [ ] Works with Vite (ESM)
- [ ] IntelliSense provides autocomplete in VS Code

### Quality Gates
- [ ] Tested in Pomodoke Calendar project
- [ ] All token names documented
- [ ] TypeScript types included

---

## Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| `style-dictionary.config.mjs` | Modify | Add tailwind platform |
| `dist/tailwind.preset.js` | Create (generated) | Main preset file |
| `dist/tailwind.preset.d.ts` | Create | TypeScript types |
| `dist/tokens.css` | Create (copy) | CSS variables export |
| `package.json` | Modify | Add exports field |
| `vite.config.ts` | Modify | Copy files to dist |
| `README.md` | Modify | Add usage docs |

---

## Testing Plan

### Manual Testing
1. Create test Next.js project, import preset, verify classes work
2. Create test Vite project, import preset, verify classes work
3. Test opacity modifiers: `bg-cga-yellow/50`, `text-cga-cyan/75`
4. Test theme switching with `data-theme="dos-amber"`
5. Verify IntelliSense in VS Code with Tailwind extension

### Integration Testing
1. Add preset to Pomodoke Calendar
2. Replace custom token values with Eidotter classes
3. Verify visual parity

---

## References

### Internal
- Token sources: `/mnt/d/Coding/eidotter/src/tokens/base.tokens.json`
- Style Dictionary config: `/mnt/d/Coding/eidotter/style-dictionary.config.mjs`
- Generated tokens: `/mnt/d/Coding/eidotter/src/styles/tokens.css`
- Adoption strategy: `/mnt/d/Coding/eidotter/ADOPTION_STRATEGY.md`

### External
- [Style Dictionary Tailwind Example](https://github.com/style-dictionary/style-dictionary/tree/main/examples/advanced/tailwind-preset)
- [Tailwind Presets Documentation](https://v3.tailwindcss.com/docs/presets)
- [Tailwind Theme Configuration](https://v3.tailwindcss.com/docs/configuration)

---

## Open Questions (Resolved)

| Question | Resolution |
|----------|------------|
| Token naming convention | `cga-*` for palette, semantic names without prefix |
| RGB transformation | Custom Style Dictionary transform |
| Module format | ESM primary, add exports field for CJS compatibility |
| Spacing strategy | Extend Tailwind defaults (8px grid aligns) |
| Theme switching | CSS variable overrides via data-theme selector |

---

*Generated with Claude Code - December 2025*

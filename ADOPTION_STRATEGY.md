# Eidotter Design System: Adoption Strategy & Integration Plan
*Generated from portfolio analysis - December 2025*

## Executive Summary

Based on a comprehensive analysis of the project portfolio, this document outlines a strategy for developing and gradually adopting the Eidotter design system across projects without requiring immediate refactors.

---

## Part 1: Common Patterns Identified

### Shared Design DNA

**7 of 18 active projects** share the DOS/retro terminal aesthetic:
- Eidotter (the design system itself)
- Tracker (Habit Tracker)
- Remixer (Content Remixer)
- SPACEWAR!
- EatThisDie
- mw (Mushroom Wizards - inspired)
- Pomodoro Timer

### Color Patterns Across Projects

| Token | Eidotter | Tracker | Remixer | EatThisDie |
|-------|----------|---------|---------|------------|
| Primary Amber | `#FFFF55` | `#FFB000` | monochrome | `#FFBF00` |
| CGA Black | `#000000` | near-black | near-black | near-black |
| CGA Green | `#00AA00` | `#00FF00` | - | - |
| CGA Cyan | `#00AAAA` | - | - | - |
| CGA White | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` | - |

**Recommendation:** Standardize on Eidotter's CGA 16-color palette as the canonical source.

### Typography Patterns

| Project | Font Stack | Line Height |
|---------|-----------|-------------|
| Eidotter | Perfect DOS VGA 437, Consolas, monospace | 1.2 |
| Tracker | System monospace | varies |
| Remixer | Tailwind monospace | default |
| EatThisDie | SF Mono | varies |

**Recommendation:** Define Eidotter typography tokens that can be consumed via CSS variables or Tailwind config.

### Component Patterns in Use

| Component Type | Projects Using | Priority for Eidotter |
|---------------|----------------|----------------------|
| **Buttons** | All | High |
| **Text Inputs** | All | High |
| **Cards/Panels** | 12 projects | High |
| **Tables** | 6 projects | Medium |
| **Modals/Dialogs** | 8 projects | Medium |
| **Progress indicators** | 5 projects | Medium |
| **Tabs/Navigation** | 7 projects | Low |
| **Form controls** | All | High |

---

## Part 2: Base Design Tokens to Include First

### Priority 1: Foundation Tokens

```css
/* Colors - CGA Authentic Palette */
--dos-black: #000000;
--dos-blue: #0000AA;
--dos-green: #00AA00;
--dos-cyan: #00AAAA;
--dos-red: #AA0000;
--dos-magenta: #AA00AA;
--dos-brown: #AA5500;
--dos-light-gray: #AAAAAA;
--dos-dark-gray: #555555;
--dos-bright-blue: #5555FF;
--dos-bright-green: #55FF55;
--dos-bright-cyan: #55FFFF;
--dos-bright-red: #FF5555;
--dos-bright-magenta: #FF55FF;
--dos-yellow: #FFFF55;
--dos-white: #FFFFFF;

/* Semantic Colors */
--dos-primary: var(--dos-yellow);
--dos-secondary: var(--dos-cyan);
--dos-background: var(--dos-black);
--dos-surface: var(--dos-dark-gray);
--dos-text: var(--dos-light-gray);
--dos-text-bright: var(--dos-white);
--dos-error: var(--dos-bright-red);
--dos-success: var(--dos-bright-green);
--dos-warning: var(--dos-yellow);

/* Typography */
--dos-font-primary: "Perfect DOS VGA 437", "Consolas", monospace;
--dos-font-size-xs: 12px;
--dos-font-size-sm: 14px;
--dos-font-size-base: 16px;
--dos-font-size-lg: 18px;
--dos-font-size-xl: 24px;
--dos-line-height-tight: 1.2;
--dos-line-height-normal: 1.5;
--dos-letter-spacing-wide: 0.8px;

/* Spacing (8px grid) */
--dos-space-1: 4px;
--dos-space-2: 8px;
--dos-space-3: 12px;
--dos-space-4: 16px;
--dos-space-6: 24px;
--dos-space-8: 32px;
--dos-space-12: 48px;

/* Borders */
--dos-border-width: 2px;
--dos-border-style: solid;
--dos-border-radius: 0px; /* DOS = sharp corners */

/* Animations */
--dos-cursor-blink: 1s;
--dos-transition-fast: 100ms;
--dos-transition-normal: 200ms;
```

### Priority 2: Component Tokens

```css
/* Buttons */
--dos-button-padding-x: var(--dos-space-4);
--dos-button-padding-y: var(--dos-space-2);
--dos-button-border: var(--dos-border-width) var(--dos-border-style) var(--dos-yellow);
--dos-button-bg: transparent;
--dos-button-text: var(--dos-yellow);
--dos-button-hover-bg: var(--dos-yellow);
--dos-button-hover-text: var(--dos-black);

/* Inputs */
--dos-input-padding: var(--dos-space-2);
--dos-input-border: var(--dos-border-width) var(--dos-border-style) var(--dos-light-gray);
--dos-input-bg: var(--dos-black);
--dos-input-text: var(--dos-bright-cyan);
--dos-input-focus-border: var(--dos-yellow);

/* Cards/Panels */
--dos-card-border: var(--dos-border-width) var(--dos-border-style) var(--dos-light-gray);
--dos-card-bg: var(--dos-black);
--dos-card-padding: var(--dos-space-4);

/* Terminal Window */
--dos-window-title-bg: var(--dos-blue);
--dos-window-title-text: var(--dos-white);
--dos-window-border: var(--dos-border-width) var(--dos-border-style) var(--dos-yellow);
```

---

## Part 3: Shared Components to Develop First

Based on usage across the portfolio, prioritize these components:

### Phase 1: Form Controls (Q1 2025)
1. **Button** - Primary terminal action component
   - Variants: primary, secondary, ghost, danger
   - States: default, hover, active, disabled, loading

2. **Input** - DOS-style text inputs
   - With blinking cursor effect
   - Variants: text, password, search

3. **Checkbox** - DOS checkbox with custom styling

4. **Select** - DOS dropdown menus

### Phase 2: Layout & Feedback (Q2 2025)
5. **Card** - Information container with DOS chrome
6. **Alert** - System notifications (already exists!)
7. **Modal** - DOS dialog windows
8. **Progress** - DOS-style progress bars

### Phase 3: Data Display (Q3 2025)
9. **Table** - DOS-formatted data tables
10. **Badge** - Status indicators
11. **Accordion** - Expandable panels (already exists!)

### Phase 4: Terminal Interface (Q3-Q4 2025)
12. **Terminal** - Full DOS terminal window
13. **CommandPrompt** - Interactive command line
14. **StatusBar** - System information display

---

## Part 4: Gradual Adoption Strategy

### Principle: Organic Growth, No Forced Refactors

```
┌─────────────────────────────────────────────────────────────┐
│                    ADOPTION LEVELS                          │
├─────────────────────────────────────────────────────────────┤
│ Level 0: No Eidotter (standalone projects)                  │
│ Level 1: Token-only (CSS variables imported)                │
│ Level 2: Token + Utilities (Tailwind config extension)      │
│ Level 3: Component adoption (specific components imported)  │
│ Level 4: Full Eidotter (design system as foundation)        │
└─────────────────────────────────────────────────────────────┘
```

### Strategy: During Project Work

**When working on any project:**

1. **New Component Needed?**
   - Check if Eidotter has it → Use Eidotter version
   - Eidotter doesn't have it → Build in project, consider moving to Eidotter later

2. **Styling New Feature?**
   - Import Eidotter tokens if not already done
   - Use token values for colors, spacing, typography
   - Document any new patterns that should go into Eidotter

3. **Touching Existing Code?**
   - No forced refactors to Eidotter
   - If convenient while making other changes, update to use tokens
   - Track "Eidotter debt" for future consideration

### How New Components Move Into Eidotter

```
Project Work → Extract Pattern → Generalize → Add to Eidotter → Import Back
     │                                                              │
     └──────────────────────────────────────────────────────────────┘
                        (organic feedback loop)
```

**Process:**
1. Build component in project to solve immediate need
2. If component is reusable across projects, create RFC/issue in Eidotter
3. Generalize component (remove project-specific logic)
4. Add to Eidotter with Storybook documentation
5. Replace project implementation with Eidotter import
6. Update other projects when convenient

---

## Part 5: Integration by Project

### Immediate Candidates (Already Using Eidotter Patterns)

| Project | Current State | Action |
|---------|--------------|--------|
| **Pomodoke Calendar** | Using Eidotter tokens | Continue; adopt components as built |
| **Remixer** | Has Style Dictionary | Align tokens with Eidotter; swap when ready |
| **mgnt** | Tailwind only | Add Eidotter tokens to Tailwind config |

### Next Wave (Strong DOS Aesthetic)

| Project | Current State | Action |
|---------|--------------|--------|
| **Tracker** | React Native StyleSheet | Export tokens in RN-compatible format |
| **EatThisDie** | iOS planning | Create Swift token translation |

### Optional (Different Aesthetics)

| Project | Notes |
|---------|-------|
| **Sella** | Uses Mantine - keep separate |
| **mw** | Custom PixiJS - keep separate |
| **SPACEWAR!** | Vanilla JS - keep separate |

---

## Part 6: Distribution Strategy

### Package Structure

```
eidotter/
├── dist/
│   ├── index.js          # React components (ESM)
│   ├── index.cjs         # React components (CJS)
│   ├── tokens.css        # CSS variables only
│   ├── tokens.json       # JSON tokens for Style Dictionary
│   └── tailwind.preset.js # Tailwind preset
├── src/
│   └── ...
└── package.json
```

### Consumption Methods

**1. Full Package (React projects):**
```bash
npm install eidotter
```
```jsx
import { Button, Terminal } from 'eidotter';
import 'eidotter/dist/tokens.css';
```

**2. Tokens Only (Any project):**
```css
@import 'eidotter/dist/tokens.css';

.my-component {
  color: var(--dos-yellow);
  font-family: var(--dos-font-primary);
}
```

**3. Tailwind Integration:**
```js
// tailwind.config.js
module.exports = {
  presets: [require('eidotter/tailwind.preset')],
}
```

**4. Style Dictionary (Custom builds):**
```js
const eidotterTokens = require('eidotter/dist/tokens.json');
// Use in your own Style Dictionary config
```

---

## Part 7: Success Metrics

### Adoption Metrics
- [ ] 3+ projects using Eidotter tokens by Q2 2025
- [ ] 2+ projects using Eidotter components by Q3 2025
- [ ] Eidotter used in 1 new project from scratch by Q4 2025

### Quality Metrics
- [ ] 90%+ test coverage for core components
- [ ] WCAG 2.1 AA compliance for all components
- [ ] Storybook documentation for 100% of components
- [ ] <5KB gzip per component average

### Developer Experience
- [ ] "Time to first component" < 5 minutes
- [ ] Clear upgrade path documentation
- [ ] Zero breaking changes within major versions

---

## Part 8: Next Steps

### Immediate Actions
1. Complete Button and Input components in Eidotter
2. Create `tokens.css` export for standalone token usage
3. Create Tailwind preset file
4. Document token naming conventions

### Short-term (1-2 months)
5. Add Eidotter tokens to Pomodoke Calendar Tailwind config
6. Create Eidotter issue templates for component requests
7. Set up token synchronization with Figma

### Medium-term (3-6 months)
8. Build out Phase 2 components
9. Create React Native token export
10. Evaluate adoption in 2-3 more projects

---

## Appendix: Token Naming Convention

```
--{system}-{category}-{property}-{variant}-{state}

Examples:
--dos-color-primary
--dos-color-text-muted
--dos-space-4
--dos-font-size-lg
--dos-button-bg-hover
--dos-input-border-focus
```

This convention allows:
- Clear namespace (`dos-`)
- Logical grouping (`color-`, `space-`, etc.)
- Semantic meaning (`primary`, `muted`)
- State handling (`hover`, `focus`, `active`)

---

*This strategy enables Eidotter to grow organically with your project work rather than requiring a dedicated "design system migration" project.*

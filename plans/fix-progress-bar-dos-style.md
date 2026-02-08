# fix(progress): DOS-style progress bar with visible track

**Type:** Enhancement / Bug Fix
**Affects:** Progress component
**Priority:** High

---

## Problem Statement

The Progress component has two critical visual problems:

1. **No visible track.** There is no border, outline, or container around the bar. You only see the filled portion — you cannot tell how much is left or how long the bar is.

2. **Empty blocks are invisible.** The `░` characters use `--color-semantic-text-disabled` (`#010103`) against `--color-cga-black` (`#020003`) — a 1-point delta that is functionally invisible.

Every other eidotter component with content has a visible boundary (Card, Input, Terminal, Switch track, Modal). Progress is the outlier.

---

## Proposed Solution

Redesign Progress into an authentic DOS-style progress bar with a visible track, inspired by:
- Classic DOS programs (PKZIP, Norton Commander, DOS Defrag)
- jakub.kr "shadows instead of borders" — layered box-shadows for depth instead of flat borders
- Existing eidotter patterns (Button phosphor glow, Card elevated variant)

### Visual Design

**Track container:**
Use layered `box-shadow` (jakub.kr approach adapted for dark theme):
```css
/* Inset shadow: recessed "well" for the track */
box-shadow:
  inset 0 1px 2px 0 rgba(0, 0, 0, 0.6),         /* depth */
  0 0 8px 0 var(--effects-phosphor-glow);          /* subtle outer phosphor haze */
```
Plus a `border: var(--border-width-medium) solid var(--color-semantic-border-default)` to match Card/Input/Terminal pattern.

**Empty blocks visible:**
Change empty `░` color from `--color-semantic-text-disabled` to `--color-cga-brown` (`#5F340E` in amber-mono) — dim but clearly visible against the black background. This gives the track a warm, dormant-phosphor look.

**Character rendering (20 blocks default):**
```
Rest:     [░░░░░░░░░░░░░░░░░░░░]   0%
Half:     [██████████░░░░░░░░░░]  50%
Full:     [████████████████████] 100%
Gradient: [████████████▓▒░░░░░░]  60%   (optional)
```

### States

| State | Visual | Description |
|-------|--------|-------------|
| **Rest (0%)** | `[░░░░░░░░░░░░░░░░░░░░]` | Full track visible, all empty blocks |
| **Partial** | `[████████░░░░░░░░░░░░]` | Filled + empty clearly distinguishable |
| **Complete (100%)** | `[████████████████████]` | All filled, optional completion glow |
| **Indeterminate** | `[░░░░▓█▓░░░░░░░░░░░░]` | 3-block scanner bounces left-right |

---

## Technical Approach

### Props Changes

```tsx
export interface ProgressProps {
  /** Progress value from 0 to max */
  value?: number;
  /** Maximum value (default 100) */
  max?: number;
  /** Whether progress amount is unknown */
  indeterminate?: boolean;
  /** Visual variant for status coloring */
  variant?: 'default' | 'success' | 'warning' | 'error';
  /** Size of the progress bar */
  size?: 'small' | 'medium' | 'large';
  /** Track display style */
  trackStyle?: 'block' | 'bordered' | 'gradient';
  /** Number of character cells (default 20) */
  blocks?: number;
  /** Show percentage label */
  showLabel?: boolean;
  /** Enable phosphor glow on filled blocks */
  glow?: boolean;
  /** Human-readable value text for screen readers */
  valueText?: string;
  /** Additional CSS class name */
  className?: string;
  /** Accessible label */
  'aria-label'?: string;
}
```

**Key decisions:**
- Renamed `display` → `trackStyle` to avoid DOM attribute collision
- `indeterminate` prop controls scanning animation (omits `aria-valuenow` per WAI-ARIA spec)
- `glow` adds phosphor text-shadow to filled blocks
- `valueText` maps to `aria-valuetext`
- `blocks` default 20, min 3, max 80 (clamped)
- Dropped sub-character fractional blocks from v1 scope — Unicode fractional blocks (`▏▎▍▌▋▊▉`) render inconsistently across fonts. Keep 20-block (5% step) resolution for reliability.

### CSS Changes (`Progress.css`)

```css
/* Track container — visible boundary with shadow depth */
.progress__track {
  display: inline-block;
  position: relative;
  border: var(--border-width-medium) solid var(--color-semantic-border-default);
  background-color: var(--color-semantic-background-secondary);
  padding: 2px 4px;
  line-height: 1;
  letter-spacing: 0;
  box-shadow:
    inset 0 1px 3px 0 rgba(0, 0, 0, 0.5),
    0 0 6px 0 var(--effects-phosphor-glow);
}

/* Empty blocks — visible against dark background */
.progress__empty {
  color: var(--color-cga-brown);
}

/* Filled blocks — primary text color with optional glow */
.progress__fill {
  color: var(--color-semantic-text-primary);
}

.progress--glow .progress__fill {
  text-shadow:
    0 0 4px var(--color-cga-amber-glow),
    0 0 10px var(--effects-phosphor-glow);
}

/* Bordered variant — bracket characters */
.progress--bordered .progress__bracket {
  color: var(--color-semantic-border-default);
}

/* Gradient variant — shade transition at fill edge */
/* Uses ▓▒ between filled █ and empty ░ */

/* Indeterminate — scanning block bounces */
.progress--indeterminate .progress__bar {
  animation: dos-scan 2s ease-in-out infinite alternate;
}

@media (prefers-reduced-motion: reduce) {
  .progress--indeterminate .progress__bar {
    animation: none;
    /* Static alternating pattern: █░█░█░... */
  }
}

@media (prefers-contrast: high) {
  .progress__track {
    border-width: 3px;
    box-shadow: none;
  }
  .progress--glow .progress__fill {
    text-shadow: none;
  }
}
```

### Component Changes (`Progress.tsx`)

1. **Wrap bar in a `.progress__track` container** — this is the core fix
2. **Add `trackStyle` rendering logic:**
   - `'block'` (default): `████░░░░` inside track border
   - `'bordered'`: `[████░░░░]` bracket characters, no track border
   - `'gradient'`: `████▓▒░░` shade transition at fill edge
3. **Indeterminate mode:**
   - Omit `aria-valuenow` from ARIA attributes
   - Render scanning animation via CSS (3-block-wide `▓█▓` bouncing)
   - Reduced motion fallback: static alternating `█░` pattern
4. **Glow prop:** Add `progress--glow` class when enabled
5. **Blocks prop:** Clamp to 3–80, default 20
6. **valueText prop:** Map to `aria-valuetext` attribute
7. **Filter props** before spreading to DOM (remove `trackStyle`, `glow`, `blocks`, etc.)

### Indeterminate Animation

CSS-driven using `translateX` on a 3-character scanning element:
- Characters: `▓█▓` (dark shade, full block, dark shade)
- Duration: 2s bounce (ease-in-out, alternate)
- Track shows all `░` empty characters behind the scanner
- Reduced motion: static pattern `█░█░█░█░█░█░█░█░█░█░`

### Token Changes

No new tokens needed — use existing:
- Track border: `--color-semantic-border-default`
- Track background: `--color-semantic-background-secondary`
- Empty blocks: `--color-cga-brown` (directly, visible on dark bg)
- Glow: `--color-cga-amber-glow` + `--effects-phosphor-glow`

---

## Acceptance Criteria

- [ ] Track has visible border showing total bar length at 0%
- [ ] Empty blocks (`░`) are clearly visible against dark background
- [ ] `trackStyle='block'` (default): filled + empty blocks inside bordered track
- [ ] `trackStyle='bordered'`: bracket `[` `]` delimiters instead of CSS border
- [ ] `trackStyle='gradient'`: shade characters `▓▒` at fill boundary
- [ ] `glow` prop adds phosphor text-shadow to filled blocks
- [ ] `indeterminate` prop shows scanning animation, omits `aria-valuenow`
- [ ] `blocks` prop controls bar width (default 20, clamped 3–80)
- [ ] `valueText` prop maps to `aria-valuetext`
- [ ] `prefers-reduced-motion`: all animations disabled, static fallbacks
- [ ] `prefers-contrast: high`: shadows/glow removed, border thickened
- [ ] All existing tests still pass (may need updates for new track wrapper)
- [ ] New tests for: trackStyle variants, indeterminate ARIA, glow class, blocks clamping, edge cases (0%, 100%, NaN)
- [ ] Visual verification in Storybook across all variants and sizes

## Files to Modify

| File | Change |
|------|--------|
| `src/components/Progress/components/Progress.tsx` | Add track wrapper, new props, indeterminate mode, glow, trackStyle rendering |
| `src/components/Progress/components/Progress.css` | Track border/shadow, empty block color, glow, indeterminate animation, a11y media queries |
| `src/components/Progress/components/Progress.test.tsx` | Update existing + add ~15 new tests |
| `src/components/Progress/components/Progress.stories.tsx` | Add stories for trackStyle, indeterminate, glow, blocks |

## Out of Scope (Future)

- Sub-character fractional blocks (font rendering inconsistency — revisit when JetBrains Mono is bundled)
- RTL support
- Value change animation
- `labelPosition` variants
- Per-variant glow colors

## References

- jakub.kr "Shadows Instead of Borders": layered box-shadow for depth
- DOS progress patterns: PKZIP `[####....]`, Norton Commander bordered panels
- eidotter Card/Input border pattern: `border: var(--border-width-medium) solid var(--color-semantic-border-default)`
- Button phosphor glow: 3-layer box-shadow + text-shadow approach
- WAI-ARIA progressbar: omit `aria-valuenow` for indeterminate
- WCAG 2.1 SC 1.4.11: 3:1 non-text contrast for filled vs empty
- Current Progress: `src/components/Progress/components/Progress.tsx:46` — 20-block character rendering
- Current empty color bug: `Progress.css:48` — `--color-semantic-text-disabled` is invisible

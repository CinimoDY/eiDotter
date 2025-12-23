---
date: 2025-12-23
problem_type: theming_issue
component: design_system
symptoms:
  - "Input component showing cyan text instead of amber"
  - "Components displaying multiple colors (cyan, yellow, gray) instead of consistent amber"
  - "Checkbox brackets had linebreak"
  - "Progress bar showing cyan instead of amber"
  - "Accordion filled area appearing brownish instead of amber"
root_cause: hardcoded_colors
severity: moderate
tags: [semantic-tokens, theming, amber, cga-colors, css]
---

# Components Not Respecting Amber Theme

## Symptom

Components in Storybook were not displaying in amber colors despite the `dos-amber` theme being applied. Instead, they showed the default CGA palette colors:
- Input: cyan text, gray border
- Checkbox: gray brackets, yellow when checked
- CommandPrompt: yellow cursor
- Progress: cyan fill
- Accordion: brownish hover/expanded background

## Investigation

1. Checked Storybook preview.ts — theme decorator with `data-theme="dos-amber"` was correctly applied
2. Examined Input.css — found hardcoded `--color-cga-brightCyan` instead of semantic tokens
3. Searched all component CSS files for `--color-cga-` usage
4. Found 6 components with hardcoded CGA colors

## Root Cause

Components were directly referencing CGA color variables (`--color-cga-brightCyan`, `--color-cga-yellow`, etc.) instead of semantic tokens (`--color-semantic-text-primary`, etc.).

The amber theme in `theme.dos-amber.css` overrides semantic tokens to use amber colors, but components bypassing semantic tokens don't pick up these overrides.

## Solution

### 1. Convert all components to semantic tokens

**Input.css:**
```css
/* Before */
color: var(--color-cga-brightCyan, #55FFFF);
border: 2px solid var(--color-cga-lightGray, #AAAAAA);

/* After */
color: var(--color-semantic-text-primary);
border: var(--border-width-medium) solid var(--color-semantic-border-default);
```

**Checkbox.css:**
```css
/* Before */
color: var(--color-cga-light-gray);
/* Checked: */ color: var(--color-cga-yellow);

/* After */
color: var(--color-semantic-text-primary);
/* Checked: */ color: var(--color-semantic-text-accent);
```

**CommandPrompt.css, Progress.css, AccordionFill.css** — similar pattern.

### 2. Fix Checkbox linebreak

```css
/* Before */
.checkbox__box {
  width: 1.5em;
}

/* After */
.checkbox__box {
  white-space: nowrap;
}
```

### 3. Adjust theme colors

Changed cursor and progress fill from `text-accent` (yellow) to `text-primary` (amber):
```css
.command-prompt__cursor {
  color: var(--color-semantic-text-primary);
}

.progress__fill {
  color: var(--color-semantic-text-primary);
}
```

### 4. Unify amber palette

In `theme.dos-amber.css`, mapped all amber variants to same value:
```css
--color-cga-amber: #ffb000;
--color-cga-amber-bright: #ffb000;
--color-cga-amber-dim: #ffb000;
--color-cga-yellow: #ffb000;
```

## Files Changed

- `src/components/Input/components/Input.css`
- `src/components/Checkbox/components/Checkbox.css`
- `src/components/CommandPrompt/components/CommandPrompt.css`
- `src/components/Progress/components/Progress.css`
- `src/components/Accordion/components/AccordionFill.css`
- `src/components/Terminal/components/Terminal.stories.tsx`
- `src/styles/theme.dos-amber.css`

## Prevention

1. **Always use semantic tokens** in component CSS — never hardcode `--color-cga-*` variables
2. **Token mapping reference:**
   - Text: `--color-semantic-text-primary`, `text-secondary`, `text-accent`, `text-disabled`
   - Border: `--color-semantic-border-default`, `border-focus`, `border-hover`, `border-disabled`
   - Background: `--color-semantic-background-primary`, `background-secondary`, `background-accent`
   - Status: `--color-semantic-status-success`, `status-warning`, `status-error`, `status-info`

3. **Grep check before committing:**
   ```bash
   grep -r "--color-cga-" src/components/
   # Should return no matches (except in edge cases)
   ```

## Related

- Commits: `8d57048`, `dc3c688`, `8b27dc8`
- Future: Consider Figma integration to sync design tokens directly

# Icon Component Using Non-Existent Token References

## Frontmatter

```yaml
title: Icon Component Using Non-Existent CSS Token References
date: 2026-02-08
category: ui-bugs
component: Icon
tags:
  - design-tokens
  - css-variables
  - semantic-tokens
  - icon
  - invisible-rendering
  - token-namespace
severity: high
symptom: Icons render with no visible color; hover states on interactive icons have no effect
root_cause: Icon component referenced --color-system-* CSS custom properties that do not exist in the eiDotter token pipeline
solution: Replace all --color-system-* references with correct --color-semantic-* tokens
prs: ["#87"]
commit: 8741105
```

---

## Problem

The Icon component rendered with **no visible default color** and **broken hover states** on interactive icons (those with `role="button"`). Symptoms:

1. **Invisible icons** -- Icons appeared in the DOM but had no fill color, making them invisible against dark backgrounds. Only icons with an explicit `color` prop override were visible.
2. **No hover feedback** -- Interactive icons (`role="button"`) showed no color change on hover, breaking the expected affordance for clickable elements.
3. **Storybook color picker non-functional** -- The color control dropdown in Storybook offered four options, none of which produced visible results because all four values resolved to `undefined`.

The issue affected every usage of the Icon component that did not pass an explicit `color` prop.

---

## Investigation

### Step 1: Inspect computed styles

Icons in the DOM had `color: unset` (or the browser default) because the CSS custom properties they referenced were never defined. The browser treats `var(--undefined-property)` as an invalid value, causing the declaration to be ignored entirely.

### Step 2: Trace the token references

The following CSS custom properties were used across Icon files:

| File | Property Used | Exists? |
|------|--------------|---------|
| `Icon.css` | `--color-system-foreground` | No |
| `Icon.css` | `--color-system-link-hover` | No |
| `Icon.stories.tsx` | `--color-system-foreground` | No |
| `Icon.stories.tsx` | `--color-system-link-default` | No |
| `Icon.stories.tsx` | `--color-system-link-hover` | No |
| `Icon.stories.tsx` | `--color-system-link-dim` | No |
| `Icon.tsx` (JSDoc) | `--color-system-link-default` | No |

### Step 3: Search for the `--color-system-*` namespace

A codebase-wide search confirmed that **no file** defines any `--color-system-*` custom property. The namespace does not appear in:
- `src/tokens/colors.json`
- `src/tokens/base.json`
- `src/tokens/semantic.json`
- `src/styles/tokens.css` (generated output)

The `--color-system-*` prefix was never part of the eiDotter design token pipeline.

---

## Root Cause

**Token namespace mismatch.** The Icon component was authored using a `--color-system-*` naming convention that does not exist in eiDotter. The design system defines two token namespaces:

- **`--color-cga-*`** -- Primitive 16-color CGA palette (e.g., `--color-cga-amber`, `--color-cga-black`)
- **`--color-semantic-*`** -- Semantic purpose-based tokens (e.g., `--color-semantic-text-primary`, `--color-semantic-link-hover`)

The `--color-system-*` namespace appears to be from a different design system convention (possibly a generic starter template or a different project). It was never wired into the Style Dictionary build pipeline that generates `tokens.css`.

Because CSS custom properties fail silently when undefined (no console error, no build error), this went undetected until visual inspection.

---

## Solution

Replaced all `--color-system-*` references with their correct `--color-semantic-*` equivalents.

### Icon.css

```diff
 .icon {
   display: inline-block;
   vertical-align: middle;
   fill: currentColor;
   /* Default to system foreground color */
-  color: var(--color-system-foreground);
+  color: var(--color-semantic-text-primary);
 }

 .icon[role="button"]:hover {
   /* Use system link hover color for interactive icons */
-  color: var(--color-system-link-hover);
+  color: var(--color-semantic-link-hover);
 }
```

### Icon.tsx (JSDoc example)

```diff
- * <Icon name="Close" size={24} color="var(--color-system-link-default)" />
+ * <Icon name="Close" size={24} color="var(--color-semantic-link-default)" />
```

### Icon.stories.tsx (Storybook color control options)

```diff
 color: {
   control: 'select',
   options: [
-    'var(--color-system-foreground)',
-    'var(--color-system-link-default)',
-    'var(--color-system-link-hover)',
-    'var(--color-system-link-dim)',
+    'var(--color-semantic-text-primary)',
+    'var(--color-semantic-link-default)',
+    'var(--color-semantic-link-hover)',
+    'var(--color-semantic-text-disabled)',
   ],
-  description: 'The color of the icon using our system tokens',
+  description: 'The color of the icon using semantic tokens',
 },
```

### Icon.stories.tsx (Colors story inline values)

```diff
-<Icon name="Info" size="L" color="var(--color-system-link-default)" />
-<Icon name="Info" size="L" color="var(--color-system-link-hover)" />
-<Icon name="Info" size="L" color="var(--color-system-link-dim)" />
+<Icon name="Info" size="L" color="var(--color-semantic-link-default)" />
+<Icon name="Info" size="L" color="var(--color-semantic-link-hover)" />
+<Icon name="Info" size="L" color="var(--color-semantic-text-disabled)" />
```

### Token mapping summary

| Old (non-existent) | New (correct) | Purpose |
|--------------------|---------------|---------|
| `--color-system-foreground` | `--color-semantic-text-primary` | Default icon color |
| `--color-system-link-default` | `--color-semantic-link-default` | Link-colored icon |
| `--color-system-link-hover` | `--color-semantic-link-hover` | Hover state for interactive icons |
| `--color-system-link-dim` | `--color-semantic-text-disabled` | Dimmed/muted icon color |

---

## Verification

- All 19 Icon tests pass (`npm run test -- Icon.test.tsx`)
- Production build succeeds (`npm run build`)
- Codebase-wide grep for `--color-system-*` returns zero results
- Visual inspection in Storybook confirms icons render with correct amber color and hover states work

---

## Prevention Strategies

### 1. ESLint rule to flag `--color-system-*` usage

Add a custom ESLint rule or use `eslint-plugin-css` / `stylelint` to flag any CSS custom property that does not match the known namespaces (`--color-cga-*`, `--color-semantic-*`, `--spacing-*`, `--typography-*`, `--shadow-*`, `--dimension-*`):

```js
// Example stylelint custom rule concept
// Flag any --color-system-* as an error
"custom-property-pattern": "^(color-(cga|semantic)|spacing|typography|shadow|dimension)-"
```

### 2. Token validation in CI

Add a CI step that:
1. Extracts all `var(--` references from `.css` and `.tsx` files
2. Compares them against the set of custom properties defined in `src/styles/tokens.css`
3. Fails the build if any undefined token is referenced

This would catch silent failures at build time rather than requiring visual inspection.

### 3. Reference `docs/TOKENS.md` for correct token names

Before authoring or reviewing any component CSS, consult `docs/TOKENS.md` for the complete list of available tokens. The token quick reference in `CLAUDE.md` also provides the most commonly needed mappings.

### 4. Add fallback values to critical CSS custom properties

For essential visual properties like default color, consider using CSS fallback values:

```css
color: var(--color-semantic-text-primary, #FFB000);
```

This ensures a visible result even if the token is somehow missing, while still preferring the token value when available.

---

## Related References

- **CLAUDE.md Anti-Patterns section** -- Documents the rule to never hardcode hex colors and always use `--color-semantic-*` / `--color-cga-*` tokens. The `--color-system-*` namespace violation is a direct instance of this anti-pattern category.
- **`docs/TOKENS.md`** -- Complete token reference with decision trees for choosing the correct token.
- **`src/styles/tokens.css`** -- The generated token file; the single source of truth for all available CSS custom properties.
- **`src/tokens/semantic.json`** -- The semantic token definitions that feed the Style Dictionary pipeline.
- **Commit `8741105`** -- The fix commit with full diff.
- **PR #87** -- The pull request where this fix was reviewed and merged.

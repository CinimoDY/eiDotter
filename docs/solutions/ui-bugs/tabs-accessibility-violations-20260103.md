---
module: Tabs
date: 2026-01-03
problem_type: accessibility_issue
component: react_component
symptoms:
  - "aria-controls attribute references non-existent tabpanel element"
  - "Color contrast ratio 4.41:1 below WCAG AA 4.5:1 minimum"
  - "axe-core violations in Storybook addon-a11y"
root_cause: incorrect_aria_usage
severity: moderate
tags: [accessibility, wcag, aria, color-contrast, axe-core]
---

# Tabs Accessibility Violations

## Symptom

Running Storybook with `@storybook/addon-a11y` (axe-core) showed 2 violations on the Tabs component:

1. **ARIA violation**: `aria-controls="tabpanel-schedule"` referenced a non-existent element
2. **Color contrast violation**: Inactive tab text had 4.41:1 contrast ratio (WCAG AA requires 4.5:1)

## Investigation

### What Didn't Work

- Initially assumed tabpanels needed to be rendered - but Tabs component is designed to only render the tab buttons, not panels

### Root Cause Analysis

**ARIA Issue:**
The Tabs component was adding `aria-controls={tabpanel-${tab.id}}` to each tab button, but the component only renders tabs - it doesn't render corresponding tabpanels. The tabpanel content is managed externally by the consuming application.

```tsx
// WRONG: References non-existent element
<button
  role="tab"
  aria-controls={`tabpanel-${tab.id}`}  // ❌ No tabpanel with this ID exists
  ...
>
```

**Color Contrast Issue:**
Inactive tabs used `opacity: 0.6` which, when applied to amber text (#FFBF00) on black background, resulted in 4.41:1 contrast ratio - below the 4.5:1 WCAG AA minimum.

```css
/* WRONG: Opacity too low for WCAG AA */
.tabs__tab {
  opacity: 0.6; /* ❌ Creates 4.41:1 contrast */
}
```

## Solution

### Fix 1: Remove aria-controls

Since the component doesn't manage tabpanels, remove the attribute:

**File:** `src/components/Tabs/components/Tabs.tsx:45-52`

```tsx
// CORRECT: Only include ARIA attributes for elements we control
<button
  key={tab.id}
  role="tab"
  id={`tab-${tab.id}`}
  aria-selected={isActive}
  tabIndex={isActive ? 0 : -1}
  disabled={tab.disabled}
  // Removed: aria-controls={`tabpanel-${tab.id}`}
  ...
>
```

### Fix 2: Increase Opacity for Color Contrast

**File:** `src/components/Tabs/components/Tabs.css:26`

```css
/* CORRECT: Opacity provides 4.5:1+ contrast */
.tabs__tab {
  color: var(--color-semantic-text-primary);
  opacity: 0.7; /* ✅ Increased from 0.6 for WCAG AA (4.5:1) */
}
```

## Verification

After fixes, re-ran Storybook accessibility audit:
- **Before:** 2 Violations, 14 Passes
- **After:** 0 Violations, 16 Passes

## Prevention

1. **Add addon-a11y to Storybook** - Catches accessibility issues during development
2. **Configure WCAG rules in preview.ts:**
   ```typescript
   a11y: {
     options: {
       runOnly: {
         type: 'tag',
         values: ['wcag2a', 'wcag2aa', 'wcag21aa'],
       },
     },
   },
   ```
3. **Don't use aria-controls without corresponding elements** - Only add ARIA attributes that reference elements the component actually renders
4. **Test opacity values against contrast requirements** - Use a contrast checker when dimming text

## Related

- WCAG 2.1 Success Criterion 1.4.3 Contrast (Minimum)
- [axe-core aria-valid-attr-value rule](https://dequeuniversity.com/rules/axe/4.4/aria-valid-attr-value)
